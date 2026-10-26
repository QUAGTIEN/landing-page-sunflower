import React from "react";
import { getCatalogObject } from "@/content/catalogObjects";
import type { ProductFamilyId } from "@/types";
import { getProductFamilyHref } from "@/content/home";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/content/company";
import { PRODUCT_FAMILIES } from "@/content/products";
import { CAPABILITY_MEDIA } from "@/content/capabilities";
import { ButtonLink, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const CORE_VALUES = [
  {
    index: "01",
    title: "Tư duy thực tiễn",
    description:
      "Chọn vật liệu theo bề mặt dán, thiết bị và điều kiện bảo quản.",
  },
  {
    index: "02",
    title: "Đồng bộ vật tư",
    description:
      "Kết nối tem nhãn, ribbon, bao bì và thiết bị để mua hàng thuận tiện hơn.",
  },
  {
    index: "03",
    title: "Minh bạch quy cách",
    description:
      "Thống nhất kích thước, khe bế, lõi cuộn, chất liệu và mẫu duyệt trước sản xuất.",
  },
];

const VERIFICATION_MILESTONES = [
  {
    label: "Lĩnh vực hoạt động cốt lõi",
    value: "Thiết kế, gia công, sản xuất tem nhãn decal, bao bì hộp, nhãn may mặc & cung ứng vật tư – thiết bị mã vạch",
    verified: true,
  },
  {
    label: "Khu vực phục vụ trọng điểm",
    value: "Hà Nội và các khu công nghiệp, cụm sản xuất tại khu vực phía Bắc",
    verified: true,
  },
  {
    label: "Danh mục cung ứng chuẩn hóa",
    value: "06 họ giải pháp · 13 nhóm sản phẩm & vật tư cấp 1",
    verified: true,
  },
  {
    label: "Năm thành lập & Quy mô nhà xưởng",
    value: "TODO_CONTENT: Chờ bổ sung số liệu năm thành lập, diện tích xưởng và công suất thiết bị chính thức từ Sunflower",
    verified: false,
  },
  {
    label: "Chứng chỉ quản lý chất lượng",
    value: "TODO_CONTENT: Chờ xác nhận danh mục chứng chỉ / tiêu chuẩn chất lượng thực tế",
    verified: false,
  },
];


const FAMILY_OBJECTS: Record<ProductFamilyId, string> = {
  "tem-nhan-cuon": "tem-trang-cuon",
  "tem-nhan-to": "tem-trang-to",
  "vat-tu-in": "muc-in-ribbon",
  "thiet-bi-ma-vach": "may-in-ma-vach",
  "bao-bi-phu-kien": "hop",
  "nhan-may-mac": "tem-det",
};

export function AboutContentSections() {
  return (
    <>
      <section aria-labelledby="about-story-heading" className="about-story section-spacing">
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="about-story__intro">
              <div>
                <p className="eyebrow">01 / CÂU CHUYỆN SUNFLOWER</p>
                <h2 id="about-story-heading" className="heading-h2">Chuẩn xác từ từng quy cách.</h2>
              </div>
              <div className="about-story__lead">
                <p>{COMPANY_INFO.shortIntro}</p>
                <p>{COMPANY_INFO.editorialStatement}</p>
              </div>
            </div>
            <div className="about-story__grid">
              <figure className="about-story__photo">
                <div>
                  <Image src={CAPABILITY_MEDIA.colorSamplesPhoto.src} alt={CAPABILITY_MEDIA.colorSamplesPhoto.alt}
                    fill sizes="(max-width: 1023px) 90vw, 700px" className="object-cover" />
                </div>
                <figcaption>Hình minh họa chất liệu và bản in · Không phải ảnh cơ sở Sunflower.</figcaption>
              </figure>
              <aside className="company-profile" aria-labelledby="company-profile-heading">
                <p className="eyebrow">HỒ SƠ DOANH NGHIỆP</p>
                <h3 id="company-profile-heading">{COMPANY_INFO.legalName}</h3>
                <dl>
                  {VERIFICATION_MILESTONES.filter((item) => item.verified).map((item) => (
                    <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
                  ))}
                </dl>
                <p className="company-profile__note">Thông tin quy mô và chứng chỉ sẽ được bổ sung sau khi xác nhận.</p>
              </aside>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section aria-labelledby="about-values-heading" className="about-values section-spacing">
        <div className="container-editorial">
          <RevealOnScroll>
            <SectionHeading id="about-values-heading" eyebrow="02 / NGUYÊN TẮC HỢP TÁC"
              title="Rõ ràng để cùng hợp tác."
              description="Thống nhất thông số, phối hợp vật tư và chủ động kế hoạch giao hàng." />
            <div className="about-value-grid">
              {CORE_VALUES.map((val) => (
                <article key={val.index} className="about-value" aria-labelledby={"value-" + val.index + "-heading"}>
                  <span className="about-value__number" aria-hidden="true">{val.index}</span>
                  <div><h3 id={"value-" + val.index + "-heading"}>{val.title}</h3><p>{val.description}</p></div>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section aria-labelledby="about-ecosystem-heading" className="about-ecosystem section-spacing">
        <div className="container-editorial">
          <RevealOnScroll>
            <SectionHeading id="about-ecosystem-heading" eyebrow="03 / HỆ SINH THÁI SẢN PHẨM"
              title="Một hệ sinh thái. Sáu nhóm giải pháp."
              description="Tem nhãn, bao bì, phụ liệu may mặc và vật tư mã vạch trong cùng danh mục."
              align="split" rightSlot={<TextLink href="/san-pham">Xem 13 nhóm sản phẩm</TextLink>} />
          </RevealOnScroll>
          <div className="about-family-grid">
            {PRODUCT_FAMILIES.map((family) => {
              const media = getCatalogObject(FAMILY_OBJECTS[family.id]);
              return (
                <article key={family.id} className="about-family">
                  <Link href={getProductFamilyHref(family.id)} aria-label={"Khám phá " + family.name} className="about-family__link">
                    <div className="about-family__stage">
                      <span className="about-family__index">{family.index} / 06</span>
                      {media && <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 85vw, (max-width: 1023px) 42vw, 400px" />}
                    </div>
                    <div className="about-family__copy">
                      <h3>{family.name}<span aria-hidden="true">↗</span></h3>
                      <p>{family.description}</p>
                      <span className="about-family__action">Khám phá danh mục <span aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="about-family-caption">Vật thể minh họa kiểu dáng cho bản demo · Không đại diện model thiết bị hoặc sản phẩm thực tế.</p>
          <div className="about-supply-cta">
            <p>Trao đổi nhu cầu cung ứng cho doanh nghiệp của bạn.</p>
            <div><ButtonLink href="/lien-he?nhu-cau=hop-tac">Liên hệ hợp tác</ButtonLink><TextLink href="/nang-luc">Xem năng lực & quy trình</TextLink></div>
          </div>
        </div>
      </section>
    </>
  );
}
