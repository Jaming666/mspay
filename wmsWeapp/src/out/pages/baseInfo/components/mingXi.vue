<script setup lang="ts">
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { computed, reactive, ref } from "vue";
import { useOrderStore } from "src/stores/order";
import { getInfoByQrcode } from "../../../../api/goods";
require("../../../../assets/js/jem.js");
const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
// 2-待审核 3-已出库 4-已作废 30-已审批
const editDisabled = computed(() =>
  ["2", "3", "4", "30"].includes(currentPage.status)
);
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

const edit = (data, index, type: "edit" | "del") => {
  editDoodInfo.data = {
    ...data,
    unChooseCount: data.lastQuantity,
    quantity: data.lastQuantity,
  };
  editDoodInfo.index = index;
  choose({ key: type });
};

const choose = (item) => {
  const choodedGoods = orderStore.choosedGoods;
  if (item.key === "del") {
    choodedGoods.splice(editDoodInfo.index, 1);
    orderStore.setChoosedGoods(choodedGoods);
  } else {
    orderStore.setCurrGoodsInfo(editDoodInfo.data);
    Taro.navigateTo({
      url: "/out/pages/outCount/index?from=edit",
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
    url: "/out/pages/wuLiaoList/list",
  });
};

const queryItemInfo = (qrcode, warehouseId) => {
  getInfoByQrcode(qrcode, warehouseId).then((res) => {
    if (res) {
      const itemno = res.itemNo;
      Taro.navigateTo({
        url: "/out/pages/wuLiaoList/list?itemNo=" + res.itemNo,
      });
      // Taro.navigateTo({
      //   url: `/in/pages/scanRes/index?itemno=${itemno}&warehouseId=${warehouseId}&type=out`,
      // });
    } else {
      Taro.showToast({
        title: "请重新扫描或手动输入",
        icon: "none",
      });
    }
  });
};
const scanCode = () => {
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
          url: `/in/pages/scanRes/index?itemno=${itemno}&type=out`,
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
</script>
<template>
  <div class="pd-20">
    <div class="" v-if="!disabled">
      <!-- 2个就修改class为 grid-20 -->
      <div class="grid-20">
        <div
          @click="goPage('wuLiao')"
          class="pane-card justy-center align-center"
        >
          <image
            class="icon-32"
            src="../../../../assets/images/in/s-add.png"
          ></image>
          <text class="link">添加物料</text>
        </div>
        <div @click="scanCode()" class="pane-card justy-center align-center">
          <image
            class="icon-32"
            src="../../../../assets/images/in/s-scan.png"
          ></image>
          <text class="link">扫码添加</text>
        </div>
      </div>
    </div>

    <div class="first-title mtb-20">出库物料</div>

    <div class="">
      <div
        class="wuliao mb-20"
        v-for="(data, index) in orderStore.choosedGoods"
        :key="data.goodsId"
      >
        <div class="white-card">
          <div>
            <div class="wuliao-name" style="position: relative">
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
              <div v-if="!editDisabled" class="edit-btn">
                <nut-button
                  plain
                  type="primary"
                  size="mini"
                  @click="edit(data, index, 'edit')"
                >
                  修改
                </nut-button>
                <nut-button
                  plain
                  type="danger"
                  size="mini"
                  @click="edit(data, index, 'del')"
                >
                  删除
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
              <div class="wuliao-class" v-if="!props.outStatus">
                <div class="wuliao-title">出库数量:</div>
                <div class="wuliao-value">
                  {{ data.chooseCount }} {{ data.itemUnit }}
                </div>
              </div>
              <div class="wuliao-class" v-if="props.outStatus">
                <div class="wuliao-title">应出数量:</div>
                <div class="wuliao-value">
                  {{ data.chooseCount }} {{ data.itemUnit }}
                </div>
              </div>
              <div class="wuliao-class" v-if="props.outStatus">
                <div class="wuliao-title">实出数量:</div>
                <div class="wuliao-value">
                  {{ data.realOutQuantity }} {{ data.itemUnit }}
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
              <div class="wuliao-class">
                <div class="wuliao-title">记账说明:</div>
                <div class="wuliao-value">
                  {{ data.remarkEntry }}
                </div>
              </div>
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
  </div>
</template>
