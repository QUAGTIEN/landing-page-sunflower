import { TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function CorporateIntro() {
  return (
    <section id="gioi-thieu-sunflower" aria-labelledby="corporate-intro-heading" className="home-intro home-section">
      <div className="home-container">
        <RevealOnScroll className="home-intro__grid">
          <p className="home-kicker">01 / SUNFLOWER</p>
          <div>
            <h2 id="corporate-intro-heading" className="home-title">Từ ý tưởng.<br />Đến từng chi tiết.</h2>
          </div>
          <div className="home-intro__body">
            <p>Thiết kế, sản xuất tem nhãn, bao bì và cung ứng vật tư in ấn cho doanh nghiệp.</p>
            <TextLink href="/gioi-thieu">Tìm hiểu Sunflower</TextLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
