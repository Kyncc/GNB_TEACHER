<template >
  <div class="header_title_select select-class">
    <p>{{name}}<span class="header_title_select_arrow"></span></p>
    <select dir="rtl" v-model="value" :classList="classList">
      <template v-for="item in classList">
        <option v-bind:value="item.classCode">{{item.name}}</option>
      </template>
    </select>
  </div>
</template>

<script>
import './index.less'

export default  {
  props: ['value','classList'],
  data(){
    return {
      name:this.classList[0].name
    }
  },
  watch:{
    value(){
      let value = this.value;
      this.classList.forEach((arr)=>{  
        if(arr.classCode == value){
          this.name = arr.name;
          return ;
        }
      })  
    }
  }
}
</script>