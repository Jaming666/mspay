<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { useGoodsStore } from '../../stores/goods'
import { useOrderStore } from 'src/stores/order'
import { getItemByOrderNo } from '../../../api/goods'

enum PAGE_TYPE {
  'in' = '确认入库',
  'panDian' = '盘点',
  'out' = '出库',
}

const goodsStore = useGoodsStore()
const orderStore = useOrderStore()

interface WuLiaoDataType {
  itemId: string
  goodsName: string
  /** 物料分类 */
  goodsclassId?: string
  /** 物料编码 */
  goodsNo?: string
  /** 品牌 */
  brand?: string
  /** 单位 */
  goodsUnit?: string
  [key: string]: string
}

export interface Props {
  data?: WuLiaoDataType
  /** 是否展示按钮 */
  showBtn?: boolean
  /** 是否展示采购相关数量 */
  showPurchase?: boolean
  countName?: string
  pageType?: 'in' | 'panDian' | 'out' | 'det'
}

const props = withDefaults(defineProps<Props>(), {
  data: {
    id: '',
    name: ' ',
  },
  showBtn: true,
  countName: '已入库数量',
  pageType: 'in',
  showPurchase: false,
})

// 是否选中当前
const selectedFlag = ref(false)

const chooseStand = () => {
  selectedFlag.value = !selectedFlag.value
  goodsStore.setTempStandGood(selectedFlag.value ? props.data : {})
}

const handleConfirm = () => {
  const url = {
    in: '/in/pages/calcPrice/index',
    out: '/out/pages/outCount/index',
    panDian: '/inventory/pages/panDianEdit/index',
    det: '/wuliao/pages/details/index',
  }
  let info = {
    ...props.data,
    warehouseId: orderStore.orderInfo.warehouseId,
  }

  if (props.pageType === 'panDian') {
    info.id = '-1'
  }
  if (props.pageType === 'out') {
    // 库存数量
    info.quantity = props.data.lastQuantity
  }

  if (['in', 'out', 'panDian'].includes(props.pageType)) {
    // 需要用物料id、库区id 一起判断
    const exist = orderStore.choosedGoods.some(
      (val) => val.itemId === info.itemId && val.areaId === info.areaId
    )

    if (exist) {
      Taro.showModal({
        content:
          '该物料已添加，请确认是否继续添加，继续添加将按照本次添加信息覆盖原信息！',
        confirmText: '继续添加',
        success(result) {
          if (result.confirm) {
            orderStore.setCurrGoodsInfo(info)
            Taro.navigateTo({
              url: url[props.pageType],
            })
          }
        },
      })
      return
    }
  }

  orderStore.setCurrGoodsInfo(info)
  Taro.navigateTo({
    url: url[props.pageType],
  })
}
</script>
<template>
  <div class="wuliao">
    <div class="grey-card">
      <div>
        <div class="wuliao-name">{{ data.itemName || data.goodsName }}</div>
        <div class="wuliao-class">
          <div class="wuliao-title">物料分类:</div>
          <div class="wuliao-value">{{ data.itemTypeName }}</div>
        </div>

        <div class="flex">
          <div class="wuliao-class">
            <div class="wuliao-title">物料编码:</div>
            <div class="wuliao-value">{{ data.itemNo }}</div>
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">规则型号:</div>
          <div class="wuliao-value">{{ data.specification }}</div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">品牌名称:</div>
          <div class="wuliao-value">{{ data.brand }}</div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">供应商:</div>
          <div class="wuliao-value">{{ data.supplierName }}</div>
        </div>

        <template v-if="pageType === 'in'">
          <div class="wuliao-class">
            <div class="wuliao-title">库位名称:</div>
            <div class="wuliao-value">
              {{ data.warehouseName }}/{{ data.areaName }}
            </div>
          </div>
        </template>
        <template v-if="pageType === 'out'">
          <div class="wuliao-class">
            <div class="wuliao-title">库位名称:</div>
            <div class="wuliao-value">
              {{ data.warehousename }}/{{ data.areaName }}
            </div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">库存数量:</div>
            <div class="wuliao-value">
              {{ data.lastQuantity }}
            </div>
          </div>
        </template>
        <div class="blue-card" v-if="showPurchase">
          <div class="doc-row-column">
            <div class="label">订单物料数量</div>
            <div class="value">
              {{ data.goodcount || 0 }}
            </div>
          </div>
          <div class="doc-row-column">
            <div class="label">已入库数量</div>
            <div class="value">
              {{ data.goodusecount || 0 }}
            </div>
          </div>
          <div class="doc-row-column">
            <div class="label">未入库数量</div>
            <div class="value">
              {{ data.goodunusecount || 0 }}
            </div>
          </div>
        </div>
        <div @click="handleConfirm" class="btn" v-show="showBtn">
          {{ PAGE_TYPE[pageType] }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.wuliao {
  margin: 20px 0;
  background-color: #fff;
  display: flex;
  border: 1px solid #f5f5f5;
  .grey-card {
    width: 100%;
  }
  &:last-child {
    border: none;
  }
  .check-box {
    padding-top: 20px;
  }
  .wuliao-name {
    padding: 20px;
    color: #323233;
    font-size: 32px;
  }
  .wuliao-class {
    color: #666;
    display: flex;
    line-height: 2;
    font-size: 24px;
    .wuliao-img {
      width: 120px;
      height: 120px;
    }
    .wuliao-title {
      width: 180px;
      padding-left: 20px;
      color: rgba(0, 0, 0, 0.5);
    }
    .wuliao-value {
      padding-right: 20px;
      color: #323233;
      flex: 1;
      text {
        word-break: break-all;
      }
    }
  }
  .blue-card {
    display: flex;
    padding: 14px 0;
    background-color: #f4f9ff;
    margin-bottom: 20px;
    font-size: 24px;
    // position: relative;
    .label {
      margin-bottom: 20px;
    }
    .value {
      font-size: inherit;
    }
    .doc-row-column {
      flex: 1;
      text-align: center;
    }
    .doc-row-column:not(:last-child) {
      &::after {
        position: absolute;
        content: '';
        right: 0;
        top: 10px;
        height: 40px;
        width: 2px;
        background-color: #dddddd;
      }
    }
  }
  .btn {
    background-color: #0091ff;
    color: #fff;
    font-size: 28px;
    padding: 22px;
    text-align: center;
    border-radius: 200px;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    .wuliao-class {
      flex: 1;
    }
  }
}
</style>
