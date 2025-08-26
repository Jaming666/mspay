<script setup>
import { reactive, ref, onBeforeMount } from 'vue'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getDetails } from 'src/api/purchase'
import { useOrderStore } from 'src/stores/order'
import BaseInfo from './components/details.vue'
import GoodsList from './components/goodsList.vue'
import rkRecords from './components/rkRecords.vue'

const orderStore = useOrderStore()
const value = ref('1')
const currentPage = getCurrentInstance().router.params
const details = ref({})
const areaInfo = ref({})

const initView = () => {
  details.value = JSON.parse(decodeURIComponent(currentPage.info))
  console.log(details.value)
  // getDetails(details.value.id)
}
const goRuKu = () => {
  orderStore.setOrderInfo({
    orderNo: details.value.orderId,
  })
  Taro.redirectTo({
    url: '/in/pages/baseInfo/index?from=purchase',
  })
}
onBeforeMount(() => {
  orderStore.$reset()
  initView()
})
</script>
<template>
  <div class="cangkuDetails-wrapper">
    <nut-tabs v-model="value">
      <nut-tab-pane title="基础信息" pane-key="1"> <BaseInfo /></nut-tab-pane>
      <nut-tab-pane title="采购明细" pane-key="2"> <GoodsList /> </nut-tab-pane>
      <nut-tab-pane title="入库记录" pane-key="3">
        <rkRecords />
      </nut-tab-pane>
    </nut-tabs>
    <div v-if="details.rukuStatus !== '已入库'">
      <nut-button type="primary" block @click="goRuKu"> 去入库</nut-button>
    </div>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.cangkuDetails-wrapper {
  // padding: 20px 32px;
  .nut-tab-pane {
    padding: 20px 32px;
    height: 84vh !important;
    background-color: transparent;
  }
  .info-card {
    .card-body {
      background-color: #fff;
      border-radius: 32px;
      padding: 4px 28px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 20px 20px;

      font-size: 28px;
      &:not(:last-child) {
        border-bottom: 1px solid #e7e7e7;
      }
      .label {
        color: #8c8c8c;
      }
      .value {
        color: #1a1a1a;
      }
    }
  }
  .sup {
    font-size: 24px;
    vertical-align: text-top;
  }
  .first-title {
    font-size: 32px;
    color: #303030;
    font-weight: bold;
    margin-bottom: 24px;
  }
}
</style>
