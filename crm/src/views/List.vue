<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #name="{ text, record }">
      <a @click="goDetail(record)">{{ text }}____(点击去详情)</a>
    </template>
    <template #title>客户列表页面</template>
    <template #footer>共3个客户</template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { redirectMainRouter } from "../plugins/utils"
import { data } from "./data"

const columns = [
  {
    title: '客户名称',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: '客户地址',
    dataIndex: 'address',
  },
  {
    title: '已支付金额',
    className: 'column-money',
    dataIndex: 'money',
  },
];


export default defineComponent({
  setup() {

    const goDetail = (item)=> {
      redirectMainRouter(`/crm/detail?id=${item.key}`, {name: 'vite客户详情页'});
    }

    return {
      data,
      columns,
      goDetail
    };
  },
});
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
