<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '拍错题详情'}"></x-header>
    <div>
      <card v-for='(detail, index) in MyDownloadCamera.detail' :key='index'>
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
    <!--照片放大 -->
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Group, Card, Cell, Spinner, Previewer} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'cameraDetail',
  components: {
    XHeader, ViewBox, Group, Card, Cell, Spinner, Previewer
  },
  computed: {
    ...mapGetters(['MyDownloadCamera'])
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
  methods: {
    ...mapActions(['getMyDownloadCameraDetail', 'clearMyDownloadDetail']),
    _getData () {
      this.clearMyDownloadDetail({type: 'camera'})
      this.loading = true
      this.getMyDownloadCameraDetail().then((res) => {
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
