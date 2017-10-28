<template>
  <div>
    <view-box ref="statistics" body-padding-top="46px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '查看班级'}"></x-header>
      <group :gutter='0'>
        <cell v-for="(myClass, index) in User.classes" :key='index' :title="myClass.name" :link="'class/detail/' + myClass.classCode"></cell>
      </group>
    </view-box>
  </div>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'class',
  components: {
    XHeader, Cell, Group, ViewBox
  },
  computed: {
    ...mapGetters(['User'])
  }
}
</script>
