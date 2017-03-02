import index from './pages/index'
import layout from './pages/layout'

export default {
  'introduction':{
    component: layout,
    subRoutes: {
      '/': {
        component: index,
      }
    }
  }
}
