---
title: 百度-Java中级
createTime: 2025/08/21 13:16:37
permalink: /bigcompany/knhzvs96/
---
- ### 1. BeanFactory 和 ApplicationContext 区别

  **BeanFactory**：

  - 可以理解成一个“懒汉式工厂”，只有在你需要对象时才去创建；
  - 提供基本的依赖注入和生命周期管理；
  - 内存占用小，适合轻量级容器。

  **ApplicationContext**：

  - 是 BeanFactory 的增强版，相当于“全能工厂”，在容器启动时就实例化单例 Bean；
  - 除了基本功能，还支持：
    1. 国际化消息（i18n）
    2. 事件监听（ApplicationEvent）
    3. 统一资源访问（properties、XML）
  - 更适合企业级 Web 应用。

  > 类比：BeanFactory 就像一个咖啡机，只在你按按钮时才煮咖啡；ApplicationContext 就像咖啡馆，开门时就准备好了咖啡，还提供糖、奶等附加服务。

  ------

  ### 2. Spring Bean 生命周期

  **生命周期步骤**：

  1. **实例化**：Spring 通过反射创建 Bean 对象。
  2. **依赖注入**：填充对象的属性或调用构造器注入依赖。
  3. **Aware 回调**：
     - `BeanNameAware`：获取 Bean 名称；
     - `BeanFactoryAware`：获取容器实例；
  4. **初始化**：
     - `afterPropertiesSet()`（InitializingBean 接口）；
     - 配置 `init-method`；
     - 注解方式 `@PostConstruct`。
  5. **使用阶段**：Bean 被应用使用。
  6. **销毁阶段**：
     - `DisposableBean.destroy()`；
     - 配置 `destroy-method`；
     - 注解 `@PreDestroy`。

  > 类比：Bean 的生命周期就像开车：造车（实例化）→加油/配件（依赖注入）→检查仪表（Aware 回调）→上路驾驶（使用）→停车拆除（销毁）。

  ------

  ### 3. Spring IOC 实现

  - **核心包**：`org.springframework.beans` + `org.springframework.context`。
  - **流程**：
    1. 读取 Bean 配置（XML / 注解）。
    2. 根据配置实例化 Bean。
    3. 注入依赖（DI）。
    4. 注册回调/生命周期处理。
  - **ApplicationContext** 扩展：
    - 事件监听（EventListener）
    - 国际化
    - 与 AOP 更好集成

  > 本质：IoC 容器负责创建对象、管理依赖、管理生命周期，让开发者只关注业务逻辑。

  ------

  ### 4. Spring AOP

  - **面向切面编程**：将横切关注点（日志、权限、事务）从核心业务逻辑中分离；
  - **组成**：
    1. **切面（Aspect）**：增强逻辑集合；
    2. **切点（Pointcut）**：匹配哪些方法需要增强；
    3. **通知（Advice）**：增强逻辑（前置/后置/环绕）；
    4. **目标对象（Target）**：被增强的类或方法；
  - **用途**：记录日志、性能监控、事务管理、权限检查。

  ------

  ### 5. Spring AOP 实现原理

  - **JDK 动态代理**：
    - 只能代理接口；
    - 核心类：`Proxy` + `InvocationHandler`；
  - **CGLIB 动态代理**：
    - 生成目标类的子类；
    - 目标类不能为 `final`；
  - Spring 会根据目标类是否实现接口自动选择代理方式。

  > 比喻：JDK 代理像是在接口外套一层保护壳；CGLIB 代理像是在类上生成一个子类，继承并增强功能。

  ------

  ### 6. 动态代理（CGLIB 与 JDK）优劣势

  | 类型  | 优点                     | 缺点                         |
  | ----- | ------------------------ | ---------------------------- |
  | JDK   | 内存占用小，接口代理简单 | 只能代理接口                 |
  | CGLIB | 能代理普通类，无需接口   | 占用内存大，final 类不能代理 |

  ------

  ### 7. Spring 事务实现方式

  1. **编程式事务**：

     - 手动控制事务，类似 JDBC 代码：

     ```
     try {
         conn.setAutoCommit(false);
         // 执行业务
         conn.commit();
     } catch (Exception e) {
         conn.rollback();
     }
     ```

  2. **声明式事务**：

     - **XML 配置**：在 XML 中声明事务；
     - **注解方式**：`@Transactional`，可指定传播机制、隔离级别。

  ------

  ### 8. Spring 事务底层原理

  1. **IOC 划分事务单元**：
     - 配置事务管理器、事务属性；
  2. **AOP 拦截目标方法**：
     - `TransactionProxyFactoryBean` 生成代理对象；
     - `TransactionInterceptor` 拦截方法；
  3. **事务处理**：
     - 事务开始 → 执行方法 → 提交 / 回滚；
     - 通过 `PlatformTransactionManager` 完成不同数据源的事务控制。

  > 类比：AOP 拦截像门卫，事务管理器像保险柜，方法执行时先检查锁定状态，执行完再释放。

  ------

  ### 9. 自定义注解实现功能

  ```
  @Target(ElementType.METHOD) // 注解作用于方法
  @Retention(RetentionPolicy.RUNTIME) // 运行时保留
  public @interface LogExecutionTime {
      String value() default "";
  }
  ```

  - **方法限制**：
    - 返回值只能是基本类型、String、Enum、Annotation 或数组；
    - 可以有默认值；
  - **元注解**：
    - `@Target`：限定作用范围
    - `@Retention`：生命周期
    - `@Documented`、`@Inherited`：可选

  > 实际应用：结合 AOP，实现方法执行时间统计、权限检查、日志记录等功能。

  ------

  ### 10. Spring MVC 运行流程

  1. 用户请求 → **DispatcherServlet**
  2. DispatcherServlet 查询 **HandlerMapping** → 找到对应 Controller
  3. Controller 执行业务逻辑 → 返回 **ModelAndView**
  4. DispatcherServlet 调用 **ViewResolver** → 渲染视图
  5. 返回响应给用户

  > 类比：DispatcherServlet 是总调度员，Controller 是执行员，ViewResolver 是画图员，最后返回成品（网页）给客户。

  ------

  ### 12. 为什么选择 Netty

  - 高性能网络框架，异步、事件驱动；
  - 相比原生 NIO：
    - 解决了 epoll / select Bug；
    - 提供内存池、零拷贝；
    - 高并发性能好；
  - 适合 IM、RPC、游戏服务器、HTTP/2。

  ------

  ### 13. Netty 使用场景

  - 游戏服务器（高并发连接）
  - IM / 聊天系统
  - HTTP/HTTPS 服务
  - RPC 框架底层（Dubbo Netty）

  ------

  ### 15. TCP 粘包/拆包

  - **原因**：TCP 是流式协议，没有消息边界，连续发送的数据可能被合并（粘包）或拆开（拆包）；
  - **表现**：
    - 客户端一次读取到多条消息 → 粘包
    - 数据分成多次读取 → 拆包

  ------

  ### 16. TCP 粘包/拆包解决办法

  1. **固定长度**：每条消息固定长度；
  2. **分隔符**：特殊字符标记消息边界；
  3. **消息头 + 长度**：消息前面放长度字段，接收端按长度读取；
  4. **Netty 内置解码器**：
     - `LengthFieldBasedFrameDecoder`
     - `DelimiterBasedFrameDecoder`

  ------

  ### 17. Netty 线程模型

  - **Boss**：负责接收连接，注册到 Worker；
  - **Worker**：处理 I/O 读写事件；
  - **EventLoopGroup**：
    - 一个线程可以处理多个 Channel；
    - 减少线程切换，提高吞吐量。

  ------

  ### 18. Netty 零拷贝

  - **概念**：减少数据从内核态到用户态的复制次数，提高性能；
  - **实现方式**：
    1. **FileRegion / sendfile**：内核直接传输文件数据；
    2. **CompositeByteBuf**：逻辑合并缓冲区，减少内存复制；
    3. **DirectBuffer**：使用直接内存（非 JVM 堆）；
  - **优势**：
    - 提高吞吐量；
    - 减少 CPU 消耗；
    - 适合大文件传输和高并发网络应用。

