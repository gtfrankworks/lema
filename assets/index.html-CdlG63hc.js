import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>字段权限，指的是在一张表中设计了许多字段，但是不同的用户（或者角色）查询，返回的字段结果是不一致的。 比如：tb_account 表中，有 user_name 和 password 字段，但是 password 字段只允许用户本人查询， 或者超级管理员查询，这种场景下，我们会用到 字段权限 的功能。</p><p>在 <code>@Table()</code> 注解中，有一个配置名为 <code>onSet</code>，用于设置这张表的 <code>设置</code> 监听，这里的 <code>设置</code> 监听指的是： 当我们使用 sql 、调用某个方法去查询数据，得到的数据内容映射到 entity 实体，mybatis 通过 setter 方法去设置 entity 的值时的监听。</p><p>以下是示例：</p><p><strong>step 1：</strong> 为实体类编写一个 set 监听器（<code>SetListener</code>）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AccountOnSetListener implements SetListener {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object onSet(Object entity, String property, Object value) {</span></span>
<span class="line"><span>        if (property.equals(&quot;password&quot;)){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            //去查询当前用户的权限</span></span>
<span class="line"><span>            boolean hasPasswordPermission = getPermission();</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            //若没有权限，则把数据库查询到的 password 内容修改为 null</span></span>
<span class="line"><span>            if (!hasPasswordPermission){</span></span>
<span class="line"><span>                value = null;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step 2：</strong> 为实体类配置 <code>onSet</code> 监听</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Table(value = &quot;tb_account&quot;, onSet = AccountOnSetListener.class)</span></span>
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
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/framework/mybatisflex/ad/udg6rrd2/","title":"MyBatis-Flex字段权限","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex字段权限","createTime":"2025/08/27 09:58:51","permalink":"/framework/mybatisflex/ad/udg6rrd2/"},"readingTime":{"minutes":1.02,"words":307},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/字段权限.md","headers":[]}');export{r as comp,c as data};
