---
title: Redis的踩坑
createTime: 2025/08/26 09:42:43
permalink: /bigcompany/r3466fe9/
---
# Redis 踩坑

#### key 的命名

同一个 Redis 服务被公司中的各个业务线公用，必须保证 key 的唯一性

> 业务线名称 + 工程名 + 模块名 + 有意义的key名称



#### 选择合适的数据类型，维护更容易

- Strings: 应用最广泛，例如：计数器，session 等键值“独立”的数据。
- Hashes: 存储结构化（对象）的数据，KV 共同构成一个对象的信息。
- Lists: 队列、栈、有界队列。
- Sets: 去重、无序的数据集合，在类似于社交的业务功能上有广泛应用，例如：共同关注、共同喜好、数据去重。
- Sorted Sets: 带有权重的集合，在类似于排行榜业务上有广泛应用，且可以实现范围查找。



#### 使用了事务功能，怎么没回滚呢？

Redis 不支持事务回滚

- Redis 命令只会因为错误的语法而失败，应该在开发的时候就避免这种情况
- 因为不需要对回滚进行支持，所以 Redis 内部可以保持简单且快速

可以使用 DISCARD 放弃事务。



#### Big Key 影响 Redis 性能

Big Key 是指 key 对应的 value 数据大小非常大，比如：

- 字符串大于 10KB
- 哈希、列表、集合元素个数 > 5000

Big Key 的危害：

- 内存不均
- 超时阻塞
- 网络流量拥堵
- 过期删除
- 迁移困难

Big Key 怎么产生的：

- 社交类场景：粉丝列表，对于明星或者大 V 需要特殊设计
- 汇总统计类场景：每天都会产生报表数据，数据汇总到一个 key 里，日积月累就成为了 Big Key
- 日常缓存类：对 db 中的数据进行缓存，存在大字段的表可能会产生 Big Key

如何发现 Big Key：

- `redis-cli --bigkeys`: 给出每种数据结构的 Top 1 Big Key，但无法查出全部 Big Key
- Redis 4.0 开始提供 memory usage 命令，可以计算每个键值的字节数

删除 Big Key：

- Strings: 可以直接使用 del 命令，不会产生阻塞。
- Hashes: 使用 hscan 命令每次获取一部分，再用 hdel 删除。
- Lists: 使用 ltrm 命令渐进式删除列表元素。
- Sets: 使用 sscan 命令，每次获取部分元素，再使用 srem 命令删除每个元素。
- Sorted Sets: 使用 zscan 命令，每次获取部分元素，再使用 zremrangebyrank 命令删除元素。



#### Redis 内存耗尽

- 业务不断发展，缓存数据不断增多
  - 加配置、加机器、集群部署
- 无效的（过期）数据没有及时清理
  - 使用 expire 命令为 key 设置合理的过期时间（结合业务场景）
- ”冷数据“不要进行缓存

- 修改配置

```sh
##################################################### MEMORY MANAGEMENT #####################################################

# 将内存使用限制设置为指定的字节数。
# 当达到内存限制时，Redis 将根据选择的清除策略(请参阅 maxmemory-policy )尝试删除键。
#
# 如果 Redis 不能根据策略删除键，或者策略被设置为“noeviction”，那么 Redis 将对 write 命令进行错误应答，对 read 命令进行应答。
#
# 当使用 Redis 作为LRU或LFU缓存，或为实例设置硬内存限制(使用“noeviction”策略)时，此选项通常很有用。
#
# WARNING: 如果已经附加了副本，建议您为 maxmemory 设置一个较低的限制，以便在系统上为副本输出缓冲区提供一些空闲RAM(但如果策略是“noeviction”，则不需要这样做)。
#
# maxmemory <bytes>

# MAXMEMORY POLICY: 当达到 maxmemory 时，您可以选择五种行为:
#
# volatile-lru -> 从设置了过期时间的 key 中使用 LRU 算法进行淘汰。
# allkeys-lru -> 从所有 key 中使用 LRU 算法进行淘汰（推荐）。
# volatile-lfu -> 在设置了过期时间的 key 中使用 LFU 算法淘汰数据。
# allkeys-lfu -> 在所有 key 中使用 LFU 算法淘汰数据。
# volatile-random -> 从设置了过期时间的 key 中随机淘汰。
# allkeys-random -> 从所有 key 中随机淘汰数据。
# volatile-ttl -> 在设置了过期时间的 key 中，根据 key 的过期时间进行淘汰，越早过期的优先被淘汰。
# noeviction -> 不清除（默认策略），对于写请求不再提供服务，直接返回错误（DEL请求和部分特殊请求除外）。
#
# LRU means Least Recently Used(最近使用)
# LFU means Least Frequently Used(最经常使用)
#
# LRU、LFU 和 volatile-ttl 都是使用近似随机算法实现的。
#
# Note: 对于上述任何一种策略，当没有合适的键可以清除时，Redis将在写操作上返回一个错误。
#
#       At the date of writing these commands are: set setnx setex append
#       incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd
#       sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby
#       zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby
#       getset mset msetnx exec sort
#
# The default is:
#
# maxmemory-policy noeviction

# LRU、LFU 和最小TTL 算法不是精确的算法，而是近似的算法(为了节省内存)，因此您可以对其进行调优以提高速度或精度。
#
# 对于默认的 Redis 将随机采样 5 个键并选择一个最近较少使用的键，您可以使用下面的配置指令更改样本大小。
#
# maxmemory-samples 5

# 从Redis 5开始，在默认情况下，一个副本将忽略它的maxmemory设置(除非在故障转移后或手动将其提升为master)。
# 这意味着键的清除将由主进程来处理，当主进程中的键被清除时，将DEL命令发送给副本。
# 但是如果你的副本服务器是可写的，你可能会改变这种默认。
#
# Note: 由于副本在默认情况下不会被删除，因此它最终使用的内存可能比通过 maxmemory 设置的内存多(副本上有一些缓冲区可能更大，或者数据结构有时会占用更多内存，等等)。
# 因此，请确保监控您的副本服务器，并确保它们有足够的内存，在主服务器达到配置的 maxmemory 设置之前，不会出现真正的内存不足的情况。
#
# replica-ignore-maxmemory yes
```



#### 频繁的命令造成 IO 性能瓶颈

可以使用 pipline 在客户端缓存多条命令，批量发给 Redis Server 减少网络 IO。



