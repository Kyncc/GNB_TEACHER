<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: Route.params.name}"></x-header>
    <div>
      <group gutter="0">
        <cell title="修改班级名称" :link="{name: 'class_update_name', params:{'code': Route.params.code, 'name': Route.params.name}}"></cell>
        <cell title="删除班级" @click.native="_del"></cell>
      </group>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox
  },
  computed: {
    ...mapGetters(['User', 'Route'])
  },
  methods: {
    ...mapActions(['delClass', 'getUserInfo']),
    _del () {
      let _this = this
      this.$vux.confirm.show({
        title: `是否删除${_this.Route.params.name}?`,
        dialogTransition: 'vux-fade',
        onConfirm () {
          _this.delClass().then(() => {
            _this.getUserInfo().then(() => {
              history.go(-2)
            })
          })
        }
      })
    }
  }
}
</script>
