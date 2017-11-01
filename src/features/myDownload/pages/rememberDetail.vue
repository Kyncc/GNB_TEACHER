<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '拍错题详情'}"></x-header>
    <div>
      <card v-for='(detail, index) in MyDownloadRemember.detail' :key='index'>
        <div slot="content">
          <div @click="show(detail.photo)">
            <img v-lazy="detail.photo.url+'-errorList'"/>
          </div>
        </div>
      </card>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
      </div>
    </div>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </view-box>
</template>

<script>
import {Group, Card, Cell, Spinner, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'myDownloadRemember_detail',
  components: {
    Group, Card, Cell, Spinner, Previewer
  },
  computed: {
    ...mapGetters(['MyDownloadRemember'])
  },
  data () {
    return {
      loading: false,
      list: [{
        w: 0,
        h: 0,
        src: ``
      }],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getDownloadRememberDetail', 'clearMyDownloadDetail']),
    _getData () {
      this.clearMyDownloadDetail({type: 'remember'})
      this.loading = true
      this.getDownloadRememberDetail().then((res) => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    show (img) {
      this.list[0].w = img.width
      this.list[0].h = img.height
      this.list[0].src = img.src
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
