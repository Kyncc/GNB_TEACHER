<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">班级列表</x-header>
        </div>

        <div style="padding-top:46px">
            <group>
                <div v-for="item in fetchClassList" class="cell" v-touch:tap="_detail(item.classCode,item.name)">
                    <span>{{item.name}}&nbsp;</span>
                </div>
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

import store from '../../store'
import { XHeader,Group,ViewBox }from 'vux'
import { myClassList,clearClassDetail} from '../../class/actions.js'
import { fetchClassList } from '../../class/getters'
import { token } from '../../common/getters.js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: {XHeader,Group,ViewBox,InfiniteLoading},
    vuex: {
        getters: {
            fetchClassList,token
        },
        actions: {
            myClassList,clearClassDetail
        }
    },
    store,
    methods: {
        _detail(code,name) {
            this.clearClassDetail();
            this.$router.go('/report/class/'+code)
        },
        _onInfinite(){
            if(this.fetchClassList.length != 0){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }

			this.myClassList({
				token:this.token
			},()=>{
                    if(this.fetchClassList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                    this.$broadcast('$InfiniteLoading:complete');
				}
			)
		}
    }
}
</script>