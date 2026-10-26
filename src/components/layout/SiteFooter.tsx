import Link from "next/link";
import { SunflowerLogo } from "@/components/ui/SunflowerLogo";
import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ALL_SITEMAP_ROUTES } from "@/content/navigation";
import { COMPANY_INFO } from "@/content/company";
import { PRODUCT_FAMILIES } from "@/content/products";
import { getProductFamilyHref } from "@/content/home";

/** Pending business data stays in content files and is never rendered as a fact. */
export function SiteFooter({ showCtaBand = true }: { showCtaBand?: boolean }) {
  const contactItems = [
    ["Địa chỉ", COMPANY_INFO.contacts.address],
    ["Hotline", COMPANY_INFO.contacts.hotline],
    ["Email", COMPANY_INFO.contacts.email],
    ["Giờ làm việc", COMPANY_INFO.contacts.workingHours],
  ].filter(([, value]) => value && !/TODO_CONTENT/.test(value));
  return (
    <footer className="site-footer mt-auto">
      {showCtaBand && (
        <section aria-labelledby="footer-cta-heading" className="site-footer__cta">
          <RevealOnScroll className="home-container site-footer__cta-row">
            <div>
              <p className="home-kicker">CÙNG BẮT ĐẦU</p>
              <h2 id="footer-cta-heading">Một yêu cầu riêng.<br />Một giải pháp phù hợp.</h2>
            </div>
            <div className="site-footer__cta-actions">
              <ButtonLink href="/lien-he" variant="light-on-dark">Gửi yêu cầu báo giá</ButtonLink>
              <TextLink href="/san-pham" onDark>Xem 13 nhóm sản phẩm</TextLink>
            </div>
          </RevealOnScroll>
        </section>
      )}
      <div className="home-container site-footer__main">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" aria-label="Sunflower — Trang chủ"><SunflowerLogo variant="mono-light" showWordmark /></Link>
            <p>Tem nhãn, bao bì & vật tư in ấn<br />cho doanh nghiệp.</p>
          </div>
          <div>
            <h3 className="home-kicker">KHÁM PHÁ</h3>
            <ul>{ALL_SITEMAP_ROUTES.map((route) => <li key={route.href}><Link href={route.href}>{route.label}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="home-kicker">SẢN PHẨM</h3>
            <ul>{PRODUCT_FAMILIES.map((family) => <li key={family.id}><Link href={getProductFamilyHref(family.id)}>{family.shortName}</Link></li>)}</ul>
          </div>
          <div className="site-footer__contact">
            <h3 className="home-kicker">KẾT NỐI</h3>
            <p>{COMPANY_INFO.locationRegion}</p>
            <dl>{contactItems.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            {contactItems.length === 0 && <p className="site-footer__pending">Thông tin liên hệ chính thức đang cập nhật trong bản demo.</p>}
            <TextLink href="/lien-he" onDark>Trang liên hệ</TextLink>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.brandName}</p>
          <Link href="/lien-he#chinh-sach-bao-mat">Bảo mật thông tin báo giá</Link>
          <p>Tem nhãn. Tạo dấu ấn.</p>
        </div>
      </div>
    </footer>
  );
}
