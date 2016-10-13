<template>
<div class='createClass'>
  <x-header :left-options="{showBack: true}" >创建班级<a slot="right" v-touch:tap="_complete">创建</a></x-header>
  <group>
    <x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name"></x-input>
  </group>
  <!-- <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定放弃修改密码?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm> -->
</div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm} from 'vux'
import { token } from '../../common/getters.js'
import {createClass} from '../actions.js'
import * as _ from '../../config/whole.js'
export default {
  components: {XHeader,XInput,Group,XButton,Confirm},
  vuex: {
    getters: {
      token
    },
    actions: {
      createClass
    }
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    _complete() {
        if(this.name){
            this.createClass({token:this.token,name:this.name},()=>{
                this.$router.replace('/index/class')
                _.toast('创建班级成功')
            })
        }else{
            _.toast('请填写班级名称')
        }
    }
  }
}
</script>

<style lang="less">

</style>
