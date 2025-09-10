---
title: GitLab的安装
createTime: 2025/09/10 15:43:29
permalink: /tools/git/2maxfdgy/
---
# GitLab

# GitLab

## 一、什么是 GitLab？

**GitLab** 是一个基于 Git 的 **DevOps 平台**，提供从 **代码托管**、**版本控制** 到 **CI/CD（持续集成/持续交付）**、**项目管理**、**安全扫描**、**运维部署** 的完整解决方案。它最初由乌克兰开发者 Dmitriy Zaporozhets 和 Valery Sizov 于 2011 年创建，现在由 GitLab Inc. 维护和商业化。

与 GitHub、Bitbucket 类似，GitLab 也是一个 Git 仓库托管平台，但它最大的特点是 **开源可私有化部署**，适合企业内部搭建自己的代码管理与 DevOps 平台。

------

## 二、GitLab 的主要功能

1. **代码管理**
   - 基于 Git 的版本控制
   - 仓库托管（支持私有/公共项目）
   - 分支管理、合并请求（Merge Request）
2. **持续集成与持续交付（CI/CD）**
   - 内置 **GitLab CI/CD**，通过 `.gitlab-ci.yml` 定义流水线
   - 自动化测试、构建、部署
   - 与 Kubernetes、Docker 等无缝集成
3. **项目管理**
   - Issue（任务/缺陷跟踪）
   - 看板（类似 Trello）
   - 里程碑、甘特图
   - Wiki 文档
4. **安全与合规**
   - 代码安全扫描（SAST、DAST）
   - 依赖分析（Dependency Scanning）
   - 容器安全检查
5. **运维支持**
   - 内置 **Package Registry**（类似 Maven/NPM 私服）
   - 支持 Helm Chart、Terraform 等基础设施即代码
   - 监控与日志（与 Prometheus/Grafana 集成）

------

## 三、GitLab 的优势

- **开源可部署**：相比 GitHub（主要云端托管），GitLab 可以安装在企业自己的服务器。
- **一体化平台**：从开发 → 测试 → 部署 → 运维，GitLab 提供全链路支持。
- **权限与安全**：支持精细化权限控制，适合企业级开发团队。
- **社区版与企业版**：社区版免费，企业版提供更高级功能（如高级安全扫描、支持 SLA）。

------

## 四、应用场景

- 企业私有代码托管与管理
- 软件开发团队的 CI/CD 自动化流水线
- DevOps 一体化平台
- 安全合规要求较高的企业内部研发管理

------

## 五、GitLab 与 GitHub 的对比（简要）

| 特点     | GitLab                    | GitHub                               |
| -------- | ------------------------- | ------------------------------------ |
| 部署方式 | 云端 + 本地私有化         | 主要云端，私有化需 GitHub Enterprise |
| CI/CD    | 内置 GitLab CI/CD         | 依赖 GitHub Actions                  |
| 开源性   | 开源（Community Edition） | 核心闭源                             |
| 定位     | DevOps 一体化平台         | 代码托管 + 社区协作平台              |

## 六、GitLab的安装

https://about.gitlab.com/install/

```shell
sudo dnf install -y curl policycoreutils openssh-server perl

# Enable OpenSSH server daemon if not enabled: sudo systemctl status sshd
sudo systemctl enable sshd
sudo systemctl start sshd

# Check if opening the firewall is needed with: sudo systemctl status firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
sudo dnf install postfix
sudo systemctl enable postfix
sudo systemctl start postfix

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash

sudo EXTERNAL_URL="https://gitlab.example.com" dnf install -y gitlab-ee
# List available versions: sudo dnf --showduplicates list
# Specify version: sudo dnf install gitlab-ee-16.1.4-ee.0.el7

EXTERNAL_URL="http://10.10.1.150" dnf install -y gitlab-ee
grep 'Password:' /etc/gitlab/initial_root_password
```