import index from './pages/index'
import modules from './modules/store'
import store from 'src/store'

export default {
  '/example/:subjectId/:id': {
    component: index
  }
}

store.registerModule('example', {
  ...modules
});