<script setup>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { computed, ref, onBeforeMount } from "vue";
import { useOrderStore } from "../../../stores/order";
import { useCodesStore } from "src/stores/codes";
import {
  getAreaByWare,
  scanItemQrCode,
  getSubject,
  getRemarkEntry,
} from "../../../api/in";
import { getdepartment } from "src/api/common";
import { increase, toPrecision, showNameByValue, minus } from "src/utils/index";
import wuLiao from "src/components/WuLiao/index.vue";

const showAreaSelecter = ref(false);
const showAreaSelecter1 = ref(false);
const showAreaSelecter2 = ref(false);
const areaName = ref("");
const orderStore = useOrderStore();
const codesStore = useOrderStore();
const currentPage = getCurrentInstance().router?.params;
/** 只能修改金额的限制 */
const editLimit = computed(() =>
  ["3"].includes((orderStore.orderInfo.receiptOrderStatus || "").toString())
);
/** 是否展示可选数量 */
const showNum = ref(false);
/** 是否可修改库区 */
const areaDisabled = ref(false);
const formRef = ref(null);
const formData = ref({ rackName: "", rack: [] });
const labelWidth = "140px";
// 库区列表
const areaList = ref([]);
const showLocation = ref(false);
// 货架列表
const racksList = ref([
  {
    text: "江苏",
    value: "Jiangsu",
    children: [
      {
        text: "南京",
        value: "Nanjing",
        children: [
          { text: "栖霞区", value: "Qixia" },
          { text: "鼓楼区", value: "Gulou" },
        ],
      },
      {
        text: "苏州",
        value: "Suzhou",
        children: [
          { text: "姑苏区", value: "Gusu" },
          { text: "吴江区", value: "Wujiang" },
        ],
      },
    ],
  },
  {
    text: "北京",
    value: "Beijing",
    children: [
      {
        text: "大兴",
        value: "Daxing",
        children: [
          { text: "经海路", value: "Jinghai" },
          { text: "科创路", value: "Kechuang" },
        ],
      },
      {
        text: "海淀",
        value: "Haidian",
        children: [
          { text: "中关村", value: "Zhongguancun" },
          { text: "苏州桥", value: "Suzhouqiao" },
        ],
      },
    ],
  },
]);
// 会计科目列表
const deptOptionsList = ref([]);
// 记账说明列表
const accountsList = ref([]);
// 利润中心是否为总部
const showSecondSelect = ref(false);
// 入库方式是否为退库入库
const showSecondSelect1 = ref(false);

const confirmLocation = ({ selectedValue, selectedOptions }) => {
  if (selectedValue[0] !== "") {
    formData.value.racksId = selectedValue[0];
    formData.value.layerId = selectedValue[1];
    formData.value.locationId = selectedValue[2];
    const layer = selectedOptions[1].text.replace(/第|层/g, "");
    const location = selectedOptions[2].text.replace(/号/g, "");
    formData.value.rackName =
      selectedOptions[0].text + "-" + layer + "-" + location;
  } else {
    formData.value.racksId = "";
    formData.value.layerId = "";
    formData.value.locationId = "";
    formData.value.rackName = selectedOptions[0].text;
  }
  showLocation.value = false;
};
const getAreaList = async () => {
  const res = await getAreaByWare(orderStore.orderInfo.warehouseId);
  if (res?.content) {
    areaList.value = res.content;
    // 遍历返回的内容，查找areaName等于 "默认库区" 的项
    const defaultArea = res.content.find(
      (item) => item.areaName === "默认库区"
    );
    // 如果找到了匹配的项，则将其id赋值给formData.value.areaId
    if (defaultArea) {
      formData.value.areaId = defaultArea.id;
    }
    // if (res.content.length === 1) {
    //   // 如果没有找到匹配的项，但返回的内容只有一个项，则将该项的 id 赋值给 formData.value.areaId
    //   formData.value.areaId = res.content[0].id;
    // }
  }
};
const getSubjectList = async () => {
  const res = await getSubject({ level: 1 });
  deptOptionsList.value = [
    ...res.map((item) => ({ text: item.typeName, value: item.itemTypeId })),
  ];
};
const getRemarkEntryList = async () => {
  const res = await getRemarkEntry();
  if (res?.data) {
    accountsList.value = [
      { text: "请选择", value: "" },
      ...res.data.map((item) => ({
        text: item.dictLabel,
        value: item.dictLabel,
      })),
    ];
  }
};

