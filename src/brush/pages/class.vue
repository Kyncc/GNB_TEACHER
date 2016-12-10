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
import { myClassmateList,applyList,setStudentId} from '../../class/actions.js'
import { fetchClassMateList,fetchClassName,code } from '../../class/getters.js'
import { token } from '../../common/getters.js'
export default {
    components: {
        XHeader,Cell,Group,ViewBox
    },
    vuex:{
        actions:{
            myClassmateList,applyList,setStudentId
        },
        getters:{
            fetchClassMateList,token,fetchClassName
        }
    },
    ready(){
        this.myClassmateList({
            classCode:this.code,
            token: this.token
        })
    },
    methods:{
        _check(id){
            this.setStudentId(id)
            this.$router.go('/index/chapter/'+ id)
        }
    }
}
</script>
<style lang="less" scoped>
.weui_cells{
    min-height:none !important;
    .weui_cell{
        padding: 1rem;
        background:#fff;
        &:last-child{
            border: none;
        }
    }
}
</style>
