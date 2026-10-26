import React, { Suspense } from "react";
import type { Metadata } from "next";
import { InteriorHero } from "@/components/ui/InteriorHero";
import { QuoteRequestForm } from "@/sections/contact/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Liên hệ & Yêu cầu báo giá B2B",
  description:
    "Gửi thông số kích thước, chất liệu và số lượng dự kiến để nhận tư vấn kỹ thuật và báo giá tem nhãn, bao bì, vật tư in từ Sunflower.",
};

export default function ContactPage() {
  return (
    <>
      <InteriorHero page="contact" />

      <div id="quote-request" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="container-editorial py-16 text-sm text-muted-foreground">
              Đang tải biểu mẫu báo giá...
              <noscript><p className="mt-3">Biểu mẫu cần JavaScript. Vui lòng bật JavaScript để điền yêu cầu.</p></noscript>
            </div>
          }
        >
          <QuoteRequestForm />
        </Suspense>
      </div>
    </>
  );
}
