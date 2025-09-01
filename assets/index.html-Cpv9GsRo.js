import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2023-12-30-11-37-22-b_5GMCYr.png",p="/lema/images/spring6/2023-12-30-11-53-09-DAlOkRL1.png",t="/lema/images/spring6/2023-12-30-12-29-51-CvbNiWMG.png",d="/lema/images/spring6/2023-12-30-12-38-09-DceDJ9qa.png",c="/lema/images/spring6/2023-12-30-17-52-28-dDmg3fQ3.png",r="/lema/images/spring6/2023-12-30-18-04-12-pY_rtMb5.png",u="/lema/images/spring6/2023-12-30-19-47-00-DRM-Xq14.png",v="/lema/images/spring6/2023-12-30-19-33-28-Dl9LcoPX.png",o="/lema/images/spring6/2023-12-30-19-50-00-0RS53Syf.png",m="/lema/images/spring6/2023-12-30-20-00-32-BT-qhm6x.png",b="/lema/images/spring6/2023-12-30-20-25-19-B2svqQzQ.png",g={};function h(k,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="创建子模块" tabindex="-1"><a class="header-anchor" href="#创建子模块"><span>创建子模块</span></a></h2><p>在使用 XML 管理 Bean 之前，为了防止和之前的项目冲突，我们重新创建一个子模块，叫做 spring6-ioc-xml ，并且引入 beans.xml 文件即可。</p><h2 id="获取bean" tabindex="-1"><a class="header-anchor" href="#获取bean"><span>获取bean</span></a></h2><p>在通过 xml 方式获取 bean 之前，我们需要先导入对应的配置文件，这里我们是 beans.xml。构建 ApplicationContext 容器。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 导入 bean 的 xml 配置文件</span></span>
<span class="line"><span>ApplicationContext context = new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 xml 方式下获取 bean 对象的方式有三种：</p><ol><li>根据 id 获取</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 1.根据 id 获取对象</span></span>
<span class="line"><span>User user1 = (User) context.getBean(&quot;user&quot;);</span></span>
<span class="line"><span>// 调用 user 对象的 run 方法</span></span>
<span class="line"><span>user1.run();</span></span>
<span class="line"><span>System.out.println(&quot;1 根据 id 获取的 User 对象&quot; + user1);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>根据 Class 获取</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 2.根据类型获取对象</span></span>
<span class="line"><span>User user2 = context.getBean(User.class);</span></span>
<span class="line"><span>user2.run();</span></span>
<span class="line"><span>System.out.println(&quot;2 根据 类型 获取的 User 对象&quot; + user2);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>同时根据 id 和 Class 获取</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>// 3.同时根据id和类型获取对象</span></span>
<span class="line"><span>User user3 = context.getBean(&quot;user&quot;, User.class);</span></span>
<span class="line"><span>user3.run();</span></span>
<span class="line"><span>System.out.println(&quot;3 同时根据 id 和 类型 获取的 User 对象&quot; + user3);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+`" alt="执行结果" loading="lazy">执行结果</p><p>注意</p><ul><li>要注意在 bean 的配置文件中，如果定义了两个相同的类，并赋予了不同的 id，那么此时就无法仅依靠类型来创建对象。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- 创建user --&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;user&quot; class=&quot;com.codermast.spring6.iocxml.User&quot;/&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;user&quot; class=&quot;com.codermast.spring6.iocxml.User&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错信息：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Exception in thread &quot;main&quot; org.springframework.beans.factory.NoUniqueBeanDefinition</span></span>
<span class="line"><span>Exception: No qualifying bean of type &#39;com.codermast.spring6.iocxml.User&#39; </span></span>
<span class="line"><span>available: expected single matching bean but found 2: user,user1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报错的意思就是，期望的应为单个匹配bean，但找到：user，user1 两个。</p><p>这个时候可以使用 id 或者 id和类型同时使用的方式进行获取，只要保证唯一性，理论上就可以创建。</p><p><strong>是否可以根据接口类型来获取bean？</strong></p><ul><li>如果接口的实现唯一，此时可根据接口类型来获取该实现类的Bean</li><li>如果接口的实现不唯一，那么久无法根据接口类型来获取该实现类的Bean</li></ul><figure><img src="`+p+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>结论</strong></p><p>根据类型来获取bean时，在满足 bean 唯一性的前提下，其实只是看：『对象 <strong>instanceof</strong> 指定的类型』的返回结果，只要返回的是 true 就可以认定为和类型匹配，能够获取到。</p><p>Java 中，instanceof运算符用于判断前面的对象是否是后面的类，或其子类、实现类的实例。如果是返回true，否则返回false。也就是说：用instanceof关键字做判断时， instanceof 操作符的左右操作必须有继承或实现关系</p><h2 id="依赖注入" tabindex="-1"><a class="header-anchor" href="#依赖注入"><span>依赖注入</span></a></h2><p>依赖注入DI（Dependency injection），是IOC的一个方面，是个通常的概念，它有多种解释。这概念是说你不用创建对象，而只需要描述它如何被创建。你不在代码里直接组装你的组件和服务，但是要在配置文件里描述哪些组件需要哪些服务，之后一个容器（IOC容器）负责把他们组装起来。</p><ul><li>降低程序间的耦合（依赖关系）</li><li>依赖关系的管理：</li><li>以后都交给spring来维护</li><li>在当前类需要用到其他类的对象，由spring为我们提供，我们只需要在配置文件中说明依赖关系的维护,就称之为依赖注入。</li></ul><p>提示</p><p>简单的来讲，依赖注入你只需要告诉他，所需要的各种数据在哪里去找即可，你不必亲自去找好交给他，让他自己去找所需要的依赖。</p><p>依赖注入主要有三种方式：Set方法注入、构造方法注入、注解注入</p><h3 id="set注入" tabindex="-1"><a class="header-anchor" href="#set注入"><span>Set注入</span></a></h3><p>在使用 Set 注入时，需要先创建对应属性的 Set 方法，否则无法进行注入。</p><ol><li>创建 Student 类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Student {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String sex;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Student() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getId() {</span></span>
<span class="line"><span>        return id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setId(Integer id) {</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getName() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setName(String name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setAge(Integer age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getSex() {</span></span>
<span class="line"><span>        return sex;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setSex(String sex) {</span></span>
<span class="line"><span>        this.sex = sex;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;Student{&quot; +</span></span>
<span class="line"><span>                &quot;id=&quot; + id +</span></span>
<span class="line"><span>                &quot;, name=&#39;&quot; + name + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, age=&quot; + age +</span></span>
<span class="line"><span>                &quot;, sex=&#39;&quot; + sex + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置 bean 时为属性赋值</li></ol><p>创建一个新配置文件，名为 beans-di.xml ，添加如下配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentOne&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- property标签：通过组件类的setXxx()方法给组件对象设置属性 --&gt;</span></span>
<span class="line"><span>    &lt;!-- name属性：指定属性名（这个属性名是getXxx()、setXxx()方法定义的，和成员变量无关） --&gt;</span></span>
<span class="line"><span>    &lt;!-- value属性：指定属性值 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1001&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;张三&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;23&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;男&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void setDiTest(){</span></span>
<span class="line"><span>    // 1.导入 beans-di 配置文件</span></span>
<span class="line"><span>    ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;beans-di.xml&quot;);</span></span>
<span class="line"><span>    // 2. 创建 Student 对象</span></span>
<span class="line"><span>    Student studentOne = ac.getBean(&quot;studentOne&quot;, Student.class);</span></span>
<span class="line"><span>    // 3. 打印 Student 对象</span></span>
<span class="line"><span>    System.out.println(studentOne);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="构造器注入" tabindex="-1"><a class="header-anchor" href="#构造器注入"><span>构造器注入</span></a></h3><p>在使用构造器注入时和 Set 注入同理，需要先提供构造器，才可以使用构造器注入。</p><ol><li>在 Student 类中添加有参构造器</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public Student(Integer id, String name, Integer age, String sex) {</span></span>
<span class="line"><span>    this.id = id;</span></span>
<span class="line"><span>    this.name = name;</span></span>
<span class="line"><span>    this.age = age;</span></span>
<span class="line"><span>    this.sex = sex;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>配置对应的 bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!--创建构造器 bean--&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;studentTwo&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;constructor-arg value=&quot;1002&quot;/&gt;</span></span>
<span class="line"><span>    &lt;constructor-arg value=&quot;李四&quot;/&gt;</span></span>
<span class="line"><span>    &lt;constructor-arg value=&quot;33&quot;/&gt;</span></span>
<span class="line"><span>    &lt;constructor-arg value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意</p><p>constructor-arg标签还有两个属性可以进一步描述构造器参数：</p><ul><li>index属性：指定参数所在位置的索引（从0开始）</li><li>name属性：指定参数名</li></ul><ol><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void constructDITest(){</span></span>
<span class="line"><span>    // 1.导入 beans-di 配置文件</span></span>
<span class="line"><span>    ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;beans-di.xml&quot;);</span></span>
<span class="line"><span>    // 2. 创建 Student 对象</span></span>
<span class="line"><span>    Student studentTwo = ac.getBean(&quot;studentTwo&quot;, Student.class);</span></span>
<span class="line"><span>    // 3. 打印 Student 对象</span></span>
<span class="line"><span>    System.out.println(studentTwo);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="数据赋值" tabindex="-1"><a class="header-anchor" href="#数据赋值"><span>数据赋值</span></a></h2><h3 id="特殊值赋值" tabindex="-1"><a class="header-anchor" href="#特殊值赋值"><span>特殊值赋值</span></a></h3><ol><li>字面量值</li></ol><blockquote><p>字面量就是数据本身所代表的值，如 1、2、3、a、b、c等就代表的是实际的值，而在 int a = 10; 时，a 是变量，10为字面量。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- 使用value属性给bean的属性赋值时，Spring会把value属性的值看做字面量 --&gt;</span></span>
<span class="line"><span>&lt;property name=&quot;name&quot; value=&quot;张三&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>null 值</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;property name=&quot;name&quot;&gt;</span></span>
<span class="line"><span>    &lt;null /&gt;</span></span>
<span class="line"><span>&lt;/property&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，不能直接讲 null 作为 value 值进行传递，此时则为传递一个 内容为 null 的字符串，而并非传递 null 对象。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;property name=&quot;name&quot; value=&quot;null&quot;&gt;&lt;/property&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li>xml 实体</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- 小于号在XML文档中用来定义标签的开始，不能随便使用 --&gt;</span></span>
<span class="line"><span>&lt;!-- 解决方案一：使用XML实体来代替 --&gt;</span></span>
<span class="line"><span>&lt;property name=&quot;expression&quot; value=&quot;a &amp;lt; b&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>cdata 节</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;property name=&quot;expression&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 解决方案二：使用CDATA节 --&gt;</span></span>
<span class="line"><span>    &lt;!-- CDATA中的C代表Character，是文本、字符的含义，CDATA就表示纯文本数据 --&gt;</span></span>
<span class="line"><span>    &lt;!-- XML解析器看到CDATA节就知道这里是纯文本，就不会当作XML标签或属性来解析 --&gt;</span></span>
<span class="line"><span>    &lt;!-- 所以CDATA节中写什么符号都随意 --&gt;</span></span>
<span class="line"><span>    &lt;value&gt;&lt;![CDATA[a &lt; b]]&gt;&lt;/value&gt;</span></span>
<span class="line"><span>&lt;/property&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象类型属性赋值" tabindex="-1"><a class="header-anchor" href="#对象类型属性赋值"><span>对象类型属性赋值</span></a></h3><ol><li>创建 Clazz 类 在为对象类型属性赋值之前，我们先来创建一个名为 Clazz 的班级类（这里是为了避免和 Java 关键字 class 冲突）</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Clazz {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer clazzId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String clazzName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getClazzId() {</span></span>
<span class="line"><span>        return clazzId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setClazzId(Integer clazzId) {</span></span>
<span class="line"><span>        this.clazzId = clazzId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getClazzName() {</span></span>
<span class="line"><span>        return clazzName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setClazzName(String clazzName) {</span></span>
<span class="line"><span>        this.clazzName = clazzName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;Clazz{&quot; +</span></span>
<span class="line"><span>                &quot;clazzId=&quot; + clazzId +</span></span>
<span class="line"><span>                &quot;, clazzName=&#39;&quot; + clazzName + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Clazz() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Clazz(Integer clazzId, String clazzName) {</span></span>
<span class="line"><span>        this.clazzId = clazzId;</span></span>
<span class="line"><span>        this.clazzName = clazzName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>修改 Student 类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>private Clazz clazz;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public Clazz getClazz() {</span></span>
<span class="line"><span>	return clazz;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void setClazz(Clazz clazz) {</span></span>
<span class="line"><span>	this.clazz = clazz;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置 Bean</li></ol><blockquote><p>这里我们在配置 Bean 的时候，有三种方式：外部bean、内部bean、级联属性赋值</p></blockquote><ul><li><p>外部bean</p><ol><li>配置 Clazz 类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;clazzOne&quot; class=&quot;com.codermast.spring6.iocxml.bean.Clazz&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzId&quot; value=&quot;1111&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzName&quot; value=&quot;财源滚滚班&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>为 Student 中的 clazz 属性赋值</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentFour&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot; ref=&quot;clazzOne&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>内部bean</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentFive&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- 在一个bean中再声明一个bean就是内部bean --&gt;</span></span>
<span class="line"><span>        &lt;!-- 内部bean只能用于给属性赋值，不能在外部通过IOC容器获取，因此可以省略id属性 --&gt;</span></span>
<span class="line"><span>        &lt;bean id=&quot;clazzInner&quot; class=&quot;com.codermast.spring6.iocxml.bean.Clazz&quot;&gt;</span></span>
<span class="line"><span>            &lt;property name=&quot;clazzId&quot; value=&quot;2222&quot;/&gt;</span></span>
<span class="line"><span>            &lt;property name=&quot;clazzName&quot; value=&quot;远大前程班&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/bean&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>级联属性赋值</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentSix&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot; ref=&quot;clazzOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz.clazzId&quot; value=&quot;3333&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz.clazzName&quot; value=&quot;最强王者班&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组类型属性赋值" tabindex="-1"><a class="header-anchor" href="#数组类型属性赋值"><span>数组类型属性赋值</span></a></h3><ol><li>修改 Student 类</li></ol><p>在 Student 类中增加如下代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>private String[] hobbies;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public String[] getHobbies() {</span></span>
<span class="line"><span>    return hobbies;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void setHobbies(String[] hobbies) {</span></span>
<span class="line"><span>    this.hobbies = hobbies;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置 bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentSeven&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot; ref=&quot;clazzOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;hobbies&quot;&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>            &lt;value&gt;抽烟&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;喝酒&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;烫头&lt;/value&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合类型属性赋值" tabindex="-1"><a class="header-anchor" href="#集合类型属性赋值"><span>集合类型属性赋值</span></a></h3><ul><li>List 集合</li></ul><ol><li>在 Clazz 类中加入如下代码</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>private List&lt;Student&gt; students;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public List&lt;Student&gt; getStudents() {</span></span>
<span class="line"><span>    return students;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void setStudents(List&lt;Student&gt; students) {</span></span>
<span class="line"><span>    this.students = students;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置 bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;clazzTwo&quot; class=&quot;com.codermast.spring6.iocxml.bean.Clazz&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzId&quot; value=&quot;4444&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzName&quot; value=&quot;Javaee0222&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;students&quot;&gt;</span></span>
<span class="line"><span>        &lt;list&gt;</span></span>
<span class="line"><span>            &lt;ref bean=&quot;studentOne&quot;/&gt;</span></span>
<span class="line"><span>            &lt;ref bean=&quot;studentTwo&quot;/&gt;</span></span>
<span class="line"><span>            &lt;ref bean=&quot;studentFour&quot;/&gt;</span></span>
<span class="line"><span>            &lt;ref bean=&quot;studentFive&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/list&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若为 Set 集合类型属性赋值，只需要将其中的 list 标签改为set标签即可。</p><ul><li>Map 集合</li></ul><ol><li><p>创建 Teacher 类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Teacher {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer teacherId;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String teacherName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getTeacherId() {</span></span>
<span class="line"><span>        return teacherId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setTeacherId(Integer teacherId) {</span></span>
<span class="line"><span>        this.teacherId = teacherId;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getTeacherName() {</span></span>
<span class="line"><span>        return teacherName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setTeacherName(String teacherName) {</span></span>
<span class="line"><span>        this.teacherName = teacherName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Teacher(Integer teacherId, String teacherName) {</span></span>
<span class="line"><span>        this.teacherId = teacherId;</span></span>
<span class="line"><span>        this.teacherName = teacherName;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Teacher() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;Teacher{&quot; +</span></span>
<span class="line"><span>                &quot;teacherId=&quot; + teacherId +</span></span>
<span class="line"><span>                &quot;, teacherName=&#39;&quot; + teacherName + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>在 Student 类中加入如下代码</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>private Map&lt;String, Teacher&gt; teacherMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public Map&lt;String, Teacher&gt; getTeacherMap() {</span></span>
<span class="line"><span>    return teacherMap;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public void setTeacherMap(Map&lt;String, Teacher&gt; teacherMap) {</span></span>
<span class="line"><span>    this.teacherMap = teacherMap;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>配置bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- Map 集合配置--&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;teacherOne&quot; class=&quot;com.codermast.spring6.iocxml.bean.Teacher&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherId&quot; value=&quot;10010&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherName&quot; value=&quot;大宝&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;teacherTwo&quot; class=&quot;com.codermast.spring6.iocxml.bean.Teacher&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherId&quot; value=&quot;10086&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherName&quot; value=&quot;二宝&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;studentFour&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot; ref=&quot;clazzOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;hobbies&quot;&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>            &lt;value&gt;抽烟&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;喝酒&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;烫头&lt;/value&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherMap&quot;&gt;</span></span>
<span class="line"><span>        &lt;map&gt;</span></span>
<span class="line"><span>            &lt;entry value-ref=&quot;teacherOne&quot;&gt;</span></span>
<span class="line"><span>                &lt;key&gt;</span></span>
<span class="line"><span>                    &lt;value&gt;10010&lt;/value&gt;</span></span>
<span class="line"><span>                &lt;/key&gt;</span></span>
<span class="line"><span>            &lt;/entry&gt;</span></span>
<span class="line"><span>            &lt;entry value-ref=&quot;teacherTwo&quot;&gt;</span></span>
<span class="line"><span>                &lt;key&gt;</span></span>
<span class="line"><span>                    &lt;value&gt;10086&lt;/value&gt;</span></span>
<span class="line"><span>                &lt;/key&gt;</span></span>
<span class="line"><span>            &lt;/entry&gt;</span></span>
<span class="line"><span>        &lt;/map&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>引用集合类型</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!--list集合类型的bean--&gt;</span></span>
<span class="line"><span>&lt;util:list id=&quot;students&quot;&gt;</span></span>
<span class="line"><span>    &lt;ref bean=&quot;studentOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;ref bean=&quot;studentTwo&quot;/&gt;</span></span>
<span class="line"><span>    &lt;ref bean=&quot;studentFour&quot;/&gt;</span></span>
<span class="line"><span>&lt;/util:list&gt;</span></span>
<span class="line"><span>&lt;!--map集合类型的bean--&gt;</span></span>
<span class="line"><span>&lt;util:map id=&quot;teacherMap&quot;&gt;</span></span>
<span class="line"><span>    &lt;entry&gt;</span></span>
<span class="line"><span>        &lt;key&gt;</span></span>
<span class="line"><span>            &lt;value&gt;10010&lt;/value&gt;</span></span>
<span class="line"><span>        &lt;/key&gt;</span></span>
<span class="line"><span>        &lt;ref bean=&quot;teacherOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/entry&gt;</span></span>
<span class="line"><span>    &lt;entry&gt;</span></span>
<span class="line"><span>        &lt;key&gt;</span></span>
<span class="line"><span>            &lt;value&gt;10086&lt;/value&gt;</span></span>
<span class="line"><span>        &lt;/key&gt;</span></span>
<span class="line"><span>        &lt;ref bean=&quot;teacherTwo&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/entry&gt;</span></span>
<span class="line"><span>&lt;/util:map&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;clazzTwo&quot; class=&quot;com.codermast.spring6.iocxml.bean.Clazz&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzId&quot; value=&quot;4444&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazzName&quot; value=&quot;Javaee0222&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;students&quot; ref=&quot;students&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;studentFour&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1004&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;name&quot; value=&quot;赵六&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;26&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;sex&quot; value=&quot;女&quot;/&gt;</span></span>
<span class="line"><span>    &lt;!-- ref属性：引用IOC容器中某个bean的id，将所对应的bean为属性赋值 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;clazz&quot; ref=&quot;clazzOne&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;hobbies&quot;&gt;</span></span>
<span class="line"><span>        &lt;array&gt;</span></span>
<span class="line"><span>            &lt;value&gt;抽烟&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;喝酒&lt;/value&gt;</span></span>
<span class="line"><span>            &lt;value&gt;烫头&lt;/value&gt;</span></span>
<span class="line"><span>        &lt;/array&gt;</span></span>
<span class="line"><span>    &lt;/property&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;teacherMap&quot; ref=&quot;teacherMap&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用util:list、util:map标签必须引入相应的命名空间</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>    xmlns:util=&quot;http://www.springframework.org/schema/util&quot;</span></span>
<span class="line"><span>    xsi:schemaLocation=&quot;http://www.springframework.org/schema/util</span></span>
<span class="line"><span>    http://www.springframework.org/schema/util/spring-util.xsd</span></span>
<span class="line"><span>    http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>    http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="p命名空间" tabindex="-1"><a class="header-anchor" href="#p命名空间"><span>P命名空间</span></a></h2><ul><li>引入 P 命名空间</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xmlns:util=&quot;http://www.springframework.org/schema/util&quot;</span></span>
<span class="line"><span>       xmlns:p=&quot;http://www.springframework.org/schema/p&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/util</span></span>
<span class="line"><span>       http://www.springframework.org/schema/util/spring-util.xsd</span></span>
<span class="line"><span>       http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>       http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>引入p命名空间后，可以通过以下方式为bean的各个属性赋值</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;studentSix&quot; class=&quot;com.codermast.spring6.iocxml.bean.Student&quot;</span></span>
<span class="line"><span>    p:id=&quot;1006&quot; p:name=&quot;小明&quot; p:clazz-ref=&quot;clazzOne&quot; p:teacherMap-ref=&quot;teacherMap&quot;&gt;&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入外部属性文件" tabindex="-1"><a class="header-anchor" href="#引入外部属性文件"><span>引入外部属性文件</span></a></h2><ol><li>加入依赖</li></ol><p>即将下面的代码，加入到对应子模块中的 pom.xml 文件中</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- MySQL驱动 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;mysql&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;8.0.30&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 数据源 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;druid&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.2.15&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>创建外部属性配置文件jdbc.properties</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>jdbc.user=codermast</span></span>
<span class="line"><span>jdbc.password=123456</span></span>
<span class="line"><span>jdbc.url=jdbc:mysql://localhost:3306/ssm?serverTimezone=UTC</span></span>
<span class="line"><span>jdbc.driver=com.mysql.cj.jdbc.Driver</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>引入配置文件</li></ol><p>引入context 名称空间，这里我们为了防止和之前的冲突，新建一个 bean 配置文件，名为 <code>spring-datasource.xml</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xmlns:context=&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>       http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span>       http://www.springframework.org/schema/context</span></span>
<span class="line"><span>       http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 引入外部属性文件 --&gt;</span></span>
<span class="line"><span>    &lt;context:property-placeholder location=&quot;classpath:jdbc.properties&quot;/&gt;</span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><p>在使用 <code>&lt;context:property-placeholder&gt;</code> 元素加载外包配置文件功能前，首先需要在 XML 配置的一级标签 <code>&lt;beans&gt;</code> 中添加 context 相关的约束。</p><ol><li>配置bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;druidDataSource&quot; class=&quot;com.alibaba.druid.pool.DruidDataSource&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;url&quot; value=&quot;\${jdbc.url}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;driverClassName&quot; value=&quot;\${jdbc.driver}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;username&quot; value=&quot;\${jdbc.user}&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;password&quot; value=&quot;\${jdbc.password}&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testDataSource() throws SQLException {</span></span>
<span class="line"><span>    ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;spring-datasource.xml&quot;);</span></span>
<span class="line"><span>    DataSource dataSource = ac.getBean(DataSource.class);</span></span>
<span class="line"><span>    Connection connection = dataSource.getConnection();</span></span>
<span class="line"><span>    System.out.println(connection);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><figure><img src="`+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="bean的作用域" tabindex="-1"><a class="header-anchor" href="#bean的作用域"><span>Bean的作用域</span></a></h2><ol><li>概念</li></ol><p>在Spring中可以通过配置bean标签的scope属性来指定bean的作用域范围，各取值含义参加下表：</p><table><thead><tr><th>取值</th><th>含义</th><th>创建对象的时机</th></tr></thead><tbody><tr><td>singleton（默认）</td><td>在IOC容器中，这个bean的对象始终为单实例</td><td>IOC容器初始化时</td></tr><tr><td>prototype</td><td>这个bean在IOC容器中有多个实例</td><td>获取bean时</td></tr></tbody></table><p>如果是在WebApplicationContext环境下还会有另外几个作用域（但不常用）：</p><table><thead><tr><th>取值</th><th>含义</th></tr></thead><tbody><tr><td>request</td><td>在一个请求范围内有效</td></tr><tr><td>session</td><td>在一个会话范围内有效</td></tr></tbody></table><ol start="2"><li><p>创建 User 类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>package com.atguigu.spring6.bean;</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String username;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String password;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User(Integer id, String username, String password, Integer age) {</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>        this.username = username;</span></span>
<span class="line"><span>        this.password = password;</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getId() {</span></span>
<span class="line"><span>        return id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setId(Integer id) {</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getUsername() {</span></span>
<span class="line"><span>        return username;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setUsername(String username) {</span></span>
<span class="line"><span>        this.username = username;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getPassword() {</span></span>
<span class="line"><span>        return password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setPassword(String password) {</span></span>
<span class="line"><span>        this.password = password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setAge(Integer age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;User{&quot; +</span></span>
<span class="line"><span>                &quot;id=&quot; + id +</span></span>
<span class="line"><span>                &quot;, username=&#39;&quot; + username + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, password=&#39;&quot; + password + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, age=&quot; + age +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里也可以使用我们之前的 User 类，不影响后续的操作。</p><ol start="3"><li>配置bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- 配置 User 类 --&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userSingleton&quot; class=&quot;com.codermast.spring6.iocxml.bean.User&quot; scope=&quot;singleton&quot;/&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userPrototype&quot; class=&quot;com.codermast.spring6.iocxml.bean.User&quot; scope=&quot;prototype&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testBeanScope(){</span></span>
<span class="line"><span>    ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;spring-scope.xml&quot;);</span></span>
<span class="line"><span>    User user1 = ac.getBean(User.class);</span></span>
<span class="line"><span>    User user2 = ac.getBean(User.class);</span></span>
<span class="line"><span>    System.out.println(user1==user2);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="bean生命周期" tabindex="-1"><a class="header-anchor" href="#bean生命周期"><span>Bean生命周期</span></a></h2><ol><li>具体的生命周期过程</li></ol><ul><li>bean对象创建（调用无参构造器）</li><li>给bean对象设置属性</li><li>bean的后置处理器（初始化之前）</li><li>bean对象初始化（需在配置bean时指定初始化方法）</li><li>bean的后置处理器（初始化之后）</li><li>bean对象就绪可以使用</li><li>bean对象销毁（需在配置bean时指定销毁方法）</li><li>IOC容器关闭</li></ul><ol><li>修改 User 类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer id;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String username;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private String password;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Integer age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User() {</span></span>
<span class="line"><span>        System.out.println(&quot;生命周期：1、创建对象&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public User(Integer id, String username, String password, Integer age) {</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>        this.username = username;</span></span>
<span class="line"><span>        this.password = password;</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getId() {</span></span>
<span class="line"><span>        return id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setId(Integer id) {</span></span>
<span class="line"><span>        System.out.println(&quot;生命周期：2、依赖注入&quot;);</span></span>
<span class="line"><span>        this.id = id;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getUsername() {</span></span>
<span class="line"><span>        return username;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setUsername(String username) {</span></span>
<span class="line"><span>        this.username = username;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getPassword() {</span></span>
<span class="line"><span>        return password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setPassword(String password) {</span></span>
<span class="line"><span>        this.password = password;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Integer getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setAge(Integer age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void initMethod(){</span></span>
<span class="line"><span>        System.out.println(&quot;生命周期：3、初始化&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void destroyMethod(){</span></span>
<span class="line"><span>        System.out.println(&quot;生命周期：5、销毁&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;User{&quot; +</span></span>
<span class="line"><span>                &quot;id=&quot; + id +</span></span>
<span class="line"><span>                &quot;, username=&#39;&quot; + username + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, password=&#39;&quot; + password + &#39;\\&#39;&#39; +</span></span>
<span class="line"><span>                &quot;, age=&quot; + age +</span></span>
<span class="line"><span>                &#39;}&#39;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void run(){</span></span>
<span class="line"><span>        System.out.println(&quot;run ......&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意其中的initMethod()和destroyMethod()，可以通过配置bean指定为初始化和销毁的方法</p><ol start="3"><li>配置bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- 使用init-method属性指定初始化方法 --&gt;</span></span>
<span class="line"><span>&lt;!-- 使用destroy-method属性指定销毁方法 --&gt;</span></span>
<span class="line"><span>&lt;bean class=&quot;com.codermast.spring6.iocxml.bean.User&quot; scope=&quot;prototype&quot; init-method=&quot;initMethod&quot; destroy-method=&quot;destroyMethod&quot;&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;id&quot; value=&quot;1001&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;username&quot; value=&quot;admin&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;password&quot; value=&quot;123456&quot;/&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;age&quot; value=&quot;23&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testLife(){</span></span>
<span class="line"><span>    ClassPathXmlApplicationContext ac = new ClassPathXmlApplicationContext(&quot;spring-lifecycle.xml&quot;);</span></span>
<span class="line"><span>    User bean = ac.getBean(User.class);</span></span>
<span class="line"><span>    System.out.println(&quot;生命周期：4、通过IOC容器获取bean并使用&quot;);</span></span>
<span class="line"><span>    ac.close();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><img src="'+v+`" alt="" loading="lazy"> 只有在单例模式下，执行 close 方法才会调用 destroyMethod 销毁方法。</p><ol start="5"><li>bean的后置处理器</li></ol><p>bean的后置处理器会在生命周期的初始化前后添加额外的操作，需要实现BeanPostProcessor接口，且配置到IOC容器中，需要注意的是，bean后置处理器不是单独针对某一个bean生效，而是针对IOC容器中所有bean都会执行</p><p>创建bean的后置处理器：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class MyBeanProcessor implements BeanPostProcessor {</span></span>
<span class="line"><span>    // 初始化之前调用</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {</span></span>
<span class="line"><span>        System.out.println(&quot;☆☆☆&quot; + beanName + &quot; = &quot; + bean);</span></span>
<span class="line"><span>        return bean;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 初始化之后调用</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {</span></span>
<span class="line"><span>        System.out.println(&quot;★★★&quot; + beanName + &quot; = &quot; + bean);</span></span>
<span class="line"><span>        return bean;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在IOC容器中配置后置处理器：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!-- bean的后置处理器要放入IOC容器才能生效 --&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;myBeanProcessor&quot; class=&quot;com.atguigu.spring6.process.MyBeanProcessor&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+o+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="factorybean" tabindex="-1"><a class="header-anchor" href="#factorybean"><span>FactoryBean</span></a></h2><ol><li>简介</li></ol><p>FactoryBean是Spring提供的一种整合第三方框架的常用机制。和普通的bean不同，配置一个FactoryBean类型的bean，在获取bean的时候得到的并不是class属性中配置的这个类的对象，而是getObject()方法的返回值。通过这种机制，Spring可以帮我们把复杂组件创建的详细过程和繁琐细节都屏蔽起来，只把最简洁的使用界面展示给我们。</p><p>将来我们整合Mybatis时，Spring就是通过FactoryBean机制来帮我们创建SqlSessionFactory对象的。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>/*</span></span>
<span class="line"><span> * Copyright 2002-2020 the original author or authors.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);</span></span>
<span class="line"><span> * you may not use this file except in compliance with the License.</span></span>
<span class="line"><span> * You may obtain a copy of the License at</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> *      https://www.apache.org/licenses/LICENSE-2.0</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * Unless required by applicable law or agreed to in writing, software</span></span>
<span class="line"><span> * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span></span>
<span class="line"><span> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span></span>
<span class="line"><span> * See the License for the specific language governing permissions and</span></span>
<span class="line"><span> * limitations under the License.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>package org.springframework.beans.factory;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import org.springframework.lang.Nullable;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * Interface to be implemented by objects used within a {@link BeanFactory} which</span></span>
<span class="line"><span> * are themselves factories for individual objects. If a bean implements this</span></span>
<span class="line"><span> * interface, it is used as a factory for an object to expose, not directly as a</span></span>
<span class="line"><span> * bean instance that will be exposed itself.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;&lt;b&gt;NB: A bean that implements this interface cannot be used as a normal bean.&lt;/b&gt;</span></span>
<span class="line"><span> * A FactoryBean is defined in a bean style, but the object exposed for bean</span></span>
<span class="line"><span> * references ({@link #getObject()}) is always the object that it creates.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;FactoryBeans can support singletons and prototypes, and can either create</span></span>
<span class="line"><span> * objects lazily on demand or eagerly on startup. The {@link SmartFactoryBean}</span></span>
<span class="line"><span> * interface allows for exposing more fine-grained behavioral metadata.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;This interface is heavily used within the framework itself, for example for</span></span>
<span class="line"><span> * the AOP {@link org.springframework.aop.framework.ProxyFactoryBean} or the</span></span>
<span class="line"><span> * {@link org.springframework.jndi.JndiObjectFactoryBean}. It can be used for</span></span>
<span class="line"><span> * custom components as well; however, this is only common for infrastructure code.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;&lt;b&gt;{@code FactoryBean} is a programmatic contract. Implementations are not</span></span>
<span class="line"><span> * supposed to rely on annotation-driven injection or other reflective facilities.&lt;/b&gt;</span></span>
<span class="line"><span> * {@link #getObjectType()} {@link #getObject()} invocations may arrive early in the</span></span>
<span class="line"><span> * bootstrap process, even ahead of any post-processor setup. If you need access to</span></span>
<span class="line"><span> * other beans, implement {@link BeanFactoryAware} and obtain them programmatically.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;&lt;b&gt;The container is only responsible for managing the lifecycle of the FactoryBean</span></span>
<span class="line"><span> * instance, not the lifecycle of the objects created by the FactoryBean.&lt;/b&gt; Therefore,</span></span>
<span class="line"><span> * a destroy method on an exposed bean object (such as {@link java.io.Closeable#close()}</span></span>
<span class="line"><span> * will &lt;i&gt;not&lt;/i&gt; be called automatically. Instead, a FactoryBean should implement</span></span>
<span class="line"><span> * {@link DisposableBean} and delegate any such close call to the underlying object.</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * &lt;p&gt;Finally, FactoryBean objects participate in the containing BeanFactory&#39;s</span></span>
<span class="line"><span> * synchronization of bean creation. There is usually no need for internal</span></span>
<span class="line"><span> * synchronization other than for purposes of lazy initialization within the</span></span>
<span class="line"><span> * FactoryBean itself (or the like).</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> * @author Rod Johnson</span></span>
<span class="line"><span> * @author Juergen Hoeller</span></span>
<span class="line"><span> * @since 08.03.2003</span></span>
<span class="line"><span> * @param &lt;T&gt; the bean type</span></span>
<span class="line"><span> * @see org.springframework.beans.factory.BeanFactory</span></span>
<span class="line"><span> * @see org.springframework.aop.framework.ProxyFactoryBean</span></span>
<span class="line"><span> * @see org.springframework.jndi.JndiObjectFactoryBean</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>public interface FactoryBean&lt;T&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * The name of an attribute that can be</span></span>
<span class="line"><span>     * {@link org.springframework.core.AttributeAccessor#setAttribute set} on a</span></span>
<span class="line"><span>     * {@link org.springframework.beans.factory.config.BeanDefinition} so that</span></span>
<span class="line"><span>     * factory beans can signal their object type when it can&#39;t be deduced from</span></span>
<span class="line"><span>     * the factory bean class.</span></span>
<span class="line"><span>     * @since 5.2</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    String OBJECT_TYPE_ATTRIBUTE = &quot;factoryBeanObjectType&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Return an instance (possibly shared or independent) of the object</span></span>
<span class="line"><span>     * managed by this factory.</span></span>
<span class="line"><span>     * &lt;p&gt;As with a {@link BeanFactory}, this allows support for both the</span></span>
<span class="line"><span>     * Singleton and Prototype design pattern.</span></span>
<span class="line"><span>     * &lt;p&gt;If this FactoryBean is not fully initialized yet at the time of</span></span>
<span class="line"><span>     * the call (for example because it is involved in a circular reference),</span></span>
<span class="line"><span>     * throw a corresponding {@link FactoryBeanNotInitializedException}.</span></span>
<span class="line"><span>     * &lt;p&gt;As of Spring 2.0, FactoryBeans are allowed to return {@code null}</span></span>
<span class="line"><span>     * objects. The factory will consider this as normal value to be used; it</span></span>
<span class="line"><span>     * will not throw a FactoryBeanNotInitializedException in this case anymore.</span></span>
<span class="line"><span>     * FactoryBean implementations are encouraged to throw</span></span>
<span class="line"><span>     * FactoryBeanNotInitializedException themselves now, as appropriate.</span></span>
<span class="line"><span>     * @return an instance of the bean (can be {@code null})</span></span>
<span class="line"><span>     * @throws Exception in case of creation errors</span></span>
<span class="line"><span>     * @see FactoryBeanNotInitializedException</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Nullable</span></span>
<span class="line"><span>    T getObject() throws Exception;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Return the type of object that this FactoryBean creates,</span></span>
<span class="line"><span>     * or {@code null} if not known in advance.</span></span>
<span class="line"><span>     * &lt;p&gt;This allows one to check for specific types of beans without</span></span>
<span class="line"><span>     * instantiating objects, for example on autowiring.</span></span>
<span class="line"><span>     * &lt;p&gt;In the case of implementations that are creating a singleton object,</span></span>
<span class="line"><span>     * this method should try to avoid singleton creation as far as possible;</span></span>
<span class="line"><span>     * it should rather estimate the type in advance.</span></span>
<span class="line"><span>     * For prototypes, returning a meaningful type here is advisable too.</span></span>
<span class="line"><span>     * &lt;p&gt;This method can be called &lt;i&gt;before&lt;/i&gt; this FactoryBean has</span></span>
<span class="line"><span>     * been fully initialized. It must not rely on state created during</span></span>
<span class="line"><span>     * initialization; of course, it can still use such state if available.</span></span>
<span class="line"><span>     * &lt;p&gt;&lt;b&gt;NOTE:&lt;/b&gt; Autowiring will simply ignore FactoryBeans that return</span></span>
<span class="line"><span>     * {@code null} here. Therefore it is highly recommended to implement</span></span>
<span class="line"><span>     * this method properly, using the current state of the FactoryBean.</span></span>
<span class="line"><span>     * @return the type of object that this FactoryBean creates,</span></span>
<span class="line"><span>     * or {@code null} if not known at the time of the call</span></span>
<span class="line"><span>     * @see ListableBeanFactory#getBeansOfType</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @Nullable</span></span>
<span class="line"><span>    Class&lt;?&gt; getObjectType();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Is the object managed by this factory a singleton? That is,</span></span>
<span class="line"><span>     * will {@link #getObject()} always return the same object</span></span>
<span class="line"><span>     * (a reference that can be cached)?</span></span>
<span class="line"><span>     * &lt;p&gt;&lt;b&gt;NOTE:&lt;/b&gt; If a FactoryBean indicates to hold a singleton object,</span></span>
<span class="line"><span>     * the object returned from {@code getObject()} might get cached</span></span>
<span class="line"><span>     * by the owning BeanFactory. Hence, do not return {@code true}</span></span>
<span class="line"><span>     * unless the FactoryBean always exposes the same reference.</span></span>
<span class="line"><span>     * &lt;p&gt;The singleton status of the FactoryBean itself will generally</span></span>
<span class="line"><span>     * be provided by the owning BeanFactory; usually, it has to be</span></span>
<span class="line"><span>     * defined as singleton there.</span></span>
<span class="line"><span>     * &lt;p&gt;&lt;b&gt;NOTE:&lt;/b&gt; This method returning {@code false} does not</span></span>
<span class="line"><span>     * necessarily indicate that returned objects are independent instances.</span></span>
<span class="line"><span>     * An implementation of the extended {@link SmartFactoryBean} interface</span></span>
<span class="line"><span>     * may explicitly indicate independent instances through its</span></span>
<span class="line"><span>     * {@link SmartFactoryBean#isPrototype()} method. Plain {@link FactoryBean}</span></span>
<span class="line"><span>     * implementations which do not implement this extended interface are</span></span>
<span class="line"><span>     * simply assumed to always return independent instances if the</span></span>
<span class="line"><span>     * {@code isSingleton()} implementation returns {@code false}.</span></span>
<span class="line"><span>     * &lt;p&gt;The default implementation returns {@code true}, since a</span></span>
<span class="line"><span>     * {@code FactoryBean} typically manages a singleton instance.</span></span>
<span class="line"><span>     * @return whether the exposed object is a singleton</span></span>
<span class="line"><span>     * @see #getObject()</span></span>
<span class="line"><span>     * @see SmartFactoryBean#isPrototype()</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    default boolean isSingleton() {</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建类UserFactoryBean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UserFactoryBean implements FactoryBean&lt;User&gt; {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public User getObject() throws Exception {</span></span>
<span class="line"><span>        return new User();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Class&lt;?&gt; getObjectType() {</span></span>
<span class="line"><span>        return User.class;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置bean</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;user&quot; class=&quot;com.codermast.spring6.iocxml.bean.UserFactoryBean&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="4"><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testUserFactoryBean(){</span></span>
<span class="line"><span>    //获取IOC容器</span></span>
<span class="line"><span>    ApplicationContext ac = new ClassPathXmlApplicationContext(&quot;bean-factorybean.xml&quot;);</span></span>
<span class="line"><span>    User user = (User) ac.getBean(&quot;user&quot;);</span></span>
<span class="line"><span>    System.out.println(user);</span></span>
<span class="line"><span>    System.out.println(user.getClass());</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+m+`" alt="测试结果" tabindex="0" loading="lazy"><figcaption>测试结果</figcaption></figure><h2 id="基于xml自动装配" tabindex="-1"><a class="header-anchor" href="#基于xml自动装配"><span>基于xml自动装配</span></a></h2><p>自动装配：根据指定的策略，在IOC容器中匹配某一个bean，自动为指定的bean中所依赖的类类型或接口类型属性赋值</p><ol><li>场景模拟</li></ol><p>创建类UserController</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UserController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private UserService userService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setUserService(UserService userService) {</span></span>
<span class="line"><span>        this.userService = userService;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void saveUser(){</span></span>
<span class="line"><span>        userService.saveUser();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建接口UserService</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    void saveUser();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建类UserServiceImpl实现接口UserService</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private UserDao userDao;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setUserDao(UserDao userDao) {</span></span>
<span class="line"><span>        this.userDao = userDao;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void saveUser() {</span></span>
<span class="line"><span>        userDao.saveUser();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建接口UserDao</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface UserDao {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    void saveUser();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建类UserDaoImpl实现接口UserDao</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UserDaoImpl implements UserDao{</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void saveUser() {</span></span>
<span class="line"><span>        System.out.println(&quot;保存成功&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.配置bean</p><p>使用bean标签的autowire属性设置自动装配效果</p><ul><li>自动装配方式：byType</li></ul><p>byType：根据类型匹配IOC容器中的某个兼容类型的bean，为属性自动赋值</p><blockquote><p>若在IOC中，没有任何一个兼容类型的bean能够为属性赋值，则该属性不装配，即值为默认值null</p></blockquote><blockquote><p>若在IOC中，有多个兼容类型的bean能够为属性赋值，则抛出异常NoUniqueBeanDefinitionException</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>autowire-byType.xml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!--自动装配 ：byType 方式--&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userController&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.controller.UserController&quot;</span></span>
<span class="line"><span>    autowire=&quot;byType&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;userService&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.service.UserServiceImpl&quot;</span></span>
<span class="line"><span>    autowire=&quot;byType&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;userDao&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.dao.UserDaoImpl&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>自动装配方式：byName</li></ul><p>byName：将自动装配的属性的属性名，作为bean的id在IOC容器中匹配相对应的bean进行赋值</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>autowire-byName.xml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;!--自动装配：byName 方式--&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userController&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.controller.UserController&quot;</span></span>
<span class="line"><span>    autowire=&quot;byName&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;userService&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.service.UserServiceImpl&quot;</span></span>
<span class="line"><span>    autowire=&quot;byName&quot;/&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userServiceImpl&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.service.UserServiceImpl&quot;</span></span>
<span class="line"><span>    autowire=&quot;byName&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;bean id=&quot;userDao&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.dao.UserDaoImpl&quot;/&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;userDaoImpl&quot; class=&quot;com.codermast.spring6.iocxml.bean.autowire.dao.UserDaoImpl&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>测试</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testAutoWireByXML() {</span></span>
<span class="line"><span>    ApplicationContext acByName = new ClassPathXmlApplicationContext(&quot;autowire-byName.xml&quot;);</span></span>
<span class="line"><span>    UserController userControllerByName = acByName.getBean(UserController.class);</span></span>
<span class="line"><span>    userControllerByName.saveUser();</span></span>
<span class="line"><span>    ApplicationContext acByType = new ClassPathXmlApplicationContext(&quot;autowire-byType.xml&quot;);</span></span>
<span class="line"><span>    UserController userControllerByType = acByType.getBean(UserController.class);</span></span>
<span class="line"><span>    userControllerByType.saveUser();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+b+'" alt="测试结果" loading="lazy">https://github.com/codermast/codermast-notes/edit/main/docs/spring-series/spring/xml-beans.md)</p>',161)]))}const f=n(g,[["render",h]]),y=JSON.parse('{"path":"/framework/spring/9zua8g3c/","title":"Spring基于XML管理Bean","lang":"zh-CN","frontmatter":{"title":"Spring基于XML管理Bean","createTime":"2025/08/27 11:07:28","permalink":"/framework/spring/9zua8g3c/"},"readingTime":{"minutes":19.29,"words":5788},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring基于XML管理Bean.md","headers":[]}');export{f as comp,y as data};
