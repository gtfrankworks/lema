---
title: MyBatis框架配置
createTime: 2025/08/09 22:58:36
permalink: /framework/mybatis/1owp8nom/
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

* myBatis入门教程和日志配置
* <span style='color:red'>myBatis框架配置文件和映射文件</span>
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

## MyBatis框架配置文件和映射文件

下面针对mybatis的配置文件和映射文件分别做出详细的说明

## 配置文件

默认的文件名：`mybatis-config.xml`, 当然，也可以改做其它的任意名字，通常放在项目的src源文件夹下，也可以存放到不同的目录下。
配置主要分为如下几个部份：

- properties（属性）
- settings（全局配置参数）
- typeAliases（类型别名）
- typeHandlers（类型处理器）
- objectFactory（对象工厂）
- plugins（插件）
- environments（环境集合属性对象）
  - environment（环境子属性对象）
    - transactionManager（事务管理）
    - dataSource（数据源）
- databaseIdProvider 数据库厂商标识
- mappers（映射器）

下面我们针对每一个部份依次分析一下，根据我们开发的需求, 首先要配置的就是 environments, 如下：

### enviornments 元素配置

```xml
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
			<property name="username" value="${mysql_user?:yejf}" />
			<property name="password" value="${mysql_pwd}" />
			<!-- 设置数据库连接的隔离级别 -->
			<!-- <property name="defaultTransactionIsolationLevel " value="READ_COMMITED"/> -->
			<!-- 连接池相关的属性 -->
			<property name="poolMaximumActiveConnections " value="12"/> 
			<property name="poolMaximumIdleConnections" value="3"/> 
			<property name="poolMaximumCheckoutTime" value="10000"/> 
			<property name="poolTimeToWait" value="5000"/>
			<!-- 是否要发送sql去数据库侦测 -->
			<property name="poolPingQuery" value="NO PING QUERY SET"/>
			<property name="poolPingEnabled" value="false"/> 
			<property name="poolPingConnectionsNotUsedFor" value="0"/>
			</dataSource>
	</environment>
</environments>
```

> 大多数时候，我们也不需要配置上面这么多信息，只需要指定连接相关的必要属性就行。  
> mybatis通过 environment 标签可以配置不同的DB连接信息，通过id进行标注，这样可以灵活切换.

### properties元素配置

需求：

> 将数据库连接参数单独配置在db.properties中，只需要在mybatis-config.xml中加载config.properties的属性值。   
> 在mybatis-config.xml中就不需要对数据库连接参数硬编码。

将数据库连接参数只配置在dbconfig.properties中，原因：方便对参数进行统一管理，其它xml可以引用该dbconfig.properties。

步骤：

1. 在classpath路径下创建dbconfig.properties

```properties
# database connection properties configuration
mysql_driver=com.mysql.jdbc.Driver
mysql_url=jdbc:mysql://localhost:3306/mybatisdb?useUnicode=true&characterEncoding=utf-8
mysql_user=root
mysql_pwd=

# oracle config ...
ora_driver=oracle.jdbc.driver.OracleDriver
ora_url=jdbc:oracle:thin:@127.0.0.1:1521:xe
ora_user=jsd1711
ora_pwd=jsd1711
```

2. 在mybatis-config.xml配置,用来加载类路径下的属性文件
   这些属性都是可外部配置且可动态替换的，既可以在典型的 Java 属性文件中配置，亦可通过 properties 元素的子元素来传递。例如：

```xml
<properties resource="dbconfig.properties">
	<!-- 再添加一些额外的属性 -->
	<!-- 元素部分增加如下子元素配置开启该功能 -->
	<property name="org.apache.ibatis.parsing.PropertyParser.enable-default-value"
			value="true" />
	<!-- 修改默认的标识符为?: -->
	<property name="org.apache.ibatis.parsing.PropertyParser.default-value-separator"
			value="?:" />
</properties>
```
3. 配置后，就可以在&lt;environment&gt;中的datasource元素中使用来替换需要动态配置的属性值。比如: 

```xml
<dataSource type="POOLED">
	<!-- 可以通过外部属性文件来动态获取 -->
	<property name="driver" value="${mysql_driver}" />
	<property name="url" value="${mysql_url}" />
	<property name="username" value="${mysql_user}" />
	<property name="password" value="${mysql_pwd}" />
</dataSource>
```

