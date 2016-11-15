<template>
    <div class='createClass'>
        <x-header :left-options="{showBack: true}">创建班级<a slot="right" v-touch:tap="_complete">创建</a></x-header>
        <group>
            <x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name"></x-input>
        </group>
        <group title="选择教材">
            <!-- <popup-picker :title="title3" :data="list3" :columns="3" :value.sync="value3" v-ref:picker3></popup-picker>
            <cell title="获取值对应的文字" :value="$refs.picker3.getNameValues()"></cell> -->
            <popup-picker :title="title" :data="list3" :columns="3" :value.sync="value" show-name></popup-picker>
        </group>

    </div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell} from 'vux'
import {token,period_id,subject_id} from '../../common/getters.js'
import {createClass} from '../actions.js'
import * as _ from '../../config/whole.js'
export default {
    components: {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell},
    vuex: {
        getters: {
            token,period_id,subject_id
        },
        actions: {
            createClass
        }
    },
    data() {
        return {
            name: '',
            title: '选择教材',
            value: [],
            list3: [{
                name: '七年级',
                value: '7',
                parent: 0
            }, {
                name: '八年级',
                value: '8',
                parent: 0
            }, {
                name: '物理',
                value: 'physics7',
                parent: '7'
            }, {
                name: '数学',
                value: 'math7',
                parent: '7'
            }, {
                name: '物理',
                value: 'physics8',
                parent: '8'
            }, {
                name: '物理教材1',
                value: 'material1',
                parent: 'physics7'
            }, {
                name: '物理教材2',
                value: 'material2',
                parent: 'physics7'
            }, {
                name: '数学教材',
                value: 'material3',
                parent: 'math7'
            }, {
                name: '物理教材3',
                value: 'material4',
                parent: 'physics8'
            }, {
                name: '物理教材4',
                value: 'material5',
                parent: 'physics8'
            }],
        }
    },
    methods: {
        _complete() {
            if (this.name) {
                this.createClass({
                    token: this.token,
                    name: this.name,
                    options: {
                        period_id: this.period_id,
                        subject_id: this.subject_id
                    }
                }, () => {
                    this.$router.replace('/index/class')
                    _.toast('创建班级成功')
                })
            } else {
                _.toast('请填写班级名称')
            }
        }
    }
}
</script>
