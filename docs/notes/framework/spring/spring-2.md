---
title: Spring框架AOP详解
createTime: 2025/08/12 10:57:18
permalink: /framework/spring/92s8dox6/
---
## AOP简介

> 1. AOP(Aspect-Oriented Programming, 面向切面编程): 是一种新的方法论, 是对传统 OOP(Object-Oriented Programming, 面向对象编程) 的补充.
> 2. AOP 的主要编程对象是切面(aspect), 而切面是模块化的横切关注点.
> 3. 在应用 AOP 编程时, 仍然需要定义公共功能, 但可以明确的定义这个功能在哪里, 以什么方式应用, 并且不必修改受影响的类. 这样一来横切关注点就被模块化到特殊的对象(切面)里.
> 4. AOP 的好处:
>
> > 4-1. 每个事物逻辑位于一个位置, 代码不分散, 便于维护和升级
> > 4-2. 业务模块更简洁, 只包含核心业务代码.

## 先来看一个需求

下面是分别定义了一个接口和它的实现类，功能非常简单，实现正整数的加、减、乘、除操作，代码如下：
**CalculateService.java**

```java
package com.springdemo.service;


public interface CalculateService {

    int add(int a, int b);

    int subtract(int a, int b);

    int times(int a, int b);

    int divide(int a, int b);
}
```

**CalculateServiceImpl.java**

```java
package com.springdemo.service.impl;

import com.springdemo.service.CalculateService;
import org.springframework.stereotype.Component;


@Component
public class CalculateServiceImpl implements CalculateService {

    @Override
    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public int subtract(int a, int b) {
        return a - b;
    }

    @Override
    public int times(int a, int b) {
        return a * b;
    }

    @Override
    public int divide(int a, int b) {
        return a / b;
    }
}
```

由于它需要被Spring容器管理，所以，打上了 `@Component`注解.

我们的额外需求是：

>需求1-做日志：在程序执行期间追踪正在发生的活动
>需求2-做验证：希望计算器只能处理正数的运算

**如果我们采用传统的方式，只能在每个方法里面先做参数的验证，然后再进行日志记录，这样不仅代码   ,冗余，而且不利于后期的维护,每个方法在处理核心逻辑的同时还必须兼顾其他多个关注点.**

> 以日志需求为例, 只是为了满足这个单一需求, 就不得不在多个模块（方法）里多次重复相同的日志代码. 如果日志需求发生变化, 必须修改所有模块.

类似于这样：

```java
@Component
public class CalculateServiceImpl implements CalculateService {

	private static final Logger LOGGER = Logger.getLogger(CalculateServiceImpl.class);

    @Override
    public int add(int a, int b) {
    	//先进行参数有效性的验证
    	if(a < 0 || b < 0) {
            System.out.println("参与计算的两个整数有一个为负数: "+a+","+b);
            return -1;
        }
        //做日志
        LOGGER.debug("add操作之前日志...");
        //计算
        int c = a + b;
        LOGGER.debug("add操作之后日志...");
   		//返回
        return c;
    }
    //....
}
```

可以看出，在add方法中插入了验证和日志的功能，但是，此方法的核心只是做加法操作，我们在业务实现时还要考虑一些共性的东西，这显然是不好的一种方式，那如何在不改变业务类实现的基础上，动态添加验证、日志功能呢？

一种比较好的方式是：**使用动态代理解决上述问题 **
代理设计模式的原理: 

> 使用一个代理将对象包装起来, 然后用该代理对象取代原始对象.   
> 任何对原始对象的调用都要通过代理. 代理对象决定是否以及何时将方法调用转到原始对象上.  
> 关于使用程序编写动态代理代码,自己可以去查看相关文档, 我们这里不做介绍.  
> 实际上，Spring 中的AOP就是基于动态代理技术来实现的，下面我们来详细讲解AOP。

## AOP图示

> 我们把上面的需求以图的方式呈现出来，可以清晰地看到共性的操作，把共性的地方抽取出来，模块化成`切面`，然后让这个切面按我们的预期进行工作，这就是AOP的作用。
> ![图示](/images/spring/aop3.png)

上面的图示中，我们抽取出来共性，也就是验证和日志功能，但是，光有这个共性，还是不能够模块化成切面的，它还需要其它的辅助元素才能成为一个切面，下面我们就来看看有哪些元素才能完美地组织起一个切面。

## AOP术语

