<template>
  <view-box body-padding-top="46px" >
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}"></x-header>
    </div>
    <template v-if="!loading">
      <group title="学生列表">
        <cell v-for="(student, index) in ClassMyClassmate.classmates" :key='index'>
          <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
          <div slot="after-title">{{student.name}}</div>
          <div slot="value" @click="_del(student, index)" style='padding:0 0 0 1rem;'>
            <i class="icon iconfont icon-closezhuanhuan" style="color:red;"></i>
          </div>
        </cell>
      </group>
    </template>
    <div style="text-align:center">
      <spinner v-if="loading" type="lines"></spinner>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, XButton, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'del',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Flexbox, FlexboxItem
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
        title: `确定删除${student.name}学生?`,
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
      this.loading = true
      this.getMyClassmateList().then(() => {
        this.loading = false
      }).catch((e) => {
        this.loading = false
      })
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
