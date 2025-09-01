---
title: deepseek创建流程图和类图
createTime: 2025/09/01 09:51:18
permalink: /ai/officeproject/792n9glv/
---
# 一、流程图

## 一、打开deepseek

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=M2Q2ZmFlMGRmMzlkZjJmZjg0NjZkNDEyNWNkYzg2NWFfczlGUGhmQkZFSmRqdTRUQWIxNVdlbW9MNXVDQlVJak9fVG9rZW46S0tzcGJRRlNYb2czWDh4SGVLcmNPWHF3bnRjXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

## 二、输入提示词

1. 提示词

```Markdown
用mermaid语法画一个「用户下单」的流程图
```

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjI2ODMwODVmOWU3NWU5NmU0NmMwNjFjOGRhZDU1ZWJfbXhQTklIRmVqMG1HUGw5MnVKeFp2TVJ0RE5NRThHS05fVG9rZW46UzV5dGI5NkVEb0U0WFp4R3FYcmNYYTlqbkliXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

1. 输出的结果

```Markdown
graph TD
    A[用户浏览商品] --> B[选择商品]
    B --> C{库存是否充足?}
    C -- 是 --> D[加入购物车]
    C -- 否 --> E[提示库存不足]
    D --> F{是否继续购物?}
    F -- 是 --> A
    F -- 否 --> G[进入结算页面]
    G --> H{是否登录?}
    H -- 是 --> I[填写收货信息]
    H -- 否 --> J[提示登录]
    J --> K[用户登录]
    K --> I
    I --> L[选择支付方式]
    L --> M[确认订单]
    M --> N{支付成功?}
    N -- 是 --> O[生成订单]
    N -- 否 --> P[提示支付失败]
    O --> Q[订单完成]
```

## 三、打开mermaidchart

1. 打开https://www.mermaidchart.com/

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzMzYjQ4YThiYWRlOTIwNTA5YzY5NjVkNWUxZTlkYTJfb0E0aTNyd05iWDBwZzk0VVhlVDhTSVBHVjBCU01HblVfVG9rZW46R0hTVGJnd3ZIb1R1cUZ4WGdBQmNJTlA1bjViXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2JkNGViYjRkYTI4ZjkxNjAzNzNlYmZjYTAwMDNmNGVfWWxtdk85c3JTTno4SFM0bUhmalVNVk1hdkJ5dnFYRkxfVG9rZW46U2VpdWI3Mlkwb3FSSUt4SGN4VGM2UlI2bldmXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=OWEzOTM1NzRjYjIzZjRhMGJlOTRhMmQxODJhYjU2NDJfRWpBcGhDNXp3TEl0RkVFaHo2Z0k4aGM0SkdvV0xnSlNfVG9rZW46RW1hUWJMNUdLbzB0bEd4bnZMMWNWazNJbkZjXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTIzNDEzNzMyNmU5NTUyOWFiMTY0Y2VkNmFhMmU0YzRfbHZyRXprc3dibTdwM2JQdmxmZURWM2VrUUl1OTQyb0xfVG9rZW46TVpVTmJJblh6b0ZxNnl4U0F2M2NXdnhjbjhlXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

1. 输入生成的内容

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQyZTI0ZWRmYjlmYTZmNjU1NGQ4MzI2MGQzMWJhMzZfSjY3RjQ1VGZOeUE5bHdQeGtuM1p3Z2kzTThjN091NkpfVG9rZW46S2czeWIyYmdyb3Iyc094d09JRmN0Uk83bm1WXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

# 二、类图

## 1、提示词

```Markdown
提示词：使用Mermaid画一个订单的类图
```

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjQ0ZDdlNmYxOGVmNzZhNzFlYzlkZDg4ZDZjMzdiOTZfQVVmcHVpYk0yTHlGNDkxUVo2Q21TQ1ZmbmxuS0NRYnVfVG9rZW46V1NNT2J2ekRpb2VCM1B4QW9Jc2NXUjkxblJjXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

## 2、输出的结果

```Markdown
classDiagram
    class 订单 {
        -订单ID: String
        -订单日期: Date
        -订单总金额: Double
        +添加商品(商品: 商品): void
        +计算总金额(): Double
        +生成订单详情(): String
    }

    class 商品 {
        -商品ID: String
        -商品名称: String
        -商品价格: Double
        +获取商品信息(): String
    }

    class 客户 {
        -客户ID: String
        -客户姓名: String
        -客户地址: String
        +下单(订单: 订单): void
        +查看订单历史(): List~订单~
    }

    订单 "1" *-- "0..*" 商品 : 包含
    客户 "1" --> "0..*" 订单 : 下单
```

1. 打开rmaidchart.com

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MGMxN2QxY2JkNjk5MzIwN2UzOGUwNzU3MDdhNTM2ZWZfWlhEdFQyRGtiNmhGRnpDSWs4SzdKckxjT2ZRU3E0OFVfVG9rZW46VTNxeWJMbEM0b3dHMHN4djRGV2NmMXhIbkxjXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

## 3、生成结果

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=N2RmYTAxNDM1ZDk4M2IwMjFlNTFmYjgyY2ExZmJlNTZfRjZxaGVrZDdJb1JrcUI5eVBLa1RUNkdUMlMyekRXbnpfVG9rZW46Wkp6YWJCZ1d2b2c2NWh4UGtNNWNtZjM2bmc4XzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)

# 三、时序图

## 1、提示词

```Markdown
使用Mermaid画一个订单的流时序
```

## 2、生成的内容

```Markdown
sequenceDiagram
    participant 客户
    participant 系统
    participant 支付网关
    participant 邮件服务

    客户 ->> 系统: 浏览商品
    客户 ->> 系统: 选择商品并下单
    系统 ->> 系统: 创建订单
    系统 ->> 系统: 添加商品到订单
    系统 ->> 系统: 计算订单总金额
    系统 ->> 客户: 显示订单总金额
    客户 ->> 系统: 选择支付方式
    系统 ->> 支付网关: 发起支付请求
    支付网关 -->> 系统: 返回支付结果
    alt 支付成功
        系统 ->> 系统: 更新订单状态为“已支付”
        系统 ->> 邮件服务: 发送订单确认邮件
        邮件服务 -->> 系统: 邮件发送成功
        系统 ->> 客户: 显示订单成功页面
    else 支付失败
        系统 ->> 系统: 更新订单状态为“支付失败”
        系统 ->> 客户: 显示支付失败页面
    end
```

## 3、导入

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NDUwZTlkOWYwN2Y3Mzg1MDAwNGY3YmU4NGJhNjIzN2ZfVVR0czlaYURBR2VUVVZjcjA3T1Z6TkhBaVltTUNscU1fVG9rZW46TVRlNmI1RjFmb0JFUjR4dVlyZ2NHNGlHbnpkXzE3NTY2OTE0ODU6MTc1NjY5NTA4NV9WNA)