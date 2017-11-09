<template>
  <view-box ref="myClass" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的班级'}">
      <div slot="right">
        <router-link :to="{ name: 'class_message'}" style="margin:0">
          <i class="icon iconfont icon-comment2" style="padding:8px;font-size:28px;top:2px;right:-15px;"></i>
        </router-link>
      </div>
    </x-header>
    <div>
      <group :gutter='0'>
        <cell v-for="(myClass, index) in User.classes" :key='index' :title="myClass.name" :link="'/class/detail/' + myClass.classCode"></cell>
      </group>
      <x-button type="primary" @click.native="$router.push({name: 'class_add'})" style='width:90%;margin:1rem auto;'>添加班级</x-button>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, XButton} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, XButton
  },
  computed: {
    ...mapGetters(['User', 'News'])
  },
  methods: {
    ...mapActions(['getUserNews'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getUserNews()
    })
  }
}
</script>
