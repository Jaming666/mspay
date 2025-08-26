<script setup lang="ts">
import { formatTime } from "src/utils";
interface BasicInfo {
  procInstId?: string;
  procName?: string;
  projectName?: string;
  createUserName?: string;
  addTime?: string;
}
interface OrderInfo {}
interface InvoiceInfo {}
export interface Props {
  basicData?: BasicInfo;
  orderData?: OrderInfo[];
  invoice?: InvoiceInfo[];
  detailType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  basicData: () => ({}),
  orderData: () => [],
  invoice: () => [],
  detailType: () => "",
});
</script>
<template>
  <div class="data-container">
    <!-- 上半部分 -->
    <h4>流程信息</h4>
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
    <h4 v-if="props.detailType === 'RECEIPT'">发票信息</h4>
    <!-- 下半部分--发票信息 -->
    <div v-if="props.detailType === 'RECEIPT'">
      <div
        class="data-section bottom-section"
        v-for="item in props.invoice"
        :key="item.id"
      >
        <div class="data-item">
          <span class="data-label">发票抬头</span>
          <span class="data-value">{{ item.invoice }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">纳税人识别号</span>
          <span class="data-value">{{ item.taxIdenNo }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">开户行名称</span>
          <span class="data-value">{{ item.bankName }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">开户行账号</span>
          <span class="data-value">{{ item.acctNo }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">联系地址</span>
          <span class="data-value">{{ item.address }}</span>
        </div>
        <div class="data-item">
          <span class="data-label">联系电话</span>
          <span class="data-value">{{ item.telNo }}</span>
        </div>
      </div>
    </div>
    <h4>
      订单信息
      <span v-if="props.orderData.length > 1"
        >({{ props.orderData.length }}笔)</span
      >
    </h4>
    <!-- 下半部分--订单信息 -->
    <div
      class="data-section bottom-section"
      v-for="(item, index) in props.orderData"
      :key="index"
    >
      <div class="data-item">
        <span class="data-label">下单时间</span>
        <span class="data-value">{{ item.addTime }}</span>
      </div>
      <div class="data-item" v-if="props.detailType === 'REFUND'">
        <span class="data-label">退货订单编号</span>
        <span class="data-value">{{ item.refundOrderSn }}</span>
      </div>
      <div class="data-item" v-if="props.detailType === 'REFUND'">
        <span class="data-label">原订单编号</span>
        <span class="data-value">{{ item.orderId }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'REFUND'">
        <span class="data-label">订单编号</span>
        <span class="data-value">{{ item.orderId }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">订单状态</span>
        <span class="data-value">{{ item.orderStatusName }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'PAYMENT'">
        <span class="data-label">订单金额</span>
        <span class="data-value">￥{{ item.totalPrice }}</span>
      </div>
      <div
        class="data-item"
        v-if="
          props.detailType === 'REFUND' ||
          props.detailType === 'ORDEREVALUATE' ||
          props.detailType === 'RECEIPT'
        "
      >
        <span class="data-label">已退款金额</span>
        <span class="data-value">￥{{ item.totalReturnPrice }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'PAYMENT'">
        <span class="data-label">实际核销</span>
        <span class="data-value">￥{{ item.accountAmount }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">供应商名称</span>
        <span class="data-value">{{ item.storeName }}</span>
      </div>
      <div class="data-item" v-if="props.detailType === 'PAYMENT'">
        <span class="data-label">开票总金额</span>
        <span class="data-value">￥{{ item.invoiceAmount }}</span>
      </div>

      <div class="data-item" v-if="props.detailType === 'COMMONPURCHASE'">
        <span class="data-label">收货人姓名</span>
        <span class="data-value">{{ item.trueName }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'PAYMENT'">
        <span class="data-label">联系电话</span>
        <span class="data-value">{{ item.telephone }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'PAYMENT'">
        <span class="data-label">收货地址</span>
        <span class="data-value">{{ item.areaInfo }}</span>
      </div>
      <div class="data-item" v-if="props.detailType !== 'PAYMENT'">
        <span class="data-label">订单备注</span>
        <span class="data-value">{{ item.remark }}</span>
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
    background-color: #fff;
    border-radius: 20px;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    .data-item {
      display: flex;
      border-bottom: 2px solid #e7e7e7;
      padding: 12px 0;
      &:last-child {
        border-bottom: none;
      }
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
    background: #999;
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