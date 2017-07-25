<template>
  <view-box ref="homework" body-padding-top="106px">
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

    </div>
    <actionsheet v-model="show" :menus="menu" theme="android" @on-click-menu="_publish"></actionsheet>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Spinner, XButton, Actionsheet} from 'vux'
import gnbChangeSub from '@/components/gnb_changeSub'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    Actionsheet, XHeader, Cell, Group, ViewBox, Spinner, XButton, gnbChangeSub
  },
  computed: {
    ...mapGetters(['Homework'])
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
      ]
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
