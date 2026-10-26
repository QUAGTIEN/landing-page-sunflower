import { ButtonLink, TextLink } from "@/components/ui/Primitives";
import { ProductOrbit } from "@/components/animations/ProductOrbit";
import { PRODUCT_ORBIT_ITEMS } from "@/content/productOrbit";

/** Server-rendered copy with progressively enhanced six-family object exploration. */
export function ProductsHeroStage() {
  return (
    <section className="products-hero products-hero--orbit" aria-labelledby="products-hero-heading">
      <div className="container-editorial products-hero__copy">
        <p className="home-kicker">SẢN PHẨM & VẬT TƯ IN ẤN</p>
        <h1 id="products-hero-heading">Vật liệu nhỏ.<br />{" "}Dấu ấn lớn.</h1>
        <p className="products-hero__lead">Tem nhãn, bao bì và vật tư in ấn<br className="hidden sm:block" /> cho từng nhu cầu doanh nghiệp.</p>
        <div className="products-hero__actions">
          <ButtonLink href="#catalog">Khám phá 13 nhóm</ButtonLink>
          <TextLink href="/lien-he">Trao đổi yêu cầu</TextLink>
        </div>
      </div>
      <ProductOrbit items={PRODUCT_ORBIT_ITEMS} />
    </section>
  );
}
