<script setup lang="ts">
import { formatTime } from "src/utils";
interface BasicInfo {
  procInstId?: string;
  procName?: string;
  projectName?: string;
  createUserName?: string;
  addTime?: string;
}
interface OrderInfo {
  // 公共字段
  remark?: string;

  // 盘点专用字段
  inventoryCheckNo?: string; // 盘点单号
  deptName?: string; // 项目部
  inventoryCheckType?: string; // 盘点类型
  warehouseName?: string; // 仓库
  typeName?: string; // 物料分类
  inventoryCheckStatus?: string; // 盘点单状态
  inventoryCheckTypeName?: string; // 盘点类型名称
  primaryItemTypeName?: string; // 物料分类名称
  inventoryCheckStatusName?: string; // 盘点单状态名称

  // 出库专用字段
  shipmentTime?: string; // 出库时间
  shipmentOrderNo?: string; // 出库单号
  shipmentOrderName?: string; // 事由
  shipmentOrderType?: string; // 出库类型
  orderNo?: string; // 订单号
  associatedOrders?: string; // 关联订单标记
  shipmentOrderStatus?: string; // 出库单状态
  picker?: string; // 领料人
  shipmentOrderTypeName?: string; // 出库类型名称
  shipmentOrderStatusName?: string; // 出库单状态名称

  // 入库专用字段
  receiptTime?: string; // 入库时间
  receiptOrderNo?: string; // 入库单号
  receiptOrderName?: string; // 入库单据名称
  receiptOrderType?: string; // 入库类型
  receiptOrderStatus?: string; // 入库单状态
  invoiceType?: string; // 发票类型
  profitcenter?: string; // 利润中心
  receiptOrderTypeName?: string; // 入库类型名称
  receiptOrderStatusName?: string; // 入库单状态名称
  invoiceTypeName?: string; // 发票类型名称
}
export interface Props {
  basicData?: BasicInfo;
  orderData?: OrderInfo;
  detailType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  basicData: () => ({}),
  orderData: () => ({}),
  detailType: () => "",
});
</script>
<template>
  <div class="data-container">
    <!-- 上半部分 -->
    <div class="data-section top-section">
      <div class="data-item">
        <span class="data-label">审批流程编号</span>
        <span class="data-value">{{ props.basicData.procInstId }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">审批流程名称</span>
        <span class="data-value">{{ props.basicData.procName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">项目部名称</span>
        <span class="data-value">{{ props.basicData.projectName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">申请人</span>
        <span class="data-value">{{ props.basicData.createUserName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">申请时间</span>
        <span class="data-value">{{
          props.basicData?.addTime ? formatTime(props.basicData.addTime) : "--"
        }}</span>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <!-- 下半部分--盘点 -->
    <div class="data-section bottom-section" v-if="detailType == 'inventory'">
      <div class="data-item">
        <span class="data-label">盘点单号</span>
        <span class="data-value">{{ props.orderData.inventoryCheckNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">项目部</span>
        <span class="data-value">{{ props.orderData.deptName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">盘点类型</span>
        <span class="data-value">{{
          props.orderData.inventoryCheckTypeName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">仓库</span>
        <span class="data-value">{{ props.orderData.warehouseName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">物料分类</span>
        <span class="data-value">{{
          props.orderData.primaryItemTypeName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">盘点单状态</span>
        <span class="data-value">{{
          props.orderData.inventoryCheckStatusName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">备注</span>
        <span class="data-value remark">{{ props.orderData.remark }}</span>
      </div>
    </div>
    <!-- 下半部分--出库 -->
    <div class="data-section bottom-section" v-if="detailType == 'shipment'">
      <div class="data-item">
        <span class="data-label">出库时间</span>
        <span class="data-value">{{ props.orderData.shipmentTime }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">出库单号</span>
        <span class="data-value">{{ props.orderData.shipmentOrderNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">事由</span>
        <span class="data-value">{{ props.orderData.shipmentOrderName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">出库类型</span>
        <span class="data-value">{{
          props.orderData.shipmentOrderTypeName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">仓库/库区</span>
        <span class="data-value">{{ props.orderData.warehouseName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">订单号</span>
        <span class="data-value">{{ props.orderData.orderNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">是否关联订单</span>
        <span class="data-value">{{
          props.orderData.associatedOrders == "1" ? "是" : "否"
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">出库单状态</span>
        <span class="data-value">{{
          props.orderData.shipmentOrderStatusName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">领料人</span>
        <span class="data-value">{{ props.orderData.picker }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">利润中心</span>
        <span class="data-value">{{ props.orderData.profitcenter }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">备注</span>
        <span class="data-value remark">{{ props.orderData.remark }}</span>
      </div>
    </div>
    <!-- 下半部分--入库 -->
    <div class="data-section bottom-section" v-if="detailType == 'receipt'">
      <div class="data-item">
        <span class="data-label">入库时间</span>
        <span class="data-value">{{ props.orderData.receiptTime }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">入库单号</span>
        <span class="data-value">{{ props.orderData.receiptOrderNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">入库单据名称</span>
        <span class="data-value">{{ props.orderData.receiptOrderName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">入库类型</span>
        <span class="data-value">{{
          props.orderData.receiptOrderTypeName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">仓库</span>
        <span class="data-value">{{ props.orderData.warehouseName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">订单号</span>
        <span class="data-value">{{ props.orderData.orderNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">是否关联订单</span>
        <span class="data-value">{{
          props.orderData.associatedOrders == "1" ? "是" : "否"
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">入库单状态</span>
        <span class="data-value">{{
          props.orderData.receiptOrderStatusName
        }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">发票类型</span>
        <span class="data-value">{{ props.orderData.invoiceTypeName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">利润中心</span>
        <span class="data-value">{{ props.orderData.profitcenter }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">备注</span>
        <span class="data-value remark">{{ props.orderData.remark }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.data-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin: 15px;
  margin-bottom: 90px;
  font-size: 32px;
  .data-section {
    .data-item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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

  .top-section {
    padding-bottom: 10px;
    .data-item:last-child {
      margin-bottom: 0;
    }
  }
  .bottom-section {
    .data-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>