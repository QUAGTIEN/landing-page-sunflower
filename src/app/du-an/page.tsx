import type { Metadata } from "next";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { ProjectsShowcaseSections } from "@/sections/projects/ProjectsShowcaseSections";

export const metadata: Metadata = {
  title: "Dự án & cấu hình thành phẩm tiêu biểu",
  description:
    "Hồ sơ thành phẩm và các quy cách gia công tem nhãn cuộn, nhãn may mặc, bao bì hộp giấy tiêu chuẩn phục vụ khách hàng doanh nghiệp tại Sunflower.",
};

export default function ProjectsPage() {
  return (
    <>
      <InteriorHero page="projects" />

      <ProjectsShowcaseSections />
    </>
  );
}
