---
title: Maven 环境设置
createTime: 2025/08/20 13:22:06
permalink: /tools/maven/tv6opypp/
---
- ## 环境设置

  Maven是一个基于Java的工具，因此最首要的要求是在您的计算机上安装JDK(要求1.7或以上版本)。

- ## 验证计算机上的Java安装

  打开控制台并执行以下java命令。

  | 操作系统 | 任务          | 命令                            |
  | :------- | :------------ | :------------------------------ |
  | Windows  | 打开 命令窗口 | c:\> java -version              |
  | Linux    | 打开 终端     | $ java -version                 |
  | Mac      | 打开 终端     | machine:~ joseph$ java -version |

  让我们验证所有操作系统的输出

  | 操作系统 | 输出                                                         |
  | :------- | :----------------------------------------------------------- |
  | Windows  | `java version "1.8.0_231" Java(TM) SE Runtime Environment (build 1.8.0_231-b11) Java HotSpot(TM) 64-Bit Server VM (build 25.231-b11, mixed mode)` |
  | Linux    | `java version "1.8.0_231" Java(TM) SE Runtime Environment (build 1.8.0_231-b11) Java HotSpot(TM) 64-Bit Server VM (build 25.231-b11, mixed mode)` |
  | Mac      | `java version "1.8.0_231" Java(TM) SE Runtime Environment (build 1.8.0_231-b11) Java HotSpot(TM) 64-Bit Server VM (build 25.231-b11, mixed mode)` |

  > 如未安装JDK，请参考我们的[Java教程](https://www.cainiaoya.com/java-rumen.html)

  > 我们假定Java 1.8.0_231-b11作为本教程的安装版本。

- ## 设置JAVA环境

  将**JAVA_HOME**环境变量设置为指向计算机上Java安装位置的基本目录位置。例如

  | 操作系统 | 操作                                                         |
  | :------- | :----------------------------------------------------------- |
  | Windows  | 将环境变量JAVA_HOME设置为C:\Program Files\Java\jdk1.8.0_231-b11 |
  | Linux    | export JAVA_HOME=/usr/local/java-current                     |
  | Mac      | export JAVA_HOME=/Library/Java/Home                          |

  将Java编译器位置附加到系统路径。

  | 操作系统 | 环境变量Path                      |
  | :------- | :-------------------------------- |
  | Windows  | ;%JAVA_HOME%/bin                  |
  | Linux    | export PATH=$PATH:$JAVA_HOME/bin/ |
  | Mac      | 不需要                            |

  如上所述，使用**java -version**命令验证Java安装。

- ## 下载Maven压缩包

  从https://maven.apache.org/download.cgi下载最新版本Maven 。

  > 本教程基于Maven3.6.3讲解。

  | 操作系统 | 压缩包名称                    |
  | :------- | :---------------------------- |
  | Windows  | apache-maven-3.6.3-bin.zip    |
  | Linux    | apache-maven-3.6.3-bin.tar.gz |
  | Mac      | apache-maven-3.6.3-bin.tar.gz |

- ## 解压Maven包

  将档案解压缩到要安装Maven 3.6.3的目录中。子目录apache-maven-3.6.3将从存档中创建。

  | 操作系统 | 位置（根据自己实际情况定）                                   |
  | :------- | :----------------------------------------------------------- |
  | Windows  | C:\Program Files\Apache Software Foundation\apache-maven-3.6.3 |
  | Linux    | /usr/local/apache-maven                                      |
  | Mac      | /usr/local/apache-maven                                      |

- ## 设置Maven环境变量

  将**M2_HOME**，**M2**，**MAVEN_OPTS**添加到环境变量。

  | 操作系统 | 设置环境变量                                                 |
  | :------- | :----------------------------------------------------------- |
  | Windows  | 使用系统属性设置环境变量。M2_HOME=C:\Program Files\Apache Software Foundation\apache-maven-3.6.3M2=%M2_HOME%\binMAVEN_OPTS=-Xms256m -Xmx512m |
  | Linux    | 打开终端导出变量，export M2_HOME=/usr/local/apache-maven/apache-maven-3.6.3export M2=$M2_HOME/binexport MAVEN_OPTS=-Xms256m -Xmx512m |
  | Mac      | 打开终端导出变量，export M2_HOME=/usr/local/apache-maven/apache-maven-3.6.3export M2=$M2_HOME/binexport MAVEN_OPTS=-Xms256m -Xmx512m |

- ## 将Maven bin目录位置添加到系统Path

  现在将M2变量附加到系统变量PATH。

  | 操作系统 | 设置环境变量                             |
  | :------- | :--------------------------------------- |
  | Windows  | ;％M2％                                  |
  | Linux    | 打开终端导出变量， export PATH=$M2:$PATH |
  | Mac      | 打开终端导出变量， export PATH=$M2:$PATH |

- ## 验证Maven安装

  现在打开控制台并执行以下mvn命令。

  | 操作系统 | 任务          | 命令                            |
  | :------- | :------------ | :------------------------------ |
  | Windows  | 打开 命令窗口 | c:\> mvn --version              |
  | Linux    | 打开 终端     | $ mvn --version                 |
  | Mac      | 打开 终端     | machine:~ joseph$ mvn --version |

  最后，验证以上命令的输出，应如下所示：

  | 操作系统 | 输出                                                         |
  | :------- | :----------------------------------------------------------- |
  | Windows  | `Apache Maven 3.6.3  (cecedd343002696d0abb50b32b541b8a6ba2883f) Java version: 1.8.0_231 Java home: C:\Program Files\Java\jdk1.8.0_231\jre` |
  | Linux    | `Apache Maven 3.6.3  (cecedd343002696d0abb50b32b541b8a6ba2883f) Java version: 1.8.0_231 Java home: /usr/local/jdk1.8/jre` |
  | Mac      | `Apache Maven 3.6.3  (cecedd343002696d0abb50b32b541b8a6ba2883f) Java version: 1.8.0_231 Java home: /usr/local/jdk1.8/jre` |