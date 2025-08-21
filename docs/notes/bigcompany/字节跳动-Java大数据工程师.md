---
title: 字节跳动-Java大数据工程师
createTime: 2025/08/21 13:12:30
permalink: /bigcompany/4rowqqbv/
---
### 1. 自我介绍+项目介绍

  **自我介绍：**

  > “您好，我叫 **张三**，毕业于 **某某大学**，专业是 **计算机科学与技术**。
  >  我有 **X 年 Java / 大数据开发经验**，熟悉 **Spring/Spring Boot、MySQL、Redis、Kafka、Hadoop/Spark** 等技术栈。
  >  在过去的工作中，我主要负责 **后端系统开发、性能优化、分布式任务调度**，熟悉 **微服务架构和高并发系统设计**。
  >  我对 **大数据处理和系统优化** 有较深入的理解，希望能在贵公司大数据开发岗位充分发挥我的技术能力。”

  ------

  **项目介绍模板：**

  > “我想介绍的是我最近参与的 **订单实时分析系统** 项目。
  >  **项目背景**：公司需要对电商订单进行实时统计和分析，提高营销决策效率。
  >  **我的职责**：
  >
  > 1. 负责 **数据采集和消息队列处理**，使用 **Kafka** 进行订单流入；
  > 2. 使用 **Flink/Spark Streaming** 做实时计算和指标统计；
  > 3. 后端接口开发，提供 **RESTful API** 给前端查询；
  > 4. 数据存储优化，使用 **Redis 缓存热点数据** 提升查询性能。
  >
  > **技术亮点**：
  >
  > - 使用 **Kafka + Flink** 实现高吞吐实时计算；
  > - Redis 缓存 + MySQL 联合优化查询，减少数据库压力；
  > - 使用 **线程池和异步处理** 提高系统并发处理能力。
  >
  > **项目成果**：系统上线后，订单处理延迟从原来的 3 分钟降到 10 秒以内，同时支持每天百万级订单实时统计，系统稳定运行。”


### 2. 为什么用 kafka、sparkstreaming、hbase？有什么替代方案吗？

根据简历中写的项目，谈谈为什么用这几个框架，是公司大数据平台历史选择还是更适合公司业务。

然后在说下每个框架的优点：

Kafka：

高吞吐量、低延迟：kafka 每秒可以处理几十万条消息，它的延迟最低只有几毫秒；

可扩展性：kafka 集群支持热扩展；

持久性、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失；

容错性：允许集群中节点故障（若副本数量为 n,则允许 n-1 个节点故障）；

高并发：支持数千个客户端同时读写。

Kafka 应用场景：

日志收集：一个公司可以用 Kafka 可以收集各种服务的 log，通过 kafka 以统一接口服务的方式开放给各种 consumer；

消息系统：解耦生产者和消费者、缓存消息等；

用户活动跟踪：kafka 经常被用来记录 web 用户或者 app 用户的各种活动，如浏览网页、搜索、点击等活动，这些活动信息被各个服务器发布到 kafka 的 topic 中，然后消费者通过订阅这些 topic 来做实时的监控分析，亦可保存到数据库；

运营指标：kafka 也经常用来记录运营监控数据。包括收集各种分布式应用的数据，生产各种操作的集中反馈，比如报警和报告；

流式处理：比如 spark streaming 和 flink。

Spark Streaming 优点:

spark streaming 会被转化为 spark 作业执行，由于 spark 作业依赖 DAGScheduler 和 RDD，所以是粗粒度方式而不是细粒度方式，可以快速处理小批量数据，获得准实时的特性；
以 spark 作业提交和执行，很方便的实现容错机制；

DStreaming 是在 RDD 上的抽象，更容易与 RDD 进行交互操作。需要将流式数据与批数据结合分析的情况下，非常方便。

因为我们的业务对实时性要求不是特别高，所以使用 spark streaming 是非常合适的。

HBase 优点：

HDFS 有高容错，高扩展的特点，而 Hbase 基于 HDFS 实现数据的存储，因此 Hbase 拥有与生俱来的超强的扩展性和吞吐量。

HBase 采用的是 Key/Value 的存储方式，这意味着，即便面临海量数据的增长，也几乎不会导致查询性能下降。