> ** Aspect = Advice + PointCut **
> 从上面的定义可以看出，切面由Advice和PointCut组成，那什么又是Advice和PointCut呢？

> Advice(通知)-切面必须要完成的工作[从多个组件中抽出的与核心业务逻辑无关的共性代码]也就是切面中要执行的内容，定义了这个切面要做什么？比如：日志、验证、事务等

> PointCut, 就是定义哪些目标方法要加切面，也就是规定了哪些方法的调用会经过切面，当这些目标方法被调用时，才会触发切面的Advice代码被执行，为了进一步细化这个操作，目标方法调用时的切入点又可以细分为：
>
> > 调用之前
> > 调用之后
> > 出现异常
> > 返回之后
> > 环绕， 上面4种的综合体,最强大的一个连接点
> > 5种连接点，而这个连接点就叫 `JoinPoint`

> JoinPoint(连接点)，意思很明显，就是当目标方法执行时，何时执行切面的代码。

所以，我们可以这么理解：
Advice 定义了切面要做什么 【what】
PointCut,定义切面在哪些目标方法上有效  【Where】
JoinPoint, 定义了切面在目标方法的执行何时有效 【When】

> Weave(织入) -另外，Spring 容器在切面元素准备好后，还有一个织入的过程，这个叫 Weave(织入), 也就是容器应用切面的过程，一般无需我们参与。

以上这5个概念是构建整个AOP的基础，必需要理解。

### 注意事项

**注意:Spring目前只支持部分的AspectJ形式的Joinpoint的定义，同时Spring AOP只支持方法级别的JoinPoint**

针对这5种连接点，可以通过如下图示来加强理解

> 图示1:
> ![alt text](/images/spring/aop4.png)
> 图示2:
> ![alt text](/images/spring/aop.png)

### 在Spring 中启用 AspectJ 注解支持

> AspectJ:Java 社区里最完整最流行的 AOP 框架, Spring已集成AspectJ  
> 在 Spring2.0 以上版本中, 可以使用基于 AspectJ的注解或基于 XML 配置的 AOP

下面是xml的配置

```xml
<!-- 
	通过配置织入@Aspectj切面 
	虽然可以通过编程的方式织入切面，但是一般情况下，我们还是使用spring的配置自动完成创建代理织入切面的工作。 
	通过aop命名空间的<aop:aspectj-autoproxy/>声明自动为spring容器中那些配置@aspectJ切面的bean创建代理，织入切面。当然，spring
	在内部依旧采用AnnotationAwareAspectJAutoProxyCreator进行自动代理的创建工作，但具体实现的细节已经被<aop:aspectj-autoproxy 
	/>隐藏起来了 
	<aop:aspectj-autoproxy/>有一个proxy-target-class属性，默认为false，表示使用jdk动态代理织入增强，当配为<aop:aspectj-autoproxy proxy-target-class="true"/>时，表示使用CGLib动态代理技术织入增强。不过即使proxy-target-class设置为false，如果目标类没有声明接口，则spring将自动使用CGLib动态代理。
 -->
 <aop:aspectj-autoproxy /> 
```

如果是使用注解配置，使用

```java
@Configuration
@ComponentScan({"com.springdemo.service","com.springdemo.advice"})
@EnableAspectJAutoProxy //启动AOP自动代理
public class AopConfig {
	//...
}
```

建议是使用注解的方式来使用AOP，我们在本案例中的代码都是采用注解方式进行的。下面我们详细介绍一个这些注解类型。

## AOP 注解详解

先来看看AspectJ提供的注解：

- @org.aspectj.lang.annotation.Aspect 用来修饰Advice类型
- @org.aspectj.lang.annotation.Pointcut 用来定义切入点
- @org.aspectj.lang.annotation.Before   连接点之一，方法调用之前
- @org.aspectj.lang.annotation.After    连接点之一，方法调用之后
- @org.aspectj.lang.annotation.AfterReturning  连接点之一，方法返回后
- @org.aspectj.lang.annotation.AfterThrowing 连接点之一，方法出现异常后
- @org.aspectj.lang.annotation.Around  连接点之一，环绕方法

由于Advice也是一种Bean对象，也要被Spring DI容器所管理，所以，同样需要 @Component 注解

- @org.springframework.stereotype.Component  纳入DI管理之中
- @org.springframework.core.annotation.Order  指定切面的优先级

### 用 AspectJ 注解声明切面

> 非常简单,只需要把这个类型使用 `@Component`和`@Aspect` 来修饰这个类型即可

