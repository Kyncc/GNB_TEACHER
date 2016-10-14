<template>
<view-box v-ref:view-box class='myClass'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
  <x-header :left-options="{showBack: true}">数学一班</x-header>
  </div>
  <group style="padding-top:46px;">
    <cell v-for="item in fetchClassMateList" :title="item.name" >
        <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
    </cell>
  </group>
</view-box>
</template>

<script>
import './myClass.less'
import {
  XHeader,
  Cell,
  Group,
  XButton,
  ViewBox
}
from 'vux'
import { myClassmateList,applyList,replyApply} from '../../class/actions.js'
import { fetchClassMateList,fetchApplyList } from '../../class/getters.js'
import { token,id } from '../../common/getters.js'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    ViewBox
  },
  vuex:{
    actions:{
        myClassmateList,applyList,replyApply
    },
    getters:{
        fetchClassMateList,token,id,fetchApplyList
    }
  },
  methods:{
  },
  ready(){
      this.myClassmateList({
          classCode:this.id,
          token:this.token
      })
  },
  data(){
    return {
    }
  }
}
</script>
