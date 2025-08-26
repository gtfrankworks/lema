
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'PostgreSQL',
  link: '/PostgreSQL/',
  sidebar: [
 {
      text: 'PostgreSQL文档',
      badge: { text: '理解', type: 'danger' }, 
      icon: 'material-symbols:document-scanner-sharp',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'PostgreSQL安装', link: 'PostgreSQL安装' },
        { text: 'PostgreSQL基础', link: 'PostgreSQL基础' },
        { text: 'PostgreSQL语法', link: 'PostgreSQL语法' },
        { text: 'PostgreSQL数据类型', link: 'PostgreSQL数据类型' },
        { text: 'PostgreSQL数据库操作', link: 'PostgreSQL数据库操作' },
        { text: 'PostgreSQL表格操作', link: 'PostgreSQL表格操作' },
         { text: 'PostgreSQL模式SCHEMA', link: 'PostgreSQL模式SCHEMA' },
         { text: 'PostgreSQL操作语句', link: 'PostgreSQL操作语句' },
         { text: 'PostgreSQL约束', link: 'PostgreSQL约束' },
         { text: 'PostgreSQL的Join等', link: 'PostgreSQL的Join等' },
         { text: 'PostgreSQL别名', link: 'PostgreSQL别名' },
         { text: 'PostgreSQL触发器', link: 'PostgreSQL触发器' },
         { text: 'PostgreSQL索引', link: 'PostgreSQL索引' },
         { text: 'PostgreSQL的Alter等', link: 'PostgreSQL的Alter等' },
         { text: 'PostgreSQL视图事务锁', link: 'PostgreSQL视图事务锁' },
         { text: 'PostgreSQL子查询', link: 'PostgreSQL子查询.md' },
           { text: 'PostgreSQL权限', link: 'PostgreSQL权限.md' },
             { text: 'PostgreSQL日期函数和操作符', link: 'PostgreSQL时间日期函数和操作符' },
               { text: 'PostgreSQL常用函数', link: 'PostgreSQL常用函数' },
                 { text: 'PostgreSQL的模式和关系', link: 'PostgreSQL的模式和关系' },
      ],
    },
  ]
})
