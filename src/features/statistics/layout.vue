<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import error from './error/modules/store'
import errorClass from './errorClass/index/modules/store'
import store from '@/store'

export default {
  name: 'statistics',
  beforeCreate () {
    store.registerModule('errorClassmate', {
      ...error
    })
    store.registerModule('errorClass', {
      ...errorClass
    })
  }
}
</script>
