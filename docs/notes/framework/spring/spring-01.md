---
title: Spring框架介绍
createTime: 2025/08/12 10:28:26
permalink: /framework/spring/cykxwzso/
---
# Spring框架

> 本课程旨在让你掌握spring框架的核心思想，理解如何使用spring,明白依赖注入、面向切面编程、申明式事务的机制和使用方式，通过本系列课程的学习，能够胜任在开发中使用spring框架，能够很好地应用框架进行coding工作。同时，也为后绪的spring MVC学习打好坚实的知识基础和技术基础。本课程主要包含如下几个知识点

- Spring框架的核心架构以及对Bean的管理
- 依赖注入
- 面向切面编程
- xml配置和流行的注解配置
- 申明式事务的配置
- 与持久层的集成[本例采用Hibernate框架，如想要学习与mybatis的集成，请看mybatis系列文章之四和五]

另外，本系列教程中的所有案例代码，都是基于maven进行管理的

************************

<!-- more -->

## Spring框架介绍

> 首先，我们给框架[framework]给一个定义：**针对某个领域的一整套解决方案 **
> Spring是一个企业级业务集成的开源框架。它在业务集成方面提供了一整套的解决方案，主要有如下特性：

1. 轻量级：Spring 是非侵入性的 - 基于 Spring 开发的应用中的对象可以不依赖于 Spring 的 API
2. 依赖注入(DI --- dependency injection、IOC)
3. 面向切面编程(AOP --- aspect oriented programming)
4. 容器: Spring 是一个容器, 因为它包含并且管理应用对象的生命周期
5. 框架: Spring 实现了使用简单的组件配置组合成一个复杂的应用. 在 Spring 中可以使用 XML 和 Java 注解组合这些对象
6. 一站式：在 IOC 和 AOP 的基础上可以整合各种企业应用的开源框架和优秀的第三方类库 （实际上 Spring 自身也提供了展现层的 SpringMVC 和 持久层的 Spring JDBC）

### Spring的7个核心模块

spring框架包含7个核心模块，如下图所示
![alt text](/images/spring/springModel.png)
这里需要注意的是，在spring core的基础之上，组成 Spring框架的每个模块（或组件）都可以单独存在，或者与其他一个或多个模块联合实现。
每个模块的功能介绍如下：

1. 核心容器：核心容器提供 Spring框架的基本功能。核心容器的主要组件是 BeanFactory，它是工厂模式的实现。BeanFactory 使用控制反转 （IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。
2. Spring 上下文[Context]：Spring 上下文是一个配置文件，向 Spring框架提供上下文信息。Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。
3. Spring AOP：通过配置管理特性，Spring AOP 模块直接将面向方面的编程功能集成到了 Spring框架中。所以，可以很容易地使 Spring框架管理的任何对象支持 AOP。如:Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务，通过使用 Spring AOP，不用依赖 EJB 组件，就可以将声明性事务管理集成到应用程序中。
4. Spring DAO：JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。
5. Spring ORM：Spring框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map。所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。
6. Spring Web 模块：Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。所以，Spring框架支持与 Jakarta Struts 的集成。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。
7. Spring MVC 框架：MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，Spring MVC 容纳了大量视图技术，其中包括 Thymeleaf、JSP、Velocity、Tiles、iText 和 POI。

## 依赖注入

> Dependency Injection, 简称DI  
> 是软件实体之间一种关系的关系，表明一个软件实体，依靠另一个软件实体的规范或实现,而不能自立或自给。

传统 VS DI
通常在代码中，在调用依赖的对象之前，必须去创建对象， 然后才可以调用对象方法。
![图示](/images/spring/vs.png)

但是，通过DI【DI = Dependency Injection】容器，在运行期，由外部容器动态地将依赖对象注入到组件中。  



通过上面的动画演示，我们可以清晰地认识到**注入**的意思，就是在你需要的时候，由容器负责把需要的对象“给”你，而无需我们手动创建，换句话说，这些对象都由“容器”责负创建和管理，这些由容器负责创建和管理的对象，我们叫做"Bean"

那Spring框架是如何来帮助我们创建和管理这些Bean的呢？这些Bean又需要如何配置呢？ 下面我来一一解答一下。

首先，spring框架的核心组件[Spring Core]提供了BeanFactory接口以及整个抽象层和实现类，我们来看一下这个复杂的类关系图：
![图示](/images/spring/spring-di.png)
从这个图中可以看出，spring core 提供了二种不同的配置应用上下文类型，分别是：

