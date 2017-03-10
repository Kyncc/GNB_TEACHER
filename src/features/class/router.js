import modules from './modules/store'
import store from 'src/store'

export default {
  'manager': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/manager'),
    subRoutes: {
      '/': {
        component:  r => require.ensure([], () => r(require('./pages/index')), '/manager/'), 
      },
      'create/': {
        component:  r => require.ensure([], () => r(require('./pages/create')), '/manager/create/'),
      },
      'class/:code':{
        component:  r => require.ensure([], () => r(require('./pages/detail/class')), '/manager/class/'),
      },
      'class/invite/:code':{
        component:  r => require.ensure([], () => r(require('./pages/detail/invite')), '/manager/class/invite/'), 
      },
      'class/update/:code':{
        component:  r => require.ensure([], () => r(require('./pages/detail/update')), '/manager/class/update/'), 
      },
      'class/apply/:code':{
        component:  r => require.ensure([], () => r(require('./pages/detail/apply')), '/manager/class/apply/'),
      },
      'class/classmate/:code':{
        component:  r => require.ensure([], () => r(require('./pages/detail/classmate')), '/manager/class/classmate/'), 
      }
    }
  }
}

store.registerModule('class', {
  ...modules
});