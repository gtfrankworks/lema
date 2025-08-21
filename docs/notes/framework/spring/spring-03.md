---
title: Spring框架事务讲解
createTime: 2025/08/20 14:11:00
permalink: /article/mcclvniw/
---

## Spring框架的事务管理支持两种方式

> **编程式事务**  
> 编程式事务就是指通过在代码中嵌入事务控制代码来手动控制事务，这个方式的优点是可以在方法体中的代码块级别进行控制事务，粒度较细，缺点是要侵入我们的业务代码，不推荐使用。

> **申明式事务**  
> 申明式事务是基于Spring的框架AOP技术，把事务当做一个“切面”,在需要做事务控制的代码上织入，可以控制到方法层面，其优点是无需侵入目标代码，而且Spring针对不同的底层持久层实现提供了不同的事务管理API，非常方便

## Spring框架事务结构

> 下面的图示可以很清晰地展示Spring框架的事务API结构
> ![图示](/images/spring/tm.jpg)

`Spring并不直接管理事务，而是提供了多种事务管理器，如果持久层采用JDBC技术或mybatis框架，则选择DataSourceTransactionManager来管理事务，如果采用Hibernate框架，则选择HibernateTransactionManager来管理事务，等等`

## 事务的属性

> 事务的属性包括隔离级别、传播性、超时时间、回滚规则、只读性5个方面，如下图
> ![图示](/images/spring/tm-property.jpg)

### 事务隔离级别 [Isolation]

1. ISOLATION_DEFAULT	

   > 使用后端数据库默认的隔离级别

2. ISOLATION_READ_UNCOMMITTED	

   > 最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读

3. ISOLATION_READ_COMMITTED	

   > 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生

4. ISOLATION_REPEATABLE_READ	

   > 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生

5. ISOLATION_SERIALIZABLE	

   > 最高的隔离级别，完全服从ACID的隔离级别，确保阻止脏读、不可重复读以及幻读，也是最慢的事务隔离级别，因为它通常是通过完全锁定事务相关的数据库表来实现的

### 事务传播性 [Propagation]

> 定义事务是如何传播的，它描述的是从一个事务方法中调用另一个事务方法时，被调用方法的事务该如何与前面的事务协调，Spring中定义了如下7种规则
> ![图示](/images/spring/tm-propagation.png)
> 每一种规则下，它的形为如下表所述：
> ![图示](/images/spring/tm-propagation-ref.png)

### 超时性[Timeout]

> 为了使应用程序很好地运行，事务不能运行太长的时间。因为事务可能涉及对后端数据库的锁定，所以长时间的事务会不必要的占用数据库资源。事务超时就是事务的一个定时器，在特定时间内事务如果没有执行完毕，那么就会自动回滚，而不是一直等待其结束

### 只读性(Read Only)

> 事务的第三个特性是它是否为只读事务。如果事务只对后端的数据库进行该操作，数据库可以利用事务的只读特性来进行一些特定的优化。通过将事务设置为只读，你就可以给数据库一个机会，让它应用它认为合适的优化措施

### 回滚规则[Rollback Rule]

> 事务五边形的最后一个方面是一组规则，这些规则定义了哪些异常会导致事务回滚而哪些不会。默认情况下，事务只有遇到运行期异常时才会回滚，而在遇到检查型异常时不会回滚（这一行为与EJB的回滚行为是一致的） 
> 但是你可以声明事务在遇到特定的检查型异常时像遇到运行期异常那样回滚。同样，你还可以声明事务遇到特定的异常不回滚，即使这些异常是运行期异常。

## 编程式事务

> 支持两种方式，一是利用PlatformTransactionManager进行编程手动控制事务的提交与回滚，二是利用TransactionTemplate做事务控制，它是基于回调机制。这两种做法都是侵入式的。

## 申明式事务

> Spring框架支持XML和注解 两种方式来做申明式事务，下面我们一一讲解。

