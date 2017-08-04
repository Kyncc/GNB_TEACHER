<template>
  <div class="mainIndex">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{showBack: false}">归纳本-教师端</x-header>
    <swiper auto height="145px" :loop="true" :interval="8000">
      <swiper-item v-for="(item, index) in list" :key="index">
        <router-link :to="{path: `${item.url}`}">
          <img :src="item.img" style="width: 100%;height:145px">
        </router-link>
      </swiper-item>
    </swiper>
    <flexbox style='height:6.3rem' :gutter='0'>
      <flexbox-item :span="4" @click.native="$router.push({ name: 'error'})" class='error'></flexbox-item>
      <flexbox-item :span="4" @click.native="$router.push({ name: 'workbook'})" class='workbook'></flexbox-item>
      <flexbox-item :span="4" @click.native="$router.push({ name: 'homework'})" class='homework'></flexbox-item>
    </flexbox>
    <flexbox style='height:6.3rem' :gutter='0'>
      <flexbox-item :span="4" @click.native="$router.push({ name: 'myDownload'})" class='myDownload'></flexbox-item>
      <flexbox-item :span="4" @click.native="$router.push({ name: 'download'})" class='download'></flexbox-item>
      <flexbox-item :span="4" @click.native="$router.push({ path: 'class'})" class='myclass'></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import {XHeader, ViewBox, XButton, Swiper, SwiperItem, Flexbox, FlexboxItem} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, XButton, Swiper, SwiperItem, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['User']),
    list () {
      return this.User.swiper.map((item, index) => ({
        url: `/article/${item.id}`,
        img: item.img + '?imageMogr2/auto-orient/thumbnail/x335/format/jpg/interlace/1/blur/1x0/quality/100|imageslim'
      }))
    }
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
.weui-loading_toast .weui-mask_transparent{
  z-index: 2 !important;
}
</style>
