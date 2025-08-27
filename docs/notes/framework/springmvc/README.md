---
title: SpringMVC的介绍
createTime: 2025/08/27 13:30:11
permalink: /framework/springmvc/
---
# SpringMVC 框架技术介绍

## 一、概述

SpringMVC（Spring Web MVC）是 **Spring 框架的重要组成部分**，是一个基于 **MVC（Model-View-Controller）设计模式** 的 Web 层框架。
 它为 Web 应用程序提供了清晰的分层结构，通过 **前端控制器（DispatcherServlet）** 统一分发请求，使开发者能够更专注于业务逻辑。

------

## 二、核心架构

SpringMVC 采用典型的 **前端控制器模式**，所有请求首先由 `DispatcherServlet` 统一接收，再转发给相应的处理器进行处理。

**处理流程简述**：

1. **请求接收**：用户请求进入 DispatcherServlet。
2. **映射查找**：HandlerMapping 根据请求 URL 寻找对应的处理器（Controller）。
3. **适配调用**：HandlerAdapter 调用处理器方法。
4. **结果封装**：处理器返回 ModelAndView（模型数据 + 逻辑视图）。
5. **视图解析**：ViewResolver 将逻辑视图解析为具体视图。
6. **结果响应**：视图渲染后返回给客户端。

------

## 三、核心组件

- **DispatcherServlet（前端控制器）**
   请求统一入口，负责协调各组件，进行请求分发与结果返回。
- **HandlerMapping（处理器映射器）**
   根据 URL、请求方式等信息，找到对应的 Controller。
- **Controller（控制器）**
   接收请求，调用业务逻辑，返回处理结果。
- **HandlerAdapter（处理器适配器）**
   负责执行不同类型的处理器。
- **ModelAndView（模型和视图）**
   封装业务数据和视图信息。
- **ViewResolver（视图解析器）**
   将逻辑视图解析为具体的物理视图（如 JSP、Thymeleaf、JSON）。
- **View（视图）**
   负责最终结果的展示。

------

## 四、主要特性

1. **与 Spring 深度集成**：共享 Spring 容器，支持 IoC 和 AOP。
2. **轻量级**：配置简洁，易于使用。
3. **RESTful 风格支持**：自然支持 REST API 设计。
4. **数据绑定与校验**：自动将请求参数绑定到对象，支持 JSR-303 校验。
5. **国际化支持**：内置国际化资源处理。
6. **统一异常处理**：支持全局异常管理。
7. **拦截器机制**：提供请求前后扩展点。
8. **灵活视图支持**：不仅支持 JSP，还支持 FreeMarker、Thymeleaf 及 JSON、XML 输出。

------

## 五、适用场景

- **传统 Web 应用**：结合 JSP、Thymeleaf 渲染动态页面。
- **前后端分离架构**：作为后端服务，向前端框架（Vue、React、Angular）提供 JSON 数据。
- **RESTful API 服务**：用于移动端或微服务接口开发。

------

## 六、总结

SpringMVC 是一个 **基于 MVC 模式的 Web 框架**，它通过 DispatcherServlet 统一管理请求流转，结合灵活的组件机制，为 Web 开发提供了高效、可扩展的解决方案。它既能满足传统的页面渲染需求，也能作为 REST API 框架，为现代前后端分离架构提供支持。
# 七、SpringMVC 技术对比

| 对比项           | **SpringMVC**                                 | **Struts2**                                 | **Spring WebFlux**                         |
| ---------------- | --------------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| **框架定位**     | 基于 Spring 的 Web MVC 框架                   | 早期流行的 MVC Web 框架（独立于 Spring）    | 响应式 Web 框架（Spring5 引入）            |
| **底层架构模式** | 前端控制器模式（DispatcherServlet）           | 拦截器 + 动作类（Filter + Action）          | 反应式流（Reactive Streams，基于 Reactor） |
| **开发模式**     | 注解驱动（@Controller、@RequestMapping）      | 配置驱动（XML + Action 配置），后期支持注解 | 完全基于函数式编程或响应式注解             |
| **请求处理**     | 单例 Controller，方法级别处理请求             | 每次请求都会创建 Action 实例（性能较低）    | 异步非阻塞，事件驱动模型                   |
| **视图支持**     | 支持 JSP、Thymeleaf、Freemarker、JSON、XML 等 | 主要支持 JSP、Freemarker 等                 | 主要返回 JSON / 响应流，适合 API 开发      |
| **参数绑定**     | 自动绑定请求参数到对象                        | 依赖 OGNL 表达式，性能一般                  | 支持响应式数据绑定                         |
| **性能表现**     | 高效，适合传统 Web 和 REST API                | 较笨重，性能相对落后                        | 高并发下表现优异，适合微服务               |
| **RESTful 支持** | 原生支持（@RestController、@GetMapping 等）   | 支持不友好，需要额外配置                    | 天生支持响应式 REST API                    |
| **学习成本**     | 中等（依赖 Spring 生态）                      | 较高，配置繁琐                              | 较高，需要掌握响应式编程思想               |
| **应用场景**     | 传统 Web 应用、REST API、前后端分离架构       | 传统 Web 应用（现在使用较少）               | 高并发场景、实时数据推送、微服务接口       |
| **生态整合**     | 与 Spring 完美整合，支持 IoC/AOP              | 与 Spring 结合不紧密                        | 与 Spring 5、Spring Boot 深度整合          |
| **发展现状**     | 主流，广泛使用                                | 已逐渐淘汰                                  | 新兴，适合高并发响应式架构                 |

------

## 🔎 总结

- **SpringMVC**：当前最主流的 Web 框架，适合 **传统企业应用 + REST API**。
- **Struts2**：早期流行，但 **已逐渐被淘汰**，主要存在于老系统维护。
- **Spring WebFlux**：面向未来的响应式框架，适合 **高并发、实时通信、微服务架构**。