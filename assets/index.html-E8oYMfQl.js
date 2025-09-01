import{a as n,c as a,b as e,o as i}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2024-01-02-11-18-08-Bc1JNhr1.png",p="/lema/images/spring6/2024-01-02-11-24-46-Dn-Trr5u.png",r="/lema/images/spring6/2024-01-03-10-06-35-C_25jxwD.png",t="/lema/images/spring6/2024-01-03-10-08-10-CFXUlZZ8.png",c="/lema/images/spring6/2024-01-03-10-08-41-Dii3sOKB.png",d="/lema/images/spring6/2024-01-03-10-11-28-Blb0wc69.png",o="/lema/images/spring6/2024-01-03-10-13-17-B9ceC48_.png",u={};function v(m,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="resources概述" tabindex="-1"><a class="header-anchor" href="#resources概述"><span>Resources概述</span></a></h2><p>Java的标准java.net.URL类和各种URL前缀的标准处理程序无法满足所有对low-level资源的访问，比如：没有标准化的 URL 实现可用于访问需要从类路径或相对于 ServletContext 获取的资源。并且缺少某些Spring所需要的功能，例如检测某资源是否存在等。<strong>而Spring的Resource声明了访问low-level资源的能力。</strong></p><h2 id="resource接口" tabindex="-1"><a class="header-anchor" href="#resource接口"><span>Resource接口</span></a></h2><p>Spring 的 Resource 接口位于 <a href="http://org.springframework.core.io/" target="_blank" rel="noopener noreferrer">org.springframework.core.io</a> 中。 旨在成为一个更强大的接口，用于抽象对低级资源的访问。以下显示了Resource接口定义的方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface Resource extends InputStreamSource {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean exists();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean isReadable();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean isOpen();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    boolean isFile();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    URL getURL() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    URI getURI() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    File getFile() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ReadableByteChannel readableChannel() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    long contentLength() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    long lastModified() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Resource createRelative(String relativePath) throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    String getFilename();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    String getDescription();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Resource接口继承了InputStreamSource接口，提供了很多InputStreamSource所没有的方法。InputStreamSource接口，只有一个方法：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public interface InputStreamSource {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    InputStream getInputStream() throws IOException;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其中一些重要的方法：</strong></p><p>getInputStream(): 找到并打开资源，返回一个InputStream以从资源中读取。预计每次调用都会返回一个新的InputStream()，调用者有责任关闭每个流 exists(): 返回一个布尔值，表明某个资源是否以物理形式存在 isOpen: 返回一个布尔值，指示此资源是否具有开放流的句柄。如果为true，InputStream就不能够多次读取，只能够读取一次并且及时关闭以避免内存泄漏。对于所有常规资源实现，返回false，但是InputStreamResource除外。 getDescription(): 返回资源的描述，用来输出错误的日志。这通常是完全限定的文件名或资源的实际URL。</p><p><strong>其他方法：</strong></p><p>isReadable(): 表明资源的目录读取是否通过getInputStream()进行读取。 isFile(): 表明这个资源是否代表了一个文件系统的文件。 getURL(): 返回一个URL句柄，如果资源不能够被解析为URL，将抛出IOException getURI(): 返回一个资源的URI句柄 getFile(): 返回某个文件，如果资源不能够被解析称为绝对路径，将会抛出FileNotFoundException lastModified(): 资源最后一次修改的时间戳 createRelative(): 创建此资源的相关资源 getFilename(): 资源的文件名是什么 例如：最后一部分的文件名 myfile.txt</p><h2 id="resource的实现类" tabindex="-1"><a class="header-anchor" href="#resource的实现类"><span>Resource的实现类</span></a></h2><p>Resource 接口是 Spring 资源访问策略的抽象，它本身并不提供任何资源访问实现，具体的资源访问由该接口的实现类完成——每个实现类代表一种资源访问策略。Resource一般包括这些实现类：UrlResource、ClassPathResource、FileSystemResource、ServletContextResource、InputStreamResource、ByteArrayResource</p><h3 id="urlresource访问网络资源" tabindex="-1"><a class="header-anchor" href="#urlresource访问网络资源"><span>UrlResource访问网络资源</span></a></h3><p>Resource的一个实现类，用来访问网络资源，它支持URL的绝对路径。</p><p>http:------该前缀用于访问基于HTTP协议的网络资源。</p><p>ftp:------该前缀用于访问基于FTP协议的网络资源</p><p>file: ------该前缀用于从文件系统中读取资源</p><p><strong>实验：访问基于HTTP协议的网络资源</strong></p><p><strong>创建一个maven子模块spring6-resources，配置Spring依赖（参考前面）</strong></p><figure><img src="`+l+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.core.io.UrlResource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class UrlResourcesDemo {</span></span>
<span class="line"><span>    public static void loadAndReadUrlResource(String path){</span></span>
<span class="line"><span>        // 创建一个 Resource 对象</span></span>
<span class="line"><span>        UrlResource url = null;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            url = new UrlResource(path);</span></span>
<span class="line"><span>            // 获取资源名</span></span>
<span class="line"><span>            System.out.println(url.getFilename());</span></span>
<span class="line"><span>            System.out.println(url.getURI());</span></span>
<span class="line"><span>            // 获取资源描述</span></span>
<span class="line"><span>            System.out.println(url.getDescription());</span></span>
<span class="line"><span>            //获取资源内容</span></span>
<span class="line"><span>            System.out.println(url.getInputStream().read());</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            throw new RuntimeException(e);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        //访问网络资源</span></span>
<span class="line"><span>        loadAndReadUrlResource(&quot;https://www.codermast.com&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实验二：在项目根路径下创建文件，从文件系统中读取资源</strong></p><p>方法不变，修改调用传递路径</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    //1 访问网络资源</span></span>
<span class="line"><span>	//loadAndReadUrlResource(&quot;http://www..com&quot;);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //2 访问文件系统资源</span></span>
<span class="line"><span>    loadAndReadUrlResource(&quot;file:codermast.txt&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="classpathresource-访问类路径下资源" tabindex="-1"><a class="header-anchor" href="#classpathresource-访问类路径下资源"><span>ClassPathResource 访问类路径下资源</span></a></h3><p>ClassPathResource 用来访问类加载路径下的资源，相对于其他的 Resource 实现类，其主要优势是方便访问类加载路径里的资源，尤其对于 Web 应用，ClassPathResource 可自动搜索位于 classes 下的资源文件，无须使用绝对路径访问。</p><p><strong>实验：在类路径下创建文件codermast.txt，使用ClassPathResource 访问</strong></p><figure><img src="`+p+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.core.io.ClassPathResource;</span></span>
<span class="line"><span>import java.io.InputStream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class ClassPathResourceDemo {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void loadAndReadUrlResource(String path) throws Exception{</span></span>
<span class="line"><span>        // 创建一个 Resource 对象</span></span>
<span class="line"><span>        ClassPathResource resource = new ClassPathResource(path);</span></span>
<span class="line"><span>        // 获取文件名</span></span>
<span class="line"><span>        System.out.println(&quot;resource.getFileName = &quot; + resource.getFilename());</span></span>
<span class="line"><span>        // 获取文件描述</span></span>
<span class="line"><span>        System.out.println(&quot;resource.getDescription = &quot;+ resource.getDescription());</span></span>
<span class="line"><span>        //获取文件内容</span></span>
<span class="line"><span>        InputStream in = resource.getInputStream();</span></span>
<span class="line"><span>        byte[] b = new byte[1024];</span></span>
<span class="line"><span>        while(in.read(b)!=-1) {</span></span>
<span class="line"><span>            System.out.println(new String(b));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>        loadAndReadUrlResource(&quot;codermast.txt&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ClassPathResource实例可使用ClassPathResource构造器显式地创建，但更多的时候它都是隐式地创建的。当执行Spring的某个方法时，该方法接受一个代表资源路径的字符串参数，当Spring识别该字符串参数中包含classpath:前缀后，系统会自动创建ClassPathResource对象。</p><h3 id="filesystemresource-访问文件系统资源" tabindex="-1"><a class="header-anchor" href="#filesystemresource-访问文件系统资源"><span>FileSystemResource 访问文件系统资源</span></a></h3><p>Spring 提供的 FileSystemResource 类用于访问文件系统资源，使用 FileSystemResource 来访问文件系统资源并没有太大的优势，因为 Java 提供的 File 类也可用于访问文件系统资源。</p><p><strong>实验：使用FileSystemResource 访问文件系统资源</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.core.io.FileSystemResource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import java.io.InputStream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class FileSystemResourceDemo {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void loadAndReadUrlResource(String path) throws Exception{</span></span>
<span class="line"><span>        //相对路径</span></span>
<span class="line"><span>        FileSystemResource resource = new FileSystemResource(&quot;atguigu.txt&quot;);</span></span>
<span class="line"><span>        //绝对路径</span></span>
<span class="line"><span>        //FileSystemResource resource = new FileSystemResource(&quot;C:\\\\atguigu.txt&quot;);</span></span>
<span class="line"><span>        // 获取文件名</span></span>
<span class="line"><span>        System.out.println(&quot;resource.getFileName = &quot; + resource.getFilename());</span></span>
<span class="line"><span>        // 获取文件描述</span></span>
<span class="line"><span>        System.out.println(&quot;resource.getDescription = &quot;+ resource.getDescription());</span></span>
<span class="line"><span>        //获取文件内容</span></span>
<span class="line"><span>        InputStream in = resource.getInputStream();</span></span>
<span class="line"><span>        byte[] b = new byte[1024];</span></span>
<span class="line"><span>        while(in.read(b)!=-1) {</span></span>
<span class="line"><span>            System.out.println(new String(b));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>        loadAndReadUrlResource(&quot;atguigu.txt&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FileSystemResource实例可使用FileSystemResource构造器显示地创建，但更多的时候它都是隐式创建。执行Spring的某个方法时，该方法接受一个代表资源路径的字符串参数，当Spring识别该字符串参数中包含file:前缀后，系统将会自动创建FileSystemResource对象。</p><h3 id="servletcontextresource" tabindex="-1"><a class="header-anchor" href="#servletcontextresource"><span>ServletContextResource</span></a></h3><p>这是ServletContext资源的Resource实现，它解释相关Web应用程序根目录中的相对路径。它始终支持流(stream)访问和URL访问，但只有在扩展Web应用程序存档且资源实际位于文件系统上时才允许java.io.File访问。无论它是在文件系统上扩展还是直接从JAR或其他地方（如数据库）访问，实际上都依赖于Servlet容器。</p><h3 id="inputstreamresource" tabindex="-1"><a class="header-anchor" href="#inputstreamresource"><span>InputStreamResource</span></a></h3><p>InputStreamResource 是给定的输入流(InputStream)的Resource实现。它的使用场景在没有特定的资源实现的时候使用(感觉和@Component 的适用场景很相似)。与其他Resource实现相比，这是已打开资源的描述符。 因此，它的isOpen()方法返回true。如果需要将资源描述符保留在某处或者需要多次读取流，请不要使用它。</p><h3 id="bytearrayresource" tabindex="-1"><a class="header-anchor" href="#bytearrayresource"><span>ByteArrayResource</span></a></h3><p>字节数组的Resource实现类。通过给定的数组创建了一个ByteArrayInputStream。它对于从任何给定的字节数组加载内容非常有用，而无需求助于单次使用的InputStreamResource。</p><h2 id="resource类图" tabindex="-1"><a class="header-anchor" href="#resource类图"><span>Resource类图</span></a></h2><p>上述Resource实现类与Resource顶级接口之间的关系可以用下面的UML关系模型来表示</p><figure><img src="`+r+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="resourceloader-接口" tabindex="-1"><a class="header-anchor" href="#resourceloader-接口"><span>ResourceLoader 接口</span></a></h2><p>Spring 提供如下两个标志性接口：</p><p><strong>（1）ResourceLoader ：</strong> 该接口实现类的实例可以获得一个Resource实例。</p><p><strong>（2） ResourceLoaderAware ：</strong> 该接口实现类的实例将获得一个ResourceLoader的引用。</p><p>在ResourceLoader接口里有如下方法：</p><p>（1）<strong>Resource getResource（String location）</strong> ： 该接口仅有这个方法，用于返回一个Resource实例。ApplicationContext实现类都实现ResourceLoader接口，因此ApplicationContext可直接获取Resource实例。</p><h3 id="使用演示" tabindex="-1"><a class="header-anchor" href="#使用演示"><span>使用演示</span></a></h3><p><strong>实验一：ClassPathXmlApplicationContext获取Resource实例</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"><span>import org.springframework.core.io.Resource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Demo1 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        ApplicationContext ctx = new ClassPathXmlApplicationContext();</span></span>
<span class="line"><span>//        通过ApplicationContext访问资源</span></span>
<span class="line"><span>//        ApplicationContext实例获取Resource实例时，</span></span>
<span class="line"><span>//        默认采用与ApplicationContext相同的资源访问策略</span></span>
<span class="line"><span>        Resource res = ctx.getResource(&quot;codermast.txt&quot;);</span></span>
<span class="line"><span>        System.out.println(res.getFilename());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+t+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>实验二：FileSystemApplicationContext获取Resource实例</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.FileSystemXmlApplicationContext;</span></span>
<span class="line"><span>import org.springframework.core.io.Resource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Demo2 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        ApplicationContext ctx = new FileSystemXmlApplicationContext();</span></span>
<span class="line"><span>        Resource res = ctx.getResource(&quot;codermast.txt&quot;);</span></span>
<span class="line"><span>        System.out.println(res.getFilename());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+c+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="resourceloader-总结" tabindex="-1"><a class="header-anchor" href="#resourceloader-总结"><span>ResourceLoader 总结</span></a></h3><p>Spring将采用和ApplicationContext相同的策略来访问资源。也就是说，如果ApplicationContext是FileSystemXmlApplicationContext，res就是FileSystemResource实例；如果ApplicationContext是ClassPathXmlApplicationContext，res就是ClassPathResource实例</p><p>当Spring应用需要进行资源访问时，实际上并不需要直接使用Resource实现类，而是调用ResourceLoader实例的getResource()方法来获得资源，ReosurceLoader将会负责选择Reosurce实现类，也就是确定具体的资源访问策略，从而将应用程序和具体的资源访问策略分离开来</p><p>另外，使用ApplicationContext访问资源时，可通过不同前缀指定强制使用指定的ClassPathResource、FileSystemResource等实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>Resource res = ctx.getResource(&quot;calsspath:bean.xml&quot;);</span></span>
<span class="line"><span>Resrouce res = ctx.getResource(&quot;file:bean.xml&quot;);</span></span>
<span class="line"><span>Resource res = ctx.getResource(&quot;http://localhost:8080/beans.xml&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="resourceloaderaware-接口" tabindex="-1"><a class="header-anchor" href="#resourceloaderaware-接口"><span>ResourceLoaderAware 接口</span></a></h2><p>ResourceLoaderAware接口实现类的实例将获得一个ResourceLoader的引用，ResourceLoaderAware接口也提供了一个setResourceLoader()方法，该方法将由Spring容器负责调用，Spring容器会将一个ResourceLoader对象作为该方法的参数传入。</p><p>如果把实现ResourceLoaderAware接口的Bean类部署在Spring容器中，Spring容器会将自身当成ResourceLoader作为setResourceLoader()方法的参数传入。由于ApplicationContext的实现类都实现了ResourceLoader接口，Spring容器自身完全可作为ResorceLoader使用。</p><p><strong>实验：演示ResourceLoaderAware使用</strong></p><p><strong>第一步 创建类，实现ResourceLoaderAware接口</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ResourceLoaderAware;</span></span>
<span class="line"><span>import org.springframework.core.io.ResourceLoader;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class TestBean implements ResourceLoaderAware {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private ResourceLoader resourceLoader;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //实现ResourceLoaderAware接口必须实现的方法</span></span>
<span class="line"><span>	//如果把该Bean部署在Spring容器中，该方法将会有Spring容器负责调用。</span></span>
<span class="line"><span>	//SPring容器调用该方法时，Spring会将自身作为参数传给该方法。</span></span>
<span class="line"><span>    public void setResourceLoader(ResourceLoader resourceLoader) {</span></span>
<span class="line"><span>        this.resourceLoader = resourceLoader;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //返回ResourceLoader对象的应用</span></span>
<span class="line"><span>    public ResourceLoader getResourceLoader(){</span></span>
<span class="line"><span>        return this.resourceLoader;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步 创建bean.xml文件，配置TestBean</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;bean id=&quot;testBean&quot; class=&quot;com.codermast.spring.TestBean&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步 测试</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"><span>import org.springframework.core.io.Resource;</span></span>
<span class="line"><span>import org.springframework.core.io.ResourceLoader;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Demo3 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        //Spring容器会将一个ResourceLoader对象作为该方法的参数传入</span></span>
<span class="line"><span>        ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span>
<span class="line"><span>        TestBean testBean = ctx.getBean(&quot;testBean&quot;,TestBean.class);</span></span>
<span class="line"><span>        //获取ResourceLoader对象</span></span>
<span class="line"><span>        ResourceLoader resourceLoader = testBean.getResourceLoader();</span></span>
<span class="line"><span>        System.out.println(&quot;Spring容器将自身注入到ResourceLoaderAware Bean 中 ？ ：&quot; + (resourceLoader == ctx));</span></span>
<span class="line"><span>        //加载其他资源</span></span>
<span class="line"><span>        Resource resource = resourceLoader.getResource(&quot;codermast.txt&quot;);</span></span>
<span class="line"><span>        System.out.println(resource.getFilename());</span></span>
<span class="line"><span>        System.out.println(resource.getDescription());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+d+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="使用resource-作为属性" tabindex="-1"><a class="header-anchor" href="#使用resource-作为属性"><span>使用Resource 作为属性</span></a></h2><p>前面介绍了 Spring 提供的资源访问策略，但这些依赖访问策略要么需要使用 Resource 实现类，要么需要使用 ApplicationContext 来获取资源。实际上，当应用程序中的 Bean 实例需要访问资源时，Spring 有更好的解决方法：直接利用依赖注入。从这个意义上来看，Spring 框架不仅充分利用了策略模式来简化资源访问，而且还将策略模式和 IoC 进行充分地结合，最大程度地简化了 Spring 资源访问。</p><p>归纳起来，<strong>如果 Bean 实例需要访问资源，有如下两种解决方案：</strong></p><ul><li><strong>代码中获取 Resource 实例。</strong></li><li><strong>使用依赖注入。</strong></li></ul><p>对于第一种方式，当程序获取 Resource 实例时，总需要提供 Resource 所在的位置，不管通过 FileSystemResource 创建实例，还是通过 ClassPathResource 创建实例，或者通过 ApplicationContext 的 getResource() 方法获取实例，都需要提供资源位置。这意味着：资源所在的物理位置将被耦合到代码中，如果资源位置发生改变，则必须改写程序。因此，通常建议采用第二种方法，让 Spring 为 Bean 实例<strong>依赖注入</strong>资源。</p><p><strong>实验：让Spring为Bean实例依赖注入资源</strong></p><p><strong>第一步 创建依赖注入类，定义属性和方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.core.io.Resource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class ResourceBean {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    private Resource res;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public void setRes(Resource res) {</span></span>
<span class="line"><span>        this.res = res;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public Resource getRes() {</span></span>
<span class="line"><span>        return res;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public void parse(){</span></span>
<span class="line"><span>        System.out.println(res.getFilename());</span></span>
<span class="line"><span>        System.out.println(res.getDescription());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步 创建spring配置文件，配置依赖注入</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;bean id=&quot;resourceBean&quot; class=&quot;com.codermast.spring.ResourceBean&quot; &gt;</span></span>
<span class="line"><span>    &lt;!-- 可以使用file:、http:、ftp:等前缀强制Spring采用对应的资源访问策略 --&gt;</span></span>
<span class="line"><span>    &lt;!-- 如果不采用任何前缀，则Spring将采用与该ApplicationContext相同的资源访问策略来访问资源 --&gt;</span></span>
<span class="line"><span>    &lt;property name=&quot;res&quot; value=&quot;classpath:codermast.txt&quot;/&gt;</span></span>
<span class="line"><span>&lt;/bean&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步 测试</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Demo4 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        ApplicationContext ctx =</span></span>
<span class="line"><span>                new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span>
<span class="line"><span>        ResourceBean resourceBean = ctx.getBean(&quot;resourceBean&quot;,ResourceBean.class);</span></span>
<span class="line"><span>        resourceBean.parse();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+o+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="应用程序上下文和资源路径" tabindex="-1"><a class="header-anchor" href="#应用程序上下文和资源路径"><span>应用程序上下文和资源路径</span></a></h2><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3><p>不管以怎样的方式创建ApplicationContext实例，都需要为ApplicationContext指定配置文件，Spring允许使用一份或多分XML配置文件。当程序创建ApplicationContext实例时，通常也是以Resource的方式来访问配置文件的，所以ApplicationContext完全支持ClassPathResource、FileSystemResource、ServletContextResource等资源访问方式。</p><p><strong>ApplicationContext确定资源访问策略通常有两种方法：</strong></p><p><strong>（1）使用ApplicationContext实现类指定访问策略。</strong></p><p><strong>（2）使用前缀指定访问策略。</strong></p><h3 id="applicationcontext实现类指定访问策略" tabindex="-1"><a class="header-anchor" href="#applicationcontext实现类指定访问策略"><span>ApplicationContext实现类指定访问策略</span></a></h3><p>创建ApplicationContext对象时，通常可以使用如下实现类：</p><p>（1） ClassPathXMLApplicationContext : 对应使用ClassPathResource进行资源访问。</p><p>（2）FileSystemXmlApplicationContext ： 对应使用FileSystemResource进行资源访问。</p><p>（3）XmlWebApplicationContext ： 对应使用ServletContextResource进行资源访问。</p><p>当使用ApplicationContext的不同实现类时，就意味着Spring使用响应的资源访问策略。</p><p>效果前面已经演示</p><h3 id="使用前缀指定访问策略" tabindex="-1"><a class="header-anchor" href="#使用前缀指定访问策略"><span>使用前缀指定访问策略</span></a></h3><p><strong>实验一：classpath前缀使用</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.support.FileSystemXmlApplicationContext;</span></span>
<span class="line"><span>import org.springframework.core.io.Resource;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Demo1 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        /*</span></span>
<span class="line"><span>         * 通过搜索文件系统路径下的xml文件创建ApplicationContext，</span></span>
<span class="line"><span>         * 但通过指定classpath:前缀强制搜索类加载路径</span></span>
<span class="line"><span>         * classpath:bean.xml</span></span>
<span class="line"><span>         * */</span></span>
<span class="line"><span>        ApplicationContext ctx =</span></span>
<span class="line"><span>                new ClassPathXmlApplicationContext(&quot;classpath:beans.xml&quot;);</span></span>
<span class="line"><span>        System.out.println(ctx);</span></span>
<span class="line"><span>        Resource resource = ctx.getResource(&quot;codermast.txt&quot;);</span></span>
<span class="line"><span>        System.out.println(resource.getFilename());</span></span>
<span class="line"><span>        System.out.println(resource.getDescription());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实验二：classpath通配符使用</strong></p><p>classpath * :前缀提供了加载多个XML配置文件的能力，当使用classpath*:前缀来指定XML配置文件时，系统将搜索类加载路径，找到所有与文件名匹配的文件，分别加载文件中的配置定义，最后合并成一个ApplicationContext。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;classpath*:beans.xml&quot;);</span></span>
<span class="line"><span>System.out.println(ctx);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用classpath * :前缀时，Spring将会搜索类加载路径下所有满足该规则的配置文件。</p><p>如果不是采用classpath * :前缀，而是改为使用classpath:前缀，Spring则只加载第一个符合条件的XML文件</p><p><strong>注意 ：</strong></p><p>classpath * : 前缀仅对ApplicationContext有效。实际情况是，创建ApplicationContext时，分别访问多个配置文件(通过ClassLoader的getResource方法实现)。因此，classpath * :前缀不可用于Resource。</p><p><strong>使用三：通配符其他使用</strong></p><p>一次性加载多个配置文件的方式：指定配置文件时使用通配符</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;classpath:bean*.xml&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Spring允许将classpath*:前缀和通配符结合使用：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>ApplicationContext ctx = new ClassPathXmlApplicationContext(&quot;classpath*:bean*.xml&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,115)]))}const h=n(u,[["render",v]]),b=JSON.parse('{"path":"/framework/spring/u964mmo9/","title":"Spring资源操作","lang":"zh-CN","frontmatter":{"title":"Spring资源操作","createTime":"2025/08/27 12:22:03","permalink":"/framework/spring/u964mmo9/"},"readingTime":{"minutes":12.26,"words":3677},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring资源操作.md","headers":[]}');export{h as comp,b as data};