我们来看一下案例如下：

```java
package com.springdemo.advice;

import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;


@Order(2)
@Component  //要被DI容器所管理
@Aspect  //aspect = advice + pointcut[多个joinpoint]
public class LogAdvice {
	//...
｝
```

### PointCut切入点表达式

1. 利用方法签名编写AspectJ切入点表达式

2. 最典型的切入点表达式时根据方法的签名来匹配各种方法：

　　　　2-1. execution * com.yl.spring.aop.ArithmeticCalculator.*(..):匹配ArithmeticCalculator中声明的所有方法，<br>
		       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 第一个*代表任意修饰符及任意返回值，第二个*代表任意方法，..匹配任意数量的参数。若目标类与接口与切面在同一个包中，可以省略包名。

　　　　2-2. execution public * ArithmeticCalculator.*(..):匹配ArithmeticCalculator接口的所有公有方法

　　　　2-3. execution public double ArithmeticCalculator.*(..):匹配ArithmeticCalculator中返回double类型数值的方法

　　　　2-4. execution public double ArithmeticCalculator.*(double, ..):匹配第一个参数为double类型的方法，..匹配任意数量任意类型的参数

　　　　2-5. execution public double ArithmeticCalculator.*(double, double):匹配参数类型为double，double类型的方法


### 重用切入点定义

1. 在编写 AspectJ 切面时, 可以直接在通知注解中书写切入点表达式. 但同一个切点表达式可能会在多个通知中重复出现.

2. 在 AspectJ 切面中, 可以通过 @Pointcut 注解将一个切入点声明成简单的方法. 切入点的方法体通常是空的, 因为将切入点定义与应用程序逻辑混在一起是不合理的. 

3. 切入点方法的访问控制符同时也控制着这个切入点的可见性. 如果切入点要在多个切面中共用, 最好将它们集中在一个公共的类中. 在这种情况下, 它们必须被声明为 public. 在引入这个切入点时, 必须将类名也包括在内. 如果类没有与这个切面放在同一个包中, 还必须包含包名.

4. 其他通知可以通过方法名称引入该切入点.

### 重用切入点实例

`LogAdvice.java`

~~~java
package com.springdemo.advice;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * 用来做为日志切面的内容，也就是要执行的代码
 */
@Order(2)
@Component  //要被DI容器所管理
@Aspect  //aspect = advice + pointcut[多个joinpoint]
public class LogAdvice {

    private static final Logger LOGGER = Logger.getLogger(LogAdvice.class);

    @Pointcut(value = "execution(public int com.springdemo.service.impl.CalculateServiceImpl.*(..))")
    public void declarationPointCut() {
        // nothing to do

    }

    @Before(value = "declarationPointCut()")
    public void beforeMethod(JoinPoint point) {
        LOGGER.debug("日志切面 -> 开始介入....");
        LOGGER.debug("本次要调用的目标对象:"+point.getTarget());
        LOGGER.debug("本次要调用的目标方法名："+point.getSignature().getName());
        LOGGER.debug("本次要调用的目标方法参数值："+ Arrays.toString(point.getArgs()));
    }

    @After(value = "declarationPointCut()")
    public void afterMethod() {
        LOGGER.debug("日志切面 -> 方法执行结束...");
    }

    @AfterReturning(value = "declarationPointCut()", returning = "obj")
    public void afterReturn(Object obj) {
        LOGGER.debug("日志切面 -> 目标方法返回后, 返回对象结果是："+obj);
    }
}
~~~

## Advice

> 切面要执行的代码所在类型

### 前置通知

1. 前置通知:在方法执行之前执行的通知
2. 前置通知使用 @Before 注解, 并将切入点表达式的值作为注解值
   代码请看`LogAdvice.java`

### 后置通知

1. 后置通知是在连接点完成之后执行的, 即连接点返回结果或者抛出异常的时候, 下面的后置通知记录了方法的终止. 
2. 一个切面可以包括一个或者多个通知.

~~~java
/**
 * 后置通知:在目标方法执行后(无论是否发生异常),执行的通知.
 * 在后置通知中还不能访问目标方法执行的结果.
 */
@After("execution(public int com.springdemo.service.impl.CalculateServiceImpl.*(..))")
public void afterMethod(JoinPoint joinPoint){
	String method = joinPoint.getSignature().getName();
	List<Object> args = Arrays.asList(joinPoint.getArgs());
	System.out.println("The method "+method+" ends with "+args);
}
~~~

### 返回通知

