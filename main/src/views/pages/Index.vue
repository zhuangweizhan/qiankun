<template>
  <div>
    <div>在主应用，当前框架是vue2</div>
    <div>首次访问时间：{{ firstDate }}</div>
    <div>重新访问时间：{{ newDate }}</div>
  </div>
</template>

<script>
export default {
  name: "mainIndex",
  data() {
    return {
      firstDate: "",
      newDate: "",
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
};
</script>