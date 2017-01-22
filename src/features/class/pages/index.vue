<template>
  <view-box v-ref:view-box class='myClass'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        班级列表<a slot="right"  v-link="{path: 'create'}">新建</a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <group>
        <template v-for="item in classList" >
          <cell :title="item.name"  @click="_detail(item.classCode)" is-link>
            <div v-if="item.status == '1'" class="badge-value" slot="value" class="vux-center-v" style="display:inline-block">
              <badge text="新通知"></badge>
            </div>
          </cell>
        </template>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="default">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">您还未创建班级~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>

    </div>
  </view-box>
</template>
<script>

import { XHeader,Group,ViewBox,Cell,Badge }from 'vux'
import { mapActions,mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {XHeader,Group,ViewBox,InfiniteLoading,Cell,Badge},
  methods: {
    ...mapActions(['getClass','resetClassmate']),
    _detail(code) {
      this.resetClassmate();
      this.$router.go('class/'+code);
    },
    _onInfinite(){
      this.getClass()
      .then(()=>{
        if(this.classList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  computed:{
    ...mapGetters(['classList','classListReset','path'])
	},
  watch: {
    path(){
      if(this.path == '/main/classes/manager/' && this.classListReset){
          this.$broadcast('$InfiniteLoading:reset');
      }
    }
  }
}
</script>