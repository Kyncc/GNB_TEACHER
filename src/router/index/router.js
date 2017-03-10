import workbookByClass from '../../features/workbookByClass/router'

export default {
  'index': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/index'),
    subRoutes: {
      '/':{component:r => require.ensure([], () => r(require('./pages/index')), '/index/')},
      ...workbookByClass
    }
  }
}
