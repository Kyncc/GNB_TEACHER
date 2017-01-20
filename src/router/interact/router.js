import layout from './pages/layout'
import index from './pages/index'
// import remember from '../../featrues/remember/router'

export default {
  'index': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      // ...remember
    }
  }
}
