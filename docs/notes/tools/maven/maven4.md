---
title: Maven的构建生命周期
createTime: 2025/08/20 13:28:40
permalink: /tools/maven/g9mhysrw/
---
- ## 什么是构建生命周期？

  构建生命周期是一个定义明确的阶段序列，这些阶段定义了目标执行的顺序。这里的阶段代表生命周期的一个阶段。例如，典型的Maven Build Lifecycle由以下阶段序列组成。

  | 阶段     | 处理     | 描述                                         |
  | :------- | :------- | :------------------------------------------- |
  | 准备资源 | 资源复制 | 在此阶段可以自定义资源复制。                 |
  | 验证     | 验证信息 | 验证项目是否正确以及是否有所有必要的信息。   |
  | 编译     | 编译     | 源代码编译在此阶段完成。                     |
  | 测试     | 测试     | 测试适合于测试框架的已编译源代码。           |
  | 打包     | 打包     | 此阶段将创建pom.xml中的包中提到的JAR/WAR包。 |
  | 安装     | 安装     | 此阶段将软件包安装在本地/远程Maven存储库中。 |
  | 部署     | 部署     | 将最终软件包复制到远程存储库。               |

  总有前期和后期阶段来注册目标，这些阶段必须在特定阶段之前或之后运行。当Maven开始构建项目时，它将逐步按照定义的阶段顺序执行目标，并在每个阶段中进行记录。Maven具有以下三个标准生命周期

  - pre-clean
  - clean
  - post-clean

  Maven 清除目标（clean:clean）绑定到清洁生命周期中的clean阶段。其clean:cleangoal通过删除构建目录来删除构建的输出。因此，当执行mvn clean命令时，Maven会删除构建目录。通过在clean生命周期的上述任何阶段中提及目标，我们可以自定义此行为。在以下示例中，我们将maven-antrun-plugin：run目标附加到pre-clean，clean和post-clean阶段。这将使我们能够回显显示干净生命周期各个阶段的文本消息。

  我们在C:\MVN\project文件夹中创建了pom.xml。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <build>
        <plugins>
           <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-antrun-plugin</artifactId>
              <version>1.1</version>
              <executions>
                 <execution>
                    <id>id.pre-clean</id>
                    <phase>pre-clean</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>pre-clean phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.clean</id>
                    <phase>clean</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>clean phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.post-clean</id>
                    <phase>post-clean</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>post-clean phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              </executions>
           </plugin>
        </plugins>
     </build>
  </project>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。

  ```bash
  C:\MVN\project>mvn post-clean
  ```

  Maven将开始处理并显示清洁生命周期的所有阶段。

  ```bash
  [INFO] Scanning for projects...
  [INFO] -----------------------------------------------------------------
  -
  [INFO] Building Unnamed - com.companyname.projectgroup:project:jar:1.0
  [INFO] task-segment: [post-clean]
  [INFO] ------------------------------------------------------------------
  [INFO] [antrun:run {execution: id.pre-clean}]
  [INFO] Executing tasks
  [echo] pre-clean phase
  [INFO] Executed tasks
  [INFO] [clean:clean {execution: default-clean}]
  [INFO] [antrun:run {execution: id.clean}]
  [INFO] Executing tasks
  [echo] clean phase
  [INFO] Executed tasks
  [INFO] [antrun:run {execution: id.post-clean}]
  [INFO] Executing tasks
  [echo] post-clean phase
  [INFO] Executed tasks
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  [INFO] Total time: > 1 second
  [INFO] Finished at: Sat Jul 07 13:38:59 IST 2012
  [INFO] Final Memory: 4M/44M
  [INFO] ------------------------------------------------------------------
  ```

  您可以尝试调整mvn clean命令，该命令将显示pre-clean和clean。post-clean阶段将不执行任何操作。

