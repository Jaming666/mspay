<script setup>
import { reactive, ref, onBeforeMount } from 'vue'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getDetails, getDetailCount } from 'src/api/purchase'
import detPurGood from 'src/components/PurchaseList/detPurGood.vue'
import { toThousandslsFilter } from 'src/utils'

const currentPage = getCurrentInstance().router.params
const details = ref({})
const areaInfo = ref({})
const tableData = ref([])
const countInfo = ref({
  pricecount: '0', //采购总金额
  count: '0', //采购总数量
  typecount: '0', //采购种类
})

const initView = async () => {
  details.value = JSON.parse(decodeURIComponent(currentPage.info))
  const res = await getDetails(details.value.id)
  if (res) {
    tableData.value = res
  }

  const countRes = await getDetailCount(details.value.id)
  if (countRes) {
    countInfo.value = countRes
  }
}

onBeforeMount(() => {
  initView()
})
</script>
<template>
  <div class="goodsList-wrapper">
    <div class="pane-card">
      <div class="white-card-row mb-20">
        <div class="item">
          <div>采购总数量</div>
          <div>{{ countInfo.count }}</div>
        </div>
        <div class="item">
          <div>采购种类</div>
          <div>{{ countInfo.typecount }}</div>
        </div>
        <div class="item">
          <div>采购总金额(价税)</div>
          <div>￥{{ toThousandslsFilter(countInfo.pricecount) }}</div>
        </div>
      </div>
    </div>
    <detPurGood v-for="(data, index) in tableData" :key="index" :data="data" />
  </div>
</template>
<style lang="scss"></style>
