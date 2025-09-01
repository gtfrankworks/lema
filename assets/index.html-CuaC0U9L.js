import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>MyBatis-Flex 提供了 <code>@Column</code> 用来对字段进行更多的配置，以下是 <code>@Column</code> 的代码定义：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public @interface Column {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 字段名称</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String value() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 是否忽略该字段，可能只是业务字段，而非数据库对应字段</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean ignore() default false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * insert 的时候默认值，这个值会直接被拼接到 sql 而不通过参数设置</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String onInsertValue() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * update 的时候自动赋值，这个值会直接被拼接到 sql 而不通过参数设置</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String onUpdateValue() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 是否是大字段，大字段 APT 不会生成到 DEFAULT_COLUMNS 里</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean isLarge() default false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 是否是逻辑删除字段，一张表中只能存在 1 一个逻辑删除字段</span></span>
<span class="line"><span>     * 逻辑删除的字段，被删除时，会设置为 1，正常状态为 0</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean isLogicDelete() default false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 是否为乐观锁字段，若是乐观锁字段的话，数据更新的时候会去检测当前版本号，若更新成功的话会设置当前版本号 +1</span></span>
<span class="line"><span>     * 只能用于数值的字段</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean version() default false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 配置的 jdbcType</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    JdbcType jdbcType() default JdbcType.UNDEFINED;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 自定义 TypeHandler</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Class&lt;? extends TypeHandler&gt; typeHandler() default UnknownTypeHandler.class;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="value-属性" tabindex="-1"><a class="header-anchor" href="#value-属性"><span>value 属性</span></a></h2><p>value 是用来标识列名的，默认情况下， entity 中的字段转换为列名默认以下划线的方式进行转换， 例如，userName 对应的列名为 user_name。</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(&quot;birthday_datetime&quot;)</span></span>
<span class="line"><span>    private Date birthday;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码中，3 个属性分别对应的字段为： id, user_name, birthday_datetime。</p><h2 id="ignore" tabindex="-1"><a class="header-anchor" href="#ignore"><span>ignore</span></a></h2><p>当我们为了业务需要，在 entity 类中添加了某个字段，但是数据库却不存在该列时，使用 <code>@Column(ignore = true)</code> 修饰。</p><h2 id="oninsertvalue" tabindex="-1"><a class="header-anchor" href="#oninsertvalue"><span>onInsertValue</span></a></h2><p>设置数据被插入时的默认值，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_article&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(onInsertValue = &quot;now()&quot;)</span></span>
<span class="line"><span>    private Date created;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当数据被插入的时候，生成的 SQL 如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>INSERT INTO \`tb_article\`(title, created)</span></span>
<span class="line"><span>VALUES (?, now())</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，在 insert 中，<code>onInsertValue</code> 配置的内容会直接参与 SQL 拼接，而不是通过 JDBC 的 Statement 参数设置，需要开发者注意 <code>onInsertValue</code> 的内容，否则可能会造成 SQL 错误。</p><h2 id="onupdatevalue" tabindex="-1"><a class="header-anchor" href="#onupdatevalue"><span>onUpdateValue</span></a></h2><p>当数据被更新时，设置的默认值。</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_article&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(onUpdateValue = &quot;now()&quot;, onInsertValue = &quot;now()&quot;)</span></span>
<span class="line"><span>    private Date modified;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当数据更新时，其执行的 SQL 如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>UPDATE \`tb_article\`</span></span>
<span class="line"><span>SET \`title\`    = ?,</span></span>
<span class="line"><span>    \`modified\` = now()</span></span>
<span class="line"><span>WHERE \`id\` = ?</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>onUpdateValue</code> 配置的内容 &quot;now()&quot; 会直接参与 SQL 的赋值拼接。</p><h2 id="islarge" tabindex="-1"><a class="header-anchor" href="#islarge"><span>isLarge</span></a></h2><p>用于标识这个字段是否是大字段，比如存放文章的文章字段，在一般的场景中是没必要对这个字段进行查询的， 若字段被表示为 <code>isLarge</code>，那么 APT 生成 &quot;ARTICLE&quot; 类时，默认不会存放在 DEFAULT_COLUMNS 中，以下 是 Article.java 以及 APT 生成的类：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_article&quot;)</span></span>
<span class="line"><span>public class Article {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(isLarge = true)</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(onInsertValue = &quot;now()&quot;)</span></span>
<span class="line"><span>    private Date created;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(onUpdateValue = &quot;now()&quot;, onInsertValue = &quot;now()&quot;)</span></span>
<span class="line"><span>    private Date modified;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其生成的 ArticleTableDef 如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Tables {</span></span>
<span class="line"><span>    public static final ArticleTableDef ARTICLE = new ArticleTableDef(&quot;tb_article&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static class ArticleTableDef extends TableDef {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public QueryColumn ID = new QueryColumn(this, &quot;id&quot;);</span></span>
<span class="line"><span>        public QueryColumn TITLE = new QueryColumn(this, &quot;title&quot;);</span></span>
<span class="line"><span>        public QueryColumn CONTENT = new QueryColumn(this, &quot;content&quot;);</span></span>
<span class="line"><span>        public QueryColumn CREATED = new QueryColumn(this, &quot;created&quot;);</span></span>
<span class="line"><span>        public QueryColumn MODIFIED = new QueryColumn(this, &quot;modified&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //在 DEFAULT_COLUMNS 中是没有 content 字段。</span></span>
<span class="line"><span>        public QueryColumn[] DEFAULT_COLUMNS = new QueryColumn[]{ID, TITLE, CREATED, MODIFIED};</span></span>
<span class="line"><span>        public QueryColumn ALL_COLUMNS = new QueryColumn(&quot;*&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般的场景中，我们查询内容应该如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryWrapper.create()</span></span>
<span class="line"><span>    .select(ARTICLE.DEFAULT_COLUMNS) //使用的是 DEFAULT_COLUMNS</span></span>
<span class="line"><span>    .from(ARTICLE);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此外，对于一些需要过滤的列，例如：<code>create_time</code>、<code>update_time</code> 等，也可以使用 <code>@Column(isLarge = true)</code> 去忽略查询。</p></blockquote><h2 id="islogicdelete" tabindex="-1"><a class="header-anchor" href="#islogicdelete"><span>isLogicDelete</span></a></h2><p>这部分的文档参考 <a href="https://mybatis-flex.com/zh/core/logic-delete.html" target="_blank" rel="noopener noreferrer">逻辑删除章节</a>。</p><h2 id="version" tabindex="-1"><a class="header-anchor" href="#version"><span>version</span></a></h2><p>这部分的文档参考 <a href="https://mybatis-flex.com/zh/core/version.html" target="_blank" rel="noopener noreferrer">乐观锁章节</a>。</p><h2 id="typehandler" tabindex="-1"><a class="header-anchor" href="#typehandler"><span>typeHandler</span></a></h2><p>typeHandler，顾名思义为类型处理器，其作用是在 insert 数据的时候，把数据转换为 数据库需要的类型，在查询的时候，又把数据库的数据转换为 java 需要的类型。 mybatis 已经内置了非常多的类型处理器。</p><p>但是，在某些场景下，我们还是需要定义自己的类型处理器，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(typeHandler = Fastjson2TypeHandler.class)</span></span>
<span class="line"><span>    private Map&lt;String, Object&gt; options;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void addOption(String key, Object value) {</span></span>
<span class="line"><span>        if (options == null) {</span></span>
<span class="line"><span>            options = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        options.put(key, value);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上的代码中，<code>Account</code> 有一个 <code>options</code> 字段，我们希望当保存 account 数据的时候，<code>options</code> 自动转换为一段 json 字符串保存到数据库， 在查询的时候，自动把数据库的 json 取出来，转换为 map 赋值给 <code>options</code>。</p><p>此时，我们便可以添加上注解 <code>@Column(typeHandler = Fastjson2TypeHandler.class)</code> ，<code>Fastjson2TypeHandler</code> 是 mybatis-flex 内置的 一个扩展的 typeHandler，以下是代码示例：</p><p>插入数据：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Account account = new Account();</span></span>
<span class="line"><span>account.setUserName(&quot;test&quot;);</span></span>
<span class="line"><span>account.addOption(&quot;c1&quot;, 11);</span></span>
<span class="line"><span>account.addOption(&quot;c2&quot;, &quot;zhang&quot;);</span></span>
<span class="line"><span>account.addOption(&quot;c3&quot;, new Date());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>accountMapper.insert(account);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mybatis 日志：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>==&gt;  Preparing: INSERT INTO tb_account (user_name, options) VALUES (?, ?)</span></span>
<span class="line"><span>==&gt; Parameters: test(String), {&quot;c3&quot;:&quot;2023-03-17 09:10:16.546&quot;,&quot;c1&quot;:11,&quot;c2&quot;:&quot;zhang&quot;}(String)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是：在使用 <code>Fastjson2TypeHandler</code> 时，需要添加 fastjson2 的 maven 依赖：</p><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba.fastjson2&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;fastjson2&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;2.0.26&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mybatis-flex 内置的扩展 typeHandler 还有：</p><ul><li>FastjsonTypeHandler</li><li>GsonTypeHandler</li><li>JacksonTypeHandler</li><li>CommaSplitTypeHandler: 数据库存放的是以英文逗号隔开的字符串数据，实体类定义的属性类型为 <code>List&lt;String&gt;</code>。</li></ul><p>当然，我们也可以写一个自己的类，实现 <code>TypeHandler</code> 接口，然后通过 <code>@Column(typeHandler = YourHandler.class)</code> 注释给需要的字段。</p><h2 id="全局配置" tabindex="-1"><a class="header-anchor" href="#全局配置"><span>全局配置</span></a></h2><p>在某些场景下，我们的 entity 可能会有通用的字段以及配置，这种场景如果我们要为每个 entity 去设置，这会相对麻烦。 在这种场景下，我们可以建立一个通用的 BaseEntity 类，然后让所有的 Entity 都继承是该类。</p><p>Entity 一般是通过代码生成器生成的，我们通过 <code>GlobalConfig.entitySuperClass</code> 可以为代码生成器配置全局的 Entity 父类，更多关于代码生成器可以请访问 <a href="https://mybatis-flex.com/zh/others/codegen.html" target="_blank" rel="noopener noreferrer">这里</a>。</p>`,62)]))}const t=n(l,[["render",p]]),r=JSON.parse('{"path":"/framework/mybatisflex/ad/7fca5vfn/","title":"Column注解的使用","lang":"zh-CN","frontmatter":{"title":"Column注解的使用","createTime":"2025/08/27 09:41:42","permalink":"/framework/mybatisflex/ad/7fca5vfn/"},"readingTime":{"minutes":4.9,"words":1470},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/Column注解的使用.md","headers":[]}');export{t as comp,r as data};
