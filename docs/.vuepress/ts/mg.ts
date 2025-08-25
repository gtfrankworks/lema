
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'mongodb',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/mongodb/',
  sidebar: [
    {
      text: 'MongoDB的介绍',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'MongoDB的介绍和安装', link: 'mg1' },
        { text: 'MongoDB聚合查询', link: 'MongoDB聚合查询' },
        { text: 'MongoDB运算命令', link: 'MongoDB运算命令' },
        { text: 'MongoDB事务开发', link: 'MongoDB事务开发' },
        { text: 'MongoDB文档模型', link: 'MongoDB文档模型' },
      ],
    },
    
   
  ]
})
