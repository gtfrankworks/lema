---
title: MyBatis框架基础知识
keywords: mybatis, log, java, github
description: 学习 mybatis的基础,通过本入门教程,可以使用mybatis框架做最基本的数据库记录的CRUD操作
comments: true
createTime: 2025/08/08 17:05:15
permalink: /framework/mybatis/my1mjq22/
toc: true
tocDepth: 4
---

# MyBatis Framework 

> **简介：**   
> [MyBatis](http://www.mybatis.org/mybatis-3/getting-started.html) 框架是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录

本系列笔记可能会遇到的专业词汇有：
  - Framework, 框架，某一类问题的总体解决方案
  - ORM, `Object Relationship Mapping`, 对象关系映射
  - DATABASE, 数据库，存储数据的一种方式
  - Mapper, `是一种mybatis做持久层的称谓`, 相当于DAO层，所不同的是Mapper只需要提供接口和对应的xml文件，无需实现
  - SqlSession, myBatis会话, 一般做为局部变量进行操作
  - SqlSessionFactory, SqlSession的工厂，用来创建SqlSession实例

本系列笔记包含如下的课程内容：
* <span style='color:red'>myBatis入门教程和日志配置</span>
* myBatis框架配置文件和映射文件
	- 配置文件详解
	- xml映射文件详解
	- 注解映射详解
* 关联映射和动态SQL机制
* 缓存机制和API分析
	- 一级缓存
	- 二级缓存
	- 核心API分析
* myBatis+Spring 整合
* Spring+MyBatis+SpringMVC 整合

************************

<!-- more -->

## MyBatis入门教程和日志配置

解决的问题：
	完成持久层的实现，把原来JDBC完成的工作通过mybatis框架完成，这就涉及到连接的建立、语句的执行、参数的设定、结果集的处理以及资源的释放等工作，如何高效地、简便地完成这些工作，就是mybatis要做的事件。

### 准备工作

* 选择合适的IDE，如：Eclipse或IDEA IntelliJ
* 创建项目【如果是基于maven的话，则创建maven项目】

注：
最好是把mybatis-xyz.zip 压缩包下载下来，里面有jar包，也有文档，可以做为参考。

#### Eclipse配置DTD
* 对于Eclipse的使用者，为了方便进行以后的开发再不使用任何插件的前提下，你可能需要做如下配置.
* 以添加mybatis-3-mapper.dtd为例:
1. 打开Windows->Preferences选项
2. 搜索XML Catalog点击右边面板的Add按钮, 如下图

![alt text](/images/mybatis/configdtd.png)

其中Location选项后面为本地Mybatis的dtd存放路径，
**mybatis-3-config.dtd需要配置的Public ID以及Alternative web address为**

```dtd
Public ID:    -//mybatis.org//DTD Config 3.0//EN 
Alternative Address:    http://mybatis.org/dtd/mybatis-3-config.dtd
```

**mybatis-3-mapper.dtd需要配置的Public ID以及Alternative web address为**

```dtd
Public ID:    -//mybatis.org//DTD Mapper 3.0//EN
Alternative Address:    http://mybatis.org/dtd/mybatis-3-mapper.dtd
```

### 开发步骤

一、基于maven或gradle 环境 【本文章基于 Eclipse 开发环境】

1. 在IDE中，导入或创建一个新的 maven 项目【由于此处不是讲解maven,故不做多介绍】
2. 由于Eclipse中默认没有mybatis的插件，所以，它不能识别和验证mybatis的dtd文件，并用它来规范我们所写的xml文件，所以，我们事先要手动在Eclipse中配置 mybatis框架的dtd 文件，步骤请见上面
3. 在项目的 pom.xml 文件中，添加对 mybatis的依赖，如下：

~~~xml
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis</artifactId>
	<version>3.4.5</version>
</dependency>
<!-- 目标数据库的驱动 -->
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<version>5.1.40</version>
</dependency>
<!-- 单元测试的依赖 -->
<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>4.12</version>
	<scope>test</scope>
</dependency>
~~~

4. 新建mybatis的配置文件，此文件是xml格式，请基于我们上面所配置的dtd来创建, 可以存放在 src/ 源文件夹下, 此文件的大致内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd" >
<configuration>
	<!-- 配置全局可以引用的属性值 -->
	<properties> 
		<!-- mysql database connection properties -->
		<property name="mysql_driver" value="com.mysql.jdbc.Driver"/> 
		<property name="mysql_url" 
			value="jdbc:mysql://localhost:3306/mybatisdb?useUnicode=true&amp;characterEncoding=utf-8"/> 
		<property name="mysql_user" value="root"/> 
		<property name="mysql_pwd" value="root"/> 
	</properties>
	<!-- 全局设置 -->
	<settings>
		<!-- 不依赖任何日志组件，直接在终端打印输出 -->
		<!-- <setting name="logImpl" value="STDOUT_LOGGING"/> -->
		<setting name="logImpl" value="LOG4J" />
		<!-- 针对oracle数据库操作 ，插入不能有null的值的情况, mysql无此问题  -->
		<setting name="jdbcTypeForNull" value="NULL" />
	</settings>
	<!-- 配置别名 -->
	<typeAliases>
		<package name="com.mybatis.entity" />
		<package name="com.mybatis.mapper.vo" />
	</typeAliases>
	<!-- 连接目标数据库的环境 -->
	<environments default="development">
		<environment id="development">
			<!-- 指定事务类型 -->
			<transactionManager type="JDBC" />
			<!-- 指定连接目标数据库的连接池中的属性 -->
			<!-- <dataSource type="UNPOOLED"> -->
			<dataSource type="POOLED">
				<property name="driver" value="${mysql_driver}" />
				<property name="url" value="${mysql_url}" />
				<!-- 从MyBatis 3.4.2开始，你可以为占位符指定一个默认值 -->
				<property name="username" value="${mysql_user:lema}" />
				<property name="password" value="${mysql_pwd}" />
			</dataSource>
		</environment>
	</environments>
	<!-- 添加映射 -->
	<mappers>
		<mapper resource="com/mybatis/mapper/UserMapper.xml"/> 
		<!-- 直接扫描包: 这种不适合自己编写 DAO实现类的情况，必需采用mybatis一系列的约定. -->
		<!-- <package name="com.mybatis.mapper" /> -->
	</mappers>
</configuration>
```

5. 创建实体类，如下： 

```java
package com.mybatis.entity;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author lema
 *
 */
public class User implements Serializable {
	private static final long serialVersionUID = -8172596161276148772L;
	private Integer id;
	private String name;
	private String email;
	private Double height;
	private Date birth;
	// 构造、getter/setter、toString、hashCode和equals 方法省略...
}
```

注：不像hibernate框架，mybatis不会帮助我们自动创建表结构，所以，我们需要根据实体类自己创建一张表结构，如下：

** mysql 数据库的建表语句 **
```sql
create table t_user(
	id integer primary key,
	name varchar(128),
	email varchar(128),
	height float,
	birth date
)
```

6. 创建Dao接口，也叫 Mapper 接口，如下：

```java
package com.mybatis.mapper;

import java.io.Serializable;
import com.mybatis.entity.User;

/**
 * @author lema
 * 使用mybatis框架来实现 的DAO, 有两种方式：
 * 1. 使用mybatis框架自带的动态代理，即无需我们去开发DAO的实现类，只要写 XXXMapper接口，并提供XXXMaper.xml映射文件即可
 * Mapper接口开发需要遵循以下规范：
　　（1）、 Mapper.xml文件中的namespace与mapper接口的类路径相同。
　　（2）、 Mapper接口方法名和Mapper.xml中定义的每个statement的id相同 。
　　（3）、 Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同。
　　（4）、 Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同
 * 
 * 2. 传统的DAO接口和实现类开发，自己写DAO的实现类。【不推荐】
 * 本案例采用第1种方式。【也就是无需开发 接口的实现类】
 */
public interface UserMapper {

	User findById(Serializable id1);
	
	void save(User u);
	
	List<User> findAll();
	
	void delete(Serializable id);
	
	List<User> findByName(String name);

	void update(User u);
}
```

7. 编写映射的xml文件，按照约定，文件名与接口名同名,内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.mapper.UserMapper">
	
	<select id="findById" resultType="User" parameterType="int">
		select id as id,  
			name as name,
			birth as birth,
			height as height,
			email as email
			from t_user
			where id = #{id}
	</select>
	
	<select id="findByName" resultType="User" parameterType="string">
		select id as id,
			name as name,
			birth as birth,
			height as height,
			email as email 
		from t_user 
		where name like #{name}
	</select>
	
	<select id="findAll" resultType="User">
		select * from t_user
	</select>
	
	<delete id="delete">
		delete from t_user where id = #{id}
	</delete>
	
	<insert id="save" parameterType="User">
		<!-- 获取自动产生的主键值 -->
		<selectKey resultType="int" keyColumn="id" keyProperty="id" order="AFTER">
			select LAST_INSERT_ID();
			<!-- 如果是oracle的话，则可以通过序列来生成： select sequence_name.nextval from dual -->
		</selectKey>
		<!-- 插入数据的sql -->
		insert into t_user(name,birth,height,email) values(#{name},#{birth},#{height},#{email})
	</insert>

	<update id="update" parameterType="User">
		update t_user as u 
			set u.name = #{name},
			u.email = #{email},
			u.birth = #{birth},
			u.height = #{height}
			where u.id = #{id}
	</update>
</mapper>
```

8. 利用mybatis的API编写代码来调用 dao接口中的方法.

```java
public class UserMapperTest {

    private UserMapper userMapper;
    private SqlSession sqlSession;

    @Before
    public void setUp() throws Exception {
        final InputStream in = Resources.getResourceAsStream("mybatis-config.xml");
        //0. 构建 SqlSessionFactory
        final SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        //1.
        sqlSession = factory.openSession();
        userMapper = sqlSession.getMapper(UserMapper.class);
        System.out.println("test 之前");
    }

	@Test
	public void testFindById() {
		final User user = this.userMapper.findById(3);
        System.out.println(user);
	}

	//其它的方法测度类似...
	// ....
}
```

二、非maven环境
与使用maven导入依赖不同，它需要我们自己添加相关的jar文件，如下：

- 下载mybatis-xyz.jar 包，xyz 代表版本号，此处我们使用3.4.5版本
- 下载目标数据库驱动jar包，如：mysql-connector-java-5.1.40.jar

然后，把以上2个jar包COPY到项目的lib文件夹下【如果没有lib，则创建一个】,并右击两个jar文件，添加到 buildpath中。

之后的步骤就与上面的步骤一模一样，当然，如果要做单元测试，同样需要手动加入junit相关的jar包。

### 测试
- 导入 junit 相关的jar包后，就可以进行单元测试，做如下处理
	* 新建一个 UserMapperTest 类
	* 通过mybatis的 Api 分别创建 SqlSessionFactory和SqlSession对象
	* 断言结果是否正确
- 参考代码：
	* 详见上面第8步

### 封装SqlSession的创建代码
由于每个测试方法中都要读取 mybatis-config.xml文件，然后，构建 SqlSessionFactory实例，再创建SqlSession对象，最后才是通过 SqlSession 进行相关方法的调用，所以，我们完全可以封装一个工具类:SqlSessionFactoryUtil，利用单例模式来保证一个应用中只创建一次SqlSessionFactory实例，代码发下：

```java
package com.mybatis.util;

import java.io.IOException;
import java.io.Reader;
import java.util.concurrent.locks.ReentrantLock;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * @author lema
 *
 * 封装mybatis框架中 sessionFactory的创建以及SqlSession的获取,
 * 为保证每个应用中只有一个 SqlSessionFactory实例，本类采用单例 模式
 */
public class SqlSessionFactoryUtil {

	private static SqlSessionFactory factory;
	
	/** 做线程同步的锁机制 */
	private final static ReentrantLock lock = new ReentrantLock();
	
	private static final String _CONFIG = "mybatis-config.xml";
	
	//私有化构造
	private SqlSessionFactoryUtil() {
		
	}
	
	/************
	 * 初始化 SqlSessionFactory实例
	 */
	private static void initSqlSessionFactory() {
		//
		if(factory == null) {
			//获取配置
			try(Reader reader = Resources.getResourceAsReader(_CONFIG);) {
				//加锁
				lock.lock();
				if(factory == null) { //再次判断，以保证单例
					//保证只有单线程进入
					factory = new SqlSessionFactoryBuilder().build(reader);
				}
				//
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				//解锁
				lock.unlock();
			}
		}
	}
	
	//
	public static SqlSession getSession() {
		//
		if(factory == null) {
			initSqlSessionFactory();
		}
		//
		return factory.openSession();
	}
	
	public static SqlSession getSession(ExecutorType type) {
		//
		if(factory == null) {
			initSqlSessionFactory();
		}
		//
		return factory.openSession(type);
	}
	
	//
	public static SqlSessionFactory getSqlSessionFactory() {
		if(factory == null) {
			initSqlSessionFactory();
		}
		//
		return factory;
	}
}

```
这样一来，我们就可以在测试代码中，通过这个工具类来获取 SqlSessionFactory或是直接获取 SqlSession，由于此工具类是单例的，所以，可以保证SqlSessionFactory实例在应用生命周期内只会实例化一次。

## 日志配置

日志的目的是记录框架内部的运行过程以及我们所写的代码的运行过程
Mybatis内置的日志工厂提供日志功能，具体的日志实现有以下几种工具： 

* SLF4J [Simple Log Facade for Java]
* Apache Commons Logging 
* Log4j 2 
* Log4j 
* JDK logging 

具体选择哪个日志实现工具由MyBatis的内置日志工厂确定。

>它会使用最先找到的（按上文列举的顺序查找）。 如果一个都未找到，日志功能就会被禁用。 
>不少应用服务器的classpath中已经包含Commons Logging，如Tomcat和WebShpere，所以MyBatis会把它作为具体的日志实现。记住这点非常重要。这将意味着，在诸如WebSphere的环境中——WebSphere提供了Commons Logging的私有实现，你的Log4J配置将被忽略。 这种做法不免让人悲催，MyBatis怎么能忽略你的配置呢？事实上，因Commons Logging已经存 在了，按照优先级顺序，Log4J自然就被忽略了！不过，如果你的应用部署在一个包含Commons Logging的环境， 而你又想用其他的日志框架，你可以通过在MyBatis的配置文件mybatis-config.xml里面添加一项setting（配置）来选择一个不同的日志实现。 

~~~
<configuration>
  <settings>
    ...
    <setting name="logImpl" value="LOG4J"/>
    ...
  </settings>
</configuration>
~~~

logImpl可选的值有：SLF4J、LOG4J、LOG4J2、JDK_LOGGING、COMMONS_LOGGING、STDOUT_LOGGING、NO_LOGGING 

或者是实现了接口org.apache.ibatis.logging.Log的类的完全限定类名， 并且这个类的构造函数需要是以一个字符串（String类型）为参数的。

##Logging Configuration

MyBatis可以对包、类、命名空间和全限定的语句记录日志。 
具体怎么做，视使用的日志框架而定，这里以Log4J 和 Log4j2 分别配置来讲解。 

### 使用Log4j + SLF4J 组合，【这里的log4j是 1.2.17版本】

1. 步骤一: 添加 slf4j-log4j12 的 依赖 
   如果是maven工程,则在pom.xml中配置
	~~~xml
	<!-- 如果是使用 slf4j-log4j12 的依赖，则下面的依赖可以不写，因为slf4j-log4j12中会依赖于此
	<dependency>
		<groupId>log4j</groupId>
		<artifactId>log4j</artifactId>
		<version>1.2.17</version>
	</dependency>
	-->
	 <dependency>
		<groupId>org.slf4j</groupId>
		<artifactId>slf4j-log4j12</artifactId>
		<version>1.7.30</version>
	</dependency> 
	~~~
2. 步骤二:配置Log4J 
    配置Log4J比较简单，比如需要记录这个mapper接口的日志
    只要在应用的classpath中创建一个名称为log4j.properties的文件， 文件的具体内容如下：   
	
	~~~properties
	### 设置Logger输出级别和输出目的地 ###
	#log4j.rootLogger=debug,stdout,logfile
	log4j.rootLogger=ERROR,stdout
	### 把日志信息输出到控制台 ###
	log4j.appender.stdout=org.apache.log4j.ConsoleAppender
	log4j.appender.stdout.Target=System.err
	log4j.appender.stdout.layout=org.apache.log4j.SimpleLayout

	### 把日志信息输出到文件：jbit.log ###
	#log4j.appender.logfile=org.apache.log4j.FileAppender
	#log4j.appender.logfile.File=jbit.log
	#log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
	#log4j.appender.logfile.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %F %p %m%n

	#显示SQL语句部分
	log4j.logger.com.mybatis.mapper.UserMapper=TRACE
	~~~

添加以上配置后，Log4J就会把 com.mybatis.mapper.UserMapper 的详细执行日志记录下来，对于应用中的其它类则仅仅记录错误信息。 
也可以将日志从整个mapper接口级别调整到到语句级别，从而实现更细粒度的控制。如下配置只记录 findUserById 语句的日志： 

~~~
log4j.logger.com.mybatis.mapper.UserMapper.findById=TRACE
~~~

与此相对，可以对一组mapper接口记录日志，只要对mapper接口所在的包开启日志功能即可：
~~~
log4j.logger.com.mybatis.mapper=TRACE
~~~

某些查询可能会返回大量的数据，只想记录其执行的SQL语句该怎么办？为此，Mybatis中SQL语 句的日志级别被设为DEBUG（JDK Logging中为FINE），结果日志的级别为TRACE（JDK Logging中为FINER)。所以，只要将日志级别调整为DEBUG即可达到目的： 

