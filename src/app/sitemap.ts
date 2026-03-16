import type { MetadataRoute } from "next";
import { SERVICE_ZONES_UNIQUE, SERVICES } from "@/lib/config";

const BASE_URL = "https://www.kaytek-services.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Pages locales /serrurier-urgence-[slug] — priorité haute (SEO local)
  const localZoneRoutes: MetadataRoute.Sitemap = SERVICE_ZONES_UNIQUE.map((zone) => ({
    url: `${BASE_URL}/serrurier-urgence/${zone.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...localZoneRoutes];
}
