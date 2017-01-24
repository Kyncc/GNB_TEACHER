import layout from './pages/layout'
import index from './pages/index'
import workbook from './pages/workbook'
import workbookByPage from './pages/page'
import exercise from './pages/exercise'

export default {
  'remember': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      'example/:id': {
        component: example
      },
      'workbook/:bookId': {
        component: workbook
      },
      'workbook/byPage/:bookId': {
        component: workbookByPage
      },
      'workbook/exercise/:chapterId': {
        component: exercise
      }
    }
  }
}
