
 import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'bigcompany',
  link: '/bigcompany/',
  sidebar: [
    {
      text: '高频面试题汇总',
      badge: { text: '重点', type: 'danger' },
      icon: 'material-symbols:docs',
      collapsed: false,
      prefix: 'mianshiti/',
      items: [
        { text: '1.Java面试题', link: 'java1' },
        { text: '2.Java基础', link: 'java2' },
        { text: '3.Java集合高频面试题', link: 'javacollection' },
         { text: '5. Java108问必须知道[实习]', link: 'java108问' },
        { text: '4. Mysql事务', link: 'mysql事务' },
       
      ]
    },
    {
      text: '企业笔试真题',
      badge: { text: '重点', type: 'danger' },
      icon: 'material-symbols:summarize',
      collapsed: false,
       prefix: 'company/',  
      items: [
        { text: '1.阿里巴巴-Java工程师', link: '阿里巴巴java工程师' },
        { text: '2.阿里云-Java实习生', link: '阿里云-Java实习生' },
        { text: '3.腾讯-Java高级', link: '腾讯-Java高级' },
        { text: '4.字节跳动-Java工程师', link: '字节跳动-Java工程师' },
        { text: '5.字节跳动-Java大数据工程师', link: '字节跳动-Java大数据工程师' },
        { text: '6.百度-Java中级', link: '百度-Java中级' },
        { text: '7.蚂蚁金服-Java中级', link: '蚂蚁金服-Java中级' },
        { text: '8.蚂蚁金服-Java高级', link: '蚂蚁金服-Java高级' },
        { text: '9.京东-Java中级.md ', link: '京东-Java中级' },
        { text: '10.拼多多-Java工程师（电商部）', link: '拼多多-Java工程师（电商部）' },
        { text: '11.商汤科技-Java高级 ', link: '商汤科技-Java高级' },
        { text: '12.中软国际-Java初级', link: '中软国际-Java初级' },
        { text: '13.唯品会-Java大数据开发', link: '唯品会-Java大数据开发' },
        { text: '14.携程-Java高级 ', link: '携程-Java高级' },
        { text: '15.软通动力-Java工程师', link: '软通动力-Java工程师' },
      ]
    },


  ]
})

