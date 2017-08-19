<template>
 <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'
import modules from '../modules/store'

export default {
  name: 'Points',
  beforeCreate () {
    store.registerModule('points', {
      ...modules
    })
  }
}
</script>
