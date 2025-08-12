import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'framework/mybatis',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/framework/mybatis/',
  sidebar: [
    
    {
      text: 'MyBatis技术介绍',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'MyBatis框架基础知识', link: 'mybatis-1' },
        { text: 'MyBatis框架配置详解', link: 'mybatis-2' },
        {text:'关联映射和动态SQL机制',link:'mybatis-3'},
        {text:'MyBatis缓存机制',link:'mybatis-4'}
      ],
    },
  ]
})