> 无论连接点是正常返回还是抛出异常, 后置通知都会执行. 如果只想在连接点返回的时候记录日志, 应使用返回通知代替后置通知.

~~~java
/**
 * 返回通知在方法返回结果之后执行
 * 返回通知是可以访问方法的返回值的.
 * 在返回通知中, 只要将 returning 属性添加到 @AfterReturning 注解中, 就可以访问连接点的返回值. 该属性的值即为用来传入返回值的参数名称. 
 * 必须在通知方法的签名中添加一个同名参数. 在运行时, Spring AOP 会通过这个参数传递返回值.
 * 原始的切点表达式需要出现在 pointcut 属性中
 */
@AfterReturning(value="execution(public int com.springdemo.service.impl.*.*(..))",
		returning="result")
public void afterRurning(JoinPoint joinPoint,Object result){
	String method = joinPoint.getSignature().getName();
	List<Object> args = Arrays.asList(joinPoint.getArgs());
	System.out.println("The method "+method+" afterRurning with "+args+",结果是:"+result);
}
~~~

### 异常通知

1. 只在连接点抛出异常时才执行异常通知
2. 将 throwing 属性添加到 @AfterThrowing 注解中, 也可以访问连接点抛出的异常.
   Throwable 是所有错误和异常类的超类. 所以在异常通知方法可以捕获到任何错误和异常.
3. 如果只对某种特殊的异常类型感兴趣, 可以将参数声明为其他异常的参数类型. 然后通知就只在抛出这个类型及其子类的异常时才被执行.

~~~java
/**
 * 异常通知，在方法抛出异常之后
 * @param joinPoint
 * @param ex
 * 注意:在目标方法出现异常时会执行代码.
 * 可以访问到异常对象,且可以指定在出现特定异常时再执行通知代码.
 * 比如Excpetion ex写成NullPointException ex的话,就只有当程序
 * 出现空指针异常的话,才会执行.
 */
@AfterThrowing(value="execution(public int com.springdemo.service.impl.*.*(..))",throwing="ex")
public void afterThrowing(JoinPoint joinPoint,Exception ex){
	String method = joinPoint.getSignature().getName();
	List<Object> args = Arrays.asList(joinPoint.getArgs());
	System.out.println("The method "+method+" afterThrowing with "+args+",异常是:"+ex);
}
~~~

### 环绕通知

1. 环绕通知是所有通知类型中功能最为强大的, 能够全面地控制连接点. 甚至可以控制是否执行连接点.
2. 对于环绕通知来说, 连接点的参数类型必须是 ProceedingJoinPoint . 它是 JoinPoint 的子接口, 允许控制何时执行, 是否执行连接点.
3. 在环绕通知中需要明确调用 ProceedingJoinPoint 的 proceed() 方法来执行被代理的方法. 如果忘记这样做就会导致通知被执行了, 但目标方法没有被执行.
4. 注意: 环绕通知的方法需要返回目标方法执行之后的结果, 即调用 joinPoint.proceed(); 的返回值, 否则会出现空指针异常

~~~java
/***********
 * 环绕通知,需要携带ProceedingJoinPoint类型的参数
 * 环绕通知类似于动态代理的全过程:ProceedingJoinPoint这个类型的参数可以决定是否执行目标方法
 * 且环绕通知必须要有返回值,返回值即为目标方法的返回值.
 */
@Around("execution(public int com.springdemo.service.impl.*.*(..))")
public Object aroundMethod(ProceedingJoinPoint pjd){
	Object result= null;
	
	//目标方法的名称
	String methodName = pjd.getSignature().getName();
	
	//执行目标方法
	try {
		//前置通知
		System.out.println("==The method "+methodName+" begin with "+Arrays.asList(pjd.getArgs()));
		result = pjd.proceed();
		//返回通知
		System.out.println("==The method "+methodName+" ends with "+result);
	} catch (Throwable e) {
		//异常通知
		System.out.println("==The method occurs exception:"+e);
		throw new RuntimeException(e);
	}
	//后置通知
	System.out.println("==The method "+methodName+" ends");
	return result;
}
~~~

### 指定切面的优先级

1. 在同一个连接点上应用不止一个切面时, 除非明确指定, 否则它们的优先级是不确定的.
2. 切面的优先级可以通过实现 Ordered 接口或利用 @Order 注解指定.
3. 实现 Ordered 接口, getOrder() 方法的返回值越小, 优先级越高.
4. 若使用 @Order 注解, 序号出现在注解中

