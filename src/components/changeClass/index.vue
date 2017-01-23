<template >
  <div class="header_title_select">
    <select dir="rtl" v-model="value" :classList="classList" >
      <template v-for="item in classList">
        <option v-bind:value="item.classCode">{{item.name}}</option>
      </template>
    </select>
    <span class="header_title_select_arrow"></span>
  </div>
</template>

<script>
import './index.less'

export default  {
  props: ['value','classList']
}
</script>