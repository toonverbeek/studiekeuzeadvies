import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { headingId } from "@/app/articles";
import { linkOnPaper } from "@/app/components/ui";

/**
 * How an article looks. The .mdx files hold text and nothing else: no classes,
 * no components, no layout. Everything visual is decided once, here, so 63
 * articles cannot drift apart.
 *
 * The reading room lives on paper. The column around this text sets the size
 * and the colour (17px on 1.75, muted-read); this file sets the rhythm and the
 * hierarchy inside it. See docs/redesign/design-spec.md, section 6.2.
 */

/** The plain text inside a heading, so a heading with a link still gets an id. */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const components: MDXComponents = {
  /*
   * A section of the article, and one entry in both indexes. The id comes from
   * the same function that builds the index, so a link can never miss.
   *
   * The rule above it is the only structure line in the system, and the space
   * above the rule is much larger than the space under it: that is what makes a
   * heading belong to the text that follows, not to the text before it.
   */
  h2: ({ children }) => (
    <h2
      className="text-h4 mt-14 scroll-mt-8 border-t border-hairline pt-6 font-bold text-ink first:mt-0 md:mt-16"
      id={headingId(textOf(children))}
    >
      {children}
    </h2>
  ),

  /* A step inside a section. No rule, so it cannot be mistaken for a section. */
  h3: ({ children }) => (
    <h3
      className="text-title mt-9 scroll-mt-8 font-bold text-ink"
      id={headingId(textOf(children))}
    >
      {children}
    </h3>
  ),

  p: ({ children }) => <p className="mt-5">{children}</p>,

  ul: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,

  /* A numbered list keeps the browser's own marker, and drops the square. */
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-3 pl-6 marker:font-medium marker:text-violet [&_.bullet]:hidden [&>li]:pl-0">
      {children}
    </ol>
  ),

  /*
   * A hanging bullet: the square sits in the margin and a wrapped line returns
   * to one left edge. A marker that pushes the whole item inward would break
   * the left edge of the reading column.
   */
  li: ({ children }) => (
    <li className="relative pl-6">
      <span
        aria-hidden="true"
        className="bullet absolute top-[0.72em] left-1 h-1.5 w-1.5 bg-violet"
      />
      {children}
    </li>
  ),

  a: ({ children, href }) => {
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <a
        className={linkOnPaper}
        href={href}
        {...(external ? { rel: "noreferrer noopener", target: "_blank" } : {})}
      >
        {children}
      </a>
    );
  },

  strong: ({ children }) => (
    <strong className="font-bold text-ink">{children}</strong>
  ),

  /* An aside inside the running text: the client's soft info box, not a card
     and not a coloured stripe. */
  blockquote: ({ children }) => (
    <div className="rounded-box mt-8 bg-lavender px-6 py-6 sm:px-7 [&>:first-child]:mt-0">
      {children}
    </div>
  ),

  hr: () => <hr className="mt-12 border-t border-hairline" />,
};

/**
 * Written for the .mdx files, used without an import: the opening paragraph of
 * an article. It is the answer in one breath, for the reader who will not read
 * the other 1100 words.
 */
export function Lead({ children }: { children: ReactNode }) {
  // A div, not a p: MDX wraps the text between the tags in its own paragraph,
  // and a p inside a p is invalid HTML that breaks hydration.
  return (
    <div className="text-lead max-w-[54ch] font-medium text-ink [&>p]:mt-0">
      {children}
    </div>
  );
}

export function useMDXComponents(): MDXComponents {
  return { ...components, Lead };
}
