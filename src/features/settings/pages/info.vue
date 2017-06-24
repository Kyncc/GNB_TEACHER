<template>
  <view-box ref="userinfo" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '个人资料'}">
      <router-link :to="{ path: 'update'}" slot="right">
        <p>编辑</p>
      </router-link>
    </x-header>
    <group gutter="0">
      <cell title="头像">
        <img :src="User.headImg" width="60" height="60">
      </cell>
      <cell title="姓名" :value="User.name"></cell>
      <cell title="手机号码" :value="User.mobile"></cell>
      <cell title="性别" :value="User.sex === '1' ? '男' : '女'"></cell>
    </group>
    <group>
      <cell title="学校" :value="User.school"></cell>
      <cell title="主教科目" :value="User.subjectId === '2' ? '数学' : '物理'"></cell>
    </group>
    <group>
      <cell title="修改密码" :link="{name: 'settings_pwd'}" is-link></cell>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'info',
  components: {
    XHeader, Cell, Group, ViewBox
  },
  computed: {
    ...mapGetters(['User']),
    grade () {
      switch (this.User.grade) {
        case '7' : return '七年级'
        case '8' : return '八年级'
        case '9' : return '九年级'
        case '10' : return '高中'
      }
    }
  }
}
</script>
