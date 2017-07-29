<template>
  <view-box ref="homework" body-padding-top="236px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '布置作业',showBack: true}">
        <div slot="right" style="margin:0">
          <gnbChangeSub :change.sync='selectedSub'></gnbChangeSub>
        </div>
      </x-header>
      <div @click='_add' class='homework_add'>
        <p>
          +
        </p>
        <span>发布作业</span>
      </div>
    </div>
    <div>
      <card>
        <div slot="header" class="weui-panel__hd" style='padding:5px 15px;'>
          <flexbox>
            <flexbox-item :span="7" style="color:#4BB7AA">布置时间：09-03 21:21</flexbox-item>
            <flexbox-item :span="5" style="color:#4BB7AA;text-align:right;padding-right:5px;"><x-button type="primary" mini plain>布置给</x-button></flexbox-item>
          </flexbox>
        </div>
        <p slot="content" class="card-padding">custom content</p>
      </card>
      <card>
        <div slot="header" class="weui-panel__hd" style='padding:5px 15px;'>
          <flexbox>
            <flexbox-item :span="7" style="color:#4BB7AA">布置时间：09-03 21:21</flexbox-item>
            <flexbox-item :span="5" style="color:#4BB7AA;text-align:right;padding-right:5px;"><x-button type="primary" mini plain>布置给</x-button></flexbox-item>
          </flexbox>
        </div>
        <flexbox wrap="wrap" align="baseline" :gutter="0">
          <!-- <flexbox-item :span="3" v-for="(img, index) in items.camera" :key="index" @click.native="show(index, items.camera)" style="text-align:center;margin-bottom:10px;">
            <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/136x180!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'" width="65" height="90" class="previewer-answer-img">
          </flexbox-item> -->
        </flexbox>
      </card>
    </div>
    <div v-transfer-dom>
      <actionsheet v-model="show" :menus="menu" theme="android" @on-click-menu="_publish"></actionsheet>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Card, Group, ViewBox, Spinner, XButton, Actionsheet, Flexbox, FlexboxItem, Previewer, TransferDomDirective as TransferDom} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    Actionsheet, XHeader, Card, Cell, Group, ViewBox, Spinner, XButton, gnbChangeSub, Flexbox, FlexboxItem, Previewer
  },
  computed: {
    ...mapGetters(['Homework'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      selectedSub: '',
      show: false,
      loading: true,
      menu: [
        {
          label: '发送文字',
          value: 'content'
        },
        {
          label: '录制语音',
          value: 'audio'
        },
        {
          label: '发送图片',
          value: 'image'
        }
      ],
      list: [{}],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  methods: {
    ...mapActions(['getHomework', 'clearHomework', 'setHomeworkScroll']),
    _add () {
      this.show = true
    },
    _getData () {
      this.loading = true
      this.getHomework({subjectId: this.selectedSub}).then(() => {
        this.loading = false
      })
    },
    _publish (key) {
      this.$router.push({name: `homework_publish_${key}`})
    },
    show (index, camera) {
      this.list = []
      for (let arr of camera) {
        this.list.push({
          w: Number(arr.width),
          h: Number(arr.height),
          src: `${arr.url}`
        })
      }
      this.$nextTick(() => {
        this.$refs.previewer.show(index)
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
        vm.$refs.homework.scrollTo(vm.Homework.scroll)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setHomeworkScroll(this.$refs.homework.getScrollTop())
    next()
  }
}
</script>
<style lang="less" scoped>
.homework_add{
  padding:25px 0 ;
  text-align: center;
  span{
    display: block;
    color:#4BB7AA;
  }
  p{
    line-height: 82px;
    display: inline-block;
    font-size: 100px;
    color:#4BB7AA;
    width:100px;
    height:100px;
    border-radius: 20%;
    border:2px solid #4BB7AA;
    margin-bottom:10px;
  }
}
</style>
