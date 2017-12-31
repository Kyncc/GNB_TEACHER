<template>
  <view-box ref="download" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '下载'}"></x-header>
    <div slot="default">
      <div v-for="(list, pindex) in block" :key="pindex" v-show='!loading'>
        <div class="weui-cells__title">{{list.name}}</div>
        <card v-for="(item, index) in list.list" :key="index">
          <div slot="content"
           @click="this.$router.push({name:'example', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: (item.form === 1 ? 'exercises' : 'lxexercises')}})">
            <div v-html="item.stem"></div>
            <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
              {{ key }}：<p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
          <div slot="footer">
            <div class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">
                <flexbox>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperUp({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-up"></i>上移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperDown({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-down"></i>下移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperDel({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-lajitong16"></i>删除
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!block.length" style="font-size:16px;color:#4cc0be">该科目还未组卷</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
      </div>
      <share :change.sync='showAction' :showAction='showAction' :content='share.content'
        :title='share.title'
        :href='share.href'
        @on-share-success='_shareSuccess()'>
      </share>
    </div>
    <tabbar slot="bottom" style='background-color:#4cc0be;color:#fff' v-show='block && block.length'>
      <flexbox style='padding:.3rem;'>
        <flexbox-item :span="12" style="font-size:.8rem;text-align:center;" @click.native="_download()">
          <i class="icon iconfont icon-download"></i>下载</flexbox-item>
      </flexbox>
    </tabbar>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group, PopupPicker, Tabbar, TabbarItem} from 'vux'
import { mapGetters, mapActions } from 'vuex'
import Share from '@/components/share'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group, PopupPicker, Tabbar, TabbarItem, Share
  },
  computed: {
    ...mapGetters(['DownloadPaper', 'DownloadUrl', 'User']),
    block () {
      return this.DownloadPaper.list.block || []
    },
    downloadId () {
      return this.DownloadPaper.list.downloadId
    }
  },
  data () {
    return {
      showPopupPicker: false,
      loading: true,
      error: false,
      showAction: false,
      share: {
        href: '',
        content: '试卷分享',
        title: '我的组卷'
      }
    }
  },
  methods: {
    ...mapActions(['clearAssembleExample', 'getDownloadUpdate', 'getDownloadList', 'getDownloadUrl', 'setMyDownloadPaperScroll', 'clearMyDownloadPaper', 'clearAssembleChoice', 'setMyDownloadPaperUp', 'setMyDownloadPaperDown', 'setMyDownloadPaperDel']),
    _getData () {
      this.clearMyDownloadPaper()
      this.loading = true
      this.getDownloadList().then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    },
    // 下载之前的次数判断
    _download () {
      return (async () => {
        try {
          await this.getDownloadUpdate({id: this.downloadId}).then((res) => {
            this.share.href = res.data.data.url
            this.showAction = true
          })
        } catch (err) {
          this.showAction = false
        }
      })()
    },
    _shareSuccess () {
      this._getData()
      this.clearMyDownloadPaper()
      this.clearAssembleExample()
      this.$router.go(-1)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name !== 'example') {
        vm._getData()
      }
      vm.$refs.download.scrollTo(vm.DownloadPaper.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showPopupPicker = false
      next(false)
    } else {
      this.setMyDownloadPaperScroll(this.$refs.download.getScrollTop())
      next()
    }
  }
}
</script>
<style scoped>
.popup .vux-cell-box:before{
  border-top:0px !important;
}
.center{
  text-align: center;
}
</style>
