
<template>
  <div id="app">
    <keep-alive :include="getCacheTabs">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  created() {
    console.log(`created==========`);
  },
  computed: {
    ...mapGetters(["getCacheTabs"]),
  },
  
};
</script>