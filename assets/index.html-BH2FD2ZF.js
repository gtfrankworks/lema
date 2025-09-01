import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>字段加密，指的是数据库在存入了明文内容，但是当我们进行查询时，返回的内容为加密内容，而非明文内容。</p><p>以下是 MyBatis-Flex 字段加密示例：</p><p><strong>step 1：</strong> 为实体类编写一个 set 监听器（<code>SetListener</code>）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AccountOnSetListener implements SetListener {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object onSet(Object entity, String property, Object value) {</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        if (value != null){</span></span>
<span class="line"><span>            //对字段内容进行加密</span></span>
<span class="line"><span>            value = encrypt(value);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step 2：</strong> 为实体类配置 <code>onSet</code> 监听</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;, onSet = AccountOnSetListener.class)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    private String password;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/framework/mybatisflex/ad/wex6yar5/","title":"MyBatis-Flex字段加密","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex字段加密","createTime":"2025/08/27 09:59:54","permalink":"/framework/mybatisflex/ad/wex6yar5/"},"readingTime":{"minutes":0.53,"words":158},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/字段加密.md","headers":[]}');export{r as comp,c as data};
