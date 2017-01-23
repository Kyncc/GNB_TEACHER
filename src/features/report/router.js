import layout from './pages/layout'
import index from './pages/index'
import detail from './pages/detail'

export default  {
  'report': {
    component: layout,
    subRoutes: {
      '/:studentId/:code': {
        component: index,
      },
      '/detail/:studentId/:chapterId': {
        component: detail
      }
    }
  }
}
