<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { Search } from "@nutui/icons-vue-taro";
import { computed, reactive, ref, onBeforeMount, nextTick } from "vue";
import { createOrderNo, getDatas, getSupplier, getDetId } from "src/api/common";
import {
  getOrders,
  getInCount,
  getCangKuList,
  submitOrder,
  scanItemQrCode,
  getReceiptDetails,
  getStorageRacksList,
} from "src/api/in";
import { getdepartment } from "src/api/common";
import { deepClone, showNameByValue, increase } from "src/utils/index";
import { useCodesStore } from "src/stores/codes";
import { useOrderStore } from "src/stores/order";
import { getInfoByQrcode } from "../../../../api/goods";

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
const showSecondSelect1 = ref(false);
const labelWidth = "120px";
const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
const codesStore = useCodesStore();
/** 供应商 */
const supplierList = ref([]);
const formRef = ref(null);
const formData = ref({
  receiptOrderNo: "",
  /** 入库名称 */
  receiptOrderName: "",
  invoiceType: "2",
  receiptOrderType: "",
  /** 是否关联订单 */
  associatedOrders: true,
  remark: "",
  orderNo: "",
  orderNoLast: [],
  warehouseId: "",
  receiptTime: "",
  profitcenter: "",
  department: "",
});

const orderTypeChange = async (e) => {
  const index = e.detail.value;
  const info = codesStore.receiptOrderTypeData[index];
  const value = info.dictValue;
  if (value == "RETURN_WAREHOUSING") {
    showSecondSelect1.value = true;
  } else {
    showSecondSelect1.value = false;
  }
  if (value == "PROCURE_WAREHOUSING") {
    formData.value.associatedOrders = true;
  }

  formData.value.receiptOrderType = value;

  // 清空下关联单号信息
  if (formData.value.associatedOrders) {
    formData.value.orderNo = "";
    orderStore.setChoosedGoods([]);
  }

  // 保存入库类型后面关联订单要用
  orderStore.setOrderInfo(formData.value);
};

/**
 * @description: 入库日期确认
 * @param {*} e
 * @return {*}
 */
const changeReceiptTime = (e) => {
  const date = e.detail.value;
  formData.value.receiptTime = date;
  customBlurValidate("receiptTime");
};
const selectDate = ref(new Date());
const selectOrder = ref();
const selectProfit = ref();
const confirmDate = (e) => {
  const date = e.selectedValue.join("-");
  formData.value.receiptTime = date;
  showDateSelecter.value = false;
};

