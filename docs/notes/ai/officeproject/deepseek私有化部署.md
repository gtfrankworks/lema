---
title: deepseek私有化部署
createTime: 2025/09/01 09:45:31
permalink: /ai/officeproject/1o9rr53c/
---
目前deepseek的服务器有的时候繁忙，因为访问量太大，目前deepseek也是支持私有化部署的，自己可以根据情况进行私有化的。

## 一、算力平台

1. ### 腾讯云

https://cloud.tencent.com/

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDkxYzkzOTdjZjU4YTU2ODhkNjhiNTdkOTg3M2Q4NDBfVHRIcW1za2h0bDhjUzU2SUNxdjNVOXJ4VVNPMWtIeDJfVG9rZW46TVJ3a2JOZVdZbzI4cFd4dkVtcGNlZGZhbjFnXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

https://cloud.tencent.com/act/pro/deepseek2025?from=25581

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=M2JmNzYxMTYwZGRjNTM4MzRhMWNjNTk2ZWVhN2Y0NDdfYXlsdWc1Mlo4OG52aEF4Zk91Qzh6TGNvcmlCb2lrbW1fVG9rZW46U2I5YWJLeEdjb2FHQWN4ckR0OWN0amEybnhlXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

https://cloud.tencent.com/act/pro/deepseek2025?from=25581

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=OTI4OWNmNzRlMDYyNDE0NTg5ZmEzMGUzYzBjOWQzYTNfYWJuVVExeXBIV1ZJaWFWd1I3MDFBbUlaYkZwQm85cGJfVG9rZW46WTdBSWJQUmlmb1c3cXV4Nms5Q2M4NjhhbnBiXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzA5YzAxZGZlYWYzMzZlOTAwNDJiZTE2MDlmMjQ4M2VfTkVmbU92SHJ2M1VIc3RtRjVURkpmTm1tazJVb0p1dlRfVG9rZW46RDdLaGJCR3gyb21tekp4V2RqSGNpUGlybkc2XzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. ### 阿里云百炼

https://bailian.console.aliyun.com/

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=OTJkMjA1MGY0M2Y3NjMxZjc4ZWM3Y2Q2OGFiZjk0YzBfQ2RJbDFlSFdPNjlvQTdBcnZJcHVHbUJJdjY3RVR5U0FfVG9rZW46WngyamI0VXY4bzJkMjl4bnQycmNrNk9VbkZoXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

**创建一个自己的应用：**

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NjdlMjkyYWVkZDQ0ZDMzYjM5YmE1ODU1ZjljNDNjYzdfWkk4eUFKV3R4Vk5HWUU4UlA1M0dCcEI5YXBZQmduUXhfVG9rZW46UW1SNGJWV0R0b291dHd4eDdCWGNMUWM1blhlXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

例子：

```SQL
# 角色设定

你是一个知识达人，你的任务是根据用户指定的知识类别来生成选择题。

# 目标

题目要一题一题生成，不能一次性全部生成。用户每回答完一道题后，要给出用户回答是否正确。

回答正确的话，输出"回答正确"，不要给出解释。

回答错误的话，输出"回答错误"，并给出正确答案。

再生成下一道题，直到总生成的题目总数达到10个，游戏结束。


# 规则

- 第一次用户会提供一个知识类别，如果没有提供则随机生成一个知识类型，如：中国历史、IT知识，然后开始游戏
- 每次根据用户的回答，判断回答是否正确。
- 初始分值是 0 分，每次交互会增加或者减少分值，直到分值达到 100，游戏通关，分值为 0 则游戏失败。
- 每次用户回复只有正确或错误两种情况
  -10 为回答错误
  +10 为回答正确

- 游戏结束后，根据分值的高低，生成一段总结性话语，分值越高，评价越好，反之，评价越差。

- 如果通关，生成一首喜庆欢乐的古诗来歌颂

- 如果失败，生成一段悲伤凄凉的话来表达

# 输出格式
{用户回答}

回答正确或者回答错误，{正确答案}

得分：{+-分值增减}

当前分值：{当前分值}

## 例子
### 例 1，历史类别的知识
Assistant：
游戏开始，历史类别的知识，请开始答题吧

题1：唐朝的开国皇帝是谁？

        A. 李世民

        B. 李承乾

        C. 李渊

        D. 李虎

回答错误！正确答案是: C

得分：-10

当前分值：-10

Assistant：
题2：《天工开物》的作者是谁？

        A. 施耐庵

        B. 宋应星

        C. 王阳明

        D. 孔子

回答正确！
得分：+10
分值：0

Assistant：
题3：伟大的思想家孔子是生活在哪个时代？

        A. 商

        B. 秦

        C. 春秋

        D. 战国

回答正确！

得分：+10

分值：10

...

### 例 2，唐诗类别的知识

游戏开始，唐诗类别的知识，请开始答题吧

题1："二月春风似剪刀" 出自以下哪首诗 ？

        A. 画

        B. 风

        C. 咏柳

        D. 送元二使安西


回答正确！正确答案是: C

得分：+10
当前分值：10

Assistant：
题2：《将进酒》的作者是谁？

        A. 李白

        B. 贺知章

        C. 王维

        D. 孟浩然

回答正确！
得分：+10
分值：20

Assistant：
题3："春眠不觉晓" 的下一句是什么？

        A. 处处闻啼鸟

        B. 夜来风雨声

        C. 离离原上草

        D. 白日依山尽

回答正确！
得分：+10
分值：30

...

## 注意事项
- 生成的选项，正确答案不要总是放在同一个选项中，要随机，切记！
```

