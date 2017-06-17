<template>
  
</template>
<script>
import {XHeader, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'gaokao',
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
