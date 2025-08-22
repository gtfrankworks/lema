---
title: 中软国际-Java初级
createTime: 2025/08/21 13:55:01
permalink: /bigcompany/vig44zrj/
---
### 1、Java 中 `==`、`equals` 和 `hashCode` 的区别

1. **`==`**

   - 基本数据类型：比较值是否相等。

   - 引用类型（对象）：比较内存地址是否相等，即是否指向同一个对象。

   - 示例：

     ```
     int a = 5, b = 5;
     System.out.println(a == b); // true
     
     String s1 = new String("abc");
     String s2 = new String("abc");
     System.out.println(s1 == s2); // false
     ```

2. **`equals()`**

   - 定义在 `Object` 类中，默认比较对象内存地址（引用）。

   - 子类可以重写，用于比较对象的内容是否相等。

   - 示例：

     ```
     String s1 = new String("abc");
     String s2 = new String("abc");
     System.out.println(s1.equals(s2)); // true
     ```

3. **`hashCode()`**

   - 返回对象的哈希码，用于散列结构（如 `HashMap`、`HashSet`）中快速定位对象。
   - 与 `equals()` 配合使用：
     - 如果两个对象相等 (`equals` 返回 true)，它们的 `hashCode` 必须相等。
     - `hashCode` 相等，不一定 `equals` 相等。

4. **`equals` 与 `==` 关系**

   - 对于 `Integer`、`Byte` 等包装类：
     - `-128~127` 范围内的值会缓存，`==` 比较的是值。
     - 超出范围时，`==` 比较的是地址。

------

### 2、`int`、`char`、`long` 各占字节数

| 类型    | 占用字节数 | 默认值   |
| ------- | ---------- | -------- |
| int     | 4          | 0        |
| float   | 4          | 0.0f     |
| short   | 2          | 0        |
| char    | 2          | '\u0000' |
| long    | 8          | 0L       |
| byte    | 1          | 0        |
| boolean | 1          | false    |

- 基本数据类型存放在栈中。
- 包装类存放引用在栈中，值在堆中。

------

### 3、`int` 与 `Integer` 的区别

| 特性         | int          | Integer                  |
| ------------ | ------------ | ------------------------ |
| 类型         | 基本数据类型 | 包装类（引用类型）       |
| 默认值       | 0            | null                     |
| 是否可实例化 | 不需要       | 需要                     |
| 内存存储     | 栈中存储值   | 栈中存储引用，堆中存储值 |

- 自动装箱和拆箱：

  ```
  int a = 10;
  Integer b = a; // 自动装箱
  int c = b;     // 自动拆箱
  ```

------

### 4、Java 多态理解

- **定义**：同一个操作作用于不同对象，产生不同效果。

- **条件**：

  1. 继承
  2. 方法重写（子类重写父类方法）
  3. 父类引用指向子类对象

- **作用**：

  - 降低耦合，提高扩展性。

- **示例**：

  ```
  class Animal {
      void sound() { System.out.println("Animal sound"); }
  }
  class Dog extends Animal {
      void sound() { System.out.println("Dog bark"); }
  }
  
  Animal a = new Dog();
  a.sound(); // Dog bark
  ```

------

### 5、`String`、`StringBuffer`、`StringBuilder` 区别

| 类型          | 可变性 | 线程安全 | 使用场景                       |
| ------------- | ------ | -------- | ------------------------------ |
| String        | 不可变 | 是       | 少量字符串操作                 |
| StringBuffer  | 可变   | 是       | 多线程环境下的字符串操作       |
| StringBuilder | 可变   | 否       | 单线程环境下字符串操作，效率高 |

------

### 6、内部类及作用

- **定义**：在类内部定义的类。
- **作用**：
  1. 实现多重继承效果
  2. 隐藏实现细节，提高封装性
  3. 减少字节码文件大小
- **类型**：
  1. **成员内部类**：非 static，持有外部类引用
  2. **静态内部类**：static，不持有外部类引用
  3. **匿名内部类**：无类名，用于一次性实现接口/抽象类
  4. **局部内部类**：方法或代码块中定义，仅在局部可见

