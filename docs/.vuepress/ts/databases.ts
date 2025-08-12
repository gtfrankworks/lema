
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'db/base',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/db/base/',
  sidebar: [
    
    {
      text: '数据库理论知识和基础',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'SQL DB -什么是关系数据库', link: 'SQL DB - 什么是关系数据库' },
        { text: 'SQL DB -关系型数据库如何工作', link: 'SQL DB - 关系型数据库是如何工作的' },
        { text: 'SQL DB -关系型数据库设计理论', link: 'SQL DB - 关系型数据库设计理论' },
        { text: 'SQL DB -数据库系统核心知识点', link: 'SQL DB - 数据库系统核心知识点' },
      ],
    },
    {
      text: '数据库理论知识和基础',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
       
        { text: 'SQL DB -什么是关系数据库', link: 'SQL DB - 什么是关系数据库' },
        { text: 'SQL DB -关系型数据库如何工作', link: 'SQL DB - 关系型数据库是如何工作的' },
        { text: 'SQL DB -关系型数据库设计理论', link: 'SQL DB - 关系型数据库设计理论' },
        { text: 'SQL DB -数据库系统核心知识点', link: 'SQL DB - 数据库系统核心知识点' },
      ],
    }
   
  ]
})
