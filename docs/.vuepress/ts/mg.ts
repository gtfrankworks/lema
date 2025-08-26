
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'nosqldb',
  link: '/nosqldb/',
  sidebar: [
 {
       text: 'Redis学习指南',
      badge: { text: '理解', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      prefix: 'redises/',
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'Redis入门概述', link: 'redis入门概述' },
        { text: 'Redis安装配置', link: 'Redis安装配置' },
        { text: 'Redis的10大数据类型', link: 'Redis的10大数据类型' },
        { text: 'Redis持久化详解', link: 'Redis持久化详解' },
        { text: 'Redis的事务机制', link: 'Redis事务' },
        { text: 'Redis管道介绍', link: 'Redis管道' },
        { text: 'Redis发布订阅', link: 'Redis发布订阅' },
        { text: 'Redis的复制介绍', link: 'Redis复制介绍' },
        { text: 'Redis哨兵模式', link: 'Redis哨兵模式' },
        { text: 'Redis集群模式', link: 'Redis集群' },
        { text: 'Redis实战练习', link: 'Redis实战' },
      ],
    },
    {
       text: 'MongoDB资料',
      badge: { text: '理解', type: 'danger' }, 
      icon: 'ep:guide',
      collapsed: false,
      prefix: 'mongodb/',
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
