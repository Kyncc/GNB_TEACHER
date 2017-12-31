import Vue from 'vue'
import fundebug from 'fundebug-javascript'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

fundebug.apikey = '27416a4b9d578c9c57ee9d6632c2de8f81c84870233cad5f0a00547b9734f177'
fundebug.appversion = '3.5.0'
fundebug.silentResource = true

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData
  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
