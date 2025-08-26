<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
interface MaterialInfo {
  itemNo?: string; // 物料编号
  goodsName?: string; // 物料名称
  specification?: string; // 规格型号
  supplierName?: string; // 供应商名称
  areaName?: string; // 库区名称
  racksName?: string; // 货架名称
  racksNo?: string; // 货架编号
  layerNo?: string; // 层号
  locationNo?: string; // 库位号
  chooseCount?: number; // 入库数量
  goodsUnit?: string; // 物料单位
  price?: number; // 单价
  priceTax?: number; // 不含税单价
  sumPrice?: number; // 总价
  sumPriceTax?: number; // 不含税总价
  itemCode?: string; // 物料编码（盘点用）
  quantity?: number; // 账面库存
  checkQuantity?: number; // 实际库存
  quantityChanges?: number; // 库存数量变化
  changeType?: number; // 盈亏类型(31:盘亏 32:盘盈)
  inventoryCheckStatus?: number; // 盘点状态
  itemName?: string; // 物料名称（出库用）
}

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
    <!-- 盘点 -->
    <div v-if="props.detailType == 'inventory'">
      <div
        class="data-section"
        v-for="(item, index) in props.basicData || []"
        :key="index"
      >
        <div class="data-item">
          <span class="data-label">物料编号</span>
          <span class="data-value">{{ item.itemCode }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">物料名称</span>
          <span class="data-value">{{ item.itemName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">规格型号</span>
          <span class="data-value">{{ item.specification }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">库区</span>
          <span class="data-value">{{ item.areaName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">账面库存</span>
          <span class="data-value">{{ item.quantity }}</span>
        </div>
        <div class="data-item" v-if="item.inventoryCheckStatus >= 14">
          <span class="data-label">实际库存</span>
          <span class="data-value">{{
            item.checkQuantity === null ? "--" : item.checkQuantity
          }}</span>
        </div>
        <div class="data-item" v-if="item.inventoryCheckStatus >= 14">
          <span class="data-label">库存数量变化</span>
          <span class="data-value">{{ item.quantityChanges }}</span>
        </div>
        <div class="data-item" v-if="item.inventoryCheckStatus >= 14">
          <span class="data-label">盈亏</span>
          <span class="data-value">{{
            item.changeType === 31
              ? "盘亏"
              : item.changeType === 32
              ? "盘盈"
              : "--"
          }}</span>
        </div>
      </div>
    </div>
    <!-- 出库 -->
    <div v-if="props.detailType == 'shipment'">
      <div
        class="data-section"
        v-for="(item, index) in props.basicData || []"
        :key="index"
      >
        <div class="data-item">
          <span class="data-label">物料编号</span>
          <span class="data-value">{{ item.itemNo }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">物料名称</span>
          <span class="data-value">{{ item.itemName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">规格型号</span>
          <span class="data-value">{{ item.specification }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">库区</span>
          <span class="data-value">{{ item.areaName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">计划数量</span>
          <span class="data-value">{{ item.chooseCount }}</span>
        </div>
      </div>
    </div>
    <!-- 入库 -->
    <div v-if="props.detailType == 'receipt'">
      <div
        class="data-section"
        v-for="(item, index) in props.basicData || []"
        :key="index"
      >
        <div class="data-item">
          <span class="data-label">物料编号</span>
          <span class="data-value">{{ item.itemNo }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">物料名称</span>
          <span class="data-value">{{ item.goodsName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">规格型号</span>
          <span class="data-value">{{ item.specification }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">供应商名称</span>
          <span class="data-value">{{ item.supplierName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">库区</span>
          <span class="data-value">{{ item.areaName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">库位</span>
          <span class="data-value">{{
            item.locationNo
              ? item.racksName +
                "-" +
                item.racksNo +
                "-" +
                item.layerNo +
                "-" +
                item.locationNo
              : ""
          }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">入库数量</span>
          <span class="data-value">{{ item.chooseCount }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">单位</span>
          <span class="data-value">{{ item.goodsUnit }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">单价</span>
          <span class="data-value">{{ item.price }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">不含税单价</span>
          <span class="data-value">{{ item.priceTax }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">总价</span>
          <span class="data-value">{{ item.sumPrice }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">不含税总价</span>
          <span class="data-value">{{ item.sumPriceTax }}</span>
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
    margin-bottom: 20px;
    border-radius: 10px;
    background: #fff;
    .data-item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 20px;

      .data-label {
        color: #666;
        margin-right: 15px;
        display: block;
        min-width: 230px;
        max-width: 230px;
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