<template>
    <view-box v-ref:view-box>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <cell title="申请通知" :link="{ path: '/class/apply/'+ code}"></cell>
                <cell title="班级成员" :link="{ path: '/class/classmate/'+ code}">
                    <span>{{fetchClassMateList.length}}人</span>
                </cell>
                <cell title="邀请学生" :link="{ path: '/class/invite/'+ code}"></cell>
                <cell title="删除班级" v-touch:tap="_delete()" ></cell>
            </group>
        </div>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该班级吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem,XInput,Confirm} from 'vux'
import { getClassDetail,applyList,myClassList,delClass} from '../actions.js'
import { fetchClassMateList,fetchApplyList,fetchClassName } from '../getters.js'
import { token,code } from '../../common/getters.js'
import * as _ from '../../config/whole'

export default {
    components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,XButton,XInput,Confirm},
    vuex:{
        actions:{
            getClassDetail,applyList,myClassList,delClass
        },
        getters:{
            fetchClassMateList,token,code,fetchApplyList,fetchClassName
        }
    },
    data(){
        return {
            reddot:false,
            show:false,
        }
    },
    methods:{
        _delete(){
            this.show = true
        },
        onAction(type) {
            if(type=='确认'){
                this.delClass({
                    classCode:this.code,
                    token:this.token
                },()=>{
                    history.go(-1);
                })
            }
        }
    },
    created(){
        _.busy();
        this.getClassDetail({
            classCode:this.code,
            token:this.token
        },()=>{
            setTimeout(()=>{
               _.leave();
            },300);
        });
    }
}
</script>

