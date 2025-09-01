import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>在 Entity 类中，MyBatis-Flex 是使用 <code>@Id</code> 注解来标识主键的，如下代码所示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // id 为自增主键</span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@Id</code> 注解的内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public @interface Id {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * ID 生成策略，默认为 none</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @return 生成策略</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    KeyType keyType() default KeyType.None;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 若 keyType 类型是 sequence， value 则代表的是</span></span>
<span class="line"><span>     * sequence 序列的 sql 内容</span></span>
<span class="line"><span>     * 例如：select SEQ_USER_ID.nextval as id from dual</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * 若 keyType 是 Generator，value 则代表的是使用的那个 keyGenerator 的名称</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String value() default &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * sequence 序列执行顺序</span></span>
<span class="line"><span>     * 是在 entity 数据插入之前执行，还是之后执行，之后执行的一般是数据主动生成的 id</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @return 执行之前还是之后</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    boolean before() default true;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>keyType 为主键的生成方式，KeyType 有 4 种类型：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public enum KeyType {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 自增的方式</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Auto,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 通过执行数据库 sql 生成</span></span>
<span class="line"><span>     * 例如：select SEQ_USER_ID.nextval as id from dual</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Sequence,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 通过 IKeyGenerator 生成器生成</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Generator,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 其他方式，比如在代码层用户手动设置</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    None,</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多主键、复合主键" tabindex="-1"><a class="header-anchor" href="#多主键、复合主键"><span>多主键、复合主键</span></a></h2><p>MyBatis-Flex 多主键就是在 Entity 类里有多个 <code>@Id</code> 注解标识而已，比如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Generator, value = KeyGenerators.uuid)</span></span>
<span class="line"><span>    private String otherId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们保存数据的时候，Account 的 id 主键为自增，而 otherId 主键则通过 uuid 生成。</p><h2 id="内置主键生成器" tabindex="-1"><a class="header-anchor" href="#内置主键生成器"><span>内置主键生成器</span></a></h2><p>MyBatis-Flex 内置了三种主键生成器，他们的名称都定义在 <code>KeyGenerators</code> 类里：</p><ul><li><strong>uuid</strong>：通过 <code>UUIDKeyGenerator</code> 生成 UUID 作为数据库主键。</li><li><strong>flexId</strong>：独创的 FlexID 算法生成数据库主键（了解更多信息请参阅<a href="https://gitee.com/mybatis-flex/mybatis-flex/blob/main/mybatis-flex-core/src/main//com/mybatisflex/core/keygen/impl/FlexIDKeyGenerator." target="_blank" rel="noopener noreferrer">源码</a>)。</li><li><strong>snowFlakeId</strong>：通过雪花算法（<code>SnowFlakeIDKeyGenerator</code>）生成数据库主键。</li></ul><p>这些主键生成器为 MyBatis-Flex 内置的，可直接使用：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType=KeyType.Generator, value=KeyGenerators.flexId)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义主键生成器" tabindex="-1"><a class="header-anchor" href="#自定义主键生成器"><span>自定义主键生成器</span></a></h2><p>第 1 步：编写一个类，实现 <code>IKeyGenerator</code> 接口，例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UUIDKeyGenerator implements IKeyGenerator {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object generate(Object entity, String keyColumn) {</span></span>
<span class="line"><span>        return UUID.randomUUID().toString().replace(&quot;-&quot;, &quot;&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第 2 步：注册 UUIDKeyGenerator</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>KeyGeneratorFactory.register(&quot;myUUID&quot;, new UUIDKeyGenerator());</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>第 3 步：在 Entity 里使用 &quot;myUUID&quot; 生成器：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Id(keyType=KeyType.Generator, value=&quot;myUUID&quot;)</span></span>
<span class="line"><span>    private String otherId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用序列-sequence-生成" tabindex="-1"><a class="header-anchor" href="#使用序列-sequence-生成"><span>使用序列 Sequence 生成</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType=KeyType.Sequence, value=&quot;select SEQ_USER_ID.nextval as id from dual&quot;)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局配置" tabindex="-1"><a class="header-anchor" href="#全局配置"><span>全局配置</span></a></h2><p>一般的项目中，通常是许多的 Entity 使用同一个数据库，同时使用一种主键生成方式，比如都使用 自增， 或者都使用通过序列（Sequence）生成，此时，我们是没有必要为每个 Entity 单独配置一样内容的。</p><p>MyBatis-Flex 提供了一种全局配置的方式，代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>FlexGlobalConfig.KeyConfig keyConfig = new FlexGlobalConfig.KeyConfig();</span></span>
<span class="line"><span>keyConfig.setKeyType(KeyType.Sequence);</span></span>
<span class="line"><span>keyConfig.setValue(&quot;select SEQ_USER_ID.nextval as id from dual&quot;)</span></span>
<span class="line"><span>keyConfig.setBefore(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FlexGlobalConfig.getDefaultConfig().setKeyConfig(keyConfig);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，Entity 类 Account. 只需要如下配置即可。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/74k92e31/","title":"Id主键的使用","lang":"zh-CN","frontmatter":{"title":"Id主键的使用","createTime":"2025/08/27 09:40:25","permalink":"/framework/mybatisflex/ad/74k92e31/"},"readingTime":{"minutes":2.4,"words":720},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/Id主键的使用.md","headers":[]}');export{r as comp,t as data};
