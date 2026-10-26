import React from "react";
import { ButtonLink } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-editorial">
        <p className="eyebrow-index mb-3 text-accent">404 / KHÔNG TÌM THẤY TRANG</p>
        <h1 className="heading-section max-w-xl text-foreground">
          Đường dẫn bạn truy cập không tồn tại hoặc đã thay đổi.
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted-foreground">
          Vui lòng quay lại trang chủ hoặc truy cập trực tiếp danh mục 13 nhóm sản phẩm tem nhãn, bao bì và vật tư in của Sunflower.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="primary">
            Về trang chủ
          </ButtonLink>
          <ButtonLink href="/san-pham" variant="outline">
            Xem danh mục sản phẩm
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
