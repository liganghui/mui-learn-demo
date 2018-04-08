 ## 说明

 这是一个使用Mui开发的仿知乎日报的APP。  
 
 程序整体由6个页面组成，具有一定逻辑复杂度。
 
 主要使用：MUI+VUE

## 实现的功能模块

  * 每日热闻和主题日报阅读
  
  * 日报长短评论的查看
 
  * 日报收藏的本地化存储
 
## 功能演示 


### 首页与详情页
<img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo1.png"> <img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo1.gif">



### 菜单栏与主题日报
<img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo2.png"> <img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo2.gif">



### 评论页
<img  width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo3.png"> <img width="270" height="480" src="https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/demo/demo3.gif">

## 如何运行

 1. 打包下载项目,使用HBuilder真机调试
 2. 下载打包后的APP   [Android]()  


## 使用的API接口

  [Xiao Liang的知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

## 未来更新计划

 * 基于日期控件的日报查看
 * 程序的升级
 * 消息的推送
 * 融合其他新闻API
## 目录结构
```
│  index.html      APP首页   
│  manifest.json   配置文件
│  ....
├─css  
│    components.css  Vue全局组件样式  
│    iconfont.css    字体图标
│    imgload.css     图片缓存样式
│    news.css        知乎日报提供的样式
│    vue-loaders.css vue-loaders插件
│    ....
├─doc  说明文档
│   ....
├─fonts  字体文件  
│   ....     
├─html    
│    collection.html 我的收藏页     
│    comment.html    评论页
│    detail.html     日报详情页
│    menu.html       侧滑菜单页
│    theme.html      主题日报页
├─img
│  ....
├─js  
│    components.js       Vue全局组件
│    config.js           app系统配置  
│    imgload.js          图片缓存
│    smoothscroll.js     页面平滑滚动插件
│    vue-loaders.umd.js  vue-loaders插件
│      ....
```

## 页面逻辑图

各页面代码大同小异，针对较复杂的首页与下拉刷新给出
逻辑图，方便快速了解。



首页JS逻辑：
![image](https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/%E9%A6%96%E9%A1%B5JS%E9%80%BB%E8%BE%91%E5%9B%BE.png)


下拉刷新逻辑：
![image](https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0%E9%80%BB%E8%BE%91%E5%9B%BE.png)

