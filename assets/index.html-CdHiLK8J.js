import{a as n,c as a,b as i,o as e}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2024-01-01-20-17-52-zmswRACZ.png",p={};function c(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p>Spring 框架的 IOC 是基于 Java 反射机制实现的，在学习手写 IoC 之前，你需要具备一定的 Java 反射相关的知识，参考本站内的 Java 教程。</p><p>Java教程</p><p>//TODO: 待更新</p><p>IoC（控制反转）和DI（依赖注入）是Spring里面核心的东西，本章节我们就来自己实现 Spring 框架中的 IoC 和 DI。</p><h2 id="创建子模块" tabindex="-1"><a class="header-anchor" href="#创建子模块"><span>创建子模块</span></a></h2><p>还是和前面的几个章节一致，为了避免冲突，这里我们创建一个新的子模块，名为 spring6-ioc-reflect。</p><ul><li><strong>引入依赖</strong></li></ul><p>引入相关的依赖，即将依赖项写入到子模块中的 pom.xml 配置文件中。如果之前在父模块中引入了该依赖，则不用重复添加。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;!--junit5测试--&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;junit-jupiter-api&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;5.3.1&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建 UserDao</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface UserDao {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void print();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建UserDaoImpl实现</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class UserDaoImpl implements UserDao {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void print() {</span></span>
<span class="line"><span>        System.out.println(&quot;Dao层执行结束&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建UserService接口</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void out();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建UserServiceImpl实现类</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Bean</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//    private UserDao userDao;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void out() {</span></span>
<span class="line"><span>        //userDao.print();</span></span>
<span class="line"><span>        System.out.println(&quot;Service层执行结束&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>定义注解</p><ul><li>bean注解</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Target(ElementType.TYPE)</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>public @interface Bean {</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>依赖注入DI注解</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Target({ElementType.FIELD})</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>public @interface Di {</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><blockquote><p>说明：上面两个注解可以随意取名</p></blockquote><ul><li>定义容器接口</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface ApplicationContext {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Object getBean(Class clazz);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>定义容器接口实现类</p></li><li><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class AnnotationApplicationContext implements ApplicationContext {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //存储bean的容器</span></span>
<span class="line"><span>    private HashMap&lt;Class, Object&gt; beanFactory = new HashMap&lt;&gt;();</span></span>
<span class="line"><span>    private static String rootPath;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object getBean(Class clazz) {</span></span>
<span class="line"><span>        return beanFactory.get(clazz);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 根据包扫描加载bean</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @param basePackage</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public AnnotationApplicationContext(String basePackage) {</span></span>
<span class="line"><span>        // 这里要注意的是如果在 linux 或 mac 平台下，文件的绝对路径使用的是 / 斜杠</span></span>
<span class="line"><span>        // 而 windows 平台下是 反斜杠 \\</span></span>
<span class="line"><span>        // 如果使用的错误的符号，那么就会导致 dirs 为空</span></span>
<span class="line"><span>        // windows 使用这个</span></span>
<span class="line"><span>        // String packageDirName = basePackage.replaceAll(&quot;\\\\.&quot;, &quot;\\\\\\\\&quot;);</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            String packageDirName = basePackage.replaceAll(&quot;\\\\.&quot;, &quot;/&quot;);</span></span>
<span class="line"><span>            Enumeration&lt;URL&gt; dirs = Thread.currentThread().getContextClassLoader().getResources(packageDirName);</span></span>
<span class="line"><span>            while (dirs.hasMoreElements()) {</span></span>
<span class="line"><span>                URL url = dirs.nextElement();</span></span>
<span class="line"><span>                String filePath = URLDecoder.decode(url.getFile(), StandardCharsets.UTF_8);</span></span>
<span class="line"><span>                rootPath = filePath.substring(0, filePath.length() - packageDirName.length());</span></span>
<span class="line"><span>                loadBean(new File(filePath));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            throw new RuntimeException(e);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //依赖注入</span></span>
<span class="line"><span>        loadDi();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private void loadBean(File fileParent) {</span></span>
<span class="line"><span>        if (fileParent.isDirectory()) {</span></span>
<span class="line"><span>            File[] childrenFiles = fileParent.listFiles();</span></span>
<span class="line"><span>            if (childrenFiles == null || childrenFiles.length == 0) {</span></span>
<span class="line"><span>                return;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            for (File child : childrenFiles) {</span></span>
<span class="line"><span>                if (child.isDirectory()) {</span></span>
<span class="line"><span>                    //如果是个文件夹就继续调用该方法,使用了递归</span></span>
<span class="line"><span>                    loadBean(child);</span></span>
<span class="line"><span>                } else {</span></span>
<span class="line"><span>                    //通过文件路径转变成全类名,第一步把绝对路径部分去掉</span></span>
<span class="line"><span>                    String pathWithClass = child.getAbsolutePath().substring(rootPath.length() - 1);</span></span>
<span class="line"><span>                    //选中class文件</span></span>
<span class="line"><span>                    if (pathWithClass.contains(&quot;.class&quot;)) {</span></span>
<span class="line"><span>                        //    com.codermast.dao.UserDao</span></span>
<span class="line"><span>                        //去掉.class后缀，并且把 \\ 替换成 .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        // 这里和上面同理，还是 windows 和 linux Mac 平台下的文件路径分隔符不一致的问题</span></span>
<span class="line"><span>                        // String fullName = pathWithClass.replaceAll(&quot;\\\\\\\\&quot;, &quot;.&quot;).replace(&quot;.class&quot;, &quot;&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                        String fullName = pathWithClass.replaceAll(&quot;/&quot;, &quot;.&quot;).replace(&quot;.class&quot;, &quot;&quot;).substring(1);</span></span>
<span class="line"><span>                        try {</span></span>
<span class="line"><span>                            Class&lt;?&gt; aClass = Class.forName(fullName);</span></span>
<span class="line"><span>                            //把非接口的类实例化放在map中</span></span>
<span class="line"><span>                            if (!aClass.isInterface()) {</span></span>
<span class="line"><span>                                Bean annotation = aClass.getAnnotation(Bean.class);</span></span>
<span class="line"><span>                                if (annotation != null) {</span></span>
<span class="line"><span>                                    Object instance = aClass.newInstance();</span></span>
<span class="line"><span>                                    //判断一下有没有接口</span></span>
<span class="line"><span>                                    if (aClass.getInterfaces().length &gt; 0) {</span></span>
<span class="line"><span>                                        //如果有接口把接口的class当成key，实例对象当成value</span></span>
<span class="line"><span>                                        System.out.println(&quot;正在加载【&quot; + aClass.getInterfaces()[0] + &quot;】,实例对象是：&quot; + instance.getClass().getName());</span></span>
<span class="line"><span>                                        beanFactory.put(aClass.getInterfaces()[0], instance);</span></span>
<span class="line"><span>                                    } else {</span></span>
<span class="line"><span>                                        //如果有接口把自己的class当成key，实例对象当成value</span></span>
<span class="line"><span>                                        System.out.println(&quot;正在加载【&quot; + aClass.getName() + &quot;】,实例对象是：&quot; + instance.getClass().getName());</span></span>
<span class="line"><span>                                        beanFactory.put(aClass, instance);</span></span>
<span class="line"><span>                                    }</span></span>
<span class="line"><span>                                }</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        } catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {</span></span>
<span class="line"><span>                            e.printStackTrace();</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private void loadDi() {</span></span>
<span class="line"><span>        for (Map.Entry&lt;Class, Object&gt; entry : beanFactory.entrySet()) {</span></span>
<span class="line"><span>            //就是咱们放在容器的对象</span></span>
<span class="line"><span>            Object obj = entry.getValue();</span></span>
<span class="line"><span>            Class&lt;?&gt; aClass = obj.getClass();</span></span>
<span class="line"><span>            Field[] declaredFields = aClass.getDeclaredFields();</span></span>
<span class="line"><span>            for (Field field : declaredFields) {</span></span>
<span class="line"><span>                Di annotation = field.getAnnotation(Di.class);</span></span>
<span class="line"><span>                if (annotation != null) {</span></span>
<span class="line"><span>                    field.setAccessible(true);</span></span>
<span class="line"><span>                    try {</span></span>
<span class="line"><span>                        System.out.println(&quot;正在给【&quot; + obj.getClass().getName() + &quot;】属性【&quot; + field.getName() + &quot;】注入值【&quot; + beanFactory.get(field.getType()).getClass().getName() + &quot;】&quot;);</span></span>
<span class="line"><span>                        field.set(obj, beanFactory.get(field.getType()));</span></span>
<span class="line"><span>                    } catch (IllegalAccessException e) {</span></span>
<span class="line"><span>                        e.printStackTrace();</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>警告</p><p>在 <code>AnnotationApplicationContext</code> 的代码中，有涉及到文件的路径转换。需要注意 <code>Windows</code> 和 <code>Linux</code>、<code>Mac</code> 平台下的文件路径分隔符是不相同的。</p><ul><li><p><code>Windows</code> 下是 <code>\\</code>，反斜杠</p></li><li><p><code>Linux</code>、<code>Mac</code> 下是 <code>/</code>，斜杠 需要注意区分，否则容易造成无法反射和注入对应的类和对象，导致空指针异常。</p></li><li><p>对类进行@Bean注解标识</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Bean</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Bean</span></span>
<span class="line"><span>public class UserDaoImpl implements UserDao</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行测试</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Test</span></span>
<span class="line"><span>public void testIoc() {</span></span>
<span class="line"><span>    ApplicationContext applicationContext = new AnnotationApplicationContext(&quot;com.codermast.reflect&quot;);</span></span>
<span class="line"><span>    UserService userService = (UserService)applicationContext.getBean(UserService.class);</span></span>
<span class="line"><span>    userService.out();</span></span>
<span class="line"><span>    System.out.println(&quot;run success&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+'" alt="测试结果" tabindex="0" loading="lazy"><figcaption>测试结果</figcaption></figure>',30)]))}const r=n(p,[["render",c]]),v=JSON.parse('{"path":"/framework/spring/yyxlnugq/","title":"Spring原理手写IoC","lang":"zh-CN","frontmatter":{"title":"Spring原理手写IoC","createTime":"2025/08/27 11:40:32","permalink":"/framework/spring/yyxlnugq/"},"readingTime":{"minutes":3.35,"words":1005},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring原理手写IoC.md","headers":[]}');export{r as comp,v as data};