1. ### AutoDL算力云平台

https://www.autodl.com/home

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MzdjY2QyYjA1YTZiNGE1NjgxNjhjYmRjNWZhZWViNzNfRU05NUtpdDRMVVBqZVc4ZlA1M0xBMEdEd0Y3dExiWnhfVG9rZW46WnBIcWJQWTBmb3lmcER4N3k2ZmMzcG44bk1kXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

租用算力：

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjZiMzVlNmY1YWY4YmM5YWU5MWZkMTcwMzkxYjkwZWVfMklNekFDZ2pwZUhISHdmNWxZVVI0NzM5ejZWTE9WRUxfVG9rZW46T01EVmJnQThnb0JzSzF4aFNiR2N1cVBNbjNjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. OneThingAI

https://onethingai.com/

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YmVhM2EyNTcxZTE2MDk3M2U5YmU2MTA2MzdiNmE0N2JfTWlBNk51MzNnaUVVN0ViOXNiNjlDM1RXM2N3dENiZHdfVG9rZW46QXJTdWI2T21ob2czQTl4aVRBN2NuSnJJblRmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

## 二、基于LM Studio部署

1. https://lmstudio.ai/  根据自己的系统选择下载的软件，然后进行安装

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NDhiOGQxODUyMTZkMTFkOTQ2OWQ3MDM1NDAxYzA3OTZfYmI2UmFDQUFmTVhpV3BweXV1WjRramJJbDNLdGtmOHFfVG9rZW46UHhQMWJCdHR4b0Q5Umt4dko0aGNaOFc4bkxjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 安装LM

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2NiMGY3NWQ0NTM5NjM0YTg4MzNhYjEzN2JmZmJkZGZfZVlEVkw4TG1DMzNRNGhDREJVNXJ2eHMyUUFKOGZZemdfVG9rZW46SDNGWGIwSEU3bzZkdGR4SVF5MGNJR0NxbnlmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmUzN2YzNzg1MDQzMTE0YmVkMzQyZmY1OGI5ZWJiZDdfc3pTUVVBVmFJVnJzMW5hRXNmUkx2eHEwYk5VTGRFRlFfVG9rZW46TFpKT2JYdUh6b2lqMm54UWZra2N6bFpGbkFoXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MGQ2MTEyNmEyZmJmYzc1OWY1YTU5YjdjOTE2MGI2N2JfQThvbm9URnFhRkNWZjUxMm82VXFYaVJ2MWthTXlGaDdfVG9rZW46Q2VFdWI5b25Kb0pBU0h4TGNhcWNlS0FGblZlXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

## 三、模型的下载

