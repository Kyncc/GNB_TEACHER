<template>
  <div>
    <group title="未提交作业同学">
      <cell-box>
        <span style='margin-right:10px' v-for="(name, index) in workbookExercise.cameraList.notPost" :key='index'>{{name}}</span>
      </cell-box>
    </group>
    <card v-for="(item, pindex) in workbookExercise.cameraList.list" :key='pindex'>
      <div class="weui-panel__hd" slot="header">
        <flexbox>
          <flexbox-item :span="6" style="color:#4bb7aa">{{item.studentName}}</flexbox-item>
          <flexbox-item :span="6" style="text-align:right">上传时间: {{item.time | ymd}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <img v-for="(img, index) in item.camera" :key="index" class="previewer-answer-img" @click="show(item.camera, index)" 
           v-lazy="img.url+'-answer'"/>
      </div>
    </card>
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
    show (camera, index) {
      this.list = []
      this.list.push({
        src: camera[index].url,
        w: camera[index].width,
        h: camera[index].height
      })
      this.$nextTick(() => {
        this.$refs.previewer.show()
      })
    }
  }
}
</script>
