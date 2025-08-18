/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改都会重启 vuepress 服务。
 * 部分配置项的更新没有必要重启 vuepress 服务，建议请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会被覆盖
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { defineNoteConfig, plumeTheme } from 'vuepress-theme-plume'
import notes from './notes'
export default defineUserConfig({
 // base: '/',
  base: '/lema/',
 lang: 'zh-CN',
 // title: '乐码职说',
  description: '乐码职说',    
  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/jpeg', href: 'kclm2.jpg' }],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    
  // 右侧目录深度
    //tocDepth: 4, // 这里控制右侧目录的层级

    
    //article: '/article/',

    
    cache: 'filesystem',
  
    

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    // 站点配置
    profile: {
      avatar: '/images/blog12.png',     // 头像
      name: '乐码职说',               // 名称
      description: '就业形势和就业趋势', // 描述
      location: '中国苏州',      // 位置
      organization: '快程乐码',  
            // 组织/公司
    },
    lastUpdated: false,
   contributors: false,
    //配置首页右侧的github的图标
   social: [],
  
    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
      * markdown
      * @see https://theme-plume.vuejs.press/config/markdown/
      */
    markdown: {
      
      abbr: true,         // 启用 abbr 语法  *[label]: content
      annotation: true,   // 启用 annotation 语法  [+label]: content
      pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      plot: true,         // 启用隐秘文本语法 !!xxxx!!
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      icon: { provider: 'iconify' },        // 启用内置图标语法  ::icon-name::
      table: true,        // 启用表格增强容器语法 ::: table
      codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      npmTo: true,        // 启用 npm-to 容器  ::: npm-to
      demo: true,         // 启用 demo 容器  ::: demo
      repl: {             // 启用 代码演示容器
        go: true,         // ::: go-repl
        rust: true,       // ::: rust-repl
        kotlin: true,     // ::: kotlin-repl
        python: true,     // ::: python-repl
      },
      math: {             // 启用数学公式
        type: 'katex',
      },
      chartjs: true,      // 启用 chart.js
      echarts: true,      // 启用 ECharts
      mermaid: true,      // 启用 mermaid
      flowchart: true,    // 启用 flowchart
      image: {
        figure: true,     // 启用 figure
        lazyload: true,   // 启用图片懒加载
        mark: true,       // 启用图片标记
        size: true,       // 启用图片大小
      },
      include: {},      // 在 Markdown 文件中导入其他 markdown 文件内容
      imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

     //  outline:4,

    watermark: true,
    notes:notes,
     comment: {
      provider: 'Giscus', // "Artalk“ | "Giscus" | "Twikoo" | "Waline"
      comment: true,
      repo: 'gtfrankworks/lemacomment', 
      repoId: 'R_kgDOPfapTA', 
      category: 'Announcements', 
      categoryId: 'DIC_kwDOPfapTM4CuRbg', 
    }
   
  }),
})