1. 打开https://www.modelscope.cn/home 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=M2M5NDg1MmUwYjAxYjYzNDE1YzZiMjY1MTAxZGI0Y2VfVEF5eDNSV2R6UHhnWnhPVkdNVXJ3Yk1Ya2NMN3VsUzRfVG9rZW46UnMzeWI4MUllb0R5WEh4enh5U2Nyam9Cbk9iXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2Q4ZWFlNmI3NjU1YjAxOTM2ZDAwNmZiZmZlNzM5ZTlfWEVGaEQ4NVU4U0c4RXR2Vjd6UUh0QXdncUVPMzNSSmpfVG9rZW46WEgwcWI1R3NWbzltSnp4NTdVaGN3QkVUbnFjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 注册登录

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzZkNWNmZjYzYmUxNzZjMWIzZmRhOWI1MzMwZDU2YjVfaGszMDU5dVVJYjQ4YUt5OGxGa0VhVXByelQzN2V0b2NfVG9rZW46S3ZoYmJyUmpOb0MzSXh4a1FTQ2MzeHpTbmVmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 登录进入页面

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NWFkMjg3MTA2ZjgyNGE2NDAxZmI0NzNlNjNlZjY0NzZfQ3B2ZUZGMkx0SDRGdUdycFJROEdodHY4M1g5MGx6YmZfVG9rZW46VUo4WmJjWUJCb2xXZUF4SWxpemNzUFZ0blQ4XzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 搜索deepseek的模型，但是是结尾的名字一定是gguf的文件

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MmIxYjM4ZjY4YTc1NDgyZTk1OWExYTdiZmJjNjQ2N2JfQmpoSVVwVGNScjJjb0dhaUhKZ0F3TzE4RDdCQUpidGtfVG9rZW46SGpodmI4MVY1b3lDRGt4a0hsd2N3M3JubndjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 下载文件

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjczNjJhYTBmMmIxZTVlOWE5ZjIxZDkzODkzODU0NmFfcHFJWGthd0Zjd3NpdVdGQllaOFVkMFJhVkdaZVYzOTZfVG9rZW46V1FwVWJkSXhLb1lKeXh4SmFCNGNyaldwbjZkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 下载好的模型最好放在英文的目录下 C:\lmstudio\model\deepseek

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjc4NDBiZjM4NjVmMjQ5MjFjNzBlZTVmOTFiY2M3MTZfRXJ1UXZKcXdxcTZ6V0JnaEtVOUZHYk9jM0NUWWVzN2RfVG9rZW46U0tqNGJTeUNYb0ltWld4bDd6cmM4R3YwblRnXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

## 四、配置我们的私有化模型

1. 选择模型按钮

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzExOGU2ZGU5YjE0OTM4NTZlZWViMWNlNTMxOTYyNzJfTGhLQjM3QktKZ2RvczdFQkFTa3QxUm5rcnZMUE96NGdfVG9rZW46WUdBMWJIUmpObzFWcmZ4OVpnUmM3QXl4bndmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 添加模型

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTg3NTA3NmRiZTkwNTdhY2MzODU5ZDM2ZjBmOTA3YWJfVktDVXZVODR1TVl5QkhNeHVBVmJFVXBtOXM2VXA2UDNfVG9rZW46SzB5OGIxOFZPb21aSE94cm9YZWNZUzdtbmloXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 选择模型的是一定要选择模型所在的一级目录，不然加载不到，C:\model\deepseek  我们选择modle 出现这面的界面说明你目前配好了

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmE5MWE4NDI5YTg0MmFlNjRjYTM3YTRhN2M1MTY1MDNfa3NoTjZRbmNtck04clk0U0paa2J4bzZDdnRHUjRLbzNfVG9rZW46R1BFdGJuQnVEb3lzcXZ4am16ZWM2REk5blRnXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 然后选择模型回到对话窗口

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmZiZDEyYTJjZmU4Y2Y1N2E0MGJiNDVkZjBiYzA4MjlfNGNTOFFWbUdZVDRKODNwMjY1S0NEdEY1ZWJVWTlwT2hfVG9rZW46Q2dSNmJmcHlSb0tEZUp4UWFucWNEd1lsbmIxXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 然后就可以使用了。

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YThmOTZhODczMmQ1OTVjNmExOWRkOTljMzRjMzc0ZTVfbnBiS21wUk1mMDZtUVVzTTA0TEE4VUh1bXcwVlNqZjVfVG9rZW46WXpubGJzaEhSbzhGMlp4bzBtM2N2SmRabmhkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYyYzUzZDZmN2IxNDIwODkxZjNkOGE2NWIxMjQ4YTNfVGUyNjA1c0EzZUp6WHZaenB1R0Z4Sm15TUw0cVNXVVNfVG9rZW46RW1mWWJBY2pDb2N3VlR4REhPVmM3RVA5bjdiXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. 如果电脑配置不行会出现下面错误

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjRjYjA5OTVjMjVlOWIyZmVkZDA1NjY1YTM1NjljOTlfeGdCc21QeVQ4dW0yeGJKZWJHMEx3MzhEeU5aOUNqa0JfVG9rZW46RGdUYmJuWFNMb1R5U2x4RkZzVWNFQk44bkhmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

