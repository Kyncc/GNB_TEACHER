<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '题目详情'}">
      <div slot="right">
         <!--<div slot="right" @click='visible = true'>-->
        <p @click="$router.push({name:'correct', params:{subjectId: Params.subjectId, id: Params.id, grade: Params.grade}, query: {type: Params.type}})">
           <i class="icon iconfont icon-bianji"></i>
        </p>
        <!--<i class="icon iconfont icon-6" style="padding:10px;margin:0 -10px 0 0"></i>-->
      </div>
      <!--<mt-popup v-model="visible" class="popup">
        <p @click="$router.push({name:'correct', params:{subjectId: Params.subjectId, id: Params.id, grade: Params.grade}})">
           <i class="icon iconfont icon-bianji"></i>纠错
        </p>
        <p><i class="icon iconfont icon-share"></i>分享</p>
        <p><i class="icon iconfont icon-pinglun"></i>评价</p>
      </mt-popup>-->
    </x-header>
    <card v-show='!loading'>
      <div slot="header" class="weui-panel__hd">
        <flexbox>
          <flexbox-item :span="10" style="color:#4bb7aa">{{Params.type === 'lxexercises' ? '练习题' : Route.query.name}}</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <div v-html="Example.stem"></div>
        <div v-for="(value, key) in Example.opt" :key='key' style="padding-top:5px;">
          {{ key }}：<p v-html="value" style="display:inline-block"></p>
        </div>
      </div>
      <div slot="footer">
        <div class="weui-cell weui-cell_link">
          <div class="weui-cell__bd">
            <flexbox :gutter='0'>
              <flexbox-item :span="3">难度: {{Example.degree}}</flexbox-item>
              <flexbox-item :span="7">更新时间: {{Example.time | ymd}}</flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
    </card>
    <card v-show='!loading'>
      <div slot="header" class="weui-panel__hd" style="color:#4bb7aa">解析</div>
      <div slot="content" v-html="Example.answer"></div>
    </card>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4BB7AA">出错了点我重新加载</p>
    </div>
  </view-box>
</template>

<script>
import { XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem } from 'vux'
import { Popup } from 'mint-ui'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
import modules from '../modules/store'

export default {
  name: 'example',
  components: {
    XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem, 'mt-popup': Popup
  },
  computed: {
    ...mapGetters(['Example', 'Params', 'Route'])
  },
  data () {
    return {
      visible: false,
      loading: true,
      error: false
    }
  },
  methods: {
    ...mapActions(['getExample', 'exampleClear']),
    _getData () {
      this.exampleClear()
      this.loading = true
      this.getExample().then(() => {
        this.error = false
        this.loading = false
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    }
  },
  beforeCreate () {
    store.registerModule('example', {
      ...modules
    })
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'correct') {
      next(vm => {
        vm._getData()
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.visible = false
    next()
  }
}
</script>
<style lang="less" scoped>
.icon-bianji {
  font-size: 22x;
}
.popup{
  background: #fff;
  width: 4rem;
  padding:.5rem ;
  top:2.3rem;
  left:86%;
  -webkit-transform: translate(-50%, 0);
  p{
    i{color:#4BB7AA;}
    font-size:.8rem;text-align: center;line-height:1.8rem; color:#555;width: 100%;
    display: box;
    overflow: hidden;
  }
  .active{
    background: #ccc;
  }
}
</style>
