<script setup lang="ts">
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { ref, onMounted } from 'vue'
import { useCodesStore } from 'src/stores/codes'
import inDoclist from 'src/components/InDocList/index.vue'

const codeStore = useCodesStore()
const inListRef = ref(null)
const currentPage = getCurrentInstance().router.params
const formData = ref({
  receiptOrderNo: '',
})
const details = ref({})

const initView = () => {
  details.value = JSON.parse(decodeURIComponent(currentPage.info))
  formData.value.orderNo = details.value.orderId

  inListRef.value.getList()
  codeStore.getInDatas()
}

onMounted(() => {
  initView()
})
</script>
<template>
  <div>
    <inDoclist ref="inListRef" :condition="formData" :disabled="true" />
  </div>
</template>
<style lang="scss">
.inDoclist {
  height: 82vh !important;
}
</style>
