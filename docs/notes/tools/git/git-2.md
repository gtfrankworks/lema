---
title: Git分支工作原理
createTime: 2025/08/12 17:07:58
permalink: /tools/git/w7z9sqwv/
---
## 分支工作原理


有人把 Git 的分支模型称为它的`‘必杀技特性’'，也正因为这一特性，使得 Git 从众多版本控制系统中脱颖而出。 为何 Git 的分支模型如此出众呢？ Git 处理分支的方式可谓是难以置信的轻量，创建新分支这一操作几乎能在瞬间完成，并且在不同分支之间的切换操作也是一样便捷。 与许多其它版本控制系统不同，Git 鼓励在工作流程中频繁地使用分支与合并，哪怕一天之内进行许多次。 理解和精通这一特性，你便会意识到 Git 是如此的强大而又独特，并且从此真正改变你的开发方式


为了更好地理解git的分支，我们先要理解git是如何存储我们在工作区中的文件的？ 我们在本地仓库中的操作流程是：

- 添加或修改文件
- $ git add --all
- $ git commit -m "提交日志"

完成以上操作后，就相当于把当前工作区中的所有文件和目录都纳入到本地仓库的管理之中了，并且已产生了一次提交，这个过程中我们并没有任何有关`分支`的操作，但是，现在我需要告诉你的是，当你初始化一个仓库后，默认就有一个叫`master`的分支存在了。

```sh
$ git status
On branch master
nothing to commit, working tree clean
```

可以看到，当前就处在`master`分支之上。

那么问题来了？分支与提交点、暂存区、文件本身他们又是什么关系？git又是如何来管理分支的呢？它是如何做到如些快速地在多个分支之间切换、创建和删除分支的呢？

首先，我们的管理是以提交点为始的，整个版本都是由一个又一个的提交点向前推进的，所以，理解提交点至关重要，下面就针对提交点我们做一下解释

> 每一交的提交，都会把本次所涉及到的所有文件修改归总到一起，生成一个计算校验和【采用SHA-1哈希算法计算出来的】，这个过程也会记录提交者的姓名和邮箱【安装好git后我们就首先配置过的】，然后把所有暂存区的文件以blob格式写入到仓库中，并且返回每个文件的地址，同时，使用树状结构来存储这个文件列表树，这样一来，就可以想象成我们的提交点指向这个文件树，这个文件树中维护指向各个BLOB文件的地址，形成一个`快照[Snapshot]`, 如下：
> ![](/images/git/commit-and-tree.png)

这个图中假设本次提交涉及到三个文件，可以看出，提交点有一个唯一的id字符串,它里面维护tree的地址，而tree中维护了涉及到的三个文件的地址. 现在我们可以说，Git 仓库中有五个对象,`三个 blob 对象（保存着文件快照）`、`一个树对象（记录着目录结构和 blob 对象索引）`以及一个`提交对象（包含着指向前述树对象的指针和所有提交信息）`  

还记得我们前面讲过，git管理的是`修改`，并不是最原始的文件，所以，当我们再次添加、删除或修改一些文件后，执行：

```sh
$ git add --all
$ git commit -m "提交日志"
```

会产生另一个提交点，这个提交点的父提交点就是前面一个提交点，除了第一次提交的没有父提交点外，后面的每一次提交都有父提交点，如下：
![](/images/git/commits-and-parents.png)

这样一来，git就是只需要管理`修改`即可，因为每一次的提交都是基于上一次的基础，只需要记录哪些文件发生了哪些变化即可。

有了上面的知识，再来理解`分支`就相对简单了，因为分支就是指向提交对象的一个`可变指针`,说它可变，是因为它可以随意在各个提交点上移动，默认情况下，它指向哪个提交点呢？

- master分支是开始就创建出来的，默认情况它总是指向最新的提交点
- 我们创建的分支，一开始就是指向当前所在的提交点，随着你产生新的提交点，它也是指向最新的提交点
- 而我们知道，每个提交点都有指向它前一个提交点[父提交点]的指针.

那当有多个分支时，git是如何知道当前我们正在使用哪个分支呢？答案就是HEAD指针，它默认指向master分支，当然，我们也可以让他指向其它的分支，这个稍后介绍，下图是在第3个提交点时创建了另外一个分支，名为v1.0：
![](/images/git/branch-and-history.png)
注：每个提交点都对应的一个修改的快照

### 创建、删除、合并分支

> 有了上面的知识，我们就理解了分支的原理，现在我们可以通过命令来创建、删除、列举、合并分支

#### 创建、切换分支

```sh
# 创建一个新分支
$ git branch new_branch_name