- ## 默认构建生命周期

  这是Maven的主要生命周期，用于构建应用程序。它分为以下21个阶段。

  | 阶段       | 描述                                                         |
  | :--------- | :----------------------------------------------------------- |
  | 验证       | 验证项目是否正确以及是否有所有必要的信息来完成构建过程。     |
  | 初始化     | 初始化构建状态，例如set属性。                                |
  | 产生源     | 生成任何要包含在编译阶段的源代码。                           |
  | 过程源     | 处理源代码，例如，过滤任何值。                               |
  | 产生资源   | 生成要包含在包中的资源。                                     |
  | 流程资源   | 将资源复制并处理到目标目录中，以准备打包阶段。               |
  | 编译       | 编译项目的源代码。                                           |
  | 过程类     | 对编译后生成的文件进行后处理，例如对Java类进行字节码增强/优化。 |
  | 生成测试源 | 生成要包含在编译阶段的任何测试源代码。                       |
  | 流程测试源 | 处理测试源代码，例如，过滤所有值。                           |
  | 测试编译   | 将测试源代码编译到测试目标目录中。                           |
  | 过程测试类 | 处理从测试代码文件编译生成的文件。                           |
  | 测试       | 使用合适的单元测试框架（Junit是其中之一）运行测试。          |
  | 准备包装   | 在实际包装之前，请执行准备包装所需的任何操作。               |
  | 打包       | 取得编译后的代码并将其打包为可分发的格式，例如JAR，WAR或EAR文件。 |
  | 整合前测试 | 在执行集成测试之前执行所需的操作。例如，设置所需的环境。     |
  | 整合测试   | 如有必要，将程序包处理并部署到可以运行集成测试的环境中。     |
  | 整合后测试 | 在执行集成测试后执行所需的操作。例如，清理环境。             |
  | 校验       | 运行所有检查，以验证软件包有效并符合质量标准。               |
  | 安装       | 将软件包安装到本地存储库中，该存储库可用作本地其他项目中的依赖项。 |
  | 部署       | 将最终软件包复制到远程存储库，以便与其他开发人员和项目共享。 |

  与Maven生命周期相关的重要概念很少，值得一提:

  - 通过maven命令调用某个阶段（例如mvn compile）时，仅执行该阶段之前（包括该阶段）的阶段。
  - 根据打包的类型（JAR / WAR / EAR），不同的Maven目标将绑定到Maven生命周期的不同阶段。

  在下面的示例中，我们将把maven-antrun-plugin:run目标附加到Build生命周期的几个阶段。这将使我们能够回显示生命周期各个阶段的文本消息。

  我们已经更新了C:\mvn\project文件夹中的pom.xml。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <build>
        <plugins>
           <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-antrun-plugin</artifactId>
              <version>1.1</version>
              <executions>
                 <execution>
                    <id>id.validate</id>
                    <phase>validate</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>validate phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.compile</id>
                    <phase>compile</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>compile phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.test</id>
                    <phase>test</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>test phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.package</id>
                    <phase>package</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>package phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              
                 <execution>
                    <id>id.deploy</id>
                    <phase>deploy</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>deploy phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
              </executions>
           </plugin>
        </plugins>
     </build>
  </project>        
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。

  ```base
  C:\MVN\project>mvn compile
  ```

  Maven将开始处理并显示构建生命周期的各个阶段，直至编译阶段。

  ```base
  [INFO] Scanning for projects...
  [INFO] -----------------------------------------------------------------
  -
  [INFO] Building Unnamed - com.companyname.projectgroup:project:jar:1.0
  [INFO] task-segment: [compile]
  [INFO] -----------------------------------------------------------------
  -
  [INFO] [antrun:run {execution: id.validate}]
  [INFO] Executing tasks
  [echo] validate phase
  [INFO] Executed tasks
  [INFO] [resources:resources {execution: default-resources}]
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered
  resources,
  i.e. build is platform dependent!
  [INFO] skip non existing resourceDirectory
  C:\MVN\project\src\main\resources
  [INFO] [compiler:compile {execution: default-compile}]
  [INFO] Nothing to compile - all classes are up to date
  [INFO] [antrun:run {execution: id.compile}]
  [INFO] Executing tasks
  [echo] compile phase
  [INFO] Executed tasks
  [INFO] -----------------------------------------------------------------
  -
  [INFO] BUILD SUCCESSFUL
  [INFO] -----------------------------------------------------------------
  -
  [INFO] Total time: 2 seconds
  [INFO] Finished at: Sat Jul 07 20:18:25 IST 2012
  [INFO] Final Memory: 7M/64M
  [INFO] -----------------------------------------------------------------
  -
  ```

