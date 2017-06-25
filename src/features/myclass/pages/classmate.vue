<template>
  <view-box ref="myClass" body-padding-top="46px" >
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" 
    :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}"> 
      <div slot="right" style="margin:0" @click="$router.push({name: 'class_update', params: {'code': ClassMyClassmate.classcode, 'name': ClassMyClassmate.classname}})">
        编辑
      </div>
    </x-header>
    <template v-if="!loading">
      <group title="同学列表">
        <cell v-for="(student, index) in ClassMyClassmate.classmates" :key='index'>
          <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
          <div slot="after-title">{{student.name}}</div>
          <x-button mini type="warn" slot="value" @click.native="_del(student, index)">删除</x-button>
        </cell>
      </group>
    </template>
    <div style="text-align:center">
      <spinner v-if="loading" type="lines"></spinner>
    </div>
    <tabbar style='background-color:#fff;'>
      <flexbox style='padding:.4rem;'>
        <flexbox-item :span="8" style="font-size:.7rem">我的邀请码: <b></b>{{ClassMyClassmate.classcode}}</flexbox-item>
        <flexbox-item :span="4" style="color:#4bb7aa;"> 
          <x-button type="primary" @click.native="_share" plain mini>邀请同学</x-button>
        </flexbox-item>
      </flexbox>
    </tabbar>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem, Flexbox, FlexboxItem
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
    },
    _share () {

    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loading = true
      vm.myClassmateClear()
      vm._getData()
    })
  }
}
</script>
