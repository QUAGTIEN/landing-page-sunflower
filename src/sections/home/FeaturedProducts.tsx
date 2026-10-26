"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HOME_PRODUCTS, getProductFamilyHref } from "@/content/home";
import { PRODUCT_FAMILIES } from "@/content/products";
import { ProductObject } from "@/components/ui/ProductObject";
import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function FeaturedProducts() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [active, setActive] = useState(0);
  const product = HOME_PRODUCTS[active];
  return (
    <section id="san-pham-chu-luc" aria-labelledby="featured-products-heading" className="home-showcase home-section">
      <div className="home-container">
        <RevealOnScroll className="home-section-head">
          <div><p className="home-kicker">02 / SẢN PHẨM</p><h2 id="featured-products-heading" className="home-title">Vật liệu nhỏ.<br />Dấu ấn lớn.</h2></div>
          <TextLink href="/san-pham">Khám phá 13 nhóm sản phẩm</TextLink>
        </RevealOnScroll>
        <div className="home-product-selector" role="group" aria-label="Chọn sản phẩm nổi bật">
          {HOME_PRODUCTS.map((item, index) => (
            <button key={item.id} type="button" disabled={!hydrated} aria-pressed={index === active} aria-controls="featured-product-detail" onClick={() => setActive(index)}>
              <span className="home-index">0{index + 1}</span>{item.label}<span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <noscript><p className="mt-4 text-sm">Xem các nhóm sản phẩm qua liên kết danh mục bên dưới.</p></noscript>
        <p className="sr-only" role="status" aria-live="polite">{product.label}</p>
        <div id="featured-product-detail" className="home-showcase__stage">
          <div className="home-showcase__copy" key={product.slug}>
            <p className="home-kicker">{product.materials}</p>
            <h3>{product.title}</h3>
            <p className="home-body">{product.description}</p>
            <p className="home-showcase__detail">{product.detail}</p>
            <div className="home-actions">
              <ButtonLink href={`/lien-he?san-pham=${product.slug}`}>Yêu cầu báo giá</ButtonLink>
              <TextLink href={`/san-pham#${product.slug}`}>Xem quy cách</TextLink>
            </div>
          </div>
          <div className="home-showcase__object" key={product.id}><ProductObject id={product.id} /></div>
        </div>
        <div className="home-catalog-line">
          <p className="home-kicker">TÌM THÊM SẢN PHẨM</p>
          <nav aria-label="Các nhóm sản phẩm">{PRODUCT_FAMILIES.map((family) => (
            <Link key={family.id} href={getProductFamilyHref(family.id)}>{family.shortName}<span aria-hidden="true">↗</span></Link>
          ))}</nav>
        </div>
      </div>
    </section>
  );
}
