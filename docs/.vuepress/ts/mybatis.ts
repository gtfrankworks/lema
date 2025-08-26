import { defineNoteConfig } from 'vuepress-theme-plume'
export default defineNoteConfig({
  dir: 'framework/mybatis',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/framework/mybatis/',
  sidebar: [
    
    {
      text: 'MyBatis技术介绍',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      items: [
        { text: 'MyBatis框架技术的导入', link: 'mybatis学习笔记(1)-对原生jdbc程序中的问题总结.md' },
        { text: 'MyBatis框架整体概述', link: 'mybatis学习笔记(2)-mybatis概述' },
        {text:'MyBatis框架入门案例一',link:'mybatis学习笔记(3)-入门程序一'},
        {text:'MyBatis框架入门案例二',link:'mybatis学习笔记(3)-入门程序二'},
        {text:'Mybatis开发DAO的方式',link:'mybatis学习笔记(4)-开发dao方法'},
        {text:'Mybatis的配置文件说明',link:'mybatis学习笔记(5)-配置文件'},
        {text:'Mybatis的输入映射文件',link:'mybatis学习笔记(6)-输入映射'},
        {text:'Mybatis的输出映射文件',link:'mybatis学习笔记(7)-输出映射'},
        {text:'Mybatis的动态SQL介绍',link:'mybatis学习笔记(8)-动态sql'},
        {text:'Mybatis数据模型分析',link:'mybatis学习笔记(9)-订单商品数据模型分析'},
        {text:'Mybatis一对一查询说明',link:'mybatis学习笔记(10)-一对一查询'},
        {text:'Mybatis一对多查询说明',link:'mybatis学习笔记(11)-一对多查询'},
        {text:'Mybatis多对多查询说明',link:'mybatis学习笔记(12)-多对多查询'},
        {text:'Mybatis延迟加载盖帘',link:'mybatis学习笔记(13)-延迟加载'},
        {text:'Mybatis一级缓存实现',link:'mybatis学习笔记(14)-查询缓存之一级缓存'},
        {text:'Mybatis二级缓存实现',link:'mybatis学习笔记(15)-查询缓存之二级缓存'},
        {text:'Mybatis整合Ehcache',link:'mybatis学习笔记(16)-mybatis整合ehcache'},
        {text:'Spring整合Mybatis',link:'mybatis学习笔记(17)-spring和mybatis整合'},
        {text:'Mybatis的逆向工程',link:'mybatis学习笔记(18)-mybatis逆向工程'},
      ],
    },
  ]
})