- 基于xml的配置读取，其中，这个又分为两个
  - FileSystemXmlApplicationContext
  - ClassPathXmlApplicationContext
- 基于注解的配置读取
  - AnnotationConfigApplicationContext

很明显，这个类型分别对应不同的情况，我们采用xml配置Bean的方式时，一般会使用`ClassPathXmlApplicationContext`，而我们采用注解配置时，则采用`AnnotationConfigApplicationContext`, 在下面的案例中，我们都将详细介绍.

其次，我们配置好后，就可以利用Spring Core提供的API来进行操作，如下：

```java
//这个是基于 xml 配置的情况
ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
```

```java
//这个是基于 注解配置的情况
ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
```

而有关`AppConfig.java`的代码，在下面的案例中再详细说明。

## 案例

> 经过上面的简要描述，相信大家对Spring Core的API有了一个大致的了解，下面我们通过两个案例来加强练习。

### 写在前面

> 以下两个案例都是通过maven来管理的项目，导入的依赖都是一样的，如下：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.springdemo</groupId>
    <artifactId>javaProject</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>
    <name>spring-01-di</name>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <spring.version>4.3.13.RELEASE</spring.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>6.8</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
	    <plugins>
	        <plugin>
	            <groupId>org.apache.maven.plugins</groupId>
	            <artifactId>maven-compiler-plugin</artifactId>
	            <configuration>
	                <source>1.8</source>
	                <target>1.8</target>
	            </configuration>
	        </plugin>
	        <!-- config other plugin -->
	    </plugins>
	</build>
</project>
```

项目结构：
![图示](/images/spring/project-structure.PNG)

### 案例一，基于xml配置

1. 创建实体类如下：

```java
package com.springdemo.entity;

import java.io.Serializable;



public class Computer implements Serializable {

    private Integer id;
    private String vendor;
    //显示屏
    private Screen screen;
	//getter/setter 方法略...
```

```java
package com.springdemo.entity;

import java.io.Serializable;


public class Screen implements Serializable {

    private Integer id;
    private String type;
    private double price;
    //getter/setter 方法略...
```

2. 在applicationContext.xml文件中来定义我们的"Bean"， 如下：
   这个文件存放在`resources`源文件夹下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
     http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- 定义我们的Bean -->
    <bean id="computer" class="com.springdemo.entity.Computer">
        <property name="id" value="1"></property>
        <property name="vendor" value="戴尔"></property>
        <!-- 引用另一个Bean -->
        <property name="screen" ref="screen"/>
    </bean>
    <!-- 基于属性来注入值 -->
    <bean id="screen" class="com.springdemo.entity.Screen">
        <property name="id" value="1"/>
        <property name="type" value="DDR3"/>
        <property name="price" value="875.5"/>
    </bean>
</beans>
```

3. 基于Spring的API来编写代码，获取我们需要的Bean对象

```java
package com.springdemo;

import com.springdemo.entity.Computer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.testng.annotations.Test;


public class GetBeanTest {

    @Test
    public void testGetBean() {
        //第一步，创建ApplicationContext对象
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        //第二步，通过这个上下文来获取你定义过的bean,根据id来获取
        Computer computer = (Computer) ac.getBean("computer");
        //第三步，打印出这个对象以及关联的对象
        System.out.println(computer);
        System.out.println(computer.getScreen());
    }
}
```

根据我们在xml中的配置，输出如下：

```text
Computer{id=1, vendor='戴尔'}
Screen{id=1, type='DDR3', price=875.5}
```

当然，我们现在的例子中，都是很基本的属性，下面我给实体类添加一些集合属性，来看看这类属性在spring的配置中如何编写。
修改`Computer.java`类如下：

```java
package com.springdemo.entity;

import java.io.Serializable;
import java.util.List;


public class Computer implements Serializable {

    private Integer id;
    private String vendor;
    //显示屏
    private Screen screen;
    //集合属性
    private List<String> diskList;
    //同样，提供 getter和setter 方法
    public List<String> getDiskList() {
        return diskList;
    }
    public void setDiskList(List<String> diskList) {
        this.diskList = diskList;
    }
    ...
```

现在，我们需要做的仅仅是修改`applicationContext.xml`文件，如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
     http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- 定义我们的Bean -->
    <bean id="computer" class="com.springdemo.entity.Computer">
        <property name="id" value="1"></property>
        <property name="vendor" value="戴尔"></property>
        <!-- 引用另一个Bean -->
        <property name="screen" ref="screen"/>
        <!-- 引用集合属性 -->
        <property name="diskList" ref="diskList"/>
    </bean>
    <!-- 添加一个集合Bean -->
    <bean id="diskList" class="java.util.ArrayList">
        <constructor-arg>
            <list>
                <!-- 我们的集合中存放就是String,所以直接写value,如果是另一个bean,则可以通过 ref 来引用 -->
                <value>西数300G机械硬盘</value>
                <value>英特尔128G固态硬盘</value>
            </list>
        </constructor-arg>
    </bean>
    <!-- 基于属性来注入值 -->
    <bean id="screen" class="com.springdemo.entity.Screen">
        <property name="id" value="1"/>
        <property name="type" value="DDR3"/>
        <property name="price" value="875.5"/>
    </bean>
</beans>
```

在测试代码中，添加如下代码：

```java
//第三步，打印出这个对象以及关联的对象
System.out.println(computer);
System.out.println(computer.getScreen());
if(computer.getDiskList() != null) {
     System.out.print("硬盘列表：\n");
     computer.getDiskList().forEach(System.out::println);
}
```

输出结果如下：

```text
Computer{id=1, vendor='戴尔'}
Screen{id=1, type='DDR3', price=875.5}
硬盘列表：
西数300G机械硬盘
英特尔128G固态硬盘
```

** 有关Bean对象在容器中的存在范围 **
在xml中配置bean对象时，可以指定scope属性，它的值有两个：`prototype`和`singleton`, 默认是 `singleton`,也就是单例的，可以通过如下测试来验证：

```xml
	<!-- 定义我们的Bean -->
    <bean id="computer" class="com.springdemo.entity.Computer" scope="prototype">
        <property name="id" value="1"></property>
        <property name="vendor" value="戴尔"></property>
        <!-- 引用另一个Bean -->
        <property name="screen" ref="screen"/>
        <!-- 引用集合属性 -->
        <property name="diskList" ref="diskList"/>
    </bean>
```

上面把computer的scope指定为`prototype`,现在测试代码如下：

```java
package com.springdemo;

import com.springdemo.entity.Computer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.testng.annotations.Test;


public class GetBeanTest {

