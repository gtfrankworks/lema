
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'tools/git',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/tools/git/',
  sidebar: [
    
    {
      text: 'Git介绍及其安装',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'Git的介绍和操作', link: 'git-1' },
        { text: 'Git的分支操作', link: 'git-2' },
        { text: 'Git的标签操作', link: 'git-3' },
      ],
    },
    
   
  ]
})
