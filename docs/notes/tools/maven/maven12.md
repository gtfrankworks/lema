---
title: Maven 项目文档
createTime: 2025/08/20 13:39:30
permalink: /tools/maven/8p6pxz86/
---
## 项目文档

本教程将教您如何一次性创建应用程序的文档。因此，让我们开始吧，转到使用前面各章中提供的示例在其中创建了Java ConsumerBanking应用程序的C:/MVN目录。打开ConsumerBanking文件夹并执行以下mvn命令。

```xml
C:\MVN>mvn site
```

Maven将开始构建该项目。

```xml
[INFO] Scanning for projects...
[INFO]-----------------------------------------------
[INFO] Building consumerBanking
[INFO] task-segment: [site]
[INFO]-----------------------------------------------
[INFO] [site:site {execution: default-site}]
[INFO] artifact org.apache.maven.skins:maven-default-skin:
checking for updates from central

[INFO] Generating "About" report.
[INFO] Generating "Issue Tracking" report.
[INFO] Generating "Project Team" report.
[INFO] Generating "Dependencies" report.
[INFO] Generating "Continuous Integration" report.
[INFO] Generating "Source Repository" report.
[INFO] Generating "Project License" report.
[INFO] Generating "Mailing Lists" report.
[INFO] Generating "Plugin Management" report.
[INFO] Generating "Project Summary" report.

[INFO]-----------------------------------------------
[INFO] BUILD SUCCESSFUL
[INFO]-----------------------------------------------

[INFO] Total time: 16 seconds
[INFO] Finished at: Wed Jul 11 18:11:18 IST 2012
[INFO] Final Memory: 23M/148M
[INFO]-----------------------------------------------
```

现在，您的项目文档已准备就绪。Maven已在目标目录中创建了一个站点。



打开C:\MVN\consumerBanking\target\site文件夹。单击index.html以查看文档。


Maven使用称为[Doxia](https://maven.apache.org/doxia/index.html)的文档处理引擎创建文档，该引擎将多种源格式读入一个通用文档模型。要为您的项目编写文档，您可以使用Doxia解析的以下几种常用格式来编写内容。