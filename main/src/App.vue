
<template>
  <div id="app">
    <!--
    <layout v-if="invalidRoute">404</layout>
     <router-view v-else></router-view>
    -->
    <router-view></router-view>
  </div>
</template>
<script>
import layout from "./views/Layout.vue";

export default {
  name: "App",
  components: { layout },
  computed: {
    invalidRoute() {
      return !this.$route.matched || this.$route.matched.length === 0;
    },
  },
};
</script>