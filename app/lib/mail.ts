/**
 * The one way a message leaves this site.
 *
 * WHY THIS FILE IS SMALL ON PURPOSE. Issue #17 asked which vendor sends our
 * mail and answered it: Resend, on an account the client owns, with the key in
 * an environment variable. It explicitly ruled out a Vercel Marketplace
 * integration, because that provisions into the developer's account and bills
 * him. So there is no SDK here and no adapter layer: one `fetch` to a
 * documented HTTP endpoint, which is the whole of what an SDK would wrap. Move
 * to another vendor and only the twenty lines of `deliver` change.
 *
 * WHAT IT PROMISES. Nothing that it cannot keep. It says `ok` when the provider
 * accepted the message and gave it an id, and it says why not in every other
 * case. It does not queue, it does not retry forever and it does not store. The
 * caller decides what to tell the reader, and app/actions.ts tells them the
 * truth, including an address to write to when this fails.
 *
 * WHAT IT NEVER DOES. Print a message body in production. An intake request
 * carries a name, an e-mail address, a telephone number and a line about what
 * somebody is struggling with, usually somebody between 16 and 22, and one of
 * the four situations is a health statement (issue #21). A runtime log is a
 * third copy in a place nobody empties. In development the body IS printed,
 * because that is the only way to see the mail without a key, and development
 * has no real submissions in it.
 */

/** Why a message did not go out. Every one of these is a state the caller has
 *  to be able to say out loud, so none of them is a thrown error. */
export type MailFailure =
  /** No RESEND_API_KEY. The site cannot send at all, and that is a deploy
   *  problem, not something the reader did. */
  | "not-configured"
  /** No recipient was resolved, so there is nothing to send to. */
  | "no-recipient"
  /** The provider answered, and the answer was no. */
  | "provider-rejected"
  /** The provider did not answer in time, or the network did not reach it. */
  | "provider-unreachable";

export type MailResult = { ok: true; id: string } | { ok: false; reason: MailFailure };

export type Mail = {
  to: string;
  /** The archive copy. Dropped when it is the same address as `to`. */
  cc?: string | null;
  /** The person who wrote the request, so a coach can just press reply. */
  replyTo: string;
  subject: string;
  text: string;
};

/** The sender. A domain we own has to be verified with Resend before this
 *  passes DKIM and SPF, and that waits on the DNS move (issues #17 and #23). */
const DEFAULT_FROM = "StudiekeuzeAdvies <intake@studiekeuzeadvies.nl>";

const ENDPOINT = "https://api.resend.com/emails";

/** Long enough for a slow answer, short enough that nobody watches a spinner.
 *  A server action holds the reader's form open for the whole of it. */
const TIMEOUT_MS = 8000;

/** One retry, and one only. Two failures in a row is a provider that is down,
 *  and a third attempt only makes the reader wait longer for the same answer.
 *  The fallback address in the error state is the real safety net. */
const RETRY_DELAY_MS = 400;

const isProduction = process.env.NODE_ENV === "production";

/** Where the archive copy goes. Every request has to exist in two places, so a
 *  provider hiccup or a bouncing coach address cannot lose it (issue #17). */
export function archiveInbox(): string | null {
  return process.env.MAIL_ARCHIVE?.trim() || null;
}

async function deliver(mail: Mail, apiKey: string): Promise<MailResult> {
  const cc = mail.cc && mail.cc !== mail.to ? [mail.cc] : undefined;

  const body = JSON.stringify({
    from: process.env.MAIL_FROM?.trim() || DEFAULT_FROM,
    to: [mail.to],
    ...(cc ? { cc } : {}),
    reply_to: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }

    try {
      const response = await fetch(ENDPOINT, {
        body,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (response.ok) {
        const answer: unknown = await response.json().catch(() => null);
        const id =
          answer && typeof answer === "object" && "id" in answer
            ? String((answer as { id: unknown }).id)
            : "";

        // An accepted message without an id is still accepted. The id only
        // helps us find it back in the provider's dashboard.
        return { ok: true, id: id || "onbekend" };
      }

      // 4xx is our mistake: a bad address, a domain that is not verified, a key
      // that was revoked. Trying again changes nothing, so it stops here. The
      // status is worth a log line; the body of the mail is not.
      //
      // 429 is the exception. It is the one 4xx that says "not now" instead of
      // "never", and two submissions in the same second are exactly how a small
      // site meets it. It falls through to the retry below, like a 5xx.
      if (response.status < 500 && response.status !== 429) {
        console.error(`[mail] Resend weigerde het bericht: ${response.status}.`);
        return { ok: false, reason: "provider-rejected" };
      }

      console.error(`[mail] Resend antwoordde ${response.status}, poging ${attempt + 1}.`);
    } catch {
      // A timeout or a network failure. Both are worth one more try, and
      // neither may print what was in the message.
      console.error(`[mail] Resend niet bereikt, poging ${attempt + 1}.`);
    }
  }

  return { ok: false, reason: "provider-unreachable" };
}

/**
 * Send one message.
 *
 * Without a key: in development the whole mail goes to the console and the
 * result is `ok` with the id "dev", so the rest of the flow can be walked from
 * end to end on a laptop. In production the same missing key is a hard no,
 * because pretending to have sent something is how a request gets lost.
 */
export async function sendMail(mail: Mail): Promise<MailResult> {
  if (!mail.to) return { ok: false, reason: "no-recipient" };

  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    if (isProduction) return { ok: false, reason: "not-configured" };

    console.info(
      [
        "[mail] Geen RESEND_API_KEY, dus niets verstuurd. De mail zou dit zijn:",
        `  aan:      ${mail.to}`,
        `  cc:       ${mail.cc ?? "(geen)"}`,
        `  reply-to: ${mail.replyTo}`,
        `  subject:  ${mail.subject}`,
        mail.text.replace(/^/gm, "  "),
      ].join("\n"),
    );

    return { ok: true, id: "dev" };
  }

  return deliver(mail, apiKey);
}
