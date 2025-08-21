---
title: Maven 管理依赖项
createTime: 2025/08/20 13:46:07
permalink: /tools/maven/mt0u1lj6/
---
- ## 概述

  Maven的核心功能之一是依赖管理。一旦我们要处理多模块项目（由数百个模块/子项目组成），管理依赖项将是一项艰巨的任务。Maven提供了高度的控制权来管理这种情况。

- ## 传递依存关系发现

  通常情况是，一个库（例如A）依赖于另一个库（例如B）。如果另一个项目C要使用A，那么该项目也需要使用库B。Maven帮助避免了发现所有所需库的此类要求。Maven通过读取依赖项的项目文件（pom.xml），弄清它们的依赖项等等来做到这一点。我们只需要在每个项目pom中定义直接依赖项。Maven自动处理其余部分。通过传递依赖关系，所包含库的图可以在很大程度上快速增长。有重复的库时，可能会出现这种情况。Maven提供了很少的功能来控制传递依赖项的范围。

  | 功能       | 描述                                                         |
  | :--------- | :----------------------------------------------------------- |
  | 依赖性调解 | 确定在遇到工件的多个版本时将使用哪个版本的依赖项。如果两个依赖关系版本在依赖关系树中的深度相同，则将使用第一个声明的依赖关系。 |
  | 依赖管理   | 直接指定在传递依赖项中遇到工件时要使用的工件的版本。例如，项目C可以在其“依赖项管理”部分中将B作为依赖项包括在内，并直接控制在引用B时将使用哪个版本的B。 |
  | 依赖范围   | 根据构建的当前阶段包括依赖项。                               |
  | 排除的依赖 | 可以使用“exclusion”元素排除任何传递依赖。例如，A依赖于B，B依赖于C，那么A可以将C标记为已排除。 |
  | 可选依赖项 | 可以使用“optional”元素将任何传递依赖项标记为可选。例如，A依赖于B，B依赖于C。现在B将C标记为可选。那么A将不会使用C。 |

- ## 依赖范围

  可以使用各种“依赖关系范围”来限制传递依赖关系的发现，如下所述。

  | 范围         | 描述                                                         |
  | :----------- | :----------------------------------------------------------- |
  | **compile**  | 此范围指示依赖项在项目的类路径中可用。 这是默认范围。        |
  | **provided** | 此范围指示依赖项将在运行时由JDK或Web服务器/容器提供。        |
  | **runtime**  | 此范围表明，编译不需要依赖关系，而在执行过程中则需要。       |
  | **test**     | 此范围表明依赖性仅可用于测试编译和执行阶段。                 |
  | **system**   | 此范围表明您必须提供系统路径。                               |
  | **import**   | 仅当依赖项为pom类型时，才使用此范围。 此范围指示应使用该POM的dependencyManagement部分中的依赖项替换指定的POM。 |

- ## 依赖管理

  通常，我们在一个公共项目下有一组项目。在这种情况下，我们可以创建一个具有所有公共依赖项的公共pom，然后将其作为子项目pom的父级。以下示例将帮助您理解此概念。

  ![maven dependency](https://www.cainiaoya.com/images/maven/dependency.jpg)

  以下是上面的依赖图的细节-

  - App-UI-WAR依赖于App-Core-lib和App-Data-lib。
  - Root是App-Core-lib和App-Data-lib的父级。
  - Root在其依赖项部分中将Lib1，lib2，Lib3定义为依赖项。

  **App-UI-WAR**

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.groupname</groupId>
     <artifactId>App-UI-WAR</artifactId>
     <version>1.0</version>
     <packaging>war</packaging>
     <dependencies>
        <dependency>
           <groupId>com.companyname.groupname</groupId>
           <artifactId>App-Core-lib</artifactId>
           <version>1.0</version>
        </dependency>
     </dependencies>  
     <dependencies>
        <dependency>
           <groupId>com.companyname.groupname</groupId>
           <artifactId>App-Data-lib</artifactId>
           <version>1.0</version>
        </dependency>
     </dependencies>  
  </project>
  ```

  **App-Core-lib**

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <parent>
        <artifactId>Root</artifactId>
        <groupId>com.companyname.groupname</groupId>
        <version>1.0</version>
     </parent>
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.groupname</groupId>
     <artifactId>App-Core-lib</artifactId>
     <version>1.0</version> 
     <packaging>jar</packaging>
  </project>
  ```

  **App-Data-lib**

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <parent>
        <artifactId>Root</artifactId>
        <groupId>com.companyname.groupname</groupId>
        <version>1.0</version>
     </parent>
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.groupname</groupId>
     <artifactId>App-Data-lib</artifactId>
     <version>1.0</version>   
     <packaging>jar</packaging>
  </project>
  ```

  **Root**

  ```xml
  <project xmlns = "http://maven.apache.org/POM/4.0.0"
     xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
     http://maven.apache.org/xsd/maven-4.0.0.xsd">
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.companyname.groupname</groupId>
     <artifactId>Root</artifactId>
     <version>1.0</version>
     <packaging>pom</packaging>
     <dependencies>
        <dependency>
           <groupId>com.companyname.groupname1</groupId>
           <artifactId>Lib1</artifactId>
           <version>1.0</version>
        </dependency>
     </dependencies>  
     <dependencies>
        <dependency>
           <groupId>com.companyname.groupname2</groupId>
           <artifactId>Lib2</artifactId>
           <version>2.1</version>
        </dependency>
     </dependencies>  
     <dependencies>
        <dependency>
           <groupId>com.companyname.groupname3</groupId>
           <artifactId>Lib3</artifactId>
           <version>1.1</version>
        </dependency>
     </dependencies>  
  </project>
  ```

  现在，当我们构建App-UI-WAR项目时，Maven将通过遍历依赖关系图并构建应用程序来发现所有依赖关系。

  从上面的示例中，我们可以学习以下关键概念-

  - 可以使用父pom的概念将公共依赖项放在单个位置。Root项目中列出了App-Data-lib和App-Core-lib项目的依赖关系（请参阅Root的包装类型。它是POM）。
  - 在App-UI-WAR中无需将Lib1，lib2，Lib3指定为依赖项。Maven使用传递依赖机制来管理此类详细信息。