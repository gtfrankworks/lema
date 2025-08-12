---
title: Git的介绍及其安装
createTime: 2025/08/12 16:55:12
permalink: /tools/git/zayydvo0/
---
# git 介绍

本教材旨在让你快速掌握git的使用，而不是一个系统学习的教材，通过本教案，你可以快速地运用git,使用git命令来达到你的版本控制的目的，但如果你想系统地学习git，可以参考如下站点
[猴子都能懂的GIT入门](https://backlog.com/git-tutorial/cn)
[git参考手册](http://gitref.justjavac.com)
[git简易指南](https://rogerdudler.github.io/git-guide/index.zh.html)

以上的学习资料都非常的简明、易懂，利于学习和理解，是写得很好的教材，值得学习
当然，git还有更深入的知识，如果你要深入理解git的话，还可以去看如下资料：
[Pro Git](https://git-scm.com/book/zh/v2)
[Git-Flow备忘清单](https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html)

git 是一个非常棒的版本控制软件，它目前有很完整的生态，下面让我们进入 git的学习之中吧...

## Git前世今生

> [Linus Benedict Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds)(林纳斯.本纳第克特.托瓦兹) 创造了Linux操作系统，它深受开源软件之父理查德.斯托曼(Richard Stallman) 的影响，并把Linux操作系统开源，从而一举奠定了他本人在开源上的地位，而我们本专教材要讲解的git, 是在2005年Linus花了两周时间使用C语言开发的，这真是太牛了，2008年，github网站上线，它为开源项目免费提供GIT存储，无数的开源项目开始迁移至GitHub，包括jQuery, Ruby等..
> git的诞生原本是为了管理Linux操作系统源码的，因为linux是开源的，很多的技术志愿者参与进来，为linux编写代码，为了方便管理这些代码，Linus 开发了 Git, Git可以在不联网的情况下，进行代码管理，这一点比 CVS, SVN 都要好得多。
> 所以，git一开始只能在类unix系统上使用，不过，随着git的发展，现在已经有了windows下的git软件，通过模拟器可以在windows系统中很好地使用git, 我们下面的讲解都是基于windows系统进行的，在linux系统中操作一样。

## Git安装

### 在Linux下安装git

如果在unbutu 或 Debian系统上，直接通过如下命令安装：

```sh
sudo apt-get install git
```

系统会自动下载并安装git
如果是其它的linux系统，到官网下载源码，然后解压，依次输入：

```sh
./config
make
sudo make install
```

### 在Windows下安装git

请到[Git官网下载](https://git-scm.com/downloads)安装程序, 选择windows版本，下载后直接双击安装即可。
安装完成后，在任何的文件下右击都可以看到 "Git" -> "Git Bash Here"的功能，它已集成到资源管理器中了。
如下：
![](/images/git/git-bash-1.png)

安装完成后，还需要做进一步的设置，让git知道你是谁？ 你需要在git bash命令行中输入：

```sh
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

执行成功后，在你的用户主目录下会生成一个 .gitconfig 文件，里面的内容就是我们设置的user.name和user.email. 但不建议我们手动直接操作这个文件，而是建议通过上面的命令来完成。

有了上面的基本了解后，我们接下来就可以进入任一一个文件夹下面，创建一个本地仓库。

## 创建你的第一个版本库

> 版本库是指git帮助我们管理的仓库，通常我们初始化后，就会生成一个本地仓库，我们在此目录下的所有文件和子目录都将被这个本地仓库进行管理， 通过如下命令来初始化本地仓库：

```sh
git init
```

执行成功后，会有如下提示：

```
Initialized empty Git repository in xxx 目录
```

xxx目录就是指当前所有的目录。
当我们初始化成功后，细心的人会发现在当前目录下生成了一个 `.git` 的文件夹，这个文件夹就是git来跟踪管理版本库的，所以，我们不要去手动操作这个文件夹下的任何文件，否则极有可能会破坏仓库。

当然，不是一定要在空目录下去执行 `git init` 的，也可以在有文件的目录下执行，这样一来，这些已的文件也会被git本地仓库所跟踪。

### 添加文件到版本库

我们可以在当前初始化过本地仓库的目录或其目录下创建任一文件或多个文件，然后，通过通过如下命令：

```sh
git status
```

可以查看有哪些文件“变动”了，利用 `git add --all` 命令可以把这些文件添加到进暂存区[也叫索引区 Index], 最后利用`git commit -m "提交日志"` 命令把结果保存在本地仓库中。

下面我们一起来做一遍
首先，你添加一个 Hello.java 文件，内容如下：

```java
public class Hello {
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
```

> step1: 使用命令 `git add` 告诉Git, 把文件添加到暂存区

```sh
git add Hello.java
```

上面的命令执行完成后，没有任何的提示，说明你操作正确，因为Unix的哲学是"没有消息就是好消息"

> step2: 使用命令 `git commit` 告诉Git, 把暂存区的文件提交到仓库

```sh
git commit -m "add new File Hello.java"
```

此处的 -m 后面跟的是提交的日志，一定要写， 同时，提交后会生成一个由40位字符组成的唯一字符串，它表示提交点，由GIT负责创建和管理

### 本地仓库的原理

> 通过上面的基本演示，可以发现使用git管理文件非常的方便，而且快速，git为什么能这么快速地记录每一次文件的修改、添加、删除呢?下面我们介绍一下git的原理

git初始化好的本地仓库由“三颗树”组成，第一颗树就是你的`工作目录`, 它持有实际的文件，包含所有的子目录和文件；第二颗树是`暂存区(Index) `,它像个缓存区域，临时保存你的改动；第三颗树是`HEAD`,也就是头指针，它实际指向的是分支，你每次的提交的目的分支都是由HEAD指向的【除非HEAD处在detached status，这个后面再讲】.

通过下面的图示，可以很好地理解这个三颗树：
![](/images/git/trees.png)

我们在工作区中添加、删除、修改文件或文件夹时，git都能感知到。  
然后，我们执行`git add` 命令，是在告诉git，我要添加哪些文件到暂存区[Index Stage]  
最后，我们执行`git commit`命令，是在告诉git,我们把暂存区中的内容永久提交到本地仓库中的当前分支下，默认分支都是master，而有关支的操作，在后面的教材中再说详细说明.

#### 工作区和暂存区

> 上面的理论说明了git仓库的基本原理，下面通过一张图示来更好地理解它们三者之间的关系

- 工作区[work dir]
- 暂存区[stage]
- 提交区[HEAD]

![](/images/git/git-tree-2.png)

### 命令列表

初始化仓库

```sh
git init
```

添加文件到暂存区, 其中，--all 指工作区下的所有文件, 也可以指定具体的文件名

```sh
git add --all
```

提交文件到本支仓库下的当前分支中

```sh
git commit -m "提交日志"
```

## 版本管理

> 此部份内容是理解版本操作核心知识，我们使用git的最基本目的就是版本控制，通俗地讲，就是我如何找回我的历史修改版本。

### 提交点

> 每一次的提交`git commit`都会产生唯一的提交点，将来我们使用的tag就是基于这个提交点的。提交点会记录提交的人员、时间、日志等信息。

如何查看提交点？

```sh
git log
```

可以查看到当前分支下所有的提交日志，按时间的倒序排序，如下

```sh
commit f6e2999ec7aa1ce1b8792db85ca3d191ce12eceb
Author: yejf <yejf@sz-tz.org>
Date:   Thu Dec 28 11:29:18 2017 +0800

    add new file f4.txt

commit c5fd50020b2ae861d5382d3003d39579dc71fd02
Author: yejf <yejf@sz-tz.org>
Date:   Thu Dec 28 11:22:08 2017 +0800

    add new file f3.txt

commit 6d0a0e2bc10752e8e9b35222e9a2e834e83135ff
Merge: d0f63b3 5cc9e23
Author: yejf <yejf@sz-tz.org>
Date:   Thu Dec 28 11:19:36 2017 +0800

    Merge branch 'issue2'
```

如果觉得这个格式不好，还可以更精单一些，使用 --pretty参数

```
git log --pretty=oneline
```

结果如下:

```sh
f6e2999ec7aa1ce1b8792db85ca3d191ce12eceb add new file f4.txt
c5fd50020b2ae861d5382d3003d39579dc71fd02 add new file f3.txt
6d0a0e2bc10752e8e9b35222e9a2e834e83135ff Merge branch 'issue2'
5cc9e23fe5504127db5a1f714fae46c2f071ca57 add new file f2.txt
d0f63b35626459b23956ea09461eec8630196b87 resolved conflict
b6152d7f15fb088e921efade3da7fb93f32db255 update readme.txt by master branch
235e87d0cac84d395760d6d23c8651c1d5997cf3 update readme.txt in issue1 branch
4324270e7fd578d0f970fe5a1f3e11431bcda6f2 add readme.txt file
```

当然，还可以以“树”的形状来查看日志，使用 --graph 参数

```sh
git log --graph --pretty=oneline
```

结果如下：

```sh
* f6e2999ec7aa1ce1b8792db85ca3d191ce12eceb add new file f4.txt
* c5fd50020b2ae861d5382d3003d39579dc71fd02 add new file f3.txt
*   6d0a0e2bc10752e8e9b35222e9a2e834e83135ff Merge branch 'issue2'
|\
| * 5cc9e23fe5504127db5a1f714fae46c2f071ca57 add new file f2.txt
* |   d0f63b35626459b23956ea09461eec8630196b87 resolved conflict
|\ \
| |/
| * 235e87d0cac84d395760d6d23c8651c1d5997cf3 update readme.txt in issue1 branch
* | b6152d7f15fb088e921efade3da7fb93f32db255 update readme.txt by master branch
|/
* 4324270e7fd578d0f970fe5a1f3e11431bcda6f2 add readme.txt file
```

#### 命令小结

```sh
//把工作区中的文件纳入到暂存区[stage]
$ git add   
//把暂存区的文件纳入到HEAD 区域
$ git commit 
//查看当前工作区的状态
$ git status 
// 查看当前分支下的提交日志
$ git log 
```

再来看一下我们的图示
![](/images/git/git-tree-2.png)
现在，你是不是有点儿感觉了呢:)

### 版本回退

> 首先要理解HEAD指针，它默认指向当前分支下的最新提交点，也就是最后一次的`commit id`

如图：
![](/images/git/version-back-1.png)

而每一个分支都类似于master一样，由一个一个的提交点组成，HEAD通过分支指向具体的提交点，而我们要回进行版本回退，就是去操作HEAD指针，使用如下命令：

```sh
git reset --hard HEAD^
```

这里的HEAD^ 是一种相对写法，HEAD指向最新的提交点，而HEAD^就是最新的前一个提交点，HEAD^^就是前二个提交点，以此类推，如果你想回到前50个提交点，则可以通过 `HEAD~50` 这个语法，以免要写大多的^

如果你通过`git log`查看到提交点，也可以直接采用绝对定位方式把版本回到指定的提交点，如下：

```
git reset --hard commit_id
```

这里的commit_id 就是你通过`git log`查看到的提交点id

我们做如下实验：

1. 首先在，当前工作区中，添加一个新文件 World.java, 内容如下：

```java
public class World {
	
	public static void main(Stirng[] args) {
		System.out.println("Git 太赞了...");
	}
}
```

2. 执行：

```sh
git add World.java
```

3. 执行:

```sh
git commit -m "添加World.java文件"
```

为了演示性更好，我再次修改World.java文件，在它的内容中，添加一行新代码后如下：

```java
public class World {
	
	public static void main(Stirng[] args) {
		System.out.println("Git 太赞了...");
		System.out.println("我决定以后就使用它了...");
	}
}
```

现在，同样执行`git add World.java` 和 `git commit -m "修改World.java文件"`
命令执行成功后，我们相当于新增了2个提交点，使用 `git log` 查看结果如下：

```text
commit 0ff04d2bf6a142c0ca304726933f7d187022d9d2
Author: yejf <xxx@xxx.com>
Date:   Tue Jan 2 16:58:15 2018 +0800

    修改World.java文件

commit e9864011a6ee0835f3709fd1dc69e5419c29afbf
Author: yejf <xxx@xxx.com>
Date:   Tue Jan 2 16:52:02 2018 +0800

    添加World.java文件

```

现在，World.java文件已经添加到本地仓库中并修改了一次，现在你想坐时光机回到World.java没有修改的版本时代，我们可以通过如下命令：

```sh
git reset --hard HEAD^
```

执行完上面的命令后，可以想象一下HEAD指针不再指向最新的提交点了，而是指定最新提交点的前一个提交点，如下图：
![](/images/git/version-back-2.png)
现在你打开 World.java 查看，就只能看到如下内容：

```java
public class World {
	
	public static void main(Stirng[] args) {
		System.out.println("Git 太赞了...");
	}
}
```

没有了`System.out.println("我决定以后就使用它了...");`这句话,因为我们的HEAD指针回退到了前一个版本了.

现在你已经坐时光机回到了上一个提交点[版本]，现要怎么回去呢，只需要知道你最新的提交点的id即可，但是，这可不是那么容易得到的，因为你一旦回到过去的提交点，最新的就没有了，不信，你再次执行`git log`看看，如下：

```sh
$ git log
commit e9864011a6ee0835f3709fd1dc69e5419c29afbf
Author: yejf <xxx@xxx.com>
Date:   Tue Jan 2 16:52:02 2018 +0800

    添加World.java文件

```

也就是说，最新修改的那次提交现在看不到日志了。这是怎么回事？ 【这是因为你回到了古代，之前的参考点已经不在了】

如果我不知道修改的提交点id，那我就不能回去了，想想这是不是有点儿可怕:)...

不要着急，git提供了另一条命令，让我们可以查看每一次操作的记录，如下：

```sh
$ git reflog
显示的结果如下：
e986401 HEAD@{0}: reset: moving to HEAD^
0ff04d2 HEAD@{1}: commit: 修改World.java文件
e986401 HEAD@{2}: commit: 添加World.java文件
f6e2999 HEAD@{3}: reset: moving to f6e2999ec7a
6d0a0e2 HEAD@{4}: reset: moving to HEAD^^
f6e2999 HEAD@{5}: reset: moving to f6e2999ec7a
c5fd500 HEAD@{6}: reset: moving to HEAD^
f6e2999 HEAD@{7}: checkout: moving from f6e2999ec7aa1ce1b8792db85ca3d191ce12eceb to master
f6e2999 HEAD@{8}: checkout: moving from a588d42c25ef0dadf40205cfbc8c0a881fe90cb7 to f6e2999
....
```

可以看出，上面第二条就是修改World.java文件的提交id,也就是`0ff04d2`, 现在我们只需要执行：

```
$ git reset --hard 0ff04d2
HEAD is now at 0ff04d2 修改World.java文件
```

就可以坐上时光机，重新回到最新的提交点了,也就是最新的版本中, 现在我们再来看一下World.java中的内容，如下：

```java
public class World {
	
	public static void main(Stirng[] args) {
		System.out.println("Git 太赞了...");
		System.out.println("我决定以后就使用它了...");
	}
}
```

#### 命令小结：

采用相对方式来定位到不同的版本中 

```sh
$ git reset --hard HEAD^
```

采用绝对方式来定位到不同的版本中

```sh
$ git reset --hard commit_id
```

查看操作记录

```sh
$ git reflog
```

### 管理修改

> git跟踪管理的是修改，而并非文件，所以git的操作非常快速而且优雅，下面我们通过一个例子来说明

step1. 在World.java中新加入一行，如下：

```java
//this is a comments for class
...
```

step2. 执行`git add`

```sh
$ git add World.java
```

step3. 执行`git commit`

```sh
$ git commit -m "add some comments to World.java"
```

以上3步完成后，相当于一次完整的提交操作，现在我们再次修改World.java文件，再加入一行，如下：

```java
//another comments for class
//this is a comments for class
...
```

现在，我们直接提交，执行

```sh
$ git commit -m "再加一行注解"
```

我们会发现，不能提交，原因很简单，因为第二次修改没有纳入到 stage区域中，所以，git并不会提交到Head中，所以，只有把修改添加到stage区域后，再执行commit操作才有意义。

我们可以通过如下命令来查看工作区中的文件和HEAD区域文件的区别，执行：

```sh
$ git diff HEAD -- World.java
```

可以看到类似如下的结果：

```text
index 96f86fe..b938fe6 100644
--- a/World.java
+++ b/World.java
@@ -5,6 +5,7 @@ public class World {
                System.out.println("我以后决定就用它了");

                //add some comments
+               //another some updates
        }
 }
```

### 撤消修改

> 由于git管理的是文件的修改，当然，这个修改不是狭义上的更新，而是所有的git操作都可以看做是修改，比如删除、更新、新增等都是修改

git仓库主要由工作区、暂存区、HEAD区三块组成，而进入了HEAD 区就意味着已经提交过了，git的综旨是所有提交过的数据都是可以恢复的，也就说，只要在HEAD中有过记录，都可以找回来，所以，我们这里所讲的撤消修改，是指在工作区和暂存区的两种情况，而如果是已经提交了，则可以根据我们前面讲解过的版本回退进行操作，也就是时光机的操作，如不明白，可以重新看上面的笔记.

首先我们来看一下，如果修改过的文件，没有进入暂存区时的撤消操作【这个相对容易】  

1. 我们修改一下 World.java, 在代码中加入一行，如下：

```java
public class World {

        public static void main(String[] args) {
                System.out.println("Java 太赞了...");
                System.out.println("我以后决定就用它了");

                //add some comments
                System.out.println("这是新加的输出...");
        }
}
```

2. 执行`git status` 可以看到 World.java 被红色字体显示着，说明它已被修改了，但没有加入到暂存区
   此时，如果你想起来，这个修改是没有必要的，你只需要执行：

```sh
$ git checkout -- World.java
```

即可，这样一来，我们所加的那一行就会消失，World.java回到我们修改前的内容，是不是很赞。
注：此命令中要加入 `--` 选项，因为checkout也有切换分支的作用，如果不加这个选项，会被认为是切换分支的命令。
下面，我们再来看一下，如果修改文件后，并把修改添加到了暂存区，这个情况下，我们如何撤消修改呢？【这个操作相对复杂一步】  

1. 与上面一样，继续修改World.java文件，如下：

```java
public class World {

        public static void main(String[] args) {
                System.out.println("Java 太赞了...");
                System.out.println("我以后决定就用它了");

                //add some comments
                System.out.println("这是新加的输出...");
        }
}
```

2. 执行`git status` 可以看到 World.java 被红色字体显示着，说明它已被修改了，但没有加入到暂存区
3. 执行`git add World.java` 命令，把这个修改添加到暂存区，此时，再执行`git status` 看到的将是绿色的信息  
   此时，如果你再想起来，这个修改是没有必要的，则你先要执行：

```sh
$ git reset HEAD World.java
```

执行完这条命令，会有如下输出：

```
Unstaged changes after reset:
M       World.java
```

可以看出，这个修改从暂存区中被移出来的，这样一来，World.java就回到了第1种情况，也没有没有加入暂存区的情况，则继续执行：

```sh
$ git checkout -- World.java
```

即可，这样一来，我们所加的那一行同样会消失，这真是太棒了！

### 删除文件

> 要注意，删除也是一个修改操作，所以，这里我们同样可以按修改的思路来做删除，可以分为两种：

* 真的删除一个文件?
* 误删除一个文件，如何恢复?

1.我们来看一下，如何从版本库中删除一个文件

> 在工作区中直接手动删除文件，或是执行 `git rm filename` 命令都可以，需要注意的是，手动删除一个文件后，我们要执行`git add`操作，而使用`git rm filename`命令时，无需执行`git add`操作了，所以我们可以这样理解：
> `git rm filename` 相当于手动删除文件后，再执行`git add filename` 操作【把删除添加到暂存区中】
> 接下来，执行`git commit -m "日志"` 命令，就可以把这个删除给提交掉。  

2. 如果是误删除，我们要如何恢复？
   如果你没有提交，则可以按我们上面所学的知识恢复，也就是分为：
   - 没有加入到暂存区时，直接执行`git checkout -- filename` 即可
   - 如果已加入到暂存区时，先执行`git reset HEAD filename`后，再执行`git checkout -- filename` 即可

如果你已提交，根据git的综旨，所有提交过的数据都可以找回来【也就是都可恢复】，则通过之前所学的版本回退功能，回到之前的某个提交点即可，也就是没有删除之前的提交点，这样一来，这个删除的文件就能找回来喽！

```sh
$ git reset --hard HEAD^
```

也就是回到删除之前的提交点上，因为在那个提交点上，我们误删的文件还存在。

## 总结

> 所有没有提交的数据一旦丢失，可能就找不回来了
> 所有已提交的数据，都是可以恢复的【想想版本回退功能，它是基于提交点的】

### 本教案所有命令列表

- $ git init  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#初始化仓库</font>
- $ git add --all | [filename[,filename][,filename][,...]]  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#添加到暂存区</font>
- $ git commit -m "日志"  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#提交到HEAD区</font>
- $ git status  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#查看文件状态</font>
- $ git log [-p] [--graph] [--pretty=oneline]   &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#以“图表”方式简约显示日志</font>
- $ git reflog  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#查看所有的提交操作记录</font>
- $ git reset --hard HEAD^ | HEAD~100  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#版本回退到指定的提交点</font>
- $ git reset HEAD filename  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#把指定的文件从暂存区中移出</font>
- $ git rm filename   &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#删除指定的文件并添加到暂存区</font>
- $ git checkout -- filename  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#撤消指定的文件修改</font>
- $ git diff HEAD -- filename  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#查看HEAD区和工作区中filename的区别</font>

