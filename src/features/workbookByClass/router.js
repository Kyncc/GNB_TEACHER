import modules from './modules/store'
import store from 'src/store'

export default {
  'workbookByClass': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/workbookByClass'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/class')), '/workbookByClass/'),
      },
      'workbook/:code': {
        component: r => require.ensure([], () => r(require('./pages/workbook')), '/workbookByClass/workbook'),
      },
      'chapter/:code/:workbookId': {
        component:  r => require.ensure([], () => r(require('./pages/chapter')), '/workbookByClass/chapter'),
      },
      '/exercise': {
        component: r => require.ensure([], () => r(require('./pages/exercise/layout')), '/workbookByClass/exercise'),
        subRoutes: {
          '/main/:code/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/exercise')), '/remember/exercise/'),
          },
          '/answer/:code/:chapterId/:name/':{
            component: r => require.ensure([], () => r(require('./pages/exercise/answer')), '/remember/exercise/answer'),
          }
        }
      }
    }
  }
}

store.registerModule('rememberClass', {
  ...modules
});
