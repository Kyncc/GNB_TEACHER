<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的班级'}">
      <div slot="right">
        <router-link :to="{ path: 'class/add'}" style="margin:0">
          <i class="icon iconfont icon-plus" style="padding:8px;font-size:28px;top:-1px;right:-15px;"></i>
        </router-link>
      </div>
    </x-header>
    <div>
      <group gutter="0">
        <cell title="班级消息" link="class/message/">
          <template v-if="News.classes">
            <badge text="新通知" style="position:relative;top:-2px;"></badge>
          </template>
        </cell>
      </group>
      <group>
        <cell v-for="(myClass, index) in User.classes" :key='index' :title="myClass.name" :link="'class/detail/'+myClass.classCode"></cell>
      </group>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Badge, Cell, Group, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Badge
  },
  computed: {
    ...mapGetters(['User', 'News'])
  }
}
</script>
