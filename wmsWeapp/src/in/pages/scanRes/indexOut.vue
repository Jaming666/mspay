<script setup>
import { ref, onMounted } from "vue";
import { getCurrentInstance } from "@tarojs/taro";
import { useOrderStore } from "../../../stores/order";
import { scanItemQrCode } from "src/api/in";
import { scanItemQrCodeOut, scanItemQrCodeOutNew } from "src/api/out";
import WuLiao from "../../../components/WuLiao/indexOut.vue";

const orderStore = useOrderStore();
const currentPage = getCurrentInstance().router.params;

/** 扫描出的物料信息 */
const wuLiaoInfo = ref({});
/** 当前选中的子组件索引 */
const selectedIndex = ref(null);
const oughtOut = ref(0);
const practicalOut = ref(0);
const scanCode = async () => {
  if (!currentPage?.itemno) return;

  const {
    /** 入库类型 */
    receiptOrderType,
  } = orderStore.orderInfo;

  const params = {
    itemno: currentPage.itemno,
    // orderNo: orderStore.orderInfo.orderNo,
    // receiptOrderType: orderStore.orderInfo.receiptOrderType,
    showTips: false,
  };

  // 是入库 并且 不是 [退库入库 、 盘盈入库]&&
  // !['RETURN_WAREHOUSING', 'INVENTORY_WAREHOUSING'].includes(receiptOrderType)

  if (currentPage.type === "in") {
    if (orderStore.orderInfo.associatedOrders) {
      params.orderNo = orderStore.orderInfo.orderNo;
      params.receiptOrderType = orderStore.orderInfo.receiptOrderType;
    }
    const res = await scanItemQrCode(params);
    if (res?.id) {
      wuLiaoInfo.value = [
        {
          ...res,
          price: res.unitPrice,
          chooseCount: 1,
          goodsUnit: res.unit,
          unChooseCount: res.goodunusecount,
          itemId: res.id,
        },
      ];
    }
  }
  // ['RETURN_WAREHOUSING', 'INVENTORY_WAREHOUSING'].includes(
  //     receiptOrderType
  //   ) ||
  // 入库(退库入库-RETURN_WAREHOUSING、盘盈入库-INVENTORY_WAREHOUSING) 、 出库的扫码都用这个扫码查询
  if (currentPage.type === "out") {
    // 出库的参数处理
    if (currentPage.type === "out") {
      // 出库需要按仓库去查询物料
      params.warehouseId = orderStore.orderInfo.warehouseId;
      params.shipmentOrderNo = orderStore.orderInfo.shipmentOrderNo;
      if (orderStore.orderInfo.associatedOrders) {
        params.orderNo = orderStore.orderInfo.orderNo;
        params.shipmentOrderType = orderStore.orderInfo.shipmentOrderType;
      }
    }

    const res = await scanItemQrCodeOut(params);
    const res1 = await scanItemQrCodeOutNew(params);
    oughtOut.value = res1?.chooseCount || 0;
    practicalOut.value = res1?.realOutQuantity || 0;

    if (res) {
      wuLiaoInfo.value = (res || []).map((item) => ({
        ...item,
        lastQuantity: item.warecanusecount,
        unChooseCount: item.warecount, // 当前库存数
        areaId: Number(item.areaid),
        areaName: item.areaname,
        warehouseName: item.warehousename,
        itemId: item.id,
      }));
    }
  }
};
const handleSelect = (index) => {
  selectedIndex.value = index;
};

onMounted(() => {
  scanCode();
});
</script>
<template>
  <div class="scanRes-wrapper">
    <div class="scanRes-title" v-if="wuLiaoInfo.length > 0">
      找到以下物料信息
    </div>

    <div
      class="white-card-row"
      style="margin-top: 10px"
      v-if="currentPage.type === 'out'"
    >
      <div class="item">
        <div>应出</div>
        <div>{{ oughtOut }}</div>
      </div>
      <div class="item">
        <div>实出</div>
        <div>{{ practicalOut }}</div>
      </div>
    </div>
    <div class="card">
      <template v-if="wuLiaoInfo.length > 0">
        <WuLiao
          :state="currentPage.state"
          :data="data"
          :index="index"
          :selectedIndex="selectedIndex"
          v-for="(data, index) in wuLiaoInfo"
          :showPurchase="false"
          :pageType="currentPage.type"
          @scanCode="scanCode"
          @select="handleSelect(index)"
        />
      </template>
      <nut-empty description="没有找到匹配的结果" v-else>
        <template #image>
          <image src="../../../assets/images/empty.png" />
        </template>
      </nut-empty>
    </div>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.scanRes-wrapper {
  padding: 18px 32px;
  height: 100vh;
  overflow-y: auto;
  .scanRes-title {
    font-size: 28px;
  }
  .card .grey-card {
    width: 100%;
  }
}
</style>
