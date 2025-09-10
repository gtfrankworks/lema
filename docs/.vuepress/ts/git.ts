
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'tools/git',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/tools/git/',
  sidebar: [
    
    {
      text: 'Git介绍及其安装',
      badge: { text: '重点', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: '1.初识Git的概念', link: '初识Git' },
        { text: '2.Git的特性', link: 'Git的特性' },
        { text: '3.使用Git的方式', link: '使用Git的方式-3' },
        { text: '4.Git安装Git', link: '安装Git-4' },
        { text: '5.Git初始配置', link: '初始配置-5' },
        { text: '6.Git创建本地仓库', link: '创建本地仓库-6' },
        { text: '7.Git更新文件并提交', link: '更新文件并提交-7' },
        { text: '8.Git查看提交历史', link: '查看提交历史-8' },
        { text: '9.Git设置别名', link: '设置别名-9' },
        { text: '10.Git切换版本', link: '切换版本-10' },
         { text: '11. Git标签操作', link: '标签操作-11' },
        { text: '12. Git撤销修改-本地已保存状态', link: '撤销修改-本地已保存状态-12' },
        { text: '13. Git撤销修改-已暂存状态下', link: '撤销修改-已暂存状态下-13' },
       { text: '14. Git还原修改-已提交状态下', link: '还原修改-已提交状态下-14' },
       { text: '15. Git从分支中删除提交', link: '从分支中删除提交-15' },
      { text: '16. Git修改提交内容', link: '修改提交内容-16' },
       { text: '17. Git移动文件', link: '移动文件-17' },
       { text: '18. Git忽略文件', link: '忽略文件-18' },
       { text: '19. Git了解Git对象存储机制', link: '了解Git对象存储机制-19' },
       { text: '20. Git创建分支', link: '创建分支-20' },
       { text: '21. Git合并分支', link: '合并分支-21' },
       { text: '22. Git合并冲突', link: '合并冲突-22' },
       { text: '23. Git撤销合并', link: '撤销合并-23' },
       { text: '24. Git变基和合并', link: '变基和合并-24' },
       { text: '25. Git使用变基合并分支', link: '使用变基合并分支-25' },
       { text: '26. Git合并到主分支', link: '合并到主分支-26' },
       { text: '27. Git多存储库', link: '多存储库-27' },
       { text: '28. Git从原始仓库获取更改', link: '从原始仓库获取更改-28' },
       { text: '29. Git合并已经拉取的更改', link: '合并已经拉取的更改-29' },
       { text: '30. Git拉取并合并', link: '拉取并合并-30' },
       { text: '31. Git创建一个跟踪分支', link: '创建一个跟踪分支-31' },
       { text: '32. Git裸仓库', link: '裸仓库-32' },
       { text: '33. Git推送变更', link: '推送变更-33' },
       { text: '34. Git拉取共享变更', link: '拉取共享变更-34' },
       { text: '35. Git托管Git仓库', link: '托管Git仓库-35' },
       { text: '36. Git常见问题', link: '常见问题-36' },
       { text: '37. GitHub介绍和使用', link: 'github如何向他人的项目提交内容' },
       { text: '38. GitLab介绍和安装', link: 'GitLab的安装' },
      ],
    },
    
   
  ]
})
