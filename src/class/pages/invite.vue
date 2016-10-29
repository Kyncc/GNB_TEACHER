<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">邀请学生</x-header>
        <section class="copyCode">
            <h3>我的邀请码</h3>
            <b >{{id}}</b>
        </section>
        <div class="button">
            <x-button type="primary" v-touch:tap="_cppyCode(id)">复制邀请码</x-button>
        </div>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,XButton,Cell,Group,ViewBox} from 'vux'
import {id} from '../../common/getters.js'
import * as _ from '../../config/whole.js'

export default {
    components: {XHeader,XButton,Cell,Group,ViewBox},
    vuex: {
        getters: {
            id
        }
    },
    methods: {
        _cppyCode(id) {
            var Context = plus.android.importClass("android.content.Context")
            var main = plus.android.runtimeMainActivity()
            var clip = main.getSystemService(Context.CLIPBOARD_SERVICE)
            plus.android.invoke(clip,"setText",id)
            _.toast('复制成功')
        }
    }
}
</script>
<style lang="less" scoped>
.step {
    margin-bottom: 65/40em;
    article {
        width: 590/40em;
        background: #ffffff;
        border-radius: 5px;
        padding: 0.5em 0.75em 0.75em;
        margin: 0.5em auto;
    }
    h3 {
        font-size: 30/40em;
        color: #229bf5;
        padding: 0 0 0.5em;
    }
    p {
        font-size: 30/40em;
        color: #000;
        line-height: 1.8em;
    }
}
.copyCode {
    width: 590/40em;
    height: 120/40em;
    background: #ffffff;
    border-radius: 5px;
    margin: 65/40em auto;
    border: 2px dashed #959595;
    text-align: center;
    padding: 0.75em 0 1em;
    h3{font-size:30/40em;color:#229bf5;padding:0 0 .5em;}
	p{font-size:30/40em;color:#000;line-height:1.8em;}
}

.button {
    width: 560/40em;
    margin: 0 auto;
    padding-bottom: 42px;
}
</style>
