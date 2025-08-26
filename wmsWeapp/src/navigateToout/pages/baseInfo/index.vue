<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { computed, reactive, ref, onBeforeMount } from "vue";
import {
  getLinkedOrders,
  saveOrder,
  submitOrder,
  invalidOutOrder,
  getShipmentOrderId,
} from "../../../api/navigateToout";
import { getdepartment } from "src/api/common";
import { useCodesStore } from "../../../stores/codes";
import { useOrderStore } from "../../../stores/order";
import { showNameByValue, increase } from "../../../utils/index";
import baseForm from "./components/baseForm.vue";
import countBoard from "./components/countBoard.vue";
import countBoard1 from "./components/countBoard1.vue";
import mingXi from "./components/mingXi.vue";
import mingXiOut from "./components/mingXiOut.vue";
import auditRecords from "src/components/AuditRecordout/index.vue";
import btnGroup from "./components/btnGroup.vue";
import detHead from "./components/detHead.vue";

const currentPage = getCurrentInstance().router?.params;
const disabled = computed(() =>
  ["30", "3", "2", "4"].includes(currentPage.status)
);
const outStatus = computed(() => ["30"].includes(currentPage.status));
const menuItems = [
  {
    name: "删除",
    key: "del",
  },
  {
    name: "修改",
    key: "edit",
  },
];
const show = ref(false);
const orderStore = useOrderStore();
const codesStore = useCodesStore();
const formRef = ref(null);
const activeTab = ref(1);
const hasNavigated = ref(false);
const editDoodInfo = reactive({
  data: "",
  index: "",
});

const initView = async () => {
  if (currentPage.id) {
    Taro.setNavigationBarTitle({
      title: "出库单据详情",
    });
  }
  ShipmentOrderId();
  // ShipmentOrderId("E-20250609141210-0");
};

const choose = (item) => {
  console.log(item);
  const choodedGoods = orderStore.choosedGoods;
  if (item.key === "del") {
    choodedGoods.splice(editDoodInfo.index, 1);
    orderStore.setChoosedGoods(choodedGoods);
  } else {
    orderStore.setCurrGoodsInfo(editDoodInfo.data);
    Taro.navigateTo({
      url: "/in/pages/calcPrice/index",
    });
  }
};

const handleParams = async () => {
  const formData = await formRef.value.validate(true);
  // 只有利润中心选择了总部才会有部门的值
  if (formData.profitcenter == "G001" || formData.profitcenter == "G008") {
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
    details: orderStore.choosedGoods.map((good) => ({
      warehouseId: good.warehouseId,
      areaId: good.areaId,
      chooseCount: good.chooseCount,
      count: good.count,
      itemId: good.itemId,
      itemName: good.itemName,
      itemUnit: good.itemUnit || good.unit,
      itemNo: good.itemNo,
      supplierName: good.supplierName,
      supplierId: good.supplierId,
      subjectName: good.subjectName,
      subject: good.subject,
      remarkEntry: good.remarkEntry || "",
    })),
    associatedOrders: formData.associatedOrders ? "1" : "0",
    usercode: currentPage.usercode,
  };
  return Promise.resolve(params);
};

const handelSave = async () => {
  const params = await handleParams();
  const res = await saveOrder(params);
  if (res === 1) {
    Taro.showModal({
      content: "保存成功",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/navigateToout/pages/query/index",
          });
        }
      },
    });
  }
};
const ShipmentOrderId = async () => {
  if (!currentPage.shipmentOrderNo || hasNavigated.value) return;

  const data = await getShipmentOrderId(currentPage.shipmentOrderNo);
  console.log(data);

  // 添加有效性验证和跳转控制
  if (data?.id && !hasNavigated.value) {
    hasNavigated.value = true;
    Taro.navigateTo({
      url: `/navigateToout/pages/baseInfo/index?id=${data.id}&type=${data.shipmentOrderType}&orderNo=${data.shipmentOrderNo}&status=${data.shipmentOrderStatus}&name=${data.createByName}&time=${data.createTime}&usercode=${currentPage.usercode}`,
    });
  }
};

const handleSubmit = async () => {
  if (orderStore.choosedGoods.length === 0) {
    Taro.showToast({
      title: "请添加物料",
      icon: "error",
    });
    return;
  }
  const params = await handleParams();
  const res = await submitOrder(params);
  if (res === 1) {
    Taro.showModal({
      content: "出库提交成功",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/navigateToout/pages/query/index",
          });
        }
      },
    });
  }
};
const handleDrop = async () => {
  const res = await invalidOutOrder(currentPage.id);
  if (res === 1) {
    Taro.showModal({
      content: "出库单已作废",
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: "/navigateToout/pages/query/index",
          });
        }
      },
    });
  }
};
const getDetail = (data, index) => {
  formRef.value.getDetails(currentPage.id);
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
      <nut-tab-pane title="出库明细" pane-key="2">
        <countBoard :outStatus="outStatus" />
        <!-- <countBoard1 /> -->
        <!-- <mingXiOut
          v-if="outStatus"
          :disabled="disabled"
          @getDetail="getDetail"
        />
        <mingXi v-else :disabled="disabled" /> -->
        <mingXi :disabled="disabled" :outStatus="outStatus" />
        <!-- <mingXiOut :disabled="disabled" @getDetail="getDetail" /> -->
      </nut-tab-pane>
      <nut-tab-pane title="审核记录" pane-key="3" v-if="currentPage.id">
        <auditRecords />
      </nut-tab-pane>
    </nut-tabs>
    <btnGroup
      v-if="!outStatus"
      @save="handelSave"
      @submit="handleSubmit"
      @del="handleDrop"
    />
  </div>
</template>

<style lang="scss">
@import "../../../assets//styles/in.scss";
.btn-wrapper .btn-primary2 {
  margin-bottom: 20px;
}
</style>
