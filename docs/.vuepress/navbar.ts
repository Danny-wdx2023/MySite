/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export const zhNavbar = defineNavbarConfig([
  { text: "首页", link: "/", icon: "material-symbols-light:home-rounded" },
  { text: "博客", link: "/blog/", icon: "mingcute:pen-fill" },
  { text: "标签", link: "/blog/tags/", icon: "material-symbols:tag-rounded" },
  { text: "归档", link: "/blog/archives/", icon: "material-symbols:archive" },
  {
    text: "笔记",
    icon: "mdi:notebook",
    items: [{ text: "AI", link: "/notes/ai/README.md", icon: "ix:ai" }],
  },
  {
    text: "更多",
    icon: "icon-park-outline:more-three",
    items: [
      {
        text: "联系我",
        link: "mailto:Danny_wdx2023@aliyun.com",
        icon: "grommet-icons:contact",
      },
      { text: "请杯奶茶", link: "https://afdian.com/a/Danny_wdx2023", icon: "line-md:coffee-loop" },
    ],
  },
]);

export const enNavbar = defineNavbarConfig([
  { text: "Home", link: "/en/", icon: "material-symbols-light:home-rounded" },
  { text: "Blog", link: "/en/blog/", icon: "mingcute:pen-fill" },
  {
    text: "Tags",
    link: "/en/blog/tags/",
    icon: "material-symbols:tag-rounded",
  },
  {
    text: "Archives",
    link: "/en/blog/archives/",
    icon: "material-symbols:archive",
  },
  {
    text: "Notes",
    icon: "mdi:notebook",
    items: [{ text: "AI", link: "/en/notes/ai/README.md", icon: "ix:ai" }],
  },
  {
    text: "More",
    icon: "icon-park-outline:more-three",
    items: [
      {
        text: "Contact me",
        link: "mailto:Danny_wdx2023@aliyun.com",
        icon: "grommet-icons:contact",
      },
      { text: "Sponsor", link: "https://afdian.com/a/Danny_wdx2023", icon: "line-md:coffee-loop" },
    ],
  },
]);
