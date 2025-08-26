<script setup lang="ts">
import Taro, {
  useDidShow,
  getCurrentInstance,
  usePullDownRefresh,
} from "@tarojs/taro";
import { reactive, ref, onMounted, nextTick } from "vue";
import { Close, Search2 } from "@nutui/icons-vue-taro";
import outOrderList from "../../../components/outOrderList/index.vue";
import { getDatas } from "../../../api/common";
import { getApprovedShipmentOrderCount } from "../../../api/backlog";
const approvedOrderCount = ref(1);
// import { getList } from '../../../api/in'
import { useCodesStore } from "../../../stores/codes";
import { useOrderStore } from "src/stores/order";
import { showNameByValue } from "src/utils/index";
import { useGoodsStore } from "src/stores/goods";
import { getItemTypeList } from "src/api/common";
const tabs = reactive([
  {
    title: "全部",
    status: "",
    id: "tab-all",
    titleStyle: "",
  },
  {
    title: "审批中",
    status: "2",
    id: "tab-in-progress",
    titleStyle: "",
  },
  {
    title: "待出库",
    status: "30",
    id: "tab-out-pending",
    titleStyle: "",
  },
  {
    title: "已出库",
    status: "3",
    id: "tab-out",
    titleStyle: "",
  },
]);
const currentPage = getCurrentInstance().router?.params;
const codesStore = useCodesStore();
const orderStore = useOrderStore();
const goodsStore = useGoodsStore();
const mingxilistRef = ref(null);
const tabActive = ref(0);
const searchvalue = ref();
const show = ref(false);
const goodClass = reactive({
  level1: [],
  level2: [],
  level3: [],
});
const state = reactive({
  total: 0,
  msg: "toast",
  type: "text",
  show: false,
  cover: false,
  title: "",
  bottom: "",
  center: true,
});
const formData = ref({
  /** 出库单号或者名称 */
  shipmentOrder: "",
  /** 仓库名称/仓库编码 */
  warehouse: "",
  /** 物料编码或者名称 */
  item: "",
  /** 仓库主管名称 */
  wareManageName: "",
  /** 出库类型 */
  shipmentOrderType: "",
  /** 出库单状态 */
  shipmentOrderStatus: "",
  /** 出库单状态全部 */
  shipmentOrderStatusList: [2, 3, 30],
  /** 出库日期开始 */
  ckBeginTime: "",
  /** 出库日期结束 */
  ckEndTime: "",
  /** 关联订单号 */
  orderNo: "",
  /** 创建日期开始 */
  createBeginTime: "",
  /** 创建日期结束 */
  createEndTime: "",
  /** 完成日期开始 */
  finishBeginTime: "",
  /** 完成日期结束 */
  finishEndTime: "",
  /** 物料类型 */
  itemType: "",
});

const initView = async () => {
  codesStore.getOutDatas();
  getGoodClass(1);
};

const search = (text) => {
  nextTick(() => {
    mingxilistRef.value[tabActive.value].getList();
  });
};

const tabChange = ({ paneKey }) => {
  nextTick(() => {
    mingxilistRef.value[paneKey].getList();
  });
};

const showCondition = () => {
  show.value = true;
};

const orderTypeChange = async (e) => {
  const index = e.detail.value;
  const info = codesStore.outOrderTypeList[index];
  const value = info.dictValue;
  formData.value.shipmentOrderType = value;
};

const handleChangeTime = (e, key: string) => {
  const value = e.detail.value;
  formData.value[key] = value;
};

const handleReset = () => {
  const keys = Object.keys(formData.value);
  keys.forEach((key) => {
    formData.value[key] = "";
  });
  formData.value.shipmentOrderStatusList = [2, 3, 30];
  // show.value = false
  // search()
};
const classChange = (e) => {
  const index = e.detail.value;
  const selected = goodClass.level1[index];
  formData.value.itemType = selected?.itemTypeId || "";
};
const openToast = (type, msg, cover = false, title = "提示") => {
  state.show = true;
  state.msg = msg;
  state.type = type;
  state.cover = cover;
  state.title = title;
};
const getGoodClass = async (level: number, parentId?: string = "") => {
  const res = await getItemTypeList({
    level,
    parentId,
  });
  if (res?.content) {
    goodClass[`level${level}`] = [
      {
        typeName: "全部",
        itemTypeId: "",
      },
      ...res.content,
    ];
  }
};

const handleQuery = () => {
  const {
    createBeginTime,
    createEndTime,
    rkAmtCountMin,
    rkAmxCountMax,
    rkCountMin,
    rkCountMax,
  } = formData.value;

  // 开始日期不能大于结束日期
  const startTime = createBeginTime.replace(/-/g, "");
  const endTime = createEndTime.replace(/-/g, "");
  if (startTime && endTime && Number(startTime) > Number(endTime)) {
    openToast("fail", "【出库开始日期】不能早于结束日期");
    return;
  }

  // 金额校验
  if (
    rkAmtCountMin &&
    rkAmxCountMax &&
    Number(rkAmtCountMin) > Number(rkAmxCountMax)
  ) {
    openToast("fail", "【出库总金额】最小值不能大于最大值");
    return;
  }

  // 出库总数校验
  if (rkCountMin && rkCountMax && Number(rkCountMin) > Number(rkCountMax)) {
    openToast("fail", "【出库总数】最小值不能大于最大值");
    return;
  }
  show.value = false;
  search();
};

