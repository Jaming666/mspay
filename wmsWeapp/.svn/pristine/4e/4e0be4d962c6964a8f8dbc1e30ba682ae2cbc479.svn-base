<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { getCountInfoByOrderNo, getPurchaseList } from 'src/api/purchase'
import { useOrderStore } from 'src/stores/order'
import { formatTime, toThousandslsFilter } from 'src/utils'

const orderStore = useOrderStore()
const data = ref({})
const countInfo = ref({
  rkcount: 0, //入库总数量
  rkcategory: 0, //入库种类
  rkprice: 0, //入库金额
})

const getOrderInfo = async () => {
  const res = await getPurchaseList({
    currentPage: 1,
    orderno: orderStore.orderInfo.orderNo,
  })
  if (res?.result.length > 0) {
    data.value = res.result[0]
  }
  const resCount = await getCountInfoByOrderNo(orderStore.orderInfo.orderNo)
  if (resCount) {
    countInfo.value = resCount
  }
}

onBeforeMount(() => {
  getOrderInfo()
})
</script>
<template>
  <div class="orderInfo-wrapper wuliao">
    <div style="width: 100%">
      <div class="white-card">
        <div class="wuliao-class">
          <div class="wuliao-title">关联订单号</div>
          <div class="wuliao-value">
            {{ data.orderId || orderStore.orderInfo.orderNo }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">订单日期</div>
          <div class="wuliao-value">
            {{
              data.addTime
                ? formatTime(data.addTime || '')
                : orderStore.orderInfo.linkOrderCreateTime
            }}
          </div>
        </div>
        <!-- PROCURE_WAREHOUSING 采购入库 -->
        <template
          v-if="orderStore.orderInfo.receiptOrderType === 'PROCURE_WAREHOUSING'"
        >
          <div class="wuliao-class mb-20">
            <div class="wuliao-title">供应商</div>
            <div class="wuliao-value">{{ data.storeName }}</div>
          </div>
        </template>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">入库总数量</div>
          <div class="value">{{ countInfo.rkcount }}</div>
        </div>
        <div class="doc-row-column">
          <div class="label">入库种类</div>
          <div class="value">{{ countInfo.rkcategory }}</div>
        </div>
        <div class="doc-row-column">
          <div class="label">入库金额（价税）</div>
          <div class="value">
            ￥{{ toThousandslsFilter(countInfo.rkprice) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.orderInfo-wrapper {
  padding-top: 20px;
}
</style>
