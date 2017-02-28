<template>
<view-box  class='classes vux-scroller-header-box'>
  <div style="height:46px;">
    <x-header :left-options="{showBack: false}" style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">班级</x-header>
  </div>
  <div>
    <swiper :aspect-ratio="360/750" :show-dots="true" dots-position="center" :dots-class="swiperdots" :show-desc-mask="false">
      <swiper-item class="swiper-demo-img" v-for="item in demo01_list"><img :src="item.img" height="100%" width="100%"></swiper-item>
    </swiper>

    <group style="padding:10px 0;">
      <cell title="知识图谱" link="classes/select?type=report">
        <span class="icon iconfont icon-pie-chart" style="color:#794BB8" slot="icon"></span>
      </cell>
    </group>
    <group style="padding-bottom:10px;">
      <cell title="刷题本" link="classes/select?type=brushed">
        <span class="icon iconfont icon-brush" style="color:#FF5454" slot="icon"></span>
      </cell>
      <cell title="斩题本" link="classes/select?type=break">
        <span class="icon iconfont icon-book1" style="color:#5ECFE7" slot="icon"></span>
      </cell>
      <cell title="弃题本" link="classes/select?type=pass">
        <span class="icon iconfont icon-lajitong16" style="color:#ffb660" slot="icon"></span>
      </cell>
    </group>
    <group>
      <cell title="班级管理" link="classes/manager/">
        <span class="icon iconfont icon-workbook" style="color:#ABC97C"  slot="icon"></span>
      </cell>
    </group>
  </div>
</view-box>
</template>

<script>
import {XHeader,Cell,Group,Confirm,Scroller,ViewBox,Swiper,SwiperItem} from 'vux'


const baseList =
[{
  url: 'javascript:;',
  img: 'https://ygxdxx.coding.me/img/daily_pic.jpg',
  title: '茶包VS原叶茶'
}]


export default {
  components: {
    XHeader,Cell,Group,Confirm,Scroller,ViewBox,Swiper,SwiperItem
  },
  data(){
    return {
      demo01_list:baseList
    }
  },
  methods:{
    _swiper(){
      alert(1);
    }
  }
}

</script>
<style scroped>
.swiperdots{
  background:#4bb7aa
}
</style>
