<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { getInCount } from 'src/api/in'
import { useOrderStore } from 'src/stores/order'
import { showNameByValue, increase } from 'src/utils/index'

const orderStore = useOrderStore()
const countInfo = ref({
  /** 已入库数量 */
  inWareCount: 0,
  /** 未入库数量 */
  unWareCount: 0,
})
const sumPrice = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => increase(pre, Number(curr.sumPrice || 0)),
    0
  )
)
const sumPriceTax = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => increase(pre, Number(curr.sumPriceTax || 0)),
    0
  )
)
const sumNum = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => increase(pre, Number(curr.chooseCount || 0)),
    0
  )
)

const queryCount = async () => {
  if (!orderStore.orderInfo.receiptOrderType) return
  const res = await getInCount({
    orderNo: orderStore.orderInfo.orderNo || '',
    receiptOrderType: orderStore.orderInfo.receiptOrderType || '',
    showTips: false,
  })
  if (res) {
    countInfo.value = res
  }
}

watch(
  [
    () => orderStore.orderInfo.orderNo,
    () => orderStore.orderInfo.receiptOrderType,
  ],
  () => {
    queryCount()
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="pd-20">
    <div class="first-title">数据展示</div>
    <div class="pane-card">
      <div class="count-row mb-20" v-if="orderStore.orderInfo.associatedOrders">
        <div class="count-wrapper">
          <div class="icon">
            <image src="../../../../assets/images/in/icon-blue.png"></image>
          </div>
          <div class="content">
            <div class="count">{{ countInfo.inWareCount }}</div>
            <div class="name">已入库数量</div>
          </div>
        </div>
        <div class="count-wrapper">
          <div class="icon">
            <image src="../../../../assets/images/in/icon-red.png"></image>
          </div>
          <div class="content">
            <div class="count-red">{{ countInfo.unWareCount }}</div>
            <div class="name">未入库数量</div>
          </div>
        </div>
      </div>

      <div class="grey-card-row">
        <div class="item">
          <div>入库总数量</div>
          <div>{{ sumNum }}</div>
        </div>
        <div class="item">
          <div>入库种类</div>
          <div>{{ orderStore.choosedGoods.length }}</div>
        </div>
        <div class="item">
          <div>入库金额(价税)</div>
          <div>{{ sumPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