## 五、基于Ollama本地部署

**官网**https://ollama.com/ 

**下载地址：**https://ollama.com/download/windows

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MTk1MjRiZTgyNmJkY2MwMTExZDVmOTIyN2FhOGZjYjBfS0Q2TnZxTXBRek52N1ZvQm8yaWtmOUQ2UkRkZ01xSElfVG9rZW46SXB1Q2JTaGxub0ZoMUx4ZXlnNGNvQlIwbkdjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

**建议使用下载加速工具，极大提高下载速度**

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQzMWIzMzgxODNiZmYyYjBjOTg2YTMxODkyYzg1ZGRfTzFldG9EcndCWWRYV2ZpT3IxSVhIcU5SVVJTTURzcGpfVG9rZW46VnNyc2JMTGVKb2R4Ylh4UEo5T2NDdURDbnNkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

**运行下载后的安装包**

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MmFmNjY1NjM0M2I3OTQyN2MxMDRjODc5MjdmMmI5NjRfT2hwa2V0YXFVZXo3ZVVKS01IVUFaYmJRTmpGSzJuWGNfVG9rZW46UEdvbmJnWk9CbzloTHd4UEkyZGMxYlNKbnJkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

1. ### 点击“Install”开始安装

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NGM2MTVlZjBlMDY5MmNkNmMxZTY2ZmZlMGE0MmJlY2Jfa1hMS0pLTVFvUGJ0MmE1VEtueVR1eTl3REhkUVdNRmNfVG9rZW46TEFKamJGZ00yb0s5MER4WFBlYmNUUG9DbnNmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. ### 验证是否安装成功

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTNiOTUxYzhiZThjODAyZWY4YjMxYzExNmIxNmQyOWFfOFlDaFpxSFhYWG5Gb1g3NVNSQTV4enVrUmVrV0p0NzFfVG9rZW46VEdZQ2JTdnJQbzlScnh4dzdXbmNpdlU2bjFkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

**我们也可以通过windows命令窗口查看是否安装成功**

**打开命令****窗口的方法：**

 

**在运行中输入 cmd**

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=M2E4NTYwZjQzYzIzMTYzZjJkNTM2NmM5NTlkNTc5ZmZfQXVZVWRuenFHZ3Y3elV0d29QaDZUY3lwMVYyT1IxN01fVG9rZW46TlNLWWI3R29yb1FhR0l4VFFsWGN3Mnk5bndoXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

 

**然后输入：ollama ,显示有很多可选命令表示安装成功了**

 

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjM5ZmFjYzQzMDQwZGQxZWRmYTAwN2ZmYjMwMzE3OWVfV09IUUtFcFl3enE1Q0s1WnMzSUdpWFFYOWtpc1Q2SU9fVG9rZW46SEQ2OWJrMzlOb3VsNWJ4Z2pxbGNoTE1qbk1jXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

1. ### 下载 deepseek-r1模型

下载地址：https://ollama.com/library/deepseek-r1:1.5b

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NWZhZTcyMGJlZjFhY2U4YWUwNDE0NWI5OWUxNjVkYWVfNzdRT2lydW4xZWZZV3pwZjhIS1pRWDdMUVZ2NlN2eU9fVG9rZW46SmE0RGJtUmFXb2Vvb1B4RDQ2amNqQUMzbk1mXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=M2U1ZmNjNzI1MTQ3NTU4NWFlZmIxYTllNjI2Y2MyMzBfSnVQaE03eDdER3YzbTNMeG1ZdWVLTk9vUHQ2RUlDR0lfVG9rZW46THVVSmJWS0xBb2dza0x4NE55c2NOdFFIbnZnXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

根据自己显卡配置，下载对应的模型

*别问我满血版可以安装吗？你有经济实力是可以安装的。*

我这里给大家演示**1.5b的模型，基本上办公电脑、学生游戏笔记本、家用电脑都能安装**

```Markdown
Ollama默认要求安装在C盘不可以修改
但是：模型下载位置是可以修改的
下载模型前，可以设置模型存储位置
```

