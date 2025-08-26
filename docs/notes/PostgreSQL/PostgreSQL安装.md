---
title: PostgreSQL安装
createTime: 2025/08/26 14:38:11
permalink: /PostgreSQL/8sqd5rls/
---
### **一、 Windows 上的安装**



在 Windows 上安装 PostgreSQL 最简单的方法是使用官方提供的 **交互式安装程序** (Interactive Installer)。

**步骤 1：下载安装程序**

- 访问 PostgreSQL 官方下载页面：https://www.postgresql.org/download/windows/
- 点击 "Download the installer" 链接。
- 选择你需要的 PostgreSQL 版本和你的操作系统版本（32 位或 64 位），然后下载。

**步骤 2：运行安装程序**

- 双击下载的 `.exe` 文件，开始安装。
- **选择安装组件：**
  - **PostgreSQL Server:** 数据库服务器本身，必选。
  - **pgAdmin 4:** 一个强大的图形化管理工具，强烈建议安装。
  - **Stack Builder:** 一个用于下载和安装额外工具和驱动程序的工具。
  - **Command Line Tools:** 命令行工具，也建议安装。
- **选择安装目录：**
  - 保持默认即可，通常是 `C:\Program Files\PostgreSQL\`。
- **设置数据目录：**
  - 这是数据库文件存储的位置，保持默认即可。
- **设置超级用户密码：**
  - 为默认的 `postgres` 用户设置一个强密码。请务必记住这个密码，它将用于连接和管理数据库。
- **设置端口号：**
  - 默认是 `5432`，通常不需要更改。
- **设置区域设置 (Locale)：**
  - 选择适合你的区域设置，通常保持默认即可。
- **完成安装：**
  - 安装程序会自动执行安装过程，完成后会有一个提示。

**步骤 3：验证安装**

- 启动 **pgAdmin 4**。
- 它会要求你为 pgAdmin 本身设置一个主密码（与数据库密码不同）。
- 在左侧的服务器浏览器中，你会看到 "Servers" -> "PostgreSQL" -> "Databases"。
- 点击 "PostgreSQL" 并输入之前设置的 `postgres` 用户的密码，即可连接到数据库。
- 你也可以打开命令提示符（CMD），输入 `psql -U postgres`，然后输入密码来验证。

------



### **二、 Linux (Ubuntu) 上的安装**



在 Linux (Ubuntu) 上，最推荐的方式是使用 **`apt` 包管理器**。这种方式能确保你安装的是稳定且与你的系统兼容的版本。

**步骤 1：更新包列表**

- 打开终端（Terminal）。

- 运行以下命令更新你系统上的包列表：

  Bash

  ```
  sudo apt update
  ```

**步骤 2：安装 PostgreSQL 服务器和 `contrib` 扩展**

- 使用 `apt install` 命令安装 PostgreSQL 服务器及其常用扩展。

- 运行以下命令：

  Bash

  ```
  sudo apt install postgresql postgresql-contrib
  ```

  - `postgresql`: PostgreSQL 服务器核心包。
  - `postgresql-contrib`: 包含了许多有用的扩展和工具，例如 `pg_stat_statements`。

**步骤 3：验证服务状态**

- 安装完成后，PostgreSQL 服务会自动启动。

- 你可以使用以下命令检查服务状态：

  Bash

  ```
  sudo systemctl status postgresql
  ```

- 如果一切正常，你会看到 `active (exited)` 或 `active (running)` 的状态。

**步骤 4：访问数据库**

- 安装过程中会创建一个名为 `postgres` 的 Linux 用户，这个用户被授予了 `postgres` 数据库超级用户的权限。

- 切换到 `postgres` 用户以访问数据库：

  Bash

  ```
  sudo -i -u postgres
  ```

- 现在你已经以 `postgres` 用户的身份登录，可以使用 `psql` 命令行工具：

  Bash

  ```
  psql
  ```

- 你会进入 `psql` shell，看到 `postgres=#` 的提示符。这说明你已经成功连接到数据库。

- 输入 `\q` 退出 `psql`。

- 输入 `exit` 退出 `postgres` 用户。

**步骤 5：创建新用户和数据库 (可选但推荐)**

- 不推荐使用默认的 `postgres` 用户进行日常操作。你可以创建一个新的用户和数据库。

- 以 `postgres` 用户身份进入 `psql` shell：

  Bash

  ```
  sudo -i -u postgres
  psql
  ```

- 在 `psql` shell 中，创建新用户（例如 `your_user`）和数据库（例如 `your_db`）：

  SQL

  ```
  CREATE USER your_user WITH PASSWORD 'your_password';
  CREATE DATABASE your_db OWNER your_user;
  \q
  ```

- 现在你可以使用新用户和密码连接到数据库了：

  Bash

  ```
  psql -U your_user -d your_db -h localhost -W
  ```

  - `-U`: 用户名
  - `-d`: 数据库名
  - `-h`: 主机名
  - `-W`: 提示输入密码

**安装完成！** 现在你可以在 Windows 或 Linux 上开始使用 PostgreSQL 了。如果你需要使用图形化工具，可以安装 **DBeaver** 或 **DataGrip**，它们提供了跨平台的良好支持。