---
title: 关联映射和动态SQL机制
createTime: 2025/08/11 09:21:19
permalink: /framework/mybatis/zxoa3usx/
---
# 关联映射和动态SQL机制

> 在所有的ORM框架中，都会针对一对一、一对多、多对多关联映射给出解决方案，mybatis不同于Hibernate框架的全自动方案，但它也可以自由地定义一、多的关联，而且比Hibernate框架要简单一些。

## 关联映射

> 不管是一对一、一对多还是多对多，从关联的两边任何一边看，关联的另一边要么是一、要么是多，这样问题就简单了，如果是一，就使用 `association` 来定义指向一的关系， 如果是多，则使用 `collection` 来定义指向多的关系。

基于以上的观点，我们这里先给出一对多的案例，把一对多弄明白了，一对一和多对多就可以无师自通了。

### 一对多关联

> 以Customer类和Order类为例，这两个实体类的代码如下：

#### 实体类

```java
/**********
 * 客户类
 * @author lema
 */
public class Customer {

	private Integer id;

	private String name;

	private String location;

	private String mobilePhone;

	private Level level;
	
	private List<Order> orderList;

	//构造、getter/setter、toString、hashCode和equals方法省略 ...
}

//Level枚举：
/*********
 * 客户级别
 * @author le ma
 */
public enum Level {

	HIGH, 	//高级
	MIDDLE, //中级
	LOW;    //低级
	
}
```

```java
/**********
 * 订单类
 * @author lema
 */
public class Order {

	private Integer id; //
	
	private String ordNo; //订单号
	
	private Double cost; //订单费用
	
	private Date orderDate; //下订日期
	
	private Date shipDate; //出货日 期 
	
	private OrderStatus status; //订单 状态
	
	private Customer customer; //所属客户

	//构造、getter/setter、toString、hashCode和equals方法省略 ...
}
```

从上面定义的属性可以看出，Customer对Order是一对多的关联关系.

#### DAO接口

【为了把共性的方法抽取出来，我先定义了一个BaseDao】

```java
/**
 * 
 */
package com.mybatis.dao.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author lema
 *
 */
public interface BaseDao<T> {

	void save(T instance);
	
	void delete(Serializable id);
	
	void update(T instance);
	
	T findById(Serializable id);
	
	List<T> findAll();
	
	/**********
	 * 根据条件查询
	 * @param propMap
	 * @return
	 */
	List<T> findByProperty(Map<String, Object> propMap);
}

```

两个实体类的DAO接口定义如下：
`CustomerDao.java`

```java
package com.mybatis.dao;

import java.io.Serializable;
import java.util.List;

import com.mybatis.dao.common.BaseDao;
import com.mybatis.entity.Customer;

/**
 * @author lema
 *
 */
public interface CustomerDao extends BaseDao<Customer> {
	//此处是为了演示级联查询而新增的一个方法，其实父类已经有了findById方法的定义
	Customer findById2(Serializable id);
	//演示动态SQL的【以备后用】
	void insertBatch(List<Customer> list);
}
```

`OrderDao.java`

```java
package com.mybatis.dao;

import java.io.Serializable;
import java.util.List;

import com.mybatis.dao.common.BaseDao;
import com.mybatis.dao.vo.OrderQueryVO;
import com.mybatis.entity.Order;
import com.mybatis.entity.OrderStatus;

public interface OrderDao extends BaseDao<Order> {

	/**************
	 * 按客户的id查询此客户的订单 [本质上都可以由父类的 findByProperty 实现]
	 * @param customerId
	 * @return
	 */
	List<Order> findByCustomer(Serializable customerId);
	
	/*************
	 * 按订单状态查询  [本质上都可以由父类的 findByProperty 实现]
	 * @param status
	 * @return
	 */
	List<Order> findByStatus(OrderStatus status);
	
	/****
	 * 多条件查询 [本质上都可以由父类的 findByProperty 实现]
	 * @param oqvo
	 * @return
	 */
	List<Order> findByConditions(OrderQueryVO oqvo);
}
```

