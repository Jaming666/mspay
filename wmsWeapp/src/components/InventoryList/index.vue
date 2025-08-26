<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import Taro from "@tarojs/taro";
import DocItem from "./item.vue";
import { getList } from "../../api/inventory";
import { useOrderStore } from "src/stores/order";

export interface Props {
  /** 入库单状态 1-待审核 */
  status?: string;
  /** 筛选条件 */
  condition: any;
}

const props = withDefaults(defineProps<Props>(), {
  status: "",
  condition: () => ({}),
});

const useStore = useOrderStore();
const refreshTriggerd = ref(false);
const page = ref(1);
const size = 10;
/** 查询结果数据 */
const tableData = ref([]);
/** 已经加载全部 */
const alreadyOver = ref(false);

const handleQuery = async () => {
  if (alreadyOver.value) return;

  const res = await getList({
    ...props.condition,
    inventoryTabType: props.status,
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
  useStore.setTableItemData(data);
  let url = "/inventory/pages/baseInfo/index";
  // if (['13', '15'].includes(data.inventoryCheckStatus)) {
  //   url = '/inventory/pages/baseInfo/create'
  // }
  Taro.navigateTo({
    url: `${url}?id=${data.id}&orderNo=${data.inventoryCheckNo}&status=${data.inventoryCheckStatus}&type=INVENTORY_CHECK_APPLY`,
  });
};

const reachBottom = () => {
  page.value++;
  handleQuery();
};

onBeforeMount(() => {
  // handleQuery()
});
const refresh = () => {
  refreshTriggerd.value = true;
  page.value = 1;
  alreadyOver.value = false;
  handleQuery();
};

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
    :scroll-y="true"
    class="inDoclist"
    :enhanced="true"
    :show-scrollbar="false"
    :enable-back-to-top="true"
    :refresher-enabled="true"
    :refresher-triggered="refreshTriggerd"
    @refresherrefresh="refresh"
    @scrolltolower="reachBottom"
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
