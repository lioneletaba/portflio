import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';

import astroIcon from 'astro-icon';
// import playformCompress from "@playform/compress";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://devolio.devaradise.com',
  integrations: [
    mdx(), 
    sitemap(), 
    tailwind(), 
    partytown(),
    astroIcon({
      include: {
        mdi: ["*"],
        'ri': ['*'],
        'simple-icons': ['*'],
      },
    }),
    // playformCompress({
    //   CSS: false,
    //   Image: false,
    //   Action: {
    //     Passed: async () => true,   // https://github.com/PlayForm/Compress/issues/376
    //   },
    // })
  ],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'localhost:4321'
    }]]
  }
});

