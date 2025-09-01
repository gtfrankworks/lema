---
title: deepseek创建流程图和类图
createTime: 2025/09/01 09:51:18
permalink: /ai/officeproject/792n9glv/
---
# 一、流程图

## 一、打开deepseek

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTU2YjRlNWU2ZTIxZWFjZGM0NTk0YWM5NDUyZmNiOTVfUXh5TEo3N1pUcHB0TG5DMjNudU9mWU9tekpucG1aeUpfVG9rZW46S0tzcGJRRlNYb2czWDh4SGVLcmNPWHF3bnRjXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

## 二、输入提示词

1. 提示词

```Markdown
用mermaid语法画一个「用户下单」的流程图
```

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzFmZTc2ZGFlMDYxYWUzNTBkOTI1Y2RiMDJjN2VjNjNfRWh3SU9vOXd4dHRtRFVqNVZpVGhLczVnMFlLNHNjM01fVG9rZW46UzV5dGI5NkVEb0U0WFp4R3FYcmNYYTlqbkliXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

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

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MGEzNDAyYzdjYTZkYThlM2RkZGM2ZmZjY2U3YTkyMDlfcFd2N05obHZjOFFmZ252UHlaM2VGM3hxbUprcURMekRfVG9rZW46R0hTVGJnd3ZIb1R1cUZ4WGdBQmNJTlA1bjViXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTc0YjZjNTg1NmNmMTIwNTliYTQ2ZTcyZjgyMTIwOWVfVXZmVDVHU2ZuUjFkRXV4ZnJ5WHAybmJJdTlkNUp0S1dfVG9rZW46U2VpdWI3Mlkwb3FSSUt4SGN4VGM2UlI2bldmXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YWU1MmZmYWI0ZWRmOWZkNDIxMTAxNTQ1ZjU2YjVhMjZfYXQySENKdDJaZU9DVHl0eE93S0szTXlTeHBXb0FRbUhfVG9rZW46RW1hUWJMNUdLbzB0bEd4bnZMMWNWazNJbkZjXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTg5ZjJiZGE1MWRkMDE2OWU5ZTQyN2ZlZGZiODcyYTRfeEJqOHU0M0Q2ZTJXWXhxTmVxbnFpNGsydDJtMXIzYUNfVG9rZW46TVpVTmJJblh6b0ZxNnl4U0F2M2NXdnhjbjhlXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

1. 输入生成的内容

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YThmMDdiZWM5ZGY5YzlhYzdkMjQwN2Q4Y2QyMDRiOTVfbnRhWHlndVRGYWdmMDhkc0lRbjBra2ZWUjhMMFA5dlFfVG9rZW46S2czeWIyYmdyb3Iyc094d09JRmN0Uk83bm1WXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

# 二、类图

## 1、提示词

```Markdown
提示词：使用Mermaid画一个订单的类图
```

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzk0NGNmNjViZTBhNWU2NDQwNmVlMjljYWY1ODUyM2VfYlpta2RweXZRZzE1YmJpRTV5UWN4bTZVVFViaUFLbGxfVG9rZW46V1NNT2J2ekRpb2VCM1B4QW9Jc2NXUjkxblJjXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

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

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjY2NjJjNjJiMjllODYzMDA2NzRlNjA1NjgyNzlhMDZfOFE1dDFlV0VEanBGSmpoTHlkdEJmQnJsaExTNWR0Q0VfVG9rZW46VTNxeWJMbEM0b3dHMHN4djRGV2NmMXhIbkxjXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

## 3、生成结果

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjU4MGM4MjY3ODRkNDdjOGQ1YjIyNDgwZTVjZTg1MzNfSUpmRVR5YXhPWWM5bDhXNG96S1pJWUxZRFN1VzB5MmhfVG9rZW46Wkp6YWJCZ1d2b2c2NWh4UGtNNWNtZjM2bmc4XzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)

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

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWQ1YjRhOTQ3NzdmM2E1NmM3NDA4NDc2MWZlMDAwNTJfU3JRNXFLRDF3ZjJwSUVzanU2MG5NUzlIdklIUFhWUDBfVG9rZW46TVRlNmI1RjFmb0JFUjR4dVlyZ2NHNGlHbnpkXzE3NTY3MTU2Mzc6MTc1NjcxOTIzN19WNA)