import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'framework/springboot',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/framework/springboot/',
  sidebar: [
    
    {
      text: 'Spring技术体系',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      
      items: [
        { text: 'SpringBoot的知识体系', link: 'Springboot的知识体系' },
          { text: 'Springboot入门案例', link: 'Springboot入门案例' },
          { text: 'Springboot常用注解', link: '常用注解' },
          { text: 'Springboot配置文件', link: 'YAML配置文件' },
          { text: 'Springboot日志配置', link: '日志配置' },
          { text: 'Springboot的web开发', link: 'web开发' },
          { text: 'Springboot的数据访问', link: '数据访问' },
          { text: 'Springboot的基础特性', link: 'SpringBoot3基础特性' },
          { text: 'SpringBoot3核心原理', link: 'SpringBoot3核心原理' },
          { text: 'SpringBoot3场景整合', link: 'springboot3场景整合' },
      ],
    },
    
  ]
})


