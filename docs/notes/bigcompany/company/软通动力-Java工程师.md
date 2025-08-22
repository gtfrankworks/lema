---
title: '软通动力-Java工程师'
createTime: 2025/08/21 14:10:05
permalink: /bigcompany/wm34b8w8/
---
# Java 并发、Spring、HTTP、Linux 面试题详细答案

### 1、锁可以锁在哪里？

Java 为程序加锁主要有两种方式：synchronized 与 Lock。

**synchronized 可以修饰的范围**：

* **非静态方法**：加对象锁（每个对象实例一个锁）
* **静态方法**：加类锁（类级别锁，所有对象共享）
* **代码块**：可以选择锁对象或类锁

**Lock 接口使用方法**：

* `lock()`：加锁
* `unlock()`：释放锁

Lock 相比 synchronized 更灵活，可以实现公平锁、中断锁等高级功能。

### 2、怎么利用反射获取类中的对象？

1. 获取 Class 对象：`Class<?> clazz = Class.forName("类名");` 或 `类名.class`
2. 获取构造方法：`Constructor<?> constructor = clazz.getConstructor(参数类型列表);`
3. 创建对象实例：`Object obj = constructor.newInstance(参数列表);`

### 3、HTTP 和 HTTPS 区别

1. **传输安全性**：HTTP 明文传输，HTTPS 加密传输（SSL/TLS）
2. **证书要求**：HTTPS 需要 CA 颁发证书
3. **连接速度**：HTTP 建立连接快，HTTPS 因 SSL 握手慢
4. **端口不同**：HTTP 80，HTTPS 443
5. **服务器资源消耗**：HTTPS 相比 HTTP 更高，因加密解密操作

### 4、TCP/IP 协议

1. TCP/IP 是协议簇，开放标准，独立于硬件和操作系统
2. 广泛应用于局域网、广域网和互联网
3. 使用统一的网络地址方案，每台设备有唯一 IP
4. 提供高可靠性服务，确保数据正确传输

### 5、AOP 和 IOC 的应用

**IOC（控制反转）**：主要通过 BeanFactory 接口及其实现类来实现，例如 Spring 容器管理 Bean 的生命周期和依赖注入

**AOP（面向切面编程）**：应用于日志记录、权限验证、事务管理等横切关注点

### 6、Spring 中 Bean 是否线程安全

1. **单例 Bean（默认）**：所有线程共享一个实例，如果 Bean 无状态，则线程安全；有状态 Bean 可能出现线程安全问题，可使用 ThreadLocal 或加锁
2. **原型 Bean（scope="prototype"）**：每次创建新实例，线程之间互不共享，自然线程安全

### 7、Maven 中 package 与 install 的区别

* **package**：编译项目并打包成 jar/war 文件，放在 target 目录
* **install**：将 package 生成的包安装到本地仓库（\~/.m2/repository），供其他项目依赖

### 8、常用设计模式

1. 单例模式（Singleton）
2. 工厂模式（Factory）
3. 抽象工厂模式（Abstract Factory）
4. 观察者模式（Observer）
5. 代理模式（Proxy）
6. 策略模式（Strategy）
7. 模板方法模式（Template Method）

### 9、简单工厂与抽象工厂区别

* **简单工厂**：由一个工厂类根据参数创建不同对象，工厂类固定
* **抽象工厂**：提供接口创建一系列相关或相互依赖的对象，工厂接口可多种实现

### 10、常用 Linux 基本操作命令

* 文件与目录：`ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`
* 文件查看：`cat`, `less`, `more`, `tail`, `head`
* 权限管理：`chmod`, `chown`
* 查找：`find`, `grep`
* 进程管理：`ps`, `top`, `kill`
* 压缩与解压：`tar`, `gzip`, `zip`, `unzip`
* 网络操作：`ping`, `netstat`, `ifconfig`, `curl`, `wget`

### 11、ConcurrentHashMap 扩容机制

1. ConcurrentHashMap 采用分段锁（JDK1.7）或 Node 数组 + CAS + synchronized（JDK1.8）
2. 当链表长度超过阈值时（TREEIFY\_THRESHOLD），链表会转化为红黑树
3. 扩容时，会创建新数组，将原数组中的元素重新哈希并迁移到新数组，迁移过程中使用 CAS 保证线程安全
