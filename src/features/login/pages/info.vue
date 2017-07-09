<template >
  <view-box class="registerInfo">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
      <x-header :left-options="{showBack: false}">资料填写</x-header>
    </div>
    <div style="padding-top:46px">
      <div class="icon">
        <img src="../assets/icon.png">
      </div>
      <div class="title">
        <img src="../assets/title.png">
      </div>
      <group title="基本资料">
        <x-input title="姓名" v-model="name" class="input_right"></x-input>
        <x-input title="学校" v-model="school" class="input_right"></x-input>
        <selector v-model="subjectId" title="主教科目" :options="subjectList"></selector>
      </group>
      <div style="width:90%;margin:1.5rem auto">
        <x-button type="primary" @click.native="_complete" :disabled="disable">完成</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, XButton, XInput, Group, Cell, Selector } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    XHeader, ViewBox, XButton, XInput, Group, Cell, Selector
  },
  methods: {
    ...mapActions(['setUserInfo']),
    _onChangeMath (item) {
      this.math = item
    },
    _onChangePhysisc (item) {
      this.physics = item
    },
    _complete () {
      this.setUserInfo({
        name: this.username,
        school: this.school,
        mobile: this.registerMobile,
        subjectId: this.subjectId
      }).then(() => {
        this.$router.replace('/')
      })
    }
  },
  data () {
    return {
      username: '',
      school: '',
      subjectId: '2',
      subjectList: [{key: '2', value: '数学'}, {key: '7', value: '物理'}]
    }
  },
  computed: {
    ...mapGetters(['registerMobile', 'User']),
    disable () {
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.input_right .weui-input{
  text-align:right;
}
</style>
