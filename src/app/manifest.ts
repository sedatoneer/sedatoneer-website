import type { MetadataRoute } from "next";
import { tr } from "@/content/tr";
import { AUTHOR } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AUTHOR,
    short_name: "sedatoneer",
    description: tr.meta.description,
    start_url: "/tr",
    display: "standalone",
    background_color: "#008080",
    theme_color: "#000080",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