~~~
log4j.logger.com.mybatis.mapper=DEBUG
~~~

要记录日志的是类似下面的mapper文件而不是mapper接口又该怎么呢？ 

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="test">
	<select id="findById" parameterType="int" resultType="com.mybatis.entity.User">
		select * from t_user where id=#{id}
	</select>
</mapper>
~~~

对这个文件记录日志，只要对命名空间增加日志记录功能即可：
~~~
log4j.logger.test=TRACE
~~~

进一步，要记录具体语句的日志可以这样做： 
~~~
log4j.logger.test.findById=TRACE
~~~

看到了吧，两种配置没差别！ 

配置文件log4j.properties的余下内容是针对日志格式的，这一内容已经超出本 文档范围。

关于Log4J的更多内容，可以参考Log4J的网站。不过，可以简单试一下看看，不同的配置 会产生什么不一样的效果。 

### 使用log4j2 + slf4j 组合，【这里的log4j采用2.12.1】

1. 步骤一: 添加 `log4j-slf4j-impl` 的 依赖 
   如果是maven工程,则在pom.xml中配置
	~~~xml
	<!-- 如果要使用 slf4j 来与 log4j2 集成，则需要导入如下的包 -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-slf4j-impl</artifactId>
        <version>2.12.1</version>
        <scope>test</scope>
    </dependency>
	<!-- log4j2 的依赖，会自动依赖 log4j-api, 另外，这个需要 log4j2.xml 配置文件在 resources 目录下 -->
        <!--<dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.12.1</version>
        </dependency>-->
	~~~
