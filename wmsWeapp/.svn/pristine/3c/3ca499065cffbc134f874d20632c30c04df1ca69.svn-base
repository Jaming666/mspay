<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { computed, reactive, ref } from "vue";
import { useOrderStore } from "src/stores/order";
import { getInfoByQrcode1 } from "../../../../api/goods";
require("../../../../assets/js/jem.js");
const currentPage = getCurrentInstance().router?.params;
import { ReceiptStatus } from "src/assets/code/common";
const orderStore = useOrderStore();
import { increase } from "src/utils/index";
const show = ref(false);
const editDoodInfo = reactive({
  data: "",
  index: "",
});

interface Props {
  disabled?: boolean;
  outStatus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  outStatus: false,
});
const out = (data, index, state) => {
  const { warehouseId } = orderStore.orderInfo;
  Taro.navigateTo({
    url: `/in/pages/scanRes/indexOut?itemno=${data.itemNo}&warehouseId=${warehouseId}&type=out&state=${state}`,
  });
};
const choose = (item) => {
  const choodedGoods = orderStore.choosedGoods;
  if (item.key === "del") {
    choodedGoods.splice(editDoodInfo.index, 1);
    orderStore.setChoosedGoods(choodedGoods);
  } else {
    orderStore.setCurrGoodsInfo(editDoodInfo.data);
    Taro.navigateTo({
      url: "/navigateToout/pages/outCount/index?from=edit",
    });
  }
};
const goPage = (pageName: string) => {
  const { warehouseId, associatedOrders, orderNo } = orderStore.orderInfo;

  if (!warehouseId) {
    Taro.showToast({
      title: "请先选择仓库",
      icon: "error",
    });
    return;
  }
  if (associatedOrders && !orderNo) {
    Taro.showToast({
      title: "请填完关联单号",
      icon: "error",
    });
    return;
  }

  Taro.navigateTo({
    url:
      "/navigateToout/pages/wuLiaoList/list?usercode=" + currentPage.usercode,
  });
};

