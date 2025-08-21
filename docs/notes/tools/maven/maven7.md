---
title: Maven 插件
createTime: 2025/08/20 13:34:59
permalink: /tools/maven/6nqgkkq1/
---
- ## 什么是Maven插件？

  Maven实际上是一个插件执行框架，其中每个任务实际上都是由插件完成的。Maven插件通常用于。

  - 创建jar文件
  - 创建war文件
  - 编译代码文件
  - 代码的单元测试
  - 创建项目文档
  - 创建项目报告

  插件通常提供一组目标，可以使用以下语法执行这些目标

  ```bash
  mvn [plugin-name]:[goal-name]
  ```

  例如，可以通过运行以下命令，使用maven-compiler-plugin的compile-goal编译Java项目。

  ```bash
  mvn compiler:compile
  ```

- ## 插件类型

  Maven提供了以下两种类型的插件

  | 类型     | 描述                                                         |
  | :------- | :----------------------------------------------------------- |
  | 构建插件 | 它们在构建过程中执行，应在pom.xml的<build /&Igt;元素中进行配置。 |
  | 报告插件 | 它们在网站生成过程中执行，应在pom.xml的<reporting /&Igt;元素中进行配置。 |

  以下是一些常见插件的列表:

  | 插件     | 描述                               |
  | :------- | :--------------------------------- |
  | clean    | 构建后清理目标。 删除目标目录。    |
  | compiler | 编译Java源文件。                   |
  | surefire | 运行JUnit单元测试。 创建测试报告。 |
  | jar      | 从当前项目构建一个JAR文件。        |
  | war      | 从当前项目构建一个WAR文件。        |
  | javadoc  | 为项目生成Javadoc。                |
  | antrun   | 从构建的任何阶段运行一组ant任务。  |

  例如：在示例中，我们广泛使用了maven-antrun-plugin在控制台上打印数据。请参阅[“构建配置文件”](https://www.cainiaoya.com/maven/maven-build-profile.html)一章。让我们以更好的方式了解它，并在C：\MVN\project文件夹中创建pom.xml。

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
              </executions>
           </plugin>
        </plugins>
     </build>
  </project>
  ```

  接下来，打开命令控制台并转到包含pom.xml的文件夹，然后执行以下mvn命令。

  ```bash
  C:\MVN\project>mvn clean
  ```

  Maven将开始处理并显示clean生命周期的clean阶段。

  ```bash
  [INFO] Scanning for projects...
  [INFO] ------------------------------------------------------------------
  [INFO] Building Unnamed - com.companyname.projectgroup:project:jar:1.0
  [INFO]    task-segment: [post-clean]
  [INFO] ------------------------------------------------------------------
  [INFO] [clean:clean {execution: default-clean}]
  [INFO] [antrun:run {execution: id.clean}]
  [INFO] Executing tasks
       [echo] clean phase
  [INFO] Executed tasks
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  [INFO] Total time: < 1 second
  [INFO] Finished at: Sat Jul 07 13:38:59 IST 2012
  [INFO] Final Memory: 4M/44M
  [INFO] ------------------------------------------------------------------
  ```

  上面的示例说明了以下关键概念:

  - 使用plugins元素在pom.xml中指定了插件。
  - 每个插件可以有多个目标。
  - 您可以使用其phase元素从插件应开始处理的位置定义阶段。我们使用了clean阶段。
  - 您可以通过将任务绑定到插件目标来配置要执行的任务。我们已经将echo任务与maven-antrun-plugin的运行目标绑定了。
  - 如果本地存储库中不提供该插件，Maven将下载该插件并开始处理。