useDidShow(() => {
  orderStore.$reset();
  if (currentPage.itemNo) {
    formData.value.item = currentPage.itemNo;
  }
  search();
  initView();
  buildTabTitle();
});
onMounted(() => {});
const buildTabTitle = async () => {
  const unResult = await getApprovedShipmentOrderCount();
  approvedOrderCount.value = Number(unResult?.data) || 0;
  tabs.forEach((tab) => {
    if (tab.status === "30" && approvedOrderCount.value > 0) {
      nextTick(() => {
        const titleItem = document.querySelectorAll(
          ".nut-tabs__titles-item"
        )[2];
        const textElement = titleItem?.querySelector(
          ".nut-tabs__titles-item__text"
        );

        if (textElement && !textElement.querySelector(".red-count")) {
          const span = document.createElement("span");
          span.className = "red-count";
          span.style.color = "red";
          span.textContent = `(${approvedOrderCount.value})`;
          textElement.appendChild(span);
        }
      });
    }
  });
};

usePullDownRefresh(() => {
  handleReset();
  search();
  nextTick(() => {
    Taro.stopPullDownRefresh();
  });
});
</script>
<template>
  <div class="list">
    <div class="search-wrapper">
      <nut-searchbar
        v-model="formData.shipmentOrder"
        @search="search"
        @clear="search"
        placeholder="请输入出库单编号"
        style="width: 85%"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="condition" @click="showCondition">筛选</div>
    </div>
    <nut-tabs v-model="tabActive" @change="tabChange">
      <nut-tab-pane
        v-for="(tab, index) in tabs"
        :title="tab.title"
        :pane-key="index"
        :key="tab.id"
        :id="tab.id"
        :ref="`tab-${tab.id}`"
        :class="tab.titleStyle"
      >
        <outOrderList
          ref="mingxilistRef"
          :condition="formData"
          :status="tab.status"
          :type="'out'"
        />
      </nut-tab-pane>
    </nut-tabs>

    <nut-popup
      v-model:visible="show"
      position="bottom"
      :pop-class="'condition-form'"
      :lock-scroll="true"
    >
      <div class="head">
        <div class="title">全部筛选</div>
        <div class="close" @click="show = false">
          <Close color="#1A1A1A" />
        </div>
      </div>
      <div
        :scroll-y="true"
        :enhanced="true"
        :showScrollbar="false"
        class="query-form"
      >
        <div class="query-form-row">
          <div class="label">出库单据编号/名称</div>
          <div class="value">
            <input
              v-model="formData.shipmentOrder"
              type="text"
              placeholder="请输入出库单据编号或者名称"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库名称/仓库编码</div>
          <div class="value">
            <input
              v-model="formData.warehouse"
              type="text"
              placeholder="请输入仓库名称/仓库编码"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料分类</div>
          <div class="value">
            <picker
              mode="selector"
              :range="goodClass.level1"
              :range-key="'typeName'"
              @change="classChange"
            >
              <div class="condition-item">
                <text>
                  {{
                    formData.itemType
                      ? showNameByValue(
                          formData.itemType,
                          goodClass.level1,
                          "typeName",
                          "itemTypeId"
                        )
                      : "请选择"
                  }}
                </text>
                <TriangleDown size="10px" />
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料名称/物料编码</div>
          <div class="value">
            <input
              v-model="formData.item"
              type="text"
              placeholder="请输入物料名称/物料编码"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库主管</div>
          <div class="value">
            <input
              v-model="formData.wareManageName"
              type="text"
              placeholder="请输入仓库主管"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">出库类型</div>
          <div class="value">
            <picker
              mode="selector"
              :range="codesStore.outOrderTypeList"
              :range-key="'dictLabel'"
              @change="orderTypeChange"
            >
              <div>
                {{
                  showNameByValue(
                    formData.shipmentOrderType,
                    codesStore.outOrderTypeList
                  ) || "请选择"
                }}
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">出库日期</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'ckBeginTime')"
              >
                <div>{{ formData.ckBeginTime || "请选择" }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'ckEndTime')"
              >
                <div>{{ formData.ckEndTime || "请选择" }}</div>
              </picker>
            </div>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">关联订单号</div>
          <div class="value">
            <input
              v-model="formData.orderNo"
              type="text"
              placeholder="请输入关联订单号"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">创建日期</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'createBeginTime')"
              >
                <div>{{ formData.createBeginTime || "请选择" }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'createEndTime')"
              >
                <div>{{ formData.createEndTime || "请选择" }}</div>
              </picker>
            </div>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">完成日期</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'finishBeginTime')"
              >
                <div>{{ formData.finishBeginTime || "请选择" }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'finishEndTime')"
              >
                <div>{{ formData.finishEndTime || "请选择" }}</div>
              </picker>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="btn-group">
          <div @click="handleReset" class="plain">重置</div>
          <div @click="handleQuery" class="primary">查询</div>
        </div>
      </div>
    </nut-popup>
    <nut-toast
      :msg="state.msg"
      v-model:visible="state.show"
      :type="state.type"
      :cover="state.cover"
    />
  </div>
</template>
<style lang="scss">
@import "../../../assets/styles/common.scss";
page {
  background-color: #f3f5f7;
}

.red-count {
  color: red;
  margin-left: 4px;
}

.highlight-tab {
  font-weight: bold;
  color: #f00;
}

/* 确保标题正确显示 */
.custom-title {
  display: flex;
  align-items: center;
}
.list {
  .nut-tab-pane {
    background-color: transparent;
    padding: 20px 32px;
  }
  .new-wrapper {
    display: flex;
    justify-content: flex-end;
    background-color: #fff;
    color: #3995ff;
    font-size: 28px;
    margin-bottom: 12px;
    padding: 28px 20px;

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 500;
    }
    .add-img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }
  }
  .search-wrapper {
    display: flex;
    background-color: #fff;
    align-items: center;
    margin-bottom: 12px;
    margin: 0 -20px;
    .condition {
      font-size: 28px;
      color: #323233;
      border-left: 2px solid #dddddd;
      padding-left: 20px;
    }
  }
}
</style>
