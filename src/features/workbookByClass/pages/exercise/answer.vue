<template>
  <div>
      <p>asdasdasdasasd
      </p>
  </div>

</template>

<script>
  import {Group} from 'vux'
  import { mapActions,mapGetters} from 'vuex'

  export default {
    components:{
      Group
    },
    methods:{
      
    },
    computed:{
      ...mapGetters(['path','Params'])
    }
  }
</script>
