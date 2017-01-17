# 归纳本教师端

> 基于Vue.js和Dcloud(H5+)混合技术Hybrid App

使用技术简介
------------

### 编译环境

-	[VueLoader](http://vue-loader.vuejs.org/en/index.html)

	### Hybird框架

-	[跨平台技术-H5+](http://www.dcloud.io/runtime.html)

	### 数据视图控制

-	[Vue.js](http://cn.vuejs.org/guide/)

-	[路由-VueRouter](http://router.vuejs.org/zh-cn/index.html)

-	[单项数据流-Vuex(2版本)](http://vuex.vuejs.org/zh-cn/index.html)

-	[VueRouter和Vuex流同步-Vuex-router-sync](https://github.com/vuejs/vuex-router-sync)

	### 功能组件

-	[时间格式化-Moment.js](http://momentjs.cn/)

-	[图片控制剪裁-Cropper.js](https://fengyuanchen.github.io/cropperjs/)

	### UI组件

-	[手机UI库-Vux(1版本)](https://vuxjs.gitbooks.io/vux/content/about/component-standard.html)

-	[触摸手势组件-VueTouch](https://github.com/vuejs/vue-touch)

-	[加载数据组件-Vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/#!/slots)

-	[图片懒加载-Vue-lazyload](https://github.com/hilongjw/vue-lazyload)

-	[灯箱-PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

文件夹结构
----------

```
├── build       # webpack编译配置
├── config      # webpack配置
├── dist        # 打包后文件（此目录放在HBuilder中）
├── App.vue     # 入口页面
├── main.js     # 入口JS
├── store.js    # Store
├── index.html  # html模版
├── src         # 开发目录
    ├── api         # 用来放置接口
    ├── assets      # 静态资源文件
    ├── common      # 公共文件模块
    ├── main        # 主页模块
    ├── login       # 登陆模块
    ├── collect     # 收藏本模块
    ├── error       # 归纳本（错题统计）模块
    ├── picture     # 拍错题模块
    ├── message     # 消息模块
    ├── users       # 个人中心
        ├── pages               # 页面文件
        ├── modules             # 逻辑
        ├── action.js           # action
        └── mutatuinTypes.js    # mutatuinTypes
```

### 安装

```
npm install //安装依赖包
```

### 使用

```
npm run dev     //进入开发模式
npm run build   //打包生成的目录在dist下
```
