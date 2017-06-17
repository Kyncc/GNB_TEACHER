<template>
  
</template>
<script>
import {XHeader, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'sync',
  components: {
    XHeader, ViewBox
  },
  computed: {
    ...mapGetters(['Route'])
  },
  methods: {
  }
}
</script>
