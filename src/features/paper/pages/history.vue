<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的下载'}">
    </x-header>
    <div>
      <group :gutter='0' title='只展示最近一个月的下载记录' v-show='PapaerDownload.length'>
        <cell :title='item.name' v-for='(item, index) in PapaerDownload' :key='index' @click="_download(item)"></cell>
      </group>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!PapaerDownload.length" style="font-size:16px;color:#4cc0be">近一月还未有下载记录</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
      </div>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>

<script>
import { XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import Share from '@/components/share'

export default {
  name: 'index',
  components: {
    XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner, Share
  },
  computed: {
    ...mapGetters(['PapaerDownload'])
  },
  data () {
    return {
      loading: true,
      error: false,
      showAction: false,
      share: {
        content: '',
        title: '我的试卷',
        href: ''
      }
    }
  },
  methods: {
    ...mapActions(['getPapaerDownload', 'clearPapaerDownload']),
    _download (item) {
      this.share.href = item.url
      this.share.content = item.name
      this.showAction = true
    },
    _getData () {
      this.clearPapaerDownload()
      this.loading = true
      this.getPapaerDownload().then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
