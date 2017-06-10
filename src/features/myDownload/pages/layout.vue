<template>
 <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import store from '@/store'
import modules from '../modules/store'

store.registerModule('myDownload', {
  ...modules
})

export default {
  name: 'myDownload'
}
</script>
