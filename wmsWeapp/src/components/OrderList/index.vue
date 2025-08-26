<script setup lang="ts">
import Taro from '@tarojs/taro'
import { ref, onBeforeMount } from 'vue'
import { getLinkedOrders } from '../../api/in'
import { useOrderStore } from 'src/stores/order'
import orderItem from './order.vue'

export interface Props {
  data?: { warehouseId?: string; receiptOrderType?: string }
  /** 订单状态 'some' | 'not' */
  status?: string
}
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  status: '',
})

const orderStore = useOrderStore()
const tableData = ref([])
const allData = ref([])

const getList = async () => {
  // if (props.data?.warehouseId) {
  const res = await getLinkedOrders({
    warehouseId: props.data.warehouseId,
    receiptOrderType: props.data.receiptOrderType,
    status: props.status,
  })
  if (res) {
    // tableData.value = res
    if (res.length > 20) {
      tableData.value = res.slice(0, 20)
    } else {
      tableData.value = [...res]
      console.log(tableData.value)
    }
    allData.value = res
  }
  // }
}

const chooseOrder = (order: { no: string; [key: string]: string }) => {
  const { orderNo, associatedOrders } = orderStore.orderInfo.orderNo
  // 入库修改了关联单号清空物料
  if (associatedOrders && orderNo !== orderNo) {
    orderStore.setChoosedGoods([])
  }
  orderStore.setOrderInfo({
    ...orderStore.orderInfo,
    orderNo: order.no,
  })
  Taro.navigateBack()
}

onBeforeMount(() => {
  getList()
})

const reachBottom = () => {
  const len = tableData.value.length
  if (len === allData.value.length) return
  tableData.value = tableData.value.concat(allData.value.slice(len, len + 20))
}
</script>
<template>
  <scroll-view
    style="height: 89vh"
    :scroll-y="true"
    :enhanced="true"
    :show-scrollbar="false"
    :bounces="false"
    :enable-back-to-top="true"
    @scrolltolower="reachBottom"
    class="orderList-index"
  >
    <orderItem
      @click="chooseOrder(order)"
      v-for="order in tableData"
      :key="order.no"
      :data="order"
    />
  </scroll-view>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.nut-tab-pane {
  background-color: transparent;
  padding: 28px 32px;
}
</style>
