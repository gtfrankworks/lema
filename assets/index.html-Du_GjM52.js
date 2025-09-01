import{a as n,c as a,b as i,o as e}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2024-01-01-22-28-35-XZKtFn4d.png",p={};function t(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p>在之前的测试方法中，几乎都能看到以下的两行代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ApplicationContext context = new ClassPathXmlApplicationContext(&quot;xxx.xml&quot;);</span></span>
<span class="line"><span>Xxxx xxx = context.getBean(Xxxx.class);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两行代码的作用是创建Spring容器，最终获取到对象，但是每次测试都需要重复编写。针对上述问题，我们需要的是程序能自动帮我们创建容器。我们都知道JUnit无法知晓我们是否使用了 Spring 框架，更不用说帮我们创建 Spring 容器了。Spring提供了一个运行器，可以读取配置文件（或注解）来创建容器。我们只需要告诉它配置文件位置就可以了。这样一来，我们通过Spring整合JUnit可以使程序创建spring容器了</p><h2 id="整合junit5" tabindex="-1"><a class="header-anchor" href="#整合junit5"><span>整合JUnit5</span></a></h2><h3 id="搭建子模块" tabindex="-1"><a class="header-anchor" href="#搭建子模块"><span>搭建子模块</span></a></h3><p>搭建spring-junit模块</p><h3 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖"><span>引入依赖</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;!--spring context依赖--&gt;</span></span>
<span class="line"><span>    &lt;!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;6.0.11&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--spring对junit的支持相关依赖--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-test&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;6.0.2&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--junit5测试--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;junit-jupiter-api&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;5.6.3&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--log4j2的依赖--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;log4j-core&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;2.19.0&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;log4j-slf4j2-impl&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;2.19.0&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加配置文件" tabindex="-1"><a class="header-anchor" href="#添加配置文件"><span>添加配置文件</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>beans.xml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xmlns:context=&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span>                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;</span></span>
<span class="line"><span>    &lt;context:component-scan base-package=&quot;com.codermast.spring6.bean&quot;/&gt;</span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>copy日志文件：<code>log4j2.xml</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;configuration&gt;</span></span>
<span class="line"><span>    &lt;loggers&gt;</span></span>
<span class="line"><span>        &lt;!--</span></span>
<span class="line"><span>            level指定日志级别，从低到高的优先级：</span></span>
<span class="line"><span>                TRACE &lt; DEBUG &lt; INFO &lt; WARN &lt; ERROR &lt; FATAL</span></span>
<span class="line"><span>                trace：追踪，是最低的日志级别，相当于追踪程序的执行</span></span>
<span class="line"><span>                debug：调试，一般在开发中，都将其设置为最低的日志级别</span></span>
<span class="line"><span>                info：信息，输出重要的信息，使用较多</span></span>
<span class="line"><span>                warn：警告，输出警告的信息</span></span>
<span class="line"><span>                error：错误，输出错误信息</span></span>
<span class="line"><span>                fatal：严重错误</span></span>
<span class="line"><span>        --&gt;</span></span>
<span class="line"><span>        &lt;root level=&quot;DEBUG&quot;&gt;</span></span>
<span class="line"><span>            &lt;appender-ref ref=&quot;spring6log&quot;/&gt;</span></span>
<span class="line"><span>            &lt;appender-ref ref=&quot;RollingFile&quot;/&gt;</span></span>
<span class="line"><span>            &lt;appender-ref ref=&quot;log&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/root&gt;</span></span>
<span class="line"><span>    &lt;/loggers&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;appenders&gt;</span></span>
<span class="line"><span>        &lt;!--输出日志信息到控制台--&gt;</span></span>
<span class="line"><span>        &lt;console name=&quot;spring6log&quot; target=&quot;SYSTEM_OUT&quot;&gt;</span></span>
<span class="line"><span>            &lt;!--控制日志输出的格式--&gt;</span></span>
<span class="line"><span>            &lt;PatternLayout pattern=&quot;%d{yyyy-MM-dd HH:mm:ss SSS} [%t] %-3level %logger{1024} - %msg%n&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/console&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!--文件会打印出所有信息，这个log每次运行程序会自动清空，由append属性决定，适合临时测试用--&gt;</span></span>
<span class="line"><span>        &lt;File name=&quot;log&quot; fileName=&quot;d:/spring6_log/test.log&quot; append=&quot;false&quot;&gt;</span></span>
<span class="line"><span>            &lt;PatternLayout pattern=&quot;%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/File&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- 这个会打印出所有的信息，</span></span>
<span class="line"><span>            每次大小超过size，</span></span>
<span class="line"><span>            则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，</span></span>
<span class="line"><span>            作为存档--&gt;</span></span>
<span class="line"><span>        &lt;RollingFile name=&quot;RollingFile&quot; fileName=&quot;d:/spring6_log/app.log&quot;</span></span>
<span class="line"><span>                     filePattern=&quot;log/$\${date:yyyy-MM}/app-%d{MM-dd-yyyy}-%i.log.gz&quot;&gt;</span></span>
<span class="line"><span>            &lt;PatternLayout pattern=&quot;%d{yyyy-MM-dd &#39;at&#39; HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n&quot;/&gt;</span></span>
<span class="line"><span>            &lt;SizeBasedTriggeringPolicy size=&quot;50MB&quot;/&gt;</span></span>
<span class="line"><span>            &lt;!-- DefaultRolloverStrategy属性如不设置，</span></span>
<span class="line"><span>            则默认为最多同一文件夹下7个文件，这里设置了20 --&gt;</span></span>
<span class="line"><span>            &lt;DefaultRolloverStrategy max=&quot;20&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/RollingFile&gt;</span></span>
<span class="line"><span>    &lt;/appenders&gt;</span></span>
<span class="line"><span>&lt;/configuration&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加java类" tabindex="-1"><a class="header-anchor" href="#添加java类"><span>添加Java类</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>package com.codermast.spring6.bean;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import org.springframework.stereotype.Component;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User() {</span></span>
<span class="line"><span>        System.out.println(&quot;run user&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import com.codermast.spring6.bean.User;</span></span>
<span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.junit.jupiter.api.extension.ExtendWith;</span></span>
<span class="line"><span>import org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span>import org.springframework.test.context.ContextConfiguration;</span></span>
<span class="line"><span>import org.springframework.test.context.junit.jupiter.SpringExtension;</span></span>
<span class="line"><span>import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//两种方式均可</span></span>
<span class="line"><span>//方式一</span></span>
<span class="line"><span>//@ExtendWith(SpringExtension.class)</span></span>
<span class="line"><span>//@ContextConfiguration(&quot;classpath:beans.xml&quot;)</span></span>
<span class="line"><span>//方式二</span></span>
<span class="line"><span>@SpringJUnitConfig(locations = &quot;classpath:beans.xml&quot;)</span></span>
<span class="line"><span>public class UserTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private User user;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testUser(){</span></span>
<span class="line"><span>        System.out.println(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+'" alt="测试结果" tabindex="0" loading="lazy"><figcaption>测试结果</figcaption></figure>',18)]))}const c=n(p,[["render",t]]),v=JSON.parse('{"path":"/framework/spring/v5buc5na/","title":"Spring单元测试JUnit","lang":"zh-CN","frontmatter":{"title":"Spring单元测试JUnit","createTime":"2025/08/27 11:44:16","permalink":"/framework/spring/v5buc5na/"},"readingTime":{"minutes":2.75,"words":824},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring单元测试JUnit.md","headers":[]}');export{c as comp,v as data};
