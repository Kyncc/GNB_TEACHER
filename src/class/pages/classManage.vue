<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">班级管理</x-header>
        <group>
            <x-input name="username" :value.sync="fetchClassName" readonly><span>编辑</span></x-input>
            <div  v-for="item in fetchClassList"  class="cell"  v-touch:tap="_detail(item.classCode,item.name)">
                <span :class="{'vux-reddot':item.status=='1'}">{{item.name}}&nbsp;</span>
            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,XInput} from 'vux'
import { myClassmateList,applyList,replyApply} from '../actions.js'
import { fetchClassMateList,fetchApplyList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton,XInput},
    vuex:{
        actions:{
            myClassmateList,applyList,replyApply
        },
        getters:{
            fetchClassMateList,token,id,fetchApplyList,fetchClassName
        }
    },
    methods:{
        _apply(status,classCode,studentId){
            console.log(classCode)
            let self = this
            self.replyApply({
                classCode: classCode,
                status: status,
                studentId: studentId,
                token: self.token
            },()=>{
                self.applyList({
                    classCode: self.id,
                    token: self.token
                })
            })
        },
        _list(val) {
            if(val=='apply'){
                this.selected = false
            }else{
                this.selected = true
            }
        }
    },
    ready(){
        this.myClassmateList({
            classCode:this.id,
            token:this.token
        })
        this.applyList({
            classCode:this.id,
            token:this.token
        })
    },
    data(){
        return {
            readonly: false
        }
    }
}
</script>
<style lang="less" scoped>
.applyList{
    padding:0.8rem 1rem;
    border-bottom:1px solid #999;
    .msg{
        line-height:2rem;
        font-size:0.9rem;
        span{
            font-size:0.8rem;
            float:right;
        }
        i{
            color:#4bb7aa;
            font-style:normal;
        }
    }
    .state{
        text-align:center;
        font-size:0.8rem;
    }
    .leftbtn{
        width:30%;
        margin-top:0;
    }
    .rightbtn{
        width:30%;
        margin-left:37%;
        margin-top:0;
    }
}
.weui_cell{
    padding: 1rem;
    &:last-child{
        border: none;
    }
}
</style>
