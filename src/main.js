import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './app'
import store from './store'
import * as _ from 'config/whole.js'

import Login from './router/login/router'
import Correct from './features/correct/router'
import Layout from './router/layout'
import User from './router/user/router'
import Index from './router/index/router'
import Classes from './router/Classes/router'
import Interact from './router/interact/router'

// //我的班级
// import classIndex from './class/pages/index'
// import classManage from './class/pages/manager'
// import classCreate from './class/pages/create'
// import classmate from './class/pages/classmate'
// import classInvite from './class/pages/invite'
// import classApply from './class/pages/apply'

//插件
import moment from 'moment'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import '../node_modules/cropperjs/dist/cropper.min.css'
import './common/common.less'

Vue.use(Router)

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

const router = new Router()
router.map({
  ...Login,
  ...Correct,
  'main': {
    component: Layout,
    subRoutes: {
      ...Index,
      ...User,
      ...Classes,
      ...Interact
    }
  }
  // //我的班级
  // 'class': { component: classIndex },
  // 'class/manager/:code': { component: classManage },
  // 'class/create': { component: classCreate },
  // 'class/classmate/:code': { component: classmate },
  // 'class/invite/:code': { component: classInvite },
})

sync(store, router)

// router.beforeEach(function(transition) {
//     if (transition.to.path == '/') {
//         if(localStorage.token){
//             router.replace('/main/index');
//         }else{
//             router.replace('/login');
//         }
//     }
//     transition.next();
// })

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
