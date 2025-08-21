---
title: Maven 快照
createTime: 2025/08/20 13:44:46
permalink: /tools/maven/wvkft79m/
---
- ## 概述

  大型软件应用程序通常由多个模块组成，这是常见的情况，其中多个团队正在同一应用程序的不同模块上工作。例如，假设有一个团队在应用程序的前端app-ui项目（app-ui.jar：1.0）工作，并且他们正在使用data-service项目（data-service.jar：1.0）。现在可能发生的情况是，从事数据服务的团队正在迅速进行错误修复或增强，他们几乎每隔一天就会将库发布到远程存储库中。现在，如果数据服务团队每隔一天上传一次新版本，则将出现以下问题

  - 每次发布更新的代码时，数据服务团队都应告知app-ui团队。
  - app-ui团队需要定期更新其pom.xml以获得更新的版本。

  为了处理这种情况，SNAPSHOT(快照)概念开始发挥作用。

- ## 什么是快照？

  SNAPSHOT是一个特殊版本，指示当前的开发副本。与常规版本不同，Maven为每个构建都在远程存储库中检查新的SNAPSHOT版本。现在，数据服务团队将每次将SNAPSHOT更新的代码发布到存储库，例如data-service:1.0-SNAPSHOT，以替换旧的SNAPSHOT jar。

- ## 快照与版本

  对于Version，如果Maven一旦下载了提到的版本，例如data-service：1.0，它将永远不会尝试下载存储库中可用的较新的1.0。要下载更新的代码，数据服务版本将升级到1.1。对于SNAPSHOT，每次app-ui团队构建项目时，Maven都会自动获取最新的SNAPSHOT（data-service：1.0-SNAPSHOT）。

  **app-ui pom.xml**

  app-ui项目正在使用1.0-SNAPSHOT的数据服务。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>app-ui</groupId>
     <artifactId>app-ui</artifactId>
     <version>1.0</version>
     <packaging>jar</packaging>
     <name>health</name>
     <url>http://maven.apache.org</url>
     <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
     </properties>
     <dependencies>
        <dependency>
        <groupId>data-service</groupId>
           <artifactId>data-service</artifactId>
           <version>1.0-SNAPSHOT</version>
           <scope>test</scope>
        </dependency>
     </dependencies>
  </project>
  ```

  **data-service pom.xml**

  data-service项目针对每个小的更改都发布了1.0-SNAPSHOT。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>data-service</groupId>
     <artifactId>data-service</artifactId>
     <version>1.0-SNAPSHOT</version>
     <packaging>jar</packaging>
     <name>health</name>
     <url>http://maven.apache.org</url>
     <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
     </properties>
  </project>
  ```

  尽管对于SNAPSHOT，Maven每天自动获取最新的SNAPSHOT，但是您可以使用-U切换到任何maven命令，强制maven下载最新的快照构建。

  ```xml
  mvn clean package -U
  ```

  让我们打开命令控制台，转到C：\>MVN>app-ui目录，然后执行以下mvn命令。

  ```xml
  C:\MVN\app-ui>mvn clean package -U
  ```

  在下载最新的数据服务快照后，Maven将开始构建项目。

  ```base
  [INFO] Scanning for projects...
  [INFO]--------------------------------------------
  [INFO] Building consumerBanking
  [INFO]    task-segment: [clean, package]
  [INFO]--------------------------------------------
  [INFO] Downloading data-service:1.0-SNAPSHOT
  [INFO] 290K downloaded.
  [INFO] [clean:clean {execution: default-clean}]
  [INFO] Deleting directory C:\MVN\app-ui\target
  [INFO] [resources:resources {execution: default-resources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory C:\MVN\app-ui\src\main\resources
  [INFO] [compiler:compile {execution:default-compile}]
  [INFO] Compiling 1 source file to C:\MVN\app-ui\target\classes
  [INFO] [resources:testResources {execution: default-testResources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory C:\MVN\app-ui\src\test\resources
  [INFO] [compiler:testCompile {execution: default-testCompile}]
  [INFO] Compiling 1 source file to C:\MVN\app-ui\target\test-classes
  [INFO] [surefire:test {execution: default-test}]
  [INFO] Surefire report directory: C:\MVN\app-ui\target\
  surefire-reports
  
  --------------------------------------------------
   T E S T S
  --------------------------------------------------
  
  Running com.companyname.bank.AppTest
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.027 sec
  
  Results :
  
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
  
  [INFO] [jar:jar {execution: default-jar}]
  [INFO] Building jar: C:\MVN\app-ui\target\
  app-ui-1.0-SNAPSHOT.jar
  [INFO]--------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO]--------------------------------------------------------
  [INFO] Total time: 2 seconds
  [INFO] Finished at: 2015-09-27T12:30:02+05:30
  [INFO] Final Memory: 16M/89M
  [INFO]------------------------------------------------------------------------    
  ```

