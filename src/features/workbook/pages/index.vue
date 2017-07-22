<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '批改作业',showBack: true}">
      <div slot="right" style="margin:0">
        <gnbChangeSub :change.sync='selectedSub'></gnbChangeSub>
      </div>
    </x-header>
    <div>
      <group v-for="(textbook, pindex) in workbook.list.textbook" :key='pindex' :title="textbook.textbookName">
        <cell v-for="(workbook, index) in textbook.list" :key="index" is-link @click.native="$router.push({ name: 'workbook_chapter', params: {'workbookId': workbook.workbookId ,'name': workbook.workbookName}})">
          <img v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/90x120!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80">
          <div slot="after-title" style="width:90%;">
            <p style="color:#aaa;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
            <p class="ellipsis">&nbsp;&nbsp;&nbsp;{{workbook.workbookName}}</p>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="dots"></spinner>
        <p v-else-if="workbook.list.textbook.length === 0" style="font-size:16px;color:#4BB7AA;">没有更多习题册了~</p>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbook',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem, gnbChangeSub
  },
  computed: {
    ...mapGetters(['workbook'])
  },
  data () {
    return {
      selectedSub: '',
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'workbookClear', 'setWorkbookScroll']),
    _getData () {
      this.loading = true
      this.getWorkbook({subjectId: this.selectedSub}).then(() => {
        this.loading = false
      })
    }
  },
  watch: {
    selectedSub () {
      this.workbookClear()
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index') {
        vm.workbookClear()
        vm._getData()
      } else {
        vm.$refs.viewBox.scrollTo(vm.workbook.scroll)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
