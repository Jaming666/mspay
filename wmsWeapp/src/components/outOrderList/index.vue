<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import Taro from "@tarojs/taro";
import DocItem from "./outOrderItem.vue";
import { getList } from "../../api/out";

export interface Props {
  /** 出库单状态 1-待审核 */
  status?: string;
  /** 筛选条件 */
  condition: any;
  /** 领料和出库区分 */
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  status: "",
  condition: () => ({}),
});

const page = ref(0);
const size = 10;
/** 查询结果数据 */
const tableData = ref([]);
/** 已经加载全部 */
const alreadyOver = ref(false);
const refreshTriggerd = ref(false);

const handleQuery = async () => {
  if (alreadyOver.value) return;

  const res = await getList({
    ...props.condition,
    shipmentOrderStatus: props.status,
    currentPage: page.value,
  });
  if (res?.result) {
    if (page.value === res.pages) {
      alreadyOver.value = true;
    }
    if (page.value === 1) {
      tableData.value = res.result;
    } else {
      tableData.value = [...tableData.value, ...res.result];
    }
  }
  refreshTriggerd.value = false;
};

const goDetail = (data) => {
  if (props.type == "out") {
    Taro.navigateTo({
      url: `/out/pages/baseInfo/index1?id=${data.id}&type=${data.shipmentOrderType}&orderNo=${data.shipmentOrderNo}&status=${data.shipmentOrderStatus}&name=${data.createByName}&time=${data.createTime}`,
    });
  } else {
    Taro.navigateTo({
      url: `/out/pages/baseInfo/index?id=${data.id}&type=${data.shipmentOrderType}&orderNo=${data.shipmentOrderNo}&status=${data.shipmentOrderStatus}&name=${data.createByName}&time=${data.createTime}`,
    });
  }
};

const reachBottom = () => {
  page.value++;
  handleQuery();
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
      :key="item.receiptOrderNo"
      :data="item"
      @click="goDetail(item)"
    />

    <nut-empty description="暂无单据" v-if="tableData?.length === 0">
      <template #image>
        <image src="../../assets/images/empty.png" />
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
