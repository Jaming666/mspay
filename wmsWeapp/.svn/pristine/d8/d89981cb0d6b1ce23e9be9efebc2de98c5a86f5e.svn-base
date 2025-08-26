<script setup lang="ts" name="InDocListItem">
import { toThousandslsFilter } from "../../utils/index";
import { useCodesStore } from "../../stores/codes";

const codesStore = useCodesStore();

interface Props {
  data: any;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});

const showNameByValue = (value, options) => {
  const target = options.find((val) => val.dictValue === value.toString());
  if (target) {
    return target.dictLabel;
  }
  return value;
};
</script>
<template>
  <div class="docitem">
    <div class="head">
      <div class="left">
        <div>编号：{{ data.shipmentOrderNo }}</div>
        <div>名称：{{ data.shipmentOrderName }}</div>
      </div>
      <div :class="['status', `status-${data.shipmentOrderStatus}`]">
        {{
          showNameByValue(
            data.shipmentOrderStatus,
            codesStore.outOrderStatusList
          )
        }}
      </div>
    </div>

    <div class="doc-body">
      <div class="doc-row">
        <div class="label">仓库名称</div>
        <div class="value">
          {{ data.warehouseName }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">出库单类型</div>
        <div class="value">
          {{
            showNameByValue(data.shipmentOrderType, codesStore.outOrderTypeList)
          }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">出库日期</div>
        <div class="value">
          {{ data.shipmentTime }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">关联单号</div>
        <div class="value">
          {{ data.orderNo }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">领料人</div>
        <div class="value">
          {{ data.pickername }}
        </div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">出库数量</div>
          <div class="value">
            {{ data.ckcount || 0 }}
          </div>
        </div>
        <div class="doc-row-column">
          <div class="label">出库种类</div>
          <div class="value">
            {{ data.cktypecount || 0 }}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="label">
        {{ data.createByName }}
      </div>
      <div class="value">
        {{ data.createTime }}
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
        content: "";
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
  }
  .status-2 {
    @extend .status;
    background-color: rgba(253, 115, 0, 1);
  }
  .status-3 {
    @extend .status;
    background-color: rgba(6, 164, 129, 1);
  }
  .status-4,
  .status-5 {
    @extend .status;
    background-color: rgba(215, 69, 109, 1);
  }
}
</style>
