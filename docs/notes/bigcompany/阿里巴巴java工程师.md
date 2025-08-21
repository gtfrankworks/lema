---
title: 阿里巴巴java工程师
createTime: 2025/08/21 12:40:09
permalink: /bigcompany/504kbuwq/
---
### 1.int a=10是原子操作吗？

是的。

注意点：

i++(或++i)是非原子操作，i++是一个多步操作，而且是可以被中断的。i++可以被分割成3步，第一步读取i的值，第二步计算i+1；第三部将最终值赋值给i。

 * int a = b;不是原子操作。从语法的级别来看，这是也是一条语句，是原子的；但是从实际执行的二进制指令来看，由于现代计算机CPU架构体系的限制，数据不可以直接从内存搬运到另外一块内存，必须借助寄存器中断，这条语句一般对应两条计算机指令，即将变量b的值搬运到某个寄存器（如eax）中，再从该寄存器搬运到变量a的内存地址：

```
mov eax, dword ptr b  
mov dword ptr a, eax 
```

既然是两条指令，那么多个线程在执行这两条指令时，某个线程可能会在第一条指令执行完毕后被剥夺CPU时间片，切换到另外一个线程而产生不确定的情况。

### 2.innodb支持全文索引吗？

5.6版本之后InnoDB存储引擎开始支持全文索引，5.7版本之后通过使用ngram插件开始支持中文。之前仅支持英文，因为是通过空格作为分词的分隔符，对于中文来说是不合适的。MySQL允许在char、varchar、text类型上建立全文索引。

### 3.innodb支持表锁吗？

支持，补充：普通的增删改 是表锁，加入索引的增删改是行锁，执行查询时不加任何锁的。

### 4.HTTP短连接怎么变成长连接。

在header中加入 --Connection:keep-alive。

### 5.调用yeild（）会阻塞吗？

阻塞指的是暂停一个线程的执行以等待某个条件发生（如某资源就绪）。

yield() 方法：yield() 使得线程放弃当前分得的 CPU 时间，但是不使线程阻塞，即线程仍处于可执行状态，随时可能再次分得 CPU 时间。调用 yield() 的效果等价于调度程序认为该线程已执行了足够的时间从而转到另一个线程。yield()只是使当前线程重新回到可执行状态，所以执行yield()的线程有可能在进入到可执行状态后马上又被执行。sleep()可使优先级低的线程得到执行的机会，当然也可以让同优先级和高优先级的线程有执行的机会；yield()只能使同优先级的线程有执行的机会。

### 6.虚拟机栈是线程共享的吗？

不是。

JVM初始运行的时候都会分配好 Method Area（方法区） 和Heap（堆） ，而JVM 每遇到一个线程，就为其分配一个 Program Counter Register（程序计数器） , VM Stack（虚拟机栈）和Native Method Stack （本地方法栈）， 当线程终止时，三者（虚拟机栈，本地方法栈和程序计数器）所占用的内存空间也会被释放掉。这也是为什么我把内存区域分为线程共享和非线程共享的原因，非线程共享的那三个区域的生命周期与所属线程相同，而线程共享的区域与JAVA程序运行的生命周期相同，所以这也是系统垃圾回收的场所只发生在线程共享的区域（实际上对大部分虚拟机来说只发生在Heap上）的原因。

栈区:

每个线程包含一个栈区，栈中只保存基础数据类型的值（比如int i=1中1就是基础类型的对象）和对象的引用以及基础数据的引用

每个栈中的数据(基础数据类型和对象引用)都是私有的，其他栈不能访问。

栈分为3个部分：基本类型变量区、执行环境上下文、操作指令区(存放操作指令)。

堆区:

存储的全部是对象，每个对象都包含一个与之对应的class的信息。(class的目的是得到操作指令)
jvm只有一个堆区(heap)被所有线程共享，堆中不存放基本类型和对象引用，只存放对象本身 。

方法区:

又叫静态区，跟堆一样，被所有的线程共享。方法区包含所有的class和static变量。

方法区中包含的都是在整个程序中永远唯一的元素，如class，static变量。（两者区别为堆区存放new出来的对象信息,方法区存放本身就具有的类信息）

### 7.常量存放在JVM的那个区域？

方法区: 又叫静态区，跟堆一样，被所有的线程共享。它用于存储已经被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。

