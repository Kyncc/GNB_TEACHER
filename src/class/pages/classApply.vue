<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        <group>
            <div  v-for="item in fetchApplyList"  class="cell" >
                <img style="display:block;margin-right:5px;width:25px;height:25px;float:left;" :src="item.headImg">
                <span >{{item.studentName}}</span>
                <p v-show="item.status == 1" class="state disable">已同意</p>
                <p v-show="item.status == 0" class="state disable">已拒绝</p>
                <x-button v-show="item.status == 2" v-touch:tap="_apply('1',item.classCode,item.studentId)" class="btn" type='primary' mini>同意</x-button>
                <x-button v-show="item.status == 2" v-touch:tap="_apply('0',item.classCode,item.studentId)" class="btn" type='warn' mini>拒绝</x-button>

            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import { replyApply,applyList} from '../actions.js'
import { fetchApplyList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,XButton},
    vuex:{
        actions:{
            replyApply,applyList
        },
        getters:{
            token,id,fetchApplyList,fetchClassName
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
        }
    }
}
</script>
<style lang="less" scoped>
.weui_cell{
    padding: 1rem;
    &:last-child{
        border: none;
    }
}
.myClass{

    .cell{
        padding:1rem;
        span{
            dispaly:inline-block !important;
        }
        border-bottom:1px solid #d9d9d9;
        &:last-child{
            border: none;
        }
        p{
            float:right;
            font-size:15px;
            color:#999;
        }
        .btn{
            float:right;
            margin-top:0;
            margin-left:10px;
        }
    }

}
</style>
