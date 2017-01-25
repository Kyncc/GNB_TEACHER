import layout from './pages/layout'
import index from './pages/index'
import chapter from './pages/chapter'
import page from './pages/page'
import exercise from './pages/exercise'
import modules from './modules/store'
import store from 'src/store'

export default {
  'rememberByClass': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      'chapter/:code/:workbookId': {
        component: chapter
      },
      'page/:code/:workbookId': {
        component: workbookByPage
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
