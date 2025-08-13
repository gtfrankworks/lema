/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { icon } from 'mermaid/dist/rendering-util/rendering-elements/shapes/icon.js'
import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  // { text: '首页', link: '/' },
  // { text: '博客', link: '/blog/' },
  // { text: '关于我们', link: '/about/' },
  // { text: '学习平台', link: '/platform/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },

  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '面试', link: '/interview/', icon: 'material-symbols:favorite' },
  { text: '就业资讯', link: '/blog/', icon: 'material-symbols:article-outline' },
   { text: '工具资源',  icon: 'material-symbols:construction',
    items: [
      { text: 'Git基础知识和使用指南', 
        icon:'material-symbols:construction',
        items: [
          {
            text: 'Git基础知识',
            link: '/tools/git/README.md',
            badge: '核心'
          },
        ]
      },
    ]
    },
   { text: 'Spring体系',icon: 'material-symbols:docs',
    items: [
      { text: 'Spring体系技术',
        icon:'mdi:idea',
        items: [
          {
            text: 'Spring框架技术',
            link: '/notes/framework/spring/README.md',
            badge: '核心'
          },
           {
            text: 'SpringMVC框架技术',
            link: '/notes/framework/spring/README.md',
            badge: '了解'
          },
           {
            text: 'SpringBoot框架技术',
            link: '/notes/framework/spring/README.md',
            badge: '重点'
          },
        ]
       },
      { text: 'SpringAI体系技术',
        icon:'mdi:idea',
        items: [
          {
            text: 'Spring框架技术',
            link: '/notes/framework/spring/README.md',
            badge: '徽章'
          },
        ]
       },
    ]

    },
  {
        text: '数据库',
        icon: 'material-symbols:dataset',
        items: [
          {
            text: '数据库基础和原理',
            icon: 'material-symbols:database',
            items: [
              {
                text: '数据库原理',
                link: '/notes/db/base/README.md',
                //icon: 'mdi:paper-airplane',
                badge: '徽章'
              },
              {
                text: 'SQL语言',
                link: '#',
               // icon: 'material-symbols:database',
              },
            ],
          },
          {
            text: 'NoSQL数据库',
            icon: 'mingcute:plugin-2-fill',
            badge: { text: '徽章', type: 'warning' },
            items: [
              {
                text: 'Redis数据库',
                link: '/db/redis/README.md',
                icon: 'pajamas:feature-flag',
              },
              
            
            ],
          },
        ],
      },
      {
        text: 'ORM框架',
        icon: 'mdi:idea',
        items: [
          {
            text: 'MyBatis框架技术',
            icon: 'material-symbols:database',
            items: [
              {
                text: 'MyBatis技术介绍',
                link: '/notes/framework/mybatis/README.md',
                //icon: 'mdi:paper-airplane',
                badge: '徽章'
              },
              {
                text: 'SQL语言',
                link: '#',
               // icon: 'material-symbols:database',
              },
            ],
          },
          // {
          //   text: 'Vuepress Plugin',
          //   icon: 'mingcute:plugin-2-fill',
          //   badge: { text: '徽章', type: 'warning' },
          //   items: [
          //     {
          //       text: 'caniuse',
          //       link: '/vuepress-plugin/caniuse/',
          //       icon: 'pajamas:feature-flag',
          //     },
          //     {
          //       text: 'auto-frontmatter',
          //       link: '/vuepress-plugin/auto-frontmatter/',
          //       icon: 'material-symbols:move-selection-down-rounded',
          //     },
            
          //   ],
          // },
        ],
      },
      { text: '关于我们', link: '/introd/', icon:'mdi:paper-airplane' },

])
