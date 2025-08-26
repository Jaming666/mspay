<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getDatas } from '../../../api/common'
import paramsItem from './componets/paramsItem.vue'

enum DataType {
  'wms_receipt_type' = '入库',
  'wms_shipment_type' = '出库',
}

const list = ref([])
const listOut = ref([])
const allList = ref([])
const activeTab = ref(1)

const initView = async () => {
  const res1 = await getDatas('wms_receipt_type')
  if (res1) {
    list.value = (res1.data || []).map((item) => ({
      ...item,
      type: 'wms_receipt_type',
    }))
  }
  const res2 = await getDatas('wms_shipment_type')
  if (res2) {
    listOut.value = (res2.data || []).map((item) => ({
      ...item,
      type: 'wms_shipment_type',
    }))
  }

  allList.value = [].concat(list.value, listOut.value)
}

onBeforeMount(() => {
  initView()
})
</script>
<template>
  <div class="params-details">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="全部" pane-key="1">
        <paramsItem v-for="item in allList" :key="item.id" :data="item" />
      </nut-tab-pane>
      <nut-tab-pane title="入库" pane-key="2">
        <paramsItem v-for="item in list" :key="item.id" :data="item" />
      </nut-tab-pane>
      <nut-tab-pane title="出库" pane-key="3">
        <paramsItem v-for="item in listOut" :key="item.id" :data="item" />
      </nut-tab-pane>
    </nut-tabs>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.nut-tab-pane {
  background-color: transparent;
}
</style>
