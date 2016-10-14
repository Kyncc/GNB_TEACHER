<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        </div>
        <group style="padding-top:46px;">
            <cell v-for="item in fetchClassMateList" :title="item.name" v-touch:tap="_check(item.id)">
                <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
            </cell>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,XButton,ViewBox} from 'vux'
import { myClassmateList,applyList} from '../../class/actions.js'
import { fetchClassMateList,fetchClassName } from '../../class/getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {
        XHeader,
        Cell,
        Group,
        ViewBox
    },
    vuex:{
        actions:{
            myClassmateList,applyList
        },
        getters:{
            fetchClassMateList,token,id,fetchClassName
        }
    },
    ready(){
        this.myClassmateList({
            classCode:this.id,
            token:this.token
        })
    },
    methods:{
        _check(id){
            console.log(id)
        }
    },
    data(){
        return {
        }
    }
}
</script>
