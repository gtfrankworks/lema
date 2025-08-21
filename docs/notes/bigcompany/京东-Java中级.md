---
title: 京东-Java中级
createTime: 2025/08/21 13:25:17
permalink: /bigcompany/zpz0w2hc/
---
- ### **1、哪些情况下的对象会被垃圾回收机制处理掉？**

  - JVM 使用 **可达性分析算法**（Reachability Analysis）判定对象是否可回收。
  - **GC Roots** 是起点，虚拟机从 GC Roots 出发沿着引用链寻找对象，如果某对象 **无法被 GC Roots 到达**，就认为该对象可以回收。
  - 典型回收场景：
    1. 局部变量引用超出作用域
    2. 对象被显式置为 null
    3. 对象只在弱引用、软引用、虚引用下被引用

  ------

  ### **2、哪些对象可以被看做是 GC Roots？**

  1. **虚拟机栈**中本地变量表引用的对象（栈帧里的引用）。
  2. **方法区**中的类静态属性和常量引用的对象。
  3. **本地方法栈**中 JNI（Native 方法）引用的对象。

  ------

  ### **3、对象不可达，一定会被垃圾收集器回收么？**

  - 不一定。对象不可达后，如果实现了 **`finalize()` 方法**，可能先进入 **F-Queue（finalize 队列）**，等待 JVM 调用。
  - 只有 finalize 执行完成后，才会被真正回收。
  - 因此对象还有一次“逃生机会”，也叫 **终结逃逸**。

  ------

  ### **4、讲一下常见编码方式**

  - **目的**：将字符映射成计算机可存储的二进制。
  - **常见编码**：
    1. **ASCII**：7 位，128 个字符，控制字符 0-31，打印字符 32-126。
    2. **ISO-8859-1**：扩展 ASCII，256 个字符，覆盖大部分西欧语言。
    3. **GB2312**：双字节，符号区 A1-A7，汉字区 B0-B7，共 6763 个汉字。
    4. **GBK**：扩展 GB2312，编码范围 8140-FEFE，能表示 21003 个汉字。
    5. **UTF-16**：固定 2 字节表示 Unicode 字符。
    6. **UTF-8**：变长编码，1~6 字节表示字符，节约空间并兼容 ASCII。

  ------

  ### **5、UTF-8 编码中的中文占几个字节？int 类型占几个字节？**

  - **UTF-8 中文**：通常占 **3 个字节**（少数特殊字符 2 或 4 字节）。
  - **int 类型**：固定 **4 个字节**。

  ------

  ### **6、静态代理与动态代理的区别及使用场景**

  - **概念**：代理模式为对象提供代理，以控制对真实对象的访问，实现解耦。

  | 特性     | 静态代理           | 动态代理                      |
  | -------- | ------------------ | ----------------------------- |
  | 创建时间 | 编译时             | 运行时                        |
  | 是否固定 | 固定代理类         | 可代理多个类                  |
  | 实现方式 | 手动或工具生成     | 反射 + Proxy                  |
  | 场景     | 单一对象、简单控制 | Spring AOP、Retrofit 接口调用 |

  **动态代理实现步骤**：

  1. 实现 `InvocationHandler` 接口
  2. 使用 `Proxy.newProxyInstance()` 创建代理对象
  3. 利用反射获取构造函数并实例化代理

  ------

  ### **7、Java 的异常体系**

  - **Throwable**：所有异常/错误的父类。
    - **Error**（不可处理）：OOM、ThreadDeath 等，JVM 通常终止程序。
    - **Exception**（可处理）：
      - **运行时异常 RuntimeException**：NullPointerException、IndexOutOfBoundsException。
      - **非运行时异常 Checked Exception**：IOException、SQLException、FileNotFoundException。

  ------

  ### **8、解析与分派**

  - **解析**：编译期或类加载阶段就确定的方法调用地址（静态）。
  - **分派**：运行期根据对象实际类型调用方法（动态）。
    - **静态分派**：方法重载，根据参数静态类型决定调用版本。
    - **动态分派**：方法重写，根据对象实际类型决定调用版本。

  ------

  ### **9、修改对象 A 的 equals 方法签名，HashMap 会调用哪个 equals 方法？**

  - HashMap 调用的是 **对象当前的 equals 方法**。
  - 如果 equals 没有重写，则使用 Object 的 equals（== 比较引用地址）。

  ------

  ### **10、Java 实现多态的机制**

  - **多态实现依赖**：方法重写 + 动态分派（虚方法表）。
  - **原理**：运行期根据对象实际类型在虚方法表中找到方法实现并调用。

  ------

  ### **11、如何将一个 Java 对象序列化到文件？**

  ```
  import java.io.*;
  
  class Person implements Serializable { 
      String name; 
      int age; 
  }
  
  Person p = new Person();
  ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.dat"));
  oos.writeObject(p);
  oos.close();
  ```

  - **要求**：对象类实现 `Serializable` 接口。
  - **应用**：对象持久化、网络传输。

  ------

  ### **12、Java 反射理解**

  - **反射**：程序在运行时获取类信息并操作对象、方法、字段。
  - **用途**：框架、依赖注入、动态代理、序列化等。
  - **例子**：

  ```
  Class<?> clazz = Class.forName("Person");
  Method m = clazz.getMethod("setName", String.class);
  m.invoke(clazz.newInstance(), "Tom");
  ```

  ------

  ### **13、Java 注解理解**

  - **注解**：提供元数据给程序或工具。
  - **用途**：编译检查、运行期处理、代码生成、框架配置。
  - **例子**：

  ```
  @Override
  @Deprecated
  public void oldMethod() {}
  ```

  ------

  ### **14、泛型原理**

  - **原理**：编译期类型检查 + 类型擦除（Type Erasure）
  - **例子**：

  ```
  List<String> list = new ArrayList<>();
  list.add("abc"); // 编译器检查类型
  ```

  - **底层**：泛型信息在编译期使用，运行期擦除成 Object 或边界类型。

  ------

  ### **15、Java 中 String 了解**

  - **特点**：不可变、线程安全、常量池存储
  - **优势**：缓存哈希值、共享字符串、避免数据不一致
  - **例子**：

  ```
  String s1 = "abc";
  String s2 = "abc"; // 引用同一个常量池对象
  ```

  ------

  ### **16、String 为什么设计成不可变？**

  - **安全性**：常量池共享，提高安全性（如 ClassLoader、HashMap key）
  - **效率**：可以缓存 hashCode，提高查找性能
  - **线程安全**：不可变对象天然线程安全
  - **实例共享**：多个变量可共享同一对象，节约内存

