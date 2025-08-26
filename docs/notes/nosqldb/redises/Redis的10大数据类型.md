---
title: Redis的10大数据类型
createTime: 2025/08/26 13:08:52
permalink: /nosqldb/redises/1gjl58nl/
---
## 1. **String（字符串）**

- **定义**：最基础的类型，一个 key 对应一个字符串值。

  - 可以是文本、整数、浮点数，最大支持 512MB。

- **底层实现**：简单动态字符串（SDS，类似 C 语言的 char[]，但可动态扩展）。

- **应用场景**：

  - 缓存：缓存 HTML、JSON、Token 等。
  - 计数器：`INCR`/`DECR` 实现访问量、点赞数。
  - 分布式锁：`SETNX` 实现。

- **命令示例**：

  ```
  SET key "Hello"
  GET key
  INCR counter
  ```

------

## 2. **Hash（哈希表）**

- **定义**：key 对应一个小型字典，value 是一个 `field-value` 的集合。

- **底层实现**：压缩列表（ziplist）或哈希表（hashtable），根据字段数量和长度决定。

- **应用场景**：

  - 存储对象：如 `user:{id}` → {name:Tom, age:20}。
  - 购物车：商品 ID → 数量。

- **优点**：节省空间，读取局部字段更高效。

- **命令示例**：

  ```
  HSET user:1 name "Tom" age 20
  HGET user:1 name
  HGETALL user:1
  ```

------

## 3. **List（列表）**

- **定义**：一个有序列表，支持从两端插入、删除。

- **底层实现**：压缩列表（ziplist）或快速链表（quicklist）。

- **应用场景**：

  - 消息队列：生产者 LPUSH，消费者 RPOP。
  - 时间线：微博、评论流。

- **优点**：支持阻塞读取（`BLPOP`），可实现简单队列。

- **命令示例**：

  ```
  LPUSH queue "task1"
  RPUSH queue "task2"
  LPOP queue
  ```

------

## 4. **Set（集合）**

- **定义**：无序集合，元素唯一。

- **底层实现**：整数集合（intset）或哈希表。

- **应用场景**：

  - 标签系统：用户兴趣标签。
  - 社交关系：共同好友（`SINTER`）。
  - 抽奖系统：随机取元素（`SRANDMEMBER`）。

- **命令示例**：

  ```
  SADD tags "java" "redis" "mysql"
  SMEMBERS tags
  SINTER user1_friends user2_friends
  ```

------

## 5. **Sorted Set（有序集合，ZSet）**

- **定义**：集合中的元素带有一个分数（score），按分数排序。

- **底层实现**：跳表（skiplist）+ 哈希表。

- **应用场景**：

  - 排行榜：按分数排序（如游戏积分）。
  - 延迟队列：按时间戳作为 score。

- **命令示例**：

  ```
  ZADD rank 100 "Alice"
  ZADD rank 200 "Bob"
  ZRANGE rank 0 -1 WITHSCORES
  ```

------

## 6. **Bitmap（位图）**

- **定义**：基于 String 实现的二进制位操作。

- **应用场景**：

  - 签到系统：每天一个 bit 表示是否签到。
  - 用户状态：是否在线、是否完成任务。

- **优点**：节省空间（1 亿用户只需 12MB 内存）。

- **命令示例**：

  ```
  SETBIT sign 1 1
  GETBIT sign 1
  BITCOUNT sign
  ```

------

## 7. **HyperLogLog（基数统计）**

- **定义**：用极小空间进行去重计数（近似值，误差率 < 1%）。

- **应用场景**：

  - 网站 UV 统计。
  - 统计独立用户数、IP 数。

- **优点**：占用固定 12KB 内存，不管统计对象有多少亿。

- **命令示例**：

  ```
  PFADD uv "user1" "user2" "user3"
  PFCOUNT uv
  ```

------

## 8. **Stream（流）**

- **定义**：日志型数据结构，支持消息持久化、消费组。

- **应用场景**：

  - 消息队列（比 List 更强大）。
  - 日志流、实时数据处理。

- **优点**：支持多消费者组，保证消息不丢失。

- **命令示例**：

  ```
  XADD mystream * user "Tom" action "login"
  XREAD COUNT 1 STREAMS mystream 0
  ```

------

## 9. **GEO（地理位置）**

- **定义**：基于 Sorted Set 实现，存储经纬度坐标，支持半径、距离计算。

- **应用场景**：

  - “附近的人”功能。
  - 打车、外卖派单。

- **命令示例**：

  ```
  GEOADD city 116.40 39.90 "Beijing"
  GEORADIUS city 116.40 39.90 100 km
  GEODIST city "Beijing" "Shanghai"
  ```

------

## 10. **JSON（RedisJSON 模块）**

- **定义**：Redis 的扩展模块（RedisJSON）支持存储和操作 JSON 文档。

- **应用场景**：

  - 存储复杂对象（嵌套结构）。
  - 作为 NoSQL 文档数据库使用。

- **命令示例**：

  ```
  JSON.SET user:1 $ '{"name":"Alice","age":25}'
  JSON.GET user:1 $.name
  ```

------

# 📌 对比总结表

| 数据类型    | 主要特性        | 常见应用                   |
| ----------- | --------------- | -------------------------- |
| String      | 字符串/数字存储 | 缓存、计数器、分布式锁     |
| Hash        | 键值对集合      | 用户信息、对象存储         |
| List        | 有序列表        | 消息队列、时间线           |
| Set         | 无序去重集合    | 标签系统、好友关系         |
| ZSet        | 有序集合        | 排行榜、延时队列           |
| Bitmap      | 位存储          | 签到、活跃用户统计         |
| HyperLogLog | 基数统计        | UV 统计                    |
| Stream      | 消息流          | 消息队列、日志流           |
| GEO         | 地理位置        | 附近的人、地图服务         |
| JSON        | 文档存储        | 嵌套对象存储、NoSQL 文档库 |

------

👉 这样你就能看到：
 前 5 个（String、Hash、List、Set、ZSet）是 **基础核心类型**；
 后 5 个（Bitmap、HyperLogLog、Stream、GEO、JSON）是 **扩展高级类型**，适合特定业务。