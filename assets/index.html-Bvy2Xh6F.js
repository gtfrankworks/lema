import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>在开始之前，我们假定您已经：</p><ul><li>熟悉 Java 环境配置及其开发</li><li>熟悉 关系型 数据库，比如 MySQL</li><li>熟悉 Spring Boot 或 Solon 等相关框架</li><li>熟悉 Java 构建工具，比如 Maven</li></ul><blockquote><p>当前章节涉及到的源码已经全部上传到：https://gitee.com/Suomm/mybatis-flex-test ，在开始之前， 您也可以先下载到本地，导入到 idea 开发工具后，在继续看文档。</p></blockquote><h2 id="hello-world-文档" tabindex="-1"><a class="header-anchor" href="#hello-world-文档"><span>Hello World 文档</span></a></h2><p><strong>第 1 步：创建数据库表</strong></p><p>sql</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>CREATE TABLE IF NOT EXISTS \`tb_account\`</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>    \`id\`        INTEGER PRIMARY KEY auto_increment,</span></span>
<span class="line"><span>    \`user_name\` VARCHAR(100),</span></span>
<span class="line"><span>    \`age\`       INTEGER,</span></span>
<span class="line"><span>    \`birthday\`  DATETIME</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO tb_account(id, user_name, age, birthday)</span></span>
<span class="line"><span>VALUES (1, &#39;张三&#39;, 18, &#39;2020-01-11&#39;),</span></span>
<span class="line"><span>       (2, &#39;李四&#39;, 19, &#39;2021-03-21&#39;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第 2 步：创建 Spring Boot 项目，并添加 Maven 依赖</strong></p><p>TIP</p><p>可以使用 <a href="https://start.spring.io/" target="_blank" rel="noopener noreferrer">Spring Initializer</a> 快速初始化一个 Spring Boot 工程。</p><p>需要添加的 Maven 主要依赖示例：</p><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.mybatis-flex&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mybatis-flex-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;1.11.1&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.mysql&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mysql-connector-j&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;scope&gt;runtime&lt;/scope&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.zaxxer&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;HikariCP&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;!-- for test only --&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>： 如果您当前使用的是 SpringBoot v3.x 版本，需要把依赖 <code>mybatis-flex-spring-boot-starter</code> 修改为：<code>mybatis-flex-spring-boot3-starter</code>, 如下代码所示：</p><p>xml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.mybatis-flex&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mybatis-flex-spring-boot3-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;1.11.1&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.mysql&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;mysql-connector-j&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;scope&gt;runtime&lt;/scope&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;com.zaxxer&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;HikariCP&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;!-- for test only --&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;scope&gt;test&lt;/scope&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第 3 步：对 Spring Boot 项目进行配置</strong></p><p>在 application.yml 中配置数据源：</p><p>yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span># DataSource Config</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    url: jdbc:mysql://localhost:3306/flex_test</span></span>
<span class="line"><span>    username: root</span></span>
<span class="line"><span>    password: 12345678</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Spring Boot 启动类中添加 <code>@MapperScan</code> 注解，扫描 Mapper 文件夹：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>@MapperScan(&quot;com.mybatisflex.test.mapper&quot;)</span></span>
<span class="line"><span>public class MybatisFlexTestApplication {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(MybatisFlexTestApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第 4 步：编写实体类和 Mapper 接口</strong></p><p>这里使用了 <a href="https://www.projectlombok.org/" target="_blank" rel="noopener noreferrer">Lombok</a> 来简化代码。</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Data</span></span>
<span class="line"><span>@Table(&quot;tb_account&quot;)</span></span>
<span class="line"><span>public class Account {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Id(keyType = KeyType.Auto)</span></span>
<span class="line"><span>    private Long id;</span></span>
<span class="line"><span>    private String userName;</span></span>
<span class="line"><span>    private Integer age;</span></span>
<span class="line"><span>    private Date birthday;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用 <code>@Table(&quot;tb_account&quot;)</code> 设置实体类与表名的映射关系</li><li>使用 <code>@Id(keyType = KeyType.Auto)</code> 标识主键为自增</li></ul><p>Mapper 接口继承 BaseMapper 接口：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface AccountMapper extends BaseMapper&lt;Account&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这部分也可以使用 MyBatis-Flex 的代码生成器来生，功能非常强大的。详情进入：<a href="https://mybatis-flex.com/zh/others/codegen.html" target="_blank" rel="noopener noreferrer">代码生成器章节</a> 了解。</p></blockquote><p><strong>第 5 步：开始使用</strong></p><p>添加测试类，进行功能测试：</p><p>java</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import static com.mybatisflex.test.entity.table.AccountTableDef.ACCOUNT;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@SpringBootTest</span></span>
<span class="line"><span>class MybatisFlexTestApplicationTests {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private AccountMapper accountMapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    void contextLoads() {</span></span>
<span class="line"><span>        QueryWrapper queryWrapper = QueryWrapper.create()</span></span>
<span class="line"><span>                .select()</span></span>
<span class="line"><span>                .where(ACCOUNT.AGE.eq(18));</span></span>
<span class="line"><span>        Account account = accountMapper.selectOneByQuery(queryWrapper);</span></span>
<span class="line"><span>        System.out.println(account);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台输出：</p><p>txt</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Account(id=1, userName=张三, age=18, birthday=Sat Jan 11 00:00:00 CST 2020)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>以上的 <a href="https://gitee.com/Suomm/mybatis-flex-test" target="_blank" rel="noopener noreferrer">示例</a> 中， <code>ACCOUNT</code> 为 MyBatis-Flex 通过 APT 自动生成，只需通过静态导入即可，无需手动编码。更多查看 <a href="https://mybatis-flex.com/zh/others/apt.html" target="_blank" rel="noopener noreferrer">APT 文档</a>。</p><p>若觉得 APT 使用不习惯，也可以使用代码生成器来生成。点击 <a href="https://mybatis-flex.com/zh/others/codegen.html" target="_blank" rel="noopener noreferrer">代码生成器文档</a> 了解。</p></blockquote>`,40)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/framework/mybatisflex/base/p0lh9l7g/","title":"MyBatisFlex的快速开始","lang":"zh-CN","frontmatter":{"title":"MyBatisFlex的快速开始","createTime":"2025/08/26 17:08:52","permalink":"/framework/mybatisflex/base/p0lh9l7g/"},"readingTime":{"minutes":2.43,"words":729},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/mybatisflex/base/MyBatisFlex的快速开始.md","headers":[]}');export{r as comp,c as data};
