<template>
  <div>
    <view-box ref="statistics" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '错题归纳'}"></x-header>
      <group gutter='0'>
        <cell title="查看班级" :link="{name: 'errorClass'}"></cell>
        <cell title="查看学生" :link="{name: 'errorClassmate'}"></cell>
      </group>
    </view-box>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox
  }
}
</script>
