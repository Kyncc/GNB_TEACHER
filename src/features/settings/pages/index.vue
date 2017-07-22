<template>
  <div>
    <view-box ref="settings" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '设置'}"></x-header>
      <!--<group gutter='0'>
        <cell title="修改密码" :link="{name: 'settings_pwd'}" is-link></cell>
      </group>-->
      <!--<group gutter='0'>
        <x-switch title="只看学科" v-model='subjectDisabled'></x-switch>
        <checklist v-show='subjectDisabled' :options="subjectList" v-model="subject"></checklist>
        <x-switch title="只看学段" v-model='gradeDisabled'></x-switch>
        <checklist v-show='gradeDisabled' :options="gradeList" v-model="grade"></checklist>
      </group>-->
      <group gutter='0'> 
        <cell title="退出登录" @click.native="_onConfirm"></cell>
      </group>
    </view-box>
  </div>
</template>

<script>
import {XHeader, Cell, Checklist, Group, ViewBox, Confirm, XSwitch} from 'vux'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Checklist, Group, ViewBox, Confirm, XSwitch
  },
  data () {
    return {
      subjectDisabled: false,
      gradeDisabled: false,
      subject: [2],
      grade: [1],
      subjectList: [{key: 2, value: '数学'}, {key: 7, value: '物理'}],
      gradeList: [{key: 1, value: '初中'}, {key: 2, value: '高中'}],
      show: false
    }
  },
  methods: {
    _onConfirm () {
      let _this = this
      this.$vux.confirm.show({
        title: '是否退出登录',
        dialogTransition: 'vux-fade',
        onConfirm () {
          localStorage.removeItem('token')
          if (window.plus) plus.runtime.restart() // 重启应用
          else _this.$router.push(`/login`)
        }
      })
    }
  }
}
</script>
