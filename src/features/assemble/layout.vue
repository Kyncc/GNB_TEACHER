<template>
 <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'
import modules from './modules/store'

store.registerModule('assemble', {
  ...modules
})

export default {
  name: 'assemble'
}
</script>
