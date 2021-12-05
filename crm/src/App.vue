<template>
  <div class="app">
    <a-config-provider :locale="locale" prefix-cls="ant2" v-if="token">
      <suspense>
        <router-view v-slot="{ Component }">
          <keep-alive :include="cacheTabs">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </suspense>
    </a-config-provider>
    <div v-if="!token" style="text-align: center; margin-top: 200px">暂未登录，请登录</div>
  </div>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const locale = zhCN;
    const cacheTabs = computed(() => store.getters['cacheTabs']);
    const token = computed(() => store.getters['token']);

    moment.locale('zh-cn');
    const store = useStore();
    return {
      cacheTabs,
      locale,
      token
    };
  },
});
</script>

<style lang="scss">
.app {
  background-color: #fff;
  min-height: 100%;
  padding: 15px;
  position: relative;
}
</style>
