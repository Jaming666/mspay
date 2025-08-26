<script setup lang="ts">
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { useGoodsStore } from "../../stores/goods";
import { useOrderStore } from "src/stores/order";
import { getItemByOrderNo } from "../../../api/goods";
import { applyShipment } from "api/out";

const goodsStore = useGoodsStore();
const orderStore = useOrderStore();

interface WuLiaoDataType {
  itemId: string;
  goodsName: string;
  /** 物料分类 */
  goodsclassId?: string;
  /** 物料编码 */
  goodsNo?: string;
  /** 品牌 */
  brand?: string;
  /** 单位 */
  goodsUnit?: string;
  [key: string]: string;
}

export interface Props {
  data?: WuLiaoDataType;
  index?: number;
  selectedIndex?: number;
  /** 是否展示按钮 */
  showBtn?: boolean;
  /** 是否展示采购相关数量 */
  showPurchase?: boolean;
  countName?: string;
  pageType?: "in" | "panDian" | "out" | "det";
  state?: string;
}

const props = withDefaults(defineProps<Props>(), {
  data: {
    id: "",
    name: " ",
  },
  index: 0,
  selectedIndex: 0,
  showBtn: true,
  countName: "已入库数量",
  pageType: "in",
  showPurchase: false,
  state: "",
});

// 是否选中当前
const selectedFlag = ref(false);
const selectedMsg = ref("");

const chooseStand = () => {
  selectedFlag.value = !selectedFlag.value;
  goodsStore.setTempStandGood(selectedFlag.value ? props.data : {});
};
const emit = defineEmits(["scanCode", "select"]);
const handleConfirm = () => {
  var curChooseCount = props.data.curChooseCount
    ? Number(props.data.curChooseCount)
    : 0;
  if (curChooseCount == 0) {
    Taro.showToast({
      title: "请输入出库数量",
      icon: "none",
    });
    return;
  }
  if (curChooseCount > Number(props.data.lastQuantity)) {
    Taro.showToast({
      title: "出库数量不能大于库存数量",
      icon: "none",
    });
    return;
  }
  let data = {
    shipmentOrderNo: orderStore.orderInfo.shipmentOrderNo,
    itemId: props.data.itemId,
    racksId: props.data.racksId,
    layersId: props.data.layersId,
    locationId: props.data.locationId,
    locationNo: props.data.locationNo,
    lastQuantity: props.data.lastQuantity,
    warecanusecount: props.data.warecanusecount,
    curChooseCount: curChooseCount,
  };
  applyShipment(data).then((res) => {
    if (res.code == 200) {
      Taro.showToast({
        title: "出库成功",
        icon: "success",
        duration: 1000,
      });
      setTimeout(() => {
        emit("scanCode");
      }, 1000); // 保持与 duration 时间一致
    } else {
      selectedMsg.value = res.msg;
      emit("select", props.index);
    }
  });
};
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
            <div class="wuliao-title">库位编码:</div>
            <div class="wuliao-value">
              {{ data.locationNo ? data.locationNo : "无" }}
            </div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">库存数量:</div>
            <div class="wuliao-value">
              {{ data.lastQuantity }}
            </div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">出库数量:</div>
            <div v-if="data.lastQuantity == 0 || state == 'look'" class="value">
              {{ data.curChooseCount || 0 }}
            </div>
            <nut-input-number
              v-else
              v-model="data.curChooseCount"
              :min="0"
              :max="data.lastQuantity"
              step="1"
              decimal-places="0"
              type="number"
              placeholder="请输入"
            ></nut-input-number>
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
        <div v-show="selectedIndex === index">
          <span style="font-size: 10px; color: red">{{ selectedMsg }}</span>
        </div>
        <div v-if="state !== 'look'">
          <div @click="handleConfirm" class="btn" v-if="data.lastQuantity != 0">
            出库
          </div>
          <div class="btn2" v-else>已出库</div>
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
        content: "";
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

  .btn2 {
    background-color: #878787;
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
