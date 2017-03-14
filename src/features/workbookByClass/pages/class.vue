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
          <cell :title="item.name"  @click="_into(item.classCode)"></cell>
        </template>
      </group>
    </div>
  </view-box>
</template>
<script>

import { XHeader,Group,ViewBox,Cell }from 'vux'
import { mapGetters,mapActions } from 'vuex'

export default {
  components: {XHeader,Group,ViewBox,Cell},
  computed:{
    ...mapGetters(['User'])
  },
  methods:{
     ...mapActions(['getTextbookClass']),
     _into(code){
       this.getTextbookClass({
          "code":code
       })
       .then(()=>{
         this.$router.go(`workbook/${code}`)
       })
     }
  }
}
</script>