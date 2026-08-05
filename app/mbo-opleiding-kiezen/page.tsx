import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelPage } from "@/app/components/level-page";
import { getLevel } from "@/app/levels";

const level = getLevel("mbo-opleiding-kiezen");

/** The old title, word for word. The title is what ranks. */
export const metadata: Metadata = {
  title: level?.seoTitle,
  description: level?.description,
  alternates: { canonical: "/mbo-opleiding-kiezen" },
};

export default function MboOpleidingKiezenPage() {
  if (!level) notFound();
  return <LevelPage level={level} />;
}
