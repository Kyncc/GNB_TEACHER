<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" 
    :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}"> 
      <div slot="right" style="margin:0" @click="$router.push({name: 'class_update', params: {'code': ClassMyClassmate.classcode, 'name': ClassMyClassmate.classname}})">
        编辑
      </div>
    </x-header>
    <template v-if="!loading">
      <group title="同学列表">
        <template v-for="(student, index) in ClassMyClassmate.classmates">
          <cell>
            <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
            <div slot="after-title">{{student.name}}</div>
            <x-button mini type="warn" slot="value" @click.native="_del(student, index)">删除</x-button>
          </cell>
        </template>
      </group>
      <div style="width:100%;position:fixed;bottom:0;">
        <x-button type="primary" @click.native="_post" plain style="border-radius:0">邀请同学</x-button>
      </div>
    </template>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem
  },
  computed: {
    ...mapGetters(['ClassMyClassmate'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMyClassmateList', 'myClassmateClear', 'delClassmate']),
    _del (student, index) {
      let _this = this
      this.$vux.confirm.show({
        title: `确定删除${student.name}同学么?`,
        dialogTransition: 'vux-fade',
        onConfirm () {
          let params = {
            id: student.id,
            index: index
          }
          _this.delClassmate(params)
        }
      })
    },
    _getData () {
      this.getMyClassmateList().then(() => {
        this.loading = false
      })
    }
  },
  deactivated () {
    this.myClassmateClear()
    this.loading = true
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  }
}
</script>