准备工作已经就绪，下面就是针对两个接口的 xml 文件进行映射，并学习一对多如何编写映射，如下：

#### mybatis映射文件

`CustomerDao.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.dao.CustomerDao">
	<!-- 设定 ResultMap -->
	<resultMap type="Customer" id="customerMap1">
		<!-- 主键 -->
		<id column="cid" property="id"/>
		<!-- 普通属性 -->
		<result column="name" property="name"/>
		<result column="loc" property="location"/>
		<result column="phone" property="mobilePhone"/>
		<result column="c_level" property="level"/>
		<!-- 指向关联多的那一边的属性, 使用 ofType指明另一边的类型, fetchType默认就是 lazy, 可以不写 -->
		<collection property="orderList" ofType="Order" fetchType="lazy">
			<id column="id" property="id"/>
			<result column="ordno" property="ordNo"/>
			<result column="cost" property="cost"/>
			<result column="order_date" property="orderDate"/>
			<result column="ship_date" property="shipDate"/>
			<result column="order_status" property="status" 
					typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
		</collection>		
	</resultMap>
	<!-- 查询语句:一条SQL级联查询出客户和他的订单，上面定义的resultMap就是来存放查询结果集的 -->
	<select id="findById" parameterType="int" resultMap="customerMap1">
		select c.id as cid, c.name, c.loc, c.phone, c.c_level ,o.* from t_customer c left join t_order o 
		on c.id = o.customer_id where c.id = #{id}
	</select>
</mapper>
```

`OrderDao.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.dao.OrderDao">
	<!-- 定义结果集类型的映射 -->
	<resultMap type="com.mybatis.entity.Order" id="orderMap1">
		<id column="id" property="id"/>
		<result column="ordno" property="ordNo"/>
		<result column="cost" property="cost"/>
		<result column="order_date" property="orderDate"/>
		<result column="ship_date" property="shipDate"/>
		<result column="order_status" property="status" 
				typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
		<!-- 关联的另一边:  也就是一的一边 -->
		<association property="customer" column="customer_id" javaType="Customer">
			<id column="id" property="id"/>
			<!-- 普通属性 -->
			<result column="name" property="name"/>
			<result column="loc" property="location"/>
			<result column="phone" property="mobilePhone"/>
			<result column="c_level" property="level"/>
		</association>
	</resultMap>
	<!-- 查询 -->
	<select id="findById" parameterType="int" resultMap="orderMap1">
		select * from t_order where id = #{id}
		<!-- 注：上面的查询只查了订单，并没有查询客户，如果要查询客户，可以使用关联查询,如下： -->
		<!-- select o.*,c.* from t_order o join t_customer c on o.customer_id = c.id where o.id = #{id} -->
	</select>
</mapper>
```

#### 测试代码:

```java
public class CustomerDaoTest {

	private CustomerDao customerDao;
	
	@Before
	public void init() {
		SqlSession session = SqlSessionFactoryUtil.getSession();
		//
		this.customerDao = session.getMapper(CustomerDao.class);
	}
	
	@Test
	public void testFindById() {
		Customer c = customerDao.findById(2);
		//
		System.out.println(c);
		//上面我们的查询语句中，已经关联查询出了订单，所以：
		List<Order> list = c.getOrderList();
		if(list != null) {
			System.out.println("拥有的订单：");
			for(Order o : list) {
				System.out.println(o);
			}
		}
	}
}
```

执行的结果如下：

>16:59:54,194 DEBUG findById:159 - ==>  Preparing: select c.id as cid, c.name, c.loc, c.phone, c.c_level ,o.* from t_customer c left join t_order o on c.id = o.customer_id where c.id = ? 
>16:59:54,223 DEBUG findById:159 - ==> Parameters: 2(Integer)
>16:59:54,241 DEBUG findById:159 - <==      Total: 2
>Customer [id=2, name=史大哈, location=苏州市烽火路石路老街, mobilePhone=15890776688, level=MIDDLE]

