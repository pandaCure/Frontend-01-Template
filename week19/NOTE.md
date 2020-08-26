# 整合工具链

### yeoman使用

yeoman：  
https://yeoman.io/authoring/index.html  
通过yeoman将component和工具链整合起来

+ 建立toytool文件夹，npm init，协议建议MIT
+ npm install yeoman-generator
+ npm link
+ yo toytool

templates：  
https://yeoman.io/authoring/file-system.html

+ 建立目录结构generators>app>templates>index.html
```
测试代码：
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```
+ yo toytool
