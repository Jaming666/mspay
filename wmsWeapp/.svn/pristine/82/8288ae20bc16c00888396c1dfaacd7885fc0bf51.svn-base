<!-- 采购订单详情中的物料 每个地方的物料展示信息都 不一样-->
<script setup lang="ts">
import { toThousandslsFilter } from 'src/utils/index'
export interface Props {
  data?: any
}
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
})
</script>
<template>
  <div class="wuliao mb-20">
    <div class="white-card">
      <div class="wuliao-name">{{ data.goodsName }}</div>
      <div class="flex">
        <div class="wuliao-class">
          <div class="wuliao-title">物料编码:</div>
          <div class="wuliao-value">{{ data.goodsId }}</div>
        </div>
      </div>
      <div class="wuliao-class">
        <div class="wuliao-title">物料分类:</div>
        <div class="wuliao-value">{{ data.goodsClassName }}</div>
      </div>
      <div class="wuliao-class">
        <div class="wuliao-title">规则型号:</div>
        <div class="wuliao-value">{{ data.goodsSpecStr }}</div>
      </div>
      <div class="wuliao-class">
        <div class="wuliao-title">品牌名称:</div>
        <div class="wuliao-value">{{ data.goodsBrandName }}</div>
      </div>
      <div class="wuliao-class">
        <div class="wuliao-title">单位:</div>
        <div class="wuliao-value">{{ data.goodsUnit }}</div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">采购数量</div>
          <div class="value">
            {{ data.count || 0 }}
          </div>
        </div>
        <div class="doc-row-column">
          <div class="label">采购单价</div>
          <div class="value">￥{{ toThousandslsFilter(data.price || 0) }}</div>
        </div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">已入库数量</div>
          <div class="value">
            {{ data.rkcount || 0 }}
          </div>
        </div>
        <div class="doc-row-column">
          <div class="label">已退货数量</div>
          <div class="value">
            {{ data.refundcount || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../../assets/styles/in.scss';
</style>
