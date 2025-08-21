---
title: Maven 项目模板
createTime: 2025/08/20 13:42:59
permalink: /tools/maven/ebbghpoy/
---
- ## 项目模板

  Maven使用**Archetype**的概念为用户提供了大量不同类型的项目模板（数量为614）。Maven使用以下命令帮助用户快速启动新的Java项目。

  ```xml
  mvn archetype:generate
  ```

- ## 什么是Archetype？

  Archetype是一个Maven插件，其任务是根据其模板创建项目结构。我们将在此处使用quickstart原型插件创建一个简单的Java应用程序。

- ## 使用项目模板

  让我们打开命令控制台，转到C:\>MVN目录并执行以下mvn命令。

  ```bash
  C:\MVN>mvn archetype:generate
  ```

  Maven将开始处理，并会要求选择所需的原型。

  ```bash
  [INFO] Scanning for projects...
  [INFO] Searching repository for plugin with prefix: 'archetype'.
  [INFO] -------------------------------------------------------------------
  [INFO] Building Maven Default Project
  [INFO] task-segment: [archetype:generate] (aggregator-style)
  [INFO] -------------------------------------------------------------------
  [INFO] Preparing archetype:generate
  ...
  
  600: remote −>org.trailsframework:trails-archetype (-)
  601: remote −>org.trailsframework:trails-secure-archetype (-)
  602: remote −>org.tynamo:tynamo-archetype (-)
  603: remote −>org.wicketstuff.scala:wicket-scala-archetype (-)
  604: remote −>org.wicketstuff.scala:wicketstuff-scala-archetype
  
  Basic setup for a project that combines Scala and Wicket,
  depending on the Wicket-Scala project.
  Includes an example Specs test.)
  
  605: remote −>org.wikbook:wikbook.archetype (-)
  606: remote −>org.xaloon.archetype:xaloon-archetype-wicket-jpa-glassfish (-)
  607: remote −>org.xaloon.archetype:xaloon-archetype-wicket-jpa-spring (-)
  608: remote −>org.xwiki.commons:xwiki-commons-component-archetype
     (Make it easy to create a maven project for creating XWiki Components.)
  609: remote −>org.xwiki.rendering:xwiki-rendering-archetype-macro
     (Make it easy to create a maven project for creating XWiki Rendering Macros.)
  610: remote −>org.zkoss:zk-archetype-component (The ZK Component archetype)
  611: remote −>org.zkoss:zk-archetype-webapp (The ZK wepapp archetype)
  612: remote −>ru.circumflex:circumflex-archetype (-)
  613: remote −>se.vgregion.javg.maven.archetypes:javg-minimal-archetype (-)
  614: remote −>sk.seges.sesam:sesam-annotation-archetype (-)
  Choose a number or apply filter
  (format: [groupId:]artifactId, case sensitive contains): 203:
  ```

  按Enter键选择默认选项（203：maven-archetype-quickstart）Maven将要求提供特定版本的原型。

  ```bash
  Choose org.apache.maven.archetypes:maven-archetype-quickstart version:
  1: 1.0-alpha-1
  2: 1.0-alpha-2
  3: 1.0-alpha-3
  4: 1.0-alpha-4
  5: 1.0
  6: 1.1
  Choose a number: 6:
  ```

  按Enter键选择默认选项（6：maven-archetype-quickstart：1.1）Maven将询问项目细节。根据要求输入项目详细信息。如果提供了默认值，请按Enter。您可以通过输入自己的值来覆盖它们。

  ```bash
  Define value for property 'groupId': : com.companyname.insurance
  Define value for property 'artifactId': : health
  Define value for property 'version': 1.0-SNAPSHOT:
  Define value for property 'package': com.companyname.insurance:
  ```

  Maven将要求确认项目详细信息。按Enter或按Y。

  ```bash
  Confirm properties configuration:
  groupId: com.companyname.insurance
  artifactId: health
  version: 1.0-SNAPSHOT
  package: com.companyname.insurance
  Y:
  ```

  现在，Maven将开始创建项目结构，并显示以下内容：

  ```bash
  [INFO]-----------------------------------------------
  [INFO] Using following parameters for creating project
  from Old (1.x) Archetype: maven-archetype-quickstart:1.1
  [INFO]-----------------------------------------------
  
  [INFO] Parameter: groupId, Value: com.companyname.insurance
  [INFO] Parameter: packageName, Value: com.companyname.insurance
  [INFO] Parameter: package, Value: com.companyname.insurance
  [INFO] Parameter: artifactId, Value: health
  [INFO] Parameter: basedir, Value: C:\MVN
  [INFO] Parameter: version, Value: 1.0-SNAPSHOT
  
  [INFO] project created from Old (1.x) Archetype in dir: C:\MVN\health
  [INFO]-----------------------------------------------
  [INFO] BUILD SUCCESSFUL
  [INFO]-----------------------------------------------
  [INFO] Total time: 4 minutes 12 seconds
  [INFO] Finished at: Fri Jul 13 11:10:12 IST 2012
  [INFO] Final Memory: 20M/90M
  [INFO]-----------------------------------------------
  ```