再看看另一边，我们再测试OrderDaoTest,如下：

```java
public class OrderDaoTest {

	private OrderDao orderDao;
	
	@Before
	public void init() {
		SqlSession session = SqlSessionFactoryUtil.getSession();
		//
		this.orderDao = session.getMapper(OrderDao.class);
	}
	
	@Test
	public void  testFindById() {
		Order o = orderDao.findById(1);
		System.out.println(o);
	}
}
```

执行的结果如下：

>17:02:54,676 DEBUG findById:159 - ==>  Preparing: select * from t_order where id = ? 
>17:02:54,704 DEBUG findById:159 - ==> Parameters: 1(Integer)
>17:02:54,727 DEBUG findById:159 - <==      Total: 1
>Order [id=1, ordNo=20171205003, cost=283.5, orderDate=Mon Nov 20 12:12:48 CST 2017, shipDate=Mon Nov 20 19:45:12 CST 2017, status=NO_PAID]   

>可以看出，所谓的关联就是利用`association`和`collection`来定义 resultMap的子元素，而如果想要加载出关联另一边，关键在于你如何编写sql语句，如果你的sql语句只是查询本身，则mybatis并不会主动去帮助我们加载关联的另一边，不管另一边是一还是多。当然，如上所示，我们可以通过编写关联查询一次性加载出本身和关联的对象，我们的resultMap定义是可以存储关联查询的结果集的。

#### 关联映射另一方式

如果你不想通过关联查询去查询出关联的另一边，可以通过下面的关联配置，让mybatis框架在你需要时，再次执行被关联对象的查询语句来找出被关联对象，这个配置如下：

`CustomerDao.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.dao.CustomerDao">
	<!-- 设定 ResultMap -->
	<resultMap type="Customer" id="customerMap2">
		<!-- 主键 -->
		<id column="cid" property="id"/>
		<!-- 普通属性 -->
		<result column="name" property="name"/>
		<result column="loc" property="location"/>
		<result column="phone" property="mobilePhone"/>
		<result column="c_level" property="level"/>
		<!-- 关联属性: column是指上次查询出来的主键列的列名，如果取了别名，则写列别名, 不是指 外键列的名字. 
			注：这个配置最重要地方在于：column的理解 ，它是指本次查询的结果中以哪列做为接下来的select的条件
			select是指使用另一个查询语句，这个语句可以是本文件中定义的，
			也可以是其它的文件中定义的，通过命名空间来指定
		-->
		<collection property="orderList" ofType="Order" column="cid"
								select="com.mybatis.dao.OrderDao.findByCustomer">
		</collection>	
	</resultMap>
	<!-- 查询语句:只查询客户本身的信息，并没有级联查询他的订单 -->
	<select id="findById2" parameterType="int" resultMap="customerMap2">
		select c.id as cid, c.name, c.loc, c.phone, c.c_level from t_customer c where c.id = #{id}
	</select>
</mapper>
```

在另一边，OrderDao.xml中，
`OrderDao.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.mybatis.dao.OrderDao">
	<!-- 定义结果集类型的映射 -->
	<resultMap type="com.mybatis.entity.Order" id="orderMap">
		<id column="id" property="id"/>
		<result column="ordno" property="ordNo"/>
		<result column="cost" property="cost"/>
		<result column="order_date" property="orderDate"/>
		<result column="ship_date" property="shipDate"/>
		<result column="order_status" property="status" 
				typeHandler="org.apache.ibatis.type.EnumOrdinalTypeHandler"/>
		<!-- 关联的另一边:  也就是一的一边 -->
		<association property="customer" column="customer_id" javaType="Customer">
			<id column="id" property="id"/>
			<!-- 普通属性 -->
			<result column="name" property="name"/>
			<result column="loc" property="location"/>
			<result column="phone" property="mobilePhone"/>
			<result column="c_level" property="level"/>
		</association>
	</resultMap>
	<!-- 查询 -->
	<select id="findByCustomer" parameterType="int" resultMap="orderMap">
		<!-- 注: 这条查询也只是查了客户的订单，并没有关联查询客户，上面的resultMap中即使没有 association也是可以的 -->
		select o.* from t_order o where o.customer_id = #{customerId}
	</select>
</mapper>
```