const areaChange = (e) => {
  const index = e.detail.value;
  const info = areaList.value[index];
  const value = info.id;

  formData.value.areaId = value;
  cusValite("areaId");
};
const subjectChange = (e) => {
  const data = deptOptionsList.value[e.detail.value];
  const value = data.value;
  showAreaSelecter1.value = false;
  if (showSecondSelect.value && showSecondSelect1.value) {
    if (value == 1 || value == 3 || value == 6) {
      formData.value.remarkEntry = "管理类-管理费用";
    }
  }
  formData.value.subject = value;
  formData.value.subjectName = data.text;
  cusValite("subject");
};
const remarkEntryChange = (e) => {
  const index = e.detail.value;
  formData.value.remarkEntry = accountsList.value[index].value;
  cusValite("remarkEntry");
};

const confirmArea = (e) => {
  const areaId = e.selectedValue[0];
  formData.value.areaId = areaId;
  showAreaSelecter.value = false;
  areaName.value = showNameByValue(areaId, areaList.value, "text", "value");
};

/**
 * @description: 由单价计算总价及不含税相关价额
 * @param {*} price
 * @param {*} count
 * @param {*} calcFlag 是否计算不含税价格 默认false不计算
 * @return {*}
 */
const calcSumPrice = (price, count, calcFlag = false) => {
  if (!price && price !== 0) return;
  // 小数点位数
  let pre = ((price || 0).toString().split(".")[1] || "0").length;
  if (pre === void 0 || pre < 2) pre = 2;

  // 扩大
  const precisionFactor = 10 ** pre;

  // 含税价保留两位小数
  const sumPrice = toPrecision(
    (price * precisionFactor * count) / precisionFactor,
    2
  );

  formData.value.sumPrice = sumPrice;

  if (calcFlag) {
    // 不含税单价
    formData.value.priceTax = toPrecision(
      (price * precisionFactor) / (precisionFactor * 1.13),
      8
    );
  }

  // 不含税总价 保留两位小数
  formData.value.sumPriceTax = toPrecision(
    (formData.value.priceTax * precisionFactor * count) / precisionFactor,
    2
  );
  cusValite("chooseCount");
};

/**
 * @description: 由含税总价反推其他
 * @param {*} sumprice
 * @param {*} count
 * @return {*}
 */
const calcPrice = (sumprice, count) => {
  if (!sumprice) return;

  // 小数点位数
  let pre = ((sumprice || 0).toString().split(".")[1] || "0").length;
  if (pre === void 0 || pre < 2) pre = 2;

  // 扩大
  const precisionFactor = 10 ** pre;

  formData.value.price = toPrecision(
    (sumprice * precisionFactor) / (count * precisionFactor),
    8
  );
};

/**
 * @description: 由不含税价计算其他价格
 * @param {*} priceNoTax
 * @param {*} count
 * @return {*}
 */
const calcPriceTax = (priceNoTax, count) => {
  if (!priceNoTax && priceNoTax !== 0) return;

  // 小数点位数
  let pre = ((priceNoTax || 0).toString().split(".")[1] || "0").length;
  if (pre === void 0) pre = 2;

  // 扩大
  const precisionFactor = 10 ** pre;

  // 计算不含税总价
  formData.value.sumPriceTax = toPrecision(
    (priceNoTax * precisionFactor * count) / precisionFactor,
    2
  );

  /* // 不是修正页面时同步计算含税单价及含税总价
  if (!editLimit.value) {
    // 含税价
    let price = toPrecision(
      (priceNoTax * precisionFactor * 1.13) / precisionFactor,
      8
    )

    formData.value.price = price
    // 含税总价
    formData.value.sumPrice = toPrecision(
      (price * precisionFactor * formData.value.chooseCount) / precisionFactor,
      8
    )
  } */
  cusValite("priceTax");
};

