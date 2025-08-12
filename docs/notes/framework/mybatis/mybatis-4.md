---
title: MyBatis缓存机制
createTime: 2025/08/11 10:32:05
permalink: /framework/mybatis/d22gdnuh/
---
# mybatis缓存机制

什么是查询缓存

1. mybatis提供查询缓存，用于减轻数据压力，提高数据库性能。
2. mybaits提供一级缓存，和二级缓存。

如图：
![alt text](/images/mybatis/cache01.png)

1. 一级缓存是SqlSession级别的缓存。在操作数据库时需要构造 sqlSession对象，在对象中有一个数据结构（HashMap）用于存储缓存数据。不同的sqlSession之间的缓存数据区域（HashMap）是互相不影响的。
2. 二级缓存是mapper级别的缓存，多个SqlSession去操作同一个Mapper的sql语句，多个SqlSession可以共用二级缓存，二级缓存是跨SqlSession的。
3. 为什么要用缓存？
   如果缓存中有数据就不用从数据库中获取，大大提高系统性能。

## 一级缓存

> 默认情况下，mybatis是开启一级缓存的
> 如图：
> ![alt text](/images/mybatis/cache02.png)

1. 第一次发起查询用户id为1的用户信息，先去找缓存中是否有id为1的用户信息，如果没有，从数据库查询用户信息。得到用户信息，将用户信息存储到一级缓存中。

2. 如果sqlSession去执行commit操作（执行插入、更新、删除），清空SqlSession中的一级缓存，这样做的目的为了让缓存中存储的是最新的信息，避免脏读。

3. 第二次发起查询用户id为1的用户信息，先去找缓存中是否有id为1的用户信息，如缓存中有，直接从缓存中获取用户信息。

### 一级缓存测试

按照上边一级缓存原理步骤去测试。

~~~java
/**
 * 一级缓存测试
 * @throws Exception 
 */
@Test
public void testFirstCache() throws Exception {
	SqlSession sqlSession = MyBatisUtil.getSqlSession();
	UserMapper mapper = sqlSession.getMapper(UserMapper.class);
	
	//第一次发起请求,查询id为10的用户
	User u1 = mapper.findUserById(10);
	System.out.println(u1);
	
	//如果sqlSession去执行commit操作(执行插入,更新,清除),清空sqlSession的一级缓存
	//这样做的目的是为了让缓存总能存储的是最新的信息,避免脏读.
	//sqlSession.clearCache();//清空一级缓存
	
	//第二次发起请求,查询id为10的用户.如果之前没有commit操作,或者clearCache()操作,此处将不会发出sql
	User u2 = mapper.findUserById(10);
	System.out.println(u2);
	//关闭sqlSession对象
	sqlSession.close();
}
~~~

### 一级缓存应用

> 默认开启一级缓存是有好处的，可以大大减少与DB的交互

~~~java
正式开发，是将mybatis和spring进行整合开发，事务控制在service中。一个service方法中包括很多mapper方法调用。

service{
	//开始执行时，开启事务，创建SqlSession对象
	//第一次调用mapper的方法findUserById(1)
	
	//第二次调用mapper的方法findUserById(1)，从一级缓存中取数据
	//方法结束，sqlSession关闭
}

如果是执行两次service调用查询相同 的用户信息，不走一级缓存，因为session方法结束，sqlSession就关闭，一级缓存就清空。
~~~

## 二级缓存

> 原理图示 【默认情况下，二级缓存是关闭的】
> ![alt text](/images/mybatis/twocache.png)

> 文字说明：  
> 首先开启mybatis的二级缓存。  

- sqlSession1去查询用户id为1的用户信息，查询到用户信息会将查询数据存储到二级缓存中。
- 如果SqlSession3去执行相同 mapper下sql，执行commit提交，清空该 mapper下的二级缓存区域的数据。
- sqlSession2去查询用户id为1的用户信息，去缓存中找是否存在数据，如果存在直接从缓存中取出数据。

> 二级缓存与一级缓存区别:
>
> - 二级缓存的范围更大，多个sqlSession可以共享一个UserMapper的二级缓存区域。