~~~java
//使用@Order来指明切面的优先级,值越小,优先级越高
@Order(2)
//把这个类声明为一个切面;需要把该类放入到IOC容器中,再声明为一个切面
@Aspect
@Component
public class LogAdvice {
	//...
}

@Order(3)
@Component
@Aspect
public class ValidationAdvice {
	//..
}
~~~

## 基于XML的AOP配置

> 这个配置是早期的使用方式，现阶段建议使用注解方式。

### 用基于 XML 的配置声明切面

1. 除了使用 AspectJ 注解声明切面, Spring 也支持在 Bean 配置文件中声明切面. 这种声明是通过 aop schema 中的 XML 元素完成的.
2. 正常情况下, 基于注解的声明要优先于基于 XML 的声明. 通过 AspectJ 注解, 切面可以与 AspectJ 兼容, 而基于 XML 的配置则是 Spring 专有的. 由于 AspectJ 得到越来越多的 AOP 框架支持, 所以以注解风格编写的切面将会有更多重用的机会.
3. 当使用 XML 声明切面时, 需要在 beans 根元素中导入 aop Schema
4. 在 Bean 配置文件中, 所有的 Spring AOP 配置都必须定义在 aop:config 元素内部. 对于每个切面而言, 都要创建一个aop:aspect 元素来为具体的切面实现引用后端 Bean 实例. 
5. 切面 Bean 必须有一个标示符, 供 aop:aspect 元素引用

声明切面的实际代码:

~~~xml
<!-- 配置切面bean -->
<bean id="loggingAspect" class="com.spring.aop.LoggingAspect"></bean> 

<!-- 配置切面bean -->
 <bean id="validationAspect" class="com.spring.aop.ValidationAspect"></bean>
 <!-- 配置AOP -->
<aop:config>
	<!-- 配置切面通知 -->
	<aop:aspect id="ValidationAspect" ref="validationAspect" order="1">
		
	</aop:aspect> 
	
	<aop:aspect id="LoggingAspect" ref="loggingAspect" order="2">
		
	</aop:aspect> 
</aop:config> 
~~~

### 声明切入点的示例代码

~~~
<aop:config>
	<!-- 配置切点表达式 ->也是可以写在aop:aspect标签内部的-->
	<!-- 定义切点 -->
	<aop:pointcut expression="execution(* com.spring.dao.impl.*.*(..))" id="mycut"/>
	<!-- 配置切面通知 -->
	<aop:aspect id="ValidationAspect" ref="validationAspect" order="1">
		
	</aop:aspect> 
	
	<aop:aspect id="LoggingAspect" ref="loggingAspect" order="2">
		
	</aop:aspect> 
</aop:config> 
~~~

### 基于 XML ---- 声明通知

1. 在 aop Schema 中, 每种通知类型都对应一个特定的 XML 元素. 
2. 通知元素需要使用 pointcut-ref 来引用切入点, 或用 pointcut 直接嵌入切入点表达式.  method 属性指定切面类中通知方法的名称.

实例代码:

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-4.3.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.3.xsd">
    <bean id="calculateService" class="com.springdemo.service.impl.CalculateServiceImpl"/>
    <!-- Advice也是一种Bean资源 -->
    <bean id="logAdvice" class="com.springdemo.advice.LogAdvice"></bean>
    <bean id="validationAdvice" class="com.springdemo.advice.ValidationAdvice"></bean>
    <!-- 配置AOP -->
    <aop:config>
        <!-- 配置pointcut -->
        <aop:pointcut id="log_pc" expression="execution(public * com.springdemo.service.impl.CalculateServiceImpl.*(..))"></aop:pointcut>
        <!-- 在aspect 中配置具体的连接点[针对 LogAdvice ] -->
        <aop:aspect id="logAdviceAspect" ref="logAdvice" order="1">
            <aop:before method="beforeMethod" pointcut-ref="log_pc"/>
            <aop:after method="afterMethod" pointcut-ref="log_pc"/>
            <aop:after-returning method="afterReturn" pointcut-ref="log_pc" returning="obj"/>
        </aop:aspect>
        <!-- 在aspect 中配置具体的连接点[针对 ValidationAdvice ] -->
        <aop:aspect id="validationAdviceAspect" ref="validationAdvice" order="2">
            <aop:around method="aroundMethod" pointcut-ref="log_pc"/>
        </aop:aspect>
    </aop:config>
</beans>
~~~

