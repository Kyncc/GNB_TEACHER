<template>
    <view-box v-ref:view-box>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <cell v-for="item in fetchClassMateList" :title="item.name" v-touch:tap="_check(item.id)">
                    <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
                </cell>
            </group>
        </div>
    </view-box>
</template>

<script>
import { XHeader,Cell,Group,ViewBox} from 'vux'
import { myClassmateList,applyList} from '../../class/actions.js'
import { fetchClassMateList,fetchClassName } from '../../class/getters.js'
import { token,code} from '../../common/getters.js'
export default {
    components: {
        XHeader,Cell,Group,ViewBox
    },
    vuex:{
        actions:{
            myClassmateList,applyList
        },
        getters:{
            fetchClassMateList,token,code,fetchClassName
        }
    },
    created(){
        this.myClassmateList({
            classCode:this.code,
            token: this.token
        })
    },
    methods:{
        _check(id){
            this.$router.go('/report/student/'+id)
        }
    }
}
</script>
