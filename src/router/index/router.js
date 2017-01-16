import layout from './layout'
import index from './index'
import remember from '../../featrues/remember/router'

export default {
  'index': {
    component: layout,
    subRoutes: {
      '/':{component: index},
      ...remember
    }
  }
}
