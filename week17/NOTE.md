# 工具链

## 工具tools

按照项目开发的阶段来分类：
+ 初始化
  + yeoman
  + create-react-app
  + vue-cli 

+ 开发/调试
  + dev-tool/chrome
  + webpack-dev-server
  + mock
  + wireshark
  + charles
  + vite

+ 测试
  + mocha
  + jest

+ 发布
  + lint
  + jenkins
  
##@ 轮播组件处理flick

```
通过onPanend里判断dx是否>0来处理flick
if(dx + offset > 250 || dx > 0 && event.isFlick) {  //用dx是否>0才判断flick
    direction = 1; 
}else if(dx + offset < -250 || dx < 0 && event.isFlick) {
    direction = -1;
}
```
