import Image from "next/image";
import { CAPABILITY_MEDIA } from "@/content/capabilities";
import { PROJECTS_LIST } from "@/content/projects";
import { TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const titles = ["Tem cuộn cho kho vận", "Nhãn in màu & bao bì", "Bộ nhãn mác may mặc"];

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-heading" className="home-work home-section">
      <div className="home-container home-work__grid">
        <RevealOnScroll>
          <figure className="home-work__photo">
            <div><Image src={CAPABILITY_MEDIA.colorSamplesPhoto.src} alt={CAPABILITY_MEDIA.colorSamplesPhoto.alt} fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" /></div>
            <figcaption>Hình minh họa kiểm soát màu sắc chế bản.</figcaption>
          </figure>
        </RevealOnScroll>
        <RevealOnScroll className="home-work__copy">
          <p className="home-kicker">05 / CẤU HÌNH THAM KHẢO</p>
          <h2 id="selected-work-heading" className="home-title">Nhìn từ<br />thành phẩm.</h2>
          <p className="home-body">Một vài cách kết hợp chất liệu và gia công. Các cấu hình minh họa, không phải hồ sơ khách hàng đã công bố.</p>
          <div className="home-work__links">{PROJECTS_LIST.map((project, index) => (
            <TextLink key={project.slug} href={`/du-an#${project.slug}`}>{titles[index] ?? project.categoryLabel}</TextLink>
          ))}</div>
          <TextLink href="/du-an">Xem thư viện cấu hình & dự án</TextLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
