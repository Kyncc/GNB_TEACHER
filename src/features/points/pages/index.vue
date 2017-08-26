<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的积分'}"></x-header>
    <div>
      <div class="code">
        <h4>当月积分</h4>
        <p style='color:#ff5722;font-size:30px;'>{{Points.my.points}}</p>
        <x-button type="primary"  @click.native="$router.push({name: 'points_earn'})" style='width:90%;margin:0 auto;'>赚积分</x-button>
      </div>
      <group>
        <cell title="积分明细" :link="{name: 'points_list'}"><i class="icon iconfont icon-jifenmingxi" style="color:#4cc0be" slot="icon"></i></cell>
        <cell title="排行榜" :link="{name: 'points_rask'}"><i class="icon iconfont icon-paihangbang" style="color:#fc0" slot="icon"></i></cell>
      </group>
    </div>
  </view-box>
</template>

<script>
import { XHeader, XButton, ViewBox, Flexbox, FlexboxItem, Cell, Group } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, XButton, ViewBox, Flexbox, FlexboxItem, Cell, Group
  },
  computed: {
    ...mapGetters(['Points'])
  },
  methods: {
    ...mapActions(['getPoints'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPoints()
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="less" scoped>
.code {
  text-align: center;
  padding: 1.5rem 0;
  line-height: 2rem;
  background: #fff;
  box-sizing: border-box;
  p{
    margin: .75rem 0;
  }
}
</style>
