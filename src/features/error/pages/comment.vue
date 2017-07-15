<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '点评',showBack: true}">
      <div slot="right" @click='_comment()' v-show='!errorComment.content.length || !errorComment.audio.length'>发布</div>
    </x-header>
    <div>
      <group :gutter='0' title='我要点评'>
        <x-textarea v-if='errorComment.content.length' :rows="5" :value="errorComment.content" readonly></x-textarea>
        <x-textarea v-else :rows="5" v-model="content" placeholder="请输入点评内容"></x-textarea>
      </group>
      <flexbox :gutter="0" wrap="wrap" justify='center' style='margin-top:1rem;'>
        <flexbox-item :span="11">
          <x-button type="primary" @click.native="_record()" v-if='!audio.path.length && !errorComment.audio.length'>开始录音</x-button>
          <x-button type="primary" @click.native="_playUrl()" v-else-if='errorComment.audio.length'>{{!comment.state ? '播放' : '暂停'}}录音</x-button>
          <template v-else>
            <x-button type="primary" @click.native="_play()">{{!audio.state ? '播放' : '暂停'}}录音</x-button>
            <x-button type="warn" @click.native="_reset()">清空录音</x-button>
          </template>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-transfer-dom class="mask record" v-show='isRecord.state'>
      <div class="time">录音中 {{isRecord.time}} 秒</div>
      <div class="stop" @click='_stop()'></div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, XButton, Group, XTextarea, Flexbox, FlexboxItem, TransferDomDirective as TransferDom } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { Howl } from 'howler'

export default {
  name: 'comment',
  components: {
    XHeader, ViewBox, XButton, Group, XTextarea, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['errorComment', 'Route'])
  },
  data () {
    return {
      content: '',
      // 上一次得评论
      comment: {
        // 播放对象
        audio: '',
        // 播放状态
        state: false
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
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['getErrorClassmate', 'setErrorComment', 'getErrorComment', 'clearErrorComment']),
    _comment () {
      // 提交时若在播放则先暂停
      if (this.audio.state) {
        this.audio.file.stop()
        this.audio.state = false
      }
      this.setErrorComment({
        audio: this.audio.path,
        content: this.content
      }).then(() => {
        this.$vux.toast.show({text: '提交评价成功!', type: 'text', time: 1000, position: 'bottom'})
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      })
    },
    // 播放上次声音
    _playUrl () {
      if (!this.comment.state) {
        this.comment.state = true
        this.comment.audio = new Howl({
          src: [this.errorComment.audio],
          onloaderror: () => {
            // 获取失败
            alert('播放音频文件失败请重试')
          },
          onend: () => {
            // 播放完后的暂停
            this.comment.state = false
            this.comment.audio.stop()
          }
        })
        this.comment.audio.stop().play()
      } else {
        // 手动暂停
        this.comment.state = false
        this.comment.audio.stop()
      }
    },
    // 播放录音
    _play () {
      if (!this.audio.state) {
        this.audio.file = plus.audio.createPlayer(this.audio.path)
        this.audio.state = true
        this.audio.file.play(() => {
          this.audio.state = false
          this.audio.file.stop()
        }, (e) => {
          alert('播放音频文件"' + this.audio.path + '"失败：' + e.message)
        })
      } else {
        this.audio.file.stop()
        this.audio.state = false
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
    next(vm => {
      // 如果有评价则获取一次
      if (vm.Route.query.isComment) {
        vm.getErrorComment()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.isRecord.state) {
      next(false)
    } else if (this.audio.state) {
      // 录音播放中停止
      this._reset()
      next()
    } else if (this.comment.state) {
      // 语音播放中停止
      this.comment.state = false
      this.comment.audio.stop()
      next()
    } else {
      // 离开清空数据
      this.clearErrorComment()
      // 清空录音未发布
      this.audio.state = false
      this.audio.path = ''
      this.content = ''
      next()
    }
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
