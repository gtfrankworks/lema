import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>在 MyBatis-Flex 中，<code>@Table</code> 主要是用于给 Entity 实体类添加标识，用于描述 实体类 和 数据库表 的关系，以及对实体类进行的一些 功能辅助。</p><p><code>@Table</code> 的定义如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public @interface Table {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 显式指定表名称</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String value();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 数据库的 schema（模式）</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String schema() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 默认为 驼峰属性 转换为 下划线字段</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean camelToUnderline() default true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 默认使用哪个数据源，若系统找不到该指定的数据源时，默认使用第一个数据源</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String dataSource() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 监听 entity 的 insert 行为</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Class&lt;? extends InsertListener&gt; onInsert() default NoneListener.class;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 监听 entity 的 update 行为</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Class&lt;? extends UpdateListener&gt; onUpdate() default NoneListener.class;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 监听 entity 的查询数据的 set 行为，用户主动 set 不会触发</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Class&lt;? extends SetListener&gt; onSet() default NoneListener.class;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 在某些场景下，我们需要手动编写 Mapper，可以通过这个注解来关闭 APT 的 Mapper 生成</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean mapperGenerateEnable() default true;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其使用方式如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;, onUpdate = MyUpdateListener.class)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="value" tabindex="-1"><a class="header-anchor" href="#value"><span>value</span></a></h2><p>用于配置指定 实体类 与 表名 的映射关系。</p><h2 id="cameltounderline" tabindex="-1"><a class="header-anchor" href="#cameltounderline"><span>camelToUnderline</span></a></h2><p>默认值为 ture，用于指定当前 实体类 的字段 与 表的列是否是 <strong>驼峰转下划线</strong> 的关系，比如：实体类中定义的 userName 属性，对应的表字段为 user_name。</p><p>若 camelToUnderline 配置为 false，那么，实体类中定义的 userName 属性，对应的表字段为 userName（除非使用 <code>@Column</code> 注解另行指定）。</p><h2 id="oninsert" tabindex="-1"><a class="header-anchor" href="#oninsert"><span>onInsert</span></a></h2><p>用于监听 Entity 实体类数据被新增到数据库，我们可以在实体类被新增时做一些前置操作。比如：</p><ul><li>数据填充。</li><li>数据修改。</li></ul><p>示例代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//配置  onInsert = MyInsertListener.class</span></span>
<span class="line"><span>@Table(value = &quot;tb_account&quot;, onInsert = MyInsertListener.class)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MyInsertListener implements InsertListener {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onInsert(Object entity) {</span></span>
<span class="line"><span>        Account account = (Account)entity;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //设置 account 被新增时的一些默认数据</span></span>
<span class="line"><span>        account.setInsertTime(new Date());</span></span>
<span class="line"><span>        account.setInsertUserId(&quot;...&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //多租户的场景下，设置当前 租户 ID ..</span></span>
<span class="line"><span>        account.setTenantId(&quot;....&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是：onInsert 监听中，通过 mybatis 的 xml mapper 插入数据，或者通过 Db + Row 中插入数据，并不会触发 onInsert 行为，只有通过 AccountMapper 进行插入数据才会触发。</p></blockquote><h2 id="onupdate" tabindex="-1"><a class="header-anchor" href="#onupdate"><span>onUpdate</span></a></h2><p>使用方式同 onInsert 一致，用于在数据被更新的时候，设置一些默认数据。</p><h2 id="onset" tabindex="-1"><a class="header-anchor" href="#onset"><span>onSet</span></a></h2><p>onSet 可以用于配置：查询数据 entity （或者 entity 列表、分页等）时，对 entity 的属性设置的监听，可以用于如下的场景。</p><ul><li>场景1：字段权限，不同的用户或者角色可以查询不同的字段内容。</li><li>场景2：字典回写，entity 中定义许多业务字段，当数据库字段赋值时，主动去设置业务字段。</li><li>场景3：一对多，一对一查询，entity 中定义关联实体，在监听到字段赋值时，主动去查询关联表赋值。</li><li>场景4：字段加密，监听到内容被赋值时，对内容进行加密处理。</li><li>场景5：字段脱敏，出字段内容进行脱敏处理</li></ul><p>示例代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>//配置  onSet = MySetListener.class</span></span>
<span class="line"><span>@Table(value = &quot;tb_account&quot;, onSet = MySetListener.class)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MySetListener implements SetListener {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object onSet(Object entity, String property, Object value){</span></span>
<span class="line"><span>        //场景1：用于检测当前账户是否拥有该字段权限，</span></span>
<span class="line"><span>        //      有正常返回 value，没有权限返回 null</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //场景2：entity 中可能定义某个业务值</span></span>
<span class="line"><span>        //      当监听到某个字段被赋值了，这</span></span>
<span class="line"><span>        //      里可以主动去给另外的其他字段赋值</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //场景3：内容转换和二次加工，对 value 值进行修改后返回</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：若 entity 的属性配置了 <code>typeHandler</code>，<code>typeHandler</code> 的执行顺序高于 <code>SetListener</code>。</p></blockquote><h2 id="全局设置" tabindex="-1"><a class="header-anchor" href="#全局设置"><span>全局设置</span></a></h2><p>除了通过 <code>@Table</code> 注解去单独为某一个 Entity 设置 <code>onInsert</code>、<code>onUpdate</code>、<code>onSet</code> 监听以外，我们还可以通过全局的方式去配置， 方法如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>MyInsertListener insertListener = new MyInsertListener();</span></span>
<span class="line"><span>MyUpdateListener updateListener = new MyUpdateListener();</span></span>
<span class="line"><span>MySetListener setListener = new MySetListener();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FlexGlobalConfig config = FlexGlobalConfig.getDefaultConfig();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//为 Entity1 和 Entity2 注册 insertListner</span></span>
<span class="line"><span>config.registerInsertListener(insertListener, Entity1.class, Entity2.class);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>//为 Entity1 和 Entity2 注册 updateListener</span></span>
<span class="line"><span>config.registerUpdateListener(updateListener, Entity1.class, Entity2.class);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>//为 Entity1 和 Entity2 注册 setListener</span></span>
<span class="line"><span>config.registerSetListener(setListener, Entity1.class, Entity2.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><h3 id="场景-1-设置创建和更新者的用户名" tabindex="-1"><a class="header-anchor" href="#场景-1-设置创建和更新者的用户名"><span>场景 1：设置创建和更新者的用户名</span></a></h3><p>需要自建一个<strong>BaseEntity</strong>，前提是涉及到的类需要继承BaseEntity</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MybatisUpdateListener implements UpdateListener {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onUpdate(Object o) {</span></span>
<span class="line"><span>        Object username = StpUtil.getExtra(&quot;username&quot;);  //此处获取用户名</span></span>
<span class="line"><span>        if (username != null &amp;&amp; o instanceof BaseEntity entity) {</span></span>
<span class="line"><span>            entity.setUpdateBy(username.toString());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MybatisInsertListener implements InsertListener {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void onInsert(Object o) {</span></span>
<span class="line"><span>        Object username = StpUtil.getExtra(&quot;username&quot;);  //此处获取用户名</span></span>
<span class="line"><span>        if (username != null &amp;&amp; o instanceof BaseEntity entity) {</span></span>
<span class="line"><span>            entity.setCreateBy(username.toString());</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动配置</p>`,35)]))}const c=n(l,[["render",p]]),r=JSON.parse('{"path":"/framework/mybatisflex/ad/j8ohioha/","title":"Table 注解的使用","lang":"zh-CN","frontmatter":{"title":"Table 注解的使用","createTime":"2025/08/27 09:38:36","permalink":"/framework/mybatisflex/ad/j8ohioha/"},"readingTime":{"minutes":3.76,"words":1128},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/Table 注解的使用.md","headers":[]}');export{c as comp,r as data};