// /**
//  * @description: 由不含税总价反推不含税单价，及含税单价，及含税总价, 不是修正的时候才同步计算含税价
//  * @param {*} sumprice
//  * @param {*} count
//  * @return {*}\
//  */
// const calcPriceTaxBySum = (sumprice, count) => {
//   if (!sumprice) return

//   // 小数点位数
//   let pre = ((sumprice || 0).toString().split('.')[1] || '0').length
//   if (pre === void 0 || pre < 2) pre = 2

//   // 扩大
//   const precisionFactor = 10 ** pre

//   // 不含税单价
//   const priceTax = toPrecision(
//     (sumprice * precisionFactor) / (count * precisionFactor),
//     8
//   )
//   formData.value.priceTax = priceTax

//   if (!editLimit.value) {
//     // 含税单价
//     const price = toPrecision(
//       (priceTax * precisionFactor * 1.13) / precisionFactor,
//       8
//     )
//     formData.value.price = price

//     // 含税总价
//     formData.value.sumPrice = toPrecision(
//       (price * count * precisionFactor) / precisionFactor,
//       8
//     )
//   }
// }

/**
 * @description: 入库数量校验
 * @return {*}
 */
const countValidator = () => {
  const { chooseCount, unChooseCount } = formData.value;

  if (showNum.value) {
    const num = showUnChooseCount();
    if (Number(chooseCount) > Number(num)) {
      return Promise.reject(`入库数量不能大于可选数量`);
    }
  }
  return Promise.resolve();
};

/**
 * @description: 不含税价不能大于含税价
 * @return {*}
 */
const priceValidate = () => {
  const { price, priceTax } = formData.value;
  if (Number(priceTax) > Number(price)) {
    return Promise.reject("不含税价不能大于含税价");
  }
  const reg = /^[0-9]*\.?[0-9]{0,8}$/;
  if (!reg.test(priceTax)) {
    return Promise.reject("最多保留8位小数");
  }
  return Promise.resolve();
};

const cusValite = (prop) => {
  formRef.value?.validate(prop);
};

/**
 * @description: 查询当前库存数
 * @return {*}
 */
const getCount = async () => {
  const { itemNo, itemId } = orderStore.currGoodsInfo;
  const params = {};
  if (!itemNo) {
    params.itemid = itemId;
  } else {
    params.itemno = itemNo;
  }
  const res = await scanItemQrCode(params);
  if (res) {
    formData.value.itemNo = res.itemNo;

    // if (formData.value.warehouseId) {
    const relationWareVOS = res.relationWareVOS || [];
    const count = relationWareVOS.reduce((pre, curr) => {
      if (curr.warehouseid === orderStore.orderInfo.warehouseId.toString()) {
        return increase(pre, curr.warecanusecount);
      } else {
        return pre;
      }
    }, 0);
    formData.value.warecanusecount = count;
    // }
    // formData.value.warecanusecount = res.warecanusecount
  }
};

/**
 * @description: 展示可选数量
 * @return {*}
 */
const showUnChooseCount = () => {
  // 是 采购入库、 退库入库、盘盈入库 且关联订单
  if (showNum.value) {
    // 整个仓库的可选数量
    const unChooseCount = formData.value.unChooseCount;
    const num = orderStore.choosedGoods.reduce((pre, curr) => {
      if (currentPage.from === "edit") {
        if (
          curr.itemId === formData.value.itemId &&
          curr.areaId !== formData.value.areaId
        ) {
          return minus(pre, Number(curr.chooseCount));
        }
      } else {
        if (curr.itemId === formData.value.itemId) {
          return minus(pre, Number(curr.chooseCount));
        }
      }
      return pre;
    }, unChooseCount);
    return num;
  }
  return formData.value.unChooseCount;
};

