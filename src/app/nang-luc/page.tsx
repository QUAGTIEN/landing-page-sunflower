import type { Metadata } from "next";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { CapabilitiesDetailSections } from "@/sections/capabilities/CapabilitiesDetailSections";

export const metadata: Metadata = {
  title: "Năng lực thiết kế, in ấn & quy trình kiểm soát chất lượng",
  description:
    "Tìm hiểu 4 trụ cột năng lực kỹ thuật và quy trình 4 bước từ tư vấn vật liệu, chế bản Prepress, in ấn gia công bế cuộn/tờ đến kiểm định chất lượng bàn giao tại Sunflower.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <InteriorHero page="capabilities" />

      <CapabilitiesDetailSections />
    </>
  );
}