    @Test
    public void testGetBean() {
        //第一步，创建ApplicationContext对象
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        //第二步，通过这个上下文来获取你定义过的bean,根据id来获取
        Computer computer1 = (Computer) ac.getBean("computer");
        
        //再获取一个computer2对象
        Computer computer2 = (Computer)ac.getBean("computer");
        //判断computer1与computer2是否一样
        System.out.println(computer1 == computer2);

    }
}
```

结果是：

```text
false
```

如果我们没有指定scope或者`scope=singleton`时，这个结果是`true`

另外，在xml中，也可以指定其它的属性，常用的有：

- depends-on属性, 指定当前Bean的依赖Bean,表示在初始化本Bean之前先完成指定的Bean的初始化
- init-method属性, 指定当前Bean的初始化方法，在Bean实例创建好后，首先就会调用此属性指定的方法
- destroy-method属性,指定当前Bean的销毁方法，在Bean实例被销毁之前会自动调用此属性指定的方法
- lazy-init属性,指定当前Bean是否采用延迟初始化策略，如果为true,则表示被调用时再初始化此Bean,如果为false,则容器创建时就会初始化此Bean
- autowire属性, 用来指定当前Bean的依赖关系的自动注入方式，其有5个值，如下：
  - byName值: 表示通过id名称来自动匹配
  - byType值：表示通过class指定的类型来自动装配
  - constructor值：表示使用构造函数的参数进行自动装配（参数的类型要匹配）
  - autodetect值：表示自动进行选择匹配方式，首先进行constructor自动装配，若不存在构造方法则使用byType.
  - no值: 表示不适用自动装配

### 案例二，基于注解配置

> 所需要的注解不多，主要有:

 - @Component，用来注标某个类型是一个“组件”，意味着spring的di容器可以来管理它,除这个注解外，还有另外3个更有语义性的注解，分别是`@Controller`,`@Service`,`@Repository`，这三个注解分别用来标注控制层、业务层、持久层的类型，在SPRING MVC中我们再做讲解。
 - @Lazy,用来指定某个类型是否要做延迟加载，默认是true
 - @Scope, 用来指定创建对象是否采用单例，默认是单例，可以修改成 prototype 模式，而不是singleton模式
 - @ComponentScan，用来指定spring di容器要扫描的包【含子包】，它会加载指定包下面所有打上了@Component注解的类型
 - @Autowire, 自动注入，spring的di容器会根据name,type等方式来查询相关的对象，并自动注入需要的类之中
 - @Qualifier, 用来限定注入查询的对象名称
 - @Bean,这个注解用来修饰方法，把这个方法的返回类型纳入到spring di容器的管理之中，并且方法名就是这个bean的id值。
 - @Configuration，用来表明本类是一个注解配置类，意味着可以通过注解上下文的方式来加载和解析
 - @Import, 可以用来导入另一个@Configuration 注解过的类型，这样就可以做到像xml一样，可以分多个文件进行分门别类地进行配置.
   ...

我们在此项目案例中，无需如此多的注解，只需要使用少数几个即可，当然，spring框架中还有很多其它的注解，有需要时我们再来学习。

**首先**，在`Computer`和`Screen`类型中，分别加上注解，如下：
Computer.java

```java
@Component  //表明Computer将会被DI容器托管
public class Computer implements Serializable {

