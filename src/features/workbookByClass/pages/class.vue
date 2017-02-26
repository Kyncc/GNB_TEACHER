<template>
  <view-box class='myClass'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        班级列表
      </x-header>
    </div>
    <div style="padding-top:46px">
      <group>
        <template v-for="item in User.class" >
          <cell :title="item.name" :link="'workbook/'+item.code"></cell>
        </template>
      </group>
    </div>
  </view-box>
</template>
<script>

import { XHeader,Group,ViewBox,Cell }from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {XHeader,Group,ViewBox,Cell},
  computed:{
    ...mapGetters(['User'])
  }
}
</script>