HBase 是一个列式数据库，相对于于传统的行式数据库而言。当你的单张表字段很多的时候，可以将相同的列(以 regin 为单位)存在到不同的服务实例上，分散负载压力。

有什么替代方案，就可以聊聊和这几个功能类似的框架，它们的优缺点等，比如 Apache kafka 对应的 Apache Pulsar；Spark Streaming 对应的 Flink；HBase 对应的列式数据库可以举几个例子，如 Cassandra、MongoDB 等。

### 3. 你看过 hdfs 源码？nn 的高可用说一下

一个 NameNode 有单点故障的问题，那就配置双 NameNode，配置有两个关键点，一是必须要保证这两个 NN 的元数据信息必须要同步的，二是一个 NN 挂掉之后另一个要立马补上。

元数据信息同步在 HA 方案中采用的是“共享存储”。每次写文件时，需要将日志同步写入共享存储，这个步骤成功才能认定写文件成功。然后备份节点定期从共享存储同步日志，以便进行主备切换。

监控 NN 状态采用 zookeeper，两个 NN 节点的状态存放在 ZK 中，另外两个 NN 节点分别有一个进程监控程序，实施读取 ZK 中有 NN 的状态，来判断当前的 NN 是不是已经 down 机。如果 standby 的 NN 节点的 ZKFC 发现主节点已经挂掉，那么就会强制给原本的 active NN 节点发送强制关闭请求，之后将备用的 NN 设置为 active。

如果面试官再问 HA 中的 共享存储 是怎么实现的知道吗？

可以进行解释下：NameNode 共享存储方案有很多，比如 Linux HA, VMware FT, QJM 等，目前社区已经把由 Clouderea 公司实现的基于 QJM（Quorum Journal Manager）的方案合并到 HDFS 的 trunk 之中并且作为默认的共享存储实现

基于 QJM 的共享存储系统主要用于保存 EditLog，并不保存 FSImage 文件。FSImage 文件还是在 NameNode 的本地磁盘上。QJM 共享存储的基本思想来自于 Paxos 算法，采用多个称为 JournalNode 的节点组成的 JournalNode 集群来存储 EditLog。每个 JournalNode 保存同样的 EditLog 副本。每次 NameNode 写 EditLog 的时候，除了向本地磁盘写入 EditLog 之外，也会并行地向 JournalNode 集群之中的每一个 JournalNode 发送写请求，只要大多数 (majority) 的 JournalNode 节点返回成功就认为向 JournalNode 集群写入 EditLog 成功。如果有 2N+1 台 JournalNode，那么根据大多数的原则，最多可以容忍有 N 台 JournalNode 节点挂掉

注：Hadoop3.x 允许用户运行多个备用 NameNode。例如，通过配置三个 NameNode 和五个 JournalNode，群集能够容忍两个节点而不是一个节点的故障。

### 4. zookeeper 简单介绍一下，为什么要用 zk？zk 的架构？zab？

zk 介绍及功能：

Zookeeper 是一个分布式协调服务的开源框架。 主要用来解决分布式集群中应用系统的一致性问题，例如怎样避免同时操作同一数据造成脏读的问题。

ZooKeeper 本质上是一个分布式的小文件存储系统。提供基于类似于文件系统的目录树方式的数据存储，并且可以对树中的节点进行有效管理。从而用来维护和监控你存储的数据的状态变化。通过监控这些数据状态的变化，从而可以达到基于数据的集群管理。 诸如： 统一命名服务(dubbo)、分布式配置管理(solr 的配置集中管理)、分布式消息队列（sub/pub）、分布式锁、分布式协调等功能。

zk 架构：

Leader:

Zookeeper 集群工作的核心；

事务请求（写操作） 的唯一调度和处理者，保证集群事务处理的顺序性；
集群内部各个服务器的调度者。

对于 create， setData， delete 等有写操作的请求，则需要统一转发给 leader 处理， leader 需要决定编号、执行操作，这个过程称为一个事务。

Follower:

处理客户端非事务（读操作） 请求，

转发事务请求给 Leader；

参与集群 Leader 选举投票 2n-1 台可以做集群投票。