- ## 网站生命周期

  Maven网站插件通常用于创建新文档来创建报告，部署网站等。它具有以下阶段

  - pre-site
  - site
  - post-site
  - site-deploy

  在以下示例中，我们将maven-antrun-plugin:run目标附加到站点生命周期的所有阶段。这将使我们能够回显显示生命周期各个阶段的文本消息。

  我们已经更新了C:\mvn\project文件夹中的pom.xml。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <build>
        <plugins>
           <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-antrun-plugin</artifactId>
              <version>1.1</version>
              <executions>
                 <execution>
                    <id>id.pre-site</id>
                    <phase>pre-site</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>pre-site phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
                 
                 <execution>
                    <id>id.site</id>
                    <phase>site</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>site phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
                 
                 <execution>
                    <id>id.post-site</id>
                    <phase>post-site</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>post-site phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
                 
                 <execution>
                    <id>id.site-deploy</id>
                    <phase>site-deploy</phase>
                    <goals>
                       <goal>run</goal>
                    </goals>
                    <configuration>
                       <tasks>
                          <echo>site-deploy phase</echo>
                       </tasks>
                    </configuration>
                 </execution>
                 
              </executions>
           </plugin>
        </plugins>
     </build>
  </project>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。

  ```bash
  C:\mvn\project>mvn site
  ```

  Maven将开始处理并显示站点生命周期的各个阶段，直至站点(site)阶段。

  ```bash
  [INFO] Scanning for projects...
  [INFO] ------------------------------------------------------------------
  [INFO] Building Unnamed - com.companyname.projectgroup:project:jar:1.0
  [INFO] task-segment: [site]
  [INFO] ------------------------------------------------------------------
  [INFO] [antrun:run {execution: id.pre-site}]
  [INFO] Executing tasks
  [echo] pre-site phase
  [INFO] Executed tasks
  [INFO] [site:site {execution: default-site}]
  
  [INFO] Generating "About" report.
  [INFO] Generating "Issue Tracking" report.
  [INFO] Generating "Project Team" report.
  [INFO] Generating "Dependencies" report.
  [INFO] Generating "Project Plugins" report.
  [INFO] Generating "Continuous Integration" report.
  [INFO] Generating "Source Repository" report.
  [INFO] Generating "Project License" report.
  [INFO] Generating "Mailing Lists" report.
  [INFO] Generating "Plugin Management" report.
  [INFO] Generating "Project Summary" report.
  
  [INFO] [antrun:run {execution: id.site}]
  [INFO] Executing tasks
  [echo] site phase
  [INFO] Executed tasks
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  [INFO] Total time: 3 seconds
  [INFO] Finished at: Sat Jul 07 15:25:10 IST 2012
  [INFO] Final Memory: 24M/149M
  [INFO] ------------------------------------------------------------------
  ```

- ## 

  现在打开控制台并执行以下mvn命令。

  | 操作系统 | 任务          | 命令                            |
  | :------- | :------------ | :------------------------------ |
  | Windows  | 打开 命令窗口 | c:\> mvn --version              |
  | Linux    | 打开 终端     | $ mvn --version                 |
  | Mac      | 打开 终端     | machine:~ joseph$ mvn --version |

  最后，验证以上命令的输出，应如下所示：

  |      |      |
  | :--- | :--- |
  |      |      |
  |      |      |
  |      |      |