import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>在某些场景下，我们希望在 Entity 中定义的属性是某一个枚举类，而非基本的数据类型，例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private TypeEnum typeEnum;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在默认情况下，MyBatis 内置了一个名为：<code>EnumTypeHandler</code> 的处理器，用于处理这种场景。通过 <code>EnumTypeHandler</code> 处理后，数据库保存的是 <code>TypeEnum</code> 对应的属性名称， 是一个 String 类型。例如 <code>TypeEnum.TYPE1</code> 保存到数据库的内容为 <code>TYPE1</code> 这个字符串。</p><h2 id="enumvalue-注解" tabindex="-1"><a class="header-anchor" href="#enumvalue-注解"><span>@EnumValue 注解</span></a></h2><p>但很多时候，我们希望保存到数据库的，是 <code>TypeEnum</code> 枚举的某个属性值，而非 <code>TYPE1</code> 字符串，那么，我就需要用到 MyBatis-Flex 提供的注解 <code>@EnumValue</code>，以下是示例代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public enum TypeEnum {</span></span>
<span class="line"><span>    TYPE1(1, &quot;类型1&quot;),</span></span>
<span class="line"><span>    TYPE2(2, &quot;类型2&quot;),</span></span>
<span class="line"><span>    TYPE3(3, &quot;类型3&quot;),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @EnumValue</span></span>
<span class="line"><span>    private int code;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String desc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    TypeEnum(int code, String desc) {</span></span>
<span class="line"><span>        this.code = code;</span></span>
<span class="line"><span>        this.desc = desc;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@AllArgsConstructor</span></span>
<span class="line"><span>public enum EnableEnum {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 启用</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    ENABLE(1, &quot;启用&quot;),</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 禁用</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    DISABLE(0, &quot;禁用&quot;),</span></span>
<span class="line"><span>    ;</span></span>
<span class="line"><span>    private final int code;</span></span>
<span class="line"><span>    private final String desc;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @EnumValue</span></span>
<span class="line"><span>    public int getCode() {</span></span>
<span class="line"><span>        return code;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getDesc() {</span></span>
<span class="line"><span>        return desc;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过注解 <code>@EnumValue</code> 为 <code>code</code> 属性标注后，当我们保存 Account 内容到数据库时，MyBatis-Flex 会自动使用 <code>code</code> 属性值进行保存，同时在读取数据库内容的时候，MyBatis-Flex 自动把数据库的值转换为 <code>TypeEnum</code> 枚举。</p><p><strong>注意事项</strong></p><ul><li>1、@EnumValue 注解标识的属性，要求必须是 public 修饰，或者有 get 方法。</li><li>2、@EnumValue 注解标识支持在 get 方法使用注解。</li><li>3、枚举注解优先级。 优先取字段上的注解。如果字段没有注解，则会找方法上的注解，如果枚举类当前方法没有注解，则会去找父类的方法寻找存在注解的方法。</li><li>4、当配置了 @EnumValue 时，QueryWrapper 构建时，传入枚举，自动使用该值进行 SQL 参数拼接。例如：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>QueryWrapper query = QueryWrapper.create();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>query.select().from(ACCOUNT)</span></span>
<span class="line"><span>.where(ACCOUNT.TYPE_ENUM.eq(TypeEnum.TYPE1))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其生成的 SQL 为：</p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>select * from tb_account</span></span>
<span class="line"><span>where type_enum = 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,14)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/kynxkngr/","title":"MyBatis-Flex枚举属性","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex枚举属性","createTime":"2025/08/27 10:01:47","permalink":"/framework/mybatisflex/ad/kynxkngr/"},"readingTime":{"minutes":1.68,"words":503},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/枚举属性.md","headers":[]}');export{r as comp,t as data};
