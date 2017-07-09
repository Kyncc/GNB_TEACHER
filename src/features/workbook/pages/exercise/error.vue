<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '错题详情'}"></x-header>
    </div>
    <div>
      <group title="未提交照片同学">
        <cell-box>
          <span style='margin-right:10px' v-for="(name, index) in workbookExercise.errorList.notPost" :key='index'>{{name}}</span>
        </cell-box>
      </group>
      <card v-for="(item, pindex) in workbookExercise.errorList.list" :key='pindex'>
        <div class="weui-panel__hd" slot="header">
          <flexbox>
            <flexbox-item :span="6" style="color:#4bb7aa">{{item.studentName}}</flexbox-item>
            <flexbox-item :span="6" style="text-align:right">上传时间: {{item.time | ymd}}</flexbox-item>
          </flexbox>
        </div>
        <div slot="content">
          <flexbox wrap="wrap" align="baseline" :gutter="0">
            <flexbox-item :span="3" v-for="(img, index) in item.camera" :key="index" @click.native="show(index, item.camera)" style="text-align:center;margin-bottom:10px;">
              <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/136x180!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'" width="68" height="90" class="previewer-answer-img">
            </flexbox-item>
          </flexbox>
        </div>
      </card>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Group, Cell, CellBox, Card, Flexbox, FlexboxItem, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'error',
  components: {
    XHeader, ViewBox, Group, Cell, CellBox, Card, Flexbox, FlexboxItem, Previewer
  },
  computed: {
    ...mapGetters(['workbookExercise'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
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
    ...mapActions(['getWorkbookExerciseErrorPhoto', 'workbookExerciseErrorPhotoClear']),
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.workbookExerciseErrorPhotoClear()
      vm.getWorkbookExerciseErrorPhoto()
    })
  }
}
</script>
