 ## 说明

 :wave:这是一个使用Mui开发的仿知乎日报的APP,适合新手快速了解Mui开发。

 主要使用了：MUI+VUE。
 
##### 注意：Vue仅支持安卓6.0及以上版本！ 

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
 2. 下载打包后的APP   [Android](https://github.com/liganghui/mui-learn-demo/raw/master/doc/demo.apk)  


## 使用的API接口

  [Xiao Liang的知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)


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
![image](https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/js-1.png)


下拉刷新逻辑：
![image](https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/js-2.png)

## 页面是如何进行切换的

详细文档：
  [MUI](http://dev.dcloud.net.cn/mui/ui/)
  [H5+](http://www.dcloud.io/docs/api/zh_cn/webview.html)  
  
  ![image](https://raw.githubusercontent.com/liganghui/mui-learn-demo/master/doc/js-3.png)
  
 ## 写在最后

   个人觉得Mui适合简单的业务场景，在开发一些复杂应用时存在很多坑，建议在使用之前一定做好可行性评估，避免做到一半出现杯具。
 这个DEMO在代码的角度说实现不够优雅，受限于MUI的传统开发方式，我在首页中融合了大量内容，显的有些杂乱。由于MUI自身的组件缺陷，很多地方也不得不造轮子。整体讲：如果你对MUI有兴趣，可以将它作为了解MUI开发APP方式的基础DEMO，不建议深入学习。

  
 ##  问题补充2018/07
  
   首先感谢大家的star。
   
   自这个DEMO开发完成起，我便每天都在使用，长时间使用过程遇到几个问题，特此指出：  
   
    1. 日报列表读取缓存出现图片错位情况。
    2. 下拉刷新更新多个内容时，部分内容会不显示。(重启应用解决)
    3. 日报列表缓存缺乏时效性控制，过多缓存降低了加载性能。（手动清空应用缓存解决）
   
   虽然我每天都在使用，但由于自身的懒以及对MUI的失望，便一直没有解决。未来或开发RN(React-native)/小程序版本 替代这个。
   
   在写完这个DEMO后，因业务需要 先后学习使用 IONIC3 和 RN。  
   
   提供一下个人对比，有兴趣可以参考：
      
      IONIC3： 可以看做MUI的加强版：ng4(angular4),SCSS,Typescript加持，同时框架本身封装了大量组件，以及做了模拟IOS/Android的交互反馈，系统差异性优化。本质上还是走的WebView的路线，可以浏览器实时调试，但不可以连接真机实时调试开发。
      
      RN: RN主要以React为核心，纯组件化，相比IONIC等套壳WebView框架上升一个层级，打包直接为原生代码。框架本身封装大量原生组件，并有众多开源组件提供。社区高度活跃，用户量相比IONIC3大一个数量级，遇到问题好解决。RN中CSS阉割掉一部分，JS的书写方式没有Ionic3中Scss爽。同时开发高度依赖社区组件，稳定性差一些。不可以浏览器实时调试，但可以连接真机实时调试开发，可以有效避免一些意想不到的BUG。
      我本人更看好RN的未来。
      
      
 
   
