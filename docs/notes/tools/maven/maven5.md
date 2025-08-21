---
title: Maven 构建配置文件
createTime: 2025/08/20 13:31:33
permalink: /tools/maven/kew3guju/
---
- ## 什么是构建配置文件？

  构建配置文件是一组配置值，可用于设置或覆盖Maven构建的默认值。使用构建配置文件，可以针对不同的环境（生产环境/开发环境）自定义构建。配置文件是使用pom.xml文件的activeProfiles/profiles元素指定的，并且可以通过多种方式触发。概要文件在构建时会修改POM，并用于为参数提供不同的目标环境（例如，开发，测试和生产环境中数据库服务器的路径）。

- ## 构建配置文件的类型

  构建配置文件主要分为三种类型。

  | 类型       | 定义的位置                                                  |
  | :--------- | :---------------------------------------------------------- |
  | 每个项目   | 在项目POM文件pom.xml中定义                                  |
  | 每位使用者 | 在Maven设置xml文件（%USER_HOME%/.m2/settings.xml）中定义    |
  | 全局       | 在Maven全局设置xml文件（%M2_HOME%/conf/settings.xml）中定义 |

- ## 个人资料激活

  Maven构建配置文件可以通过多种方式激活。

  - 明确使用命令控制台输入。
  - 通过maven设置。
  - 基于环境变量（用户/系统变量）。
  - 操作系统设置（例如Windows系列）。
  - 当前/缺少文件。

  配置文件激活示例

  让我们假设您的项目的以下目录结构

  ![maven](https://www.cainiaoya.com/images/maven/config1.jpg)

  现在，在src/main/resources下，有三个特定于环境的文件

  - **env.properties** - 如果未提及配置文件，则使用默认配置。
  - **env.test.properties** - 使用测试配置文件时的测试配置。
  - **env.prod.properties** - 使用prod配置文件时的生产配置。

- ## 明确的配置文件激活

  在以下示例中，我们将附加maven-antrun-plugin:run目标到测试阶段。这将使我们能够回显不同配置文件的文本消息。我们将使用pom.xml定义不同的配置文件，并使用maven命令在命令控制台中激活配置文件。

  假设，我们在C:\mav\project文件夹中创建了以下pom.xml。

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.projectgroup</groupId>
     <artifactId>project</artifactId>
     <version>1.0</version>
     <profiles>
        <profile>
           <id>test</id>
           <build>
              <plugins>
                 <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-antrun-plugin</artifactId>
                    <version>1.1</version>
                    <executions>
                       <execution>
                          <phase>test</phase>
                          <goals>
                             <goal>run</goal>
                          </goals>
                          <configuration>
                             <tasks>
                                <echo>Using env.test.properties</echo>
                                <copy file="src/main/resources/env.test.properties"
                                   tofile="${project.build.outputDirectory}
                                   /env.properties"/>
                             </tasks>
                          </configuration>
                       </execution>
                    </executions>
                 </plugin>
              </plugins>
           </build>
        </profile>
     </profiles>
  </project>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。使用-P选项将概要文件名称作为参数传递。

  ```bash
  C:\MVN\project>mvn test -Ptest
  ```

  Maven将开始处理并显示测试构建概要文件的结果。

  ```bash
  [INFO] Scanning for projects...
  [INFO] ------------------------------------------------------------------
  [INFO] Building Unnamed - com.companyname.projectgroup:project:jar:1.0
  [INFO] task-segment: [test]
  [INFO] ------------------------------------------------------------------
  [INFO] [resources:resources {execution: default-resources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] Copying 3 resources
  [INFO] [compiler:compile {execution: default-compile}]
  [INFO] Nothing to compile - all classes are up to date
  [INFO] [resources:testResources {execution: default-testResources}]
  
  [WARNING] Using platform encoding (Cp1252 actually) to copy filtered resources,
  i.e. build is platform dependent!
  
  [INFO] skip non existing resourceDirectory C:\MVN\project\src\test\resources
  [INFO] [compiler:testCompile {execution: default-testCompile}]
  [INFO] Nothing to compile - all classes are up to date
  [INFO] [surefire:test {execution: default-test}]
  [INFO] Surefire report directory: C:\MVN\project\target\surefire-reports
  
  -------------------------------------------------------
  T E S T S
  -------------------------------------------------------
  
  There are no tests to run.
  Results :
  Tests run: 0, Failures: 0, Errors: 0, Skipped: 0
  [INFO] [antrun:run {execution: default}]
  [INFO] Executing tasks
  [echo] Using env.test.properties
  [INFO] Executed tasks
  
  [INFO] ------------------------------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO] ------------------------------------------------------------------
  
  [INFO] Total time: 1 second
  [INFO] Finished at: Sun Jul 08 14:55:41 IST 2012
  [INFO] Final Memory: 8M/64M
  [INFO] ------------------------------------------------------------------
  ```

  现在作为练习，您可以执行以下步骤

  - 向pom.xml的profiles元素添加另一个profile元素（复制现有profile元素并将其粘贴到profile元素结束的位置）。
  - 将此配置文件元素的ID从test更新为normal。
  - 更新任务部分以回显env.properties，并将env.properties复制到目标目录。
  - 再次重复上述三个步骤，将id更新为prov，然后将env.prod.properties的task部分更新。
  - 就这样。现在，您已经准备好三个构建配置文件（normal/test/prod）。

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。使用-P选项将概要文件名称作为参数传递。

  ```bash
  C:\MVN\project>mvn test -Pnormal
  
  C:\MVN\project>mvn test -Pprod
  ```

  检查构建的输出以查看差异。

- ## 通过Maven设置激活配置文件

  打开％USER_HOME％/.m2目录中可用的Maven settings.xml文件，其中％USER_HOME％表示用户主目录。如果settings.xml文件不存在，请创建一个新文件。使用激活配置文件节点将test配置文件添加为活动配置文件，如下例所示。

  ```xml
  <settings xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/settings-1.0.0.xsd">
     <mirrors>
        <mirror>
           <id>maven.dev.snaponglobal.com</id>
           <name>Internal Artifactory Maven repository</name>
           <url>http://repo1.maven.org/maven2/</url>
           <mirrorOf>*</mirrorOf>
        </mirror>
     </mirrors>
     <activeProfiles>
        <activeProfile>test</activeProfile>
     </activeProfiles>
  </settings>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。不要使用-P选项传递配置文件名称。Maven将显示测试配置文件为活动配置文件的结果。

  ```bash
  C:\MVN\project>mvn test
  ```

- ## 通过环境变量激活配置文件

  现在，从maven settings.xml中删除活动配置文件，并更新pom.xml中提到的test配置文件。如下所示，将激活元素添加到配置文件元素。当使用值“test”指定系统属性“env”时，将触发测试配置文件。创建一个环境变量“env”，并将其值设置为“test”。

  ```xml
  <profile>
     <id>test</id>
     <activation>
        <property>
           <name>env</name>
           <value>test</value>
        </property>
     </activation>
  </profile>
  ```

  让我们打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。

  ```bash
  C:\MVN\project>mvn test
  ```

- ## 通过操作系统激活配置文件

  激活元素包括os细节，如下所示。当系统是Windows 10时，将触发此测试配置文件。

  ```xml
  <profile>
     <id>test</id>
     <activation>
        <os>
           <name>Windows 10</name>
           <family>Windows</family>
           <arch>x86</arch>
           <version>5.1.2600</version>
        </os>
     </activation>
  </profile>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。不要使用-P选项传递配置文件名称。Maven将显示测试配置文件为活动配置文件的结果。

  ```bash
  C:\MVN\project>mvn test
  ```

- ## 通过当前/缺失文件激活配置文件

  现在激活元素包括操作系统详细信息，如下所示。当 target/generated-sources/axistools/wsdl2java/com/companyname/group 缺失时

  ```xml
  <profile>
     <id>test</id>
     <activation>
        <file>
           <missing>target/generated-sources/axistools/wsdl2java/
             com/companyname/group</missing>
        </file>
     </activation>
  </profile>
  ```

  现在打开命令控制台，转到包含pom.xml的文件夹并执行以下mvn命令。不要使用-P选项传递配置文件名称。Maven将显示测试配置文件为活动配置文件的结果。

  ```mavanebash
  C:\MVN\project>mvn test
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