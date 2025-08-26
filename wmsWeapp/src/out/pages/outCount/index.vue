<script setup>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { ref, onBeforeMount } from "vue";
import { useOrderStore } from "../../../stores/order";
import { useCodesStore } from "../../../stores/codes";
import {
  getAreaByWare,
  scanItemQrCode,
  getSubject,
  getRemarkEntry,
} from "../../../api/in";
import { getSupplier } from "../../../api/out";
import { getdepartment } from "src/api/common";
import { showNameByValue, toPrecision } from "src/utils/index";
import wuLiao from "src/components/WuLiao/index.vue";

const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
const codesStore = useCodesStore();

const formData = ref({});
const formRef = ref(null);
const labelWidth = "140px";

// 库区列表
const areaList = ref([]);
// 会计科目列表
const deptOptionsList = ref([]);
// 记账说明列表
const accountsList = ref([]);
// 供应商列表
const SuppliertList = ref([]);
// 利润中心是否为总部
const showSecondSelect = ref(false);
/** 是否可修改库区 */
const areaDisabled = ref(false);

const getAreaList = async () => {
  const res = await getAreaByWare(orderStore.orderInfo.warehouseId);
  if (res?.content) {
    areaList.value = res.content;
  }
};
const getSubjectList = async () => {
  const res = await getSubject({ level: 1 });
  deptOptionsList.value = res;
};
// 获取供应商列表
const getSuppliertList = async () => {
  const res = await getSupplier();
  SuppliertList.value = res;
};
const getRemarkEntryList = async () => {
  const res = await getRemarkEntry();
  if (res?.data) {
    accountsList.value = res.data;
  }
  accountsList.value.unshift({ dictLabel: "请选择" });
};

/**
 * @description: 查询当前库存数
 * @return {*}
 */
const getCount = async () => {
  const res = await scanItemQrCode({
    itemno: orderStore.currGoodsInfo.itemNo,
  });
  if (res) {
    // formData.value.quantity = res.warecanusecount
    formData.value.itemTypeNameCascade = res.itemTypeName;
  }
};

const areaChange = (e) => {
  const index = e.detail.value;
  const info = areaList.value[index];
  const value = info.id;

  formData.value.areaId = value;
  formData.value.areaName = showNameByValue(
    value,
    areaList.value,
    "areaName",
    "id"
  );
  cusValite("areaId");
};

const supplierChage = (e) => {
  const index = e.detail.value;
  const info = SuppliertList.value[index];
  const value = info.id;

  formData.value.supplierId = value;
  cusValite("supplierId");
};
const subjectChange = (e) => {
  const index = e.detail.value;
  const info = deptOptionsList.value[index];
  const value = info.itemTypeId;
  if (showSecondSelect.value) {
    if (value == 1 || value == 3 || value == 6) {
      formData.value.remarkEntry = "管理类-管理费用";
    }
  }
  formData.value.subject = value;
  formData.value.subjectName = showNameByValue(
    value,
    deptOptionsList.value,
    "typeName",
    "itemTypeId"
  );
  cusValite("subject");
};
const remarkEntryChange = (e) => {
  const index = e.detail.value;
  const info = accountsList.value[index];
  const value = info.dictLabel;

  formData.value.remarkEntry = value;
  cusValite("remarkEntry");
};

/**
 * @description: 出库数量校验
 * @return {*}
 */
const countValidator = () => {
  const { chooseCount, lastQuantity, unChooseCount } = formData.value;

  // 可选数量
  const canUseCount = showCount();
  if (Number(chooseCount) > Number(canUseCount)) {
    return Promise.reject(`出库数量不能大于可选数量`);
  }

  if (Number(chooseCount) === 0) {
    return Promise.reject(`出库数量不能为0`);
  }
  return Promise.resolve();
};

const showCount = () => {
  // 盘亏出库关联订单使用 unChooseCount
  const { associatedOrders, shipmentOrderType } = orderStore.orderInfo;

  if (shipmentOrderType === "INVENTORY_LOSS_OUTBOUND" && associatedOrders) {
    return formData.value.unChooseCount;
  }
  if (shipmentOrderType == "PICK_OUTBOUND") {
    return formData.value.unChooseCount;
  }
  return formData.value.lastQuantity;
};

const cusValite = (prop) => {
  formRef.value?.validate(prop);
};
const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      // 出库物料要用物料id\库区id一直判断是否已添加过
      const findeIndex = orderStore.choosedGoods.findIndex(
        (val) =>
          val.itemId === formData.value.itemId &&
          val.areaId === formData.value.areaId
      );
      if (findeIndex > -1) {
        orderStore.setChoosedGoodsByIndex(formData.value, findeIndex);
      } else {
        orderStore.setChoosedGoods([
          ...orderStore.choosedGoods,
          formData.value,
        ]);
      }
      const pages = Taro.getCurrentPages();
      const lastPage = pages[pages.length - 2].route;
      Taro.navigateBack({
        delta: lastPage.includes("baseInfo") ? 1 : 2,
      });
    } else {
      console.warn("error:", errors);
    }
  });
};

