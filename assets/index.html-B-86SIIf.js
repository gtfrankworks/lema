import{a,c as n,b as i,o as e}from"./app-ZQgO6-gU.js";const l="/lema/images/maven/maven1.png",p="/lema/images/maven/maven2.png",r={};function c(o,s){return e(),n("div",null,s[0]||(s[0]=[i(`<h2 id="_1、maven-作为依赖管理工具" tabindex="-1"><a class="header-anchor" href="#_1、maven-作为依赖管理工具"><span>1、Maven 作为依赖管理工具</span></a></h2><h3 id="jar-包的规模" tabindex="-1"><a class="header-anchor" href="#jar-包的规模"><span>jar 包的规模</span></a></h3><p>随着我们使用越来越多的框架，或者框架封装程度越来越高，项目中使用的jar包也越来越多。项目中，一个模块里面用到上百个jar包是非常正常的。</p><p>比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><ul><li>Nacos 服务注册发现</li><li>Web 框架环境</li><li>视图模板技术 Thymeleaf</li></ul><p>最终却导入了 106 个 jar 包：</p><div class="language-&gt; line-numbers-mode" data-highlighter="shiki" data-ext="&gt;" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-&gt;"><span class="line"><span>com.netflix.ribbon: ribbon:jar:2.3.0:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-thymeleaf:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>commons-configuration:commons-configuration:jar:1.8:compile</span></span>
<span class="line"><span>org.apache.logging.log4j:log4j-api:jar:2.13.3:compile</span></span>
<span class="line"><span>org.springframework:spring-beans:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-starter-netflix-ribbon:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.apache.tomcat.embed:tomcat-embed-websocket:jar:9.0.39:compile</span></span>
<span class="line"><span>com.alibaba.cloud:spring-cloud-alibaba-commons:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.bouncycastle:bcprov-jdk15on:jar:1.64:compile</span></span>
<span class="line"><span>org.springframework.security:spring-security-crypto:jar:5.3.5.RELEASE:compile</span></span>
<span class="line"><span>org.apache.httpcomponents:httpasyncclient:jar:4.1.4:compile</span></span>
<span class="line"><span>com.google.j2objc:j2objc-annotations:jar:1.3:compile</span></span>
<span class="line"><span>com.fasterxml.jackson.core:jackson-databind:jar:2.11.3:compile</span></span>
<span class="line"><span>io.reactivex:rxjava:jar:1.3.8:compile</span></span>
<span class="line"><span>ch.qos.logback:logback-classic:jar:1.2.3:compile</span></span>
<span class="line"><span>org.springframework:spring-web:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>io.reactivex:rxnetty-servo:jar:0.4.9:runtime</span></span>
<span class="line"><span>org.springframework:spring-core:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>io.github.openfeign.form:feign-form-spring:jar:3.8.0:compile</span></span>
<span class="line"><span>io.github.openfeign.form:feign-form:jar:3.8.0:compile</span></span>
<span class="line"><span>com.netflix.ribbon:ribbon-loadbalancer:jar:2.3.0:compile</span></span>
<span class="line"><span>org.apache.httpcomponents:httpcore:jar:4.4.13:compile</span></span>
<span class="line"><span>org.thymeleaf.extras:thymeleaf-extras-java8time:jar:3.0.4.RELEASE:compile</span></span>
<span class="line"><span>org.slf4j:jul-to-slf4j:jar:1.7.30:compile</span></span>
<span class="line"><span>com.atguigu.demo:demo09-base-entity:jar:1.0-SNAPSHOT:compile</span></span>
<span class="line"><span>org.yaml:snakeyaml:jar:1.26:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-logging:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>io.reactivex:rxnetty-contexts:jar:0.4.9:runtime</span></span>
<span class="line"><span>org.apache.httpcomponents:httpclient:jar:4.5.13:compile</span></span>
<span class="line"><span>io.github.openfeign:feign-core:jar:10.10.1:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-aop:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>org.hdrhistogram:HdrHistogram:jar:2.1.9:compile</span></span>
<span class="line"><span>org.springframework:spring-context:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>commons-lang:commons-lang:jar:2.6:compile</span></span>
<span class="line"><span>io.prometheus:simpleclient:jar:0.5.0:compile</span></span>
<span class="line"><span>ch.qos.logback:logback-core:jar:1.2.3:compile</span></span>
<span class="line"><span>org.springframework:spring-webmvc:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>com.sun.jersey:jersey-core:jar:1.19.1:runtime</span></span>
<span class="line"><span>javax.ws.rs:jsr311-api:jar:1.1.1:runtime</span></span>
<span class="line"><span>javax.inject:javax.inject:jar:1:runtime</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-openfeign-core:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>com.netflix.ribbon:ribbon-core:jar:2.3.0:compilecom.netflix.hystrix:hystrix-core:jar:1.5.18:compilecom.netflix.ribbon:ribbon-transport:jar:2.3.0:runtime</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-json:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-starter-openfeign:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>com.fasterxml.jackson.module:jackson-module-parameter-names:jar:2.11.3:compile</span></span>
<span class="line"><span>com.sun.jersey.contribs:jersey-apache-client4:jar:1.19.1:runtime</span></span>
<span class="line"><span>io.github.openfeign:feign-hystrix:jar:10.10.1:compile</span></span>
<span class="line"><span>io.github.openfeign:feign-slf4j:jar:10.10.1:compile</span></span>
<span class="line"><span>com.alibaba.nacos:nacos-client:jar:1.4.2:compile</span></span>
<span class="line"><span>org.apache.httpcomponents:httpcore-nio:jar:4.4.13:compile</span></span>
<span class="line"><span>com.sun.jersey:jersey-client:jar:1.19.1:runtime</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-context:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.glassfish:jakarta.el:jar:3.0.3:compile</span></span>
<span class="line"><span>org.apache.logging.log4j:log4j-to-slf4j:jar:2.13.3:compile</span></span>
<span class="line"><span>com.fasterxml.jackson.datatype:jackson-datatype-jsr310:jar:2.11.3:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-commons:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.aspectj:aspectjweaver:jar:1.9.6:compile</span></span>
<span class="line"><span>com.alibaba.cloud:spring-cloud-starter-alibaba-nacos-discovery:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>com.google.guava:listenablefuture:jar:9999.0-empty-to-avoid-conflict-with-guava:compile</span></span>
<span class="line"><span>com.alibaba.spring:spring-context-support:jar:1.0.10:compile</span></span>
<span class="line"><span>jakarta.annotation:jakarta.annotation-api:jar:1.3.5:compile</span></span>
<span class="line"><span>org.bouncycastle:bcpkix-jdk15on:jar:1.64:compile</span></span>
<span class="line"><span>com.netflix.netflix-commons:netflix-commons-util:jar:0.3.0:runtime</span></span>
<span class="line"><span>com.fasterxml.jackson.core:jackson-annotations:jar:2.11.3:compile</span></span>
<span class="line"><span>com.google.guava:guava:jar:29.0-jre:compile</span></span>
<span class="line"><span>com.google.guava:failureaccess:jar:1.0.1:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>com.fasterxml.jackson.datatype:jackson-datatype-jdk8:jar:2.11.3:compile</span></span>
<span class="line"><span>com.atguigu.demo:demo08-base-api:jar:1.0-SNAPSHOT:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-starter-netflix-archaius:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-autoconfigure:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>org.slf4j:slf4j-api:jar:1.7.30:compile</span></span>
<span class="line"><span>commons-io:commons-io:jar:2.7:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-starter:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.apache.tomcat.embed:tomcat-embed-core:jar:9.0.39:compile</span></span>
<span class="line"><span>io.reactivex:rxnetty:jar:0.4.9:runtime</span></span>
<span class="line"><span>com.fasterxml.jackson.core:jackson-core:jar:2.11.3:compile</span></span>
<span class="line"><span>com.google.code.findbugs:jsr305:jar:3.0.2:compile</span></span>
<span class="line"><span>com.netflix.archaius:archaius-core:jar:0.7.6:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-web:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>commons-codec:commons-codec:jar:1.14:compile</span></span>
<span class="line"><span>com.netflix.servo:servo-core:jar:0.12.21:runtime</span></span>
<span class="line"><span>com.google.errorprone:error_prone_annotations:jar:2.3.4:compile</span></span>
<span class="line"><span>org.attoparser:attoparser:jar:2.0.5.RELEASE:compile</span></span>
<span class="line"><span>com.atguigu.demo:demo10-base-util:jar:1.0-SNAPSHOT:compile</span></span>
<span class="line"><span>org.checkerframework:checker-qual:jar:2.11.1:compile</span></span>
<span class="line"><span>org.thymeleaf:thymeleaf-spring5:jar:3.0.11.RELEASE:compile</span></span>
<span class="line"><span>commons-fileupload:commons-fileupload:jar:1.4:compile</span></span>
<span class="line"><span>com.netflix.ribbon:ribbon-httpclient:jar:2.3.0:compile</span></span>
<span class="line"><span>com.netflix.netflix-commons:netflix-statistics:jar:0.1.1:runtime</span></span>
<span class="line"><span>org.unbescape:unbescape:jar:1.1.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework:spring-jcl:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>com.alibaba.nacos:nacos-common:jar:1.4.2:compile</span></span>
<span class="line"><span>commons-collections:commons-collections:jar:3.2.2:runtime</span></span>
<span class="line"><span>javax.persistence:persistence-api:jar:1.0:compile</span></span>
<span class="line"><span>com.alibaba.nacos:nacos-api:jar:1.4.2:compileorg.thymeleaf:thymeleaf:jar:3.0.11.RELEASE:compile</span></span>
<span class="line"><span>org.springframework:spring-aop:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.boot:spring-boot-starter-tomcat:jar:2.3.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-netflix-ribbon:jar:2.2.6.RELEASE:compile</span></span>
<span class="line"><span>org.springframework:spring-expression:jar:5.2.11.RELEASE:compile</span></span>
<span class="line"><span>org.springframework.cloud:spring-cloud-netflix-archaius:jar:2.2.6.RELEASE:compile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而如果使用 Maven 来引入这些 jar 包只需要配置三个『依赖』：</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code class="language-xml"><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    &lt;!-- Nacos 服务注册发现启动器 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">com.alibaba.cloud</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">spring-cloud-starter-alibaba-nacos-discovery</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    &lt;!-- web启动器依赖 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">org.springframework.boot</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">spring-boot-starter-web</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    &lt;!-- 视图模板技术 thymeleaf --&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">org.springframework.boot</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">groupId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        &lt;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">spring-boot-starter-thymeleaf</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">artifactId</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    &lt;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">dependency</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jar-包的来源" tabindex="-1"><a class="header-anchor" href="#jar-包的来源"><span>jar 包的来源</span></a></h3><ul><li>这个jar包所属技术的官网。官网通常是英文界面，网站的结构又不尽相同，甚至找到下载链接还发现需要通过特殊的工具下载。</li><li>第三方网站提供下载。问题是不规范，在使用过程中会出现各种问题。 <ul><li>jar包的名称</li><li>jar包的版本</li><li>jar包内的具体细节</li></ul></li><li>而使用 Maven 后，依赖对应的 jar 包能够自动下载，方便、快捷又规范。</li></ul><h3 id="jar-包之间的依赖关系" tabindex="-1"><a class="header-anchor" href="#jar-包之间的依赖关系"><span>jar 包之间的依赖关系</span></a></h3><p>框架中使用的 jar 包，不仅数量庞大，而且彼此之间存在错综复杂的依赖关系。依赖关系的复杂程度，已经上升到了完全不能靠人力手动解决的程度。另外，jar 包之间有可能产生冲突。进一步增加了我们在 jar 包使用过程中的难度。</p><p>下面是前面例子中 jar 包之间的依赖关系：</p><figure><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而实际上 jar 包之间的依赖关系是普遍存在的，如果要由程序员手动梳理无疑会增加极高的学习成本，而这些工作又对实现业务功能毫无帮助。</p><p>而使用 Maven 则几乎不需要管理这些关系，极个别的地方调整一下即可，极大的减轻了我们的工作量。</p><h2 id="_2、maven-作为构建管理工具" tabindex="-1"><a class="header-anchor" href="#_2、maven-作为构建管理工具"><span>2、Maven 作为构建管理工具</span></a></h2><h3 id="你没有注意过的构建" tabindex="-1"><a class="header-anchor" href="#你没有注意过的构建"><span>你没有注意过的构建</span></a></h3><p>你可以不使用 Maven，但是构建必须要做。当我们使用 IDEA 进行开发时，构建是 IDEA 替我们做的。</p><h3 id="脱离-ide-环境仍需构建" tabindex="-1"><a class="header-anchor" href="#脱离-ide-环境仍需构建"><span>脱离 IDE 环境仍需构建</span></a></h3><figure><img src="'+p+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3、结论" tabindex="-1"><a class="header-anchor" href="#_3、结论"><span>3、结论</span></a></h2><ul><li>管理规模庞大的 jar 包，需要专门工具。</li><li>脱离 IDE 环境执行构建操作，需要专门工具。</li></ul>',24)]))}const d=a(r,[["render",c]]),m=JSON.parse('{"path":"/tools/maven/fws191z2/","title":"Maven的作用，为什么要学？","lang":"zh-CN","frontmatter":{"title":"Maven的作用，为什么要学？","createTime":"2025/08/20 12:59:47","permalink":"/tools/maven/fws191z2/"},"readingTime":{"minutes":4.52,"words":1356},"git":{"createdTime":1756736713000},"filePathRelative":"notes/tools/maven/maven1.md","headers":[]}');export{d as comp,m as data};
