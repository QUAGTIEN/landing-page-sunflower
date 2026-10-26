import React from "react";
import { EditorialDetails } from "@/components/ui/EditorialDetails";
import Image from "next/image";
import {
  CAPABILITIES_LIST,
  CAPABILITY_MEDIA,
  PRODUCTION_PROCESS_STEPS,
} from "@/content/capabilities";
import { COMPANY_INFO } from "@/content/company";
import { ButtonLink, SectionHeading, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { FileText } from "lucide-react";

const QC_CHECKLIST_ITEMS = [
  {
    code: "QC-01",
    title: "Kiểm tra file chế bản & độ tương phản mã vạch",
    detail:
      "Rà soát kích thước quiet-zone, độ sắc nét của vạch mã 1D/2D, hệ màu in CMYK/Pantone và khoảng bù xén (bleed) trước khi xuất bản in.",
  },
  {
    code: "QC-02",
    title: "Kiểm soát độ sâu dao bế (Kiss-cut) & bước nhảy tem",
    detail:
      "Đảm bảo lưỡi bế cắt đứt chính xác lớp mặt và lớp keo nhưng không phạm vào giấy đế Glassine/Kraft, giúp dây chuyền dán tự động không bị đứt cuộn.",
  },
  {
    code: "QC-03",
    title: "Đối chiếu quy cách cuộn & hướng ra tem",
    detail:
      "Kiểm tra đường kính lõi (25mm / 38mm / 76mm), đường kính ngoài tối đa của cuộn và chiều quấn tem (mặt trong / mặt ngoài) phù hợp máy in khách hàng.",
  },
  {
    code: "QC-04",
    title: "Đóng gói màng co chống ẩm & định danh thùng hàng",
    detail:
      "Bọc màng co bảo vệ từng cuộn/xấp khỏi bụi và độ ẩm kho vận; dán tem định danh rõ mã sản phẩm, quy cách và số lượng ngoài thùng carton.",
  },
];

export function CapabilitiesDetailSections() {
  const hasProfilePdf = Boolean(COMPANY_INFO.profilePdfUrl);

  return (
    <>
      {/* Section 1: 4 Core Production & Supply Capabilities */}
      <section
        aria-labelledby="capabilities-core-heading"
        className="section-spacing border-b border-border bg-background"
      >
        <div className="container-editorial">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="01 / NĂNG LỰC CHUYÊN MÔN"
              id="capabilities-core-heading"
              title="Từ vật liệu đến gia công."
              description="Kết hợp chặt chẽ giữa khâu tư vấn kỹ thuật vật liệu, gia công in – bế theo yêu cầu và cung ứng đồng bộ vật tư mã vạch."
            />


            <div className="capability-overview">
              {CAPABILITIES_LIST.map((cap) => (
                <article key={cap.id} id={cap.id} className="capability-block">
                  <div>
                    <p className="capability-block__index">NĂNG LỰC {cap.index} / 04</p>
                    <h3>{cap.title}</h3>
                    <p className="capability-block__summary">{cap.summary}</p>
                  </div>
                  <div className="capability-block__items">
                    <p>HẠNG MỤC CHÍNH</p>
                    <ul>{cap.details.slice(0, 2).map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    {cap.details.length > 2 && (
                      <EditorialDetails title="Xem thêm hạng mục">
                        <ul>{cap.details.slice(2).map((detail) => <li key={detail}>{detail}</li>)}</ul>
                      </EditorialDetails>
                    )}
                    {cap.verificationNote && !cap.verificationNote.includes("TODO_CONTENT") && (
                      <p className="mt-4 text-sm text-muted-foreground">{cap.verificationNote}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 2: 4-Step Workflow on Dark Charcoal Stage */}
      <section
        aria-labelledby="capabilities-workflow-heading"
        className="section-spacing border-b border-foreground-soft bg-foreground text-on-dark"
      >
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="eyebrow">02 / QUY TRÌNH VẬN HÀNH 04 BƯỚC</p>
                <h2
                  id="capabilities-workflow-heading"
                  className="heading-h2 mt-3 text-on-dark"
                >
                  Bốn bước. Một quy cách thống nhất.
                </h2>
                <p className="body-copy mt-4 text-surface-muted">
                  Mỗi bước đều có đầu ra kỹ thuật (deliverable) rõ ràng để bộ
                  phận mua hàng và kỹ thuật của doanh nghiệp dễ dàng nghiệm thu.
                </p>

                <div className="mt-8 overflow-hidden rounded-frame border border-foreground-soft bg-foreground-soft/30">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={CAPABILITY_MEDIA.pressPhoto.src}
                      alt={CAPABILITY_MEDIA.pressPhoto.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-foreground-soft bg-foreground px-4 py-3">
                    <p className="font-mono text-[11px] text-surface-muted">
                      {CAPABILITY_MEDIA.pressPhoto.caption}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="divide-y divide-foreground-soft border-y border-foreground-soft">
                  {PRODUCTION_PROCESS_STEPS.map((step) => (
                    <div key={step.step} className="py-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-sm font-semibold text-accent">
                            BƯỚC {step.step}
                          </span>
                          <h3 className="text-xl font-semibold text-on-dark">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-surface-muted">
                        {step.description}
                      </p>
                      <div className="mt-4">
                        <span className="inline-block rounded border border-foreground-soft bg-foreground-soft/40 px-3 py-1 font-mono text-xs text-on-dark">
                          Đầu ra nghiệm thu: {step.deliverable}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 3: Quality Control Checklist & Conditional Company Profile PDF */}
      <section
        aria-labelledby="qc-checklist-heading"
        className="section-spacing border-b border-border bg-background"
      >
        <div className="container-editorial">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="03 / KIỂM SOÁT CHẤT LƯỢNG ĐẦU RA"
              id="qc-checklist-heading"
              title="Kiểm tra trước khi bàn giao."
              description="Đảm bảo mỗi cuộn tem và lô vật tư khi tới kho khách hàng đều vận hành trơn tru trên thiết bị thực tế."
            />

            <div className="editorial-qc mt-4 grid grid-cols-1 gap-x-10 md:grid-cols-2">
              {QC_CHECKLIST_ITEMS.map((item) => (
                <div
                  key={item.code}
                  className="border-t border-border py-6"
                >
                  <span className="font-mono text-xs font-semibold text-accent">
                    {item.code}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Honest Company Profile PDF Card */}
            <div className="mt-12 border border-border bg-surface/70 p-7 md:p-9">
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-accent" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      TÀI LIỆU HỒ SƠ NĂNG LỰC (COMPANY PROFILE PDF)
                    </span>
                  </div>
                  <h3 className="heading-h3 mt-2 text-foreground">
                    {hasProfilePdf
                      ? "Tải xuống Hồ sơ năng lực & Danh mục vật tư Sunflower (PDF)"
                      : "Đăng ký nhận Hồ sơ năng lực & Bảng mẫu vật liệu theo ngành"}
                  </h3>
                  <p className="body-copy mt-2 text-muted-foreground">
                    {hasProfilePdf
                      ? "Tài liệu tổng hợp thông tin pháp lý, năng lực sản xuất và danh mục 13 nhóm sản phẩm phục vụ lưu trữ hồ sơ nhà cung cấp (Vendor Profile)."
                      : "Hồ sơ PDF chính thức đang được cập nhật. Bạn có thể nêu nhu cầu tài liệu và mẫu vật liệu trong phiếu yêu cầu."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
                  {hasProfilePdf ? (
                    <ButtonLink href={COMPANY_INFO.profilePdfUrl} variant="primary">
                      Tải Hồ sơ năng lực (PDF)
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      href="/lien-he?nhu-cau=ho-so-nang-luc"
                      variant="primary"
                    >
                      Yêu cầu gửi Hồ sơ năng lực
                    </ButtonLink>
                  )}
                  <TextLink href="/san-pham">Xem 13 nhóm sản phẩm</TextLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
