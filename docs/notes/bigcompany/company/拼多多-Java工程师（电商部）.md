---
title: 拼多多-Java工程师（电商部）
createTime: 2025/08/21 13:27:00
permalink: /bigcompany/5maer6mx/
---
### **1、并发编程三要素**

并发编程的核心在于保证程序在多线程环境下执行的正确性和高效性。三要素分别是：

1. **原子性（Atomicity）**
   - 定义：一个操作或一组操作要么全部完成，要么全部不执行，并且在执行过程中不被线程调度打断。
   - 典型例子：自增操作 `i++` 并不是原子操作，因为它包含读取、计算和写入三步。需要使用 `synchronized`、`Lock` 或 `AtomicInteger` 来保证原子性。
2. **可见性（Visibility）**
   - 定义：当一个线程修改共享变量时，其他线程能够立即看到这个修改。
   - 实现方式：
     - `volatile` 关键字
     - `synchronized`/`Lock`（锁释放前会刷新主内存）
     - `final` 字段在构造完成后即可被其他线程安全读取
3. **有序性（Ordering）**
   - 定义：程序执行顺序遵循代码先后顺序，但在多线程环境中可能因为编译器优化、CPU 指令重排而出现“乱序执行”。
   - Java 保证：
     - **happens-before 原则**
     - `volatile` 修饰的变量禁止指令重排
     - synchronized 块保证进入前和退出后内存可见性

------

### **2、实现可见性的方法**

- **synchronized / Lock**：
  - 当线程获取锁时，保证读取的是主内存最新值；释放锁时，会将修改值刷新到主内存。
  - 保证了多个线程对共享变量操作的可见性。
- **volatile**：
  - 保证变量的修改会立即写回主内存，其他线程读取到的是最新值。
  - 注意：volatile 不保证原子性，只保证可见性和禁止指令重排。

------

### **3、多线程的价值**

1. **发挥多核 CPU 优势**
   - 多线程可在多个 CPU 核心上并行执行任务，提高 CPU 利用率。
2. **防止阻塞**
   - 单线程遇到 I/O 或远程调用阻塞时，会导致整个程序停滞。
   - 多线程可以让其它线程继续执行，从而提高程序响应性。
3. **便于建模和分工**
   - 将大任务拆分为多个小任务（任务 B、C、D）分别处理，更清晰、更易管理。
   - 适合复杂业务逻辑或异步任务处理。

------

### **4、创建线程的方式**

Java 提供了四种主流方式：

1. **继承 Thread 类**
2. **实现 Runnable 接口**
3. **实现 Callable 接口 + Future**
4. **通过线程池（ExecutorService）创建**

------

### **5、创建线程方式的对比**

| 方式          | 优势                                       | 劣势                                          | 适用场景                     |
| ------------- | ------------------------------------------ | --------------------------------------------- | ---------------------------- |
| 继承 Thread   | 编写简单，可直接使用 `this` 访问当前线程   | 已继承 Thread 无法再继承其他类                | 简单场景，独立线程任务       |
| 实现 Runnable | 线程与任务分离，可共享资源，可继承其他类   | 编程稍复杂，需要 Thread.currentThread()       | 多线程共享资源场景           |
| 实现 Callable | 可返回值，可抛异常，可结合 Future 获取结果 | 与 Runnable 类似，需要配合线程池或 FutureTask | 需要异步结果、异常处理的场景 |

**Runnable vs Callable**：

- `run()` 无返回值，`call()` 有返回值
- `call()` 可抛异常
- `call()` 配合 `Future` 可获取异步结果

------

### **6、线程状态流转图**

线程的生命周期和五种基本状态：

1. **新建（New）**：`Thread t = new Thread()`
2. **就绪（Runnable）**：调用 `t.start()` 后，线程准备就绪，等待 CPU 调度
3. **运行（Running）**：线程获得 CPU 时间片，执行任务
4. **阻塞（Blocked）**：线程暂时放弃 CPU，等待条件满足
   - **等待阻塞（Waiting）**：执行 `wait()`
   - **同步阻塞（Blocked）**：等待锁
   - **其他阻塞（Timed Waiting）**：执行 `sleep()`、`join()` 或 I/O 操作
5. **死亡（Dead）**：线程执行完任务或异常退出

------

### **7、Java 线程五种状态**

