import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LevelPage } from "@/app/components/level-page";
import { getLevel } from "@/app/levels";

const level = getLevel("hbo-opleiding-kiezen");

/** The old title, word for word. The title is what ranks. */
export const metadata: Metadata = {
  title: level?.seoTitle,
  description: level?.description,
  alternates: { canonical: "/hbo-opleiding-kiezen" },
};

export default function HboOpleidingKiezenPage() {
  if (!level) notFound();
  return <LevelPage level={level} />;
}
