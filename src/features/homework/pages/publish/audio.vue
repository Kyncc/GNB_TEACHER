<template>
  <view-box ref="homework" body-padding-top="220px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: '语音',showBack: true}">
        <div slot="right" style="margin:0" @click='_publish'>发布</div>
      </x-header>
      <group title="语音消息">
        <x-textarea v-model="content" show-counter :rows="5"></x-textarea>
      </group>
    </div>
    <div>
      <checklist title="选择消息发送班级" label-position="right" required :options="classList" v-model="classes"></checklist>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Checklist, XTextarea} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'content',
  components: {
    XHeader, Cell, Group, ViewBox, Checklist, XTextarea
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
  data () {
    return {
      content: '',
      classes: []
    }
  },
  methods: {
    ...mapActions(['setHomework']),
    _publish () {
      if (this.content.length === 0) {
        this.$vux.toast.show({text: '消息文字不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else if (this.classes.length === 0) {
        this.$vux.toast.show({text: '班级不能为空', type: 'text', time: 1000, position: 'bottom'})
      } else {
        this.setHomework({content: this.content, classes: this.classes}).then(() => {
          this.classes = []
          this.content = []
        }).catch(() => {

        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  },
  beforeRouteLeave (to, from, next) {
    if (this.content.length || this.classes.length) {
      this.$vux.confirm.show({
        title: '确定放弃编辑的消息么？',
        dialogTransition: '',
        onCancel () { next(false) },
        onConfirm () {
          this.classes = []
          this.content = []
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