# 切换到新分支
$ git checkout new_branch_name
```

我们也可以通一条命令来完成

```sh
$ git checkout -b new_branch_name
```

这条命令相当于上面的2条操作，创建并切换到新分支上

案例:
我们创建一个 testing 分支：

```sh
$ git branch testing
```

创建成功后，这时并不会切换到这个新分支上，此时的图示如下：
![](/images/git/head-to-master.png)

也就是在当前分支的最新提交点上，创建出另一个可移动的指针而已，它与master同时指向最新的提交点。

我们可以通过`git log` 命令来查看各个分支当前所指的对象，要使用 --decorate 选项

```sh
$ git log --decorate --oneline
79309a2 (HEAD -> master, testing) delete world.java file
190db88 modify World.java
0ff04d2 修改World.java文件
e986401 添加World.java文件
f6e2999 (tag: v2.0) add new file f4.txt
...
```

可以看出，HEAD指向的是master，testing和master都指向`79309a2`提交点

使用`git checkout` 可以切换分支，如下：

```sh
$ git checkout testing
Switched to branch 'testing'
```

现在，HEAD就指向testing了，其它的什么也没有变，如下图：
![](/images/git/head-to-testing.png)

如果你此时通过`git log` 命令来查看，结果是：

```sh
$ git log --decorate --oneline
79309a2 (HEAD -> testing, master) delete world.java file
190db88 modify World.java
0ff04d2 修改World.java文件
e986401 添加World.java文件
...
```

HEAD指向了testing 分支，所以，切换分支，也就是把HEAD指针指向一个新的分支名，当然，工作区的文件也会根据分支的不同而不同。

#### 列举所有分支

```sh
$ git branch

* master
  testing
```

`被HEAD指向的分支前面会有一个*号`，以表示当前所在的分支。

此命令还可以带一些选项，来达到不同的目的，如下：

- `-v 选项` 表示显示分支所在的提交点以及日志
- `--merged` 表示只显示被合并过的分支
- `--no-merged` 表示只显示没有被合并的分支

#### 合并分支

> 合并分支的目的是为了把一个分支上所做的`修改`同步到另一个分支上，这个过程有多种不同的策略, 常见的有：

- fast forward 模式
- recursive 模式
- 其它

其中,fast forward模式是高效的，它就是直接移动指针快速向前，我们来看一个例子：   
我们创建一个新的分支，名为 testing,  并切换到此分支，执行：

```sh
$ git checkout -b testing
Switched to a new branch 'testing'
```

现在，我们修改 f4.txt 文件，添加一行内容 `this is a test line in testing branch`， 然后添加并提交，执行：

```sh
$ git commit -a -m "修改f4.txt文件，增加了一行"
[testing db690e2] 修改f4.txt文件，增加了一行
 1 file changed, 1 insertion(+)
