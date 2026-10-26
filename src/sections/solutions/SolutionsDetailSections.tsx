import React from "react";
import { EditorialDetails } from "@/components/ui/EditorialDetails";
import { ProductCutout } from "@/components/ui/ProductCutout";
import { getCatalogObject } from "@/content/catalogObjects";
import Link from "next/link";
import { SOLUTIONS_LIST } from "@/content/solutions";
import { PRODUCT_CATEGORIES } from "@/content/products";
import { ButtonLink, ProductStage, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

function formatOrderIndex(id: number): string {
  return id < 10 ? `0${id}` : `${id}`;
}

export function SolutionsDetailSections() {
  return (
    <>
      {/* Quick Solution Anchor Bar */}
      <section
        id="solutions-index"
        aria-label="Chỉ mục 4 nhóm giải pháp ngành"
        className="border-b border-border bg-background-pure py-6"
      >
        <div className="container-editorial">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              CHỌN NHANH NHÓM GIẢI PHÁP:
            </span>
            {SOLUTIONS_LIST.map((sol) => (
              <a
                key={sol.slug}
                href={`#${sol.slug}`}
                className="rounded border border-border bg-surface/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground hover:bg-surface"
              >
                <span className="mr-1.5 font-mono text-[10px] font-semibold text-accent">
                  {sol.index}
                </span>
                {sol.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Detailed B2B Solutions */}
      <section
        aria-label="Chi tiết các giải pháp tem nhãn và bao bì theo ngành"
        className="border-b border-border bg-background"
      >
        <div className="container-editorial divide-y divide-border">
          {SOLUTIONS_LIST.map((sol, idx) => {
            const isEven = idx % 2 === 1;
            const objectMedia = getCatalogObject(sol.relatedProductSlugs[0]);
            const relatedProducts = PRODUCT_CATEGORIES.filter((p) =>
              sol.relatedProductSlugs.includes(p.slug)
            );

            return (
              <RevealOnScroll
                key={sol.slug}
                className="editorial-row scroll-mt-24 py-14 md:py-20"
              >
                <article
                  id={sol.slug}
                  className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12"
                >
                  {/* Visual Stage Column (5/12) */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {objectMedia ? <ProductCutout media={objectMedia} className="editorial-object" /> : <ProductStage
                      media={sol.image}
                      indexLabel={`GIẢI PHÁP ${sol.index} / 04`}
                      categoryTitle={sol.title}
                      aspect="4:3"
                    />}

                    {/* Related Product Categories Box */}
                    <div className="mt-6 border-t border-border pt-5">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        Nhóm sản phẩm & vật tư phối hợp ({relatedProducts.length}):
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {relatedProducts.map((prod) => (
                          <Link
                            key={prod.slug}
                            href={`/san-pham#${prod.slug}`}
                            className="rounded border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                          >
                            <span className="mr-1 font-mono text-[10px] text-accent">
                              {formatOrderIndex(prod.id)}
                            </span>
                            {prod.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Technical Problem -> Approach -> Confirmation Points Column (7/12) */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <p className="eyebrow">
                      GIẢI PHÁP {sol.index} · {sol.industryContext.toUpperCase()}
                    </p>
                    <h2 className="heading-h2 mt-3 text-foreground">
                      {sol.title}
                    </h2>

                    {/* Problem vs Recommended Approach */}
                    <div className="mt-6 grid grid-cols-1 gap-4 border-y border-border py-6 md:grid-cols-2 md:gap-8">
                      <div>
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          Vấn đề vận hành thường gặp
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {sol.buyerProblem}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          Hướng giải quyết của Sunflower
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground-soft">
                          {sol.recommendedApproach}
                        </p>
                      </div>
                    </div>

                    <EditorialDetails title="Vật liệu & thông tin cần chuẩn bị">
                    {/* Material Considerations & Confirmation Points */}
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="min-w-0">
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          Cấu hình vật liệu lưu ý
                        </h3>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                          {sol.materialConsiderations.map((mc) => (
                            <li key={mc} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{mc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                          Thông tin cần xác nhận khi báo giá
                        </h3>
                        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                          {sol.confirmationPoints.map((cp) => (
                            <li key={cp} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                              <span>{cp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    </EditorialDetails>
                    {/* CTA Row */}
                    <div className="mt-7 flex flex-wrap items-center gap-5">
                      <ButtonLink
                        href={`/lien-he?nhu-cau=${sol.slug}`}
                        variant="primary"
                      >
                        Nhận tư vấn giải pháp này
                      </ButtonLink>
                      <TextLink href="/san-pham">
                        Tra cứu thông số 13 nhóm sản phẩm
                      </TextLink>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>
    </>
  );
}
