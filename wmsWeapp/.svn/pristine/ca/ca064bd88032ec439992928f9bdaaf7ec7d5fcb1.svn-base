<script setup>
import { ref } from 'vue'
import { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { useOrderStore } from '../../../stores/order'
import { scanItemQrCode } from 'src/api/in'
import WuLiao from '../../../components/WuLiao/index.vue'

const orderStore = useOrderStore()
const currentPage = getCurrentInstance().router.params

/** 扫描出的物料信息 */
const wuLiaoInfo = ref({})

const scanCode = async () => {
  if (!currentPage?.itemno) return
  const res = await scanItemQrCode({
    itemno: currentPage.itemno,
    orderNo: orderStore.orderInfo.orderNo,
    receiptOrderType: orderStore.receiptOrderType,
  })
  if (res) {
    wuLiaoInfo.value = {
      ...res,
      itemId: res.id,
      itemCode: res.itemNo,
    }
  } else {
  }
}

useDidShow(() => {
  scanCode()
})
</script>
<template>
  <div class="scanRes-wrapper">
    <div class="scanRes-title" v-if="wuLiaoInfo.id">找到以下物料信息</div>

    <div class="card">
      <WuLiao :data="wuLiaoInfo" v-if="wuLiaoInfo.id" :pageType="'panDian'" />
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
  .scanRes-title {
    font-size: 28px;
  }
  .card .grey-card {
    width: 100%;
  }
}
</style>
