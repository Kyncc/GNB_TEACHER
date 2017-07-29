<template>
  <view-box ref="homework" body-padding-top="220px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '图片作业',showBack: true}">
        <div slot="right" style="margin:0" @click='_publish'>发布</div>
      </x-header>
      <group-title style="margin:10px 0 0;">添加照片</group-title>
      <div style="padding:10px 15px">
        <flexbox wrap="wrap" align="baseline" :gutter="0">
           <flexbox-item :span="3" v-for="(img, index) in Homework.uploader.list" :key="index">
            <div class="photo">
              <div style="text-align:center;height:90px;width:65px;background-size:100% 100%" :style="'background-image:url('+img+')'"></div>
              <i class="icon iconfont icon-error" style="font-size:30px;position:absolute;left:58px;top:-25px" @click="_del(index)"></i>
            </div>
          </flexbox-item>
          <flexbox-item :span="3" v-if="!(Homework.uploader.list.length === 2)" @click.native="_add">
            <div class="photo">
              <div class="plus">
                <b>+</b>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div>
      <checklist title="选择消息发送班级" label-position="right" required :options="classList" v-model="classes"></checklist>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Checklist, Flexbox, FlexboxItem, GroupTitle} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'image',
  components: {
    XHeader, Cell, Group, ViewBox, Checklist, Flexbox, FlexboxItem, GroupTitle
  },
  computed: {
    ...mapGetters(['User', 'Homework']),
    classList () {
      let list = []
      for (let i in this.User.classes) {
        list.push({key: this.User.classes[i].classCode, value: this.User.classes[i].name})
      }
      return list
    }
  },
  data () {
    return {
      classes: []
    }
  },
  methods: {
    ...mapActions(['setHomeworkImage', 'delHomeworkImage', 'resetHomeworkImage', 'setHomework']),
    // 增加照片
    _add () {
      this.$router.push({'name': 'homework_publish_photo'})
      // let cmr = plus.camera.getCamera()
      // cmr.captureImage((p) => {
      //   plus.io.resolveLocalFileSystemURL(p, (entry) => {
      //     this.setHomeworkImage(entry.toLocalURL())
      //     this.$router.push({'name': 'homework_publish_photo'})
      //   })
      // })
    },
    // 删除照片
    _del () {
      this.delHomeworkImage()
    },
    // 发布
    _publish () {
      if (this.Homework.uploader.list.length === 0) {
        this.$vux.toast.show({text: '图片不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else if (this.classes.length === 0) {
        this.$vux.toast.show({text: '班级不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else {
        this.setHomework({img: this.Homework.uploader.list, classCodes: this.classes}).then(() => {
          this.classes = []
          this.resetHomeworkImage()
        }).then(() => {
          this.$vux.toast.show({text: '发送成功', type: 'text', time: 700, position: 'bottom', onHide () { history.go(-1) }})
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  },
  beforeRouteLeave (to, from, next) {
    // 若返回作业列表并且编辑区有内容
    if ((this.Homework.uploader.list.length || this.classes.length) && to.name === 'homework') {
      let that = this
      this.$vux.confirm.show({
        title: '确定放弃编辑的消息么？',
        dialogTransition: '',
        onCancel () { next(false) },
        onConfirm () {
          that.classes = []
          that.resetHomeworkImage()
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
.photo{
  position:relative;
  margin-top:10px;
  padding-left:10px;
  .plus{
    text-align:center;
    height:90px;width:65px;border:1px solid #4BB7AA;font-size:48px;color:#ccc;
    border-radius:3px;
    float:left;
  }
}
</style>
