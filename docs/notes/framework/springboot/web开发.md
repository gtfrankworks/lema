---
title: Springboot的web开发
createTime: 2025/08/27 16:42:41
permalink: /framework/springboot/a3z6kb0r/
---
# web开发

## 1.web场景

### 1.1.自动配置

1、整合web场景

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

2、引入了 `autoconfigure`功能

```
spring-boot-starter-web->spring-boot-starter->spring-boot-autoconfigure
```

3、`@EnableAutoConfiguration`注解使用`@Import(AutoConfigurationImportSelector.class)`批量导入组件

4、加载 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 文件中配置的所有组件

5、所有自动配置类如下

```java
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration
====以下是响应式web场景和现在的没关系======
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.ReactiveMultipartAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.WebSessionIdResolverAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorAutoConfiguration
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration
================以上没关系=================
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
```

6、绑定了配置文件的一堆配置项

- 1、SpringMVC的所有配置 `spring.mvc`
- 2、Web场景通用配置 `spring.web`
- 3、文件上传配置 `spring.servlet.multipart`
- 4、服务器的配置 `server`: 比如：编码方式

### 1.2.默认效果

默认配置：

1. 包含了 ContentNegotiatingViewResolver 和 BeanNameViewResolver 组件，**方便视图解析**
2. **默认的静态资源处理机制**： 静态资源放在 static 文件夹下即可直接访问
3. **自动注册**了 **Converter**,GenericConverter,**Formatter**组件，适配常见**数据类型转换**和**格式化需求**
4. **支持** **HttpMessageConverters**，可以**方便返回**json等**数据类型**
5. **注册** MessageCodesResolver，方便**国际化**及错误消息处理
6. **支持 静态** index.html
7. **自动使用**ConfigurableWebBindingInitializer，实现消息处理、数据绑定、类型转化、数据校验等功能

**重要：**

- *如果想保持* ***boot mvc 的默认配置\****，并且自定义更多的 mvc 配置，如：****interceptors\****,* ***formatters\****,* ***view controllers\*** *等。可以使用**@Configuration**注解添加一个* *WebMvcConfigurer* *类型的配置类，并不要标注* *@EnableWebMvc*
- *如果想保持 boot mvc 的默认配置，但要自定义核心组件实例，比如：**RequestMappingHandlerMapping**,* *RequestMappingHandlerAdapter**, 或**ExceptionHandlerExceptionResolver**，给容器中放一个* *WebMvcRegistrations* *组件即可*
- *如果想全面接管 Spring MVC，**@Configuration* *标注一个配置类，并加上* *@EnableWebMvc**注解，实现* *WebMvcConfigurer* *接口*

## 2.WebMvcAutoConfiguration原理

### 2.1.生效条件

```java
@AutoConfiguration(
    after = {DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class, ValidationAutoConfiguration.class}
)
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
@ConditionalOnClass({Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class})
@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})
@AutoConfigureOrder(-2147483638)
public class WebMvcAutoConfiguration {
```

**这段代码是 Spring Boot 中自动配置 Web MVC 的核心类**

- `@AutoConfiguration(after={...})`：表明这个自动配置类在另外三个自动配置类之后启用。具体来说，它会在使用 `DispatcherServletAutoConfiguration`、`TaskExecutionAutoConfiguration` 和 `ValidationAutoConfiguration` 进行自动配置之后再进行自动配置。
- `@ConditionalOnWebApplication(type=Type.SERVLET)`：表明这个自动配置类只会在 Servlet 容器中运行时才生效。
- `@ConditionalOnClass({Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class})`：表明这个自动配置类只有在 Servlet、DispatcherServlet 和 WebMvcConfigurer 这些类都被加载时才会生效。
- `@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})`：表明这个自动配置类只有在没有 WebMvcConfigurationSupport 类型的 Bean 被注册时才会生效。
- `@AutoConfigureOrder(-2147483638)`：表明这个自动配置类的执行顺序（优先级）为 -2147483638，即比大多数自动配置类优先级都高。

### 2.2.效果

##### 1.WebMvcAutoConfiguration.javaz中放了两个Filter：

 a.`HiddenHttpMethodFilter`；页面表单提交Rest请求（GET、POST、PUT、DELETE）

```java
   @Bean
   @ConditionalOnMissingBean({HiddenHttpMethodFilter.class})
   @ConditionalOnProperty(
       prefix = "spring.mvc.hiddenmethod.filter",
       name = {"enabled"}
   )
   public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
       return new OrderedHiddenHttpMethodFilter();
   }
```

这个方法旨在自动配置隐藏 HTTP 方法过滤器，它会检查 Spring 上下文中是否已经存在一个 `HiddenHttpMethodFilter` 类型的 Bean，如果不存在，则基于条件创建一个 `OrderedHiddenHttpMethodFilter` Bean 对象。其中，`OrderedHiddenHttpMethodFilter` 是 Spring 提供的用于将 PUT、DELETE 等 HTTP 方法伪装成正常的 HttpMethod 的过滤器，可以在 Spring Web MVC 应用中使用。

b.`FormContentFilter`： 表单内容Filter，GET（数据放URL后面）、POST（数据放请求体）请求可以携带数据，PUT、DELETE 的请求体数据会被忽略

```java
@Bean
@ConditionalOnMissingBean({FormContentFilter.class})
@ConditionalOnProperty(
    prefix = "spring.mvc.formcontent.filter",
    name = {"enabled"},
    matchIfMissing = true
)
public OrderedFormContentFilter formContentFilter() {
    return new OrderedFormContentFilter();
}
```

这个方法旨在自动配置表单内容过滤器，它会检查 Spring 上下文中是否已经存在一个 `FormContentFilter` 类型的 Bean，如果不存在，则基于条件创建一个 `OrderedFormContentFilter` Bean 对象。其中，`OrderedFormContentFilter` 是一个过滤器，用于将请求体数据转换成参数映射，方便处理表单数据。如果你没有自定义过滤器，可以直接使用此自动配置功能。

##### 2.给容器中放了`WebMvcConfigurer`组件；给SpringMVC添加各种定制功能

1. 所有的功能最终会和配置文件进行绑定
2. WebMvcProperties： `spring.mvc`配置文件
3. WebProperties： `spring.web`配置文件

```java
@Configuration(
    proxyBeanMethods = false
)
@Import({EnableWebMvcConfiguration.class})
@EnableConfigurationProperties({WebMvcProperties.class, WebProperties.class})
@Order(0)
public static class WebMvcAutoConfigurationAdapter implements WebMvcConfigurer, ServletContextAware {
    ...
}
```

该类的作用是实现 Spring MVC 的自动配置，并提供一些默认的 MVC 配置。具体来说，该类包括以下几个方面的功能：

1. 引入 `EnableWebMvcConfiguration` 类，以提供基本的 Spring MVC 配置；
2. 启用 `WebMvcProperties` 和 `WebProperties` 配置属性类，以自动配置 Spring MVC 的一些属性；
3. 实现 `WebMvcConfigurer` 接口，以提供更多的 MVC 配置选项和定制化；
4. 实现 `ServletContextAware` 接口，以与 Servlet 上下文进行交互；
5. 使用 `@Order(0)` 注解指定此自动配置类的执行顺序为 0，即在其他自动配置类之前。

### 2.3. WebMvcConfigurer接口

提供了配置SpringMVC底层的所有组件入口

![image-20230607154122714](/images/springboot/image-20230607154122714.png)

以下是这些回调方法的具体说明：

- `configurePathMatch(PathMatchConfigurer configurer)`：配置路径匹配选项；
- `configureContentNegotiation(ContentNegotiationConfigurer configurer)`：配置内容协商选项；
- `configureAsyncSupport(AsyncSupportConfigurer configurer)`：配置异步请求支持；
- `configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer)`：配置 DefaultServlet 处理；
- `addFormatters(FormatterRegistry registry)`：添加格式化器；
- `addInterceptors(InterceptorRegistry registry)`：添加拦截器；
- `addResourceHandlers(ResourceHandlerRegistry registry)`：添加静态资源处理器；
- `addCorsMappings(CorsRegistry registry)`：添加 CORS 映射；
- `addViewControllers(ViewControllerRegistry registry)`：添加视图控制器；
- `configureViewResolvers(ViewResolverRegistry registry)`：配置视图解析器；
- `getValidator()`：获取 Validator 实例；
- `getMessageCodesResolver()`：获取 MessageCodesResolver 实例。

