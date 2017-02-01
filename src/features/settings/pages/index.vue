<template>
<div class='settings'>
  <x-header :left-options="{showBack: true}">设置</x-header>
  <group>
    <cell title="应用评价" link="javascript:;" @click="_openStore">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="意见反馈" link="advice">
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="退出登录" @click="_quitlogin">
      <span class="demo-icon" slot="icon"></span>
    </cell>
     <cell title="清除缓存" @click="_clear" >
      <span class="demo-icon" slot="icon"></span>
    </cell>
    <cell title="检查更新" :value="'当前版本号:V'+ version" v-show="(System == 'IOS'? false:true)"  @click="_update">
      <span class="demo-icon" slot="icon"></span>
    </cell>
  </group>
  <alert :show.sync="show" title="清除缓存成功"></alert>
  <confirm :show.sync="confirm" confirm-text="确定" cancel-text="取消" title="发现新版本是否更新" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  <confirm :show.sync="quit" confirm-text="确定" cancel-text="取消" title="是否退出登录" @on-confirm="_quit('确认')" @on-cancel="_quit('取消')"></confirm>
</div>
</template>

<script>
import {  XHeader,  Cell,  Group,  Alert,  Confirm} from 'vux'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    XHeader,Cell,Group,Alert,Confirm
  },
  data() {
    return {
      version: '2.0.0',
      show: false,
      confirm: false,
      quit:false
    }
  },
  methods: {
    ...mapActions(['updateVersion','clearUser']),
    _clear() {
      this.show = true
    },
    _quitlogin(){
        this.quit = true
    },
    _quit(type) {
        if(type=='确认'){
            localStorage.removeItem('token');
            this.clearUser();
            this.$router.replace('/');
        }
    },
    onAction(type) {
      if(this.System == 'IOS' && type == '确认'){
        window.location.href = "itms-apps://itunes.apple.com/gb/app/yi-dong-cai-bian/id391945719?mt=8";
        return;
      }
      if (type == '确认') {
        let start = true;
        let dtask = plus.downloader.createDownload("http://www.chinasanbao.com/app/com.sanbao.guinaben.teacher.apk", {}, (d, status)=> {
          if (status == 200) {
            console.log('下载完成：' + d.filename);
            plus.ui.toast('下载完成：' + d.filename);
            void plus.runtime.install('_downloads/com.sanbao.guinaben.teacher.apk');
          } else {
            console.log('下载失败：' + status);
            plus.ui.toast('下载失败：' + status);
          }
        });
        if (start) {
          if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_WIFI) {
            console.log("开始下载");
            plus.ui.toast('开始下载');
            dtask.start();
            start = false;
          } else {
            plus.ui.toast('非WIFI环境无法下载');
          }
        } else {
          console.log("任务已经开始下载");
          plus.ui.toast('任务已经开始下载');
        }
      }
    },
    _update() {
        this.updateVersion().
        then(()=>{
            // if (this.fetchVersion.currentVersion != this.version) {
            //   this.confirm = true
            // }
        })
    },
    _openQQ() {
      window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
    _openStore() {
      if(this.System == 'IOS' ){
         window.location.href = "itms-apps://itunes.apple.com/gb/app/yi-dong-cai-bian/id391945719?mt=8"; 
         return; 
      }
      window.location.href = "market://details?id=com.sanbao.guinaben.teacher";
    }
  },
  computed:{
    ...mapGetters(['versionCurrent','System'])
	}
}
</script>