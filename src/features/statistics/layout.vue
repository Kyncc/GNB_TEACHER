<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'

export default {
  name: 'statistics',
  beforeCreate () {
    store.registerModule('statistics', {})
  }
}
</script>
