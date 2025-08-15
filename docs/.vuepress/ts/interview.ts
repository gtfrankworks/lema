import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'interview/',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/interview/',
  sidebar: [
    
    {
      text: '职通无忧',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        { text: '简历的重要性', link: 'interview-3' }, 
        { text: 'HR面试常见问题与示范答案', link: 'interview-1' },
        { text: '什么是 STAR 法则', link: 'interview-2' },
        { text: '面试中实际的问题', link: 'interview-4' },
        { text: '自我介绍的重要性', link: 'interview-5' },
        { text: 'HR面试通常关注的维度', link: 'interview-6' },
      ],
    },
  ]
})