### 2.4.静态资源规则源码

位置：WebMvcAutoConfiguration.class->WebMvcAutoConfigurationAdapter静态内部类->addResourceHandlers方法

```java
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
    } else {
        this.addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
        this.addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
            registration.addResourceLocations(this.resourceProperties.getStaticLocations());
            if (this.servletContext != null) {
                ServletContextResource resource = new ServletContextResource(this.servletContext, "/");
                registration.addResourceLocations(new Resource[]{resource});
            }

        });
    }
}
```

- 规则一：访问： `/webjars/**`路径就去 `classpath:/META-INF/resources/webjars/`下找资源.
  1. maven 导入依赖


- 规则二：访问： `/**`路径就去 `静态资源默认的四个位置找资源`
  1. `classpath:/META-INF/resources/``
  2. ```classpath:/resources/`
  3. `classpath:/static/`
  4. `classpath:/public/`

- 规则三：**静态资源默认都有缓存规则的设置**

  1. 所有缓存的设置，直接通过**配置文件**： `spring.web`

  1. cachePeriod： 缓存周期； 多久不用找服务器要新的。 默认没有，以s为单位

  1. cacheControl： **HTTP缓存**控制；[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#概览)

  1. **useLastModified**：是否使用最后一次修改。配合HTTP Cache规则

> 如果浏览器访问了一个静态资源 `index.js`，如果服务这个资源没有发生变化，下次访问的时候就可以直接让浏览器用自己缓存中的东西，而不用给服务器发请求。

位置：addResourceHandlers方法->this.addResourceHandler方法

```java
private void addResourceHandler(ResourceHandlerRegistry registry, String pattern, Consumer<ResourceHandlerRegistration> customizer) {
    if (!registry.hasMappingForPattern(pattern)) {
        ResourceHandlerRegistration registration = registry.addResourceHandler(new String[]{pattern});
        customizer.accept(registration);
        registration.setCachePeriod(this.getSeconds(this.resourceProperties.getCache().getPeriod()));
        registration.setCacheControl(this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl());
        registration.setUseLastModified(this.resourceProperties.getCache().isUseLastModified());
        this.customizeResourceHandlerRegistration(registration);
    }
}
```

### 2.5.EnableWebMvcConfiguration 源码

```java
//SpringBoot 给容器中放 WebMvcConfigurationSupport 组件。
//我们如果自己放了 WebMvcConfigurationSupport 组件，Boot的WebMvcAutoConfiguration都会失效。
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(WebProperties.class)
public static class EnableWebMvcConfiguration extends DelegatingWebMvcConfiguration implements ResourceLoaderAware 
{
	@Bean
    public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext, 		FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
        WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(new TemplateAvailabilityProviders(applicationContext), applicationContext, this.getWelcomePage(), this.mvcProperties.getStaticPathPattern());
        welcomePageHandlerMapping.setInterceptors(this.getInterceptors(mvcConversionService, mvcResourceUrlProvider));
        welcomePageHandlerMapping.setCorsConfigurations(this.getCorsConfigurations());
        return welcomePageHandlerMapping;
    }
    
}
```

1. 如果自己手动放置了一个 `WebMvcConfigurationSupport` 组件，在 Spring Boot 应用程序中，将会失去 Spring Boot 自动配置的功能，因为 Spring Boot 自动配置都是依赖于 `WebMvcAutoConfiguration` 内部的 `WebMvcConfigurationSupport` 来实现的。因此，如果需要在 Spring Boot 中自定义 Web MVC 配置，建议是通过继承 `WebMvcConfigurerAdapter` 或者 `DelegatingWebMvcConfiguration` 来实现。而 `DelegatingWebMvcConfiguration` 则更加灵活，因为它既可以使用基于 JavaConfig 的方式来配置 Spring MVC，也可以使用自动配置的方式来配置 Spring MVC。

2. `HandlerMapping`： 根据请求路径 ` /a` 找那个handler能处理请求

3. `WelcomePageHandlerMapping`： 

   - 访问 `/**`路径下的所有请求，都在以前四个静态资源路径下找，欢迎页也一样

   - 找`index.html`：只要静态资源的位置有一个 `index.html`页面，项目启动默认访问

### 2.6. 为什们容器中放一个`WebMvcConfigurer`就能配置底层行为

1. `WebMvcAutoConfiguration` 是一个自动配置类，它里面有一个 `EnableWebMvcConfiguration`

   ```java
    @EnableConfigurationProperties({WebProperties.class})
   public static class EnableWebMvcConfiguration extends DelegatingWebMvcConfiguration implements ResourceLoaderAware {
   ```

   

2. `EnableWebMvcConfiguration`继承与 `DelegatingWebMvcConfiguration`，这两个都生效

   ```java
   @Configuration(
       proxyBeanMethods = false
   )
   public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
   ```

3. `DelegatingWebMvcConfiguration`利用 DI 把容器中 所有 `WebMvcConfigurer `注入进来

   ```java
   public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
       private final WebMvcConfigurerComposite configurers = new WebMvcConfigurerComposite();
   
       public DelegatingWebMvcConfiguration() {
       }
   
       @Autowired(
           required = false
       )
       public void setConfigurers(List<WebMvcConfigurer> configurers) {
           if (!CollectionUtils.isEmpty(configurers)) {
               this.configurers.addWebMvcConfigurers(configurers);
           }
   
       }
   ```

   

4. 别人调用 `DelegatingWebMvcConfiguration` 的方法配置底层规则，而它调用所有 `WebMvcConfigurer`的配置底层方法。

   ```java
   protected void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
       this.configurers.configureDefaultServletHandling(configurer);
   }
   
   protected void addFormatters(FormatterRegistry registry) {
       this.configurers.addFormatters(registry);
   }
   
   protected void addInterceptors(InterceptorRegistry registry) {
       this.configurers.addInterceptors(registry);
   }
   
   protected void addResourceHandlers(ResourceHandlerRegistry registry) {
       this.configurers.addResourceHandlers(registry);
   }
   ```

### 2.7.WebMvcConfigurationSupport

提供了很多的默认设置。

判断系统中是否有相应的类：如果有，就加入相应的`HttpMessageConverter`

```java
jackson2Present = ClassUtils.isPresent("com.fasterxml.jackson.databind.ObjectMapper", classLoader) &&
				ClassUtils.isPresent("com.fasterxml.jackson.core.JsonGenerator", classLoader);
jackson2XmlPresent = ClassUtils.isPresent("com.fasterxml.jackson.dataformat.xml.XmlMapper", classLoader);
jackson2SmilePresent = ClassUtils.isPresent("com.fasterxml.jackson.dataformat.smile.SmileFactory", classLoader);
```

## 3.静态资源

### 3.1.默认规则

####  3.1.1.静态资源映射

静态资源映射规则在` WebMvcAutoConfiguration` 中进行了定义：

1. `/webjars/** `的所有路径 资源都在 `classpath:/META-INF/resources/webjars/`
2. `/**` 的所有路径 资源都在 `classpath:/META-INF/resources/`、`classpath:/resources/`、`classpath:/static/`、`classpath:/public/`
3. 所有静态资源都定义了缓存规则。【浏览器访问过一次，就会缓存一段时间】，但此功能参数无默认值

4. - `period`： 缓存间隔。 默认 0S；
   - `cacheControl`：缓存控制。 默认无；
   - `useLastModified`：是否使用lastModified头。 默认 false；

#### 3.1.2. 静态资源缓存

如前面所述

1. 所有静态资源都定义了缓存规则。【浏览器访问过一次，就会缓存一段时间】，但此功能参数无默认值

1. - `period`： 缓存间隔。 默认 0S；
   - `cacheControl`：缓存控制。 默认无；
   - `useLastModified`：是否使用lastModified头。 默认 false；

#### 3.1.3. 欢迎页

欢迎页规则在 `WebMvcAutoConfiguration` 中进行了定义：

- 在**静态资源**目录下找` index.html`
- 没有就在 `templates`下找`index`模板页

#### 3.1.4. Favicon

- 在静态资源目录下找` favicon.ico`

#### 3.1.5.缓存实验

```properties
server.port=9000

#1、spring.web：
# 1.配置国际化的区域信息
# 2.静态资源策略(开启、处理链、缓存)

#开启静态资源映射规则
spring.web.resources.add-mappings=true

#设置缓存
#spring.web.resources.cache.period=3600
##缓存详细合并项控制，覆盖period配置：
## 浏览器第一次请求服务器，服务器告诉浏览器此资源缓存7200秒，7200秒以内的所有此资源访问不用发给服务器请求，7200秒以后发请求给服务器
spring.web.resources.cache.cachecontrol.max-age=7200
#使用资源 last-modified 时间，来对比服务器和浏览器的资源是否相同没有变化。相同返回 304
spring.web.resources.cache.use-last-modified=true
```

### 3.2.自定义静态规则

> 自定义静态资源路径、自定义缓存规则

#### 3.2.1.配置方式

spring.mvc： 静态资源访问前缀路径

spring.web：

- 静态资源目录

- 静态资源缓存策略

```properties
#1、spring.web：
# 1.配置国际化的区域信息
# 2.静态资源策略(开启、处理链、缓存)

#开启静态资源映射规则
spring.web.resources.add-mappings=true

#设置缓存
spring.web.resources.cache.period=3600
##缓存详细合并项控制，覆盖period配置：
## 浏览器第一次请求服务器，服务器告诉浏览器此资源缓存7200秒，7200秒以内的所有此资源访问不用发给服务器请求，7200秒以后发请求给服务器
spring.web.resources.cache.cachecontrol.max-age=7200
## 共享缓存
spring.web.resources.cache.cachecontrol.cache-public=true
#使用资源 last-modified 时间，来对比服务器和浏览器的资源是否相同没有变化。相同返回 304
spring.web.resources.cache.use-last-modified=true

#自定义静态资源文件夹位置
spring.web.resources.static-locations=classpath:/a/,classpath:/b/,classpath:/static/

#2、 spring.mvc
## 2.1. 自定义webjars路径前缀
spring.mvc.webjars-path-pattern=/wj/**
## 2.2. 静态资源访问路径前缀
spring.mvc.static-path-pattern=/static/**
```

#### 3.2.2.代码方式

##### 方式一：

```java
//@EnableWebMvc//禁用springboot默认配置
@Configuration
public class MyConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //保留以前规则
        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(1180, TimeUnit.SECONDS));
        ;
    }
}
```

这段代码是定义一个` Spring MVC `配置类 `MyConfig`，实现了 `WebMvcConfigurer` 接口，并在其中重写了接口中的 `addResourceHandlers `方法。在该方法中，先调用了 `WebMvcConfigurer` 接口的默认实现，然后添加了新的静态资源处理规则：

- 以`/static`开头的 URL 映射到 `classpath:/static/ `目录下

- 且设置缓存时间为 1180 秒

- 在使用 @EnableWebMvc 注解时，Spring Boot 会自动导入 WebMvcAutoConfiguration 类中的默认配置。同时，如果需要自定义配置，只需要创建一个带有 @Configuration 注解的类，实现 WebMvcConfigurer 接口，并重写其中的方法即可。

- 需要注意的是，在使用 @EnableWebMvc 注解开启 Spring MVC 后，默认配置将失效，因此需要手动配置所有相关的特性和组件，包括拦截器、异常处理、视图解析等等。所以，建议在不需要进行自定义配置的情况下，尽量避免使用该注解。

##### 方式二：

```java
@Configuration
public class MyConfig2 {
    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                WebMvcConfigurer.super.addResourceHandlers(registry);
                registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");                
            }
        };
    }
}
```

需要注意的是，在使用自定义的 `WebMvcConfigurer Bean` 时，不需要使用 `@EnableWebMvc` 注解开启 Spring MVC 的相关配置。

## 4.路径匹配

> **pring5.3** 之后加入了更多的`请求路径匹配`的实现策略；
>
> 以前只支持` AntPathMatcher `策略, 现在提供了 `PathPatternParser` 策略。并且可以让我们指定到底使用那种策略。

### 4.1.Ant风格路径用法

Ant 风格的路径模式语法具有以下规则：

- *：表示**任意数量**的字符。
- ?：表示任意**一个字符**。
- **：表示**任意数量的目录**。
- {}：表示一个命名的模式**占位符**。
- []：表示**字符集合**，例如[a-z]表示小写字母。
- `{spring:[a-z]+}`：将路径中满足 `[a-z]+` 正则表达式的部分赋值给名为 `spring` 的路径变量

例如：

- `*`：`/user/*/detail` 可以匹配 `/user/123/detail` 或者 `/user/user_456/detail`。
- `?`： `/user/??/detail` 可以匹配 `/user/12/detail` 或者 `/user/ab/detail`。
- `**`： `/user/**/detail` 可以匹配 `/user/123/detail`、`/user/user_123/detail`、`/user/x/y/z/detail` 等多层级目录结构。
- `{}`： `/user/{id}/detail` 可以匹配 `/user/123/detail`，并且可以通过提取 `id` 来获取实际传入的值。
- `[]`： `/user/[a-z]/detail` 可以匹配 `/user/a/detail` 或者 `/user/g/detail`，但不能匹配 `/user/1/detail`。
- {spring:[a-z]+}：`/user/{spring:[a-z]+}/detail` 可以匹配 `/user/abc/detail` 并将 `abc` 赋值给 `spring` 变量。注意这里必须是完全匹配才行，在 Spring MVC 中只有完全匹配才会进入 Controller 层的方法。

### 4.2.模式切换

> **AntPathMatcher 与 PathPatternParser**
>
> - PathPatternParser 在 jmh 基准测试下，有 6~8 倍吞吐量提升，降低 30%~40%空间分配率
> - PathPatternParser 兼容 AntPathMatcher语法，并支持更多类型的路径模式
> - PathPatternParser  "***\***" **多段匹配**的支持**仅允许在模式末尾使用**

```java
 @GetMapping("/a*/b?/{p1:[a-f]+}")
