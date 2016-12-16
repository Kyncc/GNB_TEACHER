<template>
    <view-box v-ref:view-box class='myClass'>

        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                {{fetchClassName}}
                <a slot="right" v-show="fetchClassMateList.length" v-touch:tap="(delete = !delete)">{{(delete ? "完成":"编辑")}}</a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <group>
                <cell v-for="item in fetchClassMateList" :title="item.name" >
                    <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
                    <div class="weui_cell_ft" v-show="delete" v-touch:tap="_delete(item.id)">删除</div>
                </cell>
            </group>
        </div>

        <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
            <span slot="no-results" style="color:#4bb7aa;">
                <p style="font-size:1rem;display:inline-block;">快邀请更多学生吧~</p>
            </span>
            <span slot="no-more"></span>
        </infinite-loading>

        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该学生吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import { delStudent,getClassDetail,clearClassDetail} from '../actions.js'
import { fetchClassMateList,fetchClassName,fetchClassGrade  } from '../getters.js'
import { token,code } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton,Confirm},
    vuex:{
        actions:{
            delStudent,getClassDetail,clearClassDetail
        },
        getters:{
            fetchClassMateList,token,code,fetchClassName
        }
    },
    data(){
        return {
            show: false,
            delId:'',
            delete:false
        }
    },
    methods:{
        _onInfinite(){
            this.clearClassDetail();
            this.getClassDetail({
                classCode:this.code,
                token:this.token
            },()=>{
                if(this.fetchClassMateList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
                 this.$broadcast('$InfiniteLoading:complete');
            });
        },
        _delete(id){
            this.show = true
            this.delId = id
        },
        onAction(type) {
            if(type=='确认'){
                this.delStudent({
                    studentId:this.delId,
                    classCode:this.code,
                    token:this.token
                },()=>{
                    this.$broadcast('$InfiniteLoading:reset');
                })
            }
        }
    }
}
</script>

