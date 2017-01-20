import layout from './pages/layout'
import index from './pages/index'
import settings from '../../features/settings/router'
// import myClass from '../../featrues/myClass/router'
// import userInfo from '../../user/pages/info'

export default {
  'user': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...settings
      // 'info':{component:userInfo},
      // 'photo':{component:photo},
      // ...settings,
      // ...myClass,
    }
  }
}
