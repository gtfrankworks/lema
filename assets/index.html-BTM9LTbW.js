import{a as e,c as a,b as n,o as i}from"./app-ZQgO6-gU.js";const l={};function p(r,s){return i(),a("div",null,s[0]||(s[0]=[n(`<p>数据权限指的是不同的用户，通过某一个方法去查询的时候，得到的是不同的数据结果集。常见的数据权限有：</p><ul><li>获取全部数据</li><li>仅获取本人创建的数据</li><li>获取当前用户的部门数据</li><li>获取部门级以下部门的数据</li><li>获取某个地区的数据</li><li>等等</li></ul><p>这一些，都是通过当前的用户的信息（部门、角色、权限等），查询时，添加特定的条件。在 MyBatis-Flex 中，我们可以通过 2 种方式来实现这一种需求。</p><h2 id="方式1-使用自定义数据方言-idialect" tabindex="-1"><a class="header-anchor" href="#方式1-使用自定义数据方言-idialect"><span>方式1：使用自定义数据方言 <code>IDialect</code></span></a></h2><p>在自定义方言中，重写 <code>forSelectByQuery</code> 方法，这个方法是用于构建返回根据 <code>QueryWrapper</code> 查询的方法， 以下是示例代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MyPermissionDialect extends CommonsDialectImpl {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String forSelectByQuery(QueryWrapper queryWrapper) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //获取当前用户信息，为 queryWrapper 添加额外的条件</span></span>
<span class="line"><span>        queryWrapper.and(&quot;...&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return super.buildSelectSql(queryWrapper);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别的，如果您使用的是 <code>Oracle</code> 数据库，需要继承 <code>OracleDialect</code> 类，示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MyOraclePermissionDialect extends OracleDialect {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这个构造器只有在 Oracle 12C 的版本下才需要添加。</span></span>
<span class="line"><span>    // public MyOraclePermissionDialect() {</span></span>
<span class="line"><span>    //    super(LimitOffsetProcessor.DERBY);</span></span>
<span class="line"><span>    // }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在项目启动时，通过 <code>DialectFactory</code> 注册 <code>MyPermissionDialect</code>：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DialectFactory.registerDialect(DbType.MYSQL,new MyPermissionDialect());</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>常见问题1：通过重写 <code>IDialect</code> 后，所有的查询都添加了条件，但是有些表不需要条件如何做？</strong></p><blockquote><p>答：可以通过 CPI 获取 QueryWrapper 查询了哪些表，然后进行动态处理。例如 <code>List&lt;QueryTable&gt; tables = CPI.getQueryTables(queryWrapper)</code>，然后进一步对 <code>tables</code> 进行验证是否需要添加数据权限。</p></blockquote><h2 id="方式2-重写-iservice-的查询方法" tabindex="-1"><a class="header-anchor" href="#方式2-重写-iservice-的查询方法"><span>方式2：重写 IService 的查询方法</span></a></h2><p>在一般的应用中，查询是通过 Service 进行的，MyBatis-Flex 提供了 <code>IService</code> 接口及其默认的 <code>ServiceImpl</code> 实现类。</p><p>我们可以通过构建自己的 <code>IServiceImpl</code> 来实现这一种需求，例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MyServiceImpl&lt;M extends BaseMapper&lt;T&gt;, T&gt; implements IService&lt;T&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    protected M mapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public BaseMapper&lt;T&gt; getMapper() {</span></span>
<span class="line"><span>        return mapper;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public List&lt;T&gt; list(QueryWrapper query) {</span></span>
<span class="line"><span>        //获取当前用户信息，为 queryWrapper 添加额外的条件</span></span>
<span class="line"><span>        return IService.super.list(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，在 <code>IService</code> 中，除了 <code>list</code> 方法以外，还有其他的查询方法，可能也需要复写。</p><h2 id="方式3-使用自定义数据方言-idialect" tabindex="-1"><a class="header-anchor" href="#方式3-使用自定义数据方言-idialect"><span>方式3：使用自定义数据方言 <code>IDialect</code></span></a></h2><p>在自定义方言中，重写 <code>prepareAuth</code> 方法，根据自己的需求对 <code>QueryWrapper</code>、<code>sql</code>语句进行处理，添加额外条件， 以下是示例代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AuthDialectImpl extends CommonsDialectImpl {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void prepareAuth(QueryWrapper queryWrapper, OperateType operateType) {</span></span>
<span class="line"><span>        List&lt;QueryTable&gt; queryTables = CPI.getQueryTables(queryWrapper);</span></span>
<span class="line"><span>        if (queryTables == null || queryTables.isEmpty()) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        for (QueryTable queryTable : queryTables) {</span></span>
<span class="line"><span>            if (PROJECT.getTableName().equals(queryTable.getName())) {</span></span>
<span class="line"><span>                queryWrapper.and(PROJECT.INSERT_USER_ID.eq(1));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        super.prepareAuth(queryWrapper, operateType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void prepareAuth(String schema, String tableName, StringBuilder sql, OperateType operateType) {</span></span>
<span class="line"><span>        if (PROJECT.getTableName().equals(tableName)) {</span></span>
<span class="line"><span>            sql.append(AND).append(wrap(&quot;insert_user_id&quot;)).append(EQUALS).append(1);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        super.prepareAuth(schema, tableName, sql, operateType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void prepareAuth(TableInfo tableInfo, StringBuilder sql, OperateType operateType) {</span></span>
<span class="line"><span>        if (PROJECT.getTableName().equals(tableInfo.getTableName())) {</span></span>
<span class="line"><span>            sql.append(AND).append(wrap(&quot;insert_user_id&quot;)).append(EQUALS).append(1);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        super.prepareAuth(tableInfo, sql, operateType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对<code>QueryWrapper</code>的表做筛选可参考 <strong>方式1</strong> 在项目启动时通过 <code>DialectFactory</code> 注册 <code>AuthDialectImpl</code>，以spring boot项目为例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class MybatisFlexConfig implements MyBatisFlexCustomizer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void customize(FlexGlobalConfig flexGlobalConfig) {</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 注册查询权限监听方言</span></span>
<span class="line"><span>        DialectFactory.registerDialect(DbType.MYSQL, new AuthDialectImpl());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>单元测试请参考源码中的<code>com.mybatisflex.coretest.AuthTest</code>类</p>`,23)]))}const c=e(l,[["render",p]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/57ifc4yd/","title":"MyBatis-Flex数据权限","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex数据权限","createTime":"2025/08/27 09:57:53","permalink":"/framework/mybatisflex/ad/57ifc4yd/"},"readingTime":{"minutes":2.57,"words":772},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/数据权限.md","headers":[]}');export{c as comp,t as data};
