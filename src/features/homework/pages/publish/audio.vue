<template>
  <view-box ref="homework" body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '语音作业',showBack: true}">
        <div slot="right" style="margin:0" @click='_publish'>确定</div>
      </x-header>
    </div>
    <div>
      <flexbox :gutter="0" wrap="wrap" justify='center' style='margin:1rem 0;'>
        <flexbox-item :span="11">
          <x-button type="primary" @click.native="_record()" v-if='!audio.path.length'>点我录音</x-button>
          <template v-else>
            <x-button type="primary" @click.native="_play()">{{!audio.state ? '播放' : '暂停'}}录音</x-button>
            <x-button type="warn" @click.native="_reset()">清空录音</x-button>
          </template>
        </flexbox-item>
      </flexbox>
      <checklist title="选择消息发送班级" label-position="right" required :options="classList" v-model="classes"></checklist>
    </div>
    <div v-transfer-dom class="mask record" v-show='isRecord.state'>
      <div class="time">录音中 {{isRecord.time}} 秒<br/>(最长不超过120秒)</div>
      <div class="stop" @click='_stop()'></div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, XButton, ViewBox, Checklist, TransferDomDirective as TransferDom, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'audio',
  components: {
    XHeader, Cell, Group, ViewBox, Checklist, XButton, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['User']),
    classList () {
      let list = []
      for (let i in this.User.classes) {
        list.push({key: this.User.classes[i].classCode, value: this.User.classes[i].name})
      }
      return list
    }
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      classes: [],
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
      }
    }
  },
  methods: {
    ...mapActions(['setHomeworkAudio']),
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
        if (this.isRecord.time === 120) {
          this._stop()
        }
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
    },
    _publish () {
      // 提交时若在播放则先暂停
      if (this.audio.state) {
        this.audio.file.stop()
        this.audio.state = false
      }
      // 不为空则提交语音消息
      if (this.audio.path.length === 0) {
        this.$vux.toast.show({text: '语音消息不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else if (this.classes.length === 0) {
        this.$vux.toast.show({text: '班级不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else {
        this.setHomeworkAudio({audio: this.audio.path, classes: this.classes}).then(() => {
          this.classes = []
          this.audio.state = false
          this.audio.path = ''
        }).then(() => {
          this.$vux.toast.show({text: '发送成功', type: 'text', time: 700, position: 'bottom', onHide () { history.go(-1) }})
        })
      }
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
    next(vm => {})
  },
  beforeRouteLeave (to, from, next) {
    // 返回时若在播放则暂停
    if (this.audio.state) {
      this.audio.file.stop()
      this.audio.state = false
      next(false)
    }

    // 返回时若有录音或者选了班级
    if (this.audio.path || this.classes.length) {
      let that = this
      this.$vux.confirm.show({
        title: '确定放弃编辑的消息么？',
        dialogTransition: '',
        onCancel () { next(false) },
        onConfirm () {
          that.classes = []
          that.audio.state = false
          that.audio.path = ''
          next()
        }
      })
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped>
.homework_add{
  padding:25px 0 ;
  text-align: center;
  span{
    display: block;
    color:#4cc0be;
  }
  p{
    line-height: 82px;
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
    background: url(../../assets/astop.png) center center;  // background: url(../../asses/astop.png) center center;
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
