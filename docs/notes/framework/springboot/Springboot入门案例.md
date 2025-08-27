---
title: Springboot入门案例
createTime: 2025/08/27 16:28:16
permalink: /framework/springboot/ogwfvutf/
---
## 步骤 1: 使用 Spring Initializr 创建项目骨架



**Spring Initializr** 是一个非常方便的工具，可以快速生成一个结构良好、配置完整的 Spring Boot 项目。

1. 打开你的浏览器，访问 **https://start.spring.io/**。
2. 按照以下配置填写项目信息：
   - **Project**: Maven Project (这是最常用的构建工具)
   - **Language**: Java
   - **Spring Boot**: 选择 **3.2.x**（最新的稳定版本）
   - **Java**: 选择 **17**（Spring Boot 3 的最低要求）
3. 在右侧的 "Dependencies"（依赖）部分，点击 **"ADD DEPENDENCIES"**，并搜索添加 `Spring Web`。这个依赖包含了构建 Web 应用所需的所有核心库，包括 Tomcat 和 Spring MVC。
4. 点击下方的 **"Generate"** 按钮，下载一个 `.zip` 格式的项目压缩包。
5. 将压缩包解压到您的工作目录。



## 步骤 2: 在 IDE 中导入项目和编写代码



1. 打开您喜欢的集成开发环境（IDE），例如 **IntelliJ IDEA** 或 **VS Code**。
2. 选择 "Import Project" 或 "Open" 选项，然后导航到您刚刚解压的项目目录。IDE 会自动识别 Maven 项目并导入所有依赖。
3. 在 `src/main/java/com/example/demo/` 目录下，您会看到 `DemoApplication.java` 文件。
4. 在同一个包下，创建一个新的 Java 类，命名为 `HelloController.java`。
5. 将第一个 Immersive 文档中的 `HelloController` 类的代码复制粘贴到您的新文件中。



## 步骤 3: 运行和验证项目



现在，您的项目已经准备就绪，可以运行了。

**方式一: 使用 IDE 运行**

这是最简单的方式。

1. 打开 `DemoApplication.java` 文件。
2. 找到 `main` 方法，通常 IDE 会在旁边提供一个“运行”按钮（例如，一个绿色的箭头）。
3. 点击该按钮，IDE 会自动编译和启动应用。

**方式二: 使用命令行运行**

如果你没有 IDE，或者想了解项目是如何在命令行中运行的，可以使用以下步骤：

1. 打开终端或命令行，进入到项目的根目录。

2. 执行以下 Maven 命令来打包应用：

   Bash

   ```
   ./mvnw clean package
   ```

   这个命令会下载所有依赖，编译代码，并将项目打包成一个可执行的 `.jar` 文件，存放在 `target/` 目录下。

3. 执行以下命令来运行 `.jar` 文件：

   Bash

   ```
   java -jar target/demo-0.0.1-SNAPSHOT.jar
   ```

**验证结果**

无论你使用哪种方式，当你在终端中看到类似 `Started DemoApplication in ... seconds` 的日志时，表示应用已成功启动。

1. 打开你的浏览器或使用一个 API 工具（如 Postman）。
2. 访问网址：`http://localhost:8080`。
3. 你将看到页面上显示 **"Hello, Spring Boot 3!"**，这说明你的 **RESTful API** 已经成功响应了请求。

## 相关配置和代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<!--
	Maven 父项目，用于继承 Spring Boot 的默认配置。
	它管理了所有依赖的版本号，让你无需手动指定。
	-->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.2.5</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<groupId>com.example</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>demo</name>
	<description>Demo project for Spring Boot 3</description>

	<properties>
		<java.version>17</java.version>
	</properties>

	<dependencies>
		<!--
		Spring Web Starter 依赖。
		这是构建 Web 应用的必备依赖，它包含了：
		- Spring MVC
		- 嵌入式 Tomcat 服务器
		- JSON 库（如 Jackson）
		通过这个依赖，你可以快速构建 RESTful API。
		-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<!-- 可选：用于单元测试，如果你需要编写测试代码，可以保留。 -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<!--
			Spring Boot Maven 插件。
			它将项目打包成一个可执行的 JAR 文件，并包含所有依赖，
			让你只需使用 `java -jar` 命令即可运行应用。
			-->
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

```

```
# 这是应用的配置文件，位于 src/main/resources 目录下。
# 你可以定义各种应用属性，例如服务器端口、数据库连接信息等。

# 设置服务器端口为 8080。如果省略，Spring Boot 默认使用 8080 端口。
server.port=8080

```

```java
// 这是主应用程序类，负责启动整个 Spring Boot 应用。
//
// @SpringBootApplication 是一个组合注解，它包含了以下三个核心注解：
//   - @SpringBootConfiguration: 标记该类为配置类，让它能被 Spring 容器识别。
//   - @EnableAutoConfiguration: 启用自动配置功能。这是 Spring Boot 的核心，它会根据你项目中
//     添加的依赖（如 spring-boot-starter-web），自动配置相应的 Bean，省去手动配置的麻烦。
//   - @ComponentScan: 默认扫描当前包及其所有子包下的组件，并将它们注册为 Spring Bean。
//     因此，你的控制器类（HelloController）放在同一个包下，就能被自动发现。
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // SpringApplication.run() 方法是启动 Spring Boot 应用的入口。
        // 它会创建一个 Spring 应用上下文，并运行内置的 Web 服务器（默认为 Tomcat）。
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 这是 RESTful API 的控制器类，用于处理 Web 请求。
//
// @RestController 是一个方便的组合注解，等同于在类上同时使用 @Controller 和 @ResponseBody。
//   - @Controller: 标记该类为一个 Spring MVC 控制器。
//   - @ResponseBody: 告诉 Spring MVC 将方法的返回值直接作为 HTTP 响应体，而不是渲染视图模板。
@RestController
class HelloController {

    // @GetMapping("/"): 这是一个请求映射注解。
    // 它将 HTTP GET 请求映射到该方法，并指定了请求的 URL 路径为 "/"。
    @GetMapping("/")
    public String hello() {
        // 该方法的返回值会直接作为 HTTP 响应体返回给客户端，因为类上使用了 @RestController。
        return "Hello, Spring Boot 3!";
    }
}

```

