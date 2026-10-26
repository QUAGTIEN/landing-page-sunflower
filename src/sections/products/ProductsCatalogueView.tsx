"use client";

import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { PRODUCT_CATEGORIES, PRODUCT_FAMILIES } from "@/content/products";
import { ProductFamilyId } from "@/types";
import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { ProductCutout } from "@/components/ui/ProductCutout";
import { getCatalogObject } from "@/content/catalogObjects";

function formatOrderIndex(id: number): string {
  return id < 10 ? `0${id}` : `${id}`;
}


export function ProductsCatalogueView() {
  const [selectedFamily, setSelectedFamily] = useState<ProductFamilyId | "all">("all");
  const [filtersReady, setFiltersReady] = useState(false);

  useEffect(() => {
    setFiltersReady(true);
    // Native hash navigation must also restore items hidden by a family filter.
    const restoreHashTarget = () => {
      let slug: string;
      try { slug = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!PRODUCT_CATEGORIES.some((item) => item.slug === slug)) return;
      flushSync(() => setSelectedFamily("all"));
      document.getElementById(slug)?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    // Header/footer category links can point to the hash already in the URL.
    // In that case there is no hashchange event to reveal a filtered-out row.
    const onCategoryLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      let slug: string;
      try { slug = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      if (!PRODUCT_CATEGORIES.some((item) => item.slug === slug)) return;
      flushSync(() => setSelectedFamily("all"));
      if (url.hash === window.location.hash) {
        requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ behavior: "auto", block: "start" }));
      }
    };
    window.addEventListener("hashchange", restoreHashTarget);
    document.addEventListener("click", onCategoryLink, true);
    return () => {
      window.removeEventListener("hashchange", restoreHashTarget);
      document.removeEventListener("click", onCategoryLink, true);
    };
  }, []);

  const filteredProducts =
    selectedFamily === "all"
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((item) => item.familyId === selectedFamily);

  return (
    <>
      {/* Native links remain usable before hydration, including all 13 anchors. */}
      <section
        id="catalog"
        aria-label="Bộ lọc họ sản phẩm và chỉ mục 13 nhóm"
        className="catalog-directory"
      >
        <div className="container-editorial">
          <div className="catalog-directory__heading">
            <div><p className="home-kicker">DANH MỤC SẢN PHẨM</p><h2>Chọn đúng cho nhu cầu của bạn.</h2></div>
            <p>13 nhóm sản phẩm, 6 họ giải pháp.<br />Tìm theo nhóm hoặc trao đổi quy cách cùng Sunflower.</p>
          </div>

            <div className="catalog-filters" role="group" aria-label="Lọc theo họ sản phẩm">
              <button
                type="button"
                disabled={!filtersReady}
                onClick={() => setSelectedFamily("all")}
                aria-pressed={selectedFamily === "all"}
              >
                Tất cả 13 nhóm
              </button>
              {PRODUCT_FAMILIES.map((fam) => {
                const isActive = selectedFamily === fam.id;
                return (
                  <button
                    key={fam.id}
                    type="button"
                    disabled={!filtersReady}
                    onClick={() => setSelectedFamily(fam.id)}
                    aria-pressed={isActive}
                  >
                    {fam.shortName}
                  </button>
                );
              })}
            </div>
          <noscript><p className="catalog-directory__status">Chọn nhóm từ chỉ mục bên dưới. Bộ lọc theo họ cần JavaScript.</p></noscript>

          {/* 13 Canonical Anchor Pills */}
          <nav className="catalog-index" aria-label="Chuyển đến một trong 13 nhóm">
            {PRODUCT_CATEGORIES.map((prod) => {
              const idxStr = formatOrderIndex(prod.id);
              return (
                <a
                  key={prod.slug}
                  href={`#${prod.slug}`}
                  onClick={() => {
                    // Commit visibility before the browser's native anchor action.
                    flushSync(() => setSelectedFamily("all"));
                  }}
                >
                  <span aria-hidden="true">
                    {idxStr}
                  </span>
                  <span>{prod.name}</span>
                </a>
              );
            })}
          </nav>
          <p className="catalog-directory__status" role="status" aria-live="polite">Đang hiển thị {filteredProducts.length} / 13 nhóm · Hình sản phẩm là minh họa cho bản demo.</p>
        </div>
      </section>

      {/* Main 13 Product Categories — Editorial Alternating Rows */}
      <section
        aria-label="Chi tiết 13 nhóm sản phẩm cấp 1"
        className="catalog-list"
      >
          {PRODUCT_CATEGORIES.map((product, idx) => {
            const orderIdx = formatOrderIndex(product.id);
            const media = getCatalogObject(product.slug);
            const visible = selectedFamily === "all" || selectedFamily === product.familyId;

            return (
              <article
                key={product.slug}
                id={product.slug}
                hidden={!visible}
                className="catalog-row"
                data-tone={Math.floor(idx / 2) % 2 === 0 ? "ivory" : "beige"}
                data-reverse={idx % 2 === 1}
                aria-labelledby={`${product.slug}-heading`}
              >
                <div className="container-editorial catalog-row__grid">
                  {/* Visual Stage Column (6/12) */}
                  <div className="catalog-row__visual">
                    {media && <ProductCutout media={media} className={media.aspectRatio === "1:1" ? "catalog-object--inset-source" : ""} />}
                  </div>

                  {/* Technical Specification & Quote Pathway Column (6/12) */}
                  <div className="catalog-row__copy">
                    <p className="catalog-row__eyebrow"><span>{orderIdx} / 13</span>{product.familyName}</p>

                    <h2 id={`${product.slug}-heading`}>
                      {product.name}
                    </h2>

                    <p className="catalog-row__summary">
                      {product.summary}
                    </p>

                    <details className="catalog-details">
                      <summary>Thông số & ứng dụng<span className="catalog-details__indicator" aria-hidden="true" /></summary>
                    <div className="catalog-details__body">
                    <dl className="catalog-specs">
                      {product.specifications.map((spec) => (
                        <div
                          key={spec.label}
                        >
                          <dt>
                            {spec.label}
                          </dt>
                          <dd>
                            {spec.isTodo ? "Danh mục chi tiết đang được xác nhận. Vui lòng nêu nhu cầu khi báo giá." : spec.value}
                          </dd>
                        </div>
                      ))}

                      <div>
                        <dt>
                          Ứng dụng tiêu biểu
                        </dt>
                        <dd><ul className="catalog-applications">
                          {product.applications.map((app) => (
                            <li
                              key={app}
                            >
                              {app}
                            </li>
                          ))}
                        </ul></dd>
                      </div>
                    </dl>

                    {/* Quote Specification Helper Box */}
                    <div className="catalog-quote-fields">
                      <p>
                        Chuẩn bị khi yêu cầu báo giá
                      </p>
                      <ul>
                        {product.quoteFields.map((qf) => (
                          <li key={qf}>
                            <span>{qf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>
                    </details>

                    {/* Conversion Actions */}
                    <div className="catalog-row__actions">
                      <ButtonLink
                        href={`/lien-he?san-pham=${product.slug}`}
                        variant="primary"
                      >
                        Yêu cầu báo giá {product.name}
                      </ButtonLink>
                      <TextLink href="/giai-phap">
                        Tư vấn chất liệu
                      </TextLink>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
      </section>


    </>
  );
}