#### 3.1 修改模型默认存放位置

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Njc0ZWY4ZGQ3MjQwZTI2MzE4MGZjZjQ3OTYzMTZlMmZfb1hOdmpKMno5b2ZNN1o4cXl0TUo3Rkw4SUVSWVh3ZXpfVG9rZW46R1EzU2IxRTdzb2ZnQk94aXIyU2NaVVplblFUXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

**在此电脑鼠标右键，点击“属性”**

 

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NjcyODc1YWQ1NDQ5YTlkZTFlOTYxNTFjMmI4NjgyNjVfQjh4RzVQdlBNaGpTcTdtU2Jhc2g0d0l5M3dxN05KYXlfVG9rZW46QTZTZmJ3Z3VZb254WXF4T2NWWmNWR3V6bm1kXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YWIyOTAxODgwNDc1NGJiZGVlMWU4MGQ5ZjNkNTBiMjlfdDBRTGNrQ3JMOEZ0N0hHem02ekV5dVN6cVdHRWQ0QUVfVG9rZW46VEZHMGJvNWlub2hmU2d4RURkYmNNNklhbnhjXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=Zjg0ZGY5MjUzNDI2MzkwMzFlZjg1MDBmYzU1MDczNTZfTlVnd0E1UzVzTzlKZk9QWE84VGVaZDlESTcyZjliZnFfVG9rZW46RmNIV2JWeGdHb3NnNWx4dU9yVmNMVFA5bnRlXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ3Y2FkNDJjNGE1OGNjN2ZmNzVjNGY5ODE0NGRiYzhfbFJmajFTdk1jN0xVQ0twbmkwakhxejllYkxTWGl5cFFfVG9rZW46TFNZdWJuVkgyb2RvZFl4SFNNcGNGQkwzbkJnXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

#### 3.2 选中下拉选项，然后点击复制下载命令

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmJiZjc0M2VhODVhODVjNzA0OWY4ZmU1OTYzNjlmNGFfbUo2ekFwMjM5SjlTUDVEbTVTZU9UclBBQUhybWMzbXVfVG9rZW46Qm04VmJIeWwyb25QM2l4U0lQa2NzWnREbjdkXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

#### 3.3 打开电脑命令窗口,  然后粘贴命令到窗口，回车

ollama run deepseek-r1:1.5b

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjU3ZDA0MWMwZWNhMTZjNTFhMzQwMjA5NTZhYjY5Y2NfWG9Ic3VYRHFZS1FnZ25WQ05qYVpPOEtoaHhMZG5uRlRfVG9rZW46TEFidmJaSEJib1dtVlp4UkhtR2NjaUhIbjhyXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

下载完成模型后，可以直接在命令窗口进行提问

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=N2ZmNmNlZjIxOGM5ZTZmYzg2YWNhNmE4ZjNhNTk2YjlfZXBKRmpGaEEyMTU1ODB1VnZsM0NUeXpOd3JXTlpkSjBfVG9rZW46SFN2Y2J0UFR5bzJZaUx4c0JZcmNwZmdvbkpiXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

模型默认下载存放位置在

C:\Users\xxxx\AppData\Roaming\anythingllm-desktop\storage\models\ollama\blobs

**退出命令是  ctrl+d或者输入斜杠+bye** 也可以直接关闭窗口

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQwMDUwN2NiZmRkZDU5MmJlYjExM2ZjN2IzMTBhM2FfZTBJam5kc3lPTHExQWI3UEpGRzNhQ3AxaGxTQ3NTSFRfVG9rZW46SkxVdGJ2Qm51b1lFS094dWlXN2NPTlB0bk9jXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 

#### 3.4 卸载模型方法

**如果你安装了多个模型，需要卸载某个模型，方法如下：**

打开命令窗口，输入  ollama rm xxxxxx (xxxxx是模型全称）

 

![img](https://pimpfzadssc.feishu.cn/space/api/box/stream/download/asynccode/?code=NDRlM2YwYmFhY2Q1YzFlYThmOGM5Y2RmNzAwMDc5MmZfRzFGY2xSQnM1aThWS2pzTWd1TVRWQTl4SHU2dmNpR3pfVG9rZW46SkhSeWI5dUpBb0lkUjZ4QmpzamNLYjZobkRmXzE3NTY2OTExMzg6MTc1NjY5NDczOF9WNA)

 