public String hello(HttpServletRequest request, @PathVariable("p1") String path) {
    log.info("路径变量p1： {}", path);
    //获取请求路径
    String uri = request.getRequestURI();
    return uri;
}
```

总结： 

- 使用默认的路径匹配规则，是由 PathPatternParser  提供的
- 如果路径中间需要有 **，替换成ant风格路径

```properties
# 改变路径匹配策略：
# ant_path_matcher 老版策略；
# path_pattern_parser 新版策略；
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```

## 5.内容协商

一套系统适配多端数据返回

![image.png](/images/springboot/1681217799861-dde49224-a767-489b-80b7-7d8d503e33cf.png)

### 5.1. 默认规则

1. 基于`请求头`内容协商：（默认开启）
   - 客户端向服务端发送请求，携带HTTP标准的**Accept请求头**。
   - Accept: `application/json`、`text/xml`、`text/yaml`
   - 服务端根据客户端请求头期望的数据类型进行动态返回
2. 基于请求参数内容协商：（需要开启）
   - 发送请求 GET /projects/spring-boot?format=json 
   - 匹配到 @GetMapping("/projects/spring-boot") 
   - 根据参数协商，优先返回 json 类型数据【需要开启参数匹配设置】
   - 发送请求 GET /projects/spring-boot?format=xml,优先返回 xml 类型数据

### 5.2. 效果演示

请求同一个接口，可以返回json和xml不同格式数据

1. 引入支持写出xml内容依赖

   ```xml
   <dependency>
       <groupId>com.fasterxml.jackson.dataformat</groupId>
       <artifactId>jackson-dataformat-xml</artifactId>
   </dependency>
   ```

2. 标注注解

   ```java
   @JacksonXmlRootElement  // 可以写出为xml文档
   @Data
   public class Person {
       private Long id;
       private String userName;
       private String email;
       private Integer age;
   }
   ```

3. 效果

   ![image.png](/images/springboot/1681220124448-e8611612-97bc-4823-9b00-20dd9d579abf.png)

​    

![image.png](/images/springboot/1681220145378-86fabd90-a78c-4f60-9efa-eb2960915832.png)

### 5.3.配置协商规则与支持类型

1. 修改**内容协商方式**

   ```properties
   #使用参数进行内容协商
   spring.mvc.contentnegotiation.favor-parameter=true  
   #自定义参数名，默认为format
   spring.mvc.contentnegotiation.parameter-name=myparam 
   ```

   

2. 大多数 MediaType 都是开箱即用的。也可以**自定义内容类型，如：**

   ```properties
   spring.mvc.contentnegotiation.media-types.yaml=text/yaml
   ```


### 5.4.自定义内容返回

#### 5.4.1.增加yaml返回支持

导入依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-yaml</artifactId>
</dependency>
```

