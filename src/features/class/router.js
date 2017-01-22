import layout from './pages/layout'
import index from './pages/index'
import create from './pages/create'
import classes from './pages/detail/class'
import invite from './pages/detail/invite'
import classmate from './pages/detail/classmate'

import modules from './modules/store'
import store from 'src/store'

export default {
  'manager': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      'create/': {
        component: create
      },
      'class/:code':{
        component: classes
      },
      'class/invite/:code':{
        component: invite
      },
      'class/classmate/:code':{
        component: classmate
      }
    }
  }
}

store.registerModule('class', {
  ...modules
});