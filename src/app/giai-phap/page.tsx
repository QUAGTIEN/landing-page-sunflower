import type { Metadata } from "next";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { SolutionsDetailSections } from "@/sections/solutions/SolutionsDetailSections";

export const metadata: Metadata = {
  title: "Giải pháp tem nhãn & bao bì theo nhu cầu doanh nghiệp",
  description:
    "Tư vấn lựa chọn cấu trúc vật liệu mặt, keo, đế và phương thức in phù hợp cho kho vận, may mặc xuất khẩu, thực phẩm bảo quản lạnh và điện tử công nghiệp.",
};

export default function SolutionsPage() {
  return (
    <>
      <InteriorHero page="solutions" />

      <SolutionsDetailSections />
    </>
  );
}
