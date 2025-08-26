<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import Taro from "@tarojs/taro";
import DocItem from "./item.vue";
import { queryProcessTaskList } from "../../../api/purchasebacklog";

export interface Props {
  status?: string;
  /** 筛选条件 */
  condition: any;
}

const props = withDefaults(defineProps<Props>(), {
  status: "",
  condition: () => ({}),
});

const page = ref(1);
const size = 10;
/** 查询结果数据 */
const tableData = ref([]);
/** 已经加载全部 */
const alreadyOver = ref(false);
const refreshTriggerd = ref(false);

const handleQuery = async () => {
  if (alreadyOver.value) return;
  const res = await queryProcessTaskList(
    {
      ...props.condition,
      taskStatus: props.status,
      currentPage: page.value - 1,
      pageSize: size,
    },
    { page: page.value - 1, size: size }
  );
  if (res?.data?.result) {
    if (page.value === res.data.pages) {
      alreadyOver.value = true;
    }
    if (page.value === 1) {
      tableData.value = res?.data?.result || [];
    } else {
      tableData.value = [...tableData.value, ...res?.data?.result];
    }
  }
  refreshTriggerd.value = false;
};

const goDetail = (data) => {
  Taro.navigateTo({
    url: `/purchasebacklog/pages/list/detail?taskId=${data.taskId}&type=${props.status}`,
  });
};

const reachBottom = () => {
  if (!alreadyOver.value) {
    page.value++;
    handleQuery();
  }
};

const refresh = () => {
  refreshTriggerd.value = true;
  page.value = 1;
  alreadyOver.value = false;
  handleQuery();
};

onBeforeMount(() => {
  // handleQuery()
});

defineExpose({
  getList: () => {
    page.value = 1;
    alreadyOver.value = false;
    handleQuery();
  },
});
</script>
<template>
  <scroll-view
    @scrolltolower="reachBottom"
    :scroll-y="true"
    class="inDoclist"
    :enhanced="true"
    :show-scrollbar="false"
    :enable-back-to-top="true"
    :refresher-enabled="true"
    :refresher-triggered="refreshTriggerd"
    @refresherrefresh="refresh"
  >
    <doc-item
      v-for="item in tableData"
      :key="item.id"
      :data="item"
      :status="props.status"
      @click="goDetail(item)"
    />
    <nut-empty description="暂无数据" v-if="tableData?.length === 0">
      <template #image>
        <image src="../../../assets/images/empty.png" />
      </template>
    </nut-empty>
    <div v-if="tableData?.length > 0 && alreadyOver" class="alreadyover">
      没有更多数据了
    </div>
  </scroll-view>
</template>
<style lang="scss">
.inDoclist {
  height: 75vh;
  .alreadyover {
    color: #cbcbcb;
    font-size: 24px;
    text-align: center;
  }
}
</style>
