<template>
  <div>
    <a-descriptions :title="detail.name" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item label="已支付金额">{{ detail.money }}</a-descriptions-item>
      <a-descriptions-item label="客户地址">{{ detail.address }}</a-descriptions-item>
      <a-descriptions-item label="性别">男</a-descriptions-item>
      <a-descriptions-item label="备注">
        跳转详情成功！
        <br />
      </a-descriptions-item>
    </a-descriptions>

    <a-list class="comment-list" :header="`网友评价`" item-layout="horizontal" :data-source="commont">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.author" :avatar="item.avatar">
            <template #actions>
              <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
            </template>
            <template #content>
              <p>
                {{ item.content }}
              </p>
            </template>
            <template #datetime>
              <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ item.datetime.fromNow() }}</span>
              </a-tooltip>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { data } from './data';
import { useRoute } from 'vue-router';
import moment from 'moment';

export default defineComponent({
  setup(props) {
    const route = useRoute();

    const { id } = route.query;
    const filterList = data.filter(item => {
      return item.key == id;
    });
    const detail = filterList.length > 0 ? filterList[0] : {};
    const commont = [
      {
        actions: ['查看详情'],
        author: '法外狂徒',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '他年轻时没得选，他只想做一个好人。',
        datetime: moment().subtract(1, 'days'),
      },
      {
        actions: ['查看详情'],
        author: '德玛西亚',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '德玛西亚万岁！',
        datetime: moment().subtract(2, 'days'),
      },
    ];
    return {
      id,
      detail,
      commont,
      moment,
    };
  },
});
</script>

<style scoped>
.comment-list{
  margin-top: 10px;
}
</style>