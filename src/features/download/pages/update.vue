<template>
  <view-box ref="downloadUpdate" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '编辑'}">
      <div slot="right" @click='update()'>完成</div>
    </x-header>
    <div>
      <div v-for="(list, pindex) in block" :key="pindex">
        <div class="weui-cells__title">{{list.name}}</div>
        <card v-for="(item, index) in list.list" :key="index">
          <div slot="content">
            <div v-html="item.stem"></div>
            <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
              {{ key }}： 
              <p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
          <div slot="footer">
            <div class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">
                <flexbox>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperUp({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-up"></i>上移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperDown({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-down"></i>下移
                  </flexbox-item>
                  <flexbox-item :span="4" class='center' @click.native='setMyDownloadPaperDel({pindex:pindex, index:index})'>
                    <i class="icon iconfont icon-lajitong16"></i>删除
                  </flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Card, Flexbox, FlexboxItem, Group} from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Card, Flexbox, FlexboxItem, Group
  },
  computed: {
    ...mapGetters(['DownloadPaper']),
    block () {
      return this.DownloadPaper.list.block
    }
  },
  methods: {
    ...mapActions(['getDownloadUpdate', 'setMyDownloadPaperUp', 'setMyDownloadPaperDown', 'setMyDownloadPaperDel']),
    update () {
      this.getDownloadUpdate().then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.center{
  text-align: center;
}
</style>
