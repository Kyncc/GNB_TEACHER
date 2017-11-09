<template>
  <view-box ref="myClass" body-padding-top="100px" >
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: ClassMyClassmate.classname ? ClassMyClassmate.classname : '',showBack: true}">
        <div slot="right" >
          <i class="icon iconfont icon-6" style="padding:8px;font-size:28px;top:2px;right:-15px;" @click='visible = true'></i>
          <div class="gnb-changeClass">
            <mt-popup v-model="visible" popup-transition="popup-fade" class="gnb-changeClass-popup">
              <p @click="_toUpdateName()">修改班级</p>
              <p @click="_toUpdateStudent()">删除学生</p>
              <p @click="_delClass()">删除班级</p>
            </mt-popup>
          </div>
        </div>
      </x-header>
      <flexbox style='padding:.4rem;background:#fff;'>
        <flexbox-item :span="8" style="font-size:.7rem">我的班级码: <b></b>{{ClassMyClassmate.classcode}}</flexbox-item>
        <flexbox-item :span="4" style="color:#4bb7aa;">
          <x-button type="primary" @click.native='_invite(ClassMyClassmate.classcode)' plain mini>邀请学生</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <template v-if="!loading">
      <group title="学生列表">
        <cell v-for="(student, index) in ClassMyClassmate.classmates" :key='index'>
          <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="student.headImg">
          <div slot="after-title">{{student.name}}</div>
        </cell>
      </group>
    </template>
    <div style="text-align:center">
      <spinner v-if="loading" type="lines"></spinner>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>

<script>
import { Popup } from 'mint-ui'
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'
import share from '@/components/share'

export default {
  name: 'classmate',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem, Flexbox, FlexboxItem, share, 'mt-popup': Popup
  },
  computed: {
    ...mapGetters(['ClassMyClassmate'])
  },
  data () {
    return {
      visible: false,
      showAction: false,
      loading: true,
      share: {
        content: '归纳本辅导更轻松，提分更明显',
        title: '加入我的班级',
        href: ``
      }
    }
  },
  methods: {
    ...mapActions(['getMyClassmateList', 'myClassmateClear', 'delClass', 'getUserInfo']),
    // 去班级编辑
    _toUpdateName () {
      this.visible = false
      this.$router.push({name: 'class_update_name', params: {'code': this.ClassMyClassmate.classcode, 'name': this.ClassMyClassmate.classname}})
    },
    // 学生编辑
    _toUpdateStudent () {
      this.visible = false
      this.$router.push({name: 'class_classmate_update', params: {'code': this.ClassMyClassmate.classcode, 'name': this.ClassMyClassmate.classname}})
    },
    // 删除班级
    _delClass () {
      this.visible = false
      let _this = this
      this.$vux.confirm.show({
        title: `是否删除${_this.ClassMyClassmate.classname}?`,
        dialogTransition: 'vux-fade',
        onConfirm () {
          /**
           * TODO 删除班级后，重新拉取个人信息后,在返回个人列表
           */
          return (async () => {
            await _this.delClass()
            await _this.getUserInfo()
            history.go(-1)
          })()
        }
      })
    },
    _getData () {
      this.loading = true
      this.getMyClassmateList().then(() => {
        this.loading = false
      }).catch((e) => {
        this.loading = false
      })
    },
    _invite (code) {
      this.share.href = `http://share.guinaben.com/#/class?code=${code}`
      this.showAction = true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loading = true
      vm.myClassmateClear()
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else if (this.visible) {
      this.visible = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped>
.gnb-changeClass{
  margin-right:8px;
  .gnb-changeClass-popup{
      background: #fff;
      width: 5em;
      border-radius: 8px;
      padding:.5rem ;
      top:2.3rem;
      left:86%;
      -webkit-transform: translate(-50%, 0);
      p{
        font-size:.8rem;text-align: center;line-height:1.8rem; color:#555;width: 4rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .active{
          background: #ccc;
      }
  }
  .gnb-changeClass-popup:before {
      display: inline-block;
      width: 0;
      height: 0;
      border: solid transparent;
      border-width:.5rem;
      border-bottom-color: #fff;
      content: '';
      position: absolute;
      top: -.9rem;
      right: 1rem;
  }
}
</style>
