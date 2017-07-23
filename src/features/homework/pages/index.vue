<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '批改作业',showBack: true}">
      <div slot="right" style="margin:0">
        <gnbChangeSub :change.sync='selectedSub'></gnbChangeSub>
      </div>
    </x-header>
    <div>

    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, XButton} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, gnbChangeSub
  },
  computed: {
    ...mapGetters(['Homework'])
  },
  data () {
    return {
      selectedSub: '',
      loading: true
    }
  },
  methods: {
    ...mapActions(['getHomework', 'clearHomework', 'setHomeworkScroll']),
    _getData () {
      this.loading = true
      this.getHomework({subjectId: this.selectedSub}).then(() => {
        this.loading = false
      })
    }
  },
  watch: {
    selectedSub () {
      this.clearHomework()
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'bag') {
        vm.clearHomework()
        vm._getData()
      } else {
        vm.$refs.viewBox.scrollTo(vm.Homework.scroll)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setHomeworkScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
