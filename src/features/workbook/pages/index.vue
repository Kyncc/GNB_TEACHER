<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '批改作业',showBack: true}"> 
      <div slot="right" style="margin:0"><gnbChangeSub :change.sync='selectedSub'></gnbChangeSub></div>
    </x-header>
    <div>
      asdasd
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'

export default {
  name: 'workbook',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem, gnbChangeSub
  },
  data () {
    return {
      selectedSub: '',
      loading: true
    }
  }
}
</script>
