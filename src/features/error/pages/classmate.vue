<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '点拨错题',showBack: true}"></x-header>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(myClass, pindex) in errorClassmate.list">
        <cell :title="myClass.className" is-link :border-intent="false"
        :arrow-direction="myClass.checked ? 'up' : 'down'"
        @click.native="myClass.checked = !myClass.checked" :key='pindex'></cell>
        <div class="slide" :class="myClass.checked ? 'animate':''" :key='pindex'>
          <cell-box v-for="(student, index) in myClass.classmates" :key='index' @click.native="$router.push({name: 'error_list', params: {name: student.name, studentId: student.id}})">
            <flexbox slot="default">
              <flexbox-item :span="12">
                <img width="30" height="30" style="margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
                {{student.name}}
              </flexbox-item>
            </flexbox>
          </cell-box>
        </div>
      </template>
    </group>
    <div style="text-align:center;padding:20px 0;">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="User.classes.length === 0" style="font-size:16px;color:#666;padding:0 2rem;text-align:left;" @click="$router.push({name: 'class_add'})">
        没有学生？请点击<span style='color:#4cc0be'>创建班级</span>，并邀请学生加入班级
      </p>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, XButton, CellBox, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, CellBox, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['errorClassmate', 'User'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getErrorClassmate', 'setErrorClassmateScroll', 'clearErrorClassmate']),
    _getData () {
      this.loading = true
      this.getErrorClassmate().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index' || from.name === 'points_earn') {
        vm.clearErrorClassmate()
        vm._getData()
      } else {
        vm.$refs.viewBox.scrollTo(vm.errorClassmate.scroll)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setErrorClassmateScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
