<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '点评',showBack: true}">
      <div slot="right">发布</div>
    </x-header>
    <div>
      <group :gutter='0' title='我要点评'>
        <x-textarea :rows="5" v-model="content" placeholder="请输入点评内容"></x-textarea>
      </group>
      <flexbox :gutter="0" wrap="wrap" justify='center' style='margin-top:1rem;'>
        <flexbox-item :span="11">
          <x-button type="primary" @click.native="_record()" v-if='!audio.path.length'>开始录音</x-button>
          <template v-else>
            <x-button type="primary" @click.native="_play()">{{!audio.state ? '播放' : '暂停'}}录音</x-button>
            <x-button type="primary" @click.native="_reset()">清空录音</x-button>
          </template>
        </flexbox-item>
      </flexbox>
      <x-button type="primary" @click.native="_playUrl()">{{!comment.state ? '播放' : '暂停'}}录音</x-button>
    </div>
    <div class="mask record" v-show='isRecord.state'>
      <div class="time">录音中 {{isRecord.time}} 秒</div>
      <div class="stop" @click='_stop()'></div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, XButton, Group, XTextarea, Flexbox, FlexboxItem } from 'vux'
import { mapActions } from 'vuex'
import { Howl } from 'howler'

export default {
  name: 'comment',
  components: {
    XHeader, ViewBox, XButton, Group, XTextarea, Flexbox, FlexboxItem
  },
  data () {
    return {
      content: '',
      // 上一次得评论
      comment: {
        audio: '',
        state: false,
        text: '',
        url: ''
      },
      // 录音后播放
      audio: {
        state: false,
        path: '',
        file: ''
      },
      // 录音中
      isRecord: {
        state: false,
        time: 0,
        count: ''
      },
      vedio: {}
    }
  },
  methods: {
    ...mapActions(['getErrorClassmate']),
    _playUrl () {
      if (!this.comment.state) {
        this.comment.state = true
        this.comment.audio = new Howl({
          src: ['https://fourthof5assets.s3-eu-west-1.amazonaws.com/heng-feeling-good.mp3']
        })
        this.comment.audio.stop().play()
      } else {
        this.comment.state = false
        this.comment.audio.stop()
      }
    },
    _play () {
      if (!this.audio.state) {
        this.audio.file = plus.audio.createPlayer(this.audio.path)
        this.audio.state = true
        this.audio.file.play(() => {
          this.audio.state = false
          this.audio.file.stop()
          alert('播放完成！')
        }, (e) => {
          alert('播放音频文件"' + this.audio.path + '"失败：' + e.message)
        })
      } else {
        this.audio.file.stop()
        this.audio.state = false
        alert('停止播放')
      }
    },
    _reset () {
      if (this.audio.state) {
        this.audio.file.stop()
        this.audio.state = false
      }
      this.audio.path = ''
    },
    _record () {
      this.isRecord.state = true
      this.isRecord.count = setInterval(() => {
        this.isRecord.time++
      }, 1000)
      this.vedio.record({
        format: 'amr',
        filename: '_doc/audio/'
      }, (path) => {
        this.audio.path = path
        alert(path)
      }, (e) => {
        alert('Audio record failed: ' + e.message)
      })
    },
    _stop () {
      this.isRecord.state = false
      this.isRecord.time = 0
      clearInterval(this.isRecord.count)
      this.vedio.stop()
    }
  },
  created () {
    try {
      this.vedio = plus.audio.getRecorder()
    } catch (e) {
      console.log(e)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang='less' scoped>
.mask {
  width: 100%;
  height: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  overflow: hidden;
}
.record {
  .time {
    margin: 3rem 0 2rem;
    color: #fff;
  }
  .stop {
    width: 72px;
    height: 72px;
    background: url(../assets/astop.png) center center;
    background-size: 72px 72px;
    margin: auto;
    border-radius: 72px;
    &:active {
      -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5) inset;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5) inset;
    }
  }
}
</style>