- **新建（New）**：线程对象创建，但未启动
- **就绪（Runnable）**：线程已准备好等待 CPU 调度
- **运行（Running）**：线程正在执行
- **阻塞（Blocked）**：线程等待某个条件或锁
- **死亡（Dead）**：线程完成或异常退出

------

### **8、什么是线程池？**

- **定义**：线程池是提前创建一定数量的线程，用于执行任务，执行完成后线程不销毁，而是等待下一个任务。
- **优点**：
  1. 重用线程，减少创建销毁开销
  2. 控制最大并发线程数，避免资源竞争
  3. 提供定时任务、周期任务、单线程任务执行能力

------

### **9、线程池的四种创建方式**

1. `Executors.newCachedThreadPool()`：可缓存线程池，空闲线程复用
2. `Executors.newFixedThreadPool(n)`：固定大小线程池，限制最大并发数
3. `Executors.newScheduledThreadPool(n)`：支持定时/周期任务
4. `Executors.newSingleThreadExecutor()`：单线程池，顺序执行任务

------

### **10、线程池的优点**

1. **线程复用**：避免频繁创建销毁线程，节省资源
2. **控制并发**：避免线程过多导致 CPU/内存资源竞争
3. **功能丰富**：支持定时任务、周期任务、异步任务执行
4. **提高系统性能**：合理配置线程池可大幅提升系统吞吐量

### 11、常用的并发工具类有哪些？

1. **CountDownLatch**

   - 功能：允许一个或多个线程等待其他线程完成操作后再继续执行。

   - 使用场景：主线程等待多个子任务执行完再继续，例如初始化多个服务后再启动主服务。

   - 示例：

     ```
     CountDownLatch latch = new CountDownLatch(3);
     Runnable task = () -> {
         System.out.println(Thread.currentThread().getName() + " done");
         latch.countDown();
     };
     new Thread(task).start();
     new Thread(task).start();
     new Thread(task).start();
     latch.await(); // 等待三个线程完成
     System.out.println("All tasks completed");
     ```

2. **CyclicBarrier**

   - 功能：一组线程互相等待，直到所有线程都到达屏障点，再同时执行后续操作。

   - 使用场景：模拟多线程并发处理阶段性任务，所有线程完成当前阶段才能进入下一阶段。

   - 示例：

     ```
     CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("All threads ready"));
     Runnable task = () -> {
         System.out.println(Thread.currentThread().getName() + " waiting");
         barrier.await(); // 阻塞直到所有线程调用 await()
     };
     new Thread(task).start();
     new Thread(task).start();
     new Thread(task).start();
     ```

3. **Semaphore**

   - 功能：控制同时访问某资源的线程数量，相当于一个计数器。

   - 使用场景：限流、控制连接池并发访问。

   - 示例：

     ```
     Semaphore semaphore = new Semaphore(2); // 同时允许2个线程访问
     Runnable task = () -> {
         semaphore.acquire();
         try {
             System.out.println(Thread.currentThread().getName() + " acquired");
         } finally {
             semaphore.release();
         }
     };
     ```

4. **Exchanger**

   - 功能：用于两个线程之间交换数据。

   - 使用场景：生产者与消费者交换缓冲数据或中间计算结果。

   - 示例：

     ```
     Exchanger<String> exchanger = new Exchanger<>();
     new Thread(() -> {
         try {
             String data = exchanger.exchange("Data from Thread A");
             System.out.println("Thread A received: " + data);
         } catch (InterruptedException e) {}
     }).start();
     new Thread(() -> {
         try {
             String data = exchanger.exchange("Data from Thread B");
             System.out.println("Thread B received: " + data);
         } catch (InterruptedException e) {}
     }).start();
     ```

------

### 12、CyclicBarrier 和 CountDownLatch 的区别

| 特性     | CountDownLatch           | CyclicBarrier                        |
| -------- | ------------------------ | ------------------------------------ |
| 用途     | 一个线程等待多个线程完成 | 多个线程互相等待                     |
| 计数器   | 一次性                   | 可复用（可 reset()）                 |
| 等待策略 | 主线程等待其他线程完成   | 所有线程等待彼此                     |
| 方法     | countDown(), await()     | await(), reset(), getNumberWaiting() |

------

### 13、synchronized 的作用

- 用于保证线程安全，控制临界区同一时间只有一个线程访问。
- 可加在 **方法** 或 **代码块** 上。
- 关键特点：
  1. 内置锁（对象锁）机制。
  2. 自动释放锁，无需手动 unlock。
  3. 可重入锁，即同一线程可以再次获取锁。

