import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'framework/spring',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/framework/spring/',
  sidebar: [
    
    {
      text: 'Spring技术体系',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'Spring框架基础知识', link: 'spring-01' },
        { text: 'Spring框架AOP详解', link: 'spring-2' },
        { text: 'Spring框架事务详解', link: 'spring-03' },
      ],
    },
  ]
})


