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
//题目评注、纠错
import correct from './common/pages/correct'
import comment from './common/pages/comment'
//记错题
import remember from './remember/pages/index'
import rememberWorkbook from './remember/pages/workbook'
import rememberExercise from './remember/pages/exercise'
import rememberExample from './remember/pages/example'
import rememberAdd from './remember/pages/add'
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
import indexCheckIndex from './check/pages/index'
import indexCheckDetail from './check/pages/detail'
import indexCheckError from './check/pages/error'
import indexCheckErrorDetail from './check/pages/errorDetail'
import indexCheckErrorLevel from './check/pages/errorLevel'
//知识图谱
import reportIndex from './report/pages/index'
import reportClass from './report/pages/class'
import reportStudent from './report/pages/student'
import reportDetail from './report/pages/detail'
//刷题型
import brush from './brush/pages/index'
import brushClass from './brush/pages/class'
import brushChapter from './brush/pages/chapter'

import brushExample from './brush/pages/example'
import brushList from './brush/pages/list'
import indexBrushError from './brush/pages/error'
import indexBrushErrorDetail from './brush/pages/errorDetail'
//我的班级
import indexClassIndex from './class/pages/index'
import indexClassCreate from './class/pages/createClass'
import indexClassDetail from './class/pages/classDetail'
import indexClassInvite from './class/pages/invite'
import indexClassManage from './class/pages/classManage'
import indexClassApply from './class/pages/classApply'
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
    'report/detail/:chapterId': {component: reportDetail},
    //刷题型 Brush
    'brush': { component: brush },
    'brush/class/:code': { component: brushClass},
    'brush/charpter/:studentId': { component:brushChapter},

    'index/brush/error/:id': { component:indexBrushError },
    // 'index/brush/list/:id': { component:indexBrushList },
    'brush/example/:id':{component: brushExample},
    'brush/list/:chapterId':{component: brushList},
    'index/brush/detail/errorDetail/:id': { component:indexBrushErrorDetail },

    //我的班级
    'index/class': { component: indexClassIndex },
    'index/createClass': { component: indexClassCreate },
    'index/class/detail/:id': { component: indexClassDetail },
    'index/class/invite/:id': { component: indexClassInvite },
    'index/class/manage/:id': { component: indexClassManage },
    'index/class/apply/:id':{ component: indexClassApply},
    //记错题
    'remember/:id':{component: remember},
    'remember/add':{component: rememberAdd},
    'remember/example/:id': { component:  rememberExample},
    'remember/workbook/:bookId':{component: rememberWorkbook},
    'remember/workbook/exercise/:chapterId':{component: rememberExercise},
    //查错题
    'index/check': { component: indexCheckIndex },
    'index/check/detail/:id': { component: indexCheckDetail },
    'index/check/error/level/:id': { component: indexCheckErrorLevel },//错误程度
    'index/check/detail/error/:id': { component: indexCheckError},
    'index/check/detail/errorDetail/:id': { component: indexCheckErrorDetail},
    

  
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
