<script setup lang="ts">
import { useOrderStore } from 'src/stores/order'
import { toThousandslsFilter } from 'src/utils'
import { Checked, CheckNormal } from '@nutui/icons-vue-taro'
import { formatTime, parseTime } from 'src/utils'

export interface Props {
  data?: any
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
})

const orderStore = useOrderStore()
</script>

<template>
  <div class="orderList-order">
    <div class="checkbox">
      <Checked
        color="#3995FF"
        v-if="orderStore.orderInfo.orderNo === data.no"
      />
      <CheckNormal color="#3995FF" v-else />
    </div>
    <div class="order-wrapper">
      <div class="order-head">
        <div class="orderno">{{ data.no }}</div>
        <div :class="['order-status', data.status === '未入库' ? '' : 'some']">
          {{ data.status }}
        </div>
      </div>

      <div class="order-content" v-if="data.type === 'PROCURE_WAREHOUSING'">
        <div class="row">
          <div class="label">采购日期:</div>
          <div class="value">{{ data.date }}</div>
        </div>
        <div class="row">
          <div class="label">供应商:</div>
          <div class="value">{{ data.gys }}</div>
        </div>
        <div class="row">
          <div class="label">采购员:</div>
          <div class="value">{{ data.buyer }}</div>
        </div>
      </div>
      <div class="order-content" v-if="data.type === 'INVENTORY_WAREHOUSING'">
        <div class="row">
          <div class="label">盘点单名称:</div>
          <div class="value">{{ data.name }}</div>
        </div>
        <div class="row">
          <div class="label">盘点开始日期:</div>
          <div class="value">
            {{ parseTime(formatTime(data.starttime), '{y}-{m}-{d}') }}
          </div>
        </div>
        <div class="row">
          <div class="label">盘点结束日期:</div>
          <div class="value">
            {{ parseTime(formatTime(data.endtime), '{y}-{m}-{d}') }}
          </div>
        </div>
      </div>
      <div class="order-content" v-if="data.type === 'RETURN_WAREHOUSING'">
        <div class="row">
          <div class="label">出库单名称:</div>
          <div class="value">{{ data.name }}</div>
        </div>
        <div class="row">
          <div class="label">出库日期:</div>
          <div class="value">{{ data.date }}</div>
        </div>
      </div>
      <div class="footer">
        <div class="count gap">数量：{{ data.count }}</div>
        <div
          class="count"
          v-if="
            ['PROCURE_WAREHOUSING', 'RETURN_WAREHOUSING'].includes(data.type)
          "
        >
          金额（总价）: ￥{{ toThousandslsFilter(data.amount) }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.orderList-order {
  position: relative;
  display: flex;
  // height: 295px;
  margin-bottom: 20px;
  background-color: #fff;
  -webkit-mask-image: radial-gradient(
      circle at right 21px bottom 25%,
      transparent 21px,
      red 21.5px
    ),
    linear-gradient(90deg, transparent 25%, red 0, red 75%, transparent 0);
  -webkit-mask-size: 100%, 24px 3px;
  -webkit-mask-repeat: repeat, repeat-x;
  -webkit-mask-position: 21px, 50% calc(100% - 24%);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  border-radius: 20px;
  padding: 26px 28px 0 28px;
  .order-wrapper {
    flex: 1;
    padding-left: 20px;
    .orderno {
      font-size: 28px;
      font-weight: bold;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .order-status {
      position: absolute;
      top: 20px;
      right: 0;
      background-color: #f7b500;
      color: #fff;
      font-size: 24px;
      padding: 8px 16px;
      border-radius: 200px 0px 0px 200px;
    }
    .some {
      background-color: rgb(55, 145, 255);
    }
    .row {
      display: flex;
      font-size: 24px;
      margin-bottom: 20px;
      .label {
        width: 170px;
      }
    }
    .footer {
      font-size: 24px;
      padding: 6px 20px;
      display: flex;
      justify-content: flex-end;
      color: #0091ff;
      .count {
        padding-left: 20px;
      }
      .gap {
        position: relative;
        padding-right: 20px;
        &::after {
          content: '';
          position: absolute;
          top: 10px;
          right: 0;
          height: 20px;
          width: 2px;
          background-color: #e7e7e7;
        }
      }
    }
  }
}
</style>
