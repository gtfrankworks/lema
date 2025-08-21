---
title: Maven 外部依赖
createTime: 2025/08/20 13:38:13
permalink: /tools/maven/slmtkttp/
---
## 外部依赖

如您所知，Maven使用存储库的概念进行依赖项管理。但是，如果在任何远程存储库和中央存储库中都没有依赖项，会发生什么情况？Maven使用外部依赖关系的概念为这种情况提供了答案。例如，让我们对[“创建Java项目”](https://www.cainiaoya.com/maven/maven-create-project.html)一章中创建的项目进行以下更改。

- 将lib文件夹添加到src文件夹。
- 将所有jar复制到lib文件夹中。我们使用了ldapjdk.jar，它是LDAP操作的帮助程序库。

现在我们的项目结构应如下所示：

![dependencies](https://www.cainiaoya.com/images/maven/dependencies.jpg)

在这里，您有一个自己的库，该库是特定于项目的，这是一种常见的情况，它包含jars，在任何存储库中可能都没有这些jars，可供maven从中下载。如果您的代码将此库与Maven一起使用，则Maven构建将失败，因为在编译阶段无法下载或引用该库。为了处理这种情况，让我们使用以下方式将此外部依赖项添加到maven pom.xml中。

```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0" 
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
   http://maven.apache.org/maven-v4_0_0.xsd">
   <modelVersion>4.0.0</modelVersion>
   <groupId>com.companyname.bank</groupId>
   <artifactId>consumerBanking</artifactId>
   <packaging>jar</packaging>
   <version>1.0-SNAPSHOT</version>
   <name>consumerBanking</name>
   <url>http://maven.apache.org</url>

   <dependencies>
      <dependency>
         <groupId>junit</groupId>
         <artifactId>junit</artifactId>
         <version>3.8.1</version>
         <scope>test</scope>
      </dependency>

      <dependency>
         <groupId>ldapjdk</groupId>
         <artifactId>ldapjdk</artifactId>
         <scope>system</scope>
         <version>1.0</version>
         <systemPath>${basedir}\src\lib\ldapjdk.jar</systemPath>
      </dependency>
   </dependencies>

</project>
```

在上面的示例中，在依dependencies查看第二个dependency元素，它清除了以下有关外部依赖性的关键概念。

- 可以按照与其他依赖项相同的方式在pom.xml中配置外部依赖项（库jar位置）。
- 指定与库名称相同的groupId。
- 指定artifactId与库名称相同。
- 将scope指定为system。
- 指定相对于项目位置的系统路径。

希望现在您对外部依赖项有所了解，并能够在Maven项目中指定外部依赖项。