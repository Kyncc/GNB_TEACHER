<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '赚积分'}"></x-header>
    <div>
      <group :gutter='0'>
        <cell title="注册" inline-desc="100分"></cell>
        <cell title="完善个人资料" inline-desc="100分/项" :link="{name: ''}"></cell>
        <cell title="邀请好友注册app" inline-desc="100分/人" :link="{name: ''}"></cell>
      </group>
      <group :gutter='8'>
        <cell title="有效意见反馈" inline-desc="100分/条" :link="{name: ''}"></cell>
        <cell title="有效纠错" inline-desc="100分/条" :link="{name: ''}"></cell>
      </group>
      <group :gutter='8'>
        <cell title="批阅作业" inline-desc="50分/人次" :link="{name: ''}"></cell>
        <cell title="点评错题" inline-desc="10分/题次" :link="{name: ''}"></cell>
        <cell title="布置作业" inline-desc="10分/人次" :link="{name: ''}"></cell>
      </group>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Spinner, Group, Cell, ViewBox} from 'vux'

export default {
  name: 'earn',
  components: {
    XHeader, Spinner, Group, Cell, ViewBox
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  }
}
</script>
