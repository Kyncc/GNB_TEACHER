<template>
  <view-box ref="homework" body-padding-top="220px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '布置作业',showBack: true}">
        <div slot="right" style="margin:0">
          <gnbChangeSub :change.sync='selectedSub'></gnbChangeSub>
        </div>
      </x-header>
      <div @click='_add' class='homework_add'>
        <p>+</p>
        <span>发布作业</span>
      </div>
    </div>
    <div>
      <card v-for="(item, index) in Homework.list" :key="index">
        {{item.audio}}
        <div slot="header" class="weui-panel__hd" style='padding:5px 15px;'>
          <flexbox>
            <flexbox-item :span="7">{{item.time | ymdhms}}</flexbox-item>
            <flexbox-item :span="5" style="color:#4cc0be;text-align:right;padding-right:5px;">
              <x-button type="primary" mini plain @click.native="$router.push({name: 'homework_class',params:{index: index, id: item.homeworkId}})">布置给</x-button>
            </flexbox-item>
          </flexbox>
        </div>
        <!--文字作业 -->
        <p slot="content" class="card-padding" v-if='item.content'>{{item.content}}</p>
        <!--图片作业 -->
        <flexbox slot="content" wrap="wrap" align="baseline" :gutter="0" v-if='item.img'>
          <flexbox-item :span="3" v-for="(img, index) in item.img" :key="index" @click.native="_show(index, item.img)" style="text-align:center;margin-bottom:10px;">
            <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/260x360!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'" width="65" height="90" class="previewer-answer-img">
          </flexbox-item>
        </flexbox>
        <!--语音作业 -->
        <flexbox slot="content" v-if='item.audio'>
          <flexbox-item :span="2" @click.native='_audio(item.audio, index)'>
            <i v-if='audio.state && audio.index === index' class='icon iconfont icon-zanting' style='font-size:2rem'></i>
            <i v-else class='icon iconfont icon-playcirclefill' style='font-size:2rem;color:#4cc0be;margin-top:-.1rem;'></i>
          </flexbox-item>
        </flexbox>
      </card>
      <div style="text-align:center">
        <spinner v-show="loading" type="dots"></spinner>
        <p v-show="error" @click='_getData()' style="font-size:16px;color:#4cc0be">出错了点我重新加载</p>
        <p v-show="Homework.list.length === 0 && !error && !loading" style="font-size:16px;color:#4cc0be">您还未布置作业呢</p>
      </div>
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
import { Howl } from 'howler'

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
      error: false,
      loading: true,
      audio: {
        // 播放的索引
        index: '',
        // 播放对象
        obj: '',
        // 播放状态
        state: false
      },
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
    // 添加作业
    _add () {
      this.show = true
    },
    _getData () {
      this.loading = true
      this.getHomework({subjectId: this.selectedSub}).then(() => {
        this.error = false
        this.loading = false
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    },
    _publish (key) {
      this.$router.push({name: `homework_publish_${key}`})
    },
    // 照片大图
    _show (index, camera) {
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
    },
    // 播放声音
    _audio (url, index) {
      this.audio.index = index
      if (!this.audio.state) {
        this.audio.state = true
        this.audio.obj = new Howl({
          src: [url],
          onloaderror: () => {
            // 获取失败
            alert('播放音频文件失败请重试')
          },
          onend: () => {
            // 播放完后的暂停
            this.audio.index = null
            this.audio.state = false
            this.audio.obj.stop()
          }
        })
        this.audio.obj.stop().play()
      } else {
        // 手动暂停
        this.audio.index = null
        this.audio.state = false
        this.audio.obj.stop()
      }
    }
  },
  watch: {
    selectedSub () {
      this.clearHomework()
      this._getData()
    }
  },
  mounted () {
    this._getData()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 非首页进来刷新数据
      if (from.name !== 'index') {
        vm.clearHomework()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // 若在播放语音 则暂停
    if (this.audio.state) {
      this.audio.index = null
      this.audio.state = false
      this.audio.obj.stop()
    }
    next()
  }
}
</script>
<style lang="less" scoped>
.homework_add{
  padding:15px 0 5px;
  text-align: center;
  background: #F3F9F8;
  span{
    display: block;
    color:#4cc0be;
  }
  p{
    line-height: 100px;
    display: inline-block;
    font-size: 100px;
    color:#4cc0be;
    width:100px;
    height:100px;
    border-radius: 20%;
    border:2px solid #4cc0be;
    margin-bottom:10px;
  }
}
</style>
