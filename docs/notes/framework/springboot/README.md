---
title: SpringBoot3的简介
createTime: 2025/08/27 16:16:53
permalink: /framework/springboot/lt8adhak/
---
# Spring Boot 3 核心亮点简介

Spring Boot 3.0 是一个重要的主要版本，它将 Spring Boot 的开发提升到了一个新的水平，主要围绕 **Java 17、Jakarta EE 9/10 和 GraalVM** 等技术展开。

## 1. 最低要求：Java 17

这是 Spring Boot 3 最重要的变化之一。它将项目的最低 Java 版本要求提高到了 **Java 17**。这意味着你将能够利用 Java 17 的所有新特性，包括：

- **模式匹配（Pattern Matching）**：简化 `instanceof` 和 `switch` 表达式的使用，使代码更具可读性。
- **Record 类型**：为不可变数据类提供简洁的语法，减少样板代码。
- **密封类（Sealed Classes）**：控制哪些类可以继承一个类，提供了更强的类型安全性。

## 2. 拥抱 Jakarta EE 9 & 10

Spring Boot 3 放弃了对 Java EE 8（`javax` 命名空间）的支持，完全迁移到了 **Jakarta EE 9+**（`jakarta` 命名空间）。

- **主要影响**：这意味着所有与 Servlet、JPA、JMS 和 Bean Validation 相关的依赖，都必须使用 `jakarta.*` 命名空间。
- **迁移**：对于从 Spring Boot 2.x 升级的现有应用，你需要更新依赖并修改代码中的 `javax.*` 包导入语句。

## 3. AOT（Ahead-of-Time）支持与 GraalVM

这是 Spring Boot 3 最令人兴奋的新特性之一。它提供了对 **GraalVM Native Image** 的原生支持。

- **什么是 Native Image？**：它是一种将 Java 应用编译成独立的可执行文件（Native Executable）的技术，无需 JVM 即可运行。
- **核心优势**：
  - **极速启动**：Native Image 应用的启动时间通常在毫秒级，非常适合微服务和无服务架构。
  - **低内存占用**：由于移除了 JVM，内存消耗大幅降低。
  - **更小的包体积**：只包含必要的代码，生成的可执行文件更小。

Spring Boot 3 的 AOT 支持能够自动生成 Native Image 所需的配置，极大地简化了 Native Image 的创建过程。

## 4. 全新的可观察性（Observability）

Spring Boot 3 引入了一个全新的可观察性模块，基于 **Micrometer** 和 **Micrometer Tracing**。它统一了 Metrics（指标）、Logging（日志）和 Tracing（分布式追踪）的配置，让监控你的应用变得更加简单。

- **统一 API**：提供了统一的 API 来处理追踪、指标和日志，无需担心底层实现。
- **开箱即用**：只需引入相应的依赖，就可以自动配置对 Prometheus、Zipkin、Grafana 等流行工具的支持。

## 5. 改进的 Actuator

Spring Boot Actuator 提供了许多生产就绪的端点，用于监控和管理应用。在 Spring Boot 3 中，Actuator 得到了改进，以更好地支持可观察性。

- **Metrics**：更好地集成了 Micrometer，提供更丰富的应用指标。
- **Endpoint**：增加了新的 `/actuator/info` 端点，可以更灵活地展示应用信息。

## 6. 其他重要变化

- **Spring Data JPA**：默认将 `@Transactional` 事务注解改为 `jakarta.transaction.Transactional`。
- **Spring Security**：默认使用新的授权管理器 API。
- **HTTP/2 支持**：内嵌的服务器（Tomcat, Jetty）默认支持 HTTP/2。

## 总结

Spring Boot 3 是一个向现代化、云原生和高效开发转型的版本。它不仅是简单的版本升级，更是对技术栈的全面革新。

- **最低要求**：如果你想使用 Spring Boot 3，你需要将 Java 版本升级到 17。
- **云原生**：Native Image 的支持使其成为构建高效、低成本微服务的理想选择。
- **可观察性**：新的可观察性模块使得应用监控更加方便和强大。

如果你正在开发新的 Spring 应用，直接选择 Spring Boot 3 是一个明智的决定。如果你需要升级旧应用，请务必仔细阅读官方迁移指南。