把对象写出成YAML

```java
    public static void main(String[] args) throws JsonProcessingException {
        Person person = new Person();
        person.setId(1L);
        person.setUserName("张三");
        person.setEmail("aaa@qq.com");
        person.setAge(18);

        YAMLFactory factory = new YAMLFactory().disable(YAMLGenerator.Feature.WRITE_DOC_START_MARKER);
        ObjectMapper mapper = new ObjectMapper(factory);

        String s = mapper.writeValueAsString(person);
        System.out.println(s);
    }
```

编写配置

```properties
#新增一种媒体类型
spring.mvc.contentnegotiation.media-types.yaml=text/yaml
```

增加`HttpMessageConverter`组件，专门负责把对象写出为yaml格式

```java
    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override //配置一个能把对象转为yaml的messageConverter
            public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
                converters.add(new MyYamlHttpMessageConverter());
            }
        };
    }
```

#### 5.4.2. 思考：如何增加其他

- 配置媒体类型支持: 
  - `spring.mvc.contentnegotiation.media-types.yaml=text/yaml`

- 编写对应的`HttpMessageConverter`，要告诉Boot这个支持的媒体类型
  - 按照3的示例

- 把MessageConverter组件加入到底层
  - 容器中放一个``WebMvcConfigurer`` 组件，并配置底层的`MessageConverter`


#### 5.4.3.HttpMessageConverter的示例写法

```java
public class MyYamlHttpMessageConverter extends AbstractHttpMessageConverter<Object> {

    private ObjectMapper objectMapper = null; //把对象转成yaml

    public MyYamlHttpMessageConverter(){
        //告诉SpringBoot这个MessageConverter支持哪种媒体类型  //媒体类型
        super(new MediaType("text", "yaml", Charset.forName("UTF-8")));
        YAMLFactory factory = new YAMLFactory()
                .disable(YAMLGenerator.Feature.WRITE_DOC_START_MARKER);
        this.objectMapper = new ObjectMapper(factory);
    }

    @Override
    protected boolean supports(Class<?> clazz) {
        //只要是对象类型，不是基本类型
        return true;
    }

    @Override  //@RequestBody
    protected Object readInternal(Class<?> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        return null;
    }

    @Override //@ResponseBody 把对象怎么写出去
    protected void writeInternal(Object methodReturnValue, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {

        //try-with写法，自动关流
        try(OutputStream os = outputMessage.getBody()){
            this.objectMapper.writeValue(os,methodReturnValue);
        }

    }
}
```


### 5.5. 内容协商原理-`HttpMessageConverter`

> - `HttpMessageConverter` 怎么工作？合适工作？
> - 定制 `HttpMessageConverter`  来实现多端内容协商
> - 编写`WebMvcConfigurer`提供的`configureMessageConverters`底层，修改底层的`MessageConverter`

#### 5.5.1.`@ResponseBody`由`HttpMessageConverter`处理

> 标注了`@ResponseBody`的返回值 将会由支持它的 `HttpMessageConverter`写给浏览器

1. 如果controller方法的返回值标注了 @ResponseBody 注解

   1.1. 请求进来先来到`DispatcherServlet`的`doDispatch()`进行处理

   1.2. 找到一个 `HandlerAdapter `适配器。利用适配器执行目标方法

   1.3. `RequestMappingHandlerAdapter`来执行，调用`invokeHandlerMethod（）`来执行目标方法

   1.4. 目标方法执行之前，准备好两个东西

    1.4.1. `HandlerMethodArgumentResolver`：参数解析器，确定目标方法每个参数值

    1.4.2. `HandlerMethodReturnValueHandler`：返回值处理器，确定目标方法的返回值改怎么处理

   1.5. `RequestMappingHandlerAdapter `里面的`invokeAndHandle()`真正执行目标方法

   1.6. 目标方法执行完成，会返回返回值对象

   1.7. 找到一个合适的返回值处理器 `HandlerMethodReturnValueHandler`

   1.8. 最终找到` RequestResponseBodyMethodProcessor`能处理 标注了 `@ResponseBody`注解的方法

   1.9. `RequestResponseBodyMethodProcessor `调用`writeWithMessageConverters `,利用`MessageConverter`把返回值写出去

> 上面解释：`@ResponseBody`由`HttpMessageConverter`处理

#### 5.5.2.`HttpMessageConverter` 会**先进行内容协商**

1. 遍历所有的`MessageConverter`看谁支持这种**内容类型的数据**
2. 默认`MessageConverter`有以下

​			![img](/images/springboot/1681275459547-89d8d651-b52f-4d47-bff9-6db123624424.png)最终因为要`json`所以`MappingJackson2HttpMessageConverter`支持写出json

1. jackson用`ObjectMapper`把对象写出去



#### 5.5.3. `WebMvcAutoConfiguration`提供几种默认`HttpMessageConverters`

`EnableWebMvcConfiguration`通过 `addDefaultHttpMessageConverters`添加了默认的`MessageConverter`；如下：

- `ByteArrayHttpMessageConverter`： 支持字节数据读写

- `StringHttpMessageConverter`： 支持字符串读写
- `ResourceHttpMessageConverter`：支持资源读写
- `ResourceRegionHttpMessageConverter`: 支持分区资源写出
- `AllEncompassingFormHttpMessageConverter`：支持表单xml/json读写
- `MappingJackson2HttpMessageConverter`： 支持请求响应体Json读写

默认8个：

![img](/images/springboot/1681302411019-0c0425aa-6679-4b2b-a456-b31c151c6e83.png)

> 系统提供默认的MessageConverter 功能有限，仅用于json或者普通返回数据。额外增加新的内容协商功能，必须增加新的`HttpMessageConverter`

## 6. 模板引擎

> - 由于 **SpringBoot** 使用了**嵌入式 Servlet 容器**。所以 **JSP** 默认是**不能使用**的。
> - 如果需要**服务端页面渲染**，优先考虑使用 模板引擎。

![image.png](/images/springboot/1681354523290-b89d7e0d-b9aa-40f5-8d22-d3d09d02b136.png)

模板引擎页面默认放在 src/main/resources/templates

**SpringBoot** 包含以下模板引擎的自动配置

- FreeMarker
- Groovy
- **Thymeleaf**
- Mustache

**Thymeleaf官网**：https://www.thymeleaf.org/ 

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
				   	<title>Good Thymes Virtual Grocery</title>
	   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	   <link rel="stylesheet" type="text/css" media="all" th:href="@{/css/gtvg.css}" />
</head>
<body>
     	<p th:text="#{home.welcome}">Welcome to our grocery store!</p>
</body
</html>
```

### 6.1. Thymeleaf整合

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

自动配置原理

1. 开启了 org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration 自动配置

2. 属性绑定在 ThymeleafProperties 中，对应配置文件 spring.thymeleaf 内容

3. 所有的模板页面默认在 `classpath:/templates`文件夹下

4. 默认效果

   - 所有的模板页面在 `classpath:/templates/`下面找

   - 找后缀名为`.html`的页面

### 6.2.基础语法

#### 6.2.1.核心用法

`**th:xxx**`**：动态渲染指定的 html 标签属性值、或者th指令（遍历、判断等）**

- `th:text`：标签体内文本值渲染

- - `th:utext`：不会转义，显示为html原本的样子。

- `th:属性`：标签指定属性渲染
- `th:attr`：标签任意属性渲染
- `th:if``th:each``...`：其他th指令
- 例如：

```html
<p th:text="${content}">原内容</p>
<a th:href="${url}">登录</a>
<img src="../../images/gtvglogo.png" 
     th:attr="src=@{/images/gtvglogo.png},title=#{logo},alt=#{logo}" />
