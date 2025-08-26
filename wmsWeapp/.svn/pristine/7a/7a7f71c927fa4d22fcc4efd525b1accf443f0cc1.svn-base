<script setup lang="ts">
export interface DictData {
  dictLabel: string
  type: string
  remark?: string
}

export interface Props {
  data?: DictData
}

enum DataType {
  'wms_receipt_type' = '入库',
  'wms_shipment_type' = '出库',
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    dictLabel: '',
    type: '',
  }),
})
</script>
<template>
  <div class="params-det-card">
    <div class="head">
      <div class="dictLabel">{{ data.dictLabel }}</div>
      <div
        class="dictType"
        :class="{
          in: data.type === 'wms_receipt_type',
        }"
      >
        {{ DataType[data.type] }}
      </div>
    </div>
    <div class="remark">
      {{ data.remark }}
    </div>
  </div>
</template>
<style lang="scss">
.params-det-card {
  padding: 24px 34px;
  background: #ffffff;
  border-radius: 16px;
  margin-bottom: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dictType {
      color: #fff;
      font-size: 24px;
      padding: 4px 24px;
      background-color: #01c99a;
      border-radius: 24px;
    }
    .in {
      background-color: #3995ff;
    }
  }
  .dictLabel {
    font-size: 32px;
    color: #333333;
    line-height: 44px;
    margin-bottom: 12px;
  }
  .remark {
    color: #999999;
    font-size: 24px;
  }
}
</style>
