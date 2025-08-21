---
title: Maven 构建自动化
createTime: 2025/08/20 13:45:28
permalink: /tools/maven/8zt308tz/
---
- ## Build Automation

  Build Automation定义了一个方案，一旦项目构建成功完成，相关项目的构建过程就会开始，以确保相关项目的稳定性。

  例:考虑一个团队正在开发一个项目bus-core-api，其他两个项目app-web-ui和app-desktop-ui都依赖于该项目。

  app-web-ui项目正在使用bus-core-api项目的1.0-SNAPSHOT 。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>app-web-ui</groupId>
     <artifactId>app-web-ui</artifactId>
     <version>1.0</version>
     <packaging>jar</packaging>
     <dependencies>
        <dependency>
           <groupId>bus-core-api</groupId>
              <artifactId>bus-core-api</artifactId>
              <version>1.0-SNAPSHOT</version>
        </dependency>
     </dependencies>
  </project>
  ```

  app-desktop-ui项目正在使用bus-core-api项目的1.0-SNAPSHOT 。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>app_desktop_ui</groupId>
     <artifactId>app_desktop_ui</artifactId>
     <version>1.0</version>
     <packaging>jar</packaging>
     <name>app_desktop_ui</name>
     <url>http://maven.apache.org</url>
     <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
     </properties>
     <dependencies>
        <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>3.8.1</version>
           <scope>test</scope>
        </dependency>
        <dependency>
           <groupId>bus_core_api</groupId>
           <artifactId>bus_core_api</artifactId>
           <version>1.0-SNAPSHOT</version>
           <scope>system</scope>
           <systemPath>C:\MVN\bus_core_api\target\bus_core_api-1.0-SNAPSHOT.jar</systemPath>
        </dependency>
     </dependencies>
  </project>
  ```

  bus-core-api项目

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>bus_core_api</groupId>
     <artifactId>bus_core_api</artifactId>
     <version>1.0-SNAPSHOT</version>
     <packaging>jar</packaging>   
  </project>
  ```

  现在，app-web-ui和app-desktop-ui项目团队要求每当bus-core-api项目更改时，其构建过程就应该开始。使用快照可确保使用最新的bus-core-api项目，但要满足上述要求，我们需要做一些额外的工作。

  我们可以通过以下两种方式进行处理-

  - 在bus-core-api pom中添加构建后目标，以启动app-web-ui和app-desktop-ui构建。
  - 使用像Hudson这样的持续集成（CI）服务器来自动管理构建自动化。

- ## 使用Maven

  更新bus-core-api项目pom.xml。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>bus-core-api</groupId>
     <artifactId>bus-core-api</artifactId>
     <version>1.0-SNAPSHOT</version>
     <packaging>jar</packaging>
     <build>
        <plugins>
           <plugin>
           <artifactId>maven-invoker-plugin</artifactId>
           <version>1.6</version>
           <configuration>
              <debug>true</debug>
              <pomIncludes>
                 <pomInclude>app-web-ui/pom.xml</pomInclude>
                 <pomInclude>app-desktop-ui/pom.xml</pomInclude>
              </pomIncludes>
           </configuration>
           <executions>
              <execution>
                 <id>build</id>
                 <goals>
                    <goal>run</goal>
                 </goals>
              </execution>
           </executions>
           </plugin>
        </plugins>
     <build>
  </project>
  ```

  让我们打开命令控制台，进入C：\>MVN>bus-core-api目录并执行以下mvn命令。

  data-service项目针对每个小的更改都发布了1.0-SNAPSHOT。

  ```bash
  >mvn clean package -U
  ```

  Maven将开始构建项目bus-core-api。

  ```bash
  [INFO] Scanning for projects...
  [INFO] ------------------------------------------------------------------
  [INFO] Building bus-core-api
  [INFO] task-segment: [clean, package]
  [INFO] ------------------------------------------------------------------
  ...
  [INFO] [jar:jar {execution: default-jar}]
  [INFO] Building jar: C:\MVN\bus-core-ui\target\
  bus-core-ui-1.0-SNAPSHOT.jar
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  ```

  一旦bus-core-api构建成功，Maven将开始构建app-web-ui项目。

  ```bash
  [INFO] ------------------------------------------------------------------
  [INFO] Building app-web-ui
  [INFO] task-segment: [package]
  [INFO] ------------------------------------------------------------------
  ...
  [INFO] [jar:jar {execution: default-jar}]
  [INFO] Building jar: C:\MVN\app-web-ui\target\
  app-web-ui-1.0-SNAPSHOT.jar
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  ```

  一旦app-web-ui构建成功，Maven将开始构建app-desktop-ui项目。

  ```base
  [INFO] ------------------------------------------------------------------
  [INFO] Building app-desktop-ui
  [INFO] task-segment: [package]
  [INFO] ------------------------------------------------------------------
  ...
  [INFO] [jar:jar {execution: default-jar}]
  [INFO] Building jar: C:\MVN\app-desktop-ui\target\
  app-desktop-ui-1.0-SNAPSHOT.jar
  [INFO] -------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------- 
  ```

- ## 在Maven中使用持续集成服务

  对于开发人员而言，使用持续集成服务更可取。它不需要更新bus-core-api项目，每一个新的项目（例如，app-mobile-ui）添加时间，作为依赖项目总线核心API项目。Hudsion是一个用Java编写的持续集成工具，它在servlet容器（例如Apache tomcat和glassfish应用程序服务器）中。Hudson使用Maven依赖管理自动管理构建自动化。Hudsion认为每个项目的建设都是工作。将项目代码签入SVN（或映射到Hudson的任何源管理工具）后，Hudson将开始其构建作业，一旦完成该作业，它将自动启动其他从属作业（其他从属项目）。在上面的示例中，当在SVN中更新bus-core-ui源代码时，Hudson开始其构建。构建成功后，Hudson会自动查找相关项目，并开始构建app-web-ui和app-desktop-ui项目。