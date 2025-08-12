---
title: Redis数据类型和常用命令
createTime: 2025/08/12 16:30:32
permalink: /db/redis/0o749wgx/
---
# 学习大纲

- Redis怎么玩
- 5种数据类型
- 通用型命令
- 针对key的命令
- 针对String[字符串]类型值的命令
- 针对list[列表]类型的命令
- 针对hash[哈希表]类型的命令
- 针对set[集合]类型的命令
- 针对zset[有序集合]类型的命令

有关redis的命令文档大全，可以查看 `http://redisdoc.com/`，[点击进入](http://redisdoc.com/)

## redis怎么玩

1. 服务端启动后，通过执行 `redis-cli -p 6379` 连接上来
2. 在这个窗口中执行 redis相关的命令即可

> 注：key都是字符串类型，并且redis默认支持16个库。

## redis中5种数据类型

1. string,字符串类型，最大长度512M，是redis中最常用最基本的数据类型，其本操作如下

```shell
set k1 v1
set k2 v2
//可以通过get命令来获取key的值
get k1
get k2
```

2. list, 列表类型，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）一个列表最多可以包含 2的32次方 - 1 个元素 (即4294967295, 超过42亿个元素)。

```shell
lpush mylist e1 e2 e3
lpush mylist e4 e5
//可以通过 lrange来取出列表元素
lrange mylist 0 2
```

3. hash,哈希表，是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。Redis 中每个 hash 可以存储 2的32次方 - 1 个键值对（42亿多个）。

```shell
hmset mymap name "jack" gender "M" age 18 description "good boy"
//通过 hgetall 可以取出这些对象
hgetall mymap
```

4. set, 集合,是String类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。集合中最大的成员数为 2的32次方 - 1 (4294967295, 每个集合可存储42多亿个成员)。

```shell
sadd myset oracle
sadd myset mysql
sadd myset redis
sadd myset mysql   //这个将添加不进去，因为不允许重复
//通过 smembers 命令可以取出key对应的所有list元素
smembers myset
```

5. zset,有序集合，有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。有序集合的成员是唯一的,但分数(score)却可以重复。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。 集合中最大的成员数为 2的32 - 1 (4294967295, 每个集合可存储42多亿个成员)。

```shell
zadd myzset 1 oracle
zadd myzset 2 mysql
zadd myzset 3 redis
zadd myzset 4 mysql    //这个会把之前的mysql的score给覆盖掉
//取出来
zrange myzset 0 10 withscores    //不加 withscore 选项时，不会出现分值
```

## 通用型命令

1. 切换库命令 `select 0 ~ 15`,  其中，0表示第一个库，15代表第16个库，默认情况下，redis有16个库。

2. 清除当前库命令 `flushdb`，只清除当前的仓库

3. 清除所有库命令 `flushall`, 清除所有的仓库。

4. 查看当前库中key的数量 `dbsize`

## key相关的命令

1. `keys *`  表示查看当前库中所有的key，支持通配，* 通配所有， ? 通配单个字符，如：`keys k?` 只找出key中以k开头，并且后面只跟0或1个字符的key

2. `exists key` 用来判断这个key在当前库中是否存在，存在返回1，不存在返回0

3. `move key 0 ~ 15`, 用来移动key到指定的仓库，其中，key就是在当前库中已有的key, 0~15代表库的序号。

4. `expire key second`,用来给key指定过期时间，以秒为单位

5. `ttl key`,用来查看key还有多久过期，返回-2表示已过期，-1表示永不过期，正数表示剩下的时间秒。

6. `type key`，用来查看key的类型。

## String类型相关的命令

1. `set和get`, 设置和获取key的值
2. `strlen key`, 获取key对应的字符串的长度
3. `append key value`, 在key对应的字符串后面追加value字符串，形成新的字符串 
4. `setrange key offset value`, 在key对应的字符串指定位置开始替换成新的value
5. `getrange key start end`, 获取key对应字符串的起始位置到结束位置[含]的子串
6. `incr和decr`, 只针对value是数字型的情况，用来进行自增和自减
7. `incrby和decrby`, 同样只针对value是数字型的情况，指定步长进行自增和自减
8. `setnx`, 是[set if Not eXists]的缩写，表示当key不存在的情况下，才可以设置成功，如果key已存在，则失败
9. `setex`, 相当于是set命令和expire命令组合，不同在于此命令是一个原子[atomic]操作,当key已存在时，会覆盖原来的值。
10. `mset和mget`，可以在一个原子操作中，同时设置多个值，此命令总是返回OK，如果key已存在，则覆盖掉原来的值。
    11.`msetnx`，也是一个原子操作，当且仅当所有给定键都不存在时， 为所有给定键设置值，只要有一个key存在时，都不会设值。

## list相关的命令

1. `lpush,rpush,lrange`, 这三个命令是最常用的，分别表示从左边开始入栈【栈顶操作】，从右边开始入栈【栈尾操作】，以及查询出栈中的元素，如下

```shell
lpush list01 1 2 3 4 5   //得到的栈是 5 4 3 2 1  【从栈顶进栈，先进后出】
rpush list02 1 2 3 4 5   //得到的栈是 1 2 3 4 5   【从栈尾进栈，先进后出】
lrange list01 0 -1   //取出栈中的所有元素
```

2. `lpop,rpop`, 这2条命令是出栈命令，其中lpop表示从栈顶取元素，rpop表示从栈尾取元素
3. `lindex key index`, 表示根据下标来获取栈中的元素，如果下标不存在，则返回nil
4. `lren key`, 用来获取指定的列表中元素的长度
5. `lrem key count value`, 用来从列表中移除指定个数的value, 经常用来删除重复的元素
6. `ltrim key start end`, 用来截取列表中的元素，从start开始，到end结束[含],并把返回的元素列表赋给key
7. `rpoplpush key1 key2`, 把key1列表中的栈尾元素取出来放到key2列表中的栈顶中
8. `lset key index value`, 重新设置列表中指定下标位置的元素值
9. `linsert key before|after value1 value2`, 在列表中指定元素value1的前或后面插入新值value2,如果有多个重复的value1，则是参考第一个出现的value1

## set[集合]相关的命令

> 集合是无序的，并且是不重复的。

1. `sadd key value1 value2 ...`, 创建并添加元素到set集合中
2. `smembers key`, 查看set集合中的所有元素
3. `sismember key value`, 查看value是否存在于set集合中,如果存在，返回1，不存在，返回0
4. `scard key`, 获取set集合中的元素个数
5. `srem key value`, 从set集合中把value移除，如果元素不存在，则返回0，移除成功返回1
6. `srandmember key count`, 从set集合中随机取出count个元素【很适合抽奖】
7. `spop key`, 从set集合中随机取出一个元素，如果没有了元素，则这个key也消失【这点同 list】
8. `smove key1 key2 member`, 把member元素从集合1中移动到集合2中，如果member不存在，则返回0
9. `sdiff key1 key2`, 求两个集合的差集，返回集合1中有而集合2中没有的元素
10. `sinter key1 key2`, 求两个集合的交集，返回集合1和集合2中共同都有的元素
11. `sunion key1 key2`，求两个集合的并集，返回集合1和集合2中的元素并集

## hash[哈希表]相关的命令

> 还是键值对存储，不同之处在于它的value也是K-V对, K是不允许重复的

1. `hset, hmset, hget, hmget`, 此4条命令分别是用来给hash设值，多个值一起设，取值，同时取多个值，如下

```shell
hset user name jack   //把 属性为name，值为jack的K-V对象添加到哈希表中，哈希表的key是user
hget user name        //取出user哈希表中的name key的值，结果是 "jack"
hmset customer id 1 name peter phone 13899887766   //给 customer设置了3个key,分别是 id,name,phone
hmget customer id name phone  //从customer表中同时取出3个key的值
```

2. `hgetall key`, 此命令是把key对应的哈希表中的所有K-V对全部取出来。
3. `hdel key field [field]`, 删除key对应的哈希表中的K，可以同时删除多个K
4. `hlen key`, 求哈希表的长度
5. `hexists key field`, 判断哈希表中是否存在指定的K，存在返回1，不存在返回0
6. `hkeys, kvals`, 此2个命令类似于java集合MAP API中的keyset()和values()方法，得到所有的key和所有的value
7. `hincrby key field step`, 与string中的incrby类似，用来给哈希表中是整数的key进行增长，step是步长
8. `hincrbyfloat key field step`, 同上面，不同在于此命令可以指定步长为小数
9. `hsetnx key field value`, 中有当key中的field不存在，才能设置成功，如果本来就有field，则返回0

> 哈希表使用还是比较频繁的，以上命令需要多加练习

## zset[有序集合]相关的命令

> 有序集合是利用score来进行排序的，所以我们在放入数据到zset中时，需要自己指定一个score来与value对应。所以，它的语法是`zadd key score1 v1 score2 v2 ....`, key是键，score1 和 v1对应一个值。

1. `zadd`, 用来添加元素到有序集合中，如

```shell
zadd zset01 10 v1 20 v2 30 v3 40 v4 50 v5 60 v6 70 v7 80 v8 90 v9 100 v10  //添加了10个元素
```

2. `zrange key start end [withscores]`, 用来获取有序集合中的元素，不加withscores选项时，不显示分值，加了此选项，则显示分值

```shell
zrange zset01 0 -1 withscores  //显示所有元素，含分值
```

3. `zrevrange key start end [withscores]`, 以逆向下标来获取有序集合的元素。

4. `zrangebyscore key 开始score 结束score`, 以分值区间来查询有序集合中的元素，默认是闭区间，使用(可以切换到开区间。也支持 withscores选项，支持 limit 选项【类似于分页】

```shell
zrangebyscore zset01 30 60  //把30分至60分的value取出来
zrangebyscore zset01 30 (60  //把30分至60分[不含]的value取出来
zrangebyscore zset01 30 60 withscores //把30分至60分的value取出来，显示结果中含分值
zrangebyscore zset01 30 60 limit 2 3  //从下标为2的位置开始，取出3条记录
```

5. `zrevrangebyscore key min_score max_score [withscores]`,以逆向顺序来返回满足分值条件的结果。

```shell
zrevrangebyscore zset01 60 30   //返回 v6 v5 v4 v3
```

6. `zrem key value`, 从有序集合中移除指定的元素，如果没有此元素，则返回0
7. `zcard/zcount key [min_score max_score]`, zcard统计有序集合中元素个数，不支持分数条件，而zcout 是支持分数范围条件的。如：

```shell
zcard zset01   //返回zset01中的元素总数
zcount zset01   //结果同上
zcount zset01 30 60   //算出30分至60分之间的元素个数
```

8. `zrank key member`, 用来获取元素下标
9. `zrevrank key member`,以逆向顺序来获取元素下标,如：

```shell
zrank zset01 v1   //返回的是0
zrevrank zset01 v1 //返回的是8
```

10. `zscore key member`,用来获取元素对应的分值