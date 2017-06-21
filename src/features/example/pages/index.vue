<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '题目详情'}">
      <div slot="right" @click='visible = true'>
        <i class="icon iconfont icon-6" style="padding:10px;margin:0 -10px 0 0"></i>
      </div>
      <mt-popup v-model="visible" popup-transition="popup-fade" class="popup" >
        <p @click="$router.push({name:'correct', params:{subjectId: Params.subjectId, id: Params.id, grade: Params.grade}})">
           <i class="icon iconfont icon-bianji"></i>纠错
        </p>
        <p><i class="icon iconfont icon-share"></i>分享</p>
        <p><i class="icon iconfont icon-pinglun"></i>评价</p>
      </mt-popup>
    </x-header>
    <card v-show='!loading'>
      <div slot="header" class="weui-panel__hd">
        <flexbox>
          <flexbox-item :span="10" style="color:#4bb7aa">内容</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <div v-html="Example.stem"></div>
        <div v-if="Example.opt">
          <template v-for="(value, key) in Example.opt">
            <div style="padding-top:5px;">{{ key }}：
              <p v-html="value" style="display:inline-block"></p>
            </div>
          </template>
        </div>
      </div>
    </card>
    <card v-show='!loading'>
      <div slot="header" class="weui-panel__hd" style="color:#4bb7aa">解析</div>
      <div slot="content" v-html="Example.answer"></div>
    </card>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
      <p v-else-if="Example.length == 0" style="font-size:16px;padding:10px 0;color:#4BB7AA">出错了~</p>
    </div>
  </view-box>
</template>

<script>
import { XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem } from 'vux'
import { Popup } from 'mint-ui'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
import modules from '../modules/store'

store.registerModule('example', {
  ...modules
})

export default {
  name: 'example',
  components: {
    XHeader, Card, ViewBox, Spinner, Flexbox, FlexboxItem, 'mt-popup': Popup
  },
  computed: {
    ...mapGetters(['Example', 'Params'])
  },
  data () {
    return {
      visible: false,
      loading: true
    }
  },
  methods: {
    ...mapActions(['getExample', 'exampleClear']),
    _getData () {
      this.loading = true
      this.getExample().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'correct') {
      next(vm => {
        vm.exampleClear()
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
