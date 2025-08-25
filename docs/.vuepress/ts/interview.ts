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
      badge: { text: '人事常见问题', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        { text: '1.简历的重要性', link: 'interview-3' }, 
        { text: '2.HR面试常见问题与示范答案', link: 'interview-1' },
        { text: '3.什么是 STAR 法则', link: 'interview-2' },
        { text: '4.面试中实际的问题', link: 'interview-4' },
        { text: '5.自我介绍的重要性', link: 'interview-5' },
        { text: '6.HR面试通常关注的维度', link: 'interview-6' },
        { text: '7.HR面试常见陷阱答题', link: 'interview-7' },
        { text: '8.HR面试常见陷阱与应对', link: 'interview-8' },
        { text: '9.人事相关面常见试题', link: 'interview-9' },
        { text: '10.为什么要离职', link: 'interview-10' },
        { text: '11.人事面试介绍环节', link: 'interview-11' },
        { text: '12.罗永浩新东方万字求职信', link: 'interview-12' },


      ],
    },
    
  ]
})
