"use client";

import React, { useEffect, useState } from "react";
import { EditorialDetails } from "@/components/ui/EditorialDetails";
import { ProductCutout } from "@/components/ui/ProductCutout";
import { getCatalogObject } from "@/content/catalogObjects";
import { PROJECTS_LIST } from "@/content/projects";
import { ButtonLink, ProductStage, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ShieldCheck } from "lucide-react";

export function ProjectsShowcaseSections() {
  const categories = Array.from(
    new Set(PROJECTS_LIST.map((p) => p.categoryLabel))
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const visibleProjects =
    selectedCategory === "all"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.categoryLabel === selectedCategory);

  return (
    <>
      {/* Filter Bar */}
      <section
        id="projects-index"
        aria-label="Bộ lọc hồ sơ thành phẩm và dự án"
        className="border-b border-border bg-background-pure py-6"
      >
        <div className="container-editorial flex flex-wrap items-center justify-between gap-4">
          <p role="status" aria-live="polite" className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            PHÂN LOẠI QUY CÁCH THÀNH PHẨM ({visibleProjects.length} HỒ SƠ)
          </p>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              disabled={!hydrated}
              aria-pressed={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`rounded px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-foreground text-on-dark"
                  : "border border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              Tất cả hồ sơ ({PROJECTS_LIST.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                disabled={!hydrated}
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-foreground text-on-dark"
                    : "border border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <noscript><p className="text-sm text-muted-foreground">Bật JavaScript để lọc hồ sơ. Toàn bộ hồ sơ được hiển thị bên dưới.</p></noscript>
        </div>
      </section>

      {/* Detailed Case Studies */}
      <section
        aria-label="Danh sách hồ sơ thành phẩm tiêu biểu"
        className="border-b border-border bg-background"
      >
        <div className="container-editorial divide-y divide-border">
          {visibleProjects.map((proj, idx) => {
            const isEven = idx % 2 === 1;
            const objectMedia = getCatalogObject(proj.relatedProductSlug);
            return (
              <RevealOnScroll key={proj.slug} className="editorial-row py-14 md:py-20">
                <article
                  id={proj.slug}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12"
                >
                  {/* Visual Stage (5/12) */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {objectMedia ? <ProductCutout media={objectMedia} className="editorial-object" /> : <ProductStage
                      media={proj.image}
                      indexLabel={`CASE ${proj.index} · ${proj.categoryLabel.toUpperCase()}`}
                      categoryTitle={proj.title}
                      aspect="4:3"
                    />}
                  </div>

                  {/* Case Study Details (7/12) */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="eyebrow">
                        HỒ SƠ {proj.index} · {proj.categoryLabel.toUpperCase()}
                      </span>
                      <span
                        className={`rounded px-2.5 py-0.5 font-mono text-[10px] font-medium ${
                          proj.permissionToPublish
                            ? "bg-surface text-foreground"
                            : "border border-border bg-background-pure text-accent"
                        }`}
                      >
                        {proj.permissionToPublish
                          ? "Mẫu quy cách tiêu chuẩn"
                          : "Minh họa quy cách (Bảo mật nhãn hiệu)"}
                      </span>
                    </div>

                    <h2 className="heading-h2 mt-3 text-foreground">
                      {proj.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{proj.challenge}</p>

                    <EditorialDetails title="Xem yêu cầu & quy cách tham khảo">
                    <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
                      <div className="py-4">
                        <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          02. Cấu hình vật liệu & Quy cách gia công
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-foreground-soft">
                          {proj.specification}
                        </dd>
                      </div>

                      <div className="py-4">
                        <dt className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          03. Mục tiêu ứng dụng
                        </dt>
                        <dd className="mt-1.5 leading-relaxed text-muted-foreground">
                          {proj.outcome}
                        </dd>
                      </div>
                    </dl>
                    </EditorialDetails>

                    <div className="mt-4 rounded-sm border border-border bg-surface/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
                      {proj.statusNote.replace(/\s*\(TODO_CONTENT\)/g, "")}
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-5">
                      <ButtonLink
                        href={`/lien-he?du-an=${proj.slug}&san-pham=${proj.relatedProductSlug}`}
                        variant="primary"
                      >
                        Báo giá theo quy cách này
                      </ButtonLink>
                      <TextLink href={`/san-pham#${proj.relatedProductSlug}`}>
                        Xem nhóm sản phẩm liên quan
                      </TextLink>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* B2B Client Confidentiality & Physical Sample Kit Policy */}
      <section
        aria-labelledby="confidentiality-heading"
        className="section-spacing border-b border-border bg-surface/55"
      >
        <div className="container-editorial">
          <RevealOnScroll>
            <div className="border border-border bg-background-pure p-7 md:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      CHÍNH SÁCH BẢO MẬT NHÃN HIỆU & CUNG CẤP MẪU THỬ B2B
                    </span>
                  </div>
                  <h2
                    id="confidentiality-heading"
                    className="heading-h3 mt-2.5 text-foreground"
                  >
                    Tôn trọng bản quyền thiết kế của khách hàng doanh nghiệp.
                  </h2>
                  <p className="body-copy mt-3 text-muted-foreground">
                    Theo nguyên tắc bảo mật thông tin B2B, Sunflower không tự ý
                    đăng tải công khai thiết kế tem nhãn có chứa thương hiệu,
                    mã vạch nội bộ hoặc quy cách độc quyền của khách hàng khi
                    chưa có sự đồng ý bằng văn bản. Để đánh giá trực tiếp chất
                    lượng giấy mặt, độ bám keo và độ sắc nét đường bế, quý doanh
                    nghiệp có thể đăng ký nhận <strong>Bộ mẫu vật liệu thực tế (Sample Kit)</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
                  <ButtonLink
                    href="/lien-he?nhu-cau=nhan-mau-thu"
                    variant="primary"
                  >
                    Đăng ký nhận mẫu vật liệu
                  </ButtonLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
