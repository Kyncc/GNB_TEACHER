export default [
  // 班级选择
  {
    path: 'errorClass/class',
    name: 'errorClass',
    component: r => require.ensure([], () => r(require('./index')), '/errorClass/class')
  },
  // 章节选择
  {
    path: 'errorClass/chapter/:classCode/:name',
    name: 'errorClassChapter',
    component: r => require.ensure([], () => r(require('./chapter')), '/errorClass/chapter')
  },
  // 筛选页面
  {
    path: 'errorClass/chapter/options/:classCode',
    name: 'errorClassOptions',
    component: r => require.ensure([], () => r(require('./options')), '/errorClass/chapter/options')
  },
  {
    path: 'errorClass/error',
    component: r => require.ensure([], () => r(require('./pages/layout')), '/errorClass/error'),
    children: [
      {
        path: 'camera/:classCode/:subject/:chapterId/:name',
        name: 'errorClassCamera',
        component: r => require.ensure([], () => r(require('./pages/camera')), '/errorClass/error/camera')
      },
      {
        path: 'remember/:classCode/:subject/:chapterId/:name',
        name: 'errorClassRemember',
        component: r => require.ensure([], () => r(require('./pages/remember')), '/errorClass/error/remember')
      },
      {
        path: 'good/:classCode/:subject/:chapterId/:name',
        name: 'errorClassGood',
        component: r => require.ensure([], () => r(require('./pages/good')), '/errorClass/error/good')
      }
    ]
  },
  // 记错题筛选
  {
    path: 'errorClass/error/remember/assemble/options',
    name: 'errorClassRemember_options',
    component: r => require.ensure([], () => r(require('./pages/rememberOptions')), '/errorClass/error/remember/options')
  },
  // 精选题筛选
  {
    path: 'errorClass/error/good/assemble/options',
    name: 'errorClassGood_options',
    component: r => require.ensure([], () => r(require('./pages/goodOptions')), '/errorClass/error/good/options')
  },
  // 记错题组卷
  {
    path: 'errorClass/error/remember/assemble/:classCode/:subject',
    name: 'errorClassRemember_assemble',
    component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/errorClass/error/remember/assemble')
  },
  // 精选题组卷
  {
    path: 'errorClass/error/good/assemble/:classCode/:subject',
    name: 'errorClassGood_assemble',
    component: r => require.ensure([], () => r(require('./pages/goodAssemble')), '/errorClass/error/good/assemble')
  },
  // 拍错题组卷
  {
    path: 'errorClass/error/camera/assemble/:classCode/:subject',
    name: 'errorClassCamera_assemble',
    component: r => require.ensure([], () => r(require('./pages/cameraAssemble')), '/errorClass/error/camera/assemble')
  }
]
