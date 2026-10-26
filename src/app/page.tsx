import { HeroProductStage } from "@/sections/home/HeroProductStage";
import { CorporateIntro } from "@/sections/home/CorporateIntro";
import { FeaturedProducts } from "@/sections/home/FeaturedProducts";
import { SolutionsAndApplications } from "@/sections/home/SolutionsAndApplications";
import { CapabilitiesProcess } from "@/sections/home/CapabilitiesProcess";
import { SelectedWork } from "@/sections/home/SelectedWork";
import { InquiryCTA } from "@/sections/home/InquiryCTA";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Approved poster remains static; all Hero 3D work is deferred. */}
      <HeroProductStage />
      <CorporateIntro />
      <FeaturedProducts />
      <CapabilitiesProcess />
      <SolutionsAndApplications />
      <SelectedWork />
      <InquiryCTA />
    </div>
  );
}
