<template>
  <view-box ref="myClassAdd" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '添加班级'}">
      <p slot="right" @click="_finish">完成</p>
    </x-header>
    <div>
      <group gutter="0">
        <x-input v-model="name" placeholder="请输入班级名称"></x-input>
      </group>
    </div>
  </view-box>
</template>

<script>
import {XHeader, XInput, Cell, Group, ViewBox} from 'vux'
import {mapActions} from 'vuex'

export default {
  name: 'add',
  components: {
    XHeader, XInput, Cell, Group, ViewBox
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['postMyClassInto', 'getUserInfo']),
    _finish () {
      if (this.name.length) {
        this.postMyClassInto({name: this.name}).then(() => {
          this.$vux.toast.show({text: '新增班级成功', type: 'success', time: 1000})
          this.getUserInfo().then(() => {
            history.go(-1)
          })
        })
      } else {
        this.$vux.toast.show({text: '名称不能为空', type: 'text', position: 'bottom', time: 1000})
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = ''
    })
  }
}
</script>
