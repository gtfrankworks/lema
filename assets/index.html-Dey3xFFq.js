import{a as n,c as a,b as i,o as e}from"./app-ZQgO6-gU.js";const l="/lema/images/spring6/2024-01-03-10-43-26-CQVnw0y1.png",p={};function d(r,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p>在开发中，我们经常遇到参数校验的需求，比如用户注册的时候，要校验用户名不能为空、用户名长度不超过20个字符、手机号是合法的手机号格式等等。如果使用普通方式，我们会把校验的代码和真正的业务处理逻辑耦合在一起，而且如果未来要新增一种校验逻辑也需要在修改多个地方。而spring validation允许通过注解的方式来定义对象校验规则，把校验和业务逻辑分离开，让代码编写更加方便。Spring Validation其实就是对Hibernate Validator进一步的封装，方便在Spring中使用。</p><p>在Spring中有多种校验的方式</p><p><strong>第一种是通过实现org.springframework.validation.Validator接口，然后在代码中调用这个类</strong></p><p><strong>第二种是按照Bean Validation方式来进行校验，即通过注解的方式。</strong></p><p><strong>第三种是基于方法实现校验</strong></p><p><strong>除此之外，还可以实现自定义校验</strong></p><h2 id="通过validator接口实现" tabindex="-1"><a class="header-anchor" href="#通过validator接口实现"><span>通过Validator接口实现]</span></a></h2><p><strong>第一步 创建子模块 spring6-validation</strong></p><p><strong>第二步 引入相关依赖</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>&lt;dependencies&gt;</span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.hibernate.validator&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;hibernate-validator&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;7.0.5.Final&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;dependency&gt;</span></span>
<span class="line"><span>        &lt;groupId&gt;org.glassfish&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;artifactId&gt;jakarta.el&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;version&gt;4.0.2&lt;/version&gt;</span></span>
<span class="line"><span>    &lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;/dependencies&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步 创建实体类，定义属性和方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>public class Person {</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getName() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setName(String name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public int getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setAge(int age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四步 创建类实现Validator接口，实现接口方法指定校验规则</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.validation.Errors;</span></span>
<span class="line"><span>import org.springframework.validation.ValidationUtils;</span></span>
<span class="line"><span>import org.springframework.validation.Validator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class PersonValidator implements Validator {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public boolean supports(Class&lt;?&gt; clazz) {</span></span>
<span class="line"><span>        return Person.class.equals(clazz);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void validate(Object object, Errors errors) {</span></span>
<span class="line"><span>        ValidationUtils.rejectIfEmpty(errors, &quot;name&quot;, &quot;name.empty&quot;);</span></span>
<span class="line"><span>        Person p = (Person) object;</span></span>
<span class="line"><span>        if (p.getAge() &lt; 0) {</span></span>
<span class="line"><span>            errors.rejectValue(&quot;age&quot;, &quot;error value &lt; 0&quot;);</span></span>
<span class="line"><span>        } else if (p.getAge() &gt; 110) {</span></span>
<span class="line"><span>            errors.rejectValue(&quot;age&quot;, &quot;error value too old&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面定义的类，其实就是实现接口中对应的方法，</p><p>supports方法用来表示此校验用在哪个类型上，</p><p>validate是设置校验逻辑的地点，其中ValidationUtils，是Spring封装的校验工具类，帮助快速实现校验。</p><p><strong>第五步 使用上述Validator进行测试</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.validation.BindingResult;</span></span>
<span class="line"><span>import org.springframework.validation.DataBinder;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class TestMethod1 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        //创建person对象</span></span>
<span class="line"><span>        Person person = new Person();</span></span>
<span class="line"><span>        person.setName(&quot;codermast&quot;);</span></span>
<span class="line"><span>        person.setAge(-1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建Person对应的DataBinder</span></span>
<span class="line"><span>        DataBinder binder = new DataBinder(person);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置校验</span></span>
<span class="line"><span>        binder.setValidator(new PersonValidator());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 由于Person对象中的属性为空，所以校验不通过</span></span>
<span class="line"><span>        binder.validate();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        //输出结果</span></span>
<span class="line"><span>        BindingResult results = binder.getBindingResult();</span></span>
<span class="line"><span>        System.out.println(results.getAllErrors());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+l+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="bean-validation注解实现" tabindex="-1"><a class="header-anchor" href="#bean-validation注解实现"><span>Bean Validation注解实现</span></a></h2><p>使用Bean Validation校验方式，就是如何将Bean Validation需要使用的javax.validation.ValidatorFactory 和javax.validation.Validator注入到容器中。spring默认有一个实现类LocalValidatorFactoryBean，它实现了上面Bean Validation中的接口，并且也实现了org.springframework.validation.Validator接口。</p><p><strong>第一步 创建配置类，配置LocalValidatorFactoryBean</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>@Configuration</span></span>
<span class="line"><span>@ComponentScan(&quot;com.codermast.spring&quot;)</span></span>
<span class="line"><span>public class ValidationConfig {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public LocalValidatorFactoryBean validator() {</span></span>
<span class="line"><span>        return new LocalValidatorFactoryBean();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步 创建实体类，使用注解定义校验规则</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import jakarta.validation.constraints.Max;</span></span>
<span class="line"><span>import jakarta.validation.constraints.Min;</span></span>
<span class="line"><span>import jakarta.validation.constraints.NotNull;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @NotNull</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Min(0)</span></span>
<span class="line"><span>    @Max(120)</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getName() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setName(String name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public int getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setAge(int age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常用注解说明</strong> @NotNull 限制必须不为null @NotEmpty 只作用于字符串类型，字符串不为空，并且长度不为0 @NotBlank 只作用于字符串类型，字符串不为空，并且trim()后不为空串 @DecimalMax(value) 限制必须为一个不大于指定值的数字 @DecimalMin(value) 限制必须为一个不小于指定值的数字 @Max(value) 限制必须为一个不大于指定值的数字 @Min(value) 限制必须为一个不小于指定值的数字 @Pattern(value) 限制必须符合指定的正则表达式 @Size(max,min) 限制字符长度必须在min到max之间 @Email 验证注解的元素值是Email，也可以通过正则表达式和flag指定自定义的email格式</p><p><strong>第三步 使用两种不同的校验器实现</strong></p><p><strong>（1）使用jakarta.validation.Validator校验</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import jakarta.validation.ConstraintViolation;</span></span>
<span class="line"><span>import jakarta.validation.Validator;</span></span>
<span class="line"><span>import org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span>import org.springframework.stereotype.Service;</span></span>
<span class="line"><span>import java.util.Set;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class MyService1 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private Validator validator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public  boolean validator(User user){</span></span>
<span class="line"><span>        Set&lt;ConstraintViolation&lt;User&gt;&gt; sets =  validator.validate(user);</span></span>
<span class="line"><span>        return sets.isEmpty();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）使用org.springframework.validation.Validator校验</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span>import org.springframework.stereotype.Service;</span></span>
<span class="line"><span>import org.springframework.validation.BindException;</span></span>
<span class="line"><span>import org.springframework.validation.Validator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class MyService2 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private Validator validator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public boolean validaPersonByValidator(User user) {</span></span>
<span class="line"><span>        BindException bindException = new BindException(user, user.getName());</span></span>
<span class="line"><span>        validator.validate(user, bindException);</span></span>
<span class="line"><span>        return bindException.hasErrors();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四步 测试</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.annotation.AnnotationConfigApplicationContext;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class TestMethod2 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testMyService1() {</span></span>
<span class="line"><span>        ApplicationContext context = new AnnotationConfigApplicationContext(ValidationConfig.class);</span></span>
<span class="line"><span>        MyService1 myService = context.getBean(MyService1.class);</span></span>
<span class="line"><span>        User user = new User();</span></span>
<span class="line"><span>        user.setAge(-1);</span></span>
<span class="line"><span>        boolean validator = myService.validator(user);</span></span>
<span class="line"><span>        System.out.println(validator);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testMyService2() {</span></span>
<span class="line"><span>        ApplicationContext context = new AnnotationConfigApplicationContext(ValidationConfig.class);</span></span>
<span class="line"><span>        MyService2 myService = context.getBean(MyService2.class);</span></span>
<span class="line"><span>        User user = new User();</span></span>
<span class="line"><span>        user.setName(&quot;lucy&quot;);</span></span>
<span class="line"><span>        user.setAge(130);</span></span>
<span class="line"><span>        user.setAge(-1);</span></span>
<span class="line"><span>        boolean validator = myService.validaPersonByValidator(user);</span></span>
<span class="line"><span>        System.out.println(validator);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于方法实现校验" tabindex="-1"><a class="header-anchor" href="#基于方法实现校验"><span>基于方法实现校验</span></a></h2><p><strong>第一步 创建配置类，配置MethodValidationPostProcessor</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.springframework.context.annotation.Bean;</span></span>
<span class="line"><span>import org.springframework.context.annotation.ComponentScan;</span></span>
<span class="line"><span>import org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span>import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;</span></span>
<span class="line"><span>import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>@ComponentScan(&quot;com.atguigu.spring6.validation.method3&quot;)</span></span>
<span class="line"><span>public class ValidationConfig {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public MethodValidationPostProcessor validationPostProcessor() {</span></span>
<span class="line"><span>        return new MethodValidationPostProcessor();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步 创建实体类，使用注解设置校验规则</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>package com.atguigu.spring6.validation.method3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import jakarta.validation.constraints.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @NotNull</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Min(0)</span></span>
<span class="line"><span>    @Max(120)</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Pattern(regexp = &quot;^1(3|4|5|7|8)\\\\d{9}$&quot;,message = &quot;手机号码格式错误&quot;)</span></span>
<span class="line"><span>    @NotBlank(message = &quot;手机号码不能为空&quot;)</span></span>
<span class="line"><span>    private String phone;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getName() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setName(String name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public int getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setAge(int age) {</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public String getPhone() {</span></span>
<span class="line"><span>        return phone;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public void setPhone(String phone) {</span></span>
<span class="line"><span>        this.phone = phone;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步 定义Service类，通过注解操作对象</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import jakarta.validation.Valid;</span></span>
<span class="line"><span>import jakarta.validation.constraints.NotNull;</span></span>
<span class="line"><span>import org.springframework.stereotype.Service;</span></span>
<span class="line"><span>import org.springframework.validation.annotation.Validated;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>@Validated</span></span>
<span class="line"><span>public class MyService {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    public String testParams(@NotNull @Valid User user) {</span></span>
<span class="line"><span>        return user.toString();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四步 测试</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import org.junit.jupiter.api.Test;</span></span>
<span class="line"><span>import org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span>import org.springframework.context.annotation.AnnotationConfigApplicationContext;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class TestMethod3 {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testMyService1() {</span></span>
<span class="line"><span>        ApplicationContext context = new AnnotationConfigApplicationContext(ValidationConfig.class);</span></span>
<span class="line"><span>        MyService myService = context.getBean(MyService.class);</span></span>
<span class="line"><span>        User user = new User();</span></span>
<span class="line"><span>        user.setAge(-1);</span></span>
<span class="line"><span>        myService.testParams(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现自定义校验" tabindex="-1"><a class="header-anchor" href="#实现自定义校验"><span>实现自定义校验</span></a></h2><p><strong>第一步 自定义校验注解</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import jakarta.validation.Constraint;</span></span>
<span class="line"><span>import jakarta.validation.Payload;</span></span>
<span class="line"><span>import java.lang.annotation.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER})</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Documented</span></span>
<span class="line"><span>@Constraint(validatedBy = {CannotBlankValidator.class})</span></span>
<span class="line"><span>public @interface CannotBlank {</span></span>
<span class="line"><span>    //默认错误消息</span></span>
<span class="line"><span>    String message() default &quot;不能包含空格&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //分组</span></span>
<span class="line"><span>    Class&lt;?&gt;[] groups() default {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //负载</span></span>
<span class="line"><span>    Class&lt;? extends Payload&gt;[] payload() default {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //指定多个时使用</span></span>
<span class="line"><span>    @Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})</span></span>
<span class="line"><span>    @Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>    @Documented</span></span>
<span class="line"><span>    @interface List {</span></span>
<span class="line"><span>        CannotBlank[] value();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步 编写真正的校验类</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-"><span class="line"><span>import jakarta.validation.ConstraintValidator;</span></span>
<span class="line"><span>import jakarta.validation.ConstraintValidatorContext;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class CannotBlankValidator implements ConstraintValidator&lt;CannotBlank, String&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public void initialize(CannotBlank constraintAnnotation) {</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public boolean isValid(String value, ConstraintValidatorContext context) {</span></span>
<span class="line"><span>                //null时不进行校验</span></span>
<span class="line"><span>                if (value != null &amp;&amp; value.contains(&quot; &quot;)) {</span></span>
<span class="line"><span>                        //获取默认提示信息</span></span>
<span class="line"><span>                        String defaultConstraintMessageTemplate = context.getDefaultConstraintMessageTemplate();</span></span>
<span class="line"><span>                        System.out.println(&quot;default message :&quot; + defaultConstraintMessageTemplate);</span></span>
<span class="line"><span>                        //禁用默认提示信息</span></span>
<span class="line"><span>                        context.disableDefaultConstraintViolation();</span></span>
<span class="line"><span>                        //设置提示语</span></span>
<span class="line"><span>                        context.buildConstraintViolationWithTemplate(&quot;can not contains blank&quot;).addConstraintViolation();</span></span>
<span class="line"><span>                        return false;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48)]))}const c=n(p,[["render",d]]),v=JSON.parse('{"path":"/framework/spring/uov8wwng/","title":"Spring的数据校验","lang":"zh-CN","frontmatter":{"title":"Spring的数据校验","createTime":"2025/08/27 12:31:28","permalink":"/framework/spring/uov8wwng/"},"readingTime":{"minutes":5.09,"words":1526},"git":{"createdTime":1756736713000},"filePathRelative":"notes/framework/spring/Spring的数据校验.md","headers":[]}');export{c as comp,v as data};
