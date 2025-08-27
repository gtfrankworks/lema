/**
 * @see https://theme-plume.vuejs.press/guide/document/ 查看文档了解配置详情。
 *
 * Notes 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Notes，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Notes，然后在与 Note 相关的 Markdown 文件中，自动生成 permalink。
 *
 * 如果你发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 note 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `note.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineNoteConfig` 是用于定义单个 note 配置的帮助函数
 * - `defineNotesConfig` 是用于定义 notes 集合的帮助函数
 *
 * 通过 `defineNoteConfig` 定义的 note 配置，应该填入 `defineNotesConfig` 的 notes 数组中
 */

import { defineNotesConfig } from 'vuepress-theme-plume'
// 尝试添加文件扩展名，若文件存在且为.ts 文件
import  databases  from './ts/databases'
import  mybatis  from './ts/mybatis'
import  interview  from './ts/interview'
import  spring  from './ts/spring'
import git from './ts/git'
import introd from './ts/introd'
import project from './ts/project'
import maven from './ts/maven'
import bigcompany from './ts/bigcompany'
import mg from './ts/mg'
import pg from './ts/pg'
import mf from './ts/mf'
import springboot from './ts/springboot'



export default defineNotesConfig({
  dir:'/notes/',
  link:'/',
  // 移除不在 ThemeNoteListOptions 类型中的 sidebarDepth 属性
  // 若需要此配置，可在其他支持的配置文件中设置
  notes:[
    
      databases,
      mybatis,
    interview,
    spring,
    git,
    introd,
    project,
    maven,
    bigcompany,
    mg,
    pg,
    mf,
    springboot,
  ]
})