/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */


import { defineNavbarConfig } from 'vuepress-theme-plume'
export default defineNavbarConfig([


  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '面试锦囊',  icon: 'material-symbols:work',
    items: [
      { text: '直通无忧陪跑', 
        icon:'material-symbols:construction',
        items: [
          // {
          //   text: '面试常见面问题',
          //   link: '/interview/README.md',
          //   //badge: '软技能'
          // badge: '软技能'
          // },
          //  {
          //   text: '面试题实战准备',
          //   link: '/bigcompany/README.md',
          //   badge: '硬核实力'
          // },
          { text: '面试常见面问题', link: '/interview/README.md', badge: '软技能' },
          { text: '面试题实战准备', link: '/bigcompany/README.md', badge: '硬核实力' },
        ]
      },
      
    ]
    },
  { text: '就业资讯', link: '/blog/', icon: 'material-symbols:news' },
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
          {
            text: 'Maven操作指南',
            link: '/tools/maven/README.md',
            badge: '工具'
          },
        ]
      },
      { text: '项目中常见的工具', 
        icon:'material-symbols:construction',
        items: [
          {
            text: '项目常用的工具',
            link: '/tools/project/README.md',
            badge: '核心'
          },
        ]
      },
    ]
    },
   { text: 'Spring体系',icon: 'material-symbols:document-scanner-sharp',
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
            link: '/notes/framework/springmvc/README.md',
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
        icon: 'material-symbols:database',
        items: [
          {
            text: '数据库基础和原理',
            icon: 'material-symbols:docs',
            items: [
              {
                text: 'MySQL数据库',
                link: '/notes/db/base/README.md',
               icon: 'material-symbols:database',
                badge: '关系数据库'
              },
               {
                text: 'PostgreSQL数据库',
                link: '/notes/PostgreSQL/README.md',
                icon: 'material-symbols:database-outline',
                badge: 'NoSQl数据库'
              },
              
            ],
          },
          { text: 'NoSQL数据库技术',
        icon:'mdi:idea',
        items: [
          {
            text: 'NoSQL数据库',
                link: '/notes/nosqldb/redises/README.md',
                icon: 'material-symbols:database-outline',
                badge: 'NoSQl数据库'
          },
        ]
       }
          
        ],
      },
      {
        text: 'ORM框架',
        icon: 'mdi:idea',
        items: [
          {
            text: '常用ORM框架技术',
            icon: 'material-symbols:database',
            items: [
              {
                text: 'MyBatis技术介绍',
                link: '/notes/framework/mybatis/README.md',
                //icon: 'mdi:paper-airplane',
                badge: '徽章'
              },
              {
                text: 'MyBatisFlex框架技术',
                link: '/mybatisflex/README.md',
                //icon: 'mdi:paper-airplane',
                badge: '徽章'
              },
            ],
          },
          
          
        ],
      },
      { text: '关于我们', link: '/introd/', icon:'mdi:paper-airplane' },

])
