---
title: Maven Web应用程序
createTime: 2025/08/20 13:47:17
permalink: /tools/maven/thmfr9v6/
---
- ## 创建Web应用程序

  本章教您如何使用Maven管理基于Web的项目。在这里，您将学习如何创建/构建/部署和运行Web应用程序。

  要创建一个简单的Java Web应用程序，我们将使用maven-archetype-webapp插件。因此，让我们打开命令控制台，转到C:\MVN目录并执行以下mvn命令。

  ```bash
  C:\MVN>mvn archetype:generate 
  -DgroupId = com.companyname.automobile 
  -DartifactId = trucks
  -DarchetypeArtifactId = maven-archetype-webapp 
  -DinteractiveMode = false
  ```

  Maven将开始处理并将创建如下完整的基于Web的Java应用程序项目结构-

  ```bash
  [INFO] Scanning for projects...
  [INFO] Searching repository for plugin with prefix: 'archetype'.
  [INFO] -------------------------------------------------------------------
  [INFO] Building Maven Default Project
  [INFO] task-segment: [archetype:generate] (aggregator-style)
  [INFO] -------------------------------------------------------------------
  [INFO] Preparing archetype:generate
  [INFO] No goals needed for project - skipping
  [INFO] [archetype:generate {execution: default-cli}]
  [INFO] Generating project in Batch mode
  [INFO] --------------------------------------------------------------------
  [INFO] Using following parameters for creating project
  from Old (1.x) Archetype: maven-archetype-webapp:1.0
  [INFO] --------------------------------------------------------------------
  
  [INFO] Parameter: groupId, Value: com.companyname.automobile
  [INFO] Parameter: packageName, Value: com.companyname.automobile
  [INFO] Parameter: package, Value: com.companyname.automobile
  [INFO] Parameter: artifactId, Value: trucks
  [INFO] Parameter: basedir, Value: C:\MVN
  [INFO] Parameter: version, Value: 1.0-SNAPSHOT
  
  [INFO] project created from Old (1.x) Archetype in dir: C:\MVN\trucks
  
  [INFO] -------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] -------------------------------------------------------------------
  
  [INFO] Total time: 16 seconds
  [INFO] Finished at: Tue Jul 17 11:00:00 IST 2012
  [INFO] Final Memory: 20M/89M
  [INFO] -------------------------------------------------------------------
  ```

  现在转到C:/MVN目录。您将看到一个创建的Java应用程序项目，命名为trucks（在artifactId中指定），如以下快照所示。以下目录结构通常用于Web应用程序-

  ![maven web](https://www.cainiaoya.com/images/maven/web.jpg)

  Maven使用标准目录布局。使用上面的示例，我们可以了解以下关键概念-

  - trucks - 包含src文件夹和pom.xml。
  - src/main/webapp - 包含index.jsp和WEB-INF文件夹。
  - src/main/webapp/WEB-INF - 包含web.xml
  - src/main/resources - 它包含图像/属性文件。

  **POM.xml**

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/maven-v4_0_0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.automobile</groupId>
     <artifactId>trucks</artifactId>
     <packaging>war</packaging>
     <version>1.0-SNAPSHOT</version>
     <name>trucks Maven Webapp</name>
     <url>http://maven.apache.org</url>
     <dependencies>
        <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>3.8.1</version>
           <scope>test</scope>
         </dependency>
     </dependencies>
     <build>
        <finalName>trucks</finalName>
     </build>
  </project>
  ```

  如果您进行观察，您会发现Maven还创建了一个样本JSP 源文件。

  打开C：\>MVN>trucks>src>main>webapp>文件夹以使用以下代码查看index.jsp-

  ```html
  <html>
     <body>
        <h2>Hello World!</h2>
     </body>
  </html>
  ```

- ## 构建Web应用程序

  让我们打开命令控制台，转到C：\MVN\trucks目录并执行以下mvn命令。

  ```bash
  C:\MVN\trucks>mvn clean package
  ```

  Maven将开始构建该项目。

  ```bash
  [INFO] Scanning for projects...
  [INFO] -------------------------------------------------------------------
  [INFO] Building trucks Maven Webapp
  [INFO] task-segment: [clean, package]
  [INFO] -------------------------------------------------------------------
  [INFO] [clean:clean {execution: default-clean}]
  [INFO] [resources:resources {execution: default-resources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to
  copy filtered resources,i.e. build is platform dependent!
  
  [INFO] Copying 0 resource
  [INFO] [compiler:compile {execution: default-compile}]
  [INFO] No sources to compile
  [INFO] [resources:testResources {execution: default-testResources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to
  copy filtered resources,i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory
  C:\MVN\trucks\src\test\resources
  [INFO] [compiler:testCompile {execution: default-testCompile}]
  [INFO] No sources to compile
  [INFO] [surefire:test {execution: default-test}]
  [INFO] No tests to run.
  [INFO] [war:war {execution: default-war}]
  [INFO] Packaging webapp
  [INFO] Assembling webapp[trucks] in [C:\MVN\trucks\target\trucks]
  [INFO] Processing war project
  [INFO] Copying webapp resources[C:\MVN\trucks\src\main\webapp]
  [INFO] Webapp assembled in[77 msecs]
  [INFO] Building war: C:\MVN\trucks\target\trucks.war
  [INFO] -------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] -------------------------------------------------------------------
  [INFO] Total time: 3 seconds
  [INFO] Finished at: Tue Jul 17 11:22:45 IST 2012
  [INFO] Final Memory: 11M/85M
  [INFO] -------------------------------------------------------------------
  ```

- ## 部署网络应用

  现在，将在C：\>MVN>trucks>target>文件夹中创建的trucks.war复制到Web服务器的webapp目录中，然后重新启动Web服务器。

- ## 测试Web应用程序

  使用URL运行Web应用程序：http://<服务器名称>:<端口号>/trucks/index.jsp

  验证输出。

