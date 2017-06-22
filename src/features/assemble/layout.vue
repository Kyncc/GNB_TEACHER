<template>
 <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'
import modules from './modules/store'

export default {
  name: 'assemble',
  beforeCreate () {
    store.registerModule('assemble', {
      ...modules
    })
  }
}
</script>
