import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>MyBatis-Flex 是一个 MyBatis 增强框架，所以您可以使用 MyBatis 提供的二级缓存来作为数据缓存。但是它仍然有很多的缺点，比如不适用于分布式环境，在这里推荐使用 <a href="https://docs.spring.io/spring-framework/docs/5.2.24.RELEASE/spring-framework-reference/integration.html#cache" target="_blank" rel="noopener noreferrer">Spring Cache</a> 模块来处理数据缓存。</p><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><p>因为要用到 Spring Cache 模块，所以您的项目必须要使用 Spring Framework 框架，这里以 Spring Boot 项目作为例子，实现 MyBatis-Flex 项目将缓存数据存入 Redis 组件中。</p><p>1、引入 <code>spring-boot-starter-cache</code> 和 <code>spring-boot-starter-data-redis</code>模块</p><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-boot-starter-cache&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、设置 Redis 连接信息（全是默认的话可以跳过这步）</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>spring:</span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    port: 6379</span></span>
<span class="line"><span>    host: localhost</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、在 Spring Boot 配置类上启用 Spring Cache 缓存</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@EnableCaching</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class CacheConfig {</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、将 ServiceImpl 默认实现类换为 CacheableServiceImpl 实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface AccountService extends IService&lt;Account&gt; {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class AccountServiceImpl extends CacheableServiceImpl&lt;AccountMapper, Account&gt; implements AccountService {</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、最后即可使用 Spring Cache 的相关注解实现数据缓存到 Redis 中了</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 设置统一的缓存名称</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>@CacheConfig(cacheNames = &quot;account&quot;)</span></span>
<span class="line"><span>public class AccountServiceImpl extends CacheableServiceImpl&lt;AccountMapper, Account&gt; implements AccountService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据主键缓存数据</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#id&quot;)</span></span>
<span class="line"><span>    public Account getById(Serializable id) {</span></span>
<span class="line"><span>        return super.getById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据方法名加查询 SQL 语句缓存结果数据</span></span>
<span class="line"><span>    // 加上方法名是为了避免不同的方法使用一样的 QueryWrapper</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public List&lt;Account&gt; list(QueryWrapper query) {</span></span>
<span class="line"><span>        return super.list(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明"><span>使用说明</span></a></h2><p>MyBatis-Flex 在 IService 接口中做了方法调用链优化，所以您只需将缓存注解加到一些特定的方法上，即可实现所有相关的方法也可以进行数据缓存。完整的缓存方法见如下示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Service</span></span>
<span class="line"><span>@CacheConfig(cacheNames = &quot;account&quot;)</span></span>
<span class="line"><span>public class AccountServiceImpl extends CacheableServiceImpl&lt;MyAccountMapper, Account&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(allEntries = true)</span></span>
<span class="line"><span>    public boolean remove(QueryWrapper query) {</span></span>
<span class="line"><span>        return super.remove(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(key = &quot;#id&quot;)</span></span>
<span class="line"><span>    public boolean removeById(Serializable id) {</span></span>
<span class="line"><span>        return super.removeById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(allEntries = true)</span></span>
<span class="line"><span>    public boolean removeByIds(Collection&lt;? extends Serializable&gt; ids) {</span></span>
<span class="line"><span>        return super.removeByIds(ids);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据查询条件更新时，实体类主键可能为 null。</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(allEntries = true)</span></span>
<span class="line"><span>    public boolean update(Account entity, QueryWrapper query) {</span></span>
<span class="line"><span>        return super.update(entity, query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(key = &quot;#entity.id&quot;)</span></span>
<span class="line"><span>    public boolean updateById(Account entity, boolean ignoreNulls) {</span></span>
<span class="line"><span>        return super.updateById(entity, ignoreNulls);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @CacheEvict(allEntries = true)</span></span>
<span class="line"><span>    public boolean updateBatch(Collection&lt;Account&gt; entities, int batchSize) {</span></span>
<span class="line"><span>        return super.updateBatch(entities, batchSize);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#id&quot;)</span></span>
<span class="line"><span>    public Account getById(Serializable id) {</span></span>
<span class="line"><span>        return super.getById(id);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public Account getOne(QueryWrapper query) {</span></span>
<span class="line"><span>        return super.getOne(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public &lt;R&gt; R getOneAs(QueryWrapper query, Class&lt;R&gt; asType) {</span></span>
<span class="line"><span>        return super.getOneAs(query, asType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public List&lt;Account&gt; list(QueryWrapper query) {</span></span>
<span class="line"><span>        return super.list(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public &lt;R&gt; List&lt;R&gt; listAs(QueryWrapper query, Class&lt;R&gt; asType) {</span></span>
<span class="line"><span>        return super.listAs(query, asType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 无法通过注解进行缓存操作</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Deprecated</span></span>
<span class="line"><span>    public List&lt;Account&gt; listByIds(Collection&lt;? extends Serializable&gt; ids) {</span></span>
<span class="line"><span>        return super.listByIds(ids);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public long count(QueryWrapper query) {</span></span>
<span class="line"><span>        return super.count(query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    @Cacheable(key = &quot;#root.methodName + &#39;:&#39; + #page.getPageSize() + &#39;:&#39; + #page.getPageNumber() + &#39;:&#39; + #query.toSQL()&quot;)</span></span>
<span class="line"><span>    public &lt;R&gt; Page&lt;R&gt; pageAs(Page&lt;R&gt; page, QueryWrapper query, Class&lt;R&gt; asType) {</span></span>
<span class="line"><span>        return super.pageAs(page, query, asType);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您有非常多的缓存实现类，并且需要使用全部的缓存方法，可以使用 <a href="https://mybatis-flex.com/zh/others/codegen.html" target="_blank" rel="noopener noreferrer">代码生成器</a> 辅助生成，设置如下代码即可：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 使用代码风格 1 生成</span></span>
<span class="line"><span>globalConfig.setServiceImplGenerateEnable(true);</span></span>
<span class="line"><span>globalConfig.setServiceImplSuperClass(CacheableServiceImpl.class);</span></span>
<span class="line"><span>globalConfig.setServiceImplCacheExample(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 或者使用代码风格 2 生成</span></span>
<span class="line"><span>globleConfig.enableServiceImpl()</span></span>
<span class="line"><span>        .setSuperClass(CacheableServiceImpl.class)</span></span>
<span class="line"><span>        .setCacheExample(true);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20)]))}const d=n(l,[["render",p]]),t=JSON.parse('{"path":"/framework/mybatisflex/ad/7xupes31/","title":"MyBatis-Flex数据缓存","lang":"zh-CN","frontmatter":{"title":"MyBatis-Flex数据缓存","createTime":"2025/08/27 09:48:55","permalink":"/framework/mybatisflex/ad/7xupes31/"},"readingTime":{"minutes":2.67,"words":800},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/ad/数据缓存.md","headers":[]}');export{d as comp,t as data};
