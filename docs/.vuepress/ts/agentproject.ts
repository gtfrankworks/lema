
import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
 dir: 'ai',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
  link: '/ai/',
  sidebar: [
    
    {
      text: '工作效率案例',
      badge: { text: '必须学习', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      prefix: 'officeproject/',
      items: [
        { text: '1.DeepSeek和PPT的结合', link: 'deepseek和PPT的结合' },
        { text: '2.DeepSeek和wps的集成', link: 'deepseek和wps的集成' },
        { text: '3.WPS自带的助手', link: 'wps自带的助手' },
        { text: '4.DeepSeek和剪映生成口播视频', link: 'deepseek配合剪映生成口播视频' },
        { text: '5.DeepSeek搭建数字人口播视频', link: 'DeepSeek来搭建数字人的口播视频' },
        { text: '6.DeepSeek和即梦的结合', link: 'deepseek和即梦' },
        { text: '7.文字生成图片', link: '文字生成图片' },
        { text: '8.文字生成视频', link: '文字生成视频' },
        { text: '9.DeepSeek私有化部署', link: 'deepseek私有化部署' },
        { text: '10.Deepseek+xmind思维导图', link: 'deepseek+xmind思维导图' },
        { text: '11.Deepseek的mermaid图表', link: 'deepseek的mermaid可视化图表' },
        { text: '12.Deepseek的Draw图表', link: 'deepseek的Drawio生成图表' },
        { text: '13.Deepseek创建流程图和类图', link: 'deepseek创建流程图和类图' },
      ],
    },
       {
      text: '工作流的案例',
      badge: { text: '必须学习', type: 'danger' }, 
      icon: 'material-symbols:construction',
      collapsed: false,
      prefix: 'workflow/',
      items: [
        //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        //{ text: '1.创建型模式', link: '创建型模式' },
        { text: '1.工作流案例更新中', link: 'https://pimpfzadssc.feishu.cn/base/PG1Ob5J0saQb5bs5yVgcUQZhnbh?from=from_copylink' },
      
       
      ],
    },
   
  ]
})
