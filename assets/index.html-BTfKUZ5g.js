import{a,c as n,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),n("div",null,s[0]||(s[0]=[e(`<p>MyBatis-Flex 提供了一个名为 <code>Db.tx()</code> 的方法^1.0.6，用于进行事务管理，若使用 Spring 框架的场景下，也可使用 <code>@Transactional</code> 注解进行事务管理。</p><p><code>Db.tx()</code> 方法定义如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>boolean tx(Supplier&lt;Boolean&gt; supplier);</span></span>
<span class="line"><span>boolean tx(Supplier&lt;Boolean&gt; supplier, Propagation propagation);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;T&gt; T txWithResult(Supplier&lt;T&gt; supplier);</span></span>
<span class="line"><span>&lt;T&gt; T txWithResult(Supplier&lt;T&gt; supplier, Propagation propagation);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法：</p><ul><li>tx：返回结果为 Boolean，返回 <code>null</code> 或者 <code>false</code> 或者 抛出异常，事务回滚</li><li>txWithResult：返回结果由 <code>Supplier</code> 参数决定，只有抛出异常时，事务回滚</li></ul><p>参数：</p><ul><li><strong>supplier</strong>：要执行的内容（代码）</li><li><strong>propagation</strong>：事务传播属性</li></ul><p>事务传播属性 <code>propagation</code> 是一个枚举类，其枚举内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//若存在当前事务，则加入当前事务，若不存在当前事务，则创建新的事务</span></span>
<span class="line"><span>REQUIRED(0),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//若存在当前事务，则加入当前事务，若不存在当前事务，则已非事务的方式运行</span></span>
<span class="line"><span>SUPPORTS(1),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//若存在当前事务，则加入当前事务，若不存在当前事务，则抛出异常</span></span>
<span class="line"><span>MANDATORY(2),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//始终以新事务的方式运行，若存在当前事务，则暂停（挂起）当前事务。</span></span>
<span class="line"><span>REQUIRES_NEW(3),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//以非事务的方式运行，若存在当前事务，则暂停（挂起）当前事务。</span></span>
<span class="line"><span>NOT_SUPPORTED(4),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//以非事务的方式运行，若存在当前事务，则抛出异常。</span></span>
<span class="line"><span>NEVER(5),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//暂时不支持</span></span>
<span class="line"><span>NESTED(6),</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Db.tx()</code> 代码示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Db.tx(() -&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //进行事务操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若 <code>tx()</code> 方法抛出异常，或者返回 false，或者返回 null，则回滚事务。只有正常返回 true 的时候，进行事务提交。</p><h2 id="嵌套事务" tabindex="-1"><a class="header-anchor" href="#嵌套事务"><span>嵌套事务</span></a></h2><p>示例代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Db.tx(() -&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //进行事务操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean success = Db.tx(() -&gt; {</span></span>
<span class="line"><span>        //另一个事务的操作</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>支持无限极嵌套，默认情况下，嵌套事务直接的关系是：<code>REQUIRED</code>（若存在当前事务，则加入当前事务，若不存在当前事务，则创建新的事务）。</p><h2 id="transactional" tabindex="-1"><a class="header-anchor" href="#transactional"><span>@Transactional</span></a></h2><p>MyBatis-Flex 已支持 Spring 框架的 <code>@Transactional</code>，在使用 SpringBoot 的情况下，可以直接使用 <code>@Transactional</code> 进行事务管理。 同理，使用 Spring 的 <code>TransactionTemplate</code> 进行事务管理也是没问题的。</p><blockquote><p>注意：若项目未使用 SpringBoot，只用到了 Spring，需要参考 MyBatis-Flex 的 <a href="https://gitee.com/mybatis-flex/mybatis-flex/blob/main/mybatis-flex-spring-boot-starter/src/main//com/mybatisflex/spring/boot/FlexTransactionAutoConfiguration." target="_blank" rel="noopener noreferrer">FlexTransactionAutoConfiguration</a> 进行事务配置，才能正常使用 <code>@Transactional</code> 注解。</p></blockquote><h2 id="多数据源注意事项" tabindex="-1"><a class="header-anchor" href="#多数据源注意事项"><span>多数据源注意事项</span></a></h2><p>注意：在多数据源的情况下，所有数据源的数据库请求（Connection）会执行相同的 <code>commit</code> 或者 <code>rollback</code>，MyBatis-Flex 只保证了程序端的原子操作， 但并不能保证多个数据源之间的原子操作。例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Transactional</span></span>
<span class="line"><span>public void doSomething(){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try{</span></span>
<span class="line"><span>        DataSourceKey.use(&quot;ds1&quot;);</span></span>
<span class="line"><span>        Db.updateBySql(&quot;update ....&quot;);</span></span>
<span class="line"><span>    }finally{</span></span>
<span class="line"><span>        DataSourceKey.clear()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try{</span></span>
<span class="line"><span>        DataSourceKey.use(&quot;ds2&quot;);</span></span>
<span class="line"><span>        Db.updateBySql(&quot;update ...&quot;);</span></span>
<span class="line"><span>    }finally{</span></span>
<span class="line"><span>        DataSourceKey.clear();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //抛出异常</span></span>
<span class="line"><span>    int x = 1/0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上的例子中，执行了两次 <code>Db.updateBySql(...)</code>，它们是两个不同的数据源，但它们都在同一个事务 <code>@Transactional</code> 里，因此，当抛出异常的时候， 它们都会进行回滚（rollback）。</p><p>以上提到的 <code>并非原子操作</code>，指的是：</p><blockquote><p>假设在回滚的时候，恰好其中一个数据库出现了异常（比如 网络问题，数据库崩溃），此时，可能只有一个数据库的数据正常回滚（rollback）。 但无论如何，MyBatis-Flex 都会保证在同一个 <code>@Transactional</code> 中的多个数据源，保持相同的 commit 或者 rollback 行为。</p></blockquote><h2 id="seata-分布式事务" tabindex="-1"><a class="header-anchor" href="#seata-分布式事务"><span>Seata 分布式事务</span></a></h2><p>Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。 Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。 官方网站：https://seata.io/zh-cn/index.html</p><h3 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用"><span>开始使用</span></a></h3><p><strong>第 1 步：在 <code>application.yml</code> 配置开启 Seata 分布式事务功能：</strong></p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  seata-config:</span></span>
<span class="line"><span>    enable: true</span></span>
<span class="line"><span>    seata-mode: XA # 支持 XA 或者 AT</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>XA：指的是: 分布式事务协议（X/Open Distributed Transaction Processing），它是一种由 X/Open 组织制定的分布式事务标准， XA 使用两阶段提交（2PC，Two-Phase Commit）来保证所有资源同时提交或回滚任何特定的事务。 目前，几乎所有主流的数据库都对 XA 规范 提供了支持，是 Seata 默认使用的模式。</li><li>AT： 是一种无侵入的分布式事务解决方案。在 AT 模式下，用户只需关注自己的 “<code>业务SQL</code>”， 用户的 “<code>业务SQL</code>” 作为一阶段，Seata 会根据 SQL 内容，自动生成事务的二阶段提交和回滚操作。</li></ul><p><strong>第 2 步：在 <code>application.yml</code> 添加 Seata 的相关配置：</strong></p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>seata:</span></span>
<span class="line"><span>  enabled: true</span></span>
<span class="line"><span>  application-id: business-service</span></span>
<span class="line"><span>  tx-service-group: my_test_tx_group</span></span>
<span class="line"><span>  enable-auto-data-source-proxy: false  #必须</span></span>
<span class="line"><span>#  use-jdk-proxy: false</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    rm:</span></span>
<span class="line"><span>      async-commit-buffer-limit: 1000</span></span>
<span class="line"><span>      report-retry-count: 5</span></span>
<span class="line"><span>      table-meta-check-enable: false</span></span>
<span class="line"><span>      report-success-enable: false</span></span>
<span class="line"><span>      lock:</span></span>
<span class="line"><span>        retry-interval: 10</span></span>
<span class="line"><span>        retry-times: 30</span></span>
<span class="line"><span>        retry-policy-branch-rollback-on-conflict: true</span></span>
<span class="line"><span>    tm:</span></span>
<span class="line"><span>      commit-retry-count: 5</span></span>
<span class="line"><span>      rollback-retry-count: 5</span></span>
<span class="line"><span>    undo:</span></span>
<span class="line"><span>      data-validation: true</span></span>
<span class="line"><span>      log-serialization: jackson</span></span>
<span class="line"><span>      log-table: undo_log</span></span>
<span class="line"><span>    log:</span></span>
<span class="line"><span>      exceptionRate: 100</span></span>
<span class="line"><span>  service:</span></span>
<span class="line"><span>    vgroup-mapping:</span></span>
<span class="line"><span>      my_test_tx_group: default</span></span>
<span class="line"><span>    grouplist:</span></span>
<span class="line"><span>      default: 127.0.0.1:8091</span></span>
<span class="line"><span>    #enable-degrade: false</span></span>
<span class="line"><span>    #disable-global-transaction: false</span></span>
<span class="line"><span>  transport:</span></span>
<span class="line"><span>    shutdown:</span></span>
<span class="line"><span>      wait: 3</span></span>
<span class="line"><span>    thread-factory:</span></span>
<span class="line"><span>      boss-thread-prefix: NettyBoss</span></span>
<span class="line"><span>      worker-thread-prefix: NettyServerNIOWorker</span></span>
<span class="line"><span>      server-executor-thread-prefix: NettyServerBizHandler</span></span>
<span class="line"><span>      share-boss-worker: false</span></span>
<span class="line"><span>      client-selector-thread-prefix: NettyClientSelector</span></span>
<span class="line"><span>      client-selector-thread-size: 1</span></span>
<span class="line"><span>      client-worker-thread-prefix: NettyClientWorkerThread</span></span>
<span class="line"><span>      worker-thread-size: default</span></span>
<span class="line"><span>      boss-thread-size: 1</span></span>
<span class="line"><span>    type: TCP</span></span>
<span class="line"><span>    server: NIO</span></span>
<span class="line"><span>    heartbeat: true</span></span>
<span class="line"><span>    serialization: seata</span></span>
<span class="line"><span>    compressor: none</span></span>
<span class="line"><span>    enable-client-batch-send-request: true</span></span>
<span class="line"><span>  config:</span></span>
<span class="line"><span>    type: file</span></span>
<span class="line"><span>  registry:</span></span>
<span class="line"><span>    type: file</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上配置的含义，请参考 Seata 官方网站：https://seata.io/zh-cn/docs/user/configurations.html</p></blockquote><p><strong>3、通过使用 <code>@GloabalTransactional</code> 开始 Seata 分布式事务。</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@GlobalTransactional</span></span>
<span class="line"><span>public void purchase(String userId, String commodityCode, int orderCount) {</span></span>
<span class="line"><span>    LOGGER.info(&quot;purchase begin ... xid: &quot; + RootContext.getXID());</span></span>
<span class="line"><span>    stockClient.deduct(commodityCode, orderCount);</span></span>
<span class="line"><span>    orderClient.create(userId, commodityCode, orderCount);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>更多关于 Seata 的知识，请异步 Seata 官方网站了解：https://seata.io/zh-cn/docs ，也可以参考 Seata 的官方示例快速开始：https://seata.io/zh-cn/docs/user/quickstart.html</p></blockquote><h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h3><p>1.使用<code>seata-spring-boot-starter</code>的时候请关闭自动代理</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>seata:</span></span>
<span class="line"><span>  enable-auto-data-source-proxy: false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.使用 <code>seata-all</code> 请不要使用 <code>@EnableAutoDataSourceProxy</code></p><p>3.如果是 SpringBoot 项目需要引入相关 Maven 依赖，例如：</p><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;io.seata&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;seata-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.7.0&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><p><a href="https://gitee.com/mybatis-flex/mybatis-flex-samples/tree/master/mybatis-flex-spring-boot-seata-demo" target="_blank" rel="noopener noreferrer">mybatis-flex-spring-boot-seata-demo</a> : Seata 官方 demo 与 flex 结合。</p><h2 id="子父线程同时访问一个threadlocal访问的场景" tabindex="-1"><a class="header-anchor" href="#子父线程同时访问一个threadlocal访问的场景"><span>子父线程同时访问一个ThreadLocal访问的场景</span></a></h2><p>考虑到某些场景下，子父线程会同时访问父线程进行传递值进行切换数据源的场景，提供了以下的支持 比如如下的代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public static void main(String[]args){</span></span>
<span class="line"><span>        //线程1</span></span>
<span class="line"><span>        //进行数据库操作读取 ds1</span></span>
<span class="line"><span>        //切换数据源2</span></span>
<span class="line"><span>        DataSourceKey.use(&quot;ds2&quot;);</span></span>
<span class="line"><span>        new Thread(() -&gt; {</span></span>
<span class="line"><span>            //查询数据源 ds2</span></span>
<span class="line"><span>            //实际在线程2并不是ds2而是ds1</span></span>
<span class="line"><span>        }).start();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此类场景进行如下的方案进行修改</p><ol><li>使用可以跨越线程池的<code>ThreadLocal</code>比如阿里的<code>transmittable-thread-local</code> 导入如下的包</li></ol><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>     &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;transmittable-thread-local&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;version&gt;2.14.2&lt;/version&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>对切换的源码进行修改</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public static void main(String[]args){</span></span>
<span class="line"><span>        DataSourceKey.setAnnotationKeyThreadLocal(new TransmittableThreadLocal&lt;&gt;());</span></span>
<span class="line"><span>        DataSourceKey.setManualKeyThreadLocal(new TransmittableThreadLocal&lt;&gt;());</span></span>
<span class="line"><span>        //线程1</span></span>
<span class="line"><span>        //进行数据库操作读取 ds1</span></span>
<span class="line"><span>        //切换数据源2</span></span>
<span class="line"><span>        DataSourceKey.use(&quot;ds2&quot;);</span></span>
<span class="line"><span>        new Thread(() -&gt; {</span></span>
<span class="line"><span>            //查询数据源 ds2</span></span>
<span class="line"><span>            //实际在线程2使用的就是ds2</span></span>
<span class="line"><span>        }).start();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展阅读" tabindex="-1"><a class="header-anchor" href="#扩展阅读"><span>扩展阅读</span></a></h3><p><a href="https://github.com/alibaba/transmittable-thread-local" target="_blank" rel="noopener noreferrer">transmittable-thread-local</a> 可以不侵入进行代码原线程的替换</p>`,60)]))}const r=a(l,[["render",p]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/0slamdfl/","title":"MyBatis-Flex事务管理","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex事务管理","createTime":"2025/08/27 09:57:08","permalink":"/framework/mybatisflex/ad/0slamdfl/"},"readingTime":{"minutes":5.96,"words":1788},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/事务管理.md","headers":[]}');export{r as comp,t as data};
