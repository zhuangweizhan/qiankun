<template>
  <div>
    <div style="background: #ececec; padding: 30px">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card>
            <a-statistic title="首次访问时间" :value="firstDate" :precision="2" :value-style="{ color: '#3f8600' }" style="margin-right: 50px"></a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic title="重新访问时间" :value="newDate" :precision="2" class="demo-class" :value-style="{ color: '#cf1322' }"></a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-result title="欢迎你">
      <template #icon>
        <a-icon type="smile" theme="twoTone" />
      </template>
      <template #extra>
        <a-button type="primary">欢迎</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'mainIndex',
  data() {
    return {
      firstDate: '',
      newDate: '',
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
