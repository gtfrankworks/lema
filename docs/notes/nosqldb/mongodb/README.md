---
title: MongoDB介绍
createTime: 2025/08/25 13:15:58
permalink: /nosqldb/mongodb/67gldxbd/
---
## 什么是 MongoDB ?

MongoDB 是一个文档型数据库，数据以类似 JSON 的文档形式存储。

MongoDB 的设计理念是为了应对大数据量、高性能和灵活性需求。

MongoDB使用集合（Collections）来组织文档（Documents），每个文档都是由键值对组成的。

- **数据库（Database）**：存储数据的容器，类似于关系型数据库中的数据库。
- **集合（Collection）**：数据库中的一个集合，类似于关系型数据库中的表。
- **文档（Document）**：集合中的一个数据记录，类似于关系型数据库中的行（row），以 BSON 格式存储。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成，文档类似于 JSON 对象，字段值可以包含其他文档，数组及文档数组：

![img](https://www.runoob.com/wp-content/uploads/2013/10/crud-annotated-document.png)

------

## 主要特点

- **文档导向的存储**：MongoDB 是一个面向文档的数据库，它以 JSON-like 的格式存储数据，使得数据结构更加灵活和丰富。
- **索引优化查询**：MongoDB 允许用户为文档中的任意属性创建索引，例如 `FirstName` 和 `Address`，从而提高查询效率和排序性能。
- **数据镜像与扩展性**：通过本地或网络创建数据的副本，MongoDB 实现了强大的数据冗余和扩展能力。
- **水平扩展与分片**：面对增加的负载，MongoDB 可以通过分片技术将数据分布到计算机网络中的其他节点上，实现水平扩展。
- **强大的查询语言**：MongoDB 使用 JSON 格式的查询语法，支持复杂的查询表达式，包括对内嵌对象和数组的查询。
- **数据更新**：利用 `update()` 命令，MongoDB 能够替换整个文档或更新指定的数据字段，提供了灵活的数据更新方式。
- **MapReduce 批量处理**：MongoDB 的 MapReduce 功能专为大规模数据处理和聚合操作设计，通过 Map 函数的 `emit(key, value)` 调用和 Reduce 函数的逻辑处理，实现高效的数据汇总。
- **MapReduce 脚本编写**：Map 和 Reduce 函数使用 JavaScript 编写，可以通过 `db.runCommand` 或 `mapreduce` 命令在 MongoDB 中执行。
- **GridFS 大文件存储**：GridFS 是 MongoDB 内置的功能，用于存储和检索大于 BSON 文档大小限制的文件，如图片和视频。
- **服务端脚本执行**：MongoDB 允许在服务端执行 JavaScript 脚本，提供了直接在服务端执行或存储函数定义以供后续调用的能力。
- **多语言支持**：MongoDB 提供了对多种编程语言的支持，包括但不限于 RUBY、PYTHON、JAVA、C++、PHP 和 C#。
- **安装简单**：MongoDB 的安装过程简单直观，便于用户快速部署和使用。