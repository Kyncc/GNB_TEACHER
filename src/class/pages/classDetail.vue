<template>
<view-box v-ref:view-box class='myClass'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
  <x-header :left-options="{showBack: true}">数学一班</x-header>
  <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
    <flexbox-item :span="3/4">
      <button-tab>
        <button-tab-item v-touch:tap="_list('student')" :selected="selected">学生列表</button-tab-item>
        <button-tab-item v-touch:tap="_list('apply')"  :selected="!selected">申请列表</button-tab-item>
      </button-tab>
    </flexbox-item>
  </flexbox>
  </div>
  <group style="padding-top:98px;" v-show="selected">
    <cell v-for="item in fetchClassMateList" :title="item.name" >
        <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
    </cell>
  </group>
  <group style="padding-top:98px;" v-show="!selected">
    <div v-for="item in list" class="applyList">
        <p class="msg">{{item.title}}申请加入数学一班 <span class="disable">2016.10.13</span></p>
        <p class="state disable">已同意</p>
        <x-button class="leftbtn" type='warn' mini>拒绝</x-button>
        <x-button class="rightbtn" type='primary' mini>同意</x-button>
    </div>
  </group>
</view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Search,
  XButton,
  ViewBox,ButtonTab,ButtonTabItem
}
from 'vux'
import { myClassmateList,applyList} from '../actions.js'
import { fetchClassMateList,fetchApplyList } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Search,
    ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton
  },
  vuex:{
    actions:{
        myClassmateList,applyList
    },
    getters:{
        fetchClassMateList,token,id,fetchApplyList
    }
  },
  ready(){
      this.myClassmateList({
          classCode:this.id,
          token:this.token
      })
      this.applyList({
          classCode:this.id,
          token:this.token
      })
  },
  data(){
    return {
        list:[{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'},{title:'李同学'}],
        selected: true
    }
  },
  methods: {
    _list(val) {
        if(val=='apply'){
            this.selected = false
        }else{
            this.selected = true
        }
    }
  }
}
</script>
<style lang="less" scoped>
    .applyList{
        padding:1rem;
        border-bottom:1px solid #999;
        .msg{
            line-height:2rem;
            font-size:1rem;
            span{
                font-size:0.8rem;
                float:right;
            }
        }
        .state{
            text-align:center;
            font-size:0.8rem;
        }
        .leftbtn{
            width:30%;
            margin-top:0;
        }
        .rightbtn{
            width:30%;
            margin-left:37%;
            margin-top:0;
        }
    }
</style>
