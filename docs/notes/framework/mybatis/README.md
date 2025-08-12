---
title: MyBatis 技术介绍
icon: 📖
createTime: 2025/08/07 16:15:46
permalink: /framework/mybatis/
---
## MyBatis 简介
什么是 MyBatis？
MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## MyBatis 的核心特性

### 1. SQL 与代码分离

MyBatis 允许开发者将 SQL 语句从 Java 代码中分离出来，存储在 XML 文件或注解中，使得代码更加清晰易维护。

### 2. 自动映射

MyBatis 能够自动将数据库查询结果映射到 Java 对象，大大减少了数据转换的工作量。

### 3. 动态 SQL

MyBatis 提供了强大的动态 SQL 功能，可以根据不同条件生成不同的 SQL 语句。

### 4. 缓存机制

MyBatis 内置了一级缓存和二级缓存，可以有效提高应用程序的性能。

------

## MyBatis 的基本架构

### 1. 核心组件

- **SqlSessionFactory**：创建 SqlSession 的工厂类
- **SqlSession**：执行 SQL 命令的主要接口
- **Mapper 接口**：定义数据库操作的方法
- **Mapper XML**：包含 SQL 语句的配置文件

### 2. 工作流程

1. 应用程序通过 SqlSessionFactoryBuilder 创建 SqlSessionFactory
2. SqlSessionFactory 创建 SqlSession
3. SqlSession 获取 Mapper 接口的实例
4. 调用 Mapper 方法执行数据库操作
5. 提交事务并关闭 SqlSession


