
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'design',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/design/',
  sidebar: [
    
    {
      text: '设计模式',
      badge: { text: '了解', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        //{ text: '1.创建型模式', link: '创建型模式' },

        { text: '1.单例模式', link: '单例模式' },
        { text: '2.原型模式', link: '原型模式' },
        { text: '3.工厂模式', link: '工厂模式' },
        { text: '4.抽象工厂模式', link: '抽象工厂模式' },
        { text: '5.建造者模式', link: '建造者模式' },
        { text: '6.代理模式', link: '代理模式' },
        { text: '7.装饰者模式', link: '装饰者模式' },
        { text: '8.桥连接模式', link: '桥连接模式' },
        { text: '9.适配器模式', link: '适配器模式' },
        { text: '10.外观模式', link: '外观模式' },
        { text: '11.享元模式', link: '享元模式' },
        { text: '12.组合模式', link: '组合模式' },
        { text: '13.观察者模式', link: '观察者模式' },
        { text: '14.策略模式', link: '策略模式' },
        { text: '15.模板方法模式', link: '模板方法模式' },
        { text: '16.责任链模式', link: '责任链模式' },
        { text: '17.备忘录模式', link: '备忘录模式' },
        { text: '18.迭代器模式', link: '迭代器模式' },
        { text: '19.命令模式', link: '命令模式' },
        { text: '20.状态模式', link: '状态模式' },
        { text: '21.中介者模式', link: '中介者模式' },
        { text: '22.访问者模式', link: '访问者模式' },
        { text: '23.解释器模式', link: '解释器模式' },
      ],
    },
    
   
  ]
})
