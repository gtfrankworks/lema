---
title: deepseek私有化部署
createTime: 2025/09/01 09:45:31
permalink: /ai/officeproject/1o9rr53c/
---
## 一、知识库搭建步骤

### 1、下载客户端下载 | CherryStudio【https://cherry-ai.com/】

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MzFlMGZjN2Q0NjIxNzkyY2RkMzk3NzYwMDYzODYzMjNfS2Nhb1V0ZXlJdUhWZVNQNHoxcE1SalBTVjBQMXo0UFpfVG9rZW46VXA2S2JYOFY1b1IzMkt4WllwMmNlb1NBbkVmXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

### 2、安装客户端

1. 根据不同的版本去下载相应的客户端

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjZiNTQzYWEzZWRiMTNlNDYyNGEwZjRkYjM5ZGNjNmZfUjRCN3Jqd1podDY1eDY0UWVDbkhDYUV0bTU1Z0F2VkNfVG9rZW46TXU5bmJKVlk4b3FMSU14c1R1M2NjNmd5bnBiXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

## 二、配置cherry studio

1. 点开设置

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ODlmOGFlNTNjODgwNzA3ZmFiMDg2OTA4ODgzMWM1OTZfeGloeEtJRkE0d2tYaFlIYkRvVUxRZ3Zib1BFMzB1NG1fVG9rZW46QWgxR2J2MkIyb3ZXQ3h4TG5JMmNmMUVNbkRiXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 配置你的类似服务提供商

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUzOTU0NTRjYzg4NjgzNTEzZTFhYzMxM2YxZWI2NzdfaUV1VHVXMFJYN2hhWVRVUFc3QUsyMnZWR05PODFNSUZfVG9rZW46TzdQdWJoU1BXb0dNSVN4MXM3WWNiWHBWbk1nXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 这里我们选择硅基流动

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzdkMWViM2RjNmFkYjFjZGQ3Y2UyNDg0M2JmNzhlZmNfQjVaR1ltd1hSRjVsTXBKRTBscTdZcHR5SmRxUzFwd2dfVG9rZW46RVJScGJiWkxXb2dLVmN4TGtpeGMyU3VabnpiXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 生成api的key【https://cloud.siliconflow.cn/account/ak】

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzMzNjJkZDlkMGMyMDI3MDhkYmVmN2YzMmM2Y2IzYmZfMTBxNkdlWEh2c2RlWm5haXpzR0JLQ05oc1BGdkpSY3VfVG9rZW46WHhtU2J3d1dkb1JvNDB4dGVDUmNlUnRNbktmXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 填入key 和相应的值 模型

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTdmMTg1MzA3NDUwMWI1NjAxMjRlNTRlNTBlYzk0M2VfNlk2emtiSzdZalNSaXR5Ym5JUWtFV0lUOWRSdzY5YnNfVG9rZW46RURNSmJJYWtlb2hGelV4RkNyWGNoTXFkbjJjXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 复制模型的值到上个模型的id节即可

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjMzYTIwOGU0NTRiOGIzMTI0YjM2NGJhMDc1NmQ5Y2JfaGJRZWowa29yeTJETEl2RjVaTnRWYncwSEwwWnprY2RfVG9rZW46WmFrNGIzOXk4bzJ5ajZ4c01PVGNxUUlrbm1jXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 看看是否配置成功

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MmQ3NGEzYzE5NWFjYzBkNDhmNmNhZWU0MjU4MjM3ZjFfMVBsS3hKdG5hRnJmTWZiYWpyZGgxenFNbWx0ZGNYTThfVG9rZW46RGw0OWJPek1xb09Sb0t4NFZwR2NoQTFYblplXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 如果这类是做知识库的时候，这里的模型需要向量数据库模型

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=OGE1ZDVkZTgzYjNmMjU5N2VmYjRjMDhiYzNhMTAzMTlfQVd0cmhWQm0xY0JGRERBREpYZnZMbjM4bXlPOGhIV2FfVG9rZW46S2lBdWI5NlB1b3N2Ulh4TFB3cGN5M0I5bmlnXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDJhNWNlODE2MmMwMzkyMWNmMTc3NmIxNzRjOWMzNzJfZlBlcjNqc2hGVUw0YUlIOG9vNWlZR1FGbnk4MTZmc3VfVG9rZW46RUxvcWJrZ1V3bzRaYnR4QUtyNWNhYm5VblNiXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

## 三、配置知识库

### 1、在cherrystudio中配置

1. 点击cherrystudio的知识库按钮

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=OTE3ZGQ3ZTA1YjNmNTU0YzFkNDc3NjU4N2RhNTA1Y2RfSjNPSHFrN1RzRHA2TUdlb3FBeWQzZUxmcEE4bFhDZURfVG9rZW46VTlGSmI0N2dhb0VveER4aGQ0TmNoU3ZDbmtjXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 填写配置

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjI5ZGJkNThhNGVjNWQ4OWJhYTU1ZWJiMjA0MDRhNGRfalRsMTZJVFhJd0VDYjNJTVdHSmZYSzh6R3dDS0RUVlhfVG9rZW46SzFRUWJPdllubzM5Q3p4cDlIZWNraW0wbnBnXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 填写如下

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzMxYTk2ZDgwZGMwNjM4MmE1ZmVlMGJiMzI5MDRmYjZfa0ZIcUhkTGxjM1Q0a3pLQ3RLdWd6ZGM4U0lyRFRFNnVfVG9rZW46UmhEVWJBeElEb0I1QVl4S2JFaWNGOEdtbnlZXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 选择添加文件

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjE2NDI0YWVhOTgxMmU1Y2FjMjExZGUwNzBmNzkzMmNfWUt5NkZNYXBoUVBoN0wzU2xDQzBjcUFtN0FNeFFsVHBfVG9rZW46RWJXc2JWMFV4b3Y3SW54cmFkNWNKQkttbnBjXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 测试

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmJhMjUxMWEyZGU2MDBjYWMxZWE5YmRiMzBlNTdkNjZfRGRkS2pHekE2R0ZLUmNYSzRNek5hQlQ0THN0dnB5VFZfVG9rZW46RXdDWGIwZTJvb2pYSGJ4eG0zRmMwU1RqblhlXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

1. 从你的知识库里面会的内容

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmVkNTU0MWFmMGZiNDYxNTQyODYzMmJiNTliNGY1NDlfVUhHRUJIVjZyMkV6Vlo3eGhsQnlsQlBCSll6STlnc3hfVG9rZW46SlpJcWJWalgzb3l4Q2d4Z1B6RmM1RFVLbkdoXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzVkOTk4ZTE3MzQ2YzIyY2I4MzZiNzQ5N2U5NGY0ZTVfUFJzR0Zxb3E0MEpiNVBDeXFmajhBTjdlSGZ0RW1uaVdfVG9rZW46UnY1Z2JRWVFrb1c1UWh4Z3JPa2MzczJMbnVkXzE3NTY3MTU0OTI6MTc1NjcxOTA5Ml9WNA)