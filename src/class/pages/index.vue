<template>
<view-box v-ref:view-box class='myClass'>
  <x-header :left-options="{showBack: true}">我的班级<a slot="right" v-link="{ path: '/index/createClass'}">创建班级</a></x-header>
  <group>
    <cell v-for="item in fetchClassList" :title="item.name" v-touch:tap="_detail(item.classCode)">
      <span class="demo-icon" slot="icon"></span>
    </cell>
  </group>

</view-box>
</template>

<script>
import './myClass.less'
import {
  XHeader,
  Cell,
  Group,
  Alert,
  Flexbox,
  FlexboxItem,
  Search,
  ViewBox
}
from 'vux'
import {
  myClassList
} from '../actions'
import {
  fetchClassList
} from '../getters'
import {
  token
} from '../../common/getters.js'
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Alert,
    Flexbox,
    FlexboxItem,
    Search,
    ViewBox
  },
  vuex: {
    getters: {
      fetchClassList,
      token
    },
    actions: {
      myClassList
    }
  },
  methods: {
    _search() {
      this.$router.go('addClass')
    },
    _detail(code) {
      this.$router.go('class/detail/' + code)
    },
    createClass() {
      this.$router.go('createClass')
    }
  },
  ready() {
    console.log(this.token)
    this.myClassList({
      token: this.token
    })
  }
}
</script>