const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      const data = {
        ...formData.value,
        goodsName: formData.value.goodsName || formData.value.itemName,
        invoiceType: orderStore.orderInfo.invoiceType,
      };
      console.log("data", data);
      const pages = Taro.getCurrentPages();
      const lastPage = pages[pages.length - 2].route;

      const findeIndex = orderStore.choosedGoods.findIndex(
        (val) => val.itemId === data.itemId && val.areaId === data.areaId
      );
      if (findeIndex > -1) {
        // 不是物料明细的编辑物料进来的提示
        if (currentPage.from !== "edit") {
          Taro.showModal({
            content:
              "该物料已添加，请确认是否继续添加，继续添加将按照本次添加信息覆盖原信息！",
            confirmText: "继续添加",
            success(result) {
              if (result.confirm) {
                orderStore.setChoosedGoodsByIndex(data, findeIndex);
                Taro.navigateBack({
                  delta: lastPage.includes("baseInfo") ? 1 : 2,
                });
              }
            },
          });
          return;
        }
        orderStore.setChoosedGoodsByIndex(data, findeIndex);
      } else {
        orderStore.setChoosedGoods([...orderStore.choosedGoods, data]);
      }

      Taro.navigateBack({
        delta: lastPage.includes("baseInfo") ? 1 : 2,
      });
    } else {
      Taro.showToast({ title: errors[0].message, icon: "none" });
      console.warn("error:", errors);
    }
  });
};

/**
 * @description: 初始化页面数据
 * @return {*}
 */
const initView = async () => {
  const { receiptOrderType, associatedOrders, priceTax } = orderStore.orderInfo;

  /** 采购入库(PROCURE_WAREHOUSING) 退库入库(RETURN_WAREHOUSING) 盘盈入库(INVENTORY_WAREHOUSING) */
  showNum.value =
    [
      "PROCURE_WAREHOUSING",
      "RETURN_WAREHOUSING",
      "INVENTORY_WAREHOUSING",
    ].includes(receiptOrderType) && associatedOrders;

  /** 1、盘盈入库且关联订单时 不能修改库区
   *  2、编辑物料的时候不能修改库区
   */
  areaDisabled.value =
    (receiptOrderType === "INVENTORY_WAREHOUSING" && associatedOrders) ||
    currentPage.from === "edit";

  formData.value = orderStore.currGoodsInfo;
  if (orderStore.orderInfo.receiptOrderType == "RETURN_WAREHOUSING") {
    showSecondSelect1.value = true;
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
  }
  if (orderStore.currGoodsInfo.locationId) {
    const { racksId, layerId, locationId } = orderStore.currGoodsInfo;
    formData.value.rack = [racksId, layerId, locationId];
  }
  formData.value.chooseCount =
    formData.value.chooseCount === 0 ? 1 : formData.value.chooseCount;

  // 不是退库关联订单的（退库关联订单的不展示价格相关信息）并且 不是修改的
  if (
    !(
      orderStore.orderInfo.receiptOrderType === "RETURN_WAREHOUSING" &&
      associatedOrders
    ) &&
    currentPage.from !== "edit"
  ) {
    calcSumPrice(formData.value.price, formData.value.chooseCount, true);
  }
};

