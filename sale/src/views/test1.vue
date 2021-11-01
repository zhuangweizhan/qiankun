<template>
  <div>
    <div>
      <div>在sale应用<b>test1</b>页面，当前框架是<b>vue2</b></div>
      <div>首次访问时间：{{ firstDate }}</div>
      <div>重新访问时间：{{ newDate }}</div>
    </div>

    <button  @click="click">点击改变全局信息为:{{message}}</button>

    <div>当前项目缓存的keep-active: {{ getCacheTabs }}</div>
    <div>主项目通过过来的tabs: {{ getParentTabItem }}</div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "test1",
  computed: {
    ...mapGetters(["getParentTabItem", "getCacheTabs"]),
  },
  data() {
    return {
      firstDate: "",
      newDate: "",
      message: "我是sale,test1"
    };
  },
  created() {
    const date = new Date().toLocaleString();
    this.firstDate = date;
    this.newDate = date;
  },
  activated() {
    this.newDate = new Date().toLocaleString();
  },
  methods:{
    click(){
      this.$store.dispatch('global/setGlobalState', {message: this.message});
    }
  }
};
</script>