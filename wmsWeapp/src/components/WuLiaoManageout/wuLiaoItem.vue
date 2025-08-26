<!-- 每个模块的物料展示的信息都不一样 -->
<script setup lang="ts">
import Taro from "@tarojs/taro";
import { useOrderStore } from "src/stores/order";
import { useGoodsStore } from "src/stores/goods";
import { toThousandslsFilter } from "src/utils";
import { getInventorycount } from "src/api/inventory";
import { log } from "console";

export interface Props {
  /** 物料信息 */
  data: any;
  btnType?: "det" | "panDian" | "in";
}
const props = withDefaults(defineProps<Props>(), {
  data: {},
  btnType: "det",
});
enum BTN_NAME {
  "panDian" = "盘点",
  "in" = "确认入库",
  "out" = "申请出库",
}

const orderStore = useOrderStore();
const goodStore = useGoodsStore();
const viewDetails = (data) => {
  goodStore.setGood(data);
  Taro.navigateTo({
    url: "/wuliao/pages/details/index",
  });
};

const handleConfirm = (data) => {
  // let url = '/inventory/pages/panDianEdit/index'
  let url = "/in/pages/calcPrice/index";
  let params = {
    ...data,
    itemCode: data.itemNo,
  };
  if (props.btnType === "panDian") {
    params.id = "-1";
    params.itemId = data.id;
    params.warehouseId = orderStore.orderInfo.warehouseId;

    url = "/inventory/pages/panDianEdit/index";
  }
  if (props.btnType === "in") {
    params = {
      ...params,
      goodsUnit: data.unit,
      chooseCount: 1,
      price: data.unitPrice,
      goodsId: data.id,
      unChooseCount: data.warecanusecount,
      itemId: data.id,
    };
  }

  if (props.btnType === "out") {
    url = "/navigateToout/pages/outCount/index";
    params = {
      ...params,
      unChooseCount: data.lastQuantity,
    };
  }

  // 入库、盘点页面，如果单据中已添加过的物料增加是否继续操作提示
  if (["in", "out", "panDian"].includes(props.btnType)) {
    let exist = false;

    if (props.btnType === "panDian") {
      // 盘点的话需要用物料id、库区id、删除状态 一起判断
      exist = orderStore.choosedGoods.some(
        (val) => val.itemId === params.itemId && val.areaId === params.areaId
      );
    } else {
      exist = orderStore.choosedGoods.some(
        (val) => val.itemId === params.itemId && val.areaId === params.areaId
      );
    }

    if (exist) {
      Taro.showModal({
        content:
          "该物料已添加，请确认是否继续添加，继续添加将按照本次添加信息覆盖原信息！",
        confirmText: "继续添加",
        success(result) {
          if (result.confirm) {
            // 保存物料信息
            orderStore.setCurrGoodsInfo(params);
            Taro.navigateTo({
              url: url,
            });
          }
        },
      });
      return;
    }
  }
  // 保存物料信息
  orderStore.setCurrGoodsInfo(params);
  // 跳转详情页面
  Taro.navigateTo({
    url: url,
  });
};
</script>
<template>
  <div class="docitem">
    <div class="head">
      <div class="left">
        <div>{{ data.itemName }}</div>
      </div>
    </div>

    <div class="doc-body">
      <div class="doc-row">
        <div class="label">物料编码</div>
        <div class="value">
          {{ data.itemNo }}
        </div>
      </div>

      <div class="doc-row">
        <div class="label">规格型号</div>
        <div class="value">
          {{ data.specification }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">品牌</div>
        <div class="value">
          {{ data.brand }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">物料分类</div>
        <div class="value">
          {{ data.itemTypeName }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">计量单位</div>
        <div class="value">
          {{ data.unit }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">供应商</div>
        <div class="value">
          {{ data.supplierName }}
        </div>
      </div>
      <div class="doc-row" v-if="props.btnType === 'out'">
        <div class="label">仓库/库区</div>
        <div class="value">{{ data.warehouseName }}/ {{ data.areaName }}</div>
      </div>
      <div class="doc-row">
        <div class="label">货架库位</div>
        <div class="value">{{ data.locationName }}</div>
      </div>
      <div class="blue-card">
        <div class="doc-row-column">
          <div class="label">库存总数</div>
          <div class="value">
            {{ data.warecount || data.quantity || 0 }}
          </div>
        </div>
        <div class="doc-row-column">
          <div class="label">可用数量</div>
          <div class="value">
            {{
              props.btnType !== "out" ? data.warecanusecount : data.lastQuantity
            }}
          </div>
        </div>
      </div>

      <div class="green-card">
        <div class="doc-row-column">
          <div class="label">库存总价值（价税）</div>
          <div class="value">
            ￥{{
              toThousandslsFilter(
                props.btnType !== "out"
                  ? data.warecountprice
                  : data.itemRelationVO.warecountprice
              )
            }}
          </div>
        </div>
        <div class="doc-row-column">
          <div class="label">库存总价值（不含税）</div>
          <div class="value">
            ￥{{
              toThousandslsFilter(
                props.btnType !== "out"
                  ? data.warecountpricetax
                  : data.itemRelationVO.warecountpricetax
              )
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div v-if="btnType === 'det'" class="btn-blue" @click="viewDetails(data)">
        查看详情
      </div>
      <div
        v-if="btnType !== 'det'"
        class="btn-blue"
        @click="handleConfirm(data)"
      >
        {{ BTN_NAME[btnType] }}
      </div>
    </div>
  </div>
</template>