**一般就是推荐使用典型的Java属性文件**
**注意：如果属性在不只一个地方进行了配置，那么 MyBatis 将按照下面的顺序来加载：**
	a. 在 properties 元素体内指定的属性首先被读取。 
	b. 然后根据 properties 元素中的 resource 属性读取类路径下属性文件或根据 url 属性指定的路径读取属性文件，并覆盖已读取的同名属性。 
	c. 最后读取作为方法参数传递的属性，并覆盖已读取的同名属性。 

因此，通过方法参数传递的属性具有最高优先级，resource/url 属性中指定的配置文件次之，最低优先级的是 properties 属性中指定的属性。

从`MyBatis 3.4.2`开始，你可以为占位符指定一个默认值。例如： 

~~~xml
<dataSource type="POOLED">
    <!--...-->
    <property name="username" value="${mysql_user?:jack}" />
</dataSource>
~~~

这个特性默认是关闭的。如果你想为占位符指定一个默认值， 你应该添加一个指定的属性来开启这个特性。例如： 

~~~xml
<properties resource="org/mybatis/example/config.properties">
  <!-- 启用默认值 -->
  <property name="org.apache.ibatis.parsing.PropertyParser.enable-default-value" value="true"/>
</properties>
~~~

你也可以通过增加一个指定的属性来改变分隔键和默认值的字符。例如： 

~~~xml
 <properties resource="dbconfig.properties">
  <!--...-->
  <property name="org.apache.ibatis.parsing.PropertyParser.default-value-separator" value="?:"/> 
</properties>
 <dataSource type="POOLED">
  <!--使用 ?: 来分隔-->
  <property name="username" value="${db:username?:guan}"/>
</dataSource>
~~~

### settings 属性配置

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。
比如：开启二级缓存、开启延迟加载...
下表是从官方文档中截取出来的，描述了设置中各项的意图、默认值等。

![第1部份](/images/mybatis/settings1.png)
![第2部份](/images/mybatis/settings2.png)
![第3部份](/images/mybatis/settings3.png)

一个配置完整的 settings 元素的示例如下：

~~~xml
<!-- 全局设置 -->
<settings>
	<!-- 不依赖任何日志组件，直接在终端打印输出 -->
	<!-- <setting name="logImpl" value="STDOUT_LOGGING"/> -->
	<setting name="logImpl" value="LOG4J" />
	<!-- 针对oracle数据库操作 ，插入不能有null的值的情况, mysql无此问题  -->
	<setting name="jdbcTypeForNull" value="NULL" />
	<!-- 开启二级缓存 -->
	<setting name="cacheEnabled" value="true" />
	<!-- 开启延迟加载 -->
	<setting name="lazyLoadingEnabled" value="true" />
	<!-- 延迟加载后，哪些方法触发去加载被关联的目标对象 -->
	<!-- <setting name="lazyLoadTriggerMethods" value="equals,clone,hashCode,toString" /> -->
	<setting name="lazyLoadTriggerMethods" value="clone" />
	<!-- <3.4.1 时，默认就是 false, 最好是false -->
	<!-- <setting name="aggressiveLazyLoading" value="false"/> -->
	<!-- 以下的设置暂都采用默认值 -->
	<!-- 
	<setting name="multipleResultSetsEnabled" value="true" />
	<setting name="useColumnLabel" value="true" />
	<setting name="useGeneratedKeys" value="false" />
	<setting name="autoMappingBehavior" value="PARTIAL" />
	<setting name="autoMappingUnknownColumnBehavior" value="WARNING" />
	<setting name="defaultExecutorType" value="SIMPLE" />
	<setting name="defaultStatementTimeout" value="25" />
	<setting name="defaultFetchSize" value="100" />
	<setting name="safeRowBoundsEnabled" value="false" />
	<setting name="mapUnderscoreToCamelCase" value="false" />
	<setting name="localCacheScope" value="SESSION" />
	-->
</settings>
~~~

### typeAliases 元素配置

在mapper.xml中，定义很多的statement，statement需要parameterType指定输入参数的类型、需要resultType指定输出结果的映射类型。如果在指定类型时输入类型全路径，不方便进行开发，可以针对parameterType或resultType指定的类型定义一些别名，在mapper.xml中通过别名定义，方便开发。

下图是mybatis框架内置的类型别名，内容涵盖了所有的基本类型、包装类、字符串、日期等常用类型,如下
![内置类型别名](/images/mybatis/typealiases.png)

>作用:

>1. 该元素存在意义仅在于用来减少类完全限定名的冗余，可以针对特定某个类进行别名命名也可以针对某个包下所有类进行别名命名
>2. 针对某个类进行别名命名，例如在之前主配置文件的适当位置加入以下配置

**定义别名的方式有三种**

>* 可以为单个类定义别名

