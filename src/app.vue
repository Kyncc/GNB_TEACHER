<template>
  <div>
    <router-view></router-view>
    <loading :show="isLoading" text="请稍候"  position="absolute"></loading>
    <toast :show="show" type="text" :text="msg" :time="1000"></toast>
  </div>
</template>

<script>
import store from './store'
import {Loading,Toast} from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
     Loading,Toast
  },
  store,
  computed: mapState({
    msg: state => state.show.toastMsg,
    show: state => state.show.toastShow,
    isLoading: state => state.show.isLoading
  })
}
</script>

<style>
   @import 'assets/vux.css';
</style>
