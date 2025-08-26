<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { Search } from "@nutui/icons-vue-taro";
import {
  computed,
  reactive,
  ref,
  onBeforeMount,
  nextTick,
  onMounted,
} from "vue";
import { createOrderNo, getDatas, getSupplier, getDetId } from "src/api/common";
import { getOrders, getInCount, submitOrder, scanItemQrCode } from "src/api/in";
import { getOrderDetails, getLinkedOrders } from "src/api/out";
import { getdepartment } from "src/api/common";
import { showNameByValue, increase } from "src/utils/index";
import { useCodesStore } from "src/stores/codes";
import { useOrderStore } from "src/stores/order";
import FilterChoose from "src/components/FilterChoose/index.vue";
import { log } from "console";

interface Props {
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
const profitcenterName = ref("");
const profitCenterList = ref([]);
const departmentName = ref("");
const departmentList = ref([]);
const showDateSelecter = ref(false);
const showOrderSelecter = ref(false);
const showProfitSelecter = ref(false);
const showDeparSelecter = ref(false);
const showSecondSelect = ref(false);
const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
const codesStore = useCodesStore();
const labelWidth = "120px";

const popControl = reactive({
  showOrder: false,
});
/** 关联单号 */
const linkedOrderList = ref([]);
const formRef = ref(null);
const formData = ref({
  shipmentOrderNo: "",
  /** 出库名称 */
  shipmentOrderName: "",
  /** 出库类型 */
  shipmentOrderType: "",
  /** 是否关联订单 */
  associatedOrders: false,
  remark: "",
  /** 关联订单号 */
  orderNo: "",
  orderNoLast: [],
  warehouseId: "",
  /** 出库时间 */
  shipmentTime: "",
  /** 领料人 */
  picker: "",
  profitcenter: "",
  department: "",
});

const orderTypeChange = async (e) => {
  const index = e.detail.value;
  const info = codesStore.outOrderTypeList[index];
  const value = info.dictValue;
  formData.value.shipmentOrderType = value;
  if (value === "PICK_OUTBOUND") {
    formData.value.associatedOrders = true;
  }
  // 清空下关联单号信息
  if (formData.value.associatedOrders) {
    formData.value.orderNo = "";
    orderStore.setChoosedGoods([]);
  }
  customBlurValidate("shipmentOrderType");
};

/**
 * @description: 出库日期确认
 * @param {*} e
 * @return {*}
 */
const changeShipTime = (e) => {
  const date = e.detail.value;
  formData.value.shipmentTime = date;
  customBlurValidate("shipmentTime");
};

const confirmDate = (e) => {
  const date = e.selectedValue.join("-");
  formData.value.shipmentTime = date;
  showDateSelecter.value = false;
};

const confirmProfit = (e) => {
  const profit = e.selectedValue[0];
  formData.value.profitcenter = profit;
  showProfitSelecter.value = false;
  profitcenterName.value = showNameByValue(
    profit,
    codesStore.profitCenterList,
    "name",
    "code"
  );
};
const confirmDepar = (e) => {
  const depar = e.selectedValue[0];
  formData.value.department = depar;
  showDeparSelecter.value = false;
  departmentName.value = showNameByValue(
    depar,
    codesStore.departmentList,
    "name",
    "num"
  );
};

const confirmOrder = (e) => {
  const orderNo = e.selectedValue[0];
  formData.value.orderNo = orderNo;
  showOrderSelecter.value = false;
};

const orderNoChange = (e, n) => {
  if (e.selectedOptions[0].value != formData.value.orderNo) {
    orderStore.setChoosedGoods([]);
  }
};

const warehouseChange = async (e) => {
  const index = e.detail.value;
  const info = orderStore.warehouse[index];
  // 仓库id
  const value = info.id;
  formData.value.warehouseId = value;
  // 保存仓库id,后面添加物料查询的时候要用
  orderStore.setOrderInfo(formData.value);
  customBlurValidate("warehouseId");
  await codesStore.getProfitCenter({ warehouseId: value });
  if (codesStore.profitCenterList.length == 1) {
    if (
      codesStore.profitCenterList[0].code == "G001" ||
      codesStore.profitCenterList[0].code == "G008"
    ) {
      const departmentList = await getdepartment({
        profitCenterNum: codesStore.profitCenterList[0].code,
      });
      codesStore.setDepartmentList(departmentList);
      formData.value.department = "";
      showSecondSelect.value = true;
    } else {
      showSecondSelect.value = false;
    }
    formData.value.profitcenter = codesStore.profitCenterList[0].code;
    customBlurValidate("profitcenter");
  } else {
    formData.value.profitcenter = "";
  }
  // 清空单号及物料
  formData.value.orderNo = "";
  orderStore.setChoosedGoods([]);
  getOrderList(value);
};

const switchChange = () => {
  formData.value.associatedOrders = !formData.value.associatedOrders;
  nextTick(() => {
    if (!formData.value.associatedOrders) {
      formData.value.orderNo = "";
      orderStore.setChoosedGoods([]);
    }
    orderStore.setOrderInfo(formData.value);
    customBlurValidate("orderNo");
  });
};

/**
 * @description: 利润中心change
 * @param {*} e
 * @return {*}
 */
const profitCenterChange = async (e) => {
  const index = e.detail.value;
  const info = codesStore.profitCenterList[index];
  const value = info.code;
  if (value == "G001" || value == "G008") {
    const departmentList = await getdepartment({ profitCenterNum: value });
    codesStore.setDepartmentList(departmentList);
    showSecondSelect.value = true;
  } else {
    showSecondSelect.value = false;
  }
  formData.value.profitcenter = value;
  customBlurValidate("profitcenter");
};
/**
 * @description: 部门编号change
 * @param {*} e
 * @return {*}
 */
const departmentChange = (e) => {
  const index = e.detail.value;
  const info = codesStore.departmentList[index];

  const value = info.num;
  formData.value.department = value;
  customBlurValidate("department");
};

/**
 * @description: 查询关联单号、打开选择单号弹窗
 * @return {*}
 */
const handelLinkOrder = async () => {
  const res = await getLinkedOrders({
    shipmentOrderType: formData.value.shipmentOrderType,
    warehouseId: formData.value.warehouseId,
  });
  if (res?.length) {
    linkedOrderList.value = res.map((item) => ({
      label: item,
      value: item,
    }));
  }
  popControl.showOrder = true;
};
const getDetails = async (id) => {
  if (!id) return;
  const res = await getOrderDetails(id);
  // orderStore.orderInfo = {...res}
  if (res.profitcenter == "G001" || res.profitcenter == "G008") {
    const departmentList = await getdepartment({
      profitCenterNum: res.profitcenter,
    });
    codesStore.setDepartmentList(departmentList);
    showSecondSelect.value = true;
  }
  formData.value = {
    ...res,
    associatedOrders: res.associatedOrders === "1",
    invoiceType: (res.invoiceType || "").toString(),
    details: res.details,
  };
  orderStore.setChoosedGoods(formData.value.details);
  orderStore.setOrderInfo(formData.value);
  await codesStore.getProfitCenter({ warehouseId: res.warehouseId });
};
const initView = async () => {
  await orderStore.getCangKu();

  if (currentPage.id) {
    getDetails(currentPage.id);
  } else {
    // 创建出库单号
    const noRes = await createOrderNo("E");
    if (noRes) {
      formData.value.shipmentOrderNo = noRes.data;
    }
    // 默认第一个出库类型
    const first = codesStore.outOrderTypeList[0];
    if (first) {
      formData.value.shipmentOrderType = first.dictValue;
      orderStore.setOrderInfo(formData.value);
    }
  }
  if (!formData.value.warehouseId) {
    codesStore.setProfitCenter([]);
  }
  // 仓库数为1默认第一个仓库
  if (orderStore.warehouse.length == 1) {
    formData.value.warehouseId = orderStore.warehouse[0].id;
    // 保存仓库id,后面添加物料查询的时候要用
    orderStore.setOrderInfo(formData.value);
    await codesStore.getProfitCenter({
      warehouseId: orderStore.warehouse[0].id,
    });
    if (codesStore.profitCenterList.length == 1) {
      if (
        codesStore.profitCenterList[0].code == "G001" ||
        codesStore.profitCenterList[0].code == "G008"
      ) {
        const departmentList = await getdepartment({
          profitCenterNum: codesStore.profitCenterList[0].code,
        });
        codesStore.setDepartmentList(departmentList);
        formData.value.department = "";
        showSecondSelect.value = true;
      } else {
        showSecondSelect.value = false;
      }
      formData.value.profitcenter = codesStore.profitCenterList[0].code;
    } else {
      formData.value.profitcenter = "";
    }
    // 清空单号及物料
    formData.value.orderNo = "";
    orderStore.setChoosedGoods([]);
    getOrderList(orderStore.warehouse[0].id);
  }
};
const linkOrderConfirm = (data) => {
  formData.value.orderNo = data.value;
  formRef.value?.validate("orderNo");
};

// 失去焦点校验
const customBlurValidate = (prop) => {
  formRef.value?.validate(prop);
};

const validate = (submitFlag: string) => {
  return new Promise((resolve, reject) => {
    if (!submitFlag) {
      // 暂存
      if (!formData.value.warehouseId) {
        Taro.showToast({
          title: "请选择仓库",
          icon: "error",
        });
        reject(new Error());
      }
      resolve(formData.value);
    } else {
      formRef.value?.validate().then(({ valid, errors }) => {
        if (valid) {
          resolve(formData.value);
        } else {
          Taro.showToast({ title: errors[0].message, icon: "none" });
          console.warn("error:", errors);
          reject(new Error());
        }
      });
    }
  });
};

const getOrderList = (warehouseId) => {
  getLinkedOrders({
    shipmentOrderType: formData.value.shipmentOrderType,
    warehouseId: warehouseId,
  }).then((res) => {
    if (res) {
      const r = [];
      res.forEach((item) => {
        r.push({ text: item, value: item });
      });
      formData.value.orderNoLast = r;
      orderStore.setOrderNoLast(r);
    }
  });
};

const orderNoBlur = () => {
  const { orderNo, orderNoLast } = formData.value;
  if (orderNo !== orderNoLast) {
    // 单号变了清空物料
    orderStore.setChoosedGoods([]);
  }

  orderStore.setOrderInfo(formData.value);
  customBlurValidate("orderNo");

  formData.value.orderNoLast = formData.value.orderNo;
};

onBeforeMount(() => {
  initView();
});

useDidShow(() => {
  if (codesStore.profitCenterList) {
    codesStore.profitCenterList.forEach((item) => {
      profitCenterList.value.push({ text: item.name, value: item.num });
    });
  }
  if (codesStore.departmentList) {
    codesStore.departmentList.forEach((item) => {
      departmentList.value.push({ text: item.name, value: item.code });
    });
  }
  if (orderStore.orderInfo.orderNo) {
    formData.value.orderNo = orderStore.orderInfo.orderNo;
    // 打开关联订单状态
    // formData.value.associatedOrders = true
  }
});
defineExpose({
  validate,
  getDetails,
});
</script>
<template>
  <div class="pd-20">
    <div class="first-title">基础信息</div>
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item label="出库单据编号" required :label-width="labelWidth">
        <nut-input
          :disabled="true"
          v-model="formData.shipmentOrderNo"
          type="text"
          placeholder="请输入"
        ></nut-input>
      </nut-form-item>
      <nut-form-item
        label="事由"
        prop="shipmentOrderName"
        :label-width="labelWidth"
        :rules="[
          {
            required: true,
            message: '请输入事由',
          },
        ]"
      >
        <nut-input
          v-model="formData.shipmentOrderName"
          type="text"
          placeholder="请输入"
          :disabled="disabled"
          @blur="customBlurValidate('shipmentOrderName')"
        ></nut-input>
      </nut-form-item>
      <nut-form-item
        label="出库类型"
        prop="shipmentOrderType"
        :label-width="labelWidth"
      >
        <picker
          mode="selector"
          :range="codesStore.outOrderTypeList"
          :range-key="'dictLabel'"
          :disabled="disabled"
          @change="orderTypeChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.shipmentOrderType,
                codesStore.outOrderTypeList
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="出库日期"
        prop="shipmentTime"
        :rules="[
          {
            required: true,
            message: '请选择出库日期',
          },
        ]"
        :label-width="labelWidth"
      >
        <!-- <nut-input
          v-model="formData.shipmentTime"
          type="text"
          placeholder="请选择"
          @click="showDateSelecter = true"
          :disabled="disabled"
          :readonly="!disabled"
        ></nut-input> -->
        <!-- <nut-popup v-model:visible="showDateSelecter" position="bottom">
          <nut-date-picker
            v-model="selectDate"
            :three-dimensional="false"
            @cancel="showDateSelecter = false"
            @confirm="confirmDate"
          ></nut-date-picker>
        </nut-popup> -->

        <picker mode="date" @change="changeShipTime" :disabled="disabled">
          <div>{{ formData.shipmentTime || "请选择" }}</div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="仓库名称"
        prop="warehouseId"
        :rules="[
          {
            required: true,
            message: '请选择仓库名称',
          },
        ]"
        :label-width="labelWidth"
      >
        <picker
          mode="selector"
          :range="orderStore.warehouse"
          :range-key="'warehouseName'"
          :disabled="disabled"
          @change="warehouseChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.warehouseId,
                orderStore.warehouse,
                "warehouseName",
                "id"
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="领料人"
        prop="picker"
        :label-width="labelWidth"
        :rules="[
          {
            required: true,
            message: '请输入领料人名称',
          },
        ]"
      >
        <nut-input
          v-model="formData.picker"
          placeholder="请输入"
          :disabled="disabled"
          @blur="customBlurValidate('picker')"
        >
        </nut-input>
      </nut-form-item>
      <nut-form-item label="是否关联订单" :label-width="labelWidth">
        <nut-switch
          v-model="formData.associatedOrders"
          @tap="switchChange"
          :disabled="disabled"
        ></nut-switch>
      </nut-form-item>
      <nut-form-item
        v-show="formData.associatedOrders"
        label="关联订单号"
        prop="orderNo"
        :rules="[
          {
            required: formData.associatedOrders,
            message: '请填写关联单号',
          },
        ]"
        :label-width="labelWidth"
      >
        <nut-input
          v-model="formData.orderNo"
          type="text"
          placeholder="请选择"
          :disabled="disabled"
          :readonly="!disabled"
          @click="handelLinkOrder"
        ></nut-input>
      </nut-form-item>
      <nut-form-item
        label="利润中心"
        prop="profitcenter"
        :rules="[
          {
            required: true,
            message: '请选择利润中心',
          },
        ]"
        :label-width="labelWidth"
      >
        <picker
          mode="selector"
          :range="codesStore.profitCenterList"
          :range-key="'name'"
          :disabled="disabled"
          @change="profitCenterChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.profitcenter,
                codesStore.profitCenterList,
                "name",
                "code"
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <!-- <nut-form-item
        v-if="showSecondSelect"
        label="部门编号"
        prop="department"
        :rules="[
          {
            required: true,
            message: '请选择部门编号',
          },
        ]"
        :label-width="labelWidth"
      >
        <picker
          mode="selector"
          :range="codesStore.departmentList"
          :range-key="'name'"
          :disabled="disabled"
          @change="departmentChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.department,
                codesStore.departmentList,
                'name',
                'num'
              ) || '请选择'
            }}
          </div>
        </picker>
      </nut-form-item> -->
      <nut-form-item
        label="备注"
        :label-width="labelWidth"
        label-position="top"
      >
        <nut-textarea
          v-model="formData.remark"
          type="text"
          placeholder="请输入"
          :disabled="disabled"
          :max-length="45"
          :limit-show="true"
        ></nut-textarea>
      </nut-form-item>
    </nut-form>
    <FilterChoose
      v-model:visible="popControl.showOrder"
      :data="linkedOrderList"
      @confirm="linkOrderConfirm"
    />
  </div>
</template>
<style lang="scss">
.nut-textarea {
  border: 1px solid #e5e5e5;
}
</style>
