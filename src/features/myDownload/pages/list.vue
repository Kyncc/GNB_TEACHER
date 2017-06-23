<template>
  <view-box ref="myDownload_list" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '试卷详情'}"></x-header>
    <div>
      <card v-for="(item, index) in list" :key="index">
        <div class="weui-panel__hd" slot="header">
          <flexbox>
            <flexbox-item :span="10" style="color:#4bb7aa">更新时间: {{item.time}}</flexbox-item>
            <flexbox-item :span="2">难度: {{item.degree}}</flexbox-item>
          </flexbox>
        </div>
        <div slot="content" @click="$router.push({name:'example', params: {subjectId: Route.params.subject.indexOf('math') !== -1 ? 2 : 7, id: item.exercises_id}})">
          <div v-html="item.stem"></div>
          <div v-if="item.opt_jo.hasOwnProperty('A')">
            <div v-for="(value, key) in item.opt_jo" :key='key' style="padding-top:5px;">
              {{ key }}： 
              <p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
        </div>
      </card>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;padding:10px 0;color:#4BB7AA">出错了点我重新加载</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'list',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Route', 'MyDownloadPaper']),
    list () {
      return this.MyDownloadPaper.list
    }
  },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  methods: {
    ...mapActions(['getMyDownloadList', 'setMyDownloadPaperScroll', 'clearMyDownloadPaper']),
    _getData () {
      this.loading = true
      this.getMyDownloadList().then(() => {
        this.error = false
      }).catch(() => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 不来自题目详情全部清除数据
      if (from.name === 'myDownload') {
        vm.clearMyDownloadPaper()
        vm._getData()
      }
      vm.$refs.myDownload_list.scrollTop = vm.MyDownloadPaper.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setMyDownloadPaperScroll(this.$refs.myDownload_list.scrollTop)
    next()
  }
}
</script>