~~~xml
<!--
	type:类型的路径
	alias:类型的别名
	当这样配置时，u可以用在任何使用"com.mybatis.entity.User的地方。
-->
<typeAliases>
  <typeAlias alias="user" type="com.mybatis.entity.User"/>
</typeAliases>
~~~

>* 也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如: 

~~~xml
<typeAliases>
    <!-- 
    	批量别名定义-常用   
   		指定包名,mybatis自动扫描包中的类型,自定义别名,别名就是类名,首字母大写或者小写
   -->
   <package name="com.mybatis.entity"/>
   <package name="com.mybatis.mapper.vo"/>
</typeAliases>
~~~

>* 每一个在包 com.mybatis.entity 中的 Java Bean，在没有注解的情况下，
>  会使用 Bean 的首字母小写的非限定类名来作为它的别名。 比如 com.mybatis.entity.User 的别名为 user；若有注解，
>  则别名为其注解值。看下面的例子：

>

~~~java
@Alias("user")
public class User{
    ...
}
~~~

### typeHandlers 类型处理器

mybatis中通过typeHandlers完成jdbc类型和java类型的转换。
通常情况下，mybatis提供的类型处理器满足日常需要，不需要自定义.

以下是mybatis框架内置的类型处理器：

![类型处理器](/images/mybatis/typehandler.png)

你也可以通过实现org.apache.ibatis.type.TypeHandler接口或者继承org.apache.ibatis.type.BaseTypeHandler类来实现自己的类型处理器，最后在主配置文件中加入自定义的处理器，配置示例如下：

~~~xml
<typeHandlers>
    <typeHandler handler="org.mybatis.example.ExampleTypeHandler"/>
</typeHandlers>
~~~

自定义的类型处理器实现示例：

~~~java
@MappedJdbcTypes(JdbcType.VARCHAR)
public class ExampleTypeHandler extends BaseTypeHandler<String> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, String parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter);
    }
    @Override
    public String getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return rs.getString(columnName);
    }
    @Override
    public String getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return rs.getString(columnIndex);
    }
    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return cs.getString(columnIndex);
    }
}
~~~

上述处理器会覆盖MyBatis默认对于VARCHAR类型的处理策略。

> 对于枚举型的处理，MyBatis内置了两类处理器来处理其行为。其中，EnumTypeHandler会把枚举型的值转换成其对应的字符串名称; EnumOrdinalTypeHandler会把枚举型的值转换成其在枚举类中的下标序列位置， 默认情况下，框架使用EnumTypeHandler来处理枚举类型，如果你想针对某个枚举类型进行修改，则：

EnumOrdinalTypeHandler的配置示例如下：

~~~xml
<!-- javaType的值为要进行映射的枚举类的完整包路径： 针对RoundingMode枚举，采用下标映射 -->
<typeHandlers>
    <typeHandler handler="org.apache.ibatis.type.EnumOrdinalTypeHandler" javaType="java.math.RoundingMode"/>
</typeHandlers>
~~~

自动映射器（auto-mapper）会自动地选用 EnumOrdinalTypeHandler 来处理， 所以如果我们想用普通的 EnumTypeHandler，就非要为那些 SQL 语句显式地设置要用到的类型处理器不可。

示例的核心SQL映射配置如下: [有关这部份映射的详细介绍，请继续往下看]

~~~xml
<resultMap type="com.mybatis.entity.Order" id="orderMap">
	<id column="id" property="id"/>
	<result column="ordno" property="ordNo"/>
	<result column="cost" property="cost"/>
	<result column="order_date" property="orderDate"/>
	<result column="ship_date" property="shipDate"/>
	<result column="order_status" property="status" typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
</resultMap>
<!-- 此处的select语句必须使用resultMap -->
<select id="getAllOrders" resultMap="orderMap">
    select * from t_order
