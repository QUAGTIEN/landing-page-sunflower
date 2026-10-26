import { MetadataRoute } from "next";
import { ALL_SITEMAP_ROUTES } from "@/content/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunflower-labels.vercel.app";

  return ALL_SITEMAP_ROUTES.map((route) => ({
    url: `${baseUrl}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
