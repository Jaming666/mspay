<script setup>
import { computed, ref } from 'vue'
import { useOrderStore } from 'src/stores/order'
import OrderList from 'src/components/OrderList/index.vue'

const orderStore = useOrderStore()
const activeTab = ref(1)

const data = computed(() => ({
  warehouseId: orderStore.orderInfo.warehouseId,
  receiptOrderType: orderStore.orderInfo.receiptOrderType,
}))
</script>
<template>
  <div class="linked-order">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="全部" pane-key="1">
        <OrderList :data="data" />
      </nut-tab-pane>
      <nut-tab-pane title="部分入库" pane-key="2">
        <OrderList :data="data" :status="'some'" />
      </nut-tab-pane>
      <nut-tab-pane title="未入库" pane-key="3">
        <OrderList :data="data" :status="'not'" />
      </nut-tab-pane>
    </nut-tabs>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f8f8f7;
}
</style>
