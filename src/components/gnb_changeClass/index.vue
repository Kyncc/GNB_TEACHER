<template>
  <div class="gnb-changeClass">
    <p @click='onDisplay()'>{{selected.className}}<span class="with_arrow"></span></p>
    <mt-popup v-model="visible" popup-transition="popup-fade" class="gnb-changeClass-popup">
      <template v-for="item in classList">
        <p @click="onClickBack(item)" :class="item.classCode  === selected.classCode ? 'active' : ''">{{item.className}}</p>
      </template>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui'
import './index.less'

export default {
  components: {
    'mt-popup': Popup
  },
  props: {
    classList: {
      type: Array
    }
  },
  data () {
    return {
      visible: false,
      selected: []
    }
  },
  methods: {
    onDisplay () {
      this.visible = true
    },
    // 点击科目提交的回调
    onClickBack (item) {
      if (this.selected.classCode !== item.classCode) {
        this.selected = item
        this.$emit('update:change', item)
      }
      this.visible = false
    }
  },
  created () {
    this.selected = this.classList[0]
    this.$emit('update:change', this.selected)
  }
}
</script>
