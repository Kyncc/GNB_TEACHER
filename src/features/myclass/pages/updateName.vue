<template>
  <view-box ref="userinfoUpdate" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '修改班级名称'}">
      <p slot="right" @click="_finish">完成</p>
    </x-header>
    <group gutter="0">
      <x-input v-model="name"></x-input>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Group, ViewBox, XInput, Cell} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'update',
  components: {
    XHeader, Group, ViewBox, XInput, Cell
  },
  computed: {
    ...mapGetters(['Route'])
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateClass']),
    _finish () {
      if (this.name.length) {
        this.updateClass({
          name: this.name
        }).then(() => {
          this.getUserInfo().then(() => {
            history.go(-2)
          })
        })
      } else {
        this.$vux.toast.show({text: '名称不能为空', type: 'text', position: 'bottom', time: 1000})
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = vm.Route.params.name
    })
  }
}
</script>

<style lang="less">
.input_right .weui-input{
  text-align:right;
}
.demo2-item {
  width: 27px;
  height: 27px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 23px;
  text-align: center;
}
.demo2-item-selected{
  border: 1px solid #4BB7AA;
  color: #4BB7AA;
}
.weui-cell_select .weui-select{
  direction: rtl !important;
}
</style>
