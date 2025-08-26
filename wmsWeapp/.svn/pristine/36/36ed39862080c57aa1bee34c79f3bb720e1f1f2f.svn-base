<script setup>
import Taro, { useDidShow } from '@tarojs/taro'
import { ref } from 'vue'
import { useOrderStore } from '../../../stores/order'
import { getItemByOrderNo } from '../../../api/goods'
import goodItem from '../../../components/WuLiao/index.vue'
// import goodItem from '../../../components/WuLiaoManage/wuLiaoItem.vue'
import WuLiaoManage from 'src/components/WuLiaoManage'
import orderInfo from './components/orderInfo.vue'
import { minus, showNameByValue } from 'src/utils'

const orderStore = useOrderStore()
const wuLiaoList = ref([])

const initView = async () => {
  const orderInfo = orderStore.orderInfo
  const { associatedOrders, receiptOrderType, orderNo } = orderInfo

  //  不关联订单 或者 没有订单号的 不往下走
  if (!associatedOrders || !orderNo) return

  // 查询订单下的物料
  const res = await getItemByOrderNo(orderNo, receiptOrderType, false)
  if (res) {
    if (res.details) {
      wuLiaoList.value = (res.details || []).map((data) => ({
        ...data,
        /** 采购数量 */
        goodcount: data.count,
        /** 已入库数量 */
        goodusecount: minus(data.count, data.unChooseCount),
        /** 未入库数量 */
        goodunusecount: data.unChooseCount,
      }))
    }
    if (res.createTime) {
      orderStore.setOrderInfo({
        ...orderStore.orderInfo,
        linkOrderCreateTime: res.createTime,
      })
    }
  }
}

const submit = (data) => {
  orderStore.setCurrGoodsInfo({
    ...data,
    warehouseId: orderStore.order.warehousesId,
  })
  Taro.navigateTo({
    url: '../calcPrice/index',
  })
}
useDidShow(() => {
  initView()
})
</script>
<template>
  <div class="wuliao-wrapper">
    <orderInfo v-if="wuLiaoList.length > 0" />
    <goodItem
      v-for="wuliao in wuLiaoList"
      :key="wuliao.itemId"
      :data="wuliao"
      :showPurchase="true"
    ></goodItem>
    <WuLiaoManage v-if="wuLiaoList.length === 0" :btnType="'in'" />
  </div>
</template>
<style lang="scss"></style>
