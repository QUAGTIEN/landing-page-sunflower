import type { Metadata } from "next";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { COMPANY_INFO } from "@/content/company";
import { AboutContentSections } from "@/sections/about/AboutContentSections";

export const metadata: Metadata = {
  title: "Giới thiệu thương hiệu & định hướng sản xuất B2B",
  description: COMPANY_INFO.shortIntro,
};

export default function AboutPage() {
  return (
    <>
      <InteriorHero page="about" />

      <AboutContentSections />
    </>
  );
}
