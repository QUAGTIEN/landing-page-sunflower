import Image from "next/image";
import { CAPABILITY_MEDIA } from "@/content/capabilities";
import { HOME_PROCESS } from "@/content/home";
import { TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function CapabilitiesProcess() {
  return (
    <section id="nang-luc-san-xuat" aria-labelledby="capabilities-heading" className="home-capabilities home-section">
      <div className="home-container">
        <RevealOnScroll className="home-section-head">
          <div><p className="home-kicker">03 / NĂNG LỰC & QUY TRÌNH</p><h2 id="capabilities-heading" className="home-title">Chính xác từ bản vẽ.<br />Chỉn chu khi thành phẩm.</h2></div>
          <TextLink href="/nang-luc" onDark>Khám phá năng lực</TextLink>
        </RevealOnScroll>
        <div className="home-capabilities__grid">
          <RevealOnScroll>
            <figure className="home-process-photo">
              <div><Image src={CAPABILITY_MEDIA.pressPhoto.src} alt={CAPABILITY_MEDIA.pressPhoto.alt} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" /></div>
              <figcaption>Hình minh họa ngành in — không phải xưởng Sunflower.</figcaption>
            </figure>
          </RevealOnScroll>
          <div className="home-process">
            <p className="home-kicker">PHỐI HỢP QUA 4 BƯỚC</p>
            {HOME_PROCESS.map((step, index) => (
              <RevealOnScroll key={step.title} delayMs={index * 40}>
                <details className="home-process__step" name="home-production" open={index === 0}>
                  <summary><span className="home-index">0{index + 1}</span><h3>{step.title}</h3><span className="home-process__plus" aria-hidden="true">+</span></summary>
                  <p>{step.description}</p>
                </details>
              </RevealOnScroll>
            ))}
            <TextLink href="/lien-he" onDark>Trao đổi yêu cầu kỹ thuật</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