可以看出，在CustomerDao.xml中的collection子元素中，使用了column和select 两个属性，column属性指定了上次查询的结果值，select指定了接下来要查询的语句，以column的值为查询条件.

### 多对多关联

> 以User类和Role类为例，这两个实体类的代码如下：

#### 实体类

```java
package com.mybatis.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 用户类
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
	private List<Role> roleList;

	/*****
	 * 把角色注册给用户的方法【此方法只在内存中注册关系】
	 * @param r
	 */
	public void addRole(Role r) {
		if(this.roleList == null) {
			this.roleList = new ArrayList<>();
		}
		//
		this.roleList.add(r);
	}
	//构造、getter/setter、toString、hashCode和equals方法省略 ...
}
```

```java
package com.mybatis.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 角色类
 * @author lema
 *
 */
public class Role implements Serializable {

	private static final long serialVersionUID = 581059673306745415L;

	private Integer id; //id

	private String roleName; //角色名

	private String remark; //角色描述

	private List<User> userList;

	//角色中是否需要添加注册用户的方法，由程序员依业务自己行决定
	//构造、getter/setter、toString、hashCode和equals方法省略 ...
}
```

** 可以看出，在实体类中用户和角色都各以 List 类型做为属性，当然，也可以是Set或数组，只要能表达“多”即可**

#### Dao接口

>注：BaseDao同上，此处就再列出

```java
package com.mybatis.dao;

import java.io.Serializable;
import java.util.List;

import com.mybatis.dao.common.BaseDao;
import com.mybatis.entity.User;

/**
 * @author lema
 *
 */
public interface UserDao extends BaseDao<User> {
	/**************
	 * 给指定的用户注册角色，要求传递进来的用户对象在内存中已经注册好了角色信息
	 * 
	 * 注：
	 * 此方法在业务层的参数应该是：(Integer userId, Integer[] roleIds)或 (Integer userId, List<Integer> roleIds)
	 * 在业务层的实现中，需要把这些id转换成实体对象或VO对象，并且进行相应的设置，如下：
	 * User user = new User();
	 * user.setId(userId);
	 *  //创建 Role
	 *  Role r = null;
	 *  for(Integer id :roleIds) {
	 *  	r = new Role();
	 *  	r.setId(id);
	 *  	//把此角色注册到用户中，需要在 User实体类中添加 addRole方法
	 *  	user.addRole(r);
	 *  }
	 *  //再调用DAO/Mapper 接口中的方法，以保证参数一致
	 *  
	 *  还可以设计一个VO对象，封装userId和角色ID的集合，然后，在Mapper接口中以这个VO 为参，也是可行的
	 * @param user
	 */
	void assignRole(User user);
	
	/*************
	 * 把指定用户的角色给清除掉
	 * 我们在业务层经常需要重新给用户分配角色，流程如下:
	 * 1. 先调用 clearRole 方法，清除之前的角色，不管是否存在
	 * 2. 再调用 assignRole 方法，重新分配新的角色
	 * @param userId
	 */
	void clearRole(Serializable userId);
}
```

> 注：在上面添加 assignRole和clearRole方法，是为了演示对多对关联时，我们如何操作中间表的记录而准备的。

```java
package com.mybatis.dao;

import java.io.Serializable;

import com.mybatis.dao.common.BaseDao;
import com.mybatis.entity.Role;

/**
 * @author lema
 *
 */
public interface RoleDao extends BaseDao<Role> {
	//无额外方法... [如有需要，可以随时添加]

}
```

#### mybatis映射文件

由于上面已给出完整的映射格式，下面只给出关键的配置片断
`UserDao.xml`