------

### 14、volatile 关键字的作用

- 保证 **可见性**：当一个线程修改变量时，其他线程立即可见。
- 禁止指令重排序优化，保证 **有序性**。
- 不保证原子性，适用于状态标识或配合 CAS 使用。

------

### 15、什么是 CAS

- CAS = Compare And Swap（比较并交换）

- 乐观锁机制：不断尝试更新值，若冲突则自旋重试。

- 示例：

  ```
  AtomicInteger atomicInt = new AtomicInteger(0);
  atomicInt.compareAndSet(0, 1); // 当前值为0时改为1
  ```

- 问题：

  1. **ABA 问题**：0→1→0，CAS无法感知。可用 AtomicStampedReference 解决。
  2. **非原子操作**：CAS保证单个变量原子性，但不保证代码块原子性。
  3. **CPU占用**：自旋可能导致CPU空转。

------

### 16、Future

- 表示异步任务的结果，可以阻塞等待或非阻塞回调获取结果。
- 典型用法：线程池提交任务返回 Future，用 get() 等待结果。

------

### 17、AQS

- AbstractQueuedSynchronizer，底层同步框架。
- 通过 **state + 队列** 管理同步状态，支持多种锁和同步器的实现。
- 常见基于 AQS 的类：ReentrantLock、Semaphore、CountDownLatch、FutureTask。

------

### 18、AQS 支持两种同步方式

1. **独占锁模式（Exclusive）**：一次只允许一个线程占用，比如 ReentrantLock。
2. **共享锁模式（Shared）**：允许多个线程同时占用，如 Semaphore、ReadWriteLock 的读锁。

------

### 19、ReadWriteLock

- 分为读锁和写锁：
  - **读锁**：多个线程可同时持有。
  - **写锁**：一次只允许一个线程持有。
- 使用场景：读多写少的共享资源，提高并发性能。

------

### 20、FutureTask

- 实现 **Runnable + Future** 接口，表示可执行的异步任务。
- 可以：
  1. 放入线程池执行
  2. 获取计算结果
  3. 支持取消任务

------

### 21、synchronized 和 ReentrantLock 的区别

| 特性     | synchronized | ReentrantLock               |
| -------- | ------------ | --------------------------- |
| 语言级别 | JVM          | Java API                    |
| 可重入   | 支持         | 支持                        |
| 公平锁   | 不支持       | 可选支持                    |
| 响应中断 | 不支持       | 支持 lockInterruptibly()    |
| 条件变量 | 不支持       | 支持 Condition 多个等待队列 |

------

### 22、乐观锁和悲观锁

- **乐观锁**：假设冲突少，不加锁，基于 CAS 更新，失败则重试。
- **悲观锁**：假设冲突多，加锁独占资源，其他线程阻塞。

------

### 23、线程 B 怎么知道线程 A 修改了变量

1. volatile 修饰
2. synchronized 同步块
3. wait/notify 通知机制
4. 轮询检查（低效）

------

### 24、synchronized、volatile、CAS 比较

| 特性   | synchronized | volatile | CAS            |
| ------ | ------------ | -------- | -------------- |
| 类型   | 悲观锁       | 可见性   | 乐观锁         |
| 阻塞   | 会阻塞       | 不阻塞   | 不阻塞，自旋   |
| 原子性 | 保证         | 不保证   | 单变量保证     |
| 应用   | 临界区保护   | 状态标志 | 高性能并发计数 |

------

### 25、sleep 与 wait 的区别

| 特性       | sleep    | wait         |
| ---------- | -------- | ------------ |
| 是否释放锁 | 不释放   | 释放对象锁   |
| 所在类     | Thread   | Object       |
| 场景       | 暂停线程 | 线程等待通知 |

------

### 26、ThreadLocal

- 每个线程保存自己的独立变量副本，线程间互不干扰。
- 使用场景：保存用户会话、数据库连接、事务上下文等。
- 实现原理：Thread 内部有 ThreadLocalMap，key 是 ThreadLocal 对象，value 是数据副本。

------

### 27、wait()/notify()/notifyAll() 为什么要在同步块中调用

- 必须先获得对象的监视器（锁），否则 JVM 会抛 IllegalMonitorStateException。
- 原因：wait 会释放锁，notify 会唤醒锁等待队列中的线程。

------

### 28、多线程同步方法

