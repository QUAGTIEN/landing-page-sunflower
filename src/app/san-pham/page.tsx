import type { Metadata } from "next";
import { ProductsHeroStage } from "@/sections/products/ProductsHeroStage";
import { ProductsCatalogueView } from "@/sections/products/ProductsCatalogueView";
import { MaterialReference } from "@/sections/products/MaterialReference";

export const metadata: Metadata = {
  title: "Danh mục 13 nhóm sản phẩm tem nhãn, bao bì & vật tư in",
  description:
    "Khám phá 13 nhóm sản phẩm chủ lực của Sunflower: tem nhãn cuộn, tem nhãn tờ, giấy in, mực in Ribbon, máy in/quét mã vạch, hộp giấy, thẻ bài, tem dệt, satin và băng dính.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHeroStage />

      <ProductsCatalogueView />
      <MaterialReference />
    </>
  );
}