> 注：

 * UserMapper有一个二级缓存区域（按namespace分） ，其它mapper也有自己的二级缓存区域（按namespace分）。每一个namespace的mapper都有一个二缓存区域，两个mapper的namespace如果相同，这两个mapper执行sql查询到数据将存在相同 的二级缓存区域中。

### 开启二级缓存

> mybaits的二级缓存是mapper范围级别，除了在mybatis-config.xml设置二级缓存的总开关，还要在具体的mapper.xml中开启二级缓存。

步骤：

1. 在核心配置文件mybatis-config.xml中加入

~~~xml
 <!-- 在mybatis中二级缓存默认是关闭的,这里需要开启。-->
<setting name="cacheEnabled" value="true"/> 
~~~

2. 在UserMapper.xml中开启二缓存，UserMapper.xml下的sql执行完成会存储到它的缓存区域（HashMap）。

~~~xml
<!-- 开启本mpper的namespace下的二级缓存
     type:指定cache接口的实现类的类型,mybatis默认使用PerpetualCache
	 要和ehcache或redis整合,需要设置type成ehcache实现cache接口的实现类.
 -->
<cache/>
~~~

> 注：mybatis框架内部使用的二级缓存是 PertualCache, 我们可以进行如下的配置：

~~~xml
<cache
        eviction="FIFO"
        size="512"
        readOnly="true"
        flushInterval="600000"
/>
~~~

> 以上属性的说明，请参考下图
> ![alt text](/images/mybatis/second-cache.png)

### pojo类实现序列化接口

~~~java
//实现可序列化接口
public class User implements Serializable {
	private static final long serialVersionUID = -64427697254485564L;
	private int id;
	private String username;// 用户姓名
	private String sex;// 性别
	private Date birthday;// 生日
	private String address;// 地址
	
	//为了实现多对多功能,需要添加此属性
	private List<Orders> orders;
}
~~~

为了将缓存数据取出执行反序列化操作，因为二级缓存数据存储介质多种多样，不一定在内存。

### 二级缓存测试代码

~~~java
// 二级缓存测试
@Test
public void testCache2() throws Exception {
	SqlSession sqlSession1 = sqlSessionFactory.openSession();
	SqlSession sqlSession2 = sqlSessionFactory.openSession();
	SqlSession sqlSession3 = sqlSessionFactory.openSession();
	// 创建代理对象
	UserMapper userMapper1 = sqlSession1.getMapper(UserMapper.class);
	// 第一次发起请求，查询id为1的用户
	User user1 = userMapper1.findUserById(1);
	System.out.println(user1);
	
	//这里执行关闭操作，将sqlsession中的数据写到二级缓存区域
	sqlSession1.close();
	
	//使用sqlSession3执行commit()操作
	UserMapper userMapper3 = sqlSession3.getMapper(UserMapper.class);
	User user  = userMapper3.findUserById(1);
	user.setUsername("管成功");
	userMapper3.updateUser(user);
	//执行提交，清空UserMapper下边的二级缓存
	sqlSession3.commit();
	sqlSession3.close();
	
	UserMapper userMapper2 = sqlSession2.getMapper(UserMapper.class);
	// 第二次发起请求，查询id为1的用户
	User user2 = userMapper2.findUserById(1);
	System.out.println(user2);

	sqlSession2.close();
}
~~~

### useCache属性配置

> 在select元素中，使用useCache属性可以控制当前的查询是否要使用二级缓存.

在statement中设置useCache=false可以禁用当前select语句的二级缓存，即每次查询都会发出sql去查询，默认情况是true，即该sql使用二级缓存。

~~~xml
<!-- 控制useCache属性 -->
<select id="findOrderListResultMap" resultMap="ordersUserMap" useCache="false">
~~~

如果要针对每次查询都需要最新的数据sql，要设置成useCache=false，禁用二级缓存即可.

### 二级缓存供应商ehCache

> ehcache是一个支持分布式的缓存框架

![alt text](/images/mybatis/ecache.png)

> 不使用分布缓存，缓存的数据在各各服务单独存储，不方便系统开发。所以要使用分布式缓存对缓存数据进行集中管理。
> mybatis无法实现分布式缓存，需要和其它分布式缓存框架进行整合。

### mybatis整合ehcache

> mybatis提供了一个cache接口，如果要实现自己的缓存逻辑，实现cache接口开发即可。

