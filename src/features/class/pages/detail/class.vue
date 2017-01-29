<template>
  <view-box v-ref:view-box>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">{{className}}
      </x-header>
    </div>
    <div style="padding-top:46px;">
      <div id='wrapperClass' style="padding-bottom:10rem;">
         <div><group>
          <cell title="成员管理" :link="{ path: 'classmate/'+ClassCode}">
            <span>{{classmateCount}}人</span>
          </cell>
          <cell title="编辑班级" :link="{ path: 'update/'+ ClassCode}"></cell>
          <cell title="申请通知" :link="{ path: 'apply/'+ ClassCode}">
             <div v-if="classListState" class="badge-value" slot="value" class="vux-center-v" style="display:inline-block">
              <badge text="新通知"></badge>
            </div>
          </cell>
          <cell title="邀请学生" :link="{ path: 'invite/'+ ClassCode}"></cell>
          <cell title="删除班级" @click="_delete()"></cell>
        </group></div>
      </div>
    </div>
    <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该班级吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  </view-box>
</template>

<script>
import JRoll from 'jroll'
import 'src/common/libs/jroll/jroll-pulldown.js'
import {XHeader,Cell,Group,XButton,ViewBox,XInput,Confirm,Badge} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import * as _ from 'config/whole'

export default {
  components: {XHeader,Cell,Group,ViewBox,XButton,XInput,Confirm,Badge},
  data(){
    return {
      show:false,
    }
  },
  route: {
    data:function(transition){
      (this.classmateReset ? this._getData() : '')
    }
  },
  methods:{
    ...mapActions(['getClassmate','delClass']),
    _delete(){
      this.show = true
    },
    onAction(type) {
      if(type=='确认'){
        this.delClass({
          "classCode":this.ClassCode,
        })
        .then(()=>{
          setTimeout(()=>{
            history.go(-1);
          },500);
        })
      }
    },
    _getData(){
       _.busy();
      this.getClassmate()
      .then(()=>{_.leave();})
      .catch((error)=>{ _.leave();});
    }
  },
  computed:{
    ...mapGetters(['ClassCode','classmate','classmateReset','classListState']),
    className(){
      return this.classmate.name;
    },
    classmateCount(){
      return this.classmate.classmate.list.length;
    }
  },
  ready(){
    let self = this;
    var jroll = new JRoll("#wrapperClass");
    jroll.pulldown({
      refresh: function(complete){
        self.getClassmate()
        .then(()=>{
          complete();
        });
      }
    });
  }
}
</script>