```xml
	<resultMap type="User" id="userAndRoleMap">
		<!-- 主键映射 -->
		<id column="uid" property="id"/>
		<!-- 普通属性 -->
		<result column="name" property="name"/>
		<result column="birth" property="birth"/>
		<result column="height" property="height"/>
		<result column="email" property="email"/>
		<!-- 对多关联关系映射 -->
		<collection property="roleList" ofType="Role" column="uid" select="com.mybatis.mapper.RoleMapper.findByUser">
			<!-- 使用了column和select属性，此处就不再需要写具体的列和属性的映射了 -->
		</collection>
	</resultMap>
	<!-- <select id="findById" resultType="User" parameterType="int" flushCache="false" useCache="true"> -->
	<!-- 将通过关联，按需查询出此用户的角色 -->
	<select id="findById" resultMap="userAndRoleMap" parameterType="int" flushCache="false" useCache="true">
		<!-- 由于两个表中都有id,为避免关联查询的岐义，故给列取别名 -->
		select id as uid,  
			name as name,
			birth as birth,
			height as height,
			email as email
			from t_user
			where id = #{id}
	</select>
	<!-- 给用户注册角色， 通过OGNL表达式 -->
	<insert id="assignRole" parameterType="User">
		insert into t_user_role(user_id,role_id) values
		<!-- 注：如果方法的参数不是集合或数组，而是pojo,则 collection的值就是写pojo的集合属性 -->
		<foreach collection="roleList" item="ord" separator=",">
			(#{id}, #{ord.id})
		</foreach>
	</insert>
	<!-- 清空用户的角色 -->
	<delete id="clearRole" parameterType="int">
		delete from t_user_role where user_id = #{uid}
	</delete>
```

`RoleDao.xml`

```xml
	<!-- 定义一个ResultMap类型 -->
	<resultMap type="Role" id="roleMap">
		<!-- 主键映射 -->
		<id column="id" property="id"/>
		<!-- 普通属性映射 -->
		<result column="role_name" property="roleName"/>
		<result column="remark" property="remark"/>
	</resultMap>
	<!-- 多对多关联查询 -->
	<select id="findByUser" parameterType="int" resultMap="roleMap">
		select r.* from t_role r join t_user_role ur on r.id = ur.role_id
		join t_user u on ur.user_id = u.id
		where u.id = #{uid}
	</select>
```

> 注：在RoleDao.xml中的resultMap中，并没有关联User的collection元素，当然，如果业务需要，也可以随时加上。

#### 测试代码

```java
public class UserDaoTest {
	
	private UserDao userDao;
	
	@Before
	public void init() {
		SqlSession session = SqlSessionFactoryUtil.getSession();
		userDao = session.getMapper(UserDao.class);
	}

	@Test
	public void testFindById() {
		//
		User user = userDao.findById(1);
		System.out.println(user);
		if(user != null) {
			//进一步加载出此用户的角色
			List<Role> roleList = user.getRoleList();
			//
			if(roleList != null) {
				System.out.println("此用户拥有的角色有：");
				for(Role r : roleList) {
					System.out.println("\t"+r);
				}
			}
		}
	}
```

> 输出结果如下：
> 10:45:32,430 DEBUG findById:159 - ==>  Preparing: select id as uid, name as name, birth as birth, height as height, email as email from t_user where id = ? 
> 10:45:32,452 DEBUG findById:159 - ==> Parameters: 1(Integer)
> 10:45:32,494 DEBUG findById:159 - <==      Total: 1
> User [id=1, name=李三丰, email=lisf@126.com, height=184.5, birth=Fri Dec 01 00:00:00 CST 2017]
> 10:45:32,497 DEBUG findByUser:159 - ==>  Preparing: select r.* from t_role r join t_user_role ur on r.id = ur.role_id join t_user u on ur.user_id = u.id where u.id = ? 
> 10:45:32,497 DEBUG findByUser:159 - ==> Parameters: 1(Integer)
> 10:45:32,502 DEBUG findByUser:159 - <==      Total: 2
> 此用户拥有的角色有：
> Role [id=2, roleName=班主任, remark=可以管理班级、成绩、考试等模块]
> Role [id=4, roleName=讲师, remark=可以管理项目实训、视频、题库、班级、成绩、考试等模块]

