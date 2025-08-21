---
title: Maven 存储库
createTime: 2025/08/20 13:33:17
permalink: /tools/maven/8v2jdov0/
---
- ## 什么是Maven存储库？

  用Maven术语来说，存储库是一个目录，所有项目jar，库jar，插件或任何其他项目特定的工件都存储在该目录中，并且Maven可以轻松使用它们。Maven存储库有三种类型。下图说明了这三种类型。。

  - 本地
  - 中央
  - 远程

  ![repo](https://www.cainiaoya.com/images/maven/repo.jpg)

- ## 本地存储库

  Maven本地存储库是计算机上的文件夹位置。首次运行任何maven命令时，将创建该文件。Maven本地存储库保留了项目的所有依赖项（库jar，插件jar等）。当您运行Maven构建时，Maven会自动将所有依赖项jar下载到本地存储库中。它有助于避免在每次构建项目时都引用存储在远程计算机上的依赖项。默认情况下，Maven在％USER_HOME％目录中创建Maven本地存储库。要覆盖默认位置，请在％M2_HOME％\conf目录中提供的Maven settings.xml文件中修改成另一个路径。

  ```xml
  <settings xmlns = "http://maven.apache.org/SETTINGS/1.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/SETTINGS/1.0.0 
     http://maven.apache.org/xsd/settings-1.0.0.xsd">
     <localRepository>C:/MyLocalRepository</localRepository>
  </settings>
  ```

  当您运行Maven命令时，Maven会将依赖项下载到您的自定义路径。

- ## 中央储存库

  Maven中央存储库是Maven社区提供的存储库。它包含大量常用的库。当Maven在本地存储库中找不到任何依赖项时，它将使用以下URL开始在中央存储库中进行搜索

  https://repo1.maven.org/maven2/

  中央存储库的关键概念如下:

  - 该存储库由Maven社区管理。
  - 不需要进行配置。
  - 它需要搜索互联网访问。

  为了浏览中央Maven存储库的内容，Maven社区提供了一个URL- https://search.maven.org/#browse。使用此库，开发人员可以搜索中央存储库中的所有可用库。

- ## 远程仓库

  有时，Maven也在中央存储库中找不到提及的依赖项。然后，它将停止生成过程并将错误消息输出到控制台。为了避免这种情况，Maven提供了Remote Repository的概念，Remote Repository是开发人员自己的包含所需库或其他项目jar的自定义存储库。例如，使用下面提到的POM.xml，Maven将从同一pom.xml中提到的远程存储库下载依赖项（在中央存储库中不可用）。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <dependencies>
        <dependency>
           <groupId>com.companyname.common-lib</groupId>
           <artifactId>common-lib</artifactId>
           <version>1.0.0</version>
        </dependency>
     <dependencies>
     <repositories>
        <repository>
           <id>companyname.lib1</id>
           <url>http://download.companyname.org/maven2/lib1</url>
        </repository>
        <repository>
           <id>companyname.lib2</id>
           <url>http://download.companyname.org/maven2/lib2</url>
        </repository>
     </repositories>
  </project>
  ```

- ## Maven依赖搜索顺序

  当我们执行Maven构建命令时，Maven开始按以下顺序查找依赖项库-

  - **步骤1**-如果找不到本地存储库中的搜索依赖项，请转到步骤2，否则执行进一步处理。
  - **步骤2**-如果未找到中央存储库中的搜索依赖项，并且提到了远程存储库，则转到步骤4。否则，将其下载到本地存储库以供将来参考。
  - **步骤3**-如果未提及远程存储库，则Maven只是停止处理并抛出错误（无法找到依赖项）。
  - **步骤4**-在远程存储库中搜索依赖项（如果找到），则将其下载到本地存储库以供将来参考。否则，Maven将停止处理并抛出错误（无法找到依赖项）。

- ## 

