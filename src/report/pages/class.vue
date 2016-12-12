<template>
    <view-box v-ref:view-box>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <cell v-for="item in fetchClassMateList" :title="item.name" v-touch:tap="_check(item.id)" is-link>
                    <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
                </cell>
            </group>

            <infinite-loading :on-infinite="_onInfinite" spinner="default">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">邀请更多的同学加入吧~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
        </div>
    </view-box>
</template>

<script>
import { XHeader,Cell,Group,ViewBox} from 'vux'
import { getClassDetail} from '../../class/actions.js'
import { fetchClassMateList,fetchClassName } from '../../class/getters.js'
import { token,code} from '../../common/getters.js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: {
        XHeader,Cell,Group,ViewBox,InfiniteLoading
    },
    vuex:{
        actions:{
            getClassDetail
        },
        getters:{
            fetchClassMateList,token,code,fetchClassName
        }
    },
    methods:{
        _check(id){
            this.$router.go('/report/student/'+id)
        },
        _onInfinite(){
            if(this.fetchClassMateList.length != 0){
                this.$broadcast('$InfiniteLoading:loaded');
                this.$broadcast('$InfiniteLoading:complete');
                return;
            }
			this.getClassDetail({
                classCode:this.code,
				token:this.token
			},()=>{
                    if(this.fetchClassMateList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                    this.$broadcast('$InfiniteLoading:complete');
				}
			)
		}
    }
}
</script>
