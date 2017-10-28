<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import errorClass from './errorClass/modules/store'
import store from '@/store'

export default {
  name: 'statistics',
  beforeCreate () {
    store.registerModule('errorClass', {
      ...errorClass
    })
  }
}
</script>
