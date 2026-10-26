import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./typography-layout.css";
import "./header-navigation.css";
import "./products-orbit.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { COMPANY_INFO } from "@/content/company";
import { HEADER_SUBMENUS } from "@/content/headerNavigation";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_INFO.brandName} — Thiết kế, Sản xuất Tem nhãn & Bao bì B2B`,
    template: `%s | ${COMPANY_INFO.brandName}`,
  },
  description: COMPANY_INFO.shortIntro,
  openGraph: {
    title: `${COMPANY_INFO.brandName} — ${COMPANY_INFO.tagline}`,
    description: COMPANY_INFO.shortIntro,
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-btn focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-dark"
        >
          Chuyển tới nội dung chính
        </a>
        <SiteHeader submenus={HEADER_SUBMENUS} />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
