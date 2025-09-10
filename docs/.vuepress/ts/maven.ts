
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'tools/maven',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/tools/maven/',
  sidebar: [
    
    {
      text: 'Maven介绍及使用',
      badge: { text: '工具', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: '1.Maven的作用', link: 'maven1' },
        { text: '2.Maven环境设置', link: 'maven2' },
        { text: '3.Maven的POM', link: 'mavenpom' },
        { text: '4.Maven的构建生命周期', link: 'maven4' },
        { text: '5.Maven 构建配置文件', link: 'maven5' },
        { text: '6.Maven 存储库', link: 'maven6' },
        { text: '7.Maven 插件', link: 'maven7' },
        { text: '8.Maven 创建项目', link: 'maven9' },
        { text: '9.Maven 构建和测试', link: 'maven10' },
        { text: '10.Maven 外部依赖', link: 'maven11' },
        { text: '11.Maven 项目文档', link: 'maven12' },
        { text: '12.Maven 项目模板', link: 'maven13' },
         { text: '13.Maven 快照', link: 'maven14' },
        { text: '14.Maven 自动化构建', link: 'maven15' },
        { text: '15.Maven 管理依赖项', link: 'maven16' },
        { text: '16.Maven Web应用程序', link: 'maven17' },
      ],
    },
    
   
  ]
})
