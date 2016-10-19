<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">{{fetchClassName}}<a slot="right" v-touch:tap="_edit">{{edit}}</a></x-header>

        <group>
            <cell v-for="item in fetchClassMateList" :title="item.name" >
                <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
                <div class="weui_cell_ft" v-show="delete" v-touch:tap="_delete(item.id,item.name)">删除</div>
            </cell>
        </group>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该学生码?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import { delStudent,myClassmateList} from '../actions.js'
import { fetchClassMateList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton,Confirm},
    vuex:{
        actions:{
            delStudent,myClassmateList
        },
        getters:{
            fetchClassMateList,token,id,fetchClassName
        }
    },
    data(){
        return {
            delete: false,
            show: false,
            delId:'',
            delName:'',
            edit:'编辑'
        }
    },
    methods:{
        _delete(id,name){
            this.show = true
            this.delId = id
            this.delName = name
        },
        _edit(){
            if(this.delete){
                this.delete = false
                this.edit='编辑'
            }else{
                this.delete = true
                this.edit='完成'
            }
        },
        onAction(type) {
            if(type=='确认'){
                let self = this
                self.delStudent({
                    studentId:self.delId,
                    classCode:self.id,
                    token:self.token
                },()=>{
                    self.myClassmateList({
                        classCode:self.id,
                        token:self.token
                    })
                })
            }else{
                return
            }
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
</style>