    private Integer id;
    private String vendor;
    //显示屏
    @Autowired  //自动注入screen对象
    private Screen screen;
    //集合属性
    private List<String> diskList;
	//...
}
```

Screen.java

```java
@Component //同上
public class Screen implements Serializable {

    private Integer id;
    private String type;
    private double price;
	//...
}
```

可以看出，在Computer和Screen之上都打上了`@Component`注解，然后，我们通过另一个类来扫描这2个类所在的包
**其次**, 新加一个 AppConfig.java 类，如下：

```java
package com.springdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration   //指定此类是一个注解配置类
@ComponentScan("com.springdemo.entity")   //要扫描的包，可以指定多个，此处只有一个entity包
public class AppConfig {
    //nothing ...
}
```

**最后**，我们在测试代码中来验证一下

```java
package com.springdemo;

import com.springdemo.config.AppConfig;
import com.springdemo.entity.Computer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.testng.annotations.Test;


public class GetBeanByAnnotationTest {

    @Test
    public void testGetBean() {
        //第一步，通过AnnotationConfigApplicationContext来初始化DI容器上下文
        ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
        //第二步，同xml一样，调用getBean方法
        Computer computer1 = (Computer)ac.getBean("computer");
        //第三步，打印出来
        System.out.println(computer1);
        //打印被自动注入进来的 screen属性
        System.out.println(computer1.getScreen());
        //打印集合属性【注：我们目前并没有自动注入这个属性值，因为在这个属性上没有使用@Autowired注解
        if(computer1.getDiskList() != null) {
            System.out.println("硬盘列表:");
            computer1.getDiskList().forEach(System.out::println);
        }
    }
}
```

输出的结果如下：

```text
Computer{id=null, vendor='null',diskList=null}
Screen{id=null, type='null', price=0.0}
```

可以看到，Computer对象和Screen对象都由容器创建出来，但是，它们的属性值都是默认值，我们并没有指定，那如何像xml一样，可以给这些属性赋值呢？答案是通过在属性上使用 `@Autowired` 注解，并且在 `AppConfig.java`中进行创建这些Bean, 如下：
Computer.java:

```java
@Component
public class Computer implements Serializable {

    private Integer id;
    @Autowired   
    private String vendor;
    //显示屏
    @Autowired
    private Screen screen;
    //集合属性
    @Autowired
    @Qualifier("diskList") //这里限定的名称就是打上了@Bean注解方法的方法名称
    private List<String> diskList;
```

Screen.java:

```java
@Component
public class Screen implements Serializable {

    private Integer id;
    @Autowired
    private String type;
    @Autowired
    private double price;
```

可以看到，所有需要注入的属性上都打上了`@Autowired`的注解，但我们知道，只有screen类型上使用了`@Component`注解，所以，默认情况下在DI容器并没有String, double, 以及List的Bean对象存在，也就不可能帮助我们自动注入到Computer类型之中，那怎么办？ --很简单，我们可以在`AppConfig.java`中通过方法来创建这些我们需要的对象，并通过@Bean注解，把它们纳入到DI容器之中即可，如下：

```java
package com.springdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;


@Configuration   //指定此类是一个注解配置类
@ComponentScan("com.springdemo.entity")   //要扫描的包，可以指定多个，此处只有一个entity包
public class AppConfig {

