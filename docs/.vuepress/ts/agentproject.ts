
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
        icon:'mdi:file-document-multiple',
      collapsed: false,
      prefix: 'officeproject/',
      items: [
       // { text: '1.DeepSeek和PPT的结合', link: 'deepseek和PPT的结合' },
       { text: '1.DeepSeek和PPT的结合', link: 'https://pimpfzadssc.feishu.cn/docx/AvJTdEVrmoWSL0xWccfc8rRhnDg?from=from_copylink' },
        { text: '2.DeepSeek和wps的集成', link: 'https://pimpfzadssc.feishu.cn/docx/J8bwdfS1CoX6GexrVlPcUIyantg?from=from_copylink' },
        { text: '3.WPS自带的助手', link: 'https://pimpfzadssc.feishu.cn/docx/ZLqjdjYMRo4H4Ex4Hctc7HRPnjm?from=from_copylink' },
        { text: '4.DeepSeek和剪映口播视频', link: 'https://pimpfzadssc.feishu.cn/docx/JVNydjrkiopdyQx7GVKcuIfknZN?from=from_copylink' },
        { text: '5.DeepSeek搭建数字人视频', link: 'https://pimpfzadssc.feishu.cn/docx/SSLsdw2Gvo88EXxImSEcuBzEn7d?from=from_copylink' },
        { text: '6.DeepSeek和即梦的结合', link: 'https://pimpfzadssc.feishu.cn/docx/CJzTdmLGIoz0iAxDPLTc9nz5n8g?from=from_copylink' },
        { text: '7.文字生成图片', link: 'https://pimpfzadssc.feishu.cn/docx/PRPYdfWo2oqoxnxB5pIc9kFDnMe?from=from_copylink' },
        { text: '8.文字生成视频', link: 'https://pimpfzadssc.feishu.cn/docx/LOnQdJl7roabnjxjUanc6uuBn9d?from=from_copylink' },
        { text: '9.DeepSeek私有化部署', link: 'https://pimpfzadssc.feishu.cn/docx/TKcCdHWVuoyJE2xoLZ8cr2L2n7b?from=from_copylink' },
        { text: '10.Deepseek+xmind思维导图', link: 'https://pimpfzadssc.feishu.cn/docx/TCx8dWn39oFn8ExxbZgchwd2n97?from=from_copylink+xmind思维导图' },
        { text: '11.Deepseek的mermaid图表', link: 'https://pimpfzadssc.feishu.cn/docx/WzoIdEH1doYaT0xni9uciVOPnoh?from=from_copylink' },
        { text: '12.Deepseek的Draw图表', link: 'https://pimpfzadssc.feishu.cn/docx/C3K2di9oLo0MtJxVfOIciv2bnEh?from=from_copylink' },
        { text: '13.Deepseek创建流程图类图', link: 'https://pimpfzadssc.feishu.cn/docx/DYxgdRS9goncplxxsOlchZ7enng?from=from_copylink' },
      ],
    },
       {
      text: '工作流的案例',
      badge: { text: '必须学习', type: 'danger' }, 
      icon:'mdi:file-document-multiple',
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
