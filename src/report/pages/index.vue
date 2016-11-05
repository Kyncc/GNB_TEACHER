<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
            <x-header :left-options="{showBack: true}">
                知识图谱
            </x-header>
        </div>
        <div style="padding-top:46px;">
            <accordion :list="list" link="report/detail/"></accordion>
        </div>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import { period_id,subject_id,token } from '../../common/getters'
import '../index.less'
import accordion from '../../components/accordion.vue'

export default {
    components: {
        XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion
    },
    methods: {
        _back() {
            this.$router.go('/main');
        }
    },
    vuex: {
        getters: {
            period_id,subject_id,token
        },
        actions: {

        }
    },
    store,
    data(){
        return {
            list:[
                {
                    title:'必修',
                    list:[
                        {title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'}
                    ]
                },
                {
                    title:'必修2',
                    list:[
                        {title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'},{title:'第1章',
                        id:'1'}
                    ]
                }
            ]
        }
    },
    ready(){

    }
}
</script>
