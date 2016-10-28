<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">我的班级<a slot="right" v-link="{ path: '/index/createClass'}">创建班级</a></x-header>
        <group id='wrapper' style="height:100%">
            <div  v-for="item in fetchClassList"  class="cell"  v-touch:tap="_detail(item.classCode,item.name)">
                <span :class="{'vux-reddot':item.status=='1'}">{{item.name}}&nbsp;</span>
            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox} from 'vux'
import {myClassList,setClassName} from '../actions'
import {fetchClassList} from '../getters'
import {token} from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox},
    vuex: {
        getters: {
            fetchClassList,token
        },
        actions: {
            myClassList,setClassName
        }
    },
    methods: {
        _detail(code,name) {
            this.setClassName(name)
            setTimeout(()=>{
                this.$router.go('class/manage/' + code)
            },300)

        },
        createClass() {
            this.$router.go('createClass')
        }
    },
    ready(){
        let self = this
        self.myClassList({
            token: self.token
        })
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.myClassList({
                    token: self.token
                },()=>{
                    complete()
                })
            }
        });
    }
}
</script>
<style lang="less" scoped>
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
    }
}
</style>
