---
title: 唯品会-Java大数据开发
createTime: 2025/08/21 14:03:59
permalink: /bigcompany/piaochb4/
---

## 1、Kafka 的 message 包括哪些信息

Kafka 消息由 **固定长度的 header** 和 **变长的消息体 body** 组成。

* **Header**

  * 1 字节 `magic`：文件格式标识。
  * 4 字节 `CRC32`：用于校验 body 是否完整。
  * 若 `magic=1`，header 中额外包含 1 字节 `attributes`（保存压缩方式、是否压缩等信息）。

* **Body**

  * N 字节构成消息体，包含具体的 key/value 数据。

---

## 2、怎么查看 Kafka 的 offset

* Kafka 0.9 及以上版本使用最新 Consumer client。
* 方法：

  ```java
  consumer.seekToEnd(partitions); // 定位到末尾
  long offset = consumer.position(partition); // 获取当前最新 offset
  ```

---

## 3、Hadoop 的 shuffle 过程

### Map 端

1. Map 处理输入数据生成中间结果，写入内存缓冲区。
2. 当缓冲区满时启动 **spill** 线程写入磁盘。
3. **二次排序**：先按 partition，再按 key。
4. **Combiner**（可选）：本地合并减少写入数据量。
5. spill 文件写入本地磁盘。
6. 多 spill 文件通过 **多路归并**生成一个文件。

### Reduce 端

1. **Copy**：从各 Map 拷贝对应 partition 的数据。
2. **Sort/Merge**：归并排序数据。
3. **Reduce**：处理最终输出，写入 HDFS。

---

## 4、Spark 集群运算模式

| 模式         | 描述                               |
| ---------- | -------------------------------- |
| local      | 单机模式，学习/测试用                      |
| standalone | Master/Worker 模式，可用 ZooKeeper HA |
| on Yarn    | 依赖 Yarn 资源管理，Spark 调度计算          |
| on Mesos   | 依赖 Mesos 资源管理，Spark 调度计算         |
| on Cloud   | 如 AWS EC2，可访问 S3                 |

---

## 5、HDFS 读写数据过程

### 读

1. 客户端请求 Namenode 获取文件块位置信息。
2. 选择最近的 DataNode 建立 socket。
3. DataNode 读取磁盘数据，以 packet 为单位发送。
4. 客户端接收 packet 写入本地缓存。

### 写

1. 客户端请求 Namenode 上传文件。
2. Namenode 返回可上传信息。
3. 客户端获取每个 block 的 DataNode 列表。
4. 建立 pipeline：A -> B -> C。
5. 客户端将数据以 packet 发送给第一个 DataNode，依次转发。
6. 一个 block 完成后上传下一个 block。

---

## 6、RDD 中 reduceByKey 与 groupByKey 性能对比

| 方法          | 说明                              |
| ----------- | ------------------------------- |
| reduceByKey | Map 端先局部合并，减少网络传输，适合大数据量 reduce |
| groupByKey  | 全部数据传输到 Reduce 端，易 OOM，性能低      |

**建议**：大量 reduce 操作使用 reduceByKey。

---

## 7、Spark 2.0 了解

* 更简单：ANSI SQL 与合理 API
* 更快：Spark 编译器优化
* 更智能：Structured Streaming 支持流处理

---

## 8、RDD 分区宽依赖与窄依赖

| 类型  | 描述                                                                   |
| --- | -------------------------------------------------------------------- |
| 窄依赖 | 父 RDD 分区只被一个子 RDD 分区使用，例如 map、filter、union                           |
| 宽依赖 | 父 RDD 分区被多个子 RDD 分区使用，例如 groupByKey、reduceByKey、sortByKey，触发 shuffle |

---

## 9、Spark Streaming 读取 Kafka 数据的两种方式

1. **Receiver-based**

   * 使用 Kafka 高层 Consumer API。
   * 数据存储在 Executor 内存。
   * 启用 **Write Ahead Log (WAL)** 防止数据丢失。

2. **Direct**

   * Spark 1.3 引入，周期性查询 Kafka offset。
   * 使用 Kafka 简单 Consumer API 获取指定 offset 范围数据。

---

## 10、Kafka 数据存储位置