```

`**表达式**`**：用来动态取值**

- `**${}**`**：变量取值；使用model共享给页面的值都直接用${}**
- `**@{}**`**：url路径；**
- `#{}`：国际化消息
- `~{}`：片段引用
- `*{}`：变量选择：需要配合th:object绑定对象

**系统工具&内置对象：**[**详细文档**](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html#appendix-a-expression-basic-objects)

- `param`：请求参数对象
- `session`：session对象
- `application`：application对象
- `#execInfo`：模板执行信息
- `#messages`：国际化消息
- `#uris`：uri/url工具
- `#conversions`：类型转换工具
- `#dates`：日期工具，是`java.util.Date`对象的工具类
- `#calendars`：类似#dates，只不过是`java.util.Calendar`对象的工具类
- `#temporals`： JDK8+ `**java.time**` API 工具类
- `#numbers`：数字操作工具
- `#strings`：字符串操作
- `#objects`：对象操作
- `#bools`：bool操作
- `#arrays`：array工具
- `#lists`：list工具
- `#sets`：set工具
- `#maps`：map工具
- `#aggregates`：集合聚合工具（sum、avg）
- `#ids`：id生成工具

#### 6.2.2. 语法示例

**表达式：**

- 变量取值：${...}
- url 取值：@{...}
- 国际化消息：#{...}
- 变量选择：*{...}
- 片段引用: ~{...}

**常见：**

- 文本： 'one text'，'another one!',...
- 数字： 0,34,3.0,12.3,...
- 布尔：true、false
- null: null
- 变量名： one,sometext,main...

**文本操作：**

- 拼串： +
- 文本替换：| The name is ${name} |

**布尔操作：**

- 二进制运算： and,or
- 取反：!,not

**比较运算：**

- 比较：>，<，<=，>=（gt，lt，ge,le）
- 等值运算：==,!=（eq，ne）

**条件运算：**

- if-then： (if)?(then)
- if-then-else: (if)?(then):(else)
- default: (value)?:(defaultValue)

**特殊语法：**

- 无操作：_

**所有以上都可以嵌套组合**

```html
'User is of type ' + (${user.isAdmin()} ? 'Administrator' : (${user.type} ?: 'Unknown'))
```

### 6.3.属性设置

1. th:href="@{/product/list}"
2. th:attr="class=${active}"
3. th:attr="src=@{/images/gtvglogo.png},title=${logo},alt=#{logo}"
4. th:checked="${user.active}"

```html
<p th:text="${content}">原内容</p>
<a th:href="${url}">登录</a>
<img src="../../images/gtvglogo.png"  th:attr="src=@{/images/gtvglogo.png},title=#{logo},alt=#{logo}" />
```

### 6.4.遍历

语法：  `th:each="元素名,迭代状态 : ${集合}"`

```html
<tr th:each="prod : ${prods}">
  <td th:text="${prod.name}">Onions</td>
  <td th:text="${prod.price}">2.41</td>
  <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>

<tr th:each="prod,iterStat : ${prods}" th:class="${iterStat.odd}? 'odd'">
  <td th:text="${prod.name}">Onions</td>
  <td th:text="${prod.price}">2.41</td>
  <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```

iterStat 有以下属性：

- index：当前遍历元素的索引，从0开始
- count：当前遍历元素的索引，从1开始
- size：需要遍历元素的总数量
- current：当前正在遍历的元素对象
- even/odd：是否偶数/奇数行
- first：是否第一个元素
- last：是否最后一个元素

### 6.5.判断

#### **th:if**

```html
<a
  href="comments.html"
  th:href="@{/product/comments(prodId=${prod.id})}"
  th:if="${not #lists.isEmpty(prod.comments)}"
  >view</a>
```

#### th:switch

```html
<div th:switch="${user.role}">
  <p th:case="'admin'">User is an administrator</p>
  <p th:case="#{roles.manager}">User is a manager</p>
  <p th:case="*">User is some other thing</p>
</div>
```

### 6.6. 属性优先级

- 片段
- 遍历
- 判断

```html
<ul>
  <li th:each="item : ${items}" th:text="${item.description}">Item description here...</li>
</ul>
```

| Order | Feature          | Attributes                           |
| ----- | ---------------- | ------------------------------------ |
| 1     | 片段包含         | th:insert th:replace                 |
| 2     | 遍历             | th:each                              |
| 3     | 判断             | th:if th:unless th:switch th:case    |
| 4     | 定义本地变量     | th:object th:with                    |
| 5     | 通用方式属性修改 | th:attr th:attrprepend th:attrappend |
| 6     | 指定属性修改     | th:value th:href th:src ...          |
| 7     | 文本值           | th:text th:utext                     |
| 8     | 片段指定         | th:fragment                          |
| 9     | 片段移除         | th:remove                            |

### 6.7.行内写法

`[[...]] or [(...)]`

```html
<p>Hello, [[${session.user.name}]]!</p>
```

### 6.8.变量选择

```html
<div th:object="${session.user}">
      <p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
      <p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
      <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>
```

等同于

```html
<div>
      <p>Name: <span th:text="${session.user.firstName}">Sebastian</span>.</p>
      <p>Surname: <span th:text="${session.user.lastName}">Pepper</span>.</p>
      <p>Nationality: <span th:text="${session.user.nationality}">Saturn</span>.</p>
</div
```

### 6.9. 模板布局

- 定义模板： `th:fragment`
- 引用模板：`~{templatename::selector}`
- 插入模板：`th:insert`、`th:replace`

```html
<footer th:fragment="copy">&copy; 2011 The Good Thymes Virtual Grocery</footer>

<body>
  <div th:insert="~{footer :: copy}"></div>
  <div th:replace="~{footer :: copy}"></div>
</body>
<body>
  结果：
  <body>
    <div>
      <footer>&copy; 2011 The Good Thymes Virtual Grocery</footer>
    </div>

    <footer>&copy; 2011 The Good Thymes Virtual Grocery</footer>
  </body>
</body>
```

### 6.10. devtools

```xml
  <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
  </dependency>
```

修改页面后；`ctrl+F9`刷新效果；

java代码的修改，如果`devtools`热启动了，可能会引起一些bug，难以排查

## 7.国际化

国际化的自动配置参照MessageSourceAutoConfiguration

**实现步骤：**

1. Spring Boot 在类路径根下查找messages资源绑定文件。文件名为：messages.properties

2. 多语言可以定义多个消息文件，命名为messages_区域代码.properties。如：

   amessages.properties：默认

   bmessages_zh_CN.properties：中文环境

   cmessages_en_US.properties：英语环境

3. 在程序中可以自动注入 MessageSource组件，获取国际化的配置项值

4. 在页面中可以使用表达式  #{}获取国际化的配置项值

## 8.错误处理

### 8.1.默认处理机制

> **错误处理的自动配置**都在`ErrorMvcAutoConfiguration`中，两大核心机制：
>
> - 1. SpringBoot 会**自适应****处理错误**，**响应页面**或**JSON数据**
> - 2. **SpringMVC的错误处理机制**依然保留，**MVC处理不了**，才会**交给boot进行处理**

![未命名绘图](/images/springboot/未命名绘图.svg)

发生错误以后，转发给/error路径，SpringBoot在底层写好一个 BasicErrorController的组件，专门处理这个请求

```java
 @RequestMapping(
        produces = {"text/html"}
    )
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = this.getStatus(request);
        Map<String, Object> model = Collections.unmodifiableMap(this.getErrorAttributes(request, this.getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
        response.setStatus(status.value());
        ModelAndView modelAndView = this.resolveErrorView(request, response, status, model);
        return modelAndView != null ? modelAndView : new ModelAndView("error", model);
    }

    @RequestMapping
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        HttpStatus status = this.getStatus(request);
        if (status == HttpStatus.NO_CONTENT) {
            return new ResponseEntity(status);
        } else {
            Map<String, Object> body = this.getErrorAttributes(request, this.getErrorAttributeOptions(request, MediaType.ALL));
            return new ResponseEntity(body, status);
        }
    }
```

错误页面是这么解析到的

```java
//1、解析错误的自定义视图地址
ModelAndView modelAndView = resolveErrorView(request, response, status, model);
//2、如果解析不到错误页面的地址，默认的错误页就是 error
return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
```

容器中专门有一个错误视图解析器

```java
@Bean
@ConditionalOnBean(DispatcherServlet.class)
@ConditionalOnMissingBean(ErrorViewResolver.class)
DefaultErrorViewResolver conventionErrorViewResolver() {
    return new DefaultErrorViewResolver(this.applicationContext, this.resources);
}
```

SpringBoot解析自定义错误页的默认规则

```java
    public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
        ModelAndView modelAndView = this.resolve(String.valueOf(status.value()), model);
        if (modelAndView == null && SERIES_VIEWS.containsKey(status.series())) {
            modelAndView = this.resolve((String)SERIES_VIEWS.get(status.series()), model);
        }

        return modelAndView;
    }

    private ModelAndView resolve(String viewName, Map<String, Object> model) {
        String errorViewName = "error/" + viewName;
        TemplateAvailabilityProvider provider = this.templateAvailabilityProviders.getProvider(errorViewName, this.applicationContext);
        return provider != null ? new ModelAndView(errorViewName, model) : this.resolveResource(errorViewName, model);
    }

    private ModelAndView resolveResource(String viewName, Map<String, Object> model) {
        String[] var3 = this.resources.getStaticLocations();
        int var4 = var3.length;

        for(int var5 = 0; var5 < var4; ++var5) {
            String location = var3[var5];

            try {
                Resource resource = this.applicationContext.getResource(location);
                resource = resource.createRelative(viewName + ".html");
                if (resource.exists()) {
                    return new ModelAndView(new HtmlResourceView(resource), model);
                }
            } catch (Exception var8) {
            }
        }

        return null;
    }

```

容器中有一个默认的名为 error 的 view； 提供了默认白页功能

```java
	@Bean
	@ConditionalOnMissingBean(value = ErrorAttributes.class, search = SearchStrategy.CURRENT)
	public DefaultErrorAttributes errorAttributes() { 
  				   return new DefaultErrorAttributes();
	}
```

规则：

1. **解析一个错误页**

   - 如果发生了500、404、503、403 这些错误

   ​			如果有**模板引擎**，默认在 `classpath:/templates/error/**精确码.html**`

   ​			如果没有模板引擎，在静态资源文件夹下找  `**精确码.html**`

   - 如果匹配不到`精确码.html`这些精确的错误页，就去找`5xx.html`，`4xx.html`**模糊匹配**

   ​			如果有模板引擎，默认在 `classpath:/templates/error/5xx.html`

   ​			如果没有模板引擎，在静态资源文件夹下找  `5xx.html`

2. 如果模板引擎路径`templates`下有 `error.html`页面，就直接渲染

[Springboot 系列（七）Spring Boot web 开发之异常错误处理机制剖析 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903982813413389)

### 8.2.自定义页面响应

#### 8.2.1. 自定义json响应

根据上面的 SpringBoot 错误处理原理分析，得知最终返回的 JSON 信息是从一个 map 对象中转换出来的，那么，只要能自定义 map 中的值，就可以自定义错误信息的 json 格式了。直接重写 `DefaultErrorAttributes`类的  `getErrorAttributes` 方法即可。

```java
@Component
public class ErrorAttributesCustom extends DefaultErrorAttributes {
    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
        errorAttributes.put("code", "400");
        errorAttributes.put("msg", "请检查参数");
        return errorAttributes;

    }
}
```

测试返回结果：

```json
{
	"timestamp": "2023-06-09T09:42:55.879+00:00",
	"status": 404,
	"error": "Not Found",
	"message": "No message available",
	"path": "/111",
	"code": "400",
	"msg": "请检查参数"
}
```

#### 8.2.2.自定义页面响应

根据boot的错误页面规则，自定义页面模板

### 8.3.实战

#### 处理系统异常

```java
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    /**
     * 系统异常 预期以外异常
     * @param ex
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public JsonResult handleUnexpectedServer(Exception ex) {
        logger.error("系统异常：", ex);
        return new JsonResult("500", "系统发生异常，请联系管理员");
    }
}
```

#### 拦截自定义异常

定义异常信息

由于在业务中，有很多异常，针对不同的业务，可能给出的提示信息不同，所以为了方便项目异常信息管理，我们一般会定义一个异常信息枚举类。比如：

```java
/**
 * 业务异常提示信息枚举类
 * @author shengwu ni
 */
public enum BusinessMsgEnum {
    /** 参数异常 */
    PARMETER_EXCEPTION("102", "参数异常!"),
    /** 等待超时 */
    SERVICE_TIME_OUT("103", "服务调用超时！"),
    /** 参数过大 */
    PARMETER_BIG_EXCEPTION("102", "输入的图片数量不能超过50张!"),
    /** 500 : 一劳永逸的提示也可以在这定义 */
    UNEXPECTED_EXCEPTION("500", "系统发生异常，请联系管理员！");
    // 还可以定义更多的业务异常

    /**
     * 消息码
     */
    private String code;
    /**
     * 消息内容
     */
    private String msg;

    private BusinessMsgEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
	// set get方法
}
```

拦截自定义异常

然后我们可以定义一个业务异常，当出现业务异常时，我们就抛这个自定义的业务异常即可。比如我们定义一个 BusinessErrorException 异常，如下：

```java
/**
 * 自定义业务异常
 * @author shengwu ni
 */
public class BusinessErrorException extends RuntimeException {
    
    private static final long serialVersionUID = -7480022450501760611L;

    /**
     * 异常码
     */
    private String code;
    /**
     * 异常提示信息
     */
    private String message;

    public BusinessErrorException(BusinessMsgEnum businessMsgEnum) {
        this.code = businessMsgEnum.code();
        this.message = businessMsgEnum.msg();
    }
	// get set方法
}
```

在构造方法中，传入我们上面自定义的异常枚举类，所以在项目中，如果有新的异常信息需要添加，我们直接在枚举类中添加即可，很方便，做到统一维护，然后再拦截该异常时获取即可。

```java
@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    /**
     * 拦截业务异常，返回业务异常信息
     * @param ex
     * @return
     */
    @ExceptionHandler(BusinessErrorException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public JsonResult handleBusinessError(BusinessErrorException ex) {
        String code = ex.getCode();
        String message = ex.getMessage();
        return new JsonResult(code, message);
    }
}
```

在业务代码中，我们可以直接模拟一下抛出业务异常，测试一下：

```java
@RestController
@RequestMapping("/exception")
public class ExceptionController {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);

    @GetMapping("/business")
    public JsonResult testException() {
        try {
            int i = 1 / 0;
        } catch (Exception e) {
            throw new BusinessErrorException(BusinessMsgEnum.UNEXPECTED_EXCEPTION);
        }
        return new JsonResult();
    }
}
```

运行一下项目，测试一下，返回 json 如下，说明我们自定义的业务异常捕获成功：

```json
{"code":"500","msg":"系统发生异常，请联系管理员！"}
```

###  6.8.4.总结

- **前后分离**
  - 后台发生的所有错误，`@ControllerAdvice + @ExceptionHandler`进行统一异常处理。

- **服务端页面渲染**
  - **不可预知的一些，HTTP码表示的服务器或客户端错误**
    - 给`classpath:/templates/error/`下面，放常用精确的错误码页面。`500.html`，`404.html`
    - 给`classpath:/templates/error/`下面，放通用模糊匹配的错误码页面。 `5xx.html`，`4xx.html`

  - **发生业务错误**
    - **核心业务**，每一种错误，都应该代码控制，**跳转到自己定制的错误页**。
    - **通用业务**，`classpath:/templates/error.html`页面，**显示错误信息**。




页面，JSON，可用的Model数据如下

![img](/images/springboot/1681724501227-077073b7-349d-414f-8916-a822eb86c772.png)

## 9.嵌入式容器

> **Servlet容器**：管理、运行**Servlet组件**（Servlet、Filter、Listener）的环境，一般指**服务器**

### 9.1. 自动配置原理

- SpringBoot 默认嵌入Tomcat作为Servlet容器。
- **自动配置类**是`ServletWebServerFactoryAutoConfiguration`，`EmbeddedWebServerFactoryCustomizerAutoConfiguration`
- 自动配置类开始分析功能。`xxxxAutoConfiguration`

```java
@AutoConfiguration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnClass(ServletRequest.class)
@ConditionalOnWebApplication(type = Type.SERVLET)
@EnableConfigurationProperties(ServerProperties.class)
@Import({ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,
		ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,
		ServletWebServerFactoryConfiguration.EmbeddedJetty.class,
		ServletWebServerFactoryConfiguration.EmbeddedUndertow.class })
public class ServletWebServerFactoryAutoConfiguration {
    
}
```

1. `ServletWebServerFactoryAutoConfiguration` 自动配置了嵌入式容器场景
2. 绑定了`ServerProperties`配置类，所有和服务器有关的配置 `server`
3. `ServletWebServerFactoryAutoConfiguration` 导入了 嵌入式的三大服务器 `Tomcat`、`Jetty`、`Undertow`

   1. 导入 `Tomcat`、`Jetty`、`Undertow` 都有条件注解。系统中有这个类才行（也就是导了包）
   2. 默认  `Tomcat`配置生效。给容器中放 TomcatServletWebServerFactory
   3. 都给容器中 `ServletWebServerFactory`放了一个 **web服务器工厂（造web服务器的）**
   4. **web服务器工厂 都有一个功能，**`getWebServer`获取web服务器
   5. TomcatServletWebServerFactory 创建了 tomcat。

4. ServletWebServerFactory 什么时候会创建 webServer出来。
5. `ServletWebServerApplicationContext`ioc容器，启动的时候会调用创建web服务器
6. Spring**容器刷新（启动）**的时候，会预留一个时机，刷新子容器。`onRefresh()`
7. refresh() 容器刷新 十二大步的刷新子容器会调用 `onRefresh()`；

```java
	@Override
	protected void onRefresh() {
		super.onRefresh();
		try {
			createWebServer();
		}
		catch (Throwable ex) {
			throw new ApplicationContextException("Unable to start web server", ex);
		}
	}
```

Web场景的Spring容器启动，在onRefresh的时候，会调用创建web服务器的方法。

Web服务器的创建是通过WebServerFactory搞定的。容器中又会根据导了什么包条件注解，启动相关的 服务器配置，默认`EmbeddedTomcat`会给容器中放一个 `TomcatServletWebServerFactory`，导致项目启动，自动创建出Tomcat。

### 9.2. 自定义

![img](/images/springboot/1681725850466-2ecf12f4-8b66-469f-9d5d-377a33923b3c.png)

切换服务器；

```xml
<properties>
    <servlet-api.version>3.1.0</servlet-api.version>
</properties>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Exclude the Tomcat dependency -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- Use Jetty instead -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```



### 9.3. 最佳实践

**用法：**

- 修改`server`下的相关配置就可以修改**服务器参数**
- 通过给容器中放一个`**ServletWebServerFactory**`，来禁用掉SpringBoot默认放的服务器工厂，实现自定义嵌入**任意服务器**。
## 10.全面接管SpringMVC

> - SpringBoot 默认配置好了 SpringMVC 的所有常用特性。
> - 如果我们需要全面接管SpringMVC的所有配置并**禁用默认配置**，仅需要编写一个`WebMvcConfigurer`配置类，并标注 `@EnableWebMvc` 即可
> - 全手动模式
>  - `@EnableWebMvc` : 禁用默认配置
>   - `WebMvcConfigurer`组件：定义MVC的底层行为

### 10.1. WebMvcAutoConfiguration 到底自动配置了哪些规则

> SpringMVC自动配置场景给我们配置了如下所有**默认行为**

- 1.WebMvcAutoConfigurationweb场景的自动配置类
  -  1.1.支持RESTful的filter：HiddenHttpMethodFilter
  -  1.2.支持非POST请求，请求体携带数据：FormContentFilter
  -  1.3.导入EnableWebMvcConfiguration：
     -   1.3.1.RequestMappingHandlerAdapter
     -   1.3.2.WelcomePageHandlerMapping： 欢迎页功能支持（模板引擎目录、静态资源目录放index.html），项目访问/ 就默认展示这个页面.
     -   1.3.3.RequestMappingHandlerMapping：找每个请求由谁处理的映射关系
     -   1.3.4.ExceptionHandlerExceptionResolver：默认的异常解析器 
     -   1.3.5.LocaleResolver：国际化解析器
     -   1.3.6.ThemeResolver：主题解析器
     -   1.3.7.FlashMapManager：临时数据共享
     -   1.3.8.FormattingConversionService： 数据格式化 、类型转化
     -   1.3.9.Validator： 数据校验JSR303提供的数据校验功能
     -   1.3.10.WebBindingInitializer：请求参数的封装与绑定
     -   1.3.11.ContentNegotiationManager：内容协商管理器
  -  1.4.WebMvcAutoConfigurationAdapter配置生效，它是一个WebMvcConfigurer，定义mvc底层组件
     -   1.4.1.定义好 WebMvcConfigurer 底层组件默认功能；所有功能详见列表
     -   1.4.2.视图解析器：InternalResourceViewResolver
     -   1.4.3.视图解析器：BeanNameViewResolver,视图名（controller方法的返回值字符串）就是组件名
     -   1.4.4.内容协商解析器：ContentNegotiatingViewResolver
     -   1.4.5.请求上下文过滤器：RequestContextFilter: 任意位置直接获取当前请求
     -   1.4.6.静态资源链规则
     -   1.4.7.ProblemDetailsExceptionHandler：错误详情
     -   1.4.7.1.SpringMVC内部场景异常被它捕获：
  -  1.5.定义了MVC默认的底层行为: WebMvcConfigurer


### 10.2. @EnableWebMvc 禁用默认行为

1. `@EnableWebMvc`给容器中导入 `DelegatingWebMvcConfiguration`组件，

​        他是 `WebMvcConfigurationSupport`

1. `WebMvcAutoConfiguration`有一个核心的条件注解, `@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)`，容器中没有`WebMvcConfigurationSupport`，`WebMvcAutoConfiguration`才生效.
2. @EnableWebMvc 导入 `WebMvcConfigurationSupport` 导致 `WebMvcAutoConfiguration` 失效。导致禁用了默认行为



> - @EnableWebMVC 禁用了 Mvc的自动配置
> - WebMvcConfigurer 定义SpringMVC底层组件的功能类



### 10.3. WebMvcConfigurer 功能

定义扩展SpringMVC底层功能

| 提供方法                           | 核心参数                              | 功能                                                         | 默认                                                         |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| addFormatters                      | FormatterRegistry                     | **格式化器**：支持属性上@NumberFormat和@DatetimeFormat的数据类型转换 | GenericConversionService                                     |
| getValidator                       | 无                                    | **数据校验**：校验 Controller 上使用@Valid标注的参数合法性。需要导入starter-validator | 无                                                           |
| addInterceptors                    | InterceptorRegistry                   | **拦截器**：拦截收到的所有请求                               | 无                                                           |
| configureContentNegotiation        | ContentNegotiationConfigurer          | **内容协商**：支持多种数据格式返回。需要配合支持这种类型的HttpMessageConverter | 支持 json                                                    |
| configureMessageConverters         | List<HttpMessageConverter<?>>         | **消息转换器**：标注@ResponseBody的返回值会利用MessageConverter直接写出去 | 8 个，支持byte，string,multipart,resource，json              |
| addViewControllers                 | ViewControllerRegistry                | **视图映射**：直接将请求路径与物理视图映射。用于无 java 业务逻辑的直接视图页渲染 | 无 <mvc:view-controller>                                     |
| configureViewResolvers             | ViewResolverRegistry                  | **视图解析器**：逻辑视图转为物理视图                         | ViewResolverComposite                                        |
| addResourceHandlers                | ResourceHandlerRegistry               | **静态资源处理**：静态资源路径映射、缓存控制                 | ResourceHandlerRegistry                                      |
| configureDefaultServletHandling    | DefaultServletHandlerConfigurer       | **默认 Servlet**：可以覆盖 Tomcat 的DefaultServlet。让DispatcherServlet拦截/ | 无                                                           |
| configurePathMatch                 | PathMatchConfigurer                   | **路径匹配**：自定义 URL 路径匹配。可以自动为所有路径加上指定前缀，比如 /api | 无                                                           |
| configureAsyncSupport              | AsyncSupportConfigurer                | **异步支持**：                                               | TaskExecutionAutoConfiguration                               |
| addCorsMappings                    | CorsRegistry                          | **跨域**：                                                   | 无                                                           |
默认 3 个 ExceptionHandlerExceptionResolver ResponseStatusExceptionResolver DefaultHandlerExceptionResolver |
| getMessageCodesResolver            | 无                                    | **消息码解析器**：国际化使用                                 | 无                                                           |



### 10.4. 最佳实践

SpringBoot 已经默认配置好了**Web开发**场景常用功能。我们直接使用即可。

#### 三种方式

| 方式         | 用法                                                         | 效果                             |                                                           |
| ------------ | ------------------------------------------------------------ | -------------------------------- | --------------------------------------------------------- |
| **全自动**   | 直接编写控制器逻辑                                           |                                  | 全部使用**自动配置默认效果**                              |
| **手自一体** | `@Configuration` +   配置`**WebMvcConfigurer**`+ *配置 WebMvcRegistrations* | **不要标注** `@**EnableWebMvc**` | **保留自动配置效果** **手动设置部分功能** 定义MVC底层组件 |
| **全手动**   | `@Configuration` +   配置`**WebMvcConfigurer**`              | **标注** `@**EnableWebMvc**`     | **禁用自动配置效果** **全手动设置**                       |

总结：

**给容器中写一个配置类**`**@Configuration**`**实现** `**WebMvcConfigurer**`**但是不要标注** `**@EnableWebMvc**`**注解，实现手自一体的效果。**



#### 两种模式

1、`前后分离模式`： `@RestController `响应JSON数据

2、`前后不分离模式`：@Controller + Thymeleaf模板引擎

## 11.web新特性

### 11.1. Problemdetails

RFC 7807: https://www.rfc-editor.org/rfc/rfc7807

**错误信息**返回新格式

原理

```java
@Configuration(proxyBeanMethods = false)
//配置过一个属性 spring.mvc.problemdetails.enabled=true
@ConditionalOnProperty(prefix = "spring.mvc.problemdetails", name = "enabled", havingValue = "true")
static class ProblemDetailsErrorHandlingConfiguration {

    @Bean
    @ConditionalOnMissingBean(ResponseEntityExceptionHandler.class)
    ProblemDetailsExceptionHandler problemDetailsExceptionHandler() {
        return new ProblemDetailsExceptionHandler();
    }

}
```

1. `ProblemDetailsExceptionHandler `是一个 `@ControllerAdvice`集中处理系统异常
2. 处理以下异常。如果系统出现以下异常，会被SpringBoot支持以 `RFC 7807`规范方式返回错误数据

```java
	@ExceptionHandler({
			HttpRequestMethodNotSupportedException.class, //请求方式不支持
			HttpMediaTypeNotSupportedException.class,
			HttpMediaTypeNotAcceptableException.class,
			MissingPathVariableException.class,
			MissingServletRequestParameterException.class,
			MissingServletRequestPartException.class,
			ServletRequestBindingException.class,
			MethodArgumentNotValidException.class,
			NoHandlerFoundException.class,
			AsyncRequestTimeoutException.class,
			ErrorResponseException.class,
			ConversionNotSupportedException.class,
			TypeMismatchException.class,
			HttpMessageNotReadableException.class,
			HttpMessageNotWritableException.class,
			BindException.class
		})
```

效果：

默认响应错误的json。状态码 405

```json
{
    "timestamp": "2023-04-18T11:13:05.515+00:00",
    "status": 405,
    "error": "Method Not Allowed",
    "trace": "org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' is not supported\r\n\tat org.springframework.web.servlet.mvc.method.RequestMappingInfoHandlerMapping.handleNoMatch(RequestMappingInfoHandlerMapping.java:265)\r\n\tat org.springframework.web.servlet.handler.AbstractHandlerMethodMapping.lookupHandlerMethod(AbstractHandlerMethodMapping.java:441)\r\n\tat org.springframework.web.servlet.handler.AbstractHandlerMethodMapping.getHandlerInternal(AbstractHandlerMethodMapping.java:382)\r\n\tat org.springframework.web.servlet.mvc.method.RequestMappingInfoHandlerMapping.getHandlerInternal(RequestMappingInfoHandlerMapping.java:126)\r\n\tat org.springframework.web.servlet.mvc.method.RequestMappingInfoHandlerMapping.getHandlerInternal(RequestMappingInfoHandlerMapping.java:68)\r\n\tat org.springframework.web.servlet.handler.AbstractHandlerMapping.getHandler(AbstractHandlerMapping.java:505)\r\n\tat org.springframework.web.servlet.DispatcherServlet.getHandler(DispatcherServlet.java:1275)\r\n\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1057)\r\n\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:974)\r\n\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1011)\r\n\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)\r\n\tat jakarta.servlet.http.HttpServlet.service(HttpServlet.java:563)\r\n\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)\r\n\tat jakarta.servlet.http.HttpServlet.service(HttpServlet.java:631)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:205)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)\r\n\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)\r\n\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)\r\n\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)\r\n\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\r\n\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:174)\r\n\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:149)\r\n\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:166)\r\n\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:90)\r\n\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:493)\r\n\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:115)\r\n\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:93)\r\n\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\r\n\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:341)\r\n\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:390)\r\n\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)\r\n\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:894)\r\n\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1741)\r\n\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)\r\n\tat org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191)\r\n\tat org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659)\r\n\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\r\n\tat java.base/java.lang.Thread.run(Thread.java:833)\r\n",
    "message": "Method 'POST' is not supported.",
    "path": "/list"
}
```

开启ProblemDetails返回, 使用新的MediaType

```properties
spring.mvc.problemdetails.enabled=true
```

`Content-Type: application/problem+json`+ 额外扩展返回

![img](/images/springboot/1681816524680-e75cbe89-f90c-4ac4-8247-ec850308df65.png)

```json
{
    "type": "about:blank",
    "title": "Method Not Allowed",
    "status": 405,
    "detail": "Method 'POST' is not supported.",
    "instance": "/list"
}
```

### 11.2.函数式Web

> `SpringMVC 5.2` 以后 允许我们使用**函数式**的方式，**定义Web的请求处理流程**。
>
> 函数式接口
>
> Web请求处理的方式：
>
> 1. `@Controller + @RequestMapping`：**耦合式** （**路由**、**业务**耦合）
> 2. **函数式Web**：分离式（路由、业务分离）

####  11.2.1.场景

场景：User RESTful - CRUD

- GET /user/1  获取1号用户
- GET /users   获取所有用户
- POST /user  **请求体**携带JSON，新增一个用户
- PUT /user/1 **请求体**携带JSON，修改1号用户
- DELETE /user/1 **删除**1号用户 

#### 11.2.2. 核心类

- **RouterFunction**
- **RequestPredicate**
- **ServerRequest**
- **ServerResponse**

#### 11.2.3. 示例

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.function.RequestPredicate;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.web.servlet.function.RequestPredicates.accept;
import static org.springframework.web.servlet.function.RouterFunctions.route;

@Configuration(proxyBeanMethods = false)
public class MyRoutingConfiguration {

    private static final RequestPredicate ACCEPT_JSON = accept(MediaType.APPLICATION_JSON);

    @Bean
    public RouterFunction<ServerResponse> routerFunction(MyUserHandler userHandler) {
        return route()
                .GET("/{user}", ACCEPT_JSON, userHandler::getUser)
                .GET("/{user}/customers", ACCEPT_JSON, userHandler::getUserCustomers)
                .DELETE("/{user}", ACCEPT_JSON, userHandler::deleteUser)
                .build();
    }

}
```

```java
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

@Component
public class MyUserHandler {

    public ServerResponse getUser(ServerRequest request) {
        ...
        return ServerResponse.ok().build();
    }

    public ServerResponse getUserCustomers(ServerRequest request) {
        ...
        return ServerResponse.ok().build();
    }

    public ServerResponse deleteUser(ServerRequest request) {
        ...
        return ServerResponse.ok().build();
    }

}
```

#