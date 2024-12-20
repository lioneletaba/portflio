import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from "./src/autoNewTabExternalLinks";
import astroIcon from "astro-icon";
// import playformCompress from "@playform/compress";
import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    define: {
      __vite__injectQuery: false,
    },
  },

  site: "https://lioneletaba.dev",

  integrations: [
    mdx(),
    sitemap(),
    tailwind(
      {
        applyBaseStyles: false,
      },
    ),
    partytown(),
    astroIcon({
      include: {
        mdi: ["*"],
        "ri": ["*"],
        "simple-icons": ["*"],
      },
    }),
    react(),
  ],

  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: "lioneletaba.dev",
    }]],
  },

  output: "server",
  build: {
    inlineStylesheets: "never",
    assets: "assets",
    excludeMiddleware: true,
    split: true,
  },
  compressHTML: true,
  optimizeImages: true,
  optimizeCss: true,
  adapter: cloudflare(),
});