- ## 创建的项目

  现在转到C:\>MVN目录。您会看到创建了一个名为health的Java应用程序项目，该项目在项目创建时就被指定为artifactId。Maven将为项目创建标准目录布局，如下所示-

  ![maven temp](https://www.cainiaoya.com/images/maven/temp.jpg)

- ## 创建的pom.xml

  Maven为项目生成一个POM.xml文件，如下所示-

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0" 
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0 
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.insurance</groupId>
     <artifactId>health</artifactId>
     <version>1.0-SNAPSHOT</version>
     <packaging>jar</packaging>
     <name>health</name>
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
     </dependencies>
  </project>
  ```

- ## 创建的App.java

  Maven为下面的项目生成示例Java源文件App.java-

  位置：C:\>MVN>health>src>main>java>com>companyname>insurance>App.java。

  ```java
  package com.companyname.insurance;
  
  /**
     * Hello world!
     *
  */
  public class App {
     public static void main( String[] args ) {
        System.out.println( "Hello World!" );
     }
  }
  ```

- ## 创建了AppTest.java

  Maven为下面的项目生成示例Java源测试文件AppTest.java-

  位置：C：\>MVN>健康>src>测试>java>com>公司名称>保险>AppTest.java。

  ```java
  package com.companyname.insurance;
  
  import junit.framework.Test;
  import junit.framework.TestCase;
  import junit.framework.TestSuite;
  
  /**
     * Unit test for simple App.
  */
  public class AppTest extends TestCase {
     /**
        * Create the test case
        *
       * @param testName name of the test case
     */
     public AppTest( String testName ) {
        super( testName );
     }
     /**
        * @return the suite of tests being tested
     */
     public static Test suite() {
        return new TestSuite( AppTest.class );
     }
     /**
        * Rigourous Test :-)
     */
     public void testApp() {
        assertTrue( true );
     }
  }
  ```

  现在您可以看到Maven的强大功能。您可以在maven中使用单个命令创建任何类型的项目，并可以开始开发。

- ## 不同的Archetypes

  | Archetypes                      | 描述                                                         |
  | :------------------------------ | :----------------------------------------------------------- |
  | **maven-archetype-archetype**   | 一个原型，其中包含样本原型。                                 |
  | **maven-archetype-j2ee-simple** | 一个原型，其中包含简化的示例J2EE应用程序。                   |
  | **maven-archetype-mojo**        | 一个原型，其中包含示例Maven插件示例。                        |
  | **maven-archetype-plugin**      | 一个原型，其中包含示例Maven插件。                            |
  | **maven-archetype-plugin-site** | 一个原型，其中包含示例Maven插件站点。                        |
  | **maven-archetype-portlet**     | 一个原型，其中包含样本JSR-268 Portlet。                      |
  | **maven-archetype-quickstart**  | 一个原型，其中包含Maven项目示例。                            |
  | **maven-archetype-simple**      | 一个原型，其中包含一个简单的Maven项目。                      |
  | **maven-archetype-site**        | 一个原型，其中包含一个示例Maven网站，以演示一些受支持的文档类型，例如APT，XDoc和FML，并演示如何创建您的网站。 |
  | **maven-archetype-site-simple** | 一个原型，其中包含示例Maven站点。                            |
  | **maven-archetype-webapp**      | 一个原型，其中包含示例Maven Webapp项目。                     |

