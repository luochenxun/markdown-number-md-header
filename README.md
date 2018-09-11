# markdown-number-md-header

A NodeJS script to number the markdown's header like : 1 , 1.1 , 1.2 .....

To run this script , you need a NodeJS environment to run , learn more : <https://github.com/nodejs/node>

## version

V1.0.1 : Fix bug in codes, skip the # in codes <br>
V1.0.0 : init version

## Install

1、clone the script

`git clone https://github.com/luochenxun/markdown-number-md-header.git`

2、Install it to your buildPath

`sudo cp ./markdownNumberHeader.js /usr/local/bin`

## Brief

This script is used to number the header of markdown-files as doc-numbers , like :

```
#     ->    #1   
##    ->    ##1.1    
##    ->    ##1.2    
###   ->    ###1.2.1   
#     ->    #2   
##    ->    ##2.1
```

You can use it to translate a markdown-file directly, or you can use it to a diretory.<br>
When you use a diretory as a option of the script, it will traverse the diretory and its sub-diretory , and translate all the .md files it them.

### Usage :

```
1\. markdownNumberHeader xxx/xxx/xxx.md  
2\. markdownNumberHeader xxx/xxx/Diretory
```

## 简介

markdown凭借其简单、方便、直接的写作方式，受到越来越多人的喜爱。

我们用markdown写文档时是否总喜欢用 header符号 `#`来给文章分段落，但是markdown不支持给段落编号，这使们我们总要手动为段落加上编号，这样很不方便，尤其是当段落修改时修改编号会带来大灾难。

markdownNumberHeader.js 脚本就是解决这个问题的大救星~

本脚本用于给 Markdown 文档的Header加上文档编号，就像word文档一样，它会为你的md文档自动作这样的修改：

```
#     ->    #1   
##    ->    ##1.1    
##    ->    ##1.2    
###   ->    ###1.2.1   
#     ->    #2   
##    ->    ##2.1
```

你可以使用它来转化你的 md文档（以 .md 为后缀），或是转化一个目录（它会自动遍历目录及其子目录里的所有md文档，并转化之）。

### 使用方法 :

```
1\. markdownNumberHeader xxx/xxx/xxx.md  
2\. markdownNumberHeader xxx/xxx/Diretory
```





