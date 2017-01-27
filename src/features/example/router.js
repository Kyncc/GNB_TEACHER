import example from './pages/index'
import modules from './modules/store'
import store from 'src/store'

export default {
  '/example/:studentId/:subjectId/:id': {
    component: example
  }
}

store.registerModule('example', {
  ...modules
});