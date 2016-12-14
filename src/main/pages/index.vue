<template>
    <view-box v-ref:view-box class="mainIndex">
        <div style="position:fixed;left:0;top:0;width:100%;z-index:2016" slot="header">
            <x-header :left-options="{showBack: false}">归纳本</x-header>
        </div>
        <scroller lock-x v-ref:scroller height="-46px">
            <div style="padding-top:46px;">
                <div class="swiper">
                    <swiper auto loop height="10em" dots-position="center">
                        <swiper-item class="swiperImg" v-for="item in swiper"><img :src="item"/></swiper-item>
                    </swiper>
                </div>
                <section class="content">
                    <div class="flex-wrap">
                        <div class="flex-item right1px bottom1px" v-link="{ path: '/error'}">
                            <img src="../../assets/main/error.png"/>
                            <p>查看错题</p>
                        </div>
                        <div class="flex-item right1px bottom1px" v-link="{ path: '/brush'}">
                            <img src="../../assets/main/types.png"  />
                            <p >题型汇总</p>
                        </div>
                        <div class="flex-item bottom1px" v-link="{ path: '/report'}" >
                            <img src="../../assets/main/knowledge.png"  />
                            <p class="disable">成绩报告单</p>
                        </div>
                        <div class="flex-item right1px" v-link="{ path: '/index/class'}">
                            <img src="../../assets/main/class.png"  />
                            <p>我的班级</p>
                        </div>
                        <!--<div class="flex-item right1px" @click="_warn()">
                            <img src="../../assets/main/homework.png"  />
                            <p class="disable">布置作业</p>
                        </div>-->
                        <div class="flex-item right1px"  v-link="{ path: '/pass'}">
                            <img src="../../assets/main/pass.png"  />
                            <p class="disable">弃题列表</p>
                        </div>
                        <div class="flex-item right1px"  v-link="{ path: '/break'}">
                            <img src="../../assets/main/break.png"  />
                            <p class="disable">斩题列表</p>
                        </div>
                       
                    </div>
                </section>
            </div>
        </scroller>
    </view-box>
</template>

<script>
import store from '../../store'
import { XHeader,Swiper,SwiperItem,Panel,Scroller,ViewBox} from 'vux'
import { swiper} from '../getters'
import { subject_id,token } from '../../common/getters'
import { getStudentIndex } from '../actions'
import * as _ from '../../config/whole.js'
import {shareReady} from '../../common/h5Plus/share.js';
import './main.less'

export default {
    components: {
        XHeader,Swiper,SwiperItem,Panel,Scroller,ViewBox
    },
    methods: {
        _share(){
            //shareReady()
        },
        _warn(){
            _.toast('敬请期待')
        }
    },
    vuex: {
        getters: {
           swiper,subject_id,token
        },
        actions: {
            getStudentIndex
        }
    },
    store,
    ready(){
        let params = {
            options:{
                subject_id:this.subject_id
            },
            token:localStorage.getItem('token')
        }
        this.getStudentIndex(params);
        if(window.plus) {
            plus.navigator.closeSplashscreen();
        }
    }
}
</script>
<style lang="less" scoped>
.content{
    .flex-wrap{
        width:100%;
        .flex-item{
            background:#fff;
            width:33.3333%;
            box-sizing:border-box;
            float:left;
            img{
                width:2rem;
                height:2rem;
                display:block;
                margin:1rem auto 0.5rem auto;
            }
            p{
                text-align:center;
                font-size:0.8rem;
                margin-bottom:0.5rem;
            }
        }

        .right1px{
            border-right:2px solid #edf2f1;
        }
        .bottom1px{
            border-bottom:2px solid #edf2f1;
        }

    }
}

</style>
