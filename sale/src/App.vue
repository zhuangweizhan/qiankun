
<template>
  <div id="app">
    成功的456456456
    <router-view v-slot="{ Component }">
      <keep-alive :include="getCacheTabs">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["getCacheTabs"]),
  },
};
</script>