const confirmOrder = (e) => {
  const orderNo = e.selectedValue[0];
  formData.value.orderNo = orderNo;
  showOrderSelecter.value = false;
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

const orderNoChange = (e, n) => {
  if (e.selectedOptions[0].value != formData.value.orderNo) {
    orderStore.setChoosedGoods([]);
  }
};
const warehouseChange = async (e) => {
  const index = e.detail.value;
  const info = orderStore.warehouse1[index];

  // 仓库id
  const value = info.id;
  formData.value.warehouseId = value;
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
  // 不是从采购订单来的再清空单号
  if (currentPage.from !== "purchase") {
    // 清空关联单号，清空物料
    formData.value.orderNo = "";
    orderStore.setChoosedGoods([]);
  }
  // 保存仓库id,后面添加物料查询的时候要用
  orderStore.setOrderInfo(formData.value);
  customBlurValidate("warehouseId");

  customBlurValidate("orderNo");

  getOrderList(value);

  getStorageRacks(value);
};

const getStorageRacks = (warehouseId) => {
  getStorageRacksList({ warehouseId }).then((res) => {
    if (res) {
      // 按库区id分组
      orderStore.racksList = {};
      if (res.length > 0) {
        res.forEach((item) => {
          if (!orderStore.racksList[item.areaId]) {
            orderStore.racksList[item.areaId] = [];
          }
          orderStore.racksList[item.areaId].push(item);
        });
        // 遍历orderStore.racksList
        for (const key in orderStore.racksList) {
          let areaId = "";
          if (orderStore.racksList[key].length > 0) {
            areaId = orderStore.racksList[key][0].areaId;
          }
          orderStore.racksList[key].unshift({
            areaId: areaId,
            text: "请选择",
            value: "",
            children: [],
          });
        }
      }
    }
  });
};

const getOrderList = (warehouseId) => {
  getOrders(formData.value.receiptOrderType, warehouseId).then((res) => {
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

const supplierChange = (e) => {
  const index = e.detail.value;
  const info = supplierList.value[index];
  // 供应商id
  const value = info.id;
  formData.value.supplierId = value;
  customBlurValidate("supplierId");
};
const switchChange = () => {
  formData.value.associatedOrders = !formData.value.associatedOrders;
  nextTick(() => {
    if (!formData.value.associatedOrders) {
      formData.value.orderNo = "";
      // 单号变了清空物料
      orderStore.setChoosedGoods([]);
    }
    customBlurValidate("orderNo");
    orderStore.setOrderInfo(formData.value);
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
const goPage = (pageName: string) => {
  const url = {
    wuLiao: "/in/pages/wuLiaoList/list",
    linkedOrder: "/in/pages/linkedOrder/index",
  };
  orderStore.setOrderInfo(formData.value);

  Taro.navigateTo({
    url: url[pageName],
  });
};

const handelLinkOrder = () => {
  if (!formData.value.associatedOrders) return;
  // 打开关联订单前 入库类型 仓库必填
  if (!formData.value.warehouseId) {
    Taro.showToast({
      title: "请选择仓库",
      icon: "none",
    });
    return;
  }
  if (!formData.value.receiptOrderType) {
    Taro.showToast({
      title: "请选择入库类型",
      icon: "none",
    });
    return;
  }
  goPage("linkedOrder");
};

const getDetails = async () => {
  if (!currentPage.id) return;
  const res = await getReceiptDetails(currentPage.id);
  if (res.profitcenter == "G001" || res.profitcenter == "G008") {
    const departmentList = await getdepartment({
      profitCenterNum: res.profitcenter,
    });
    codesStore.setDepartmentList(departmentList);
    showSecondSelect.value = true;
  }
  if (res.receiptOrderType == "RETURN_WAREHOUSING") {
    showSecondSelect1.value = true;
  }
  formData.value = {
    ...res,
    associatedOrders: res.associatedOrders === "1",
    invoiceType: (res.invoiceType || "").toString(),
    details: res.details,
    orderNoLast: [],
  };
  orderStore.setOrderInfo(formData.value);
  orderStore.setOriginData(deepClone(formData.value));
  orderStore.setChoosedGoods(res.details);
  await codesStore.getProfitCenter({ warehouseId: res.warehouseId });
  getStorageRacks(res.warehouseId);
};

const initView = async () => {
  const resSupplier = await getSupplier();
  if (resSupplier) {
    supplierList.value = resSupplier.content;
  }

  await orderStore.getCangKu1();

  if (currentPage.id) {
    getDetails();
  } else {
    // 创建入库单号
    const noRes = await createOrderNo("R");
    if (noRes) {
      formData.value.receiptOrderNo = noRes.data;
    }
    // 默认第一个入库类型
    const first = codesStore.receiptOrderTypeData[0];
    if (first) {
      formData.value.receiptOrderType = first.dictValue;
    }
  }
  if (!formData.value.warehouseId) {
    codesStore.setProfitCenter([]);
  }
  // 仓库数为1默认第一个仓库
  if (orderStore.warehouse1.length == 1) {
    formData.value.warehouseId = orderStore.warehouse1[0].id;
    await codesStore.getProfitCenter({
      warehouseId: orderStore.warehouse1[0].id,
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
      customBlurValidate("profitcenter");
    } else {
      formData.value.profitcenter = "";
    }
    // 不是从采购订单来的再清空单号
    if (currentPage.from !== "purchase") {
      // 清空关联单号，清空物料
      formData.value.orderNo = "";
      orderStore.setChoosedGoods([]);
    }
    // 保存仓库id,后面添加物料查询的时候要用
    orderStore.setOrderInfo(formData.value);
    customBlurValidate("warehouseId");

    customBlurValidate("orderNo");

    getOrderList(orderStore.warehouse1[0].id);
  }
  orderStore.setOrderInfo(formData.value);
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

const orderNoBlur = () => {
  const { orderNo, orderNoLast } = formData.value;
  if (orderNo !== orderNoLast) {
    // 单号变了清空物料
    orderStore.setChoosedGoods([]);
  }

  orderStore.setOrderInfo(formData.value);
  customBlurValidate("orderNo");

  formData.value.orderNoLast = [];
};

onBeforeMount(() => {
  initView();
});
useDidShow(() => {
  if (codesStore.profitCenterList) {
    codesStore.profitCenterList.forEach((item) => {
      profitCenterList.value.push({ text: item.name, value: item.code });
    });
  }
  if (codesStore.departmentList) {
    codesStore.departmentList.forEach((item) => {
      departmentList.value.push({ text: item.name, value: item.code });
    });
  }
  if (orderStore.orderInfo.orderNo) {
    formData.value.orderNo = orderStore.orderInfo.orderNo;
    customBlurValidate("orderNo");

    /*const { orderNo, orderNoLast } = formData.value
    if (orderNo !== orderNoLast) {
      // 单号变了清空物料
      orderStore.setChoosedGoods([])
      formData.value.orderNoLast = orderStore.orderNoLast
    }*/
  }
});
defineExpose({
  validate,
});
</script>
<template>
  <div class="pd-20">
    <div class="first-title">基础信息</div>
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item label="入库单据编号" required :label-width="labelWidth">
        <div>{{ formData.receiptOrderNo }}</div>
      </nut-form-item>
      <nut-form-item
        label="事由"
        prop="receiptOrderName"
        :rules="[
          {
            required: true,
            message: '请输入事由',
          },
        ]"
        :label-width="labelWidth"
      >
        <nut-input
          v-model="formData.receiptOrderName"
          type="text"
          placeholder="请输入"
          :disabled="disabled"
          @blur="customBlurValidate('receiptOrderName')"
        ></nut-input>
      </nut-form-item>
      <nut-form-item
        label="入库类型"
        prop="receiptOrderTypeData"
        :label-width="labelWidth"
      >
        <picker
          mode="selector"
          :range="codesStore.receiptOrderTypeData"
          :range-key="'dictLabel'"
          :disabled="disabled"
          @change="orderTypeChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.receiptOrderType,
                codesStore.receiptOrderTypeData
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="入库日期"
        prop="receiptTime"
        :rules="[
          {
            required: true,
            message: '请选择入库日期',
          },
        ]"
        :label-width="labelWidth"
      >
        <picker mode="date" @change="changeReceiptTime" :disabled="disabled">
          <div>{{ formData.receiptTime || "请选择" }}</div>
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
          :range="orderStore.warehouse1"
          :range-key="'warehouseName'"
          :disabled="disabled"
          @change="warehouseChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.warehouseId,
                orderStore.warehouse1,
                "warehouseName",
                "id"
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item label="是否关联订单" :label-width="labelWidth">
        <nut-switch
          :disabled="
            formData.receiptOrderType == 'PROCURE_WAREHOUSING' ? true : false
          "
          v-model="formData.associatedOrders"
          @tap="switchChange"
        ></nut-switch>
      </nut-form-item>
      <nut-form-item
        v-if="formData.associatedOrders"
        label="关联订单号"
        prop="orderNo"
        :rules="[
          {
            required: true,
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
      <!-- <nut-form-item
        label="库管员名称"
        :label-width="labelWidth"
      >
        <input :value="formData.wareManageName + ' | ' + formData." type="text">
      </nut-form-item> -->
      <nut-form-item
        label="发票类型"
        prop="invoiceType"
        :rules="[
          {
            required: true,
            message: '请选择发票类型',
          },
        ]"
        :label-width="labelWidth"
        v-if="!showSecondSelect1"
      >
        <nut-radio-group v-model="formData.invoiceType" direction="horizontal">
          <nut-radio
            v-for="item in codesStore.invoiceType"
            :key="item.dictValue"
            :label="item.dictValue"
            :disabled="disabled"
          >
            {{ item.dictLabel }}
          </nut-radio>
        </nut-radio-group>
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
        v-if="showSecondSelect && showSecondSelect1"
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
  </div>
</template>
<style lang="scss">
.nut-textarea {
  border: 1px solid #e5e5e5;
}
</style>
