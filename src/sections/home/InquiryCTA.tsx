import { TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function InquiryCTA() {
  return (
    <section aria-labelledby="quote-prep-heading" className="home-quote-prep">
      <RevealOnScroll className="home-container home-quote-prep__row">
        <h2 id="quote-prep-heading">Bạn đã có mẫu<br />hoặc ý tưởng?</h2>
        <p>Gửi kích thước, chất liệu và số lượng dự kiến.<br />Chưa đủ thông số? Bắt đầu từ mẫu thực tế.</p>
        <TextLink href="/lien-he">Chuẩn bị yêu cầu báo giá</TextLink>
      </RevealOnScroll>
    </section>
  );
}