- **方法**：synchronized、Lock、Atomic 类、并发工具类、分布式锁等。
- **选择原则**：简单同步用 synchronized，高性能或可中断、可超时用 ReentrantLock。

------

### 29、线程调度策略

- **优先级调度**：线程优先级高可能先执行。
- **时间片轮转**：线程轮流使用 CPU 时间片，操作系统调度。

------

### 30、ConcurrentHashMap 的并发度

- JDK1.7：通过段（Segment）分段锁，concurrencyLevel 决定段数量，提高并发性能。
- JDK1.8：使用 CAS + 红黑树 + synchronized，concurrencyLevel 不再作为参数。

------

### 31、Linux 查找 CPU 占用最高线程

- 使用 `top -H` 命令显示线程级 CPU 使用情况。
- 或 `ps -eLo pid,tid,pcpu,comm` 查看各线程 CPU。

------

### 32、Java 死锁及避免

- **死锁**：多个线程互相等待对方释放锁，程序无法继续。
- **避免方法**：
  1. 避免嵌套锁
  2. 尝试使用 `tryLock` 带超时
  3. 固定加锁顺序
  4. 使用高层次并发工具类（如 Semaphore、ConcurrentHashMap）

------

### 33、死锁的原因

1. 互斥条件：资源独占
2. 占有并等待：线程持有资源同时等待其他资源
3. 不可剥夺条件：资源不能被强制释放
4. 循环等待条件：线程形成环路等待资源

------

### 34、唤醒阻塞线程

- **Object.notify() / notifyAll()**：唤醒等待该对象的线程
- **Lock + Condition.signal() / signalAll()**
- **中断阻塞线程**：thread.interrupt()

------

### 35、不可变对象对多线程的帮助

- 不可变对象天然线程安全，不需要加锁。
- 示例：`String`、`Integer`、`BigDecimal`。

------

### 36、多线程上下文切换

- CPU 从一个线程切换到另一个线程的过程，保存旧线程状态、恢复新线程状态。
- 代价：寄存器、缓存刷新、内核态切换，过多切换降低性能。

------

### 37、线程池队列满时的处理

- **拒绝策略**：
  1. AbortPolicy（抛出异常）
  2. CallerRunsPolicy（调用者线程执行任务）
  3. DiscardPolicy（丢弃任务）
  4. DiscardOldestPolicy（丢弃最老任务）

------

### 38、Java 线程调度算法

- 主要依赖 **操作系统线程调度**，Java 层无法精确控制。
- JVM 提供优先级调度，但只是调度建议，不保证顺序。

------

### 39、线程调度器和时间分片

- **线程调度器**：操作系统管理线程运行顺序。
- **时间分片**：每个线程分配固定时间片执行，时间片用完轮转到下一个线程。

------

### 40、自旋

- 线程不断循环检查条件而不阻塞，等待资源可用。
- 优点：避免线程挂起、唤醒开销
- 缺点：CPU 占用高

------

### 41、Lock 接口及优势

- 提供比 synchronized 更灵活的锁机制
- 优势：
  1. 可响应中断 lockInterruptibly()
  2. 可尝试获取锁 tryLock()
  3. 支持公平锁
  4. 可绑定多个 Condition 条件队列

------

### 42、单例模式线程安全性

1. **懒汉式** + synchronized：线程安全，但每次获取实例都有锁开销
2. **双重检查 + volatile**：保证线程安全且性能高
3. **静态内部类**：JVM 保证线程安全、懒加载

------

### 43、Semaphore 的作用

- 控制同时访问某资源线程数量
- 用于限流、资源池管理
- 支持公平和非公平策略

------

### 44、Executors 类

- 工具类，创建各种线程池
- 方法：
  1. newCachedThreadPool
  2. newFixedThreadPool
  3. newScheduledThreadPool
  4. newSingleThreadExecutor

------

### 45、线程类构造方法、静态块被哪个线程调用

- **静态块**：由类加载线程执行（JVM 内部线程）
- **构造方法**：由创建该对象的线程执行

------

### 46、同步方法 vs 同步块，哪个更好

- **同步方法**：锁对象是 `this` 或类对象，范围大，容易阻塞
- **同步块**：可指定锁对象，粒度小，推荐使用
- **原则**：尽量使用同步块，锁粒度越小越好

------

### 47、Java 线程数过多可能造成的异常

1. **OutOfMemoryError: unable to create new native thread**
2. 系统调度压力增大，导致 CPU 负载过高
3. 上下文切换频繁，整体性能下降
