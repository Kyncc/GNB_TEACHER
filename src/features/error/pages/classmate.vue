<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '查看错题',showBack: true}"></x-header>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(myClass, index) in errorClassmate.list">
        <cell :title="myClass.className" is-link :border-intent="false" 
        :arrow-direction="myClass.checked ? 'up' : 'down'"
        @click.native="myClass.checked = !myClass.checked"></cell>
        <div class="slide" :class="myClass.checked ? 'animate':''">
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
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
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
    ...mapGetters(['errorClassmate'])
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
      if (from.name === 'index') {
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
