
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'ai/agent',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/ai/agent/',
  sidebar: [
    
    {
      text: 'Coze的开发技术',
      badge: { text: '必须学习', type: 'danger' }, 
      icon:'mdi:file-document-multiple',
      collapsed: false,
    //  prefix: 'agent/',
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        //{ text: '1.创建型模式', link: '创建型模式' },
        { text: '1.AI的基础知识', link: 'https://pimpfzadssc.feishu.cn/docx/OMEcdWrP0ooJjOxMVNwcLwW9nhg?from=from_copylink' },
        { text: '2.Coze的介绍', link: 'coze的介绍' },
       
      ],
    },
    
   
  ]
})
