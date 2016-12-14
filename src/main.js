import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
import App from './app'
import store from './store'
import * as _ from './config/whole.js'
//登陆、注册
import Login from './login/pages/login'
import register from './login/pages/register'
import setPassword from './login/pages/setPassword'
import forget from './login/pages/forget'
import resetPassword from './login/pages/resetPassword'
//首页
import Main from './main/common/main'
import User from './main/pages/user'
import Message from './main/pages/message'
import Index from './main/pages/index'
import Photo from './main/pages/photo'
//题目评注、纠错、参考例题
import correct from './common/pages/correct'
import comment from './common/pages/comment'
import example from './common/pages/example'
//记错题
// import remember from './remember/pages/index'
// import rememberWorkbook from './remember/pages/workbook'
// import rememberExercise from './remember/pages/exercise'
// import rememberExample from './remember/pages/example'
//通知
import messageClass from './message/pages/class'
import messageCorrect from './message/pages/correct'
import messageSystem from './message/pages/system'
//个人中心
import userResetPwd from './user/pages/resetPwd'
import userInfo from './user/pages/info'
//个人中心-设置
import userSettingsIndex from './user/pages/settings/index'
import userSettingsAdvice from './user/pages/settings/advice'
import userSettingsAdviceHistory from './user/pages/settings/adviceHistory'
//查错题
import error from './error/pages/index'
import errorClass from './error/pages/class'
import errorByStudent from './error/pages/byStudent'
//知识图谱
import reportIndex from './report/pages/index'
import reportClass from './report/pages/class'
import reportStudent from './report/pages/student'
import reportDetail from './report/pages/detail'
//刷题型
import brush from './brush/pages/index'
import brushClass from './brush/pages/class'
import brushChapter from './brush/pages/chapter'
import brushList from './brush/pages/list'
//放弃列表
import pass from './pass/pages/index'
import passClass from './pass/pages/class'
import passChapter from './pass/pages/chapter'
// import passList from './brush/pages/list'
//斩题列表
import breakIndex from './break/pages/index'
import breakClass from './break/pages/class'
import breakChapter from './break/pages/chapter'
//我的班级
import classIndex from './class/pages/index'
import classManage from './class/pages/manager'
import classCreate from './class/pages/create'
import classmate from './class/pages/classmate'
import classInvite from './class/pages/invite'
import classApply from './class/pages/apply'

//插件
import moment from 'moment'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import '../node_modules/cropperjs/dist/cropper.min.css'

Vue.use(Router)
Vue.use(VueTouch)

Vue.config.devtools = true
FastClick.attach(document.body)

//图片异步加载
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'http://www.chinasanbao.com/new/upload/headimg/headimg.png',
  loading: 'http://hilongjw.github.io/vue-lazyload/dist/loading-spin.svg'
})

//格式化时间
Vue.filter('ymd', function(value) {
    return moment.unix(value).format('YYYY-MM-DD');
});

//请求超时
Vue.http.interceptors.push((request, next) => {
    var timeout;
    if (request._timeout) {
        timeout = setTimeout(() => {
            if(request.onTimeout) request.onTimeout(request)
            request.abort()
        }, request._timeout);
    }
    next((response) => {
        clearTimeout(timeout);
    });
})

const router = new Router()
router.map({
    '/login': { component: Login },
    //注册账户
    'register': { component: register },
    'register/password': { component: setPassword },
    //忘记密码
    'forget': { component: forget },
    'forget/password': { component: resetPassword },
    //纠错
    'correct/:subjectId/:id':{component: correct},
    //参考例题
    'example/:studentId/:subjectId/:id':{component: example},
    //评注
    'comment/:id':{component: comment},
    //主页
    'main/': {
        component: Main,
        subRoutes: {
            'user/': {
                component: User
            },
            'message/': {
                component: Message
            },
            'index/': {
                component: Index
            }
        }
    },
    'main/user/photo':{
        component: Photo
    },
    //消息
    'message/class': { component: messageClass },
    'message/system': { component: messageSystem },
    'message/correct': { component: messageCorrect },
    //个人中心
    'user/info': { component: userInfo },
    'user/resetPwd': { component: userResetPwd },
    //设置
    'user/settings': { component: userSettingsIndex },
    'user/settings/advice': { component: userSettingsAdvice },
    'user/settings/advice/history': { component: userSettingsAdviceHistory },
    //知识图谱
    'report': {component:reportIndex},
    'report/class/:code': {component:reportClass},
    'report/student/:id': {component: reportStudent},
    'report/student/detail/:id/:chapterId': {component: reportDetail},
    //查错题
    'error': { component: error },
    'error/class/:code': { component: errorClass },
    'error/student/:id': { component: errorByStudent},
    //刷题型 Brush
    'brush': { component: brush },
    'brush/class/:code': { component: brushClass},
    'brush/chapter/:id': { component:brushChapter},
    'brush/chapter/list/:id/:chapterId': { component:brushList},
     //放弃列表
    'pass': { component: pass },
    'pass/class/:code': { component: passClass},
    'pass/chapter/:id': { component:passChapter},
    // 'pass/chapter/list/:id/:chapterId': { component:brushList},
    //斩断列表
    'break': { component: breakIndex },
    'break/class/:code': { component: breakClass},
    'break/chapter/:id': { component:breakChapter},
    //我的班级
    'class': { component: classIndex },
    'class/manager/:id': { component: classManage },
    'class/create': { component: classCreate },
    'class/classmate/:id': { component: classmate },
    'class/invite/:id': { component: classInvite },
    'class/apply/:id':{ component: classApply},

    //记错题
    // 'remember/:id':{component: remember},
    // 'remember/example/:id': { component:  rememberExample},
    // 'remember/workbook/:bookId':{component: rememberWorkbook},
    // 'remember/workbook/exercise/:chapterId':{component: rememberExercise},


  
})

router.redirect({
    '/main/': '/main/index',
});

sync(store, router)
router.beforeEach(function(transition) {
    if (transition.to.path == '/') {
        if(localStorage.token){
            router.replace('/main/index');
        }else{
            router.replace('/login');
        }
    }
    transition.next();
})

//判断系统
var ua = navigator.userAgent.toLowerCase();
const commit = store.commit || store.dispatch
if (/iphone|ipad|ipod/.test(ua)) {
     commit('SET_SYSTEM', 'IOS')
} else if (/android/.test(ua)) {
     commit('SET_SYSTEM', 'Android')
}

function plusReady(){
    let first = null;
    plus.key.addEventListener("backbutton",function(){
        if(store.state.route.path == '/main/index' || store.state.route.path =='/main/message' || store.state.route.path =='/main/user'){
            if (!first) {
                first = new Date().getTime();
                _.toast('再按一次退出')
                setTimeout(function() {
                    first = null;
                }, 1000);
            } else {
                if (new Date().getTime() - first < 1000) {
                    plus.runtime.quit();
                }
            }
        }else{
            window.history.back();
        }
    });
}

if(window.plus){
    plusReady();
}else{
    document.addEventListener("plusready",plusReady,false);
}

router.start(App, '#App')
