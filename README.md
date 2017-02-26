# 归纳本教师端

> 基于Vue.js(1.x)和Dcloud(H5+)混合技术Hybrid App

## 苹果安卓市场下载

![商店下载](http://okkula0y9.bkt.clouddn.com/teacher.png)

### 编译环境

-	[VueLoader](http://vue-loader.vuejs.org/en/index.html)

### Hybird框架

-	[跨平台技术-H5+](http://www.dcloud.io/runtime.html)

### 数据视图控制

-	[Vue1.x](http://cn.vuejs.org/guide/)

-	[路由-VueRouter1.x](http://router.vuejs.org/zh-cn/index.html)

-	[http请求-Axios](https://github.com/mzabriskie/axios)

-	[单项数据流-Vuex(2.x)](http://vuex.vuejs.org/zh-cn/index.html)

-	[VueRouter和Vuex流同步-Vuex-router-sync(2.x)](https://github.com/vuejs/vuex-router-sync)

### 功能组件

-	[时间格式化-Moment.js](http://momentjs.cn/)

-	[图片控制剪裁-Cropper.js](https://fengyuanchen.github.io/cropperjs/)

### UI组件

-	[手机UI库-Vux(0.x)](https://vux.li/#/zh-CN/README?id=-%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8webpack)

-	[加载数据组件-Vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/#!/slots)

-	[图片懒加载-Vue-lazyload](https://github.com/hilongjw/vue-lazyload)

-	[灯箱-PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

### 文件夹结构

```
├── build       # webpack编译配置
├── config      # webpack配置
├── distT       # 打包后文件（此目录放在HBuilder中）
├── app.vue     # 入口页面
├── main.js     # 入口JS
├── store.js    # store
├── index.html  # html模版
├── components  # 公用的组件
├── src         # 开发目录
    ├── router      # 主体模块
        ├── classes     # 班级
        ├── index       # 首页
        ├── login       # 注册、登陆
        ├── interact    # 互动
        ├── user        # 个人中心
    ├── features    # 功能模块
        ├── common      # 全局功能函数（HTTP配置,弹窗等）
        ├── camera      # 拍错题模块
        ├── remember    # 记错题模块
        ├── message     # 消息模块
        ├── report      # 成绩报告单模块
        ├── brushed     # 管理学生题型
        ├── brush       # 刷题列表
        ├── break       # 斩题列表
        ├── pass        # 弃题列表
        ├── settings    # 设置
        ├── workbookByClass    # 作业统计
        ├── workbookByStudent  # 个人作业
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
