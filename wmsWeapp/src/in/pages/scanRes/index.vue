<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentInstance } from '@tarojs/taro'
import { useOrderStore } from '../../../stores/order'
import { scanItemQrCode } from 'src/api/in'
import { scanItemQrCodeOut } from 'src/api/out'
import WuLiao from '../../../components/WuLiao/index'

const orderStore = useOrderStore()
const currentPage = getCurrentInstance().router.params

/** 扫描出的物料信息 */
const wuLiaoInfo = ref({})

const scanCode = async () => {
  if (!currentPage?.itemno) return

  const {
    /** 入库类型 */
    receiptOrderType,
  } = orderStore.orderInfo

  const params = {
    itemno: currentPage.itemno,
    // orderNo: orderStore.orderInfo.orderNo,
    // receiptOrderType: orderStore.orderInfo.receiptOrderType,
    showTips: false,
  }

  // 是入库 并且 不是 [退库入库 、 盘盈入库]&&
  // !['RETURN_WAREHOUSING', 'INVENTORY_WAREHOUSING'].includes(receiptOrderType)

  if (currentPage.type === 'in') {
    if (orderStore.orderInfo.associatedOrders) {
      params.orderNo = orderStore.orderInfo.orderNo
      params.receiptOrderType = orderStore.orderInfo.receiptOrderType
    }
    const res = await scanItemQrCode(params)
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
      ]
    }
  }
  // ['RETURN_WAREHOUSING', 'INVENTORY_WAREHOUSING'].includes(
  //     receiptOrderType
  //   ) ||
  // 入库(退库入库-RETURN_WAREHOUSING、盘盈入库-INVENTORY_WAREHOUSING) 、 出库的扫码都用这个扫码查询
  if (currentPage.type === 'out') {
    // 出库的参数处理
    if (currentPage.type === 'out') {
      // 出库需要按仓库去查询物料
      params.warehouseId = orderStore.orderInfo.warehouseId
      if (orderStore.orderInfo.associatedOrders) {
        params.orderNo = orderStore.orderInfo.orderNo
        params.shipmentOrderType = orderStore.orderInfo.shipmentOrderType
      }
    }

    const res = await scanItemQrCodeOut(params)
    if (res) {
      wuLiaoInfo.value = (res || []).map((item) => ({
        ...item,
        lastQuantity:
          orderStore.orderInfo.associatedOrders && item.goodcount !== null
            ? item.goodcount
            : item.warecount,
        unChooseCount:
          orderStore.orderInfo.associatedOrders && item.goodunusecount !== null
            ? item.goodunusecount
            : item.warecount, // 当前库存数
        areaId: Number(item.areaid),
        areaName: item.areaname,
        warehouseName: item.warehousename,
        itemId: item.id,
      }))
    }
  }
}

onMounted(() => {
  scanCode()
})
</script>
<template>
  <div class="scanRes-wrapper">
    <div class="scanRes-title" v-if="wuLiaoInfo.length > 0">
      找到以下物料信息
    </div>

    <div class="card">
      <template v-if="wuLiaoInfo.length > 0">
        <WuLiao
          :data="data"
          v-for="data in wuLiaoInfo"
          :showPurchase="false"
          :pageType="currentPage.type"
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