------

### 7、抽象类与接口区别

| 特性        | 抽象类                 | 接口                                       |
| ----------- | ---------------------- | ------------------------------------------ |
| 方法        | 可有抽象方法和普通方法 | 默认抽象方法（Java 8 后可有 default 方法） |
| 成员变量    | 可有任意类型           | public static final                        |
| 继承        | 单继承                 | 多实现                                     |
| 静态方法/块 | 可以                   | 接口静态方法可以，块不可                   |
| 主要作用    | 提供子类通用模板       | 规范方法实现、解耦                         |

- **应用场景**：
  - 抽象类：有通用方法，需要模板功能
  - 接口：定义规则或规范，解耦和可扩展性

------

### 8、泛型中 `extends` 和 `super` 的区别

- `<? extends T>`：上界通配符，读取安全，写入不安全。
- `<? super T>`：下界通配符，写入安全，读取返回 Object 类型。

示例：

```
List<? extends Number> list1 = new ArrayList<Integer>();
Number n = list1.get(0); // 允许读取
// list1.add(10); // 不允许

List<? super Integer> list2 = new ArrayList<Number>();
list2.add(10); // 允许写入
Object o = list2.get(0); // 读取返回 Object
```

------

### 9、父类的静态方法能否被子类重写？静态属性和静态方法继承性

- **静态方法**：不能重写，只能隐藏（方法名相同，调用时依赖引用类型）。
- **静态属性/方法**：可以被子类继承。

示例：

```
class Parent {
    static void staticMethod() { System.out.println("Parent"); }
}
class Child extends Parent {
    static void staticMethod() { System.out.println("Child"); }
}
Parent p = new Child();
p.staticMethod(); // Parent
```

------

### 10、进程与线程区别

| 特性 | 进程           | 线程             |
| ---- | -------------- | ---------------- |
| 定义 | 程序的执行实例 | 进程的执行单元   |
| 内存 | 独立内存空间   | 共享进程内存空间 |
| 创建 | 开销大         | 开销小           |
| 调度 | 系统调度       | 线程调度         |

------

### 11、`final`、`finally`、`finalize` 区别

| 关键字/方法 | 作用                                     |
| ----------- | ---------------------------------------- |
| final       | 修饰类、方法、变量，表示不可变或不可继承 |
| finally     | 异常处理块，保证代码执行                 |
| finalize()  | Object 类方法，对象被垃圾回收前调用      |

------

### 12、`Serializable` 与 `Parcelable` 区别

| 特性     | Serializable    | Parcelable                 |
| -------- | --------------- | -------------------------- |
| 速度     | 慢              | 快                         |
| 可扩展性 | 可继承          | Android 特有，需要实现接口 |
| 使用场景 | Java 对象序列化 | Android Intent/Bundle传递  |

------

### 13、对 Kotlin 的理解

- Kotlin 是一种现代 JVM 语言，兼容 Java。
- 特点：
  1. 空安全（`null` 安全）
  2. 数据类（Data class）减少模板代码
  3. 函数式编程支持
  4. 协程支持高效异步编程

------

### 14、`String` 转 `Integer` 的方式及原理

1. **`Integer.parseInt(String s)`**

   - 转换为基本类型 `int`，若非数字抛 `NumberFormatException`。

   ```
   int i = Integer.parseInt("123");
   ```

2. **`Integer.valueOf(String s)`**

   - 返回 `Integer` 对象，-128~127 会缓存（常用小整数优化）。

   ```
   Integer i = Integer.valueOf("123");
   ```

3. **`new Integer(String s)`**

   - 直接创建新对象，不使用缓存。

   ```
   Integer i = new Integer("123");
   ```

**原理**：

- `parseInt` 使用字符转数字算法逐位计算。
- `valueOf` 内部调用 `parseInt`，然后返回缓存或新对象。
- `new Integer` 每次都创建新对象。