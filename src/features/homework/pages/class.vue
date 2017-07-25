<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '布置给',showBack: true}">
      <div slot="right" style="margin:0" @click="_commit">
       发布
      </div>
    </x-header>
    <div>
      <checklist title="请选择下列班级" label-position="right" required :options="classList" v-model="classes"></checklist>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox, Checklist} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'class',
  components: {
    XHeader, Cell, Group, ViewBox, Checklist
  },
  computed: {
    ...mapGetters(['User']),
    classList () {
      let list = []
      for (let i in this.User.classes) {
        list.push({key: this.User.classes[i].classCode, value: this.User.classes[i].name})
      }
      return list
    }
  },
  data () {
    return {
      classes: []
    }
  },
  methods: {
    ...mapActions(['setHomeworkClass']),
    _commit () {
      this.setHomeworkClass({'classes': this.classes})
      this.classes = []
      setTimeout(() => {
        history.go(-1)
      }, 500)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  },
  beforeRouteLeave (to, from, next) {
    if (this.classes.length) {
      this.$vux.confirm.show({
        title: '确定放弃选择班级么？',
        dialogTransition: '',
        onCancel () {
          next(false)
        },
        onConfirm () {
          next()
        }
      })
    } else {
      next()
    }
  }
}
</script>
