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
        { text: 'Spring框架概述', link: 'Spring概述' },
        { text: 'Spring入门案例', link: 'Spring入门案例' },
        { text: 'Spring框架IOC容器', link: 'Spring的IOC容器' },
        { text: 'Spring基于XML管理Bean', link: 'Spring基于XML管理Bean' },
        { text: 'Spring基于注解管理Bean', link: 'Spring基于注解管理Bean' },
        { text: 'Spring原理手写IoC', link: 'Spring原理手写IoC' },
        { text: 'Spring框架AOP详解', link: 'spring-2' },
        { text: 'Spring单元测试JUnit', link: 'Spring单元测试JUnit' },
          { text: 'Spring框架事务详解', link: 'spring-03' },
          { text: 'Spring资源操作', link: 'Spring资源操作' },
          { text: 'Spring国际化I18N', link: 'Spring国际化i18n' },
          { text: 'Spring的数据校验', link: 'Spring的数据校验' },
        { text: 'Spring的AOT编译', link: 'Spring的AOT编译' },
        // { text: 'Spring的入门案例', link: 'spring-02' },
        // { text: 'Spring的IOC的容器', link: 'spring-03' },
        // { text: 'Spring基于XML管理Bean', link: 'spring-04' },
      ],
    },
  ]
})