1. 加入mybatis-ehcache 依赖

~~~xml
 <dependency>
	<groupId>org.mybatis.caches</groupId>
	<artifactId>mybatis-ehcache</artifactId>
	<version>1.1.0</version>
</dependency>
~~~

2. 配置mapper中cache中的type为ehcache对cache接口的实现类型。

~~~xml
<!-- 开启本mpper的namespace下的二级缓存
     type:指定cache接口的实现类的类型,mybatis默认使用PerpetualCache
	     要和ehcache整合,需要设置type我ehcache实现cache接口的实现类.
 -->
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
~~~

3. 加入ehcache的配置文件ehcache.xml

~~~xml
<defaultCache
    maxElementsInMemory="1"
    eternal="false"
    timeToIdleSeconds="120"
    timeToLiveSeconds="120"
    overflowToDisk="true"
/>
~~~

有关这个文件中的属性的详细配置，可以参考[ehcache](http://www.ehcache.org/)的官方文档.

> 小结：  
> 二级缓存是在namespace上进行隔离的，而我们在做mapper.xml时，每个文件的命名空间都是不一样的，同时，同样的实体类，有可能出现在多个不同的命名空间上，这样一来，就有可能造成两个命名空间上的缓存数据不一致，这是很致命的。  
> 所以，大多数时候，我个人不建议使用mybatis的二级缓存。

## mybatis核心API讲解

> 为了更好地理解mybatis框架，我们再此对几个核心类的关系和内部细节做一下分析。

### 类图

首先来看一下核心类的类图
![mybatis核心类图](/images/mybatis/mybatis-Api.png)

### 详细API分析

从上面可以看出，整个mybatis框架的核心API并不多，主要有以下几个类和接口

- SqlSessionFactoryBuilder   
  此类是mybatis框架构建SqlSessionFactory的入口，它的主要任务就是处理配置文件和映射文件的解析[调用其它的API]，并全部通过Configuration类存储整个信息，最后返回Configuration对象做为内置build方法的参数
  下面是代码片断：

  ```java
  	public SqlSessionFactory build(InputStream inputStream, String environment, Properties properties) {
  	    try {
  	      XMLConfigBuilder parser = new XMLConfigBuilder(inputStream, environment, properties);
  	      //parser.parse() 方法返回的就是 Configuration 实例
  	      return build(parser.parse());
  	    } catch (Exception e) {
  	      throw ExceptionFactory.wrapException("Error building SqlSession.", e);
  	    } finally {
  	      ErrorContext.instance().reset();
  	      try {
  	        inputStream.close();
  	      } catch (IOException e) {
  	        // Intentionally ignore. Prefer previous error.
  	      }
  	    }
  	  }
  	//以configuration为参数
  	public SqlSessionFactory build(Configuration config) {
  	   return new DefaultSqlSessionFactory(config);
  	}
  ```

- Configuration
  此类本质上是配置信息的"内存版"，因为我们从上面得知，我们所写的mybatis-config.xml和mapper.xml文件，经过解析后，全部都会由Configuration实例存储，所以，我们同样可以通过hardcode的方式来得到Configuration对象，同它的类名一样，它就是代表 `配置`

- SqlSessionFactory
  此接口是mybatis框架中的重要接口，一般而言，一个应用程序只应该创建一个此类实例，因为创建它的代码是巨大的，应该给所有调用者共享，所以，我们的代码中，要保证此类的实例是唯一的，一般采用单例模式来实例化它
  上面的代码断片中也可以看出，此接口的实现者是：DefaultSqlSessionFactory

- TransactionIsolationLevel
  此枚举是一个事务隔离级别的枚举，它本质上就是JDBC中Connection定义的5个常量的全新封装，因为在Connection定义的隔离级别是整数常量，是类型不安全的，mybatis把它封装成枚举的做法是值是肯定的，避免了类型不安全，下面给出此枚举的源代码：

  ```java
  	public enum TransactionIsolationLevel {
  	  NONE(Connection.TRANSACTION_NONE),
  	  READ_COMMITTED(Connection.TRANSACTION_READ_COMMITTED),
  	  READ_UNCOMMITTED(Connection.TRANSACTION_READ_UNCOMMITTED),
  	  REPEATABLE_READ(Connection.TRANSACTION_REPEATABLE_READ),
  	  SERIALIZABLE(Connection.TRANSACTION_SERIALIZABLE);
  
  	  private final int level;
  
  	  private TransactionIsolationLevel(int level) {
  	    this.level = level;
  	  }
  
  	  public int getLevel() {
  	    return level;
  	  }
  	}
  ```

- SqlSession
  此接口是我们操作的入口，所有的CRUD操作都是由此接口负责完成，当然，此接口也可以用来获取Dao或Mapper接口实例，当然，拿到的是接口的动态代码实现，因为我们并没有开发Mapper或Dao接口的实现类，不是吗？
  它的方法在类图中都已列出，此处不再罗列。

  从源码中得知，此接口的实现类：DefaultSqlSession

  `DefaultSqlSessionFactory.java`中

  ```java
  	public SqlSession openSession() {
  	   return openSessionFromDataSource(configuration.getDefaultExecutorType(), null, false);
  	}
  
  	public SqlSession openSession(boolean autoCommit) {
  	   return openSessionFromDataSource(configuration.getDefaultExecutorType(), null, autoCommit);
  	}
  
  	public SqlSession openSession(ExecutorType execType) {
  	   return openSessionFromDataSource(execType, null, false);
  	}
  
  	private SqlSession openSessionFromDataSource(ExecutorType execType, 
  				TransactionIsolationLevel level, boolean autoCommit) {
  	    Transaction tx = null;
  	    try {
  	      final Environment environment = configuration.getEnvironment();
  	      final TransactionFactory transactionFactory = getTransactionFactoryFromEnvironment(environment);
  	      tx = transactionFactory.newTransaction(environment.getDataSource(), level, autoCommit);
  	      final Executor executor = configuration.newExecutor(tx, execType);
  	      return new DefaultSqlSession(configuration, executor, autoCommit);
  	    } catch (Exception e) {
  	      closeTransaction(tx); // may have fetched a connection so lets call close()
  	      throw ExceptionFactory.wrapException("Error opening session.  Cause: " + e, e);
  	    } finally {
  	      ErrorContext.instance().reset();
  	    }
  	}
  ```

  `DefaultSqlSession.java`中

  ```java
  	public class DefaultSqlSession implements SqlSession {
  
  	  private Configuration configuration;
  	  private Executor executor;
  
  	  private boolean autoCommit;
  	  private boolean dirty;
  	  
  	  public DefaultSqlSession(Configuration configuration, Executor executor, boolean autoCommit) {
  	    this.configuration = configuration;
  	    this.executor = executor;
  	    this.dirty = false;
  	    this.autoCommit = autoCommit;
  	  }
  
  	  public DefaultSqlSession(Configuration configuration, Executor executor) {
  	    this(configuration, executor, false);
  	  }
  
  	  public <T> T selectOne(String statement) {
  	    return this.<T>selectOne(statement, null);
  	  }
  	}
  ```

### 编码流程

```java
//第一步：把配置文件mybatis-config.xml转换成输入流
Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
//第二步：创建SqlSessionFactoryBuilder
SqlSessionFactoryBuilder factoryBuilder = new SqlSessionFactoryBuilder();
//第三步：调用build方法，创建SqlSessionFactory, 以reader为参数
SqlSessionFactory factory = factoryBuilder.build(reader);
//第四步：再通过 SqlSessionFactory来获取SqlSession
SqlSession session = factory.openSession();
```

注：需要注意的是，前3步最后在整个应用中只执行1次， 以保证不重复创建SqlSessionFactory实例， 下面给出一个单例版的工具类：

```java
/**
 * 
 */
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
 * @author yejf
 * 封装mybatis框架中 sessionFactory的创建以及SqlSession的获取,
 * 为保证每个应用中只有一个 SqlSessionFactory实例，本类采用单例 模式
 */
public class SqlSessionFactoryUtil {

	private static SqlSessionFactory factory;
	
	/** 做线程同步的锁机制 */
	private final static ReentrantLock lock = new ReentrantLock();
	
	private static final String _CONFIG = "mybatis-config.xml";
	
	//
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
		return factory.openSession();
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

