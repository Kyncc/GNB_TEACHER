<template>
    <div class='createClass'>
        <x-header :left-options="{showBack: true}">创建班级<a slot="right" v-touch:tap="_complete">创建</a></x-header>
        <group>
            <x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name"></x-input>
        </group>
    </div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm} from 'vux'
import {token,period_id,subject_id} from '../../common/getters.js'
import {createClass} from '../actions.js'
import * as _ from '../../config/whole.js'
export default {
    components: {XHeader,XInput,Group,XButton,Confirm},
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
            name: ''
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
