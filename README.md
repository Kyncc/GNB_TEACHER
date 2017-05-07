# Induction Book for teacher(归纳本教师端)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Base on Vue.js(v2.3) and DCloud Hybrid App

## App Market Download(IOS and Android)

![DownloadPicture](http://okkula0y9.bkt.clouddn.com/teacher.png)

## License

MIT

## Technology Overview

### Compiler Environment

-	[vuxLoader](https://github.com/airyland/vux-loader)

### Cross Platform

-	[DCloud](http://www.dcloud.io/runtime.html)

### Main Javascript Framework

-	[vue](http://cn.vuejs.org/guide/)

-	[vue-router](http://router.vuejs.org/zh-cn/index.html)

-	[vuex](http://vuex.vuejs.org/zh-cn/index.html)

-	[Axios - Http Client](https://github.com/mzabriskie/axios)

-	[vuex-router-sync - Keep vue-router and vuex store in sync](https://github.com/vuejs/vuex-router-sync)

### Plugins

-	[Cropper.js - Image cropping plugin](https://fengyuanchen.github.io/cropperjs/)

-	[PhotoSwipe - JavaScript image gallery for mobile](https://github.com/dimsemenov/PhotoSwipe)

### UI Compoents

-	[Vux - Vue UI Components](https://vux.li/#/)

-	[Vue-lazyload - An Image lazyload plugin for Vue](https://github.com/hilongjw/vue-lazyload)

## File Structure Introduction

```
├── build       # webpack Build
├── config      # webpack Config
├── dist        # Dist Folder
├── app.vue     # Entry File
├── main.js     # Entry Js
├── store.js    # Vuex Main Stroe
├── router.js   # Main Router
├── theme.less  # Vux UI Color Config
├── index.html  # Html Template
├── components  # UI or Function Components
├── src         # Code Folder
    ├── router      # Main Pages
    ├── features    # Modules
        ├── common      # 全局功能函数
        ├── workbook    # 查答案
        ├── example     # 例题
        ├── myclass     # 我的班级
        ├── message     # 消息
        ├── login       # 登陆
        ├── settings    # 设置
        ├── about       # 关于归纳本
```

### How to run it

## Install
```
npm install 
```

## Development
```
npm run dev

```
### Build
```
npm run build
npm run build --report
```