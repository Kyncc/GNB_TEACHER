<template>
  <view-box ref="myDownloadGood_detail" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '试卷详情'}"></x-header>
    <div>
      <div v-for="(list, pindex) in block" :key="pindex" v-show='!loading'>
        <div class="weui-cells__title">{{list.name}}</div>
        <card v-for="(item, index) in list.list" :key="index">
          <div slot="content" @click="$router.push({name:'example', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: (item.form === 1 ? 'exercises' : 'lxexercises')}})">
            <div v-html="item.stem"></div>
            <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
              {{ key }}：
              <p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
          <div slot="footer">
            <div class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">
                <flexbox :gutter='0'>
                  <flexbox-item :span="3">难度：{{item.degree}}</flexbox-item>
                  <flexbox-item :span="7">时间：{{item.time | ymd}}</flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'myDownloadGood_detail',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group
  },
  computed: {
    ...mapGetters(['MyDownloadGood']),
    block () {
      return this.MyDownloadGood.detail
    }
  },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  methods: {
    ...mapActions(['getMyDownloadList', 'setMyDownloadDetailScroll', 'clearMyDownloadDetail']),
    _getData () {
      this.clearMyDownloadDetail({type: 'good'})
      this.loading = true
      this.getMyDownloadList().then(() => {
        this.error = false
        this.loading = false
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'myDownloadGood') {
        vm._getData()
      }
      vm.$refs.myDownloadGood_detail.scrollTo(vm.MyDownloadGood.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setMyDownloadDetailScroll({scroll: this.$refs.myDownloadGood_detail.getScrollTop(), type: 'good'})
    next()
  }
}
</script>
