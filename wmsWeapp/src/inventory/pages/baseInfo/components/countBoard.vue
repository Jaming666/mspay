<script setup lang="ts">
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { computed, ref, onBeforeMount } from 'vue'
import { detailcount } from 'src/api/inventory'

const currentPage = getCurrentInstance().router?.params
const countInfo = ref({
  /** 总数 */
  count: 0,
  /** 种类数 */
  typecount: 0,
})

const getDetails = async () => {
  const res = await detailcount(currentPage.orderNo)
  if (res) {
    countInfo.value = res
  }
}
const initView = () => {
  if (currentPage.orderNo) {
    getDetails()
  }
}

onBeforeMount(() => {
  initView()
})
</script>
<template>
  <div class="pd-20">
    <div class="first-title mtb-20">数据展示</div>
    <div class="white-card-row">
      <div class="item">
        <div>物料总数量</div>
        <div>{{ countInfo.count }}</div>
      </div>
      <div class="item">
        <div>物料种类数量</div>
        <div>{{ countInfo.typecount }}</div>
      </div>
    </div>
  </div>
</template>
