<template>
    <view-box v-ref:view-box class='classInvite'>
        <x-header :left-options="{showBack: true}">邀请学生</x-header>
        <section class="copyCode">
            <h3>我的邀请码</h3>
            <b >{{ClassCode}}</b>
        </section>
        <div class="button">
            <x-button type="primary" @click="_cppyCode()">复制邀请码</x-button>
        </div>
    </view-box>
</template>

<script>
import {XHeader,XButton,Cell,Group,ViewBox} from 'vux'
import * as _ from 'config/whole.js'
import { mapActions,mapGetters } from 'vuex'

export default {
    components: {XHeader,XButton,Cell,Group,ViewBox},
    methods: {
        _cppyCode() {
            var Context = plus.android.importClass("android.content.Context")
            var main = plus.android.runtimeMainActivity()
            var clip = main.getSystemService(Context.CLIPBOARD_SERVICE)
            plus.android.invoke(clip,"setText",this.ClassCode)
            _.toast('复制成功')
        }
    },
    computed: {
       ...mapGetters(['ClassCode'])
    }
}
</script>