onBeforeMount(() => {
  initView();
  getAreaList();
  getSubjectList();
  getRemarkEntryList();
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
        <nut-input :disabled="true" v-model="formData.goodsUnit" />
      </nut-form-item>
      <nut-form-item label="当前库存数" :labelWidth="labelWidth">
        <nut-input :disabled="true" v-model="formData.warecanusecount" />
      </nut-form-item>
      <nut-form-item v-if="showNum" label="可选数量" :labelWidth="labelWidth">
        <input :disabled="true" :value="showUnChooseCount()" />
      </nut-form-item>
      <nut-form-item
        label="入库库区"
        prop="areaId"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: true,
            message: '请填写入库库位',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="areaList"
          :range-key="'areaName'"
          @change="areaChange"
          :disabled="editLimit || areaDisabled"
        >
          <div>
            {{
              showNameByValue(formData.areaId, areaList, "areaName", "id") ||
              "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="货架库位"
        prop="areaId"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: false,
            message: '请填写货架库位',
          },
        ]"
      >
        <div
          @click="
            () => {
              showLocation = true;
            }
          "
        >
          {{ formData.rackName || "请选择" }}
        </div>
        <nut-popup
          v-model:visible="showLocation"
          position="bottom"
          :pop-class="'condition-form'"
          :lock-scroll="true"
        >
          <nut-picker
            v-model="formData.rack"
            :columns="orderStore.racksList[formData.areaId]"
            title="库位选择"
            @confirm="confirmLocation"
            @cancel="
              () => {
                showLocation = false;
              }
            "
          >
          </nut-picker>
        </nut-popup>
      </nut-form-item>
      <nut-form-item
        label="入库数量"
        :labelWidth="labelWidth"
        prop="chooseCount"
        :rules="[
          {
            required: true,
            message: '填写入库数量',
          },
          {
            validator: countValidator,
          },
        ]"
      >
        <nut-input
          v-model="formData.chooseCount"
          @blur="calcSumPrice(formData.price, formData.chooseCount)"
          placeholder="请输入"
          :disabled="editLimit"
          type="number"
        />
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
          :range-key="'text'"
          @change="subjectChange"
          :disabled="true"
        >
          <div>
            {{ formData.subjectName || "请选择" }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="记账说明"
        prop="remarkEntry"
        :labelWidth="labelWidth"
        :rules="[
          {
            required:
              formData.subject == '6' && !showSecondSelect && showSecondSelect1,
            message: '请选择记账说明',
            trigger: 'change',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="accountsList"
          :range-key="'text'"
          @change="remarkEntryChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.remarkEntry,
                accountsList,
                "text",
                "value"
              ) || "请选择"
            }}
          </div>
        </picker>
      </nut-form-item>
      <!-- 不是退库入库关联订单 -->
      <template
        v-if="
          !(
            orderStore.orderInfo.receiptOrderType === 'RETURN_WAREHOUSING' &&
            orderStore.orderInfo.associatedOrders
          )
        "
      >
        <nut-form-item
          label="入库单价（价税）"
          prop="price"
          :labelWidth="labelWidth"
          :rules="[
            {
              required: true,
              message: '填写入库单价（价税）',
            },
          ]"
        >
          <nut-input
            v-model="formData.price"
            placeholder="请输入"
            type="digit"
            :disabled="true"
          />
        </nut-form-item>
        <nut-form-item
          label="入库金额（价税）"
          :labelWidth="labelWidth"
          prop="sumPrice"
          :rules="[
            {
              required: true,
              message: '请填写入库金额（价税）',
            },
          ]"
        >
          <nut-input
            v-model="formData.sumPrice"
            placeholder="请输入"
            type="digit"
            :disabled="true"
          />
        </nut-form-item>
        <nut-form-item
          label="入库单价（不含税）"
          :labelWidth="labelWidth"
          prop="priceTax"
          :rules="[
            {
              required: true,
              message: '请填写入库单价（不含税）',
            },
            {
              validator: priceValidate,
            },
          ]"
        >
          <nut-input
            v-model="formData.priceTax"
            @blur="calcPriceTax(formData.priceTax, formData.chooseCount)"
            placeholder="请输入"
            type="digit"
          />
        </nut-form-item>
        <nut-form-item
          label="入库金额（不含税）"
          :labelWidth="labelWidth"
          prop="sumPriceTax"
          :rules="[
            {
              required: true,
              message: '请填写入库金额（不含税）',
            },
          ]"
        >
          <nut-input
            v-model="formData.sumPriceTax"
            placeholder="请输入"
            type="digit"
            :disabled="true"
          />
        </nut-form-item>
      </template>
    </nut-form>
    <div class="fixed">
      <div class="btn-primary" @click="submit">确认入库</div>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../../assets/styles/common.scss";
</style>