const queryItemInfo = (qrcode, warehouseId, id) => {
  getInfoByQrcode1(qrcode, warehouseId, id).then((res) => {
    if (res) {
      const itemno = res.itemNo;
      Taro.navigateTo({
        url: `/in/pages/scanRes/indexOut?itemno=${itemno}&warehouseId=${warehouseId}&type=out`,
      });
    } else {
      Taro.showToast({
        title: "请重新扫描或手动输入",
        icon: "none",
      });
    }
  });
};
const scanCode = (type: string) => {
  const { warehouseId, associatedOrders, orderNo } = orderStore.orderInfo;
  if (!warehouseId) {
    Taro.showToast({
      title: "请先选择仓库",
      icon: "error",
    });
    return;
  }
  if (associatedOrders && !orderNo) {
    Taro.showToast({
      title: "请填写关联单号",
      icon: "error",
    });
    return;
  }
  // queryItemInfo('C180201-HNCS004-01', warehouseId)

  em.ready(function () {
    let isReady = em.checkJsApi("scanQRCode");
    if (isReady) {
      em.scanQRCode({
        scanType: ["qrCode", "barCode"],
        needResult: 1,
        success: function (res) {
          // alert(res.resultStr); //弹出扫码到的内容
          if (res.resultStr) {
            Taro.showToast({
              title: "扫描成功",
              icon: "none",
            });
            queryItemInfo(res.resultStr, warehouseId, currentPage.id);
          }
        },
      });
    }
  });
};
const emit = defineEmits(["getDetail"]);
useDidShow(() => {
  emit("getDetail");
});
</script>
<template>
  <div class="pd-20 relative-container">
    <div class="first-title mtb-20">出库物料</div>

    <div class="">
      <div
        class="wuliao mb-20"
        v-for="(data, index) in orderStore.choosedGoods"
        :key="data.goodsId"
      >
        <div class="white-card">
          <div>
            <div class="wuliao-name">
              <div>{{ data.itemName }}</div>
              <div
                v-if="data.chooseCount == data.realOutQuantity"
                style="position: absolute; left: 80px"
              >
                <image
                  src="../../../../assets/images/out.png"
                  style="height: 60px; width: 60px"
                ></image>
              </div>
              <div
                class="edit-btn"
                v-if="currentPage.status !== ReceiptStatus.auditProcess"
              >
                <nut-button
                  v-if="data.chooseCount > data.realOutQuantity"
                  plain
                  type="primary"
                  size="mini"
                  @click="out(data, index)"
                >
                  操作
                </nut-button>
                <nut-button
                  v-else
                  plain
                  type="primary"
                  size="mini"
                  @click="out(data, index, 'look')"
                >
                  查看
                </nut-button>
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">物料编码：</div>
              <div class="wuliao-value">
                {{ data.goodsId || data.itemNo }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">规格型号：</div>
              <div class="wuliao-value">
                {{ data.specification }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">品牌名称：</div>
              <div class="wuliao-value">
                {{ data.brand }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">物料分类：</div>
              <div class="wuliao-value">
                {{ data.itemTypeNameCascade }}
              </div>
            </div>

            <div class="wuliao-class">
              <div class="wuliao-title">供应商:</div>
              <div class="wuliao-value">
                {{ data.supplierName }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">可用数量:</div>
              <div class="wuliao-value">
                {{ data.lastQuantity }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">库存数量:</div>
              <div class="wuliao-value">
                {{ data.realLastQuantity }}
              </div>
            </div>

            <div class="second-card">
              <div class="wuliao-class" style="align-items: center">
                <div class="wuliao-title" style="color: red">应出数量:</div>
                <div
                  class="wuliao-value"
                  style="color: red; font-weight: bold; font-size: 0.8rem"
                >
                  {{ data.chooseCount }} {{ data.itemUnit }}
                </div>
              </div>
              <div class="wuliao-class" style="align-items: center">
                <div class="wuliao-title" style="color: red">实出数量:</div>
                <div
                  class="wuliao-value"
                  style="color: red; font-weight: bold; font-size: 0.8rem"
                >
                  {{ data.realOutQuantity ? data.realOutQuantity : 0 }}
                  {{ data.itemUnit }}
                </div>
              </div>
              <!-- <div class="wuliao-class">
                <div class="wuliao-title">出库总价(价税):</div>
                <div class="wuliao-value">
                  {{ data.sumPrice }}
                </div>
              </div>
              <div class="wuliao-class">
                <div class="wuliao-title">出库总价(不含税):</div>
                <div class="wuliao-value">
                  {{ data.sumPriceTax }}
                </div>
              </div> -->
              <div class="wuliao-class">
                <div class="wuliao-title">仓库名称:</div>
                <div class="wuliao-value">
                  {{ data.warehouseName }}
                </div>
              </div>
              <div class="wuliao-class">
                <div class="wuliao-title">会计明细:</div>
                <div class="wuliao-value">
                  {{ data.subjectName }}
                </div>
              </div>
              <!--              <div class="wuliao-class">-->
              <!--                <div class="wuliao-title">记账说明:</div>-->
              <!--                <div class="wuliao-value">-->
              <!--                  {{ data.remarkEntry }}-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="wuliao-class">
                <div class="wuliao-title">库区:</div>
                <div class="wuliao-value">
                  {{ data.areaName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nut-empty
      description="暂无数据"
      v-if="orderStore.choosedGoods?.length === 0"
    >
      <template #image>
        <image src="../../../../assets/images/empty.png" />
      </template>
    </nut-empty>

    <!-- 浮动按钮 -->
    <div
      class="floating-scan-button"
      @click="scanCode"
      v-if="
        orderStore.orderInfo.shipmentOrderStatus !== 3 &&
        currentPage.status !== ReceiptStatus.auditProcess
      "
    >
      <image
        class="icon-32"
        src="../../../../assets/images/in/s-scan.png"
      ></image>
      <text class="link">扫码添加</text>
    </div>
  </div>
</template>

<style scoped>
.relative-container {
  position: relative; /* 相对定位 */
  min-height: 100vh; /* 确保容器有足够的高度 */
  padding-bottom: 60px; /* 确保内容不会被按钮遮挡 */
}

.floating-scan-button {
  position: sticky; /* 绝对定位 */
  width: 100%;
  float: right;
  bottom: 20px; /* 距离底部20px */
  right: 20px; /* 距离右侧20px */
  z-index: 1000; /* 确保按钮在最上层 */
  background-color: #fff; /* 背景颜色 */
  border-radius: 40px; /* 圆形按钮 */
  padding: 10px; /* 内边距 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 阴影效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.floating-scan-button .icon-32 {
  width: 32px;
  height: 32px;
}

.floating-scan-button .link {
  margin-left: 10px;
  color: #007aff; /* 文字颜色 */
}
</style>
