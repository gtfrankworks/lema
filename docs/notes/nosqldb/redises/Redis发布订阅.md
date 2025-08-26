---
title: Redis 发布订阅
createTime: 2025/08/26 13:24:57
permalink: /nosqldb/mhwtbwr0/
---
## 什么是发布订阅（Pub/Sub）？

发布订阅（Publish/Subscribe，简称 Pub/Sub）是一种消息通信模式，它将消息的发送者（发布者，publisher）和接收者（订阅者，subscriber）解耦。

- **发布者（Publisher）：** 负责向特定的**频道（channel）**发送消息，但它并不知道谁会接收这些消息。
- **订阅者（Subscriber）：** 负责订阅一个或多个感兴趣的频道，以接收发布到这些频道的所有消息。

Redis 的发布订阅功能是轻量、高效的，特别适合用于实现实时消息广播，例如聊天室、实时通知或事件驱动的系统。

## 发布订阅的工作原理

在 Redis 中，发布订阅的实现机制非常直观：

1. **客户端订阅频道：** 当一个客户端执行 `SUBSCRIBE` 命令订阅一个或多个频道时，它会进入订阅模式。此时，它不再能执行常规的 Redis 命令（如 `SET`、`GET`），只能接收来自已订阅频道的消息。
2. **客户端发布消息：** 当另一个客户端执行 `PUBLISH` 命令向某个频道发送消息时，Redis 服务器会将这条消息广播给所有订阅了该频道的客户端。
3. **消息传递：** Redis 服务器会主动将消息推送给订阅者。如果订阅者客户端因为网络或其他原因断开连接，它将**不会**收到离线期间发布的消息。这与消息队列（如 Kafka、RabbitMQ）不同，Redis 的发布订阅是“即发即失”的，不具备持久化能力。

## 发布订阅的应用场景

Redis 的发布订阅模型非常简单高效，适合以下类型的应用：

1. **实时通知和消息广播：**
   - **网站通知：** 当后台有新内容发布或重要事件发生时，通过频道广播给所有在线用户。
   - **系统状态监控：** 将服务状态、性能指标等信息发布到特定频道，供多个监控客户端实时订阅。
2. **在线聊天室：**
   - 每个聊天室可以作为一个频道。当用户在聊天室中发送消息时，通过 `PUBLISH` 命令将消息发送到对应的频道。所有订阅该频道的用户都能立即收到消息。
3. **事件驱动的系统：**
   - 当一个服务完成某个任务（例如，用户完成支付）后，可以发布一个事件到频道。其他服务（例如，发送邮件服务、更新用户积分服务）订阅该频道，并根据接收到的事件消息执行相应的业务逻辑。

## 案例说明：一个简单的在线聊天室

我们来详细看一个使用 Redis 发布订阅实现简易在线聊天室的例子。

### **场景描述**

假设我们有一个网站，提供一个公共聊天室，所有在线用户都可以在这里互相发送消息。

### **设计思路**

- **每个聊天室就是一个 Redis 频道。** 例如，公共聊天室的频道名可以是 `chat:public`。
- **每个连接的用户就是一个订阅者。** 当用户进入聊天室时，客户端代码会订阅 `chat:public` 频道。
- **当用户发送消息时，消息发布者会向频道发送消息。**

### **操作流程**

1. **用户 A 进入聊天室：**
   - 用户 A 的客户端连接到 Redis，并执行 `SUBSCRIBE chat:public` 命令。
   - 此时，用户 A 的客户端进入订阅模式，等待 `chat:public` 频道的消息。
2. **用户 B 进入聊天室：**
   - 用户 B 的客户端同样连接到 Redis，并执行 `SUBSCRIBE chat:public` 命令。
   - 用户 B 也进入订阅模式，与用户 A 一起等待该频道的消息。
3. **用户 C 发送消息：**
   - 用户 C 的客户端连接到 Redis，执行 `PUBLISH chat:public "Hello everyone, I'm C."` 命令。
   - Redis 服务器接收到命令后，会立即将这条消息广播给所有订阅了 `chat:public` 的客户端，即用户 A 和用户 B。
   - 用户 A 和用户 B 的客户端会立即收到消息，并将其显示在聊天室界面上。

### **优点**

- **低延迟：** 消息通过 Redis 即时推送，几乎没有延迟，非常适合实时通信。
- **简单：** 实现非常简单，不需要复杂的架构和逻辑。
- **解耦：** 用户 C 不需要知道有 A 和 B 在线，也不需要与 A 和 B 直接通信。他们之间唯一的桥梁就是 `chat:public` 这个频道。