onBeforeMount(async () => {
  if (
    orderStore.orderInfo.profitcenter == "G001" ||
    orderStore.orderInfo.profitcenter == "G008"
  ) {
    const departmentList = await getdepartment({
      profitCenterNum: orderStore.orderInfo.profitcenter,
    });
    codesStore.setDepartmentList(departmentList);
    showSecondSelect.value = true;
    if (
      orderStore.currGoodsInfo.subject == 1 ||
      orderStore.currGoodsInfo.subject == 3 ||
      orderStore.currGoodsInfo.subject == 6
    ) {
      orderStore.currGoodsInfo.remarkEntry = "管理类-管理费用";
    } else {
      orderStore.currGoodsInfo.remarkEntry =
        orderStore.currGoodsInfo.remarkEntry || "";
    }
  }

  /** 编辑物料的时候不能修改库区
   */
  areaDisabled.value = currentPage.from === "edit";
  formData.value = orderStore.currGoodsInfo;
  // 入库撤销的出库数量不能自己填，入库单里的数量是多少就多少
  if (orderStore.orderInfo.shipmentOrderType == "PICK_OUTBOUND") {
    formData.value.chooseCount = orderStore.currGoodsInfo.unChooseCount;
    areaDisabled.value = true;
  } else {
    formData.value.chooseCount = !formData.value.chooseCount
      ? 1
      : formData.value.chooseCount;
  }

  getAreaList();
  getSubjectList();
  getRemarkEntryList();
  getSuppliertList();
  getCount();
});
</script>
<template>
  <div class="calc-wrapper">
    <wuLiao
      :data="orderStore.currGoodsInfo"
      :page-type="'det'"
      :showBtn="false"
    />
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item label="单位" :labelWidth="labelWidth">
        <nut-input :disabled="true" v-model="formData.itemUnit" />
      </nut-form-item>
      <nut-form-item label="当前库存数" :labelWidth="labelWidth">
        <nut-input :disabled="true" v-model="formData.quantity" />
      </nut-form-item>
      <nut-form-item label="可选数量" :labelWidth="labelWidth">
        <input :disabled="true" :value="showCount()" />
      </nut-form-item>
      <nut-form-item
        label="供应商"
        :labelWidth="labelWidth"
        v-if="formData.supplierName"
      >
        <nut-input :disabled="true" v-model="formData.supplierName" />
      </nut-form-item>
      <nut-form-item
        v-if="!formData.supplierName"
        label="供应商"
        prop="supplierId"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: true,
            message: '请选择供应商',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="SuppliertList"
          :range-key="'supplierName'"
          @change="supplierChage"
        >
          <input
            :value="
              showNameByValue(
                formData.supplierId,
                SuppliertList,
                'supplierName',
                'id'
              )
            "
            placeholder="请选择"
          />
        </picker>
      </nut-form-item>
      <nut-form-item
        label="出库库区"
        prop="areaId"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: true,
            message: '请填写出库库区',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="areaList"
          :range-key="'areaName'"
          :disabled="areaDisabled"
          @change="areaChange"
        >
          <div>{{ formData.areaName || "请选择" }}</div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="会计科目"
        prop="subject"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: true,
            message: '请选择会计科目',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="deptOptionsList"
          :range-key="'typeName'"
          @change="subjectChange"
          :disabled="true"
        >
          <div style="color: #000">
            {{ formData.subjectName || "请选择" }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="记账说明"
        prop="remarkEntry"
        :labelWidth="labelWidth"
        :rules="
          formData.subject == '6' && !showSecondSelect
            ? [
                {
                  required: true,
                  message: '请选择记账说明',
                  trigger: 'change',
                },
              ]
            : [
                {
                  required: false,
                  message: '请选择记账说明',
                  trigger: 'change',
                },
              ]
        "
      >
        <picker
          mode="selector"
          :range="accountsList"
          :range-key="'dictLabel'"
          @change="remarkEntryChange"
        >
          <div style="color: #000">
            {{ formData.remarkEntry || "请选择" }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="出库数量"
        :labelWidth="labelWidth"
        prop="chooseCount"
        :rules="[
          {
            required: true,
            message: '填写出库数量',
          },
          {
            validator: countValidator,
          },
        ]"
      >
        <nut-input
          v-model="formData.chooseCount"
          placeholder="请输入"
          type="number"
          :disabled="
            orderStore.orderInfo.shipmentOrderType == 'PICK_OUTBOUND'
              ? true
              : false
          "
          @blur="cusValite('chooseCount')"
        />
      </nut-form-item>
    </nut-form>
    <div class="btn-primary" @click="submit">确认提交</div>
  </div>
</template>
<style lang="scss">
@import "../../../assets/styles/common.scss";
</style>
