import{a,c as n,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(r,s){return i(),n("div",null,s[0]||(s[0]=[e(`<p>数据源加密指的是我们对数据库的链接信息进行加密，目前 MyBatis-Flex 支持加密的内容有</p><ul><li>数据源 URL</li><li>数据源用户名</li><li>数据源用户密码</li></ul><p>通过数据源加密功能，我们可以有效的保证数据库安全，减少数据盗用风险。</p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>在 MyBatis-Flex 中，我们并不关注数据库信息的加密方式，换一句话也就是说：<strong>MyBatis-Flex 支持任何类型的加密方式</strong>。 在 MyBatis-Flex 中内置了一个名为 <code>DataSourceDecipher</code> 的接口，其作用是去解密用户配置的加密内容，从而真实的配置信息。</p><h2 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用"><span>开始使用</span></a></h2><p>通过 <code>DataSourceManager</code> 配置 <code>DataSourceDecipher</code>。以下是示例代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>DruidDataSource dataSource = new DruidDataSource();</span></span>
<span class="line"><span>dataSource.setUrl(&quot;jdbc:mysql://localhost:3306/flex_test&quot;);</span></span>
<span class="line"><span>dataSource.setUsername(&quot;root123&quot;); // 真实的账号应该是 root</span></span>
<span class="line"><span>dataSource.setPassword(&quot;123456---0000&quot;); // 真实的密码应该是 123456</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>//配置数据源解密器：DataSourceDecipher</span></span>
<span class="line"><span>DataSourceManager.setDecipher(new DataSourceDecipher() {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String decrypt(DataSourceProperty property, String value) {</span></span>
<span class="line"><span>        //解密用户名，通过编码支持任意加密方式的解密</span></span>
<span class="line"><span>        if (property == DataSourceProperty.USERNAME) {</span></span>
<span class="line"><span>            return value.substring(0, 4);</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        //解密密码</span></span>
<span class="line"><span>        else if (property == DataSourceProperty.PASSWORD) {</span></span>
<span class="line"><span>            return value.substring(0, 6);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>MybatisFlexBootstrap.getInstance()</span></span>
<span class="line"><span>        .setDataSource(dataSource)</span></span>
<span class="line"><span>        .addMapper(TenantAccountMapper.class)</span></span>
<span class="line"><span>        .start();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>List&lt;Row&gt; rowList = Db.selectAll(&quot;tb_account&quot;);</span></span>
<span class="line"><span>RowUtil.printPretty(rowList);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>需要注意的是：<code>DataSourceManager.setDecipher()</code> 的配置，需要在 MyBatis-Flex 初始化之前进行。</p></blockquote><h2 id="springboot-支持" tabindex="-1"><a class="header-anchor" href="#springboot-支持"><span>SpringBoot 支持</span></a></h2><p>在 SpringBoot 项目下，直接通过 <code>@Configuration</code> 即可使用：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class MyConfiguration {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public DataSourceDecipher decipher(){</span></span>
<span class="line"><span>        DataSourceDecipher decipher = new ....;</span></span>
<span class="line"><span>        return decipher;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)]))}const t=a(l,[["render",p]]),d=JSON.parse('{"path":"/framework/mybatisflex/ad/mfbx3wx8/","title":"MyBatis-Flex 数据源加密","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex 数据源加密","createTime":"2025/08/27 09:55:14","permalink":"/framework/mybatisflex/ad/mfbx3wx8/"},"readingTime":{"minutes":1.22,"words":367},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/数据源加密.md","headers":[]}');export{t as comp,d as data};
