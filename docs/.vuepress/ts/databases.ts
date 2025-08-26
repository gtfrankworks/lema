
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'db',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/db/',
  sidebar: [
    
    {
      text: '数据库理论知识',
      badge: { text: '理解', type: 'danger' }, 
        icon: 'material-symbols:docs',
      collapsed: false,
      prefix: 'base/',
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: '什么是关系数据库', link: 'SQL DB - 什么是关系数据库' },
        { text: '关系型数据库如何工作', link: 'SQL DB - 关系型数据库是如何工作的' },
        { text: '关系型数据库设计理论', link: 'SQL DB - 关系型数据库设计理论' },
        { text: '数据库系统核心知识点', link: 'SQL DB - 数据库系统核心知识点' },
      ],
    },
    {
      text: 'SQL语言基础',
      badge: { text: '理解', type: 'danger' }, 
      icon: 'material-symbols:docs',
      collapsed: false,
      prefix: 'sql/',
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
       {text: 'SQL语法基础',link: 'SQL语法基础-1'},
       {text: 'SQL语句练习',link: 'SQL语句练习-2'},
       {text: 'SQL题目进阶',link: 'SQL题目进阶-3'},
       {text: 'SQL语句优化',link: 'SQL语句优化-4'},
      ],
    },
    {
      text: 'MySQL数据库',
      badge: { text: 'MySql', type: 'danger' }, 
      icon: 'material-symbols:docs',
      prefix: 'mysql/',
       collapsed: false,
      items: [
       { text: 'MySQL数据库介绍', link: '1' },
       { text: 'MySQL数据库基础架构分析', link: '2' },
       { text: 'MySQL数据优化', link: '3' },
       { text: 'MySQL隐式转换造成索引失效', link: '4' },
        { text: ' MySQL自增主键一定是连续的吗', link: '6' },
        { text: ' MySQL高性能优化规范建议总结', link: '7' },
         { text: ' MySQL索引详解', link: '8' },
         { text: 'MySQL三大日志', link: '9' },
        { text: ' MySQL查询缓存详解', link: '10' },
         { text: 'MySQL执行计划分析', link: '11' },
      ],
    }
   
  ]
})
