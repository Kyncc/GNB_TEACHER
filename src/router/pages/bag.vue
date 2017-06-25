<template>
  <div class='bag'>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{showBack: false}">书包</x-header>
    <swiper auto height="140px" :loop="true" :interval="5000">
      <swiper-item v-for="(item, index) in list" :key="index">
        <router-link :to="{path: `${item.url}`}">
          <img :src="item.img" style="width: 100%;height:140px">
        </router-link>
      </swiper-item>
    </swiper>
    <group gutter='0'>
      <cell title="我的班级" link="class">
        <i class="icon iconfont icon-hat" style="color:#ABC97C" slot="icon"></i>
        <template v-if="News.classes">
          <badge text="新通知" style="position:relative;top:-2px;"></badge>
        </template>
      </cell>
      <cell title="我的下载" link="myDownload">
        <i class="icon iconfont icon-download" style="color:#794BB8" slot="icon"></i>
      </cell>
    </group>
  </div>
</template>

<script>
import {XHeader, Badge, Cell, Group, ViewBox, Swiper, SwiperItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'bag',
  components: {
    XHeader, Badge, Cell, Group, ViewBox, Swiper, SwiperItem
  },
  computed: {
    ...mapGetters(['User', 'News']),
    list () {
      return this.User.swiper.map((item, index) => ({
        url: `/article/${item.id}`,
        img: item.img + '?imageMogr2/auto-orient/thumbnail/x140/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'
      }))
    }
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
