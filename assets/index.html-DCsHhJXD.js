import{a,c as n,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function d(p,s){return i(),n("div",null,s[0]||(s[0]=[e(`<p>MyBaits-Flex 内置了功能完善的多数据源支持^1.0.6，不需要借助第三方插件或者依赖，开箱即用， 支持包括 <code>druid</code>、<code>hikaricp</code>、<code>dbcp2</code>、<code>beecp</code> 在内的任何数据源，MyBatis-Flex 多数据源配置如下：</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    ds1:</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>    ds2:</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db2</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上配置中，<code>ds1</code> 和 <code>ds2</code> 是由用户自定义的，我们可以理解为数据源的名称，或者数据源的 <code>key</code>，这个在动态切换数据库中非常有用。</p><p>在无 Spring 或 Solon 框架的场景下，代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DataSource dataSource1 = new HikariDataSource();</span></span>
<span class="line"><span>dataSource1.setJdbcUrl(....)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DataSource dataSource2 = new HikariDataSource();</span></span>
<span class="line"><span>dataSource2.setJdbcUrl(....)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DataSource dataSource3 = new HikariDataSource();</span></span>
<span class="line"><span>dataSource3.setJdbcUrl(....)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MybatisFlexBootstrap.getInstance()</span></span>
<span class="line"><span>        .setDataSource(&quot;ds1&quot;, dataSource1)</span></span>
<span class="line"><span>        .addDataSource(&quot;ds2&quot;, dataSource2)</span></span>
<span class="line"><span>        .addDataSource(&quot;ds3&quot;, dataSource3)</span></span>
<span class="line"><span>        .start();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用"><span>开始使用</span></a></h2><p>默认使用第一个配置的数据源：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;Row&gt; rows = Db.selectAll(&quot;tb_account&quot;);</span></span>
<span class="line"><span>System.out.println(rows);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过编码的方式，切换到数据源 <code>ds2</code>：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>try{</span></span>
<span class="line"><span>    DataSourceKey.use(&quot;ds2&quot;)</span></span>
<span class="line"><span>    List&lt;Row&gt; rows = Db.selectAll(&quot;tb_account&quot;);</span></span>
<span class="line"><span>    System.out.println(rows);</span></span>
<span class="line"><span>}finally{</span></span>
<span class="line"><span>    DataSourceKey.clear();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;Row&gt; rows =  DataSourceKey.use(&quot;ds2&quot;</span></span>
<span class="line"><span>    , () -&gt; Db.selectAll(&quot;tb_account&quot;));</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据源切换-设置" tabindex="-1"><a class="header-anchor" href="#数据源切换-设置"><span>数据源切换（设置）</span></a></h2><p>MyBatis-Flex 提供了 4 种方式来配置数据源：</p><ul><li>1、编码，使用<code>DataSourceKey.use</code> 方法。</li><li>2、<code>@UseDataSource(&quot;dataSourceName&quot;)</code> 在 Mapper 类上，添加注解，用于指定使用哪个数据源。</li><li>3、<code>@UseDataSource(&quot;dataSourceName&quot;)</code> 在 Mapper 方法上，添加注解，用于指定使用哪个数据源。</li><li>4、<code>@Table(dataSource=&quot;dataSourceName&quot;)</code> 在 Entity 类上添加注解，该 Entity 的增删改查请求默认使用该数据源。</li></ul><blockquote><p>在 SpringBoot 或 Solon 项目上，<code>@UseDataSource(&quot;dataSourceName&quot;)</code> 也可用于在 Controller 或者 Service 类上。若是 Spring 项目（非 SpringBoot）, 用户需要参考 <code>MultiDataSourceAutoConfiguration</code> 进行配置后才能使用。</p></blockquote><p><code>DataSourceKey.use</code> 示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>try{</span></span>
<span class="line"><span>    DataSourceKey.use(&quot;ds2&quot;)</span></span>
<span class="line"><span>    List&lt;Row&gt; rows = Db.selectAll(&quot;tb_account&quot;);</span></span>
<span class="line"><span>    System.out.println(rows);</span></span>
<span class="line"><span>}finally{</span></span>
<span class="line"><span>    DataSourceKey.clear();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@UseDataSource(&quot;dataSourceName&quot;)</code> 示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@UseDataSource(&quot;ds2&quot;)</span></span>
<span class="line"><span>interface AccountMapper extends BaseMapper{</span></span>
<span class="line"><span>    List&lt;Account&gt; myMethod();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>interface AccountMapper extends BaseMapper{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @UseDataSource(&quot;ds2&quot;)</span></span>
<span class="line"><span>    List&lt;Account&gt; myMethod();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@UseDataSource(value = &quot;#my_expression&quot;)</code>扩展数据源切换，表达式动态读取 key 值</p><ul><li>自定义表达式扩展，对接口 DataSourceProcessor 进行实现，推荐约定动态表达式以 <code>#</code> 作为起始标识(当然并不强制做要求)</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 自定义基于Session的表达式取值示例</span></span>
<span class="line"><span>public class InSessionDataSourceProcessor implements DataSourceProcessor {</span></span>
<span class="line"><span>    private static final String SESSION_PREFIX = &quot;#session&quot;;</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String process(String dataSourceKey, Object mapper, Method method, Object[] arguments) {</span></span>
<span class="line"><span>        if (StrUtil.isBlank(dataSourceKey)) return null;</span></span>
<span class="line"><span>        if (!dataSourceKey.startsWith(SESSION_PREFIX)) return null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        HttpServletRequest request = RequestContextHolder.get.....;</span></span>
<span class="line"><span>        if (null==request) return null;</span></span>
<span class="line"><span>        return request.getSession().getAttribute(dataSourceKey.substring(9)).toString();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>内置取值表达式取值解析处理器，作为示例参考 <ul><li><code>DelegatingDataSourceProcessor</code>，对<code>DataSourceProcessor</code>结构进行扩大和增强的委托类，多处理器推荐使用该委托类进行注入，注意委托类内使用<code>List</code>委托管理多个解析处理器，执行时有先后顺序。</li><li><code>ParamIndexDataSourceProcessor</code>，针对简单参数快速取值。</li><li><code>SpelExpressionDataSourceProcessor</code>，<code>Spring</code> 模式下 <code>SPEL</code> 表达式取值。</li></ul></li><li>注入动态数据源取值处理器</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 注入顺序既为执行时的先后顺序(前面的处理器一旦正确处理，将不会再往下传递处理)</span></span>
<span class="line"><span>DelegatingDataSourceProcessor dataSourceProcessor = DelegatingDataSourceProcessor.with(</span></span>
<span class="line"><span>        // 参数索引快速取值的</span></span>
<span class="line"><span>        new ParamIndexDataSourceProcessor(),</span></span>
<span class="line"><span>        // Spel 表达式的</span></span>
<span class="line"><span>        new SpelExpressionDataSourceProcessor(),</span></span>
<span class="line"><span>        new .....等多个自行扩展表达式()</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>// 实例 setter 赋值</span></span>
<span class="line"><span>DataSourceManager.setDataSourceProcessor(dataSourceProcessor);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>应用示例：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Mapper</span></span>
<span class="line"><span>public interface MyMapper extends BaseMapper&lt;MyEntity &gt;{</span></span>
<span class="line"><span>    // 取值第一个参数的值（arg0的值）</span></span>
<span class="line"><span>    @UseDataSource(value = &quot;#first&quot;)</span></span>
<span class="line"><span>    MyEntity testFirst(String arg0, String arg1, String arg2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取值索引1(第二个参数 arg1 )的值</span></span>
<span class="line"><span>    @UseDataSource(value = &quot;#index1&quot;)</span></span>
<span class="line"><span>    MyEntity testIndex(String arg0, String arg1, String arg2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取值最后一个参数的值(arg3的值)</span></span>
<span class="line"><span>    @UseDataSource(value = &quot;#last&quot;)</span></span>
<span class="line"><span>    MyEntity testLast(String arg0, String arg1, String arg2, String arg3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Spel 表达式取值数据源</span></span>
<span class="line"><span>    @UseDataSource(value = &quot;#condition.getDsId()&quot;)</span></span>
<span class="line"><span>    MyEntity testSpel(MyDatasourceCondition condition);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>调用</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public void test(){</span></span>
<span class="line"><span>    // mapper中的注解 @UseDataSource(value = &quot;#first&quot;)</span></span>
<span class="line"><span>    myMapper.testFirst(&quot;my-dskey1&quot;, &quot;arg1&quot;, &quot;arg2&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取值索引1(第二个参数)的值；mapper中的注解 @UseDataSource(value = &quot;#index1&quot;)</span></span>
<span class="line"><span>    myMapper.testIndex(&quot;arg0&quot;, &quot;my-dskey2&quot;, &quot;arg2&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // mapper中的注解 @UseDataSource(value = &quot;#last&quot;)</span></span>
<span class="line"><span>    myMapper.testLast(&quot;arg0&quot;, &quot;arg1&quot;, &quot;arg2&quot;,&quot;my-dskey4&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    MyDatasourceCondition condition = new MyDatasourceCondition();</span></span>
<span class="line"><span>    condition.setDsId(&quot;my-dskey5&quot;);</span></span>
<span class="line"><span>    // mapper中的注解 @UseDataSource(value = &quot;#condition.getDsId()&quot;)</span></span>
<span class="line"><span>    myMapper.testSpel(condition);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>注意： <ul><li>1：使用区分<code>Spring模式</code>和<code>非Spring</code>模式，<code>Spring</code>模式下，处理逻辑<code>DataSourceInterceptor</code>优先级高于 <code>FlexMapperProxy</code>， 所以<code>Spring模式下仅 DataSourceInterceptor 生效</code>(切面生效的前提下)。<code>非Spring</code> 模式下,<code>仅支持注解使用到 Mapper(Dao层)</code>, 使用到其他层(如Service层)不支持注解解析。</li><li>2：<code>Spring模式</code>下,不区分使用到程序的层(Controller、Service、Dao层都支持)，下层控制粒度细上层控制粒粗，使用时根据需要进行灵活应用。</li></ul></li></ul><p><code>@Table(dataSource=&quot;dataSourceName&quot;)</code> 示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;, dataSource = &quot;ds2&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据源配置的优先级</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DataSourceKey.use()\` &gt; \`@UseDataSource()在方法上\` &gt; \`@UseDataSource()在类上\` &gt;\`@Table(dataSource=&quot;...&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="数据源缺失处理器" tabindex="-1"><a class="header-anchor" href="#数据源缺失处理器"><span>数据源缺失处理器</span></a></h2><p>当无法根据 <code>dataSourceKey</code> 找到数据源时，默认情况下会抛出 <code>IllegalStateException</code> 异常。 数据源缺失处理器（<code>DataSourceMissingHandler</code>）提供了更加灵活的处理方式，你可以通过它自定义处理逻辑（如：记录日志、抛出异常或主动初始化新的数据源）。</p><h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h3><p>我们推荐使用 <code>MyBatisFlexCustomizer</code> 来配置数据源缺失处理器，如下所示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class MyBatisFlexConfiguration implements MyBatisFlexCustomizer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void customize(FlexGlobalConfig globalConfig) {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 配置数据源缺失处理器：此处演示的是以后备逻辑主动初始化数据源</span></span>
<span class="line"><span>        globalConfig.setDataSourceMissingHandler((dataSourceKey, dataSourceMap) -&gt; {</span></span>
<span class="line"><span>            // 根据 key 获取数据源</span></span>
<span class="line"><span>            DataSource ds = customCreateDataSource(dataSourceKey);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 取不到的时候返回 null，后续代码逻辑仍然由 FlexDataSource 处理（即抛出异常）</span></span>
<span class="line"><span>            if (ds == null) return null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 添加新的数据源，避免下次再次触发和创建</span></span>
<span class="line"><span>            dataSourceMap.put(dataSourceKey, ds);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return dataSourceMap;</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更多的-spring-或-solon-yaml-配置支持" tabindex="-1"><a class="header-anchor" href="#更多的-spring-或-solon-yaml-配置支持"><span>更多的 Spring 或 Solon Yaml 配置支持</span></a></h2><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    ds1:</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>    ds2:</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db2</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上配置中，<code>ds1</code> 和 <code>ds2</code> 并未指定使用哪个数据连接池，MyBatis-Flex 会 <strong>自动探测</strong> 当前项目依赖了哪个连接池。 目前支持了 <code>druid</code>、<code>hikaricp</code>、<code>dbcp2</code>、<code>beecp</code> 的自动探测，如果项目中使用的不是这 4 种类型只有，需要添加 <code>type</code> 配置，如下所示：</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    ds1:</span></span>
<span class="line"><span>      type: com.your.datasource.type1</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>    ds2:</span></span>
<span class="line"><span>      type: com.your.datasource.type2</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db2</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，项目若使用到了多个数据源类型，则也需要添加 <code>type</code> 来指定当前数据源的类型。</p><p>除了 <code>type</code>、<code>url</code>、<code>username</code>、<code>password</code> 的配置以外，MyBatis-Flex 支持该 <code>DataSource</code> 类型的所有参数配置， 例如，在 <code>DruidDataSource</code> 类中存在 <code>setAsyncInit</code> 方法，我们就可以添加 <code>asyncInit</code> 的配置，如下所示：</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    ds1:</span></span>
<span class="line"><span>      type: druid</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>      asyncInit: true</span></span>
<span class="line"><span>    ds2:</span></span>
<span class="line"><span>      type: com.your.datasource.type2</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db2</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，只要该 <code>DataSource</code> 有 setter 方法，我们就可以在配置文件中进行配。与此相反的是：若该 <code>DataSource</code> 类型没有该属性，则不能使用这个配置。</p><p>提示</p><p>在数据源的配置中，<code>type</code> 可以配置为某个 DataSource 的类名，也可以配置为别名，别名支持有：<code>druid</code>、 <code>hikari</code>、<code>hikaricp</code>、<code>bee</code>、<code>beecp</code>、<code>dbcp</code>、<code>dbcp2</code>。</p><h2 id="动态添加新的数据源" tabindex="-1"><a class="header-anchor" href="#动态添加新的数据源"><span>动态添加新的数据源</span></a></h2><p>在多租户等某些场景下，我们可能需要用到动态的添加新的数据源，此时可以通过如下的方式进行添加。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>FlexDataSource flexDataSource = FlexGlobalConfig.getDefaultConfig()</span></span>
<span class="line"><span>                                .getDataSource();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//新的数据源</span></span>
<span class="line"><span>HikariDataSource newDataSource = new HikariDataSource();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>flexDataSource.addDataSource(&quot;newKey&quot;, newDataSource);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要注意的是：</strong> 通过 FlexGlobalConfig 去获取 FlexDataSource 时，需等待应用完全启动成功后，才能正常获取 FlexDataSource， 否则将会得到 null 值。</p><p>Spring 用户可以通过 <code>ApplicationListener</code> 去监听 <code>ContextRefreshedEvent</code> 事件，然后再去添加新的数据源，如下代码所示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class DataSourceInitListener implements ApplicationListener&lt;ContextRefreshedEvent&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onApplicationEvent(ContextRefreshedEvent event) {</span></span>
<span class="line"><span>        FlexDataSource dataSource = FlexGlobalConfig.getDefaultConfig()</span></span>
<span class="line"><span>                                    .getDataSource();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        dataSource.addDataSource(&quot;....&quot;, new DruidDataSource(&quot;...&quot;));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多数据源负载均衡-1-5-4" tabindex="-1"><a class="header-anchor" href="#多数据源负载均衡-1-5-4"><span>多数据源负载均衡 ^1.5.4</span></a></h2><p>数据源负载均衡指的是：在进行数据查询的时候，随机使用一个数据源。 这是的在高并发的场景下，起到负载的效果。</p><p>假设多数据源配置如下：</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>mybatis-flex:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    ds1:</span></span>
<span class="line"><span>      type: druid</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>      asyncInit: true</span></span>
<span class="line"><span>    ds2:</span></span>
<span class="line"><span>      type: com.your.datasource.type2</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db2</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span>
<span class="line"><span>    other:</span></span>
<span class="line"><span>      type: com.your.datasource.type2</span></span>
<span class="line"><span>      url: jdbc:mysql://127.0.0.1:3306/db3</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: 123456</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置了三个数据源，分别为：<code>ds1</code>、<code>ds2</code>、<code>other</code>，假设我们想负载均衡使用 <code>ds1</code>、<code>ds2</code> ，那么代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>try{</span></span>
<span class="line"><span>    DataSourceKey.use(&quot;ds*&quot;);</span></span>
<span class="line"><span>    List&lt;Row&gt; rows = Db.selectAll(&quot;tb_account&quot;);</span></span>
<span class="line"><span>    System.out.println(rows);</span></span>
<span class="line"><span>}finally{</span></span>
<span class="line"><span>    DataSourceKey.clear();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>DataSourceKey.use(&quot;ds*&quot;)</code> 中的 <code>ds*</code> 指的是使用 <code>ds</code> 开头的任意一个数据源。<code>ds*</code> 必须以 &quot;<code>*</code>&quot; 结尾， 中间不能有空格，比如 &quot;<code>ds *</code>&quot; 中间有空格是不行的。</p>`,69)]))}const r=a(l,[["render",d]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/iy2mouvq/","title":"MyBaits-Flex多数据源配置","lang":"zh-CN","frontmatter":{"title":"MyBaits-Flex多数据源配置","createTime":"2025/08/27 09:53:33","permalink":"/framework/mybatisflex/ad/iy2mouvq/"},"readingTime":{"minutes":6.87,"words":2061},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/多数据源.md","headers":[]}');export{r as comp,t as data};
