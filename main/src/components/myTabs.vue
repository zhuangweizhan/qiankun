<template>
  <a-tabs v-model="getActiveTabs" type="editable-card" @change="onChange" @edit="onDel">
    <a-tab-pane
      v-for="(item, index) in getTabItems"
      :key="index"
      :tab="item.name"
      :closable="true"
    >
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTabItems", "getActiveTabs"]),
  },
  methods: {
    onDel(targetKey, action) {
      this.$store.dispatch("clearTabs", targetKey); // 刷新待办消息
    },
    onChange(targetKey, action) {
      this.$store.commit("setActiveTabs", targetKey); // 刷新待办消息
    },
  },
};
</script>
