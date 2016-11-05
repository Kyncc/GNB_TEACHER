<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">题型汇总</x-header>
        </div>
        <div style="padding-top:46px;height:100%">
            <div id='wrapper' style="height:100%">
                <group>
                    <div class="cell">必修</div>
                    <cell title="第1章:集合函数与概念" @click="_detail">
                        <span class="icon icon-info" slot="icon"></span>
                    </cell>
                    <cell title="第2章:基本初等函数" @click="_detail">
                        <span class="icon icon-info" slot="icon"></span>
                    </cell>
                    <cell title="第3章:函数的应用" @click="_detail">
                        <span class="icon icon-info" slot="icon"></span>
                    </cell>
                </group>
            </div>
        </div>
    </view-box>
</template>
<script>
import './myClass.less'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import { XHeader,Group,ViewBox,Cell }from 'vux'
import { myClassList,setClassName } from '../../class/actions.js'
import { fetchClassList } from '../../class/getters'
import { token,id } from '../../common/getters.js'

export default {
    components: {XHeader,Group,ViewBox,Cell},
    vuex: {
        getters: {
            fetchClassList,token,id
        },
        actions: {
            myClassList,setClassName
        }
    },
    methods: {
        _detail() {
            this.$router.go('/index/brush/error/' + this.id)
        }
    },
    ready(){
        let self = this
        self.myClassList({
            token: self.token
        })
        var jroll = new JRoll("#wrapper")
        jroll.pulldown({
            refresh: function(complete) {
                self.myClassList({
                    token: self.token
                },()=>{
                    complete()
                })
            }
        })
    }
}
</script>
<style lang="less" scoped>
.myClass{
    .cell{
        padding:0.5rem 1rem;
        span{
            dispaly:inline-block !important;
        }
        border-bottom:1px solid #d9d9d9;
    }
}
</style>
