
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'introd',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/introd/',
  sidebar: [
    
    {
      text: '关于我们',
      icon: 'ep:guide',
      collapsed: false,
    
    },
    
   
  ]
})
