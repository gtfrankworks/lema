---
title: YAML配置文件
createTime: 2025/08/27 16:37:34
permalink: /framework/springboot/el04zvqe/
---
# YAML配置文件

## 1. yaml 简介

- YAML 是 "YAML Ain't a Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。

- YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲（例如：许多电子邮件标题格式和 YAML 非常接近）。

- YAML 的配置文件后缀为 *.yml* 或 *.yaml* 。

## 2.基本语法

- **大小写敏感**

- 使用缩进表示层级关系

- 缩进不允许使用 `Tab`，只允许**空格**（IDEA 除外，因为 IDEA 会自动将 Tab 转换为空格）

- **缩进的空格数不重要，只要相同层级的元素左对齐即可**

- `#`：表示注释

- 字符串无需加引号，`' '`与 `" "` 表示的字符串内容分别被**转义**与**不转义**

## 3.数据类型

YAML 支持以下几种数据类型：

- 字面量：单个、不可再分的值【date、boolean、string、number、null】
- 对象：键值对的集合【**map**、object】
- 数组：一组按次序排列的值【array、**list**、**set**、queue】

### 3.1 .字面量

```yaml
null: ~		# ~表示null
```

在 YAML 文件中，可以使用 `|` 或 `>` 表示多行文本，如下所示：

```yaml
message: |
  Hello,
  World!
```

在上述示例中，`message` 属性的值为一个多行文本，使用 `|` 表示。如果要忽略换行符，可以使用 `>`。

### 3.2.对象

```yaml
key:
	child-key1: value1
	child-key2: value2
```

较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的 key，配合一个冒号加一个空格代表一个 value：

```yaml
? 
	- complexkey1
	- complexkey2
: 
	- complexvalue1
	- complexvalue2
```

意思即对象的属性是一个数组 `[complexkey1, complexkey2]`，对应的值也是一个数组 `[complexvalue1, complexvalue2]`

### 3.3.数组

以 `-` 开头的行表示构成一个数组：

```yaml
- A
- B
- C
```

YAML 支持多维数组，可以使用**行内表示**：

```yaml
key: [value1, value2, ...]
```

一个相对复杂的例子 `List<Person> companies`：

```yaml
companies:
    -
        id: 1
        name: company1
        price: 200W
    -
        id: 2
        name: company2
        price: 500W
    - {id: 3,name: company3,price: 600W}
```

意思是 *companies* 属性是一个数组，每一个数组元素又是由 *id*、*name*、*price* 三个属性构成。

数组也可以使用 **{流式}** 的方式表示：

```yaml
companies: [{id: 1,name: company1,price: 200W},{id: 2,name: company2,price: 500W}]
```

### 3.4.引用

`&`：锚点

`*`：别名

`<<`：合并到当前数据

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults
```

相当于:

```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost
```

下面是另一个例子:

```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
```

转为 JavaScript 代码如下:

```javascript
[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```

### 3.5.例子

举一个比较全面的例子，弄清楚就好了。

```java
@Component
@ConfigurationProperties(prefix = "yaml.test")
public class Yaml {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Other other;
    private String[] interests;
    private List<String> animal;
    private Map<String, Object> score;
    private Set<Double> salary;
    private Map<String, List<Other>> allOthers;
    // 省略 setter、getter

    public static class Other {
        private String name;
        private int count;
	// 省略 setter、getter
    }
	
}
```

对照 *application.yml*：

```yaml
# yaml.test(.other)
yaml:
  test:
    user-name: Kun
    boss: false
    birth: 2021/07/26
    age: 19
    other:
      name: hello
      count: 1
    interests:
      - pingpang
      - football
      - basketball
    animal: [list1,list2,list3]
    score:
      map1:
        - object1
        - object2
      map2: {name: 1, count: 1}
    salary: [3.14, 15926]
    all-others:
      string1: [{name: name1, count: 1}, {name: name2, count: 2}]
      string2:
        -
          name: name11
          count: 11
        -
          name: name22
          count: 22
        - {name: name33, count: 33}
```

结果：

```json
{
    "userName": "Kun",
    "boss": false,
    "birth": "2021-07-25T16:00:00.000+00:00",
    "age": 19,
    "other": {
        "name": "hello",
        "count": 1
    },
    "interests": [
        "pingpang",
        "football",
        "basketball"
    ],
    "animal": [
        "list1",
        "list2",
        "list3"
    ],
    "score": {
        "map1": {
            "0": "object1",
            "1": "object2"
        },
        "map2": {
            "name": 1,
            "count": 1
        }
    },
    "salary": [
        3.14,
        15926
    ],
    "allOthers": {
        "string1": [
            {
                "name": "name1",
                "count": 1
            },
            {
                "name": "name2",
                "count": 2
            }
        ],
        "string2": [
            {
                "name": "name11",
                "count": 11
            },
            {
                "name": "name22",
                "count": 22
            },
            {
                "name": "name33",
                "count": 33
            }
        ]
    }
}
```

### 3.6.配置提示

自定义的类和配置文件绑定没有提示，所以我们需要手动设置。

*pom.xml*：

```xml
<dependencies>
	<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <!--maven plugin:当运行 “mvn package” 进行打包时，会打包成一个可以直接运行的 JAR 文件，使用 “Java -jar” 命令就可以直接运行 -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

# 