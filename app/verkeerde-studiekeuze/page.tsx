import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SituationPage } from "@/app/components/situation-page";
import { getSituation } from "@/app/situations";

const situation = getSituation("verkeerde-studiekeuze");

/** The old title, word for word. The title is what ranks. */
export const metadata: Metadata = {
  title: situation?.seoTitle,
  description: situation?.description,
  alternates: { canonical: "/verkeerde-studiekeuze" },
};

export default function VerkeerdeStudiekeuzePage() {
  if (!situation) notFound();
  return <SituationPage situation={situation} />;
}
