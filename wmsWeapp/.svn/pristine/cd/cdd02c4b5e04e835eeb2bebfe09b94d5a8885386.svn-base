<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
interface MaterialInfo {}

export interface Props {
  basicData?: MaterialInfo[];
  detailType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  basicData: () => [],
  detailType: () => "",
});
</script>
<template>
  <div class="data-containe">
    <div v-if="props.detailType !== 'REFUND'">
      <div
        class="data-section"
        v-for="(item1, index1) in props.basicData || []"
        :key="index1"
      >
        <div class="">
          <span class="data-label" style="color: #000; line-height: 45px"
            >订单号：</span
          >
          <span class="data-value">{{ item1.orderId }}</span>
        </div>
        <div class="" style="color: #000; line-height: 45px">
          <span class="data-label">实际核销合计：</span>
          <span class="data-value">￥{{ item1.totalPrice }}</span>
        </div>
        <div
          class="data-section"
          v-for="(item, index) in item1.goodDetailVoList || []"
          :key="index"
        >
          <div class="data-item">
            <span class="data-label">商品编号</span>
            <span class="data-value">{{ item.goodsNo }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">商品名称</span>
            <span class="data-value">{{ item.goodsName }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">商品分类</span>
            <span class="data-value">{{ item.categoryName }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">规格型号</span>
            <span class="data-value">{{ item.goodsSpec }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">数量</span>
            <span class="data-value">{{ item.count }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">单价</span>
            <span class="data-value">￥{{ item.price }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">订单金额</span>
            <span class="data-value">￥{{ item.totalPrice }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">已退款金额</span>
            <span class="data-value">￥{{ item.totalReturnPrice }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">实际核销</span>
            <span class="data-value">￥{{ item.accountAmount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="props.detailType === 'REFUND'">
      <div
        class="data-section"
        v-for="(item, index) in props.basicData || []"
        :key="index"
        :style="index > 0 ? 'margin-top: 20px' : ''"
      >
        <div class="goods-block">
          <div class="data-item">
            <span class="data-label">商品编号</span>
            <span class="data-value">{{ item.purchaseGoodsNo }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">商品名称</span>
            <span class="data-value">{{ item.goodsName }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">规格</span>
            <span class="data-value">{{ item.specName }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">分类</span>
            <span class="data-value">{{ item.goodsClassName }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">退货数量</span>
            <span class="data-value">{{ item.refundCount }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">退货金额</span>
            <span class="data-value">￥{{ item.refundPrice }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">退货备注</span>
            <span class="data-value">{{ item.refundRemark }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-containe {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin: 15px;
  margin-bottom: 90px;
  font-size: 32px;
  .data-section {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 15px;
    background: #fff;
    .goods-block {
      padding: 12px;
    }
    .data-item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      padding: 12px 0;
      .data-label {
        color: #666;
        margin-right: 15px;
        display: block;
        min-width: 170px;
        max-width: 170px;
      }

      .data-value {
        color: #333;
        flex: 1;
        word-break: break-all;
      }

      .remark {
        color: #999;
      }
    }
  }

  .divider {
    height: 2px;
    background: #eee;
    margin: 20px 0;
  }

  .bottom-section {
    .data-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>