此外，针对访问量比较大的 zookeeper 集群， 还可新增观察者角色。

Observer:

观察者角色，观察 Zookeeper 集群的最新状态变化并将这些状态同步过来，其对于非事务请求可以进行独立处理，对于事务请求，则会转发给 Leader 服务器进行处理。

不会参与任何形式的投票只提供非事务服务，通常用于在不影响集群事务 处理能力的前提下提升集群的非事务处理能力。

简答：说白了就是增加并发的读请求

ZAB 协议全称：Zookeeper Atomic Broadcast（Zookeeper 原子广播协议）。

ZAB 协议是专门为 zookeeper 实现分布式协调功能而设计。zookeeper 主要是根据 ZAB 协议是实现分布式系统数据一致性。

zookeeper 根据 ZAB 协议建立了主备模型完成 zookeeper 集群中数据的同步。这里所说的主备系统架构模型是指，在 zookeeper 集群中，只有一台 leader 负责处理外部客户端的事物请求(或写操作)，然后 leader 服务器将客户端的写操作数据同步到所有的 follower 节点中。


### 5. HBase 的架构，读写缓存？

下面说下HBase 的读写缓存：

HBase 的 RegionServer 的缓存主要分为两个部分，分别是MemStore和BlockCache，其中 MemStore 主要用于写缓存，而 BlockCache 用于读缓存。

HBase 执行写操作首先会将数据写入 MemStore，并顺序写入 HLog，等满足一定条件后统一将 MemStore 中数据刷新到磁盘，这种设计可以极大地提升 HBase 的写性能。

不仅如此，MemStore 对于读性能也至关重要，假如没有 MemStore，读取刚写入的数据就需要从文件中通过 IO 查找，这种代价显然是昂贵的！

BlockCache 称为读缓存，HBase 会将一次文件查找的 Block 块缓存到 Cache 中，以便后续同一请求或者邻近数据查找请求，可以直接从内存中获取，避免昂贵的 IO 操作。

### 6. BlockCache 的底层实现？你提到了 LRU 那除了 LRU 还可以有什么方案？

我们知道缓存有三种不同的更新策略，分别是FIFO（先入先出）、LRU（最近最少使用）和 LFU（最近最不常使用）。

HBase 的 block 默认使用的是 LRU 策略：LRUBlockCache。此外还有 BucketCache、SlabCache（此缓存在 0.98 版本已经不被建议使用）

LRUBlockCache 实现机制：

LRUBlockCache 是 HBase 目前默认的 BlockCache 机制，实现机制比较简单。它使用一个 ConcurrentHashMap 管理 BlockKey 到 Block 的映射关系，缓存 Block 只需要将 BlockKey 和对应的 Block 放入该 HashMap 中，查询缓存就根据 BlockKey 从 HashMap 中获取即可。

同时该方案采用严格的 LRU 淘汰算法，当 Block Cache 总量达到一定阈值之后就会启动淘汰机制，最近最少使用的 Block 会被置换出来。在具体的实现细节方面，需要关注几点：

缓存分层策略

HBase 在 LRU 缓存基础上，采用了缓存分层设计，将整个 BlockCache 分为三个部分：single-access、mutil-access 和 inMemory。

需要特别注意的是，HBase 系统元数据存放在 InMemory 区，因此设置数据属性 InMemory = true 需要非常谨慎，确保此列族数据量很小且访问频繁，否则有可能会将 hbase.meta 元数据挤出内存，严重影响所有业务性能。

LRU 淘汰算法实现

系统在每次 cache block 时将 BlockKey 和 Block 放入 HashMap 后都会检查 BlockCache 总量是否达到阈值，如果达到阈值，就会唤醒淘汰线程对 Map 中的 Block 进行淘汰。

系统设置三个 MinMaxPriorityQueue 队列，分别对应上述三个分层，每个队列中的元素按照最近最少被使用排列，系统会优先 poll 出最近最少使用的元素，将其对应的内存释放。可见，三个分层中的 Block 会分别执行 LRU 淘汰算法进行淘汰。