window.postMessage() 方法可以安全地实现跨源通信。通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），以及主机 (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。

### 8.所有的对象都分配到堆中吗？

答：不一定。

### 9.CopyOnWriteArrayList是线程安全的吗？

答：是的。

CopyOnWriteArrayList使用了一种叫写时复制的方法，当有新元素添加到CopyOnWriteArrayList时，先从原有的数组中拷贝一份出来，然后在新的数组做写操作，写完之后，再将原来的数组引用指向到新数组。创建新数组，并往新数组中加入一个新元素,这个时候，array这个引用仍然是指向原数组的。​​​​​​​当元素在新数组添加成功后，将array这个引用指向新数组。

CopyOnWriteArrayList的整个add操作都是在锁的保护下进行的。这样做是为了避免在多线程并发add的时候，复制出多个副本出来,把数据搞乱了，导致最终的数组数据不是我们期望的。

```
public boolean add(E e) {
    //1、先加锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object elements = getArray();
        int len = elements.length;
        //2、拷贝数组
        Object newElements = Arrays.copyOf(elements, len + 1);
        //3、将元素加入到新数组中
        newElementslen = e;
        //4、将array引用指向到新数组
        setArray(newElements);
        return true;
    } finally {
        //5、解锁
        lock.unlock();
    }
}
```

由于所有的写操作都是在新数组进行的，这个时候如果有线程并发的写，则通过锁来控制，如果有线程并发的读，则分几种情况：

如果写操作未完成，那么直接读取原数组的数据；

如果写操作完成，但是引用还未指向新数组，那么也是读取原数组数据；

如果写操作完成，并且引用已经指向了新的数组，那么直接从新数组中读取数据。

可见，CopyOnWriteArrayList的读操作是可以不用加锁的。

CopyOnWriteArrayList 有几个缺点：

由于写操作的时候，需要拷贝数组，会消耗内存，

如果原数组的内容比较多的情况下，可能导致young gc或者full gc

不能用于实时读的场景，像拷贝数组、新增元素都需要时间，


所以调用一个set操作后，读取到数据可能还是旧的,

虽然CopyOnWriteArrayList 能做到最终一致性,但是还是没法满足实时性要求；

CopyOnWriteArrayList 合适读多写少的场景，不过这类慎用

因为谁也没法保证CopyOnWriteArrayList 到底要放置多少数据，

万一数据稍微有点多，每次add/set都要重新复制数组，这个代价实在太高昂了。

在高性能的互联网应用中，这种操作分分钟引起故障。

CopyOnWriteArrayList透露的思想

读写分离，读和写分开
最终一致性
使用另外开辟空间的思路，来解决并发冲突​​​​​​​

### 10.数组越界问题

一般来讲我们使用时，会用一个线程向容器中添加元素，一个线程来读取元素，而读取的操作往往更加频繁。写操作加锁保证了线程安全，读写分离保证了读操作的效率，简直完美。

如果这时候有第三个线程进行删除元素操作，读线程去读取容器中最后一个元素，读之前的时候容器大小为i，当去读的时候删除线程突然删除了一个元素，这个时候容器大小变为了i-1，读线程仍然去读取第i个元素，这时候就会发生数组越界。

测试一下，首先向CopyOnWriteArrayList里面塞10000个测试数据，启动两个线程，一个不断的删除元素，一个不断的读取容器中最后一个数据。

```
public void test(){

    for(int i = 0; i<10000; i++){
        list.add("string" + i);
    }

    new Thread(new Runnable() {
        @Override
        public void run() {
            while (true) {
                if (list.size() > 0) {
                    String content = list.get(list.size() - 1);
                }else {
                    break;
                }
            }
        }
    }).start();

    new Thread(new Runnable() {
        @Override
        public void run() {
            while (true) {
                if(list.size() <= 0){
                    break;
                }
                list.remove(0);
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }).start();
 }

```

### 11. Java接口可以多继承吗？

**答：可以。**
 Java接口支持多继承，一个接口可以继承多个接口，例如：

```
interface A {}
interface B {}
interface C extends A, B {}
```

------

### 12. `(byte)300 == (byte)100 + (short)200`?

**答：`false`**
 解释：

- `(byte)300` → 300 % 256 = 44
- `(byte)100 + (short)200` → 100 + 200 = 300 → 自动类型提升为 `int`，300 ≠ 44
   所以结果是 `false`。

------

### 13. 操作系统具有进程管理、存储管理、文件管理和设备管理的功能，下列描述哪项不正确？（A）

**答：具体选项未给出，但不正确的描述一般是“操作系统不能管理硬件或不属于OS核心功能”的。**
 核心功能包括：进程管理、内存管理、文件系统管理、设备管理和安全管理。

------

### 14. `this` 和 `super` 正确的是（C）：

**答：**

- `this` 表示当前对象引用，可用于调用成员变量、方法、构造器。
- `super` 表示父类引用，可用于访问父类被覆盖的变量或方法，也可调用父类构造器。
   常见正确用法：

```
class Parent {
    int a;
    void show() {}
}

class Child extends Parent {
    int a;
    void show() {
        super.show(); // 调用父类方法
        System.out.println(super.a); // 调用父类成员变量
    }
}
```

------

### 15. 引用计数法是 JVM GC 算法吗？

**答：不是。**

- JVM 中常用的垃圾回收算法是 **标记-清除**、**标记-整理**、**复制算法**、**分代收集**等。
- **引用计数法**存在循环引用问题，不被 HotSpot JVM 使用。

------

### 16. 能在 `try{}catch(){}finally{}` 的 finally 中再次抛出异常吗？

**答：能，但会覆盖 try/catch 中的异常**
 示例：

```
try {
    int a = 1 / 0;
} catch(Exception e) {
    System.out.println("catch");
} finally {
    throw new RuntimeException("finally exception");
}
```

- 输出：程序抛出 finally 的异常，原来的异常被覆盖。

------

### 17. HTTP/2 新特性

- 二进制分帧（Binary Framing）
- 多路复用（Multiplexing）
- 头部压缩（HPACK）
- 服务器推送（Server Push）
- 请求优先级（Stream Priority）

------

### 18. 索引可以将随机 IO 变成顺序 IO 吗？

**答：不能完全转化，但可以优化 IO 访问**

- 索引可以减少磁盘扫描范围，但数据实际在磁盘上仍可能是随机分布，顺序访问不能保证。

------

### 19. `transient` 修饰的变量是临时变量吗？

**答：不是临时变量**

- `transient` 修饰的变量在序列化时不会被持久化。
- 作用是告诉 JVM **不要序列化该字段**。

------

### 20. 高、中、低三级调度

- **高级调度（长程调度）**：决定哪些作业进入内存（Job → Ready Queue）
- **中级调度（中程调度）**：在内存与外存之间调度（挂起/唤醒进程）
- **低级调度（短程调度）**：CPU 调度，决定哪个进程获得 CPU

------

### 21. TCP 第四次挥手后为什么要等待 2MSL？

- **MSL（Maximum Segment Lifetime）** 是 TCP 报文的最长生存时间
- 等待 2MSL 是为了确保 **最后的 ACK 报文能被对方收到**，并保证网络中不存在旧的重复报文影响新连接。

------

### 22. 进程状态及简述

常见状态：

- **新建（New）**：进程正在创建
- **就绪（Ready）**：等待 CPU 分配
- **运行（Running）**：CPU 正在执行
- **阻塞/等待（Blocked/Waiting）**：等待 I/O 或事件
- **终止（Terminated）**：进程执行完毕

------

### 23. 创建 NIO 客户端代码

```
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

public class NIOClient {
    public static void main(String[] args) throws Exception {
        SocketChannel socketChannel = SocketChannel.open();
        socketChannel.connect(new InetSocketAddress("localhost", 8080));
        socketChannel.configureBlocking(false);

        ByteBuffer buffer = ByteBuffer.wrap("Hello NIO Server".getBytes());
        socketChannel.write(buffer);
        buffer.clear();

        socketChannel.close();
    }
}
```

------

### 24. 获取一个类的 class 实例的方法

1. **通过类名的 `.class` 获取**：

```
Class<String> c1 = String.class;
```

1. **通过对象的 `getClass()` 获取**：

```
String s = "hello";
Class<?> c2 = s.getClass();
```

1. **通过 `Class.forName()` 获取**：

```
Class<?> c3 = Class.forName("java.lang.String");
```

1. **通过类加载器获取**：

```
ClassLoader loader = Thread.currentThread().getContextClassLoader();
Class<?> c4 = loader.loadClass("java.lang.String");
```

------