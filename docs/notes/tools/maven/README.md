---
title: Maven的介绍
createTime: 2025/08/20 13:03:07
permalink: /tools/maven/
---
Maven 可以理解为 **一个 Java 项目的构建管理工具**，也是目前最常用的构建工具之一（特别是在 Java 后端开发中）。它不仅仅是一个“打包工具”，还涉及 **依赖管理、构建流程自动化、项目生命周期管理** 等。下面我给你分层次介绍。

------

## 一、Maven 的介绍

- **全称**：Apache Maven
- **开发者**：Apache 软件基金会
- **定位**：一个 **项目管理和构建工具**，主要服务于 Java 项目，但也可以扩展到其他语言。
- **配置核心**：`pom.xml`（Project Object Model，项目对象模型），用来描述项目的基本信息、依赖、插件以及构建配置。

------

## 二、Maven 的主要作用

1. **依赖管理**

   - 项目需要用到第三方库（比如 Spring、MyBatis、JUnit 等），Maven 可以从 **中央仓库** 自动下载，不需要手动找 jar 包。
   - 可以管理依赖的版本、传递依赖（A 依赖 B，B 依赖 C，Maven 会自动把 C 也下载下来）。

   ✅ 示例：

   ```
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
       <version>3.4.0</version>
   </dependency>
   ```

2. **构建管理**

   - 包括 **编译、测试、打包、部署** 等操作，都可以通过一行命令完成（`mvn clean install`）。
   - 解决了开发中 **环境不一致**、手动打包繁琐 的问题。

3. **统一项目结构**

   - Maven 推荐的标准目录结构，使得不同开发者之间的项目更容易理解。

   ```
   src/
     main/
       java/        # Java 源代码
       resources/   # 配置文件
     test/
       java/        # 测试代码
   target/          # 编译、打包后的文件
   ```

4. **项目生命周期管理**

   - Maven 定义了项目从 **清理 → 编译 → 测试 → 打包 → 安装 → 部署** 的完整流程。
   - 常用命令：
     - `mvn clean`：清理
     - `mvn compile`：编译
     - `mvn test`：执行测试
     - `mvn package`：打包（生成 jar/war）
     - `mvn install`：安装到本地仓库
     - `mvn deploy`：部署到远程仓库

5. **插件机制**

   - Maven 本身只是个“框架”，具体功能通过插件实现。
   - 例如：
     - `maven-compiler-plugin` → 负责编译
     - `maven-surefire-plugin` → 负责运行测试
     - `spring-boot-maven-plugin` → 打包 Spring Boot 可运行 jar

6. **支持多模块项目**

   - 大型项目常常拆分为多个子模块，Maven 可以集中管理父项目与子模块之间的依赖和版本。

------

## 三、总结

👉 一句话概括：
 **Maven 是 Java 项目的“全能管家”，它帮你管 jar 包、管项目结构、管构建流程，让开发者专注于写业务代码，而不是花时间在环境配置和打包上。**