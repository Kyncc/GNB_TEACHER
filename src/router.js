import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import index from './router/router'
import login from './features/login/router'
import about from './features/about/router'
import correct from './features/correct/router'
// import error from './features/error/router'
import example from './features/example/router'
import homework from './features/homework/router'
import message from './features/message/router'
import myclass from './features/myclass/router'
import assemble from './features/assemble/router'
import myDownload from './features/myDownload/router'
import download from './features/download/router'
import settings from './features/settings/router'
import workbook from './features/workbook/router'
import statistics from './features/statistics/router'
import invite from './features/invite/router'
import points from './features/points/router'
import paper from './features/paper/router'

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  routes: [
    assemble,
    about,
    correct,
    download,
    // error,
    example,
    homework,
    invite,
    ...index,
    ...statistics,
    login,
    message,
    myDownload,
    myclass,
    points,
    paper,
    settings,
    workbook
  ]
})

// 同步store和路由
sync(store, router)

export default router
