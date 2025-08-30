---
title: MyBatisFlex的依赖
createTime: 2025/08/26 17:11:09
permalink:  /framework/mybatisflex/base/q4xc8vah/
---
# Maven 依赖
>
> > 以下的 xml maven 依赖示例中，可能并非最新的 MyBatis-Flex 版本，请自行查看最新版本，并修改版本号。
> >
> > 建议配置 annotationProcessorPaths，那么可以省略mybatis-flex-processor的依赖
>
> 1、只用到了 MyBatis，没用到 Spring 的场景：
>
> xml
>
> ```
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-core</artifactId>
>     <version>1.11.1</version>
> </dependency>
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-processor</artifactId>
>     <version>1.11.1</version>
>     <scope>provided</scope>
> </dependency>
> ```
>
> 2、用到了 Spring 的场景
>
> xml
>
> ```
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-spring</artifactId>
>     <version>1.11.1</version>
> </dependency>
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-processor</artifactId>
>     <version>1.11.1</version>
>     <scope>provided</scope>
> </dependency>
> ```
>
> 3、用到了 SpringBoot v2.x 的场景
>
> xml
>
> ```
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-spring-boot-starter</artifactId>
>     <version>1.11.1</version>
> </dependency>
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-processor</artifactId>
>     <version>1.11.1</version>
>     <scope>provided</scope>
> </dependency>
> ```
>
> 4、用到了 SpringBoot v3.x 的场景
>
> xml
>
> ```
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-spring-boot3-starter</artifactId>
>     <version>1.11.1</version>
> </dependency>
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-processor</artifactId>
>     <version>1.11.1</version>
>     <scope>provided</scope>
> </dependency>
> ```
>
> 5、用到了 Solon 的场景
>
> xml
>
> ```
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-solon-plugin</artifactId>
>     <version>1.11.1</version>
> </dependency>
> <dependency>
>     <groupId>com.mybatis-flex</groupId>
>     <artifactId>mybatis-flex-processor</artifactId>
>     <version>1.11.1</version>
>     <scope>provided</scope>
> </dependency>
> ```
>
> 6、配置 annotationProcessor
>
> `mybatis-flex-processor`提供APT服务，可以配置到annotationProcessorPaths，配置后，无需在依赖中声明`mybatis-flex-processor`依赖。
>
> 参考：[APT 设置-和 Lombok、Mapstruct 整合](https://mybatis-flex.com/zh/others/apt.html)
>
> > 在Kotlin中使用时，请参考[在Kotlin中使用注解处理器](https://mybatis-flex.com/zh/others/kapt.html)
>
> xml
>
> ```
> <plugin>
>     <groupId>org.apache.maven.plugins</groupId>
>     <artifactId>maven-compiler-plugin</artifactId>
>     <version>3.8.1</version>
>     <configuration>
>         <annotationProcessorPaths>
>             <path>
>                 <groupId>com.mybatis-flex</groupId>
>                 <artifactId>mybatis-flex-processor</artifactId>
>                 <version>1.11.1</version>
>             </path>
>         </annotationProcessorPaths>
>     </configuration>
> </plugin>
> ```
>
> 7、配置依赖管理
>
> MyBatis-Flex 提供了 `mybatis-flex-dependencies` 模块进行依赖管理，只需要在 `<dependencyManagement>` 标签下进行配置就可以了。
>
> xml
>
> ```
> <dependencyManagement>
>     <dependencies>
>         <dependency>
>             <groupId>com.mybatis-flex</groupId>
>             <artifactId>mybatis-flex-dependencies</artifactId>
>             <version>${mybatis-flex.version}</version>
>             <type>pom</type>
>             <scope>import</scope>
>         </dependency>
>     </dependencies>
> </dependencyManagement>
> ```
>
> 在使用时就可以不指定 `<version>` 标签了，例如：
>
> xml
>
> ```
> <dependencies>
>     <dependency>
>         <groupId>com.mybatis-flex</groupId>
>         <artifactId>mybatis-flex-spring-boot-starter</artifactId>
>     </dependency>
>     <dependency>
>         <groupId>com.mybatis-flex</groupId>
>         <artifactId>mybatis-flex-codegen</artifactId>
>     </dependency>
> </dependencies>
> ```

# Gradle 依赖

> 以下的 gradle 依赖示例中，可能并非最新的 MyBatis-Flex 版本，请自行查看最新版本，并修改版本号。

> 建议配置 annotationProcessor，那么可以省略 `mybatis-flex-processor` 的依赖。

1、只用到了 MyBatis，没用到 Spring 的场景：

**【Kotlin】**

kotlin

```
dependencies {
    implementation("com.mybatis-flex:mybatis-flex-core:1.11.1")
}
```

**【Groovy】**

groovy

```
dependencies {
    implementation 'com.mybatis-flex:mybatis-flex-core:1.11.1'
}
```

2、用到了 Spring 的场景

**【Kotlin】**

kotlin

```
dependencies {
    implementation("com.mybatis-flex:mybatis-flex-spring:1.11.1")
}
```

**【Groovy】**

groovy

```
dependencies {
    implementation 'com.mybatis-flex:mybatis-flex-spring:1.11.1'
}
```

3、用到了 Spring Boot 的场景

**【Kotlin】**

kotlin

```
dependencies {
    implementation("com.mybatis-flex:mybatis-flex-spring-boot-starter:1.11.1")
}
```

**【Groovy】**

groovy

```
dependencies {
    implementation 'com.mybatis-flex:mybatis-flex-spring-boot-starter:1.11.1'
}
```

4、用到了 Solon 的场景

**【Kotlin】**

kotlin

```
dependencies {
    implementation("com.mybatis-flex:mybatis-flex-solon-plugin:1.11.1")
}
```

**【Groovy】**

groovy

```
dependencies {
    implementation 'com.mybatis-flex:mybatis-flex-solon-plugin:1.11.1'
}
```

5、配置 annotationProcessor

由 `mybatis-flex-processor` 提供APT服务。

参考：[APT 设置-和 Lombok、Mapstruct 整合](https://mybatis-flex.com/zh/others/apt.html)

> 在Kotlin中使用时，请参考[在Kotlin中使用注解处理器](https://mybatis-flex.com/zh/others/kapt.html)

**【Kotlin】**

kotlin

```
dependencies {
    annotationProcessor("com.mybatis-flex:mybatis-flex-processor:1.11.1")
}
```

**【Groovy】**

groovy

```
dependencies {
    annotationProcessor 'com.mybatis-flex:mybatis-flex-processor:1.11.1'
}
```

