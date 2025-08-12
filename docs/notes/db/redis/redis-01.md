---
title: Redis数据库安装和配置
createTime: 2025/08/12 16:27:40
permalink: /db/redis/aodpglbz/
---
# redis介绍

> redis是完全开源免费的，遵守BSD协议，是一个高性能的key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步
> Redis 是一个高性能的key-value数据库。 redis的出现，很大程度补偿了memcached这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等客户端，使用很方便。[来自百度百科]

* 官网

> `https://redis.io`

## Redis 与其他 key - value 缓存产品有以下三个特点：

1. Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
2. Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。
3. Redis支持数据的备份，即master-slave模式的数据备份。

## Redis 优势

* 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。
* 丰富的数据类型 – Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
* 原子性,Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
* 丰富的特性,Redis还支持 publish/subscribe, 通知, key 过期等等特性。

## Redis与其他key-value存储有什么不同？

* Redis有着更为复杂的数据结构并且提供对他们的原子性操作，这是一个不同于其他数据库的进化路径。Redis的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象。
* Redis运行在内存中但是可以持久化到磁盘，所以在对不同数据集进行高速读写时需要权衡内存，因为数据量不能大于硬件内存。在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样Redis可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问。

## 安装redis数据库

* 第一步：下载 redis的安装包
  [下载redis](https://redis.io/download)
  或者通过`wget download.redis.io/releases/redis-5.0.7.tar.gz` 下载

* 第二步：利用 tar 命令解压

```shell
tar -zxvf redis-xxx.tar.gz
```

* 第三步：执行 make

```shell
make
```

* 第四步：执行 make install

```shell
make install
```

注：默认情况下，CentOS系统中没有安装 gcc 组件，在执行 make 之前，需要安装一下 gcc,如下

```shell
yum install gcc
```

提示输入字母时，输入 y 即可

## 启动 redis

1. 可以在命令行中直接启动 redis-server, 这种方式不是以后台服务方式启动，要占用一个命令行窗口，使用不太方便。

2. 把redis加入到开机自启动项中，操作如下

- 2.1 把redis解压目录下的`redis.conf`文件copy一份到redis-server安装目录，默认是`/usr/local/bin` [可以通过whereis redis-server 来查看]
- 2.2 修改 `/usr/local/bin/redis.conf`文件，把 daemonize的值改为yes
- 2.3 在`/etc/systemd/system/`目录下创建一个 redis.service 文件，内容如下：

```shell
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

- 2.4 执行`systemctl enable redis.service` 来启用 redis 服务
- 2.5 执行`systemctl start redis.service` 来启动 redis 服务【以后开机不用再执行此行命令，会自启动】

