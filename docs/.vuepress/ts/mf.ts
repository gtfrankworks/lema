
 import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'framework/mybatisflex',
  link: '/framework/mybatisflex/',
  sidebar: [
    {
      text: 'MyBatisFlex基础',
      badge: { text: '扩展', type: 'danger' },
      icon: 'material-symbols:docs',
      collapsed: false,
      prefix: 'base/',
      items: [
       //{ text: '介绍', link: 'intro', icon: 'ph:info-light' }, 
        { text: 'MyBatisFlex是什么', link: 'MyBatis-Flex是什么' },
         { text: 'MyBatisFlex的快速开始', link: 'MyBatisFlex的快速开始' },
         { text: 'MyBatisFlex的依赖', link: 'MyBatisFlex的依赖' },
         { text: 'MyBatis-Flex框架对比', link: 'MyBatis-Flex功能' },
         { text: '支持的数据库类型', link: '支持的数据库类型' },
         { text: 'MyBatis-Flex的增删改功能', link: 'MyBatis-Flex 的增删改功能' },
         { text: 'MyBatis-Flex的查询功能', link: 'MyBatis-Flex 的查询和分页' },
         { text: 'MyBatis-Flex的自动映射', link: '自动映射' },
         { text: 'MyBatis-Flex的关联查询', link: '关联查询' },
         { text: 'MyBatis-Flex的链式操作', link: '链式操作' },
         { text: 'MyBatis-Flex的批量操作', link: '批量操作' },
         { text: 'MyBatis-Flex的QueryWrapper', link: '灵活的QueryWrapper' },
         { text: 'MyBatis-Flex的Db和Row工具', link: 'Db和Row工具的使用' },
         { text: 'ActiveRecord的使用', link: 'ActiveRecord' },
         { text: '顶级Service接口', link: 'Service顶级接口' },
         { text: 'SpringBoot的配置文件', link: 'SpringBoot的配置文件' },
         { text: 'MyBatisFlexCustomizer使用', link: 'MyBatisFlexCustomizer' },

       
      ]
    },
    {
      text: 'MyBatisFlex核心',
      badge: { text: '扩展', type: 'danger' },
      icon: 'material-symbols:summarize',
      collapsed: false,
       prefix: 'ad/',  
      items: [
        { text: 'Table注解的使用', link: 'Table 注解的使用' },
        { text: 'Id主键的使用', link: 'Id主键的使用' },
        { text: 'Column注解的使用', link: 'Column注解的使用' },
        { text: 'MyBatis-Flex逻辑删除', link: '逻辑删除' },
        { text: 'MyBatis-Flex乐观锁', link: 'MyBatis-Flex乐观锁' },
        { text: 'MyBatiFlex数据填充', link: '数据填充' },
        { text: 'MyBatis-Flex数据脱敏', link: 'MyBatis-Flex数据脱敏' },
        { text: 'MyBatis-Flex数据缓存', link: '数据缓存' },
        { text: 'MyBatis-Flex的SQL审计', link: 'SQL审计' },
        { text: 'MyBatis-Flex的日志', link: 'SQL日志打印' },
        { text: 'MyBatis-Flex多数据源配置', link: '多数据源' },
        { text: 'MyBatis-Flex读写分离', link: '读写分离' },
        { text: 'MyBatis-Flex 数据源加密', link: '数据源加密' },
        { text: 'MyBatis-Flex动态表名', link: '动态表名' },
        { text: 'MyBatis-Flex事务管理', link: '事务管理' },
        { text: 'MyBatis-Flex数据权限', link: '数据权限' },
        { text: 'MyBatis-Flex字段权限', link: '字段权限' },
        { text: 'MyBatis-Flex字段加密', link: '字段加密' },
        { text: 'MyBatis-Flex字典回写', link: '字典回写' },
        { text: 'MyBatis-Flex枚举属性', link: '枚举属性' },
        { text: 'MyBatis-Flex多租户', link: '多租户' },
        { text: 'MyBatis-Flex代码生成器', link: 'MyBatis-Flex代码生成器' },
        { text: 'MyBatis-Flex的APT配置', link: 'MyBatis-Flex的APT配置' },
        { text: 'MyBatis-Flex的KAPT的配置', link: 'kapt' },
      ]
    },


  ]
})