```

现在的情况是，testing分支中比master分支中多了一个提交点，下面是示意图:
![](/images/git/advance-testing.png)
可以看出，HEAD指针随着提交自动向前移动，它指向了最新的提交点，而master并没有发生变化。它仍然指向我们切换分支前的提交点位置，这就比较有意思了，现在我们切换回 master 分支，看看会发生什么， 执行：

```sh
$ git checkout master
Switched to branch 'master'
```

此时我们同样可以用一个图片来表达一下，如下：
![](/images/git/checkout-master.png)
可以想象，HEAD指向了master分支，同时，工作区中的所有内容都恢复到master分支指向的那个提交点的状态，也就是说，刚才我们在testing分支中所做的修改，此时`不见了`【但并不意味着它真的不见了 :)】
这样做的好处是我们可以随时回到某一个状态，从这个状态再次出发，而不受testing分支的影响。

**所以，切换分支是会改变工作区中的文件的。**

好了，现在我打算使用testing分支中的修改，我们要做的就是合并分支，首先切换到master分支，然后合并，执行：

```sh
$ git merge testing
Updating 117b6f7..db690e2
Fast-forward
 f4.txt | 1 +
 1 file changed, 1 insertion(+)
```

可以看到，git采用了Fast-forward策略，也就是快进策略，直接把master和HEAD一起前进到testing的位置即可，如下图：
![](/images/git/master-merge-testing.png)

上面演示的是一种比较理想的情况，国为master一直未动，那如果在testing分支做出修改的同时，master 分支也进行了更新，产生了新的提交点，如下面这种情况：
![](/images/git/advance-master.png)
可以明显地看出，两个分支都向前跨了一步，产生了分叉，这种情况下，合并就不是简单的快进模式，不过好在git也不需要我们去多做什么，它会自动处理这个合并，采用`recursive`模式寻找恰当的合并基础（译注：即共同祖先），然后也是同样的简单和高效。 这些高效的特性使得 Git 鼓励开发人员频繁地创建和使用分支。

下面我们显示一下上面的操作：

```sh
$ git checkout -b issue#2
Switched to a new branch 'issue#2'
```

然后，在此分支下面修改 f3.txt 文件，这里我先故意不操作f4.txt文件，等下在master分支中我们修改f4.txt文件, 修改完成后，执行：

```sh
$ git commit -a -m "修改f3.txt文件，增加一行"
[issue#2 dda75aa] 修改f3.txt文件，增加一行
 1 file changed, 3 insertions(+)
```

这样一来，issue#2分支多了一个提交点，现在，我们切换到 master 分支，也增加一个提交，如下：

```sh
$ git checkout master
Switched to branch 'master'
```

然后，我们修改f4.txt文件，新增一行后， 执行

```sh
$ git commit -a -m "修改f4.txt文件，增加一行"
[master 228b255] 修改f4.txt文件，增加一行
 1 file changed, 2 insertions(+)
```

现在，master分支和issue#2分支从他们共同的祖先提交点那儿开始分叉了，我们使用`git log --graph --all`命令可以看到:

```sh
$ git log --graph --oneline -all
* 228b255 修改f4.txt文件，增加一行
| * dda75aa 修改f3.txt文件，增加一行
|/
* db690e2 修改f4.txt文件，增加了一行
*   117b6f7 Merge branch 'testing'
|\
| * 2b4645f modify readme.txt
* | 2393508 modify f4.txt
|/
* 79309a2 delete world.java file
* 190db88 modify World.java
* 0ff04d2 修改World.java文件
...省
```

可以很明显地看到，在提交点`db690e2`处开始分叉了，现在，我们把issue#2分支合并到master分支上，执行：

```sh
$ git merge issue#2
Merge made by the 'recursive' strategy.
 f3.txt | 3 +++
 1 file changed, 3 insertions(+)
```

这个过程会产生一次新的提交，并让你输入提交的日志，可以看到上面的模式是`recursive`, 现在，你再通过`git log`来查看一下：

```sh
$ git log  --all --oneline --graph
*   90a69fa Merge branch 'issue#2'
|\
| * dda75aa 修改f3.txt文件，增加一行
* | 228b255 修改f4.txt文件，增加一行
|/
* db690e2 修改f4.txt文件，增加了一行
*   117b6f7 Merge branch 'testing'
...省
```

如果你一步一步做到这里，相信你对分支的操作有了一定的理解了，剩下的就是在项目中多加练习了。

#### 删除分支

> 当分支已经合并到我们的主干上后，就可以删除这个分支了，因为他上面的所有修改都已合并到其它分支上去了。

```sh
$ git branch -d branch_name
```

这条命令就可以删除指定的分支。
注：  
git 还有一个很好的防误删分支操作，对于一个没有被其它分支合并过的非master分支，使用上面的命令是删除不掉的，git会提示你，如下：

```sh
$ git branch -d issue#3
error: The branch 'issue#3' is not fully merged.
If you are sure you want to delete it, run 'git branch -D issue#3'.
```

从提示信息中可以看到，issue#3分支没有被合并，如果你一定要删除，可以使用 -D 选项

```sh
$ git branch -D issue#3
Deleted branch issue#3 (was 5dcb65e).
```

最后，需要说明的是，被HEAD指向的分支是不能删除的，你要先切换到其它分支后，才能删除，另外， master分支同样可以删除，**但最好不要这么做。**

### 解决冲突

> 前面详细地讲解了创建、合并分支的过程，但是上面的例子都很理想，因为都没有冲突，实际的多人协同开发中，或多或少都存在合并时冲突问题，git也提供了很好的解决办法，我们一起来看一下。

问题一：冲突是如何产生的？  
上面我们演示过分叉的情况，在分叉后，不同的分支同时修改了同一个文件后，那我们在合并这两个分支时就会有冲突，这个冲突git不会自动解决，需要我们手动介手，但是，git会把两个分支的不同地方，使用特殊的标记给标记起来，方便我们修改。

问题二：我们手动解决冲突的过程是怎样的？  
合并时，会遇到失败，并给出提示有冲突，同时告诉你哪些文件有冲突，我们手动打开所有有冲突的文件，修改好后，依次执行：

- git add 命令， 此命令即告诉git我已解决了冲突【git会根据加入到暂存区来判断是否解决了冲突】
- git commit 命令 【提交解决冲突的决定】

所以，解决冲突没有什么高深的命令，也没有新的知识，只不过git不能决定，而需要人为介入而已，下面我们来演示一个例子：

```sh
$ git checkout -b issue#5
Switched to a new branch 'issue#5'
```

修改文件f4.txt，新增一行,内容为：`It's a real world!`, 然后执行：

```sh
$ git commit -a -m "更新f4.txt文件，添加一行"
[issue#5 39b0eca] 更新f4.txt文件，添加一行
 1 file changed, 1 insertion(+)
```

现在，切换到master分支, 执行

```sh
$ git checkout master
Switched to branch 'master'
```

同样，修改f4.txt, 新增一行，内容为：`It's a artifical world!`, 然后执行:

```sh
$ git commit -a -m "更新f4.txt文件，添加一行"
[master ac6f619] 更新f4.txt文件，添加一行
 1 file changed, 1 insertion(+)
```

好了，现在master分支和issue#5分支都各自修改了f4.txt 文件[最好是修改同一行，不同行的话，git还是会自动合并成功的]，现在，我们在master中，去合并issue#5, 如下：

```sh
$ git merge issue#5
Auto-merging f4.txt
CONFLICT (content): Merge conflict in f4.txt
Automatic merge failed; fix conflicts and then commit the result.
```

此时，你使用`git status`查看：

```sh
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   f4.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

可以看到，提示**both modified**， 现在，我们打开f4.txt文件，内容如下：

```text
this s a test line in master branch
<<<<<<< HEAD
It's a artifical world!
=======
It's a real world!
>>>>>>> issue#5
```

可以看到，两个不同的地方采用 ====== 分隔开了，上半部份是当前分支，也就是HEAD指向的，下半部份是被合并的分支，显示是issue#5,现在我们要做的就是决定采用谁的内容，然后删除不要的部份，最后执行`git add --all` 和 `git commit -m "日志"`

现在我们把f4.txt改成：

```text
this s a test line in master branch
It's a artifical or real world!
```

保存后，执行：

```sh
$ git commit -a -m "解决冲突"
```

这样一来，就手动解决了冲突.

### 多人协作[基于远程仓库]

> 上面的所有讲解都是基于本地仓库的操作，如果我们要跨地区协同开发，大家可能都不在同一个地点办公，我们的版本库如何共享呢？由于git的强大，现在国内外都有很多的平台基于git来托管项目，比较有名的就是github.com, 国内也有像：gitee.com, coding.net 等平台，都是基于git的一个云端项目托管平台，对所有的开源项目都是免费的。

所有需要参与到项目中的人员，首先可以到[github](https://github.com)上注册一个帐号，然后就可以参与到一个开源项目中去，当然，我们可以自己创建一个开源项目来做练习。

有关如何在github上创建一个项目，此处就不再细说，按照提示一步一步完成即可。

## 远程仓库

> 所谓的远程仓库就是指在github这类平台上创建的仓库，也叫项目，通过它，可以让世界各地的程序员协同开发同一个项目或多个项目，我们这里主要是讲解我们在本地如何与远程仓库进行同步操作，在同步之前，我们要先与远程仓库建立关联

### 如何与远程仓库建立关联

主要有两种方式，下面一一讲解  
第一种：本地先不创建仓库， 而是直接在github上创建一个项目，创建项目的过程中会自动生成一些文件，如README, .gitignore文件等，然后我们可以获取这个项目的https地址或是ssh地址。然后，在本地的任一位置，右击选择 `git bash here`, 在打开的命令行窗口中执行：

```sh
$ git clone https://github.com/yourname/your_project_name.git

```

成功后，就可以看到在当前目录下，会有一个your_project_name的文件夹，这个文件夹就是从远程克隆下来的，里面本身就是一个git仓库，
然后我们进入到这个目录下，就可以通过git来操作了。

第二种：在你还没有在远程平台上创建项目之前，你在本地已经创建好项目了，这时，就需要我们把本地的项目同远程的项目关联起来，这种操作同样也要在远程平台上创建一个项目先，方法同上。   
然后，执行如下的命令：

```sh
$ git remote add origin 你的远程项目地址,如：https://github.com/yourname/your_project_name.git
```

这条命令执行成功后，我们可以通过：

```sh
$ git remote -v
origin  http://gitee.com/abc/gitdemo.git (fetch)
origin  http://gitee.com/abc/gitdemo.git (push)
```

来查看是否已经关联上了【本列中的用户名和项目是任意写的，你应该保证一致】，如果发现关联错了，还可以移除，重新关联，如下：

```sh
$ git remote remove origin
```

移除后，再次执行`git remote add origin xxxxxx` 命令即可

### 如何从远程仓库克隆

```sh
$ git clone https://github.com/yourname/your_project_name.git
```

我们上面的例子都是通过https协议进行的，如果要使用ssh协议的话，则事先可以配置ssh，有关这一块的知识点，我后面单独提供一篇文章.

## 命令小结

- $ git branch branch_name  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#创建新的分支</font>
- $ git branch -d branch_name &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#删除指定的分支</font>
- $ git branch [-v ]| [--merged] | [--no-merged]  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#按条件显示分支</font>
- $ git branch -D branch_name  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#强制删除指定的分支</font>
- $ git log [--decorate] [--all] [--oneline]   &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#在提交日志中查看各个分支所在的提交点</font>
- $ git checkout branch_name  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#切换到指定的分支</font>
- $ git checkout -b branch_name  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#创建并切换分支</font>
- $ git merge branch_name  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#合并指定的分支到当前分支中</font>
- $ git remote add https://github.com/username/project_name.git   &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#把当前本地仓库与远程仓库建立连接</font>
- $ git remote -v  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#查看远程仓库连接名</font>
- $ git remote remove origin  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#移除与远程仓库的关联，此处的origin是关联名</font>
- $ git clone https://github.com/username/project_name.git  &nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>#从远程仓库克隆指定的项目到本地</font>