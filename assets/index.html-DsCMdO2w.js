import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>字典回写，指的是在一个实体类中，可能会有很多业务字段，当我们发现有某个数据库字段赋值后，主动去为业务赋值。</p><p>比如，在数据库存有一个字段为 sex，类型为 int，用于保存用户的性别，0 ：女，1 ：男，2 ：未知。 同时，在 entity 实体类中，还存在一个业务属性 sexString，用于在前台显示，那么我们使用如下的解决方案。</p><p><strong>step 1：</strong> 为实体类编写一个 set 监听器（<code>SetListener</code>）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AccountOnSetListener implements SetListener {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object onSet(Object entity, String property, Object value) {</span></span>
<span class="line"><span>        Account account = (Account) entity;</span></span>
<span class="line"><span>        if (property.equals(&quot;sex&quot;) &amp;&amp; value != null){</span></span>
<span class="line"><span>            switch (value){</span></span>
<span class="line"><span>                case 0:</span></span>
<span class="line"><span>                    account.setSexString(&#39;女&#39;);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                case 1:</span></span>
<span class="line"><span>                    account.setSexString(&#39;男&#39;);</span></span>
<span class="line"><span>                    break;</span></span>
<span class="line"><span>                default:</span></span>
<span class="line"><span>                    account.setSexString(&#39;未知&#39;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step 2：</strong> 为实体类配置 <code>onSet</code> 监听</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;, onSet = AccountOnSetListener.class)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private int sex;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Column(ignore = true) //非数据库字段，需配置忽略该属性</span></span>
<span class="line"><span>    private String sexString;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //getter setter</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const d=n(l,[["render",p]]),r=JSON.parse('{"path":"/framework/mybatisflex/ad/3yymybti/","title":"MyBatis-Flex字典回写","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex字典回写","createTime":"2025/08/27 10:00:51","permalink":"/framework/mybatisflex/ad/3yymybti/"},"readingTime":{"minutes":0.82,"words":246},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/字典回写.md","headers":[]}');export{d as comp,r as data};
