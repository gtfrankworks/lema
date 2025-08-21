---
title: Maven 构建和测试
createTime: 2025/08/20 13:37:20
permalink: /tools/maven/d91si0fl/
---
- ## 构建测试

  我们在[“项目创建”](https://www.cainiaoya.com/maven/maven-create-project.html)一章中学到的是如何使用Maven创建Java应用程序。现在，我们将看到如何构建和测试应用程序。转到创建Java应用程序的C:/ MVN目录。打开ConsumerBanking文件夹。您将看到带有以下内容的pom.xml文件。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <dependencies>
        <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>3.8.1</version>
        </dependency>
     </dependencies>  
  </project>
  ```

  在这里您可以看到，Maven已经添加了Junit作为测试框架。默认情况下，Maven 在其默认目录结构中添加了源文件App.java和测试文件AppTest.java，如上一章所述。让我们打开命令控制台，进入C:\MVN\consumerBanking目录并执行以下mvn命令。

  ```bash
  C:\MVN\consumerBanking>mvn clean package
  ```

  Maven将开始构建该项目。

  ```bash
  [INFO] Scanning for projects...
  [INFO] -------------------------------------------------------------------
  [INFO] Building consumerBanking
  [INFO] task-segment: [clean, package]
  [INFO] -------------------------------------------------------------------
  [INFO] [clean:clean {execution: default-clean}]
  [INFO] Deleting directory C:\MVN\consumerBanking\target
  [INFO] [resources:resources {execution: default-resources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory C:\MVN\consumerBanking\src\main\resources
  [INFO] [compiler:compile {execution: default-compile}]
  [INFO] Compiling 1 source file to C:\MVN\consumerBanking\target\classes
  [INFO] [resources:testResources {execution: default-testResources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory C:\MVN\consumerBanking\src\test\resources
  [INFO] [compiler:testCompile {execution: default-testCompile}]
  [INFO] Compiling 1 source file to C:\MVN\consumerBanking\target\test-classes
  [INFO] [surefire:test {execution: default-test}]
  [INFO] Surefire report directory: C:\MVN\consumerBanking\target\surefire-reports
  
  -----------------------------------------------------
  T E S T S
  -----------------------------------------------------
  
  Running com.companyname.bank.AppTest
  
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.027 sec
  
  Results :
  
  Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
  
  [INFO] [jar:jar {execution: default-jar}]
  [INFO] Building jar: C:\MVN\consumerBanking\target\
  consumerBanking-1.0-SNAPSHOT.jar
  
  [INFO]-----------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO]-----------------------------------------------
  
  [INFO] Total time: 2 seconds
  [INFO] Finished at: Tue Jul 10 16:52:18 IST 2012
  [INFO] Final Memory: 16M/89M
  [INFO]-----------------------------------------------
  ```

  您已经构建了项目并创建了最终的jar文件，以下是关键的学习概念

  - 我们给maven两个目标，首先清理目标目录（clean），然后将项目构建输出打包为jar（package）。
  - 打包的jar可在ConsumerBanking\target文件夹中作为ConsumerBanking-1.0-SNAPSHOT.jar提供。
  - 测试报告位于ConsumerBanking\target\surefire-reports文件夹中。
  - Maven编译源代码文件，然后测试源代码文件。
  - 然后，Maven运行测试用例。
  - 最后，Maven创建包。

  现在打开命令控制台，转到C:\MVN\consumerBanking\target\classes目录，然后执行以下Java命令。

  ```bash
  >java com.companyname.bank.App
  ```

  您将看到如下结果

  ```bash
  Hello World!
  ```

- ## 添加Java源文件

  让我们看看如何在项目中添加其他Java文件。打开C：\MVN\consumerBanking\src\main\java\com\companyname\bank文件夹，在其中创建Util类为Util.java。

  ```java
  package com.companyname.bank;
  
  public class Util {
     public static void printMessage(String message){
        System.out.println(message);
     }
  }
  ```

  更新App类以使用Util类。

  ```java
  package com.companyname.bank;
  
  /**
     * Hello world!
     *
  */
  
  public class App {
     public static void main( String[] args ){
        Util.printMessage("Hello World!");
     }
  }
  ```

  现在打开命令控制台，进入C：\MVN\consumerBanking目录并执行以下mvn命令。

  ```java
  >mvn clean compile
  ```

  Maven构建成功后，请转到C:\MVN\consumerBanking\target\classes目录并执行以下Java命令。

  ```java
  >java -cp com.companyname.bank.App
  ```

  您将看到如下结果

  ```java
  Hello World!
  ```

