<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { ReceiptStatus } from "src/assets/code/common";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { getAreaByWare } from "src/api/in";
import { useOrderStore } from "src/stores/order";
import { useCodesStore } from "src/stores/codes";
import { showNameByValue } from "src/utils";
import { getInfoByQrcode } from "../../../../api/goods";
require("../../../../assets/js/jem.js");
const codeStore = useCodesStore();
const orderStore = useOrderStore();
const currentPage = getCurrentInstance().router?.params;
const hideBtn = computed(() =>
  [
    ReceiptStatus.complete,
    ReceiptStatus.auditProcess,
    ReceiptStatus.invalid,
  ].includes(currentPage.status)
);

/** 以下情况不能编辑
 *  1、审批中 、 作废不能编辑
 *  2、已入库的单据 不是 采购入库的不能编辑(只有采购入库才能修正, 并且修正只能一次)
 */
const editDisabled = computed(() => {
  if (currentPage.status === ReceiptStatus.complete) {
    return !(
      currentPage.status === ReceiptStatus.complete &&
      currentPage.type === "PROCURE_WAREHOUSING" &&
      orderStore.orderInfo.correctTimes === 0 &&
      !orderStore.orderInfo.waveNo
    );
  }
  return [ReceiptStatus.auditProcess, ReceiptStatus.invalid].includes(
    currentPage.status
  );
});

const show = ref(false);
// 库区列表
const areaList = ref([]);
const editDoodInfo = reactive({
  data: "",
  index: "",
});

const getAreaList = async () => {
  const res = await getAreaByWare(orderStore.orderInfo.warehouseId);
  if (res?.content) {
    areaList.value = res.content;
  }
};

onMounted(() => {
  getAreaList();
});

const handleClick = (data, index, type: "edit" | "del") => {
  editDoodInfo.data = data;
  editDoodInfo.index = index;

  choose({ key: type });
};

const addWuLiap = (pageName: string) => {
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
      icon: "none",
    });
    return;
  }
  Taro.navigateTo({
    url: "/in/pages/wuLiaoList/list",
  });
};

const queryItemInfo = (qrcode, warehouseId) => {
  getInfoByQrcode(qrcode, warehouseId).then((res) => {
    if (res) {
      const itemno = res.itemNo;
      Taro.navigateTo({
        url: `/in/pages/scanRes/index?itemno=${itemno}&warehouseId=${warehouseId}&type=in`,
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
      icon: "none",
    });
    return;
  }

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
            queryItemInfo(res.resultStr, warehouseId);
          }
        },
      });
    }
  });

  /*wx.scanCode({
    success(res) {
      console.log(res)
      if (res?.result) {
        Taro.showToast({
          title: '扫描成功',
          icon: 'none',
        })
        const result = res.result
        const firstIndex = result.indexOf('-')
        const lastIndex = result.lastIndexOf('-')

        const itemno = result.substring(firstIndex + 1, lastIndex)
        Taro.navigateTo({
          url: `/in/pages/scanRes/index?itemno=${itemno}&type=in`,
        })
      } else {
        Taro.showToast({
          title: '请重新扫描或手动输入',
          icon: 'none',
        })
      }
    },
  })*/
};

const choose = (item) => {
  const choodedGoods = orderStore.choosedGoods;
  if (item.key === "del") {
    choodedGoods.splice(editDoodInfo.index, 1);
    orderStore.setChoosedGoods(choodedGoods);
  } else {
    orderStore.setCurrGoodsInfo(editDoodInfo.data);
    Taro.navigateTo({
      url: "/in/pages/calcPrice/index?from=edit",
    });
  }
};
</script>
<template>
  <div class="pd-20">
    <div v-if="!hideBtn" class="">
      <div class="grid-20">
        <div @click="addWuLiap()" class="pane-card justy-center align-center">
          <image
            class="icon-32"
            src="../../../../assets/images/in/s-add.png"
          ></image>
          <text class="link">添加物料</text>
        </div>
        <div @click="scanCode" class="pane-card justy-center align-center">
          <image
            class="icon-32"
            src="../../../../assets/images/in/s-scan.png"
          ></image>
          <text class="link">扫码添加</text>
        </div>
      </div>
    </div>

    <div class="first-title mtb-20">入库物料</div>

    <div class="">
      <div
        class="wuliao mb-20"
        v-for="(data, index) in orderStore.choosedGoods"
        :key="data.goodsId"
      >
        <div class="white-card">
          <div>
            <div class="wuliao-name">
              <div>{{ data.goodsName }}</div>
              <div class="edit-btn" v-if="!editDisabled">
                <nut-button
                  plain
                  type="primary"
                  size="mini"
                  @click="handleClick(data, index, 'edit')"
                >
                  修改
                </nut-button>
                <nut-button
                  plain
                  type="danger"
                  size="mini"
                  @click="handleClick(data, index, 'del')"
                >
                  删除
                </nut-button>
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">物料编码：</div>
              <div class="wuliao-value">
                {{ data.itemNo || data.itemId }}
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
                {{ data.itemTypeName }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">入库数量:</div>
              <div class="wuliao-value">
                {{ data.chooseCount }} {{ data.goodsUnit }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">库区:</div>
              <div class="wuliao-value">
                {{ showNameByValue(data.areaId, areaList, "areaName", "id") }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">货架库位:</div>
              <div class="wuliao-value">
                {{ data.rackStatus == 1 ? "" : data.rackName }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">会计明细:</div>
              <div class="wuliao-value">
                {{ data.subjectName }}
              </div>
            </div>
            <div class="wuliao-class">
              <div class="wuliao-title">记账说明:</div>
              <div class="wuliao-value">
                {{ data.remarkEntry }}
              </div>
            </div>
            <div class="second-card">
              <template
                v-if="
                  orderStore.orderInfo.receiptOrderType !== 'RETURN_WAREHOUSING'
                "
              >
                <div class="flex">
                  <div class="wuliao-class">
                    <div class="wuliao-title">入库单价(价税):</div>
                    <div class="wuliao-value">{{ data.price }}</div>
                  </div>
                </div>
                <div class="wuliao-class">
                  <div class="wuliao-title">入库总价(价税)：</div>
                  <div class="wuliao-value">{{ data.sumPrice }}</div>
                </div>
                <div class="wuliao-class">
                  <div class="wuliao-title">入库单价(不含税)：</div>
                  <div class="wuliao-value">{{ data.priceTax }}</div>
                </div>
                <div class="wuliao-class">
                  <div class="wuliao-title">入库总价(不含税)：</div>
                  <div class="wuliao-value">{{ data.sumPriceTax }}</div>
                </div>
              </template>
              <div class="wuliao-class">
                <div class="wuliao-title">发票类型：</div>
                <div class="wuliao-value">
                  {{
                    showNameByValue(
                      orderStore.orderInfo.invoiceType,
                      codeStore.invoiceType
                    )
                  }}
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
  </div>
</template>
