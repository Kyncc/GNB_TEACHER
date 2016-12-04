<template>
    <div class='createClass'>
        <x-header :left-options="{showBack: true}">创建班级<a slot="right" v-touch:tap="_complete">创建</a></x-header>
        <group>
            <x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name"></x-input>
        </group>
        <group title="选择教材">
            <!-- <popup-picker :title="title3" :data="list3" :columns="3" :value.sync="value3" v-ref:picker3></popup-picker>
            <cell title="获取值对应的文字" :value="$refs.picker3.getNameValues()"></cell> -->
            <popup-picker :title="title" :data="list" :columns="3" :value.sync="value" show-name></popup-picker>
        </group>

    </div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell} from 'vux'
import {token,period_id,subject_id} from '../../common/getters.js'
import {createClass,getMaterial} from '../actions.js'
import * as _ from '../../config/whole.js'
export default {
    components: {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell},
    vuex: {
        getters: {
            token,period_id,subject_id
        },
        actions: {
            createClass,getMaterial
        }
    },
    data() {
        return {
            name: '',
            title: '选择教材',
            value: [],
            list:[]
        }
    },
    watch:{
        value(val){
            console.log(val)
        }
    },
    methods: {
        _complete() {
            if (this.name) {
                this.createClass({
                    token: this.token,
                    name: this.name,
                    subject_id: this.subject_id,
                    grade:this.value[0].substring(3),
                    edition_id:this.value[2].substring(3),
                }, () => {
                    this.$router.replace('/index/class')
                    _.toast('创建班级成功')
                })
            } else {
                _.toast('请填写班级名称')
            }
        }
    },
    ready(){
        let self = this
        self.getMaterial({token: self.token},res=>{
            for(let key in res){
                if(res[key].parent == '0'){
                    self.list.push({
                        name:res[key].name,
                        parent:0,
                        value:res[key].value
                    })
                }else{
                    self.list.push({
                        name:res[key].name,
                        parent:res[key].parent,
                        value:res[key].value
                    })
                }
            }
        })
    }
}
</script>
