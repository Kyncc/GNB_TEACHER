<template>
  <view-box ref="userinfoUpdate" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '修改资料'}">
      <p slot="right" @click="_finish">完成</p>
    </x-header>
    <group gutter="0">
      <cell title="头像" @click.native="show = !show">
        <img slot="default" v-lazy="User.headImg" width="60" height="60"/>
      </cell>
      <x-input title="姓名" v-model="name" class="input_right"></x-input>
      <cell title="性别">
        <checker slot="default" v-model="sex" default-item-class="demo2-item" selected-item-class="demo2-item-selected">
          <checker-item value="1">男</checker-item>
          <checker-item value="0">女</checker-item>
        </checker>
      </cell>
      <x-input title="学校" v-model="school" class="input_right"></x-input>
    </group>
    <group>
      <selector v-model="subjectId" title="主教科目" :options="sublist"></selector>
    </group>
    
    <actionsheet v-model="show" :menus="menus" @on-click-menu="_menusClick"></actionsheet>
  </view-box>
</template>

<script>
import {XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell, Actionsheet} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'update',
  components: {
    XHeader, Group, ViewBox, XInput, Checker, CheckerItem, Selector, Cell, Actionsheet
  },
  computed: {
    ...mapGetters(['User'])
  },
  data () {
    return {
      name: '',
      sex: 0,
      school: '',
      subjectId: '',
      sublist: [{key: '2', value: '数学'}, {key: '7', value: '物理'}],
      show: false,
      menus: {
        menu1: '拍照',
        menu2: '选择照片'
      }
    }
  },
  methods: {
    ...mapActions(['setHeadImg', 'setUserInfo', 'getUserInfo']),
    _finish () {
      this.setUserInfo({
        name: this.name,
        sex: this.sex,
        school: this.school,
        subjectId: this.subjectId
      }).then(() => {
        this.getUserInfo().then(() => {
          history.go(-1)
        })
      })
    },
    _getImage () {
      // 唤起本机相机
      let cmr = plus.camera.getCamera()
      cmr.captureImage((p) => {
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          this.setHeadImg(entry.toLocalURL())
          this.$router.push({name: 'settings_photo'})
        })
      })
    },
    _galleryImgs () {
      plus.gallery.pick((e) => {
        this.setHeadImg(e.files[0])
        this.$router.push({name: 'settings_photo'})
      }, () => {
        this.$vux.toast.show({text: '您已取消选择图片', type: 'text', time: 1000, position: 'bottom'})
      }, {
        filter: 'image',
        multiple: true
      })
    },
    _menusClick (val) {
      val === 'menu1' ? this._getImage() : this._galleryImgs()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = vm.User.name
      vm.school = vm.User.school
      vm.subjectId = vm.User.subjectId
      vm.sex = vm.User.sex
    })
  }
}
</script>

<style lang="less">
.input_right .weui-input{
  text-align:right;
}
.demo2-item {
  width: 27px;
  height: 27px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 23px;
  text-align: center;
}
.demo2-item-selected{
  border: 1px solid #4BB7AA;
  color: #4BB7AA;
}
.weui-cell_select .weui-select{
  direction: rtl !important;
}
</style>
