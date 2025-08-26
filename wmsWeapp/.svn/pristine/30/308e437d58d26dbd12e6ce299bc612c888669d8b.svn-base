<script setup lang="ts">
import { toThousandslsFilter } from '../../utils/index'
export interface Props {
  data?: any
}
const rukuStatus = ['', '未入库', '部分入库', '已入库']
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
})
</script>
<template>
  <div class="docitem">
    <div class="head">
      <div class="left">
        <div>采购订单编码：{{ data.orderId }}</div>
      </div>
      <div :class="[`status-${rukuStatus.indexOf(data.rukuStatus)}`]">
        {{ data.rukuStatus }}
      </div>
    </div>

    <div class="doc-body">
      <div class="doc-row">
        <div class="label">物料分类</div>
        <div class="value">
          {{ data.classid }}
        </div>
      </div>

      <div class="doc-row">
        <div class="label">供应商名称</div>
        <div class="value">
          {{ data.storeName }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">下单时间</div>
        <div class="value">
          {{ data.addTime }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">项目部名称</div>
        <div class="value">
          {{ data.projectName }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">采购员名称</div>
        <div class="value">
          {{ data.trueName }}
        </div>
      </div>

      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">采购物料数量</div>
          <div class="value">{{ data.gccount }}</div>
        </div>
        <div class="doc-row-column">
          <div class="label">采购物料金额（价税）</div>
          <div class="value">
            ￥{{ toThousandslsFilter(data.gcpricecount) }}
          </div>
        </div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">已退货数量</div>
          <div class="value">{{ data.refundcount }}</div>
        </div>
        <div class="doc-row-column">
          <div class="label">已退货金额（价税）</div>
          <div class="value">
            ￥{{ toThousandslsFilter(data.refundpricecount) }}
          </div>
        </div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">已入库数量</div>
          <div class="value">{{ data.rkcount }}</div>
        </div>
        <div class="doc-row-column">
          <div class="label">已入库金额（价税）</div>
          <div class="value">
            ￥{{ toThousandslsFilter(data.rkpricecount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.docitem {
  position: relative;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px 32px;
  color: #323233;
  .head,
  .doc-row {
    display: flex;
    justify-content: space-between;
    .label {
      width: 220px;
    }
    .value {
      flex: 1;
    }
  }
  .head {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #e7e7e7;
    padding-bottom: 20px;
    font-size: 28px;
    line-height: 44px;
    font-weight: bold;
    .left {
      flex: 1;
      padding-right: 120px;
    }
  }
  .doc-body {
    padding-top: 28px;
    .doc-row {
      display: flex;
      margin-bottom: 20px;
      font-size: 24px;
      .label {
        color: rgba(0, 0, 0, 0.5);
      }
      .value {
        flex: 1;
        font-size: inherit;
      }
    }
    .doc-row-column {
      flex: 1;
      text-align: center;
      flex-direction: column;
    }
  }
  .blue-card {
    display: flex;
    padding: 14px 40px;
    background-color: #f4f9ff;
    margin-bottom: 20px;
    font-size: 24px;
    position: relative;
    .label {
      margin-bottom: 20px;
    }
    .value {
      font-size: inherit;
    }
    .doc-row-column:first-child {
      &::after {
        position: absolute;
        content: '';
        left: 50%;
        top: 40px;
        height: 40px;
        width: 2px;
        background-color: #dddddd;
      }
    }
  }

  .green-card {
    @extend .blue-card;
    background-color: #f7fcfd;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    color: #323233;
    font-size: 28px;
    line-height: 40px;
    border-top: 1px solid #e7e7e7;
    padding: 20px 0 10px 0;
  }
  .status {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: normal;
    font-size: 28px;
    border-radius: 0 20px 0 20px;
    background-color: #3791ff;
    color: #fff;
    padding: 2px 20px;
  }
  .status-1 {
    @extend .status;
    background: rgb(215, 69, 76);
  }
  .status-2 {
    @extend .status;
    background-color: rgba(49, 186, 255);
  }
  .status-3 {
    @extend .status;
    background-color: rgba(6, 164, 129, 1);
  }
}
</style>
