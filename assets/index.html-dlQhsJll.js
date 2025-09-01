import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>在 MyBatis-Flex 中，内置了非常智能的 <strong>自动映射</strong> 功能，能够使得我们在查询数据的时候，从数据结果集绑定到实体类（或者 VO、DTO 等）变得极其简单易用。</p><h2 id="数据假设" tabindex="-1"><a class="header-anchor" href="#数据假设"><span>数据假设</span></a></h2><p>假设在我们的项目中，有如下的表结构和实体类：</p><p>账户表（tb_account）：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>CREATE TABLE IF NOT EXISTS \`tb_account\`</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    \`id\`        INTEGER auto_increment,</span></span>
<span class="line"><span>    \`user_name\` VARCHAR(100),</span></span>
<span class="line"><span>    \`age\`       Integer</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>图书表（tb_book）：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>CREATE TABLE IF NOT EXISTS \`tb_book\`</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    \`id\`        INTEGER auto_increment,</span></span>
<span class="line"><span>    \`account_id\` Integer,</span></span>
<span class="line"><span>    \`title\`      VARCHAR(100),</span></span>
<span class="line"><span>    \`content\`    text</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>图书和账户的关系是多对一的关系：一个账户可以拥有多本书。</p></blockquote><p>角色表（tb_role）：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>CREATE TABLE IF NOT EXISTS \`tb_role\`</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    \`id\`        INTEGER auto_increment,</span></span>
<span class="line"><span>    \`name\`      VARCHAR(100)</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>账户和角色的 <strong>多对多</strong> 关系映射表（tb_role_mapping）：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>CREATE TABLE IF NOT EXISTS \`tb_role_mapping\`</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    \`account_id\`        INTEGER ,</span></span>
<span class="line"><span>    \`role_id\`      INTEGER</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基础映射" tabindex="-1"><a class="header-anchor" href="#基础映射"><span>基础映射</span></a></h2><p>基础映射指的是，定义的实体类和表结构是一一对应的关系，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Account.java </code>与表 <code>tb_account</code> 是字段和属性是一一对应关系的。此时，我们在查询数据的时候，可以通过 <code>AccountMapper</code> 方法直接查询，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryWrapper qw = new QueryWrapper();</span></span>
<span class="line"><span>qw.select(ACCOUNT.ALL_COLUMNS)</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>List&lt;Account&gt; accounts = accountMapper.selectListByQuery(qw);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用如下的链式查询，都可以直接得到 <code>List&lt;Account&gt;</code> 结果：<code>accounts</code>。</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(ACCOUNT.ALL_COLUMNS)</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .list();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="as-映射" tabindex="-1"><a class="header-anchor" href="#as-映射"><span>AS 映射</span></a></h2><p>假设我们在 <code>Account.java</code> 中多定义了一些其他属性，如下所示：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //最大年龄</span></span>
<span class="line"><span>    private int maxAge;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //平均年龄</span></span>
<span class="line"><span>    private int avgAge;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，我们在查询的时候，就可以通过 <code>as</code> 进行映射关联，查询代码如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ALL_COLUMNS,</span></span>
<span class="line"><span>        max(ACCOUNT.AGE).as(&quot;maxAge&quot;),</span></span>
<span class="line"><span>        avg(ACCOUNT.AGE).as(&quot;avgAge&quot;)</span></span>
<span class="line"><span>    ).where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .groupBy(ACCOUNT.AGE)</span></span>
<span class="line"><span>    .list();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ALL_COLUMNS,</span></span>
<span class="line"><span>        max(ACCOUNT.AGE).as(&quot;max_age&quot;),</span></span>
<span class="line"><span>        avg(ACCOUNT.AGE).as(&quot;avg_age&quot;)</span></span>
<span class="line"><span>    ).where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .groupBy(ACCOUNT.AGE)</span></span>
<span class="line"><span>    .list();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者使用 lambda：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ALL_COLUMNS,</span></span>
<span class="line"><span>        max(ACCOUNT.AGE).as(Account::getMaxAge),</span></span>
<span class="line"><span>        avg(ACCOUNT.AGE).as(Account::getAvgAge)</span></span>
<span class="line"><span>    ).where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .groupBy(Account::getAge)</span></span>
<span class="line"><span>    .list();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码执行的 SQL 如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>select tb_account.*</span></span>
<span class="line"><span>     , max(tb_account.age) as maxAge</span></span>
<span class="line"><span>     , avg(tb_account.age) as avgAge</span></span>
<span class="line"><span>where tb_account.id &gt;= 100</span></span>
<span class="line"><span>group by tb_account.age</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多表映射" tabindex="-1"><a class="header-anchor" href="#多表映射"><span>多表映射</span></a></h2><p>假设我们定义了一个 <code>BootVo.java</code>，其中包含了图书的基本信息，也包含了图书归属的用户信息，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class BookVo {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //图书的基本字段</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private Long accountId;</span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //用户表的字段</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    private int userAge;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们再进行 <code>left join</code> 多表查询时，代码如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;BookVo&gt; bookVos = QueryChain.of(bookMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        BOOK.ALL_COLUMNS, //图书的所有字段</span></span>
<span class="line"><span>        ACCOUNT.USER_NAME, //用户表的 user_name 字段</span></span>
<span class="line"><span>        ACCOUNT.AGE.as(&quot;userAge&quot;) //用户表的 age 字段， as &quot;userAge&quot;</span></span>
<span class="line"><span>    ).from(BOOK)</span></span>
<span class="line"><span>    .leftJoin(ACCOUNT).on(BOOK.ACCOUNT_ID.eq(ACCOUNT.ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(BookVo.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们也可以直接在 BookVo 中，定义 <code>Account</code> 对象，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class BookVo {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //图书的基本字段</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private Long accountId;</span></span>
<span class="line"><span>    private String title;</span></span>
<span class="line"><span>    private String content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //用户</span></span>
<span class="line"><span>    private Account account;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询代码如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;BookVo&gt; bookVos = QueryChain.of(bookMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        BOOK.DEFAULT_COLUMNS,</span></span>
<span class="line"><span>        ACCOUNT.DEFAULT_COLUMNS,</span></span>
<span class="line"><span>     )</span></span>
<span class="line"><span>    .from(BOOK)</span></span>
<span class="line"><span>    .leftJoin(ACCOUNT).on(BOOK.ACCOUNT_ID.eq(ACCOUNT.ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(BookVo.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级映射" tabindex="-1"><a class="header-anchor" href="#高级映射"><span>高级映射</span></a></h2><p>在以上的表结构中，一个账户可以有多本图书，那么我们假设定义的 <code>AccountVo.java</code> 的结构如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AccountVO {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //账户拥有的 图书列表</span></span>
<span class="line"><span>    private List&lt;Book&gt; books;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select() // 不传入参数等同于 SQL 的 select *</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>亦或者指定查询参数：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ID,</span></span>
<span class="line"><span>        ACCOUNT.USER_NAME,</span></span>
<span class="line"><span>        ACCOUNT.AGE,</span></span>
<span class="line"><span>        BOOK.TITLE,</span></span>
<span class="line"><span>        BOOK.CONTENT,</span></span>
<span class="line"><span>     )</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>高级映射的场景中，我们还可以通过注解 <code>@RelationManyToOne</code> 进行查询， 详情请点击 <a href="https://mybatis-flex.com/zh/base/relations-query.html#%E4%B8%80%E5%AF%B9%E5%A4%9A-relationonetomany" target="_blank" rel="noopener noreferrer">这里</a>。</p><h2 id="重名映射" tabindex="-1"><a class="header-anchor" href="#重名映射"><span>重名映射</span></a></h2><p>在很多类型嵌套的场景下，可能会出现字段名定义重复的情况，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@TableRef(Account.class)</span></span>
<span class="line"><span>public class AccountVO {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //账户拥有的 图书列表</span></span>
<span class="line"><span>    private List&lt;Book&gt; book;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Book {</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private Long accountId;</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上的嵌套定义中， <code>AccountVO</code> 以及 <code>Book</code> 都包含了 <code>id</code> 和 <code>name</code> 的定义，假设我们查询的方法如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ID,</span></span>
<span class="line"><span>        ACCOUNT.NAME,</span></span>
<span class="line"><span>        ACCOUNT.AGE,</span></span>
<span class="line"><span>        BOOK.ID,</span></span>
<span class="line"><span>        BOOK.NAME,</span></span>
<span class="line"><span>     )</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其执行的 SQL 如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>select tb_account.id   as tb_account$id,</span></span>
<span class="line"><span>       tb_account.name as tb_account$name,</span></span>
<span class="line"><span>       tb_account.age,</span></span>
<span class="line"><span>       tb_book.id      as tb_book$id,  -- Flex 发现有重名时，会自动添加上 as 别名</span></span>
<span class="line"><span>       tb_book.name    as tb_book$name -- Flex 发现有重名时，会自动添加上 as 别名</span></span>
<span class="line"><span>from tb_account</span></span>
<span class="line"><span>         left join tb_book on tb_account.id = tb_book.account_id</span></span>
<span class="line"><span>where tb_account.id &gt;= 100</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，查询的数据可以正常映射到 <code>AccountVO</code> 类。</p><p>注意事项</p><ul><li>在查询 VO 类当中有重名字段时，需要给 VO 类标记 <code>@TableRef</code> 注解，指定其对应的实体类，以正确添加别名。</li><li>在 QueryWrapper 的 <code>select(...)</code> 中，MyBatis-Flex 在 <strong>多表查询</strong> 的情况下，且有相同的字段名时，MyBatis-Flex 内部会主动帮助用户添加上 as 别名，默认为：<code>表名$字段名</code>。</li></ul><p><strong>错误的情况：</strong></p><p>若我们修改查询代码如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select()</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，其执行的 SQL 如下：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>select * from tb_account</span></span>
<span class="line"><span>left join tb_book on tb_account.id = tb_book.account_id</span></span>
<span class="line"><span>where tb_account.id &gt;= 100</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，查询的结果集中，会有多个 <code>id</code> 和 <code>name</code> 列，程序无法知道 <code>id</code> 和 <code>name</code> 对应的应该是 <code>AccountVO</code> 的还是 <code>Book</code> 的，因此，可能会出现数据错误赋值的情况。</p><p>所以，若程序中出现包裹对象有重名属性的情况时，<code>QueryWrapper</code> 的 <code>select(...)</code> 方法必须传入具体的字段才能保证数据正常赋值。</p><p>如下的代码也是没问题的：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.DEFAULT_COLUMNS,</span></span>
<span class="line"><span>        BOOK.DEFAULT_COLUMNS</span></span>
<span class="line"><span>     )</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>@ColumnAlias</code> 注解：</strong></p><p><code>@ColumnAlias</code> 注解的作用是用于定义在 entity 查询时，默认的 SQL 别名名称，可以取代自动生成的别名，例如：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Book {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnAlias(&quot;bookId&quot;)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Long accountId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ColumnAlias(&quot;bookName&quot;)</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，假设我们的查询代码如下：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>List&lt;AccountVO&gt; bookVos = QueryChain.of(accountMapper)</span></span>
<span class="line"><span>    .select(</span></span>
<span class="line"><span>        ACCOUNT.ID,</span></span>
<span class="line"><span>        ACCOUNT.NAME,</span></span>
<span class="line"><span>        ACCOUNT.AGE,</span></span>
<span class="line"><span>        BOOK.ID,</span></span>
<span class="line"><span>        BOOK.NAME,</span></span>
<span class="line"><span>     )</span></span>
<span class="line"><span>    .from(ACCOUNT)</span></span>
<span class="line"><span>    .leftJoin(BOOK).on(ACCOUNT.ID.eq(BOOK.ACCOUNT_ID))</span></span>
<span class="line"><span>    .where(ACCOUNT.ID.ge(100))</span></span>
<span class="line"><span>    .listAs(AccountVO.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其执行的 SQL 为：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>select tb_account.id, tb_account.name, tb_account.age,</span></span>
<span class="line"><span>    tb_book.id as bookId, -- @ColumnAlias(&quot;bookId&quot;)</span></span>
<span class="line"><span>    tb_book.name as bookName  -- @ColumnAlias(&quot;bookName&quot;)</span></span>
<span class="line"><span>from tb_account</span></span>
<span class="line"><span>left join tb_book on tb_account.id = tb_book.account_id</span></span>
<span class="line"><span>where tb_account.id &gt;= 100</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，数据也是可以正常映射。</p>`,103)]))}const t=n(l,[["render",p]]),r=JSON.parse('{"path":"/framework/mybatisflex/base/49svo32u/","title":"自动映射","lang":"zh-CN","frontmatter":{"title":"自动映射","createTime":"2025/08/26 17:19:39","permalink":"/framework/mybatisflex/base/49svo32u/"},"readingTime":{"minutes":5.19,"words":1556},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/base/自动映射.md","headers":[]}');export{t as comp,r as data};
