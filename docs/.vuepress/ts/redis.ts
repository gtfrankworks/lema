import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'db/redis',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/db/redis/',
  sidebar: [
    
    {
      text: 'Redis数据库',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        
        { text: 'Redis数据库安装和配置', link: 'redis-01' },
        { text: 'Redis数据类型和常用命令', link: 'redis-02' },
        { text: 'Redis的持久化和事务', link: 'redis-03' },
        { text: 'Redis的主从复制', link: 'redis-04' },
      ],
    },
  ]
})