2. 步骤二:配置 log4j2.xml 文件，注：log4j2使用log4j2.xml做为配置文件 
    
~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!--mybatis  打印sql语句信息-->
<Configuration status="INFO" monitorInterval="1800">
    <appenders>
        <Console name="consolePrint" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n" />
        </Console>
    </appenders>

    <loggers>
        <!-- 将dao接口填写进去-->
        <logger name="com.pxxy" level="DEBUG" additivity="false">
            <appender-ref ref="consolePrint"/>
        </logger>

        <logger name="org.apache.ibatis" level="debug" additivity="false">
            <appender-ref ref="consolePrint"/>
        </logger>

        <logger name="org.mybatis.caches" level="debug" additivity="false">
            <appender-ref ref="consolePrint"/>
        </logger>

        <root level="info">
            <appender-ref ref="consolePrint" />
        </root>
    </loggers>
</Configuration>
~~~


#### 日志级别
>log4j定义了8个级别的log（除去OFF和ALL，可以说分为6个级别），
>优先级从高到低依次为：OFF、FATAL、ERROR、WARN、INFO、DEBUG、TRACE、 ALL。
1. ALL 最低等级的，用于打开所有日志记录。
2. TRACE designates finer-grained informational events than the DEBUG.Since:1.2.12，很低的日志级别，一般不会使用。
3. DEBUG 指出细粒度信息事件对调试应用程序是非常有帮助的，主要用于开发过程中打印一些运行信息。
4. INFO 消息在粗粒度级别上突出强调应用程序的运行过程。打印一些你感兴趣的或者重要的信息，
    这个可以用于生产环境中输出程序运行的一些重要信息，但是不能滥用，避免打印过多的日志。
