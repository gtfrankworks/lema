---
title: Maven 创建项目
createTime: 2025/08/20 13:35:54
permalink: /tools/maven/blhid69p/
---
## 什么是Maven插件？

Maven使用**archetype**插件来创建项目。为了创建一个简单的Java应用程序，我们将使用maven-archetype-quickstart插件。在下面的示例中，我们将在C\MVN文件夹中创建一个基于Maven的Java应用程序项目。让我们打开命令控制台，转到C:\MVN目录并执行以下mvn命令。

```bash
C:\MVN>mvn archetype:generate
-DgroupId = com.companyname.bank 
-DartifactId = consumerBanking 
-DarchetypeArtifactId = maven-archetype-quickstart 
-DinteractiveMode = false
```

Maven将开始处理并将创建完整的Java应用程序项目结构。

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
[INFO] -------------------------------------------------------------------
[INFO] Using following parameters for creating project
from Old (1.x) Archetype: maven-archetype-quickstart:1.0
[INFO] -------------------------------------------------------------------

[INFO] Parameter: groupId, Value: com.companyname.bank
[INFO] Parameter: packageName, Value: com.companyname.bank
[INFO] Parameter: package, Value: com.companyname.bank
[INFO] Parameter: artifactId, Value: consumerBanking
[INFO] Parameter: basedir, Value: C:\MVN
[INFO] Parameter: version, Value: 1.0-SNAPSHOT

[INFO] project created from Old (1.x) Archetype in dir: C:\MVN\consumerBanking
[INFO] ------------------------------------------------------------------
[INFO] BUILD SUCCESSFUL
[INFO] ------------------------------------------------------------------
[INFO] Total time: 14 seconds
[INFO] Finished at: Tue Jul 10 15:38:58 IST 2012
[INFO] Final Memory: 21M/124M
[INFO] ------------------------------------------------------------------
```

现在转到C:/MVN目录。您将看到创建了一个名为Consumer Banking的Java应用程序项目（在artifactId中指定）。Maven使用标准目录布局，如下所示-

![maven gen](https://www.cainiaoya.com/images/maven/gen.jpg)

使用上面的示例，我们可以了解以下关键概念

- consumerBanking - 包含src文件夹和pom.xml
- src/main/java - 在程序包结构（com/companyName/bank）下包含Java代码文件。
- src/main/test - 在程序包结构（com/companyName/bank）下包含测试Java代码文件。
- src/main/resources - 它包含图像/属性文件（在上面的示例中，我们需要手动创建此结构）。

如果进行观察，您会发现Maven还创建了一个示例Java源文件和Java Test文件。打开C:\MVN\consumerBanking\src\main\java\com\companyname\bank文件夹，您将看到App.java。

```java
package com.companyname.bank;

/**
 * Hello world!
 *
 */
public class App {
   public static void main( String[] args ){
      System.out.println( "Hello World!" );
   }
}
```

打开C:\MVN\consumerBanking\src\test\java\com\companyname\bank文件夹以查看AppTest.java。

```java
package com.companyname.bank;

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

开发人员需要按照上表所述放置其文件，并且Maven处理所有与构建相关的复杂性。在下一章中，我们将讨论如何使用maven构建和测试项目。