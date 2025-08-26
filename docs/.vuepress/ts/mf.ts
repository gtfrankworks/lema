
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'mybatisflex',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/mybatisflex/',
  sidebar: [
    
    {
      text: 'MyBatisFlex框架',
      badge: { text: '框架', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'MyBatisFlex是什么', link: 'MyBatis-Flex是什么' },
         { text: 'MyBatisFlex的快速开始', link: 'MyBatisFlex的快速开始' },
         { text: 'MyBatisFlex的依赖', link: 'MyBatisFlex的依赖' },
         { text: 'MyBatis-Flex框架对比', link: 'MyBatis-Flex功能' },
         { text: '支持的数据库类型', link: '支持的数据库类型' },
         { text: 'MyBatis-Flex的增删改功能', link: 'MyBatis-Flex 的增删改功能' },
         { text: 'MyBatis-Flex的查询功能', link: 'MyBatis-Flex 的查询和分页' },
         { text: 'MyBatis-Flex的自动映射', link: '自动映射' },
         { text: 'MyBatis-Flex的关联查询', link: '关联查询' },
         { text: 'MyBatis-Flex的链式操作', link: '链式操作' },
         { text: 'MyBatis-Flex的批量操作', link: '批量操作' },
         { text: 'MyBatis-Flex的QueryWrapper', link: '灵活的QueryWrapper' },
         { text: 'MyBatis-Flex的Db和Row工具', link: 'Db和Row工具的使用' },
         { text: 'ActiveRecord的使用', link: 'ActiveRecord' },
      ],
    },
    
   
  ]
})
