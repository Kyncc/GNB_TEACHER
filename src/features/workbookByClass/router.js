import layout from './pages/layout'
import workbook from './pages/workbook'
import chapter from './pages/chapter'
import page from './pages/page'
import exercise from './pages/exercise'
import classList from './pages/class'
import modules from './modules/store'
import store from 'src/store'

export default {
  'workbookByClass': {
    component: layout,
    subRoutes: {
      '/': {
        component: classList
      },
      'workbook/:code': {
        component: workbook
      },
      'chapter/:code/:workbookId': {
        component: chapter
      },
      'page/:code/:workbookId': {
        component: page
      },
      'exercise/:code/:chapterId': {
        component: exercise
      }
    }
  }
}


store.registerModule('rememberClass', {
  ...modules
});