### **缺点**

- **离线消息：** 如果用户 A 在用户 C 发送消息时离线了，当他重新上线并订阅 `chat:public` 频道时，他将收不到 C 发送的那条消息。

## 发布订阅的优缺点

### 优点

- **简单高效：** 模型非常简单，易于理解和使用，性能极高。
- **低耦合：** 发布者和订阅者完全解耦，它们不需要知道对方的存在，只需要关心共同的频道。
- **实时性强：** 消息是即时推送的，适用于对延迟敏感的场景。

### 缺点

- **不保证消息送达：** 如果订阅者在消息发布时处于离线状态，它将永久丢失该消息。
- **无持久化：** Redis 不会存储发布过的消息。
- **无回溯能力：** 订阅者无法获取在它订阅之前发布的历史消息。

如果你的业务场景需要保证消息不丢失、支持离线消息或需要消息持久化，那么 Redis Streams、专业的队列中间件（如 RabbitMQ、Kafka）会是更好的选择。

## 常见 Redis 客户端的发布订阅示例

### Python (redis-py)

```
import redis
import time

# 连接到 Redis
r = redis.Redis(host='localhost', port=6379, db=0)

def subscriber_example():
    """订阅者示例"""
    pubsub = r.pubsub()
    pubsub.subscribe('my_channel')
    print("等待消息...")
    for message in pubsub.listen():
        if message['type'] == 'message':
            print(f"收到消息：{message['data'].decode('utf-8')}")
            # 如果需要停止，可以添加逻辑，例如：
            if message['data'].decode('utf-8') == 'exit':
                break

def publisher_example():
    """发布者示例"""
    print("发布消息...")
    r.publish('my_channel', 'Hello, Redis Pub/Sub!')
    time.sleep(1)
    r.publish('my_channel', 'This is a new message.')
    time.sleep(1)
    # 发送一个退出消息来停止订阅者
    r.publish('my_channel', 'exit')

if __name__ == '__main__':
    # 可以在不同的终端分别运行发布者和订阅者
    import threading
    t1 = threading.Thread(target=subscriber_example)
    t2 = threading.Thread(target=publisher_example)
    t1.start()
    time.sleep(1)  # 确保订阅者先启动
    t2.start()
    t1.join()
    t2.join()
```

### Node.js (ioredis)

```
const Redis = require('ioredis');

// 订阅者客户端
const subscriber = new Redis();
subscriber.subscribe('my_channel', (err, count) => {
  if (err) {
    console.error('订阅失败:', err);
  } else {
    console.log(`成功订阅 ${count} 个频道，等待消息...`);
  }
});

subscriber.on('message', (channel, message) => {
  console.log(`从频道 "${channel}" 收到消息: ${message}`);
  // 可以在这里处理消息
  if (message === 'exit') {
    subscriber.disconnect();
    publisher.disconnect();
  }
});

// 发布者客户端
const publisher = new Redis();
function publishMessages() {
  console.log('发布消息...');
  publisher.publish('my_channel', 'Hello, Redis Pub/Sub!');
  
  setTimeout(() => {
    publisher.publish('my_channel', 'This is a new message.');
  }, 1000);

  setTimeout(() => {
    publisher.publish('my_channel', 'exit');
  }, 2000);
}

// 确保订阅者先启动
setTimeout(publishMessages, 500);
```

### Java (Jedis)

```
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

public class PubSubExample {

    public static void main(String[] args) {
        // 订阅者线程
        new Thread(() -> {
            try (Jedis subscriberJedis = new Jedis("localhost")) {
                JedisPubSub listener = new JedisPubSub() {
                    @Override
                    public void onMessage(String channel, String message) {
                        System.out.println("从频道 '" + channel + "' 收到消息: " + message);
                        if (message.equals("exit")) {
                            unsubscribe();
                        }
                    }
                };
                System.out.println("等待消息...");
                subscriberJedis.subscribe(listener, "my_channel");
            }
        }).start();

        // 发布者线程
        new Thread(() -> {
            try (Jedis publisherJedis = new Jedis("localhost")) {
                try {
                    Thread.sleep(1000); // 确保订阅者先启动
                    System.out.println("发布消息...");
                    publisherJedis.publish("my_channel", "Hello, Redis Pub/Sub!");
                    Thread.sleep(1000);
                    publisherJedis.publish("my_channel", "This is a new message.");
                    Thread.sleep(1000);
                    publisherJedis.publish("my_channel", "exit");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
```