    @Bean  //让此方法返回的对象纳入到DI容器管理的范围之中, id名字默认就是方法名
    public String vendor() {
        return "三星";
    }
    @Bean //让此方法返回的对象纳入到DI容器管理的范围之中
    public String type() {
        return "ViewSonic";
    }
    @Bean //让此方法返回的对象纳入到DI容器管理的范围之中
    public double price() {
        return 935.5;
    }
    
    @Bean  //让此方法返回的对象纳入到DI容器管理的范围之中
    public List<String> diskList() {
        List<String> disks = new ArrayList<>();
        disks.add("有一块300G的机械硬盘");
        disks.add("有一块128G的固态硬盘");
        return disks;
    }
}
```
这里我们需要注意一下，由于我们人为地创建了4个Bean对象，其中，1个double, 2个String, 还有一个List的String, 由于spring DI容器在注入对象时，集合类型会根据元素类型进行查找匹配，找到后就当做集合的元素，但我们还是希望能通过名称来查找并注入，所以，我在`Computer.java`中的diskList属性之上，还加了`@Qualifier("diskList")` 注解，目的就是明确此属性要注入一个名为diskList的List对象。
再次执行测试类，结果如下：

```text
Computer{id=null, vendor='三星'}
Screen{id=null, type='ViewSonic', price=935.5}
硬盘列表:
有一块300G的机械硬盘
有一块128G的固态硬盘
```

可以看到，vendor和type，price都有值了，另外，集合也有值了，到此，实现了与xml配置一样的结果。
另外，如果你想改变单例模式为原型模式，只需要在类型上面使用`@Scope`注解，并指定value属性为：`ConfigurableBeanFactory.SCOPE_PROTOTYPE`,默认值是：`ConfigurableBeanFactory.SCOPE_SINGLETON`

在实际的开发中，这种实体类一般无需通过DI来管理，DI管理的都是控制层、业务层、持久层、事务、日志等对象。

## spring对单元测试的集成

> spring提供了对junit和testng的集成测试，我们这里使用 testng，利用spring对测试框架的支持，我们可以很方便地写出简便的测试代码，如下：

我们的单元测试类要继承指定的支持类，对testng的支持类是：AbstractTestNGSpringContextTests, 然后，通过@ContextConfiguration来指定要加载的注解配置类型，如下：

```java
package com.springdemo;

import com.springdemo.config.AppConfig;
import com.springdemo.entity.Computer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;


@ContextConfiguration(classes = AppConfig.class) //可以指定多个类型
public class SpringTestngTest extends AbstractTestNGSpringContextTests {

    @Autowired //自动注入
    private Computer computer;

    @Test
    public void testGetBean() {
        System.out.println(computer);
        System.out.println(computer.getScreen());
        if(computer.getDiskList() != null) {
            System.out.println("硬盘列表:");
            computer.getDiskList().forEach(System.out::println);
        }
    }
}

```

输出结果如下：

```text
Computer{id=null, vendor='三星'}
Screen{id=null, type='ViewSonic', price=935.5}
硬盘列表:
有一块300G的机械硬盘
有一块128G的固态硬盘
```

与之前的结果是一样的！

## 总结

> spring di 容器简单、易用，尤其是通过注解的配置，使用起来更是方便，建议大家使用注解。再次看看常用的注解：

 - @Component，用来注标某个类型是一个“组件”，意味着spring的di容器可以来管理它,除这个注解外，还有另外3个更有语义性的注解，分别是`@Controller`,`@Service`,`@Repository`，这三个注解分别用来标注控制层、业务层、持久层的类型，在SPRING MVC中我们再做讲解。
 - @Lazy,用来指定某个类型是否要做延迟加载，默认是true
 - @Scope, 用来指定创建对象是否采用单例，默认是单例，可以修改成 prototype 模式，而不是singleton模式
 - @ComponentScan，用来指定spring di容器要扫描的包【含子包】，它会加载指定包下面所有打上了@Component注解的类型
 - @Autowire, 自动注入，spring的di容器会根据name,type等方式来查询相关的对象，并自动注入需要的类之中
 - @Qualifier, 用来限定注入查询的对象名称
 - @Bean,这个注解用来修饰方法，把这个方法的返回类型纳入到spring di容器的管理之中，并且方法名就是这个bean的id值。
 - @Configuration，用来表明本类是一个注解配置类，意味着可以通过注解上下文的方式来加载和解析
 - @Import, 可以用来导入另一个@Configuration 注解过的类型，这样就可以做到像xml一样，可以分多个文件进行分门别类地进行配置.
 - ...