* Kafka 核心思想：顺序读写磁盘。
* 优势：

  1. Linux 磁盘缓存优化（read-ahead, write-behind）。
  2. 避免 JVM GC 长时间停顿。
  3. 磁盘顺序读写接近内存速度。

---

## 11、Kafka 数据丢失解决方法

* **Producer**：设置副本数（replication）
* **Broker**：多分区均衡分布
* **Consumer**：关闭自动提交 offset，消息处理完成后手动提交

```java
enable.auto.commit = false;
consumer.commitSync();
```

---

## 12、fsimage 与 edit 区别

* **fsimage**：保存最新元数据快照。
* **edit**：记录 fsimage 之后的增量修改。
* Checkpoint 时合并生成新的 fsimage。

---

## 13、Hadoop 配置文件优化

### core-site.xml

1. `fs.trash.interval`：启用回收站，防止误删。
2. `dfs.namenode.handler.count`：增加 Namenode 处理线程数，提高效率。
3. `mapreduce.tasktracker.http.threads`：增加 map/reduce 并行传输线程数。

---

## 14、DataNode 首次加入 cluster 不兼容文件版本

* 原因：Namenode 与 DataNode 的 namespaceID、clusterID 不一致。
* 处理方法：不格式化 Namenode，手动修改 DataNode 的 namespaceID/clusterID 与 Namenode 保持一致。

---

## 15、MapReduce 排序阶段及是否可避免

* Map 阶段：本地输出文件按 key 排序。
* Reduce 阶段：拷贝数据后再排序。
* 即使不使用 Combiner，Map 阶段也会排序。
* Hadoop 1.x 不可关闭排序，Hadoop 2.x 可关闭。

---

## 16、Hadoop 优化方法

* 合理设置 block size，减少 namenode 压力。
* 使用 Combiner 减少网络传输。
* 调整 Mapper/Reducer 数量，提高并行度。
* 压缩中间结果（如 map 输出）
* 调整 JVM 参数，减少 GC 开销。

---

## 17、设计题思路

* 明确数据规模，选择合适算法和存储结构。
* 考虑分布式处理与内存限制。
* 使用 MapReduce/Spark 进行聚合、排序。
* 使用哈希、堆或布隆过滤器优化性能。

---

## 18、TOP K 算法处理大文件

* 每个文件读入，统计 query 出现频率。
* 使用 **HashMap + Min-Heap**：

  1. HashMap 记录 query -> frequency
  2. Min-Heap 保存 top K
* 文件过大时，分片处理或使用外部排序。

---

## 19、内存不足找出不重复整数

* 使用 **外部排序** 或 **分块哈希**。
* 将整数分段，分块处理，每块统计唯一元素，再合并。
* 可使用 **位图(BitSet)** 分块处理。

---

## 20、快速判断一个数是否在 40 亿整数中

* 使用 **BitSet**：40 亿位约 500MB，存储状态
* 或使用 **Bloom Filter**：内存更小，但可能有误判
* 或 **外部排序 + 二分查找**。

---

## 21、海量数据找重复次数最多元素

* MapReduce 或 Spark 聚合统计
* 使用 HashMap 或 ReduceByKey 累计次数
* 保留最大值或 Top K

---

## 22、上亿数据统计前 N 个出现次数最多的数据

* 使用 **HashMap + Min-Heap**（Top N）
* 分块处理，局部 Top N，再合并全局 Top N
* Spark 可用 reduceByKey + takeOrdered(N, -count)

---

## 23、文本文件统计最频繁出现前 10 个词

* 读文件，统计每行词频存入 HashMap
* Min-Heap 保存 top 10
* 时间复杂度 O(N log 10) ≈ O(N)

---

## 24、100w 个数找出最大的 100 个数

* 使用 **Min-Heap**，维护 100 个元素
* 遍历数据，如果新元素大于堆顶，替换堆顶并调整堆
* 时间复杂度 O(N log 100)

---

## 25、一千万条短信找出重复最多的前 10 条

* 类似 Top K 问题
* HashMap 统计出现次数
* Min-Heap 保存 top 10
* 若内存不足，可使用 **分块 + 外部排序** 或 Spark 聚合
