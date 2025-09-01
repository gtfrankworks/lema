import{a as n,c as a,b as i,o as e}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h2 id="什么是发布订阅-pub-sub" tabindex="-1"><a class="header-anchor" href="#什么是发布订阅-pub-sub"><span>什么是发布订阅（Pub/Sub）？</span></a></h2><p>发布订阅（Publish/Subscribe，简称 Pub/Sub）是一种消息通信模式，它将消息的发送者（发布者，publisher）和接收者（订阅者，subscriber）解耦。</p><ul><li><strong>发布者（Publisher）：</strong> 负责向特定的**频道（channel）**发送消息，但它并不知道谁会接收这些消息。</li><li><strong>订阅者（Subscriber）：</strong> 负责订阅一个或多个感兴趣的频道，以接收发布到这些频道的所有消息。</li></ul><p>Redis 的发布订阅功能是轻量、高效的，特别适合用于实现实时消息广播，例如聊天室、实时通知或事件驱动的系统。</p><h2 id="发布订阅的工作原理" tabindex="-1"><a class="header-anchor" href="#发布订阅的工作原理"><span>发布订阅的工作原理</span></a></h2><p>在 Redis 中，发布订阅的实现机制非常直观：</p><ol><li><strong>客户端订阅频道：</strong> 当一个客户端执行 <code>SUBSCRIBE</code> 命令订阅一个或多个频道时，它会进入订阅模式。此时，它不再能执行常规的 Redis 命令（如 <code>SET</code>、<code>GET</code>），只能接收来自已订阅频道的消息。</li><li><strong>客户端发布消息：</strong> 当另一个客户端执行 <code>PUBLISH</code> 命令向某个频道发送消息时，Redis 服务器会将这条消息广播给所有订阅了该频道的客户端。</li><li><strong>消息传递：</strong> Redis 服务器会主动将消息推送给订阅者。如果订阅者客户端因为网络或其他原因断开连接，它将<strong>不会</strong>收到离线期间发布的消息。这与消息队列（如 Kafka、RabbitMQ）不同，Redis 的发布订阅是“即发即失”的，不具备持久化能力。</li></ol><h2 id="发布订阅的应用场景" tabindex="-1"><a class="header-anchor" href="#发布订阅的应用场景"><span>发布订阅的应用场景</span></a></h2><p>Redis 的发布订阅模型非常简单高效，适合以下类型的应用：</p><ol><li><strong>实时通知和消息广播：</strong><ul><li><strong>网站通知：</strong> 当后台有新内容发布或重要事件发生时，通过频道广播给所有在线用户。</li><li><strong>系统状态监控：</strong> 将服务状态、性能指标等信息发布到特定频道，供多个监控客户端实时订阅。</li></ul></li><li><strong>在线聊天室：</strong><ul><li>每个聊天室可以作为一个频道。当用户在聊天室中发送消息时，通过 <code>PUBLISH</code> 命令将消息发送到对应的频道。所有订阅该频道的用户都能立即收到消息。</li></ul></li><li><strong>事件驱动的系统：</strong><ul><li>当一个服务完成某个任务（例如，用户完成支付）后，可以发布一个事件到频道。其他服务（例如，发送邮件服务、更新用户积分服务）订阅该频道，并根据接收到的事件消息执行相应的业务逻辑。</li></ul></li></ol><h2 id="案例说明-一个简单的在线聊天室" tabindex="-1"><a class="header-anchor" href="#案例说明-一个简单的在线聊天室"><span>案例说明：一个简单的在线聊天室</span></a></h2><p>我们来详细看一个使用 Redis 发布订阅实现简易在线聊天室的例子。</p><h3 id="场景描述" tabindex="-1"><a class="header-anchor" href="#场景描述"><span><strong>场景描述</strong></span></a></h3><p>假设我们有一个网站，提供一个公共聊天室，所有在线用户都可以在这里互相发送消息。</p><h3 id="设计思路" tabindex="-1"><a class="header-anchor" href="#设计思路"><span><strong>设计思路</strong></span></a></h3><ul><li><strong>每个聊天室就是一个 Redis 频道。</strong> 例如，公共聊天室的频道名可以是 <code>chat:public</code>。</li><li><strong>每个连接的用户就是一个订阅者。</strong> 当用户进入聊天室时，客户端代码会订阅 <code>chat:public</code> 频道。</li><li><strong>当用户发送消息时，消息发布者会向频道发送消息。</strong></li></ul><h3 id="操作流程" tabindex="-1"><a class="header-anchor" href="#操作流程"><span><strong>操作流程</strong></span></a></h3><ol><li><strong>用户 A 进入聊天室：</strong><ul><li>用户 A 的客户端连接到 Redis，并执行 <code>SUBSCRIBE chat:public</code> 命令。</li><li>此时，用户 A 的客户端进入订阅模式，等待 <code>chat:public</code> 频道的消息。</li></ul></li><li><strong>用户 B 进入聊天室：</strong><ul><li>用户 B 的客户端同样连接到 Redis，并执行 <code>SUBSCRIBE chat:public</code> 命令。</li><li>用户 B 也进入订阅模式，与用户 A 一起等待该频道的消息。</li></ul></li><li><strong>用户 C 发送消息：</strong><ul><li>用户 C 的客户端连接到 Redis，执行 <code>PUBLISH chat:public &quot;Hello everyone, I&#39;m C.&quot;</code> 命令。</li><li>Redis 服务器接收到命令后，会立即将这条消息广播给所有订阅了 <code>chat:public</code> 的客户端，即用户 A 和用户 B。</li><li>用户 A 和用户 B 的客户端会立即收到消息，并将其显示在聊天室界面上。</li></ul></li></ol><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点"><span><strong>优点</strong></span></a></h3><ul><li><strong>低延迟：</strong> 消息通过 Redis 即时推送，几乎没有延迟，非常适合实时通信。</li><li><strong>简单：</strong> 实现非常简单，不需要复杂的架构和逻辑。</li><li><strong>解耦：</strong> 用户 C 不需要知道有 A 和 B 在线，也不需要与 A 和 B 直接通信。他们之间唯一的桥梁就是 <code>chat:public</code> 这个频道。</li></ul><h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span><strong>缺点</strong></span></a></h3><ul><li><strong>离线消息：</strong> 如果用户 A 在用户 C 发送消息时离线了，当他重新上线并订阅 <code>chat:public</code> 频道时，他将收不到 C 发送的那条消息。</li></ul><h2 id="发布订阅的优缺点" tabindex="-1"><a class="header-anchor" href="#发布订阅的优缺点"><span>发布订阅的优缺点</span></a></h2><h3 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1"><span>优点</span></a></h3><ul><li><strong>简单高效：</strong> 模型非常简单，易于理解和使用，性能极高。</li><li><strong>低耦合：</strong> 发布者和订阅者完全解耦，它们不需要知道对方的存在，只需要关心共同的频道。</li><li><strong>实时性强：</strong> 消息是即时推送的，适用于对延迟敏感的场景。</li></ul><h3 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1"><span>缺点</span></a></h3><ul><li><strong>不保证消息送达：</strong> 如果订阅者在消息发布时处于离线状态，它将永久丢失该消息。</li><li><strong>无持久化：</strong> Redis 不会存储发布过的消息。</li><li><strong>无回溯能力：</strong> 订阅者无法获取在它订阅之前发布的历史消息。</li></ul><p>如果你的业务场景需要保证消息不丢失、支持离线消息或需要消息持久化，那么 Redis Streams、专业的队列中间件（如 RabbitMQ、Kafka）会是更好的选择。</p><h2 id="常见-redis-客户端的发布订阅示例" tabindex="-1"><a class="header-anchor" href="#常见-redis-客户端的发布订阅示例"><span>常见 Redis 客户端的发布订阅示例</span></a></h2><h3 id="python-redis-py" tabindex="-1"><a class="header-anchor" href="#python-redis-py"><span>Python (redis-py)</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 连接到 Redis</span></span>
<span class="line"><span>r = redis.Redis(host=&#39;localhost&#39;, port=6379, db=0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def subscriber_example():</span></span>
<span class="line"><span>    &quot;&quot;&quot;订阅者示例&quot;&quot;&quot;</span></span>
<span class="line"><span>    pubsub = r.pubsub()</span></span>
<span class="line"><span>    pubsub.subscribe(&#39;my_channel&#39;)</span></span>
<span class="line"><span>    print(&quot;等待消息...&quot;)</span></span>
<span class="line"><span>    for message in pubsub.listen():</span></span>
<span class="line"><span>        if message[&#39;type&#39;] == &#39;message&#39;:</span></span>
<span class="line"><span>            print(f&quot;收到消息：{message[&#39;data&#39;].decode(&#39;utf-8&#39;)}&quot;)</span></span>
<span class="line"><span>            # 如果需要停止，可以添加逻辑，例如：</span></span>
<span class="line"><span>            if message[&#39;data&#39;].decode(&#39;utf-8&#39;) == &#39;exit&#39;:</span></span>
<span class="line"><span>                break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def publisher_example():</span></span>
<span class="line"><span>    &quot;&quot;&quot;发布者示例&quot;&quot;&quot;</span></span>
<span class="line"><span>    print(&quot;发布消息...&quot;)</span></span>
<span class="line"><span>    r.publish(&#39;my_channel&#39;, &#39;Hello, Redis Pub/Sub!&#39;)</span></span>
<span class="line"><span>    time.sleep(1)</span></span>
<span class="line"><span>    r.publish(&#39;my_channel&#39;, &#39;This is a new message.&#39;)</span></span>
<span class="line"><span>    time.sleep(1)</span></span>
<span class="line"><span>    # 发送一个退出消息来停止订阅者</span></span>
<span class="line"><span>    r.publish(&#39;my_channel&#39;, &#39;exit&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    # 可以在不同的终端分别运行发布者和订阅者</span></span>
<span class="line"><span>    import threading</span></span>
<span class="line"><span>    t1 = threading.Thread(target=subscriber_example)</span></span>
<span class="line"><span>    t2 = threading.Thread(target=publisher_example)</span></span>
<span class="line"><span>    t1.start()</span></span>
<span class="line"><span>    time.sleep(1)  # 确保订阅者先启动</span></span>
<span class="line"><span>    t2.start()</span></span>
<span class="line"><span>    t1.join()</span></span>
<span class="line"><span>    t2.join()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="node-js-ioredis" tabindex="-1"><a class="header-anchor" href="#node-js-ioredis"><span>Node.js (ioredis)</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>const Redis = require(&#39;ioredis&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 订阅者客户端</span></span>
<span class="line"><span>const subscriber = new Redis();</span></span>
<span class="line"><span>subscriber.subscribe(&#39;my_channel&#39;, (err, count) =&gt; {</span></span>
<span class="line"><span>  if (err) {</span></span>
<span class="line"><span>    console.error(&#39;订阅失败:&#39;, err);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    console.log(\`成功订阅 \${count} 个频道，等待消息...\`);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>subscriber.on(&#39;message&#39;, (channel, message) =&gt; {</span></span>
<span class="line"><span>  console.log(\`从频道 &quot;\${channel}&quot; 收到消息: \${message}\`);</span></span>
<span class="line"><span>  // 可以在这里处理消息</span></span>
<span class="line"><span>  if (message === &#39;exit&#39;) {</span></span>
<span class="line"><span>    subscriber.disconnect();</span></span>
<span class="line"><span>    publisher.disconnect();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 发布者客户端</span></span>
<span class="line"><span>const publisher = new Redis();</span></span>
<span class="line"><span>function publishMessages() {</span></span>
<span class="line"><span>  console.log(&#39;发布消息...&#39;);</span></span>
<span class="line"><span>  publisher.publish(&#39;my_channel&#39;, &#39;Hello, Redis Pub/Sub!&#39;);</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  setTimeout(() =&gt; {</span></span>
<span class="line"><span>    publisher.publish(&#39;my_channel&#39;, &#39;This is a new message.&#39;);</span></span>
<span class="line"><span>  }, 1000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  setTimeout(() =&gt; {</span></span>
<span class="line"><span>    publisher.publish(&#39;my_channel&#39;, &#39;exit&#39;);</span></span>
<span class="line"><span>  }, 2000);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 确保订阅者先启动</span></span>
<span class="line"><span>setTimeout(publishMessages, 500);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="java-jedis" tabindex="-1"><a class="header-anchor" href="#java-jedis"><span>Java (Jedis)</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import redis.clients.jedis.Jedis;</span></span>
<span class="line"><span>import redis.clients.jedis.JedisPubSub;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class PubSubExample {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        // 订阅者线程</span></span>
<span class="line"><span>        new Thread(() -&gt; {</span></span>
<span class="line"><span>            try (Jedis subscriberJedis = new Jedis(&quot;localhost&quot;)) {</span></span>
<span class="line"><span>                JedisPubSub listener = new JedisPubSub() {</span></span>
<span class="line"><span>                    @Override</span></span>
<span class="line"><span>                    public void onMessage(String channel, String message) {</span></span>
<span class="line"><span>                        System.out.println(&quot;从频道 &#39;&quot; + channel + &quot;&#39; 收到消息: &quot; + message);</span></span>
<span class="line"><span>                        if (message.equals(&quot;exit&quot;)) {</span></span>
<span class="line"><span>                            unsubscribe();</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                };</span></span>
<span class="line"><span>                System.out.println(&quot;等待消息...&quot;);</span></span>
<span class="line"><span>                subscriberJedis.subscribe(listener, &quot;my_channel&quot;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }).start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 发布者线程</span></span>
<span class="line"><span>        new Thread(() -&gt; {</span></span>
<span class="line"><span>            try (Jedis publisherJedis = new Jedis(&quot;localhost&quot;)) {</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    Thread.sleep(1000); // 确保订阅者先启动</span></span>
<span class="line"><span>                    System.out.println(&quot;发布消息...&quot;);</span></span>
<span class="line"><span>                    publisherJedis.publish(&quot;my_channel&quot;, &quot;Hello, Redis Pub/Sub!&quot;);</span></span>
<span class="line"><span>                    Thread.sleep(1000);</span></span>
<span class="line"><span>                    publisherJedis.publish(&quot;my_channel&quot;, &quot;This is a new message.&quot;);</span></span>
<span class="line"><span>                    Thread.sleep(1000);</span></span>
<span class="line"><span>                    publisherJedis.publish(&quot;my_channel&quot;, &quot;exit&quot;);</span></span>
<span class="line"><span>                } catch (InterruptedException e) {</span></span>
<span class="line"><span>                    e.printStackTrace();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }).start();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/nosqldb/mhwtbwr0/","title":"Redis 发布订阅","lang":"zh-CN","frontmatter":{"title":"Redis 发布订阅","createTime":"2025/08/26 13:24:57","permalink":"/nosqldb/mhwtbwr0/"},"readingTime":{"minutes":6.12,"words":1835},"git":{"createdTime":1756736713000},"filePathRelative":"notes/nosqldb/redises/Redis发布订阅.md","headers":[]}');export{r as comp,t as data};
