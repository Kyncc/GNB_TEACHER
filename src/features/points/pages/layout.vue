<template>
 <!--hack阻止list下Android 4.4得闪崩-->
 <keep-alive exclude='list'>
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