</select>
<!-- 插入时指定枚举类型处理器 -->
<insert id="insert" parameterType="Order">
    insert into t_order(ordno, cost, order_date, ship_date, order_status, customer_id) values
		(#{ordNo},#{cost},#{orderDate},#{shipDate},
				#{status, typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler},#{customer.id})
</insert>
~~~

**正常情况下,不需要配置,默认采用org.apache.ibatis.type.EnumTypeHandler来进行枚举类型的映射**

### mappers 元素配置

* 该元素的作用是告知MyBatis到哪里去查询接口类中抽象方法所对应的具体SQL语句，配置方式有以下4种：

> 1.通过resource加载单个映射文件

~~~xml
<!-- 通过resource方法,一次只能加载一个映射文件 -->
<mapper resource="com/mybatis/mapper/UserMapper.xml"/> 
~~~

> 2.通过url进行全路径加载

~~~xml
<mappers>
    <!-- 完全限定资源定位符的配置方式(包括file:///完整URL) -->
    <mapper url="file:///D:/Program Files/workspace/mybatis-sample/src/com/mybatis/mapper/UserMapper.xml" />
</mappers>
~~~

> 3.过映射接口加载 
> 必须要遵循一些规范:需要将mapper接口类名和mapper.xml映射文件名称保持一致,且在同一个目录
> 前提是:使用的是mapper代理方式.

~~~xml
<mappers>
    <mapper class="com.mybatis.mapper.UserMapper"/>
</mappers>
~~~

> 4.批量加载mapper - 推荐使用.  

> 指定mapper接口的包名,mybatis自动扫描包下边所有mapper接口进行加载.   
> 同样要遵循上边的规范

~~~xml
<mappers>
    <package name="com.mybatis.mapper"/> 
</mappers>
~~~

> 小结：
> 配置文件中大多数都可以使用默认值，无需变动，所以，看上去可配置的项很多，但真正需要去改变的不多，故mybatis-config.xml文件无需配置多太，使用精简化配置，能完成功能要求即可。

## 映射文件

> 说明：
> 针对每个Dao或Mapper接口，我们都需要编写相关的映射xml, 一般命名为：xxxMapper.xml或xxxDao.xml   
> 在映射文件，主要是针对参数类型[输入映射]、结果集类型、结果集映射、sql类型 进行映射，下面一一分析

先看一个简单的CRUD操作映射：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.mapper.RoleMapper">
	<!-- 定义一个ResultMap类型 -->
	<resultMap type="Role" id="roleMap">
		<!-- 主键映射 -->
		<id column="id" property="id"/>
		<!-- 普通属性映射 -->
		<result column="role_name" property="roleName"/>
		<result column="remark" property="remark"/>
	</resultMap>
	<!-- 依主键查询 -->
	<select id="findById" parameterType="int" resultMap="roleMap">
		select r.* from t_role r where r.id = #{id}
	</select>
	<!-- 查询所有 -->
	<select id="findAll" resultMap="roleMap">
		select r.* from t_role r
	</select>
	<!-- 更新操作 -->
	<update id="update" parameterType="Role">
		update t_role r set r.role_name = #{roleName}, r.remark = #{remark} where r.id = #{id}
	</update>
	<!-- 删除操作 -->
	<delete id="delete" parameterType="int">
		delete from t_role  where id = #{id}
	</delete>
	<!-- 插入操作 -->
	<insert id="save" parameterType="Role">
		insert into t_role(role_name, remark) values(#{roleName}, #{remark})
	</insert>
	<!-- 多对多关联查询 -->
	<select id="findByUser" parameterType="int" resultMap="roleMap">
		select r.* from t_role r join t_user_role ur on r.id = ur.role_id
		join t_user u on ur.user_id = u.id
		where u.id = #{uid}
	</select>
</mapper>
```

下面单个分析：

### parameterType 输入映射

> 通过parameterType指定输入参数的类型，类型可以是简单类型、hashmap、pojo的包装类型

1. 如果是基本类型，直接写基本类型名即可，在sql语句中通过 #{} 引用
2. 如果是hashmap, 可以写java.util.Map，如果配置了类型别名，直接写别名，在sql语句中通过 #{} 引用时，要写这个map中的key值，比如：#{username}
3. 如果是list, 可以写 java.util.List, 如果配置了类型别名，直接写别名，在sql语句中通过 #{} 引用时，可以通过foreach来迭代
4. 如果是pojo,可以写类的全限定名，如果配置了类型别名，直接写别名，在sql语句中通过 #{} 引用时，直接写pojo的属性名。

以上的规则一定要弄清楚，parameterType 的目的是为了让用户传参数进来给我们写sql时用，如果对这个参数理解不到位，则我们在写sql语句绑定参数时，就会出错，从而造成数据绑定失败。

> 注：
> 从这个参数的配置语法可以看出来，mybatis中要求dao或mapper接口中的方法参数最好是1个，如果有多个的话，可以通过VO对象进行封装，或者利用注解@param 标注【有关注解的使用，后面的文档中会讲解】。本案例中的例子采用把多个参数封装到一个VO(值对象)中，或者通过一个 Map进行存储，以保证方法的参数不超过1个

如OrderMapper中有如下方法：

```java
public interface OrderMapper {

	List<Order> findByConditions(OrderQueryVO oqvo);
}
```

可以看出，这个方法的参数是一个VO, 此类的代码如下：

```java
package com.mybatis.mapper.vo;

import com.mybatis.entity.Customer;
import com.mybatis.entity.Order;

/**
 * @author yejf
 *
 */
public class OrderQueryVO {

	private Order order;
	
	private Customer customer;

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
}
```

此类中封装了Order类和Customer类两个对象，原因是我们的查询需要这两个对象，故而封装为VO
下面是映射文件的片断：

```xml
<!-- 通过组合多条件查询, 需要封装一个查询的VO -->
<select id="findByConditions" parameterType="OrderQueryVO" resultMap="orderMap">
	select o.* from t_order o join t_customer c on o.customer_id = c.id
	<where>
		<if test="order != null and order.ordNo != null">
			and o.ordNo = #{order.ordNo}
		</if>
		<if test="order != null and order.cost != null">
			and o.cost > #{order.cost}
		</if>
		<if test="order != null and order.status != null">
			and o.order_status = #{order.status, typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler}
		</if>
		<!-- 添加其它的条件... -->
		<if test="customer != null and customer.id != null">
			and o.customer_id = #{customer.id}
		</if>
		<if test="customer != null and customer.level != null">
			and c.c_level = #{customer.level}
		</if>
	</where>	
</select>
```

上面有关 where 和 if 的用法，我们在动态SQL中会详细介绍.

### resultType 普通结果集映射

如果resultType是POJO类型，则遵守如下规则：

> 当查询的结果集中的列与我们的属性名一致时，返回的pojo或pojo集合都可以使用 restultType 的类型来接

**使用resultType进行输出映射，只有查询出来的列名和pojo中的属性名一致，该列才可以映射成功。**
如果查询出来的列名和pojo中的属性名全部不一致，就不会创建pojo对象。
只要查询出来的列名和pojo中的属性有一个一致，就会创建pojo对象，并给这个属性赋值，其它属性不赋值。

如果resultType是基本类型，则直接写基本类型即可。

#### resultMap 复杂结果集映射

> mybatis中使用resultMap完成高级输出结果映射。

resultMap使用方法
如果查询出来的列名和pojo的属性名不一致，通过定义一个resultMap对列名和pojo属性名之间作一个映射关系。

1. 定义resultMap
2. 使用resultMap作为statement的输出映射类型

例:使用User完成映射

```sql
select id id_,username username_ from mybatis_user where id=#{value}
```

User类中属性名和上边查询列名不一致, 所以，查询成功后，也不会有正确的实体属性值。
这种情况下，我们可以定义reusltMap如下：

~~~xml
<!-- 
    定义resultMap
    将select id id_,username username_ from mybatis_user和User类中的属性作一个映射关系
 	type:resultMap最终映射的java对象类型,可以使用别名
 	id:resultMap的唯一标识 
 -->
<resultMap type="user" id="userResultMap">
	<!-- id表示查询结果集中的唯一标识 
	     column:表示查询出来的列名
	     property:type指定的pojo类型中的属性名
	     最终resultMap对column和property作一个映射关系(对应关系)
	-->
	<id column="id_" property="id"/>
	<!-- 
	  result:对普名映射定义
	  column:查询出来的列名
	  property:type指定的pojo类型中的属性名
	     最终resultMap对column和property作一个映射关系(对应关系)
	 -->
	 <result column="username_" property="username"/>
</resultMap>
~~~

使用resultMap作为statement的输出映射类型

~~~xml
<select id="findUserByResultMap" parameterType="int" resultMap="userResultMap">
	select id id_,username username_ from mybatis_user where id=#{value}
</select>
~~~

### select 操作

> 用来定义查询命令，所有标准的sql命令都可以开发。

```xml
<select id="byLevel" parameterType="Level" resultType="Customer">
	select id,name,loc as location, phone as mobilePhone, c_level as level 
	from t_customer where c_level = #{level}
</select>
```

### update 操作

> 用来定义更新命令

```xml
<update id="update" parameterType="User">
	update t_user as u 
		set u.name = #{name},
		u.email = #{email},
		u.birth = #{birth},
		u.height = #{height}
	where u.id = #{id}
</update>
```

### delete 操作

> 用来定义删除命令

```xml
<delete id="deleteCustomer" parameterType="int">
	delete from t_customer where id = #{id}
</delete>
```

### insert 操作
```
<insert id="insertCustomer" parameterType="Customer">
	insert into t_customer(name, loc, phone, c_level) 
		values(#{name}, #{location}, #{mobilePhone}, #{level})
</insert>
```