可以看出，在UserDao的findById方法中，只加载了User本身，但由于定义resultMap中，使用了collection子元素，并指定了column和select，所以，当你需要用户的角色信息时，mybatis会再去执行select指定的语名在，也就是 findByUser， 如上日志

### 一对一关联

> 一对一完全可以看做是特殊的一对多，从建表的约束上来看，只需要在外键的基础上再添加唯一性约束即可，从java实体类的设计上，两边互相拿到另一边的单一引用，而不是集合；再从mybatis的映射文件来看，都是通过 association 子元素来定义，所以，掌握了一对多和多对多，一对一就不是问题。
> 另外一点，在实际的开发中，一对一的关联关系是较少见的。

## 动态SQL语法

> MyBatis 的强大特性之一便是它的动态 SQL。如果你有使用 JDBC 或其他类似框架的经验，你就能体会到根据不同条件拼接 SQL 语句有多么痛苦。拼接的时候要确保不能忘了必要的空格，还要注意省掉列名列表最后的逗号。利用动态 SQL 这一特性可以彻底摆脱这种痛苦。

> 通常使用动态 SQL 不可能是独立的一部分,MyBatis 当然使用一种强大的动态 SQL 语言来改进这种情形,这种语言可以被用在任意的 SQL 映射语句中。

> 动态 SQL 元素和使用 JSTL 或其他类似基于 XML 的文本处理器相似。在 MyBatis 之前的版本中,有很多的元素需要来了解。MyBatis 3 大大提升了它们,现在用不到原先一半的元素就可以了。MyBatis 采用功能强大的基于 OGNL 的表达式来消除其他元素。

主要的标签有以下几类：

* if
* choose (when, otherwise)
* trim (where, set)
* foreach

### if的使用

> 在映射语句中动态做参数的非空判断，如果参数为null，则我们再拼接相关的条件，只有当条件不为空时，我们再添加条件

在mybatis框架中，如果Dao的某个方法需要做多条件查询，它支持多种做法，如下：

- 使用@param注解
- 使用Map为参，包含多个参数
- 使用VO对象封装

下面我们讲解一下前2种，第3种在之前的案例中已经讲解过，以我们之前的任意DAO为例，添加一个按条件查询的方法，如下：

~~~java
/**
 * 用户综合信息查询,多个条件方式一,使用注解
 * 根据user名字来进行模糊查询,根据user地址来精确匹配
 */
public List<User> findByConditional(@Param("email")String email,@Param("uname") String name);

/**
 * 用户综合信息查询,多个条件,利用hashmap
 */
public List<User> findByHashMap(Map<String,Object> map);
~~~

再来看看映射文件怎么写[UserDao.xml]

~~~xml
<!-- 动态sql-mybatis核心,对sql语句进行灵活操作,通过表达式进行判断,对sql进行灵活拼接,组装. -->
<!-- 对查询条件进行判断,如果输入的参数部位空才进行查询条件的拼接 -->
<!-- 这个情况无需写 parameterType -->
<select id="findByConditional" resultType="user">
	select * from t_user
	<!-- where可以自动去掉第一个条件的and, 下面的比较直接写@param中指定的名字,如 uname -->
	<where>
		<if test="uname!=null">
			and username like #{uname}
		</if> 
		<if test="email!=null">
			and address=#{addr}
		</if>
	</where>
</select>
<!-- 下面就要写 parameterType -->
<select id="findByHashMap" parameterType="hashmap" resultType="user">
	select * from mybatis_user
	<where>
		<if test="uname!=null">
			and username like '%${uname}%'
		</if> 
		<if test="id!=null">
			and id>#{id}
		</if>
	</where>
</select>
~~~

> 需要注意的是：使用map为参数时，if里引用的判断名称要与key的名字一样，否则将不找到这个参数

### choose的使用

> 有些时候，我们不想用到所有的条件语句，而只想从中择其一二。针对这种情况，MyBatis 提供了 choose 元素，它有点像 Java 中的 switch 语句。