5. WARN 表明会出现潜在错误的情形，有些信息不是错误信息，但是也要给程序员的一些提示。
6. ERROR 指出虽然发生错误事件，但仍然不影响系统的继续运行。打印错误和异常信息，
    如果不想输出太多的日志，可以使用这个级别。
7. FATAL 指出每个严重的错误事件将会导致应用程序的退出。这个级别比较高了。重大错误，
    这种级别你可以直接停止程序了。
8. OFF 最高等级的，用于关闭所有日志记录。

>如果将log level设置在某一个级别上，那么比此级别优先级高的log都能打印出来。
>例如，如果设置优先级为WARN，那么OFF、FATAL、ERROR、WARN 4个级别的log能正常输出，
>而INFO、DEBUG、TRACE、 ALL级别的log则会被忽略。
>Log4j建议只使用四个级别，优先级从高到低分别是ERROR[默认]、WARN、INFO、DEBUG。

## mysql的时间戳类型中存在的时区问题
> 在mysql中，如果列的类型设定为`timestamp`的话，则它的时间是与时区相关的，默认情况下，我们插入到表记录中的时间戳会被减去8小时，当我们在JAVA中查询出来后，自动又会加上8小时，虽然我们在JAVA在看到的时间是一致的，但是，如果我们去查询表结构中的数据，则会看到`timestamp`列的值会减小8小时，这显然不是我们需要的，可以通过修改连接的url来修复此问题，如下：
```properties
#数据库地址
url=jdbc:mysql://127.0.0.1:3306/demo?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8&useSSL=false
```
> 可以看出，把 serverTimeZone的值改为 `GMT%2B8` 即可！
