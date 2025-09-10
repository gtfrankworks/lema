
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
        { text: '1.PostgreSQL安装', link: 'PostgreSQL安装' },
        { text: '2.PostgreSQL基础', link: 'PostgreSQL基础' },
        { text: '3.PostgreSQL语法', link: 'PostgreSQL语法' },
        { text: '4.PostgreSQL数据类型', link: 'PostgreSQL数据类型' },
        { text: '5.PostgreSQL数据库操作', link: 'PostgreSQL数据库操作' },
        { text: '6.PostgreSQL表格操作', link: 'PostgreSQL表格操作' },
         { text: '7.PostgreSQL模式SCHEMA', link: 'PostgreSQL模式SCHEMA' },
         { text: '8.PostgreSQL操作语句', link: 'PostgreSQL操作语句' },
         { text: '9.PostgreSQL约束', link: 'PostgreSQL约束' },
         { text: '10.PostgreSQL的Join等', link: 'PostgreSQL的Join等' },
         { text: '11.PostgreSQL别名', link: 'PostgreSQL别名' },
         { text: '12.PostgreSQL触发器', link: 'PostgreSQL触发器' },
         { text: '13.PostgreSQL索引', link: 'PostgreSQL索引' },
         { text: '14.PostgreSQL的Alter等', link: 'PostgreSQL的Alter等' },
         { text: '15.PostgreSQL视图事务锁', link: 'PostgreSQL视图事务锁' },
         { text: '16.PostgreSQL子查询', link: 'PostgreSQL子查询.md' },
           { text: '17.PostgreSQL权限', link: 'PostgreSQL权限.md' },
             { text: '18.PostgreSQL函数和操作符', link: 'PostgreSQL时间日期函数和操作符' },
               { text: '19.PostgreSQL常用函数', link: 'PostgreSQL常用函数' },
                 { text: '20.PostgreSQL的模式和关系', link: 'PostgreSQL的模式和关系' },
      ],
    },
  ]
})