- ### 7. Spark Streaming 和 Flink 流处理区别 + Flink 流批一体

  **答案**：

  - **Spark Streaming**：
    - 基于微批（Micro-Batch）模式，将实时数据切分成小批次处理；
    - 容错靠 RDD 的重算机制；
    - 延迟一般在 500ms ~ 1s 左右；
    - 优势：易用，基于 Spark 生态。
  - **Flink**：
    - 原生流处理（True Stream），数据逐条事件处理；
    - 支持事件时间处理和水位线（Watermark）；
    - 精确一次（Exactly Once）语义；
    - 延迟低，可处理高吞吐量。
  - **流批一体**：
    - Flink 的 Table API / SQL 可以同时处理批量数据和流数据；
    - Batch 处理 = 流处理的特例（边界已知、有限数据流）；
    - 优势：统一 API，减少系统维护成本。

  ------

  ### 8. 数据库引擎 + InnoDB 索引实现 + 聚集/非聚集 + B+Tree

  **答案**：

  - **数据库引擎**：
    - MySQL 主要有 InnoDB、MyISAM；
    - **InnoDB** 支持事务、行级锁、外键、MVCC。
  - **索引实现**：
    - InnoDB 默认用 **B+Tree** 索引；
    - 聚集索引（Clustered Index）：表数据按照主键顺序存储，叶子节点就是数据行；
    - 非聚集索引（Secondary Index）：索引叶子节点存主键，通过主键再访问数据行。
  - **为什么用 B+Tree 不用 Hash**：
    - B+Tree 支持 **范围查询**（`BETWEEN`、`<`、`>`）；
    - Hash 索引只能做 **等值查询**；
    - B+Tree 节点有序，磁盘访问顺序 IO 优化，适合磁盘存储。

  ------

  ### 9. TCP 和 UDP 区别

  **答案**：

  | 特性     | TCP                  | UDP                 |
  | -------- | -------------------- | ------------------- |
  | 连接     | 面向连接             | 无连接              |
  | 可靠性   | 可靠，保证顺序和重传 | 不可靠，可能丢包    |
  | 传输方式 | 流式                 | 数据报              |
  | 速度     | 较慢                 | 快                  |
  | 使用场景 | 文件传输、HTTP、RPC  | 视频、音频直播、DNS |

  ------

  ### 10. HTTP

  **答案**：

  - 超文本传输协议（HyperText Transfer Protocol）；
  - 无状态、请求-响应模型；
  - 基本流程：
    1. 客户端发起请求（GET/POST/PUT/DELETE 等）；
    2. 服务器处理请求，返回状态码 + 内容；
    3. 客户端解析响应。

  ------

  ### 11. HTTP 版本比较

  **答案**：

  | 版本     | 特性                                                    |
  | -------- | ------------------------------------------------------- |
  | HTTP/1.0 | 每个请求一个 TCP 连接，效率低                           |
  | HTTP/1.1 | 支持长连接、管道化，减少连接开销                        |
  | HTTP/2   | 二进制分帧、多路复用、Header 压缩，减少延迟             |
  | HTTP/3   | 基于 QUIC（UDP），解决 TCP 建连慢问题，减少丢包重传延迟 |

  ------

  ### 12. 设计 Hash 表

  **答案**：

  1. **核心结构**：
     - 使用数组 + 链表 / 红黑树 / 动态数组（解决冲突）；
     - Hash 函数：将 key 映射到数组下标。
  2. **设计步骤**：
     1. 定义数组大小 `capacity`，存储 `Node(key,value)`；
     2. 定义 Hash 函数：`hash = key.hashCode() % capacity`；
     3. 冲突解决：
        - 链地址法：数组每个槽存链表 / 红黑树；
        - 开放地址法：线性探测 / 二次探测 / 双散列。
     4. 动态扩容：
        - 当负载因子 > 0.75，扩容数组为原来的 2 倍；
        - 重新计算每个 key 的 hash 并放入新数组。
     5. 提供操作：
        - `put(key, value)`：插入或更新；
        - `get(key)`：查找；
        - `remove(key)`：删除。
  3. **优化点**：
     - 使用高质量 Hash 函数，减少冲突；
     - 对冲突链表长度超过阈值，可转红黑树；
     - 考虑线程安全：加锁 / ConcurrentHashMap 分段锁设计。