### 案例的共性内容有：

#### 基于maven构建一个项目

#### 创建实体类

```java
package com.springdemo.tx.entity;

import java.io.Serializable;


public class Account implements Serializable {
    private Integer id;
    private String name;
    private double balance;
    // ... 其它的代码略
}
```

#### 建表【如果是采用Hibernate框架则不需要,本案例使用 JdbcTemplate, 数据库任意】

```sql
create table tbl_account(
  id INTEGER auto_increment,
  name VARCHAR(255),
  balance DOUBLE,
  primary key(id)
) engine=InnoDB default charset=utf8;
```

#### 创建持久层接口

```java
package com.springdemo.tx.dao;

import com.springdemo.tx.entity.Account;
import java.io.Serializable;
import java.util.List;

public interface AccountDao {
    void save(Account account);
    Account findById(Serializable id);
    List<Account> findAll();
    void update(Account account);
    void delete(Serializable id);
}
```

#### 利用JdbcTemplate实现持久层接口 【使用@Repository注解加入到Spring容器管理之中】

```java
package com.springdemo.tx.dao.impl;

import com.springdemo.tx.dao.AccountDao;
import com.springdemo.tx.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AccountDaoImpl implements AccountDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public void save(Account account) {
        if(account != null) {
            String sql = "insert into tbl_account(name,balance) values(?,?)";
            jdbcTemplate.update(sql, account.getName(), account.getBalance());
        }
        //模拟一个异常 [出现运行时异常，事务将会回滚]
        if(Math.random() < 0.5) {
            throw new RuntimeException("Random Exception");
        }
    }
    @Override
    public Account findById(Serializable id) {
        if(id != null) {
            RowMapper<Account> rowMapper = new BeanPropertyRowMapper<>(Account.class);
            String sql = "select * FROM tbl_account where id = ?";
            return jdbcTemplate.queryForObject(sql, rowMapper, id);
        }
        return null;
    }
    @Override
    public List<Account> findAll() {
        RowMapper<Account> rowMapper = new BeanPropertyRowMapper<>(Account.class);
        String sql  =  "select * from tbl_account";
        return jdbcTemplate.query(sql, rowMapper);
    }
    @Override
    public void update(Account account) {
        if(account != null && account.getId() != null) {
            String sql = "update tbl_account set name = ?,balance = ? where id = ?";
            jdbcTemplate.update(sql, account.getName(), account.getBalance(), account.getId());
        }
    }
    @Override
    public void delete(Serializable id) {
        if(id != null) {
            String sql = "delete from tbl_account where id = ?";
            jdbcTemplate.update(sql, id);
        }
    }
}
```

#### 创建业务层接口

```java
package com.springdemo.tx.service;

import com.springdemo.tx.entity.Account;

public interface AccountService {
 
    int deposit(Account account, double money);

    int withdraw(Account account, double money);

    /*******
     * 转帐
     * @param from
     * @param to
     * @param money
     * @return
     */
    int transfer(Account from, Account to, double money);
}
```

#### 基于持久层实现业务层接口【使用@Service注解加入到Spring容器管理之中】

