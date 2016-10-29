<template>
    <view-box v-ref:view-box class="errorIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">错题归纳</x-header>
            <div style="background:#edf2f1;width:100%">
                <div style="padding:10px 0;width:75%;margin:0 auto;" class="vux-center">
                    <button-tab style="width:100%;">
                        <button-tab-item v-touch:tap="_time('week')" selected>一周内</button-tab-item>
                        <button-tab-item v-touch:tap="_time('month')">一月内</button-tab-item>
                        <button-tab-item v-touch:tap="_time('all')">全部</button-tab-item>
                    </button-tab>
                </div>
            </div>
        </div>
        <div id="scroll" style="padding-top:98px">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in errorIndexList">
                <div class="weui_panel_hd">
                    <x-button type='primary' mini>参考例题</x-button>
                    {{{item.knowledge}}}
                </div>
                <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg"  v-touch:tap="_into(item.knowledgeId)">
                        <div class="weui_media_bd">
                            <p class="weui_media_desc">
                                {{{item.content}}}
                            </p>
                        </div>
                    </a>
                    <div class="weui_panel_ft">
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">难度：{{item.difficult}}</flexbox-item>
                            <flexbox-item :span="1/4"></flexbox-item>
                            <flexbox-item :span="1/4" style="text-align:right"> 错误{{item.errorCount}}次</flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </div>

            <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">还没有归纳错题~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
            </infinite-loading>
        </div>
    </view-box>
</template>

<script>
import {XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {period_id,subject_id,token,id} from '../../common/getters'
import {errorIndexIds,errorIndexList,errorIndexTotalPage,fetchCurrentPage} from '../getters'
import {getErrorIds,getErrorList,setKnowledgeId,clearList,setCurrentPage} from '../actions'
import moment from 'moment'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
    },
    vuex: {
        getters: {
            period_id,subject_id,token,errorIndexIds,errorIndexList,errorIndexTotalPage,id,fetchCurrentPage
        },
        actions: {
            getErrorIds,getErrorList,setKnowledgeId,clearList,setCurrentPage
        }
    },
    methods: {
        _into(knowledgeId){
            this.setKnowledgeId(knowledgeId)
            this.$router.go('/index/check/detail/errorDetail/'+ this.id)
        },
        _time(value) {
            if (value == 'week') {
                this.endTime= moment().unix()
                this.startTime = moment().add(-7, 'd').unix()
            } else if (value == 'month') {
                this.endTime = moment().unix()
                this.startTime = moment().add(-1, 'M').unix()
            } else {
                this.endTime = moment().unix()
                this.startTime = moment().add(-3, 'M').unix()
            }
            this.clearList()
            this.setCurrentPage(1)
            this.$nextTick(() => {
                this.$broadcast('$InfiniteLoading:reset')
            })
        },
        _onInfinite(){
            this.getErrorIds({
                studentId: this.id,
                currentPage:this.fetchCurrentPage,
                between:{
                    start:this.startTime,
                    end:this.endTime
                },
                token: this.token,
                options: {
                    period_id: this.period_id,
                    subject_id: this.subject_id
                }
            },()=>{
                this.getErrorList({
                    options: {
                        ids: this.errorIndexIds,
                        period_id: this.period_id,
                        subject_id: this.subject_id
                    },
                    token: this.token,
                    studentId: this.id
                },()=>{
                    setTimeout(()=>{
                        this.$broadcast('$InfiniteLoading:loaded')
                        if(parseInt(this.errorIndexTotalPage) <= parseInt(this.fetchCurrentPage)){
                            this.$broadcast('$InfiniteLoading:complete')
                            return
                        }
                        this.setCurrentPage(parseInt(this.fetchCurrentPage) + 1)
                    },1000)
                })
            })
        }
    },
    data(){
        return{
            endTime:moment().unix(),
            startTime:moment().add(-7, 'd').unix()
        }
    }
}
</script>