需求：  
还是上面的例子，但是这次变为提供了“email”就按“email”查找，提供了“uname”就按“uname”查找，若两者都没有提供，就返回所有符合条件的User

```java
/**
 * 用户综合信息查询,多个条件方式一,使用注解
 * 根据user名字来进行模糊查询,根据user地址来精确匹配
 */
public List<User> findJustOneConditinal(@Param("email")String email,@Param("uname") String name);
```

```xml
<!-- choose when otherwise标签 -->
<select id="findJustOneConditinal" resultType="user">
	select * from t_user
	<where>
		<choose>
			<when test="email!=null">
				and email=#{email}
			</when>
			<when test="uname!=null">
				and username like '%${uname}%'
			</when>
			<otherwise></otherwise>
		</choose>
	</where>
</select>
```

> 与if类似，不同之处在于if有可能是多个条件并立，而choose只能是其中的一个条件.

### where的使用

> 用来做过滤，也就是生成sql语句的where子句，上面的例子中都有看到，不再单独讲解

### set的使用

> 主要是用来做更新的设值，set元素可以被用于动态包含需要更新的列, 我们在更新时，往往是更新除id外的所有列值，但是，有时我们只需要更新有新值的列。没有给值就不更新，这种情况就可以使用set元素.

~~~java
/**
 * 动态sql - set标签set 元素可以被用于动态包含需要更新的列.
 */
public void update(Order order) throws Exception;
~~~

~~~xml
<update id="update" parameterType="Order">
	update t_order
	<set>
		<if test="cost != null">
			cost = #{cost},
		</if>
		<if test="shipDate != null">
			ship_date = #{shipDate},
		</if>
		<if test="status != null">
			order_status = #{status, typeHandler=org.apache.ibatis.type.EnumOrdinalTypeHandler}
		</if>
	</set>
	where id = #{id}
</update>
~~~

### foreach的使用

> 循环条件，可以把传进来的集合或数组进行迭代拼接，它包含的属性有：
> collection:指定输入对象汇总集合属性,它的值可以是list,array
> item:每个遍历生成对象中
> open:开始遍历时拼接的串
> close:结束遍历时拼接的串
> separator:遍历的两个对象中需要拼接的串

案例：

```java
/****
 * 批量插入多个客户
 */
void insertBatch(List<Customer> custList);
```

```xml
<!-- 批量插入 -->
<insert id="insertBatch" parameterType="java.util.List">
	insert into t_customer(name, loc, phone, c_level) values
	<!-- 通过 forEach 来迭代 : 以下做法只适合 mysql-->
	<!-- 方法的参数没有使用 @param时，collection的值为list -->
	<foreach collection="list" index="idx" item="item" separator=",">
		(#{item.name}, #{item.location}, #{item.mobilePhone}, #{item.level})
	</foreach>
</insert>
```

如果方法的参数使用了@param，则collection的值就写@param中的值，如下：

~~~java
/**
 * 动态sql-foreach,循环插入多个对象
 */
public void insertList(@Param("users")List<User> users);
~~~

~~~xml
<!--   oracle中利用一条insert语句同时插入多个值.
		insert into MYBATIS_USER(id,username)
		select 2,'jack' from dual UNION
		select 3,'rose' from dual -->
 <insert id="insertList" parameterType="java.util.List">
	 insert into t_user(id,username,sex,birthday,address)
		 select mybatis_user_id_seq.nextval,a.* from(
		 <foreach collection="users" item="b" separator="union">
			select #{b.username},#{b.sex},#{b.birthday},#{b.address} from dual		 	 	
		 </foreach>) a
</insert>
~~~

> 注：  
> collection属性的值有以下几种：
>
> - 集合, 就写 list
> - 数组, 就写 array
> - pojo, 就写实体类的集合属性
> - @param指定的值, 这个取决于方法的参数是否使用了@param指定

那我们到底写哪一个呢？根据就是 parameterType的值以及接口中方法是否使用了@param修饰

谢谢！