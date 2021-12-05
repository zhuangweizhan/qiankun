<template>
<div>
  <a-tabs v-model="tabActive" type="editable-card" @change="onChange" @edit="onDel">
    <a-tab-pane
      v-for="(item, index) in tabList"
      :key="index"
      :tab="item.name"
      :closable="true"
    >
    </a-tab-pane>
  </a-tabs>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import qiankun from "../views/qiankun.js";

export default {
  mixins: [qiankun],
  data(){
    return{
      tabActive: Number(this.$store.getters.getActiveTabs )
    }
  },
  computed: {
    tabList(){
      return this.$store.getters.getTabItems;
    },
    // tabActive(){
    //   return this.$store.getters.getActiveTabs;
    // }
  },
  watch:{
    '$store.getters.getActiveTabs': function(val){
       this.tabActive = val;
    }
  },
  methods: {
    onDel(targetKey, action) {
      this.$store.dispatch("delTabs", targetKey);
    },
    onChange(targetKey, action) {
      this.tabActive = targetKey;
      console.log(`this.tabList===`, this.tabList);
      console.log(`this.tabList[targetKey].path===`, this.tabList[targetKey].path);
      this.$router.push({ path: this.tabList[targetKey].path });
      this.$store.commit("setActiveTabs", targetKey); 
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
  },
};
</script>