```java
package com.springdemo.tx.service.impl;

import com.springdemo.tx.dao.AccountDao;
import com.springdemo.tx.entity.Account;
import com.springdemo.tx.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;
    @Override
    public int deposit(Account account, double money) {
        //首先，判断这个帐户是否存在
        Account targetAccount = accountDao.findById(account.getId());
        if(targetAccount == null) {
            return -1;  //目标帐户不存在
        }
        //存在的话，执行更新操作
        targetAccount.setBalance(targetAccount.getBalance() + money);
        accountDao.update(targetAccount);
        // 如要模拟出异常，可以把下面的代码注释打开，观察事务是否回滚了
        //throw new RuntimeException("故意抛出一个运行时异常");
        return 1;
    }
    @Override
    public int withdraw(Account account, double money) {
        //首先，判断这个帐户是否存在
        Account targetAccount = accountDao.findById(account.getId());
        if(targetAccount == null) {
            return -1;  //目标帐户不存在
        }
        //再判断余额是否足够
        if(targetAccount.getBalance() < money) {
            //余额不足
            return -1;
        }
        //存在的话，执行更新操作
        targetAccount.setBalance(targetAccount.getBalance() - money);
        accountDao.update(targetAccount);
        return 1;
    }
    @Override
    public int transfer(Account from, Account to, double money) {
        //首先，判断源帐户是否存在
        Account fromAcct = accountDao.findById(from.getId());
        if(fromAcct == null) {
            System.out.println("源帐户不存在");
            return -1;
        }
        //其次，判断目标帐户是否存在
        Account targetAcct = accountDao.findById(to.getId());
        if(targetAcct == null) {
            System.out.println("目标帐户不存在.");
            return -1;
        }
        //最后，再判断源帐户的余额是否足够
        if(fromAcct.getBalance() < money) {
            System.out.println("源帐户余额不足.");
            return -1;
        }
        //执行业务: 更新源帐户
        fromAcct.setBalance(fromAcct.getBalance() - money);
        accountDao.update(fromAcct);

        //模拟一个随机异常
        randomException();

        //更新目标帐户
        targetAcct.setBalance(targetAcct.getBalance() + money);
        accountDao.update(targetAcct);
        //
        return 1;
    }
	//模拟生成一个运行时异常，为配合测试，也可以改成已检查异常
    private void randomException() {
        int i = (int)(Math.random() * 100);
        if(i % 2 == 0) {
            throw new RuntimeException("随机异常...");
        }
    }
}
```

#### 单元测试【基于junit或testng做单元测试】

```java
package com.springdemo.tx.dao;

import com.springdemo.tx.entity.Account;
import com.springdemo.tx.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class AccountServiceTest extends AbstractTestNGSpringContextTests {
    @Autowired
    private AccountService accountService;
    @Test
    public void testWithdraw() {
        Account a = new Account();
        a.setId(1);
        //
        int result = accountService.withdraw(a, 1300);
        if(result == 1) {
            System.out.println("取钱成功");
        } else {
            System.out.println("取钱失败");
        }
    }
    @Test
    public void testTransfer() {
        Account from = new Account();
        from.setId(1);
        Account to = new Account();
        to.setId(2);
        //
        int result = accountService.transfer(from, to, 200);
        //
        if(result == 1) {
            System.out.println("转帐成功");
        } else {
            System.out.println("转帐失败");
        }
    }
}
```

### xml配置申明式事务

> 在`applicationContext.xml`中做如下配置.
> **applicationContext.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-4.3.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx-4.3.xsd">
	<!-- 指定要扫描的基包 -->
    <context:component-scan base-package="com.springdemo.tx"/>
    <!-- 引入外部的属性文件 -->
    <context:property-placeholder location="classpath:db.properties"/>
    <!-- 配置DataSource的Bean -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${driverClassName}"/>
        <property name="url" value="${url}"/>
        <property name="password" value="${password}"/>
        <property name="username" value="${username}"/>
        <property name="initialSize" value="${initialSize}" />
    </bean>
    <!-- 配置JdbcTemplate, 为Dao使用 -->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <!-- 配置事务管理器: 为申明式事务 使用 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <!-- 指定事务切面 -->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <!-- 根据方法名来切入是否需要织入事务 -->
            <tx:method name="save" isolation="READ_COMMITTED" propagation="REQUIRED"/>
            <tx:method name="update" isolation="READ_COMMITTED" propagation="REQUIRED" timeout="-1"/>
            <!-- 业务方法 -->
            <tx:method name="transfer" isolation="READ_COMMITTED" propagation="REQUIRED"/>
            <!-- 支持方法名通配 -->
            <tx:method name="find*" read-only="true"/>
            <tx:method name="get*" read-only="true"/>
        </tx:attributes>
    </tx:advice>
    <!-- 通过aop把事务切面织入到目标类中 -->
    <aop:config>
        <aop:pointcut id="txServicePointCut" expression="execution(* com.springdemo.tx.service.*.*(..))"/>
        <aop:advisor advice-ref="txAdvice" pointcut-ref="txServicePointCut"/>
    </aop:config>
