---
title: Redis入门概述
createTime: 2025/08/26 11:04:18
permalink: /nosqldb/redises/hmhrcnk1/
---
## 1.1 是什么？

Redis：Remote Dictionary Server 远程字典服务器----------->是一个高性能的key-value键值对内存数据库，提供了丰富的数据结构，同时支持事务、持久化、发布订阅等多种特性功能。

## 1.2 能干嘛

## 1.2.1 主流功能与应用

- 分布式缓存，挡在Mysql数据库之前的带刀侍卫（共用和配合使用，非竞争关系）
  - ![](/images/redis/1.png)
- 内存存储和持久化（RDB+AOF），redis支持异步将内存中的数据写到硬盘上，同时不影响继续服务
- 高可用架构搭配
  - 单机
  - 主从
  - 哨兵
  - 集群
- 缓存穿透、击穿、雪崩
- 分布式锁
- 队列
- 排行榜加点赞
- ..........

## 1.2.2 总功能概述

![](/images/redis/2.png)

## 1.2.3 优势

- 性能极高--Redis能读的速度是110000秒/次，写的速度是81000次/秒
- Redis数据类型丰富，不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储
- Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用
- Redis支持数据的备份，即master-slave模式的数据备份

## 1.2.4 小总结

![](/images/redis/3.png)

# 1.3 去哪下

- 英文：https://redis.io/
- 中文：http://www.redis.cn/
- 命令参考手册：http://doc.redisfans.com

# 1.4 怎么玩

- 多种数据类型基本操作和配置
- 持久化和复制，RDB/AOF
- 事务的控制
- 复制，集群等

# 1.5 Redis迭代演化和Redis7新特性浅谈

## 1.5.1 Redis版本迭代推演介绍

![](/images/redis/4.png)
![](/images/redis/5.png)

## 1.5.2 Redis7新特性

![](/images/redis/6.png)
