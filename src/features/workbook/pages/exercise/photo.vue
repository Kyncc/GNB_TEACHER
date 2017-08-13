<template>
  <div>
    <group title="未提交作业同学" v-if='workbookExercise.notPost.length'>
      <cell-box>
        <span style='margin-right:10px' v-for="(name, index) in workbookExercise.notPost" :key='index'>{{name}}</span>
      </cell-box>
    </group>
    <template v-if='workbookExercise.cameraList.length'>
      <card v-for="(items, pindex) of workbookExercise.cameraList" :key='items'>
        <div class="weui-panel__hd" slot="header">
          <flexbox>
            <flexbox-item :span="6" style="color:#4bb7aa">{{items.studentName}}</flexbox-item>
            <flexbox-item :span="6" style="text-align:right">上传时间: {{items.time | ymd}}</flexbox-item>
          </flexbox>
        </div>
        <div slot="content">
          <flexbox wrap="wrap" align="baseline" :gutter="0">
            <flexbox-item :span="3" v-for="(img, index) in items.camera" :key="index" @click.native="show(index, items.camera)" style="text-align:center;margin-bottom:10px;">
              <img v-lazy="img.url+'?imageMogr2/auto-orient/thumbnail/260x360!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'" width="65" height="90" class="previewer-answer-img">
            </flexbox-item>
          </flexbox>
        </div>
      </card>
    </template>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import {Group, Cell, CellBox, Card, Flexbox, FlexboxItem, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'error',
  components: {
    Group, Cell, CellBox, Card, Flexbox, FlexboxItem, Previewer
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
  }
}
</script>
