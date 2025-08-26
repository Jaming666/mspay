<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { computed, reactive, ref, onBeforeMount } from "vue";
import { ReceiptStatus } from "src/assets/code/common";
import {
  correctOrder,
  saveOrder,
  submitOrder,
  invalidOrder,
} from "../../../api/in";
import { getdepartment } from "../../../api/common";
import { useCodesStore } from "../../../stores/codes";
import { useOrderStore } from "../../../stores/order";
import { showNameByValue, increase } from "../../../utils/index";
import baseForm from "./components/baseForm.vue";
import countBoard from "./components/countBoard.vue";
import mingXi from "./components/mingXi.vue";
import auditRecords from "src/components/AuditRecord/index.vue";
import btnGroup from "./components/btnGroup.vue";
import detHead from "./components/detHead.vue";

const currentPage = getCurrentInstance().router?.params;
const disabled = computed(() =>
  [
    ReceiptStatus.complete,
    ReceiptStatus.auditProcess,
    ReceiptStatus.invalid,
  ].includes(currentPage.status)
);

const show = ref(false);
const orderStore = useOrderStore();
const codesStore = useCodesStore();
const formRef = ref(null);
const activeTab = ref(1);

const sumPrice = computed(() =>
  (orderStore.choosedGoods || []).reduce(
    (pre, curr) => increase(pre, Number(curr.sumPrice || 0)),
    0
  )
);
const sumPriceTax = computed(() =>
  (orderStore.choosedGoods || []).reduce(
    (pre, curr) => increase(pre, Number(curr.sumPriceTax || 0)),
    0
  )
);
const sumNum = computed(() =>
  (orderStore.choosedGoods || []).reduce(
    (pre, curr) => increase(pre, Number(curr.chooseCount || 0)),
    0
  )
);
const initView = async () => {
  if (currentPage.id) {
    Taro.setNavigationBarTitle({
      title: "入库单据详情",
    });
  }
};

const handleParams = async (validateFlag: boolean) => {
  const formData = await formRef.value.validate(validateFlag);
  // 只有利润中心选择了总部且入库类型是退库入库才会有部门的值
  if (
    (formData.profitcenter == "G001" || formData.profitcenter == "G008") &&
    formData.receiptOrderType == "RETURN_WAREHOUSING"
  ) {
    const departmentList = await getdepartment({
      profitCenterNum: formData.profitcenter,
    });
    codesStore.setDepartmentList(departmentList);
    formData.department = formData.department;
  } else {
    formData.department = "";
  }
  const params = {
    ...formData,
    details: (orderStore.choosedGoods || []).map((item) => ({
      ...item,
      warehouseId: formData.warehouseId,
    })),
    associatedOrders: formData.associatedOrders ? "1" : "0",
    sumPrice: sumPrice.value,
    sumPriceTax: sumPriceTax.value,
  };
  return Promise.resolve(params);
};

/**
 * @description: 暂存
 * @return {*}
 */
const handelSave = async () => {
  const params = await handleParams(false);
  const res = await saveOrder(params);
  if (res === 1) {
    Taro.showModal({
      content: "保存成功",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/in/pages/list/index",
          });
        }
      },
    });
  }
};

/**
 * @description: 提交
 * @return {*}
 */
const handleSubmit = async () => {
  if (orderStore.choosedGoods.length === 0) {
    Taro.showToast({
      title: "请添加物料",
      icon: "error",
    });
    return;
  }
  const params = await handleParams(true);
  const res = await submitOrder(params);
  if (res === 1) {
    Taro.showModal({
      content: "入库提交成功",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/in/pages/list/index",
          });
        }
      },
    });
  }
};

/**
 * @description: 作废
 * @return {*}
 */
const handleDrop = async () => {
  const formData = await formRef.value.validate();
  const res = await invalidOrder(formData);
  if (res === 1) {
    Taro.showModal({
      content: "入库单已作废",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/in/pages/list/index",
          });
        }
      },
    });
  }
};

/**
 * @description: 入库修正
 * @return {*}
 */
const handleCorrect = async () => {
  if (orderStore.choosedGoods.length === 0) {
    Taro.showToast({
      title: "请添加物料",
      icon: "error",
    });
    return;
  }
  const params = await handleParams(true);

  // priceTax-不含税价  invoiceType - 发票类型
  let isChanged = false;
  // 判断发票类型和含税价是否做了修改，没有修改不让提交
  const { details, invoiceType } = orderStore.originOrderInfo;
  // 比较是否修改了含税价
  // const isChangePriceTax = details.
  const isChangePriceTax = details.some((currValue, index) => {
    const goodData = params.details.find(
      (val) =>
        val.itemId === currValue.itemId && val.areaId === currValue.areaId
    );
    if (Number(currValue.priceTax) !== Number(goodData.priceTax)) {
      return true;
    }
    return false;
  });
  if (
    !isChangePriceTax &&
    invoiceType.toString() === params.invoiceType.toString()
  ) {
    Taro.showModal({
      content: "数据未修改无需提交修正申请",
      showCancel: false,
    });
    return;
  }

  const res = await correctOrder(params);
  if (res === 1) {
    Taro.showModal({
      content: "修正提交成功",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/in/pages/list/index",
          });
        }
      },
    });
  }
};

useDidShow(() => {
  initView();
});
onBeforeMount(async () => {});
</script>
<template>
  <div class="in-baseinfo-wrapper">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="单据信息" pane-key="1">
        <detHead v-if="currentPage.id" />
        <baseForm ref="formRef" :disabled="disabled" />
      </nut-tab-pane>
      <nut-tab-pane title="入库明细" pane-key="2">
        <countBoard />
        <mingXi />
      </nut-tab-pane>
      <nut-tab-pane title="审核记录" pane-key="3" v-if="currentPage.id">
        <auditRecords />
      </nut-tab-pane>
    </nut-tabs>
    <btnGroup
      @save="handelSave"
      @submit="handleSubmit"
      @del="handleDrop"
      @correct="handleCorrect"
      :showCorrect="activeTab === '2'"
    />
  </div>
</template>

<style lang="scss">
@import "../../../assets//styles/in.scss";
.btn-wrapper .btn-primary2 {
  margin-bottom: 20px;
}
.in-baseinfo-wrapper {
}
</style>
