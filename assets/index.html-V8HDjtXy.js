import{a as n,c as a,b as i,o as e}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2023-12-29-21-59-07-DjirFP7x.png",p={};function t(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<ul><li>创建 Maven 工程</li><li>引入 Spring 相关的依赖</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;!--spring context依赖--&gt;</span></span>
<span class="line"><span>    &lt;!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.springframework&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;spring-context&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;6.0.9&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--junit5测试--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;junit-jupiter-api&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;5.3.1&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>创建java类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>package com.codermast.spring6.bean;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class HelloWorld {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public void sayHello(){</span></span>
<span class="line"><span>        System.out.println(&quot;helloworld&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>创建配置文件</li></ol><p>在resources目录创建一个 Spring 配置文件 beans.xml（配置文件名称可随意命名，如：springs.xml）</p><p>这里的命名需要和第五步中的使用的配置文件名称相同。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--</span></span>
<span class="line"><span>    配置HelloWorld所对应的bean，即将HelloWorld的对象交给Spring的IOC容器管理</span></span>
<span class="line"><span>    通过bean标签配置IOC容器所管理的bean</span></span>
<span class="line"><span>    属性：</span></span>
<span class="line"><span>        id：设置bean的唯一标识</span></span>
<span class="line"><span>        class：设置bean所对应类型的全类名</span></span>
<span class="line"><span>	--&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;helloWorld&quot; class=&quot;com.codermast.spring6.bean.HelloWorld&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>创建测试类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>package com.codermast.spring6.bean;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class HelloWorldTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testHelloWorld(){</span></span>
<span class="line"><span>        ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span>
<span class="line"><span>        HelloWorld helloworld = (HelloWorld) ac.getBean(&quot;helloWorld&quot;);</span></span>
<span class="line"><span>        helloworld.sayHello();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>测试运行</li></ol><figure><img src="`+l+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>',12)]))}const c=n(p,[["render",t]]),o=JSON.parse('{"path":"/framework/spring/94m3t6vd/","title":"Spring入门案例","lang":"zh-CN","frontmatter":{"title":"Spring入门案例","createTime":"2025/08/27 10:57:46","permalink":"/framework/spring/94m3t6vd/"},"readingTime":{"minutes":0.97,"words":291},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring入门案例.md","headers":[]}');export{c as comp,o as data};
