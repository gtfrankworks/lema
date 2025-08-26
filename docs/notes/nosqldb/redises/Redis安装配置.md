---
title: ' Redis安装配置'
createTime: 2025/08/26 11:38:12
permalink: /nosqldb/89m7lvl/
---
## 查看当前环境是否安装了Redis
1. 首先Linux环境安装Redis必须先具备gcc编译环境(Centos 7)
   1. 查看  `gcc -v`
   2. 安装  `yum -y install gcc-c++`
   ## 下载Redis
2. 官网下载redis安装包。移动到linux系统的/opt/softwar目录下面
## 安装Redis
3. 解压缩   `tar -zxvf redis-7.0.11.tar.gz`
4. 进入解压后的目录执行`make && make install`命令
5. 默认安装路径 `/usr/local/bin`
6. 将默认的redis.conf拷贝到自己自定义好的一个路径下 例如myredis文件里面
   1. 新建文件夹 `mkdir /myredis`
   2. 拷贝 `cp redis.conf /myredis/redis7.conf`
7. 修改/myredis目录下redis.conf配置文件做初始化设置
   1. ![](/images/redis/8.png)
## 启动Redis
8. 启动服务 `redis-server /myredis/redis7.conf`
9. 连接服务` redis-cli -a 111111 -p 6379`
10. 测试 输入`ping` 出现 `pong`
   11. ![](/images/redis/7.png)
12. 退出客户端 `quit`
13. 退出服务器
   14. 单实例关闭：`redis-cli -a 111111 shutdown`
   15. 多实例关闭,指定端口关闭：`redis-cli -a 111111 -p 6379 shutdown`
16. 卸载Redis
   17. 停止redis-server服务
   18. 删除/usr/local/lib目录下与redis相关的文件



##  附加内容 
由于每次重启 [vmware](https://so.csdn.net/so/search?q=vmware&spm=1001.2101.3001.7020) 都有可能导致 CentOS 的 ip 地址发生变化，所以我们直接将每台虚拟机的ip地址固定下来，并在windows系统配置ip地址的映射关系。

1. 首先确保当前的网络模式时NET模式
   1. ![](/images/redis/9.png)
2. 设置子网IP
   1. ![](/images/redis/10.png)
3. NAT设置
   1. ![](/images/redis/11.png)
4. 更改Windows下WLAN设置，打开自己的网络配置中心
   1. ![](/images/redis/12.png)
5. 修改Centos系统的ip
   1. ![](/images/redis/13.png)
6. 修改Windows系统对虚拟机的映射文件
   1. ![](/images/redis/14.png)
   2. ![](/images/redis/15.png)
7. 测试（我使用MobaXterm来远程连接虚拟机）
   1. ![](/images/redis/16.png)
   2. ![](/images/redis/17.png)
   3. ![](/images/redis/18.png)




