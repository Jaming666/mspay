<script setup>
import Taro, { useDidShow } from "@tarojs/taro";
import { ref } from "vue";
import { useOrderStore } from "../../../stores/order";
import { getDetailsByOrder } from "../../../api/navigateToout";
import wuLiao from "../../../components/WuLiao/index.vue";
import WuLiaoManage from "src/components/WuLiaoManageout/index.vue";

const orderStore = useOrderStore();
const wuLiaoList = ref([]);

const initView = async () => {
  const orderInfo = orderStore.orderInfo;
  const { associatedOrders, shipmentOrderType, orderNo } = orderInfo;
  //  不关联订单 或者 没有订单号的 往下走
  if (!associatedOrders || !orderNo) return;

  // 查询订单下的物料
  const res = await getDetailsByOrder(
    {
      orderNo: orderNo,
      shipmentOrderType: shipmentOrderType,
      showTips: false,
    },
    {
      page: 0,
      size: 10,
    }
  );
  if (res?.content) {
    wuLiaoList.value = res.content || [];
  } else {
  }
};

const submit = (data) => {
  orderStore.setOrderInfo({
    ...data,
    warehouseId: orderStore.orderInfo.warehousesId,
  });
  Taro.redirectTo({
    url: "../calcPrice/index",
  });
};
useDidShow(() => {
  initView();
});
</script>
<template>
  <div class="wuliao-wrapper">
    <wu-liao
      v-for="wuliao in wuLiaoList"
      :key="wuliao.itemId"
      :data="wuliao"
      :pageType="'out'"
    ></wu-liao>
    <WuLiaoManage v-if="wuLiaoList.length === 0" :btnType="'out'" />
  </div>
</template>
<style lang="scss"></style>