</beans>
```

注：db.properties 文件此处不再给出。

### 注解配置申明式事务

> 注解配置相比xml配置来说，只需要把`applicationContext.xml`文件中的事务切面和AOP织入部份去掉，然后，加上`<tx:annotation-driven transaction-manager="transactionManager"/>`这句话 来启动事务注解。
> 现在，我们修改后的 applicationContext.xml如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-4.3.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx-4.3.xsd">
	<!-- 指定要扫描的基包 -->
    <context:component-scan base-package="com.springdemo.tx"/>
    <!-- 引入外部的属性文件 -->
    <context:property-placeholder location="classpath:db.properties"/>
    <!-- 配置DataSource的Bean -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${driverClassName}"/>
        <property name="url" value="${url}"/>
        <property name="password" value="${password}"/>
        <property name="username" value="${username}"/>
        <property name="initialSize" value="${initialSize}" />
    </bean>
    <!-- 配置JdbcTemplate, 为Dao使用 -->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    <!-- 配置事务管理器: 为申明式事务 使用 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
	<!-- 启用事务注解 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>
    <!-- 启动AOP -->
    <aop:aspectj-autoproxy/>
</beans>
```

然后，在你要添加事务的Dao实现类或业务实现类中，使用@Transactional 注解即可，这个注解也可以添加在方法上面，用法介绍如下：

#### @Transactional注解

![图示](/images/spring/transactional.png)

**用法**

> @Transactional 可以作用于接口、接口方法、类以及类方法上。当作用于类上时，该类的所有 public 方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。
> 虽然 @Transactional 注解可以作用于接口、接口方法、类以及类方法上，但是 Spring 建议不要在接口或者接口方法上使用该注解，因为这只有在使用基于接口的代理时它才会生效。另外， @Transactional 注解应该只被应用到 public 方法上，这是由 Spring AOP 的本质决定的。如果你在 protected、private 或者默认可见性的方法上使用 @Transactional 注解，这将被忽略，也不会抛出任何异常。

**上面的例子可以改写为**

```java
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountDao accountDao;
 	@Override
 	//直接在需要添加事务的方法上使用注解即可，这样xml的配置就可以大大简化
    @Transactional(
            isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRED,
            readOnly = false,
            timeout = -1,
            rollbackFor = {RuntimeException.class,Error.class}
    )
    public int transfer(Account from, Account to, double money) {
        //首先，判断源帐户是否存在
        Account fromAcct = accountDao.findById(from.getId());
        if(fromAcct == null) {
            System.out.println("源帐户不存在");
            return -1;
        }
        //其次，判断目标帐户是否存在
        Account targetAcct = accountDao.findById(to.getId());
        if(targetAcct == null) {
            System.out.println("目标帐户不存在.");
            return -1;
        }
        //最后，再判断源帐户的余额是否足够
        if(fromAcct.getBalance() < money) {
            System.out.println("源帐户余额不足.");
            return -1;
        }
        //执行业务: 更新源帐户
        fromAcct.setBalance(fromAcct.getBalance() - money);
        accountDao.update(fromAcct);

        //模拟一个随机异常
        randomException();

        //更新目标帐户
        targetAcct.setBalance(targetAcct.getBalance() + money);
        accountDao.update(targetAcct);

        //
        return 1;
    }

    private void randomException() {
        int i = (int)(Math.random() * 100);
        if(i % 2 == 0) {
            throw new RuntimeException("随机异常...");
        }
    }

}
```

### 小结

> 建议启用注解的方式来使用申明式事务