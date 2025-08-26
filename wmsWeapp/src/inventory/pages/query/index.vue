<script setup lang="ts">
import Taro, {
  useDidShow,
  getCurrentInstance,
  usePullDownRefresh,
} from "@tarojs/taro";
import { reactive, ref, onMounted, nextTick } from "vue";
import { Close, Search2 } from "@nutui/icons-vue-taro";
import InventoryList from "src/components/InventoryList/index.vue";
import { getDatas } from "../../../api/common";
import { showNameByValue } from "src/utils/index";
import { useCodesStore } from "../../../stores/codes";
import { useOrderStore } from "src/stores/order";

const currentPage = getCurrentInstance().router?.params;
const codesStore = useCodesStore();
const orderStore = useOrderStore();

const tabs = [
  {
    title: "待盘点",
    status: "0",
  },
  {
    title: "审批中",
    status: "1",
  },
  {
    title: "已完成",
    status: "2",
  },
];

const mingxilistRef = ref(null);
const tabactive = ref("0");
const group = ref(null);
const searchvalue = ref();
const show = ref(false);
const indeterminate = ref(false);
const selectAll = ref(false);
const state = reactive({
  tableData: [],
  total: 0,
  status: [], // 入库状态码表
  receiptOrderTypeData: [], // 入库类型码表
});
const formData = ref({
  /** 库存盘点单号，或者名称 */
  inventoryCheck: "",
  /** 所属仓库id,或者名称*/
  warehouse: "",
  /** 仓库主管名称 */
  warehouseManageUser: "",
  /** 库存盘点类型 */
  inventoryCheckType: "",
  /** 物料分类 */
  itemTypeid: "",
  /** 物料编码 */
  itemNo: "",
  createBeginTime: "",
  createEndTime: "",
  finishBeginTime: "",
  finishEndTime: "",
  inventoryCheckTotalStatus: "",
  inventoryCheckStatus: [],
});

const changeAll = (value) => {
  group.value.toggleAll(value);
};

const orderTypeChange = async (e) => {
  const index = e.detail.value;
  const info = codesStore.inventoryCheckType[index];
  const value = info.dictValue;
  formData.value.inventoryCheckType = value;
};

const itemTypeChange = (e) => {
  const index = e.detail.value;
  const info = codesStore.itemTypeList[index];
  const value = info.itemTypeId;
  formData.value.itemTypeid = value;
};

const handleChangeTime = (e, key: string) => {
  const value = e.detail.value;
  formData.value[key] = value;
};
const initView = async () => {
  codesStore.getInventoryDatas();
  codesStore.getGoodClass();
};

const add = () => {
  Taro.navigateTo({
    url: "/inventory/pages/baseInfo/create?isNew=1",
  });
};

const search = (text) => {
  nextTick(() => {
    mingxilistRef.value[tabactive.value].getList();
  });
};

const tabChange = ({ paneKey }) => {
  nextTick(() => {
    mingxilistRef.value[paneKey].getList();
  });
};

const handleReset = () => {
  const keys = Object.keys(formData.value);
  keys.forEach((key) => {
    formData.value[key] = "";
  });
  formData.value.inventoryCheckStatus = [];
};

const handelQuery = () => {
  show.value = false;
  search();
};
const showCondition = () => {
  show.value = true;
};

const refresh = () => {
  handleReset();
  nextTick(() => {
    search();
  });
};

useDidShow(() => {
  orderStore.$reset();
  search();
  initView();
});
onMounted(() => {
  if (currentPage.itemNo) {
    formData.value.itemNo = currentPage.itemNo;
  }
  search();
  initView();
});
</script>
<template>
  <div class="list">
    <div class="new-wrapper">
      <div class="add-btn" @click="add">
        <image class="add-img" src="../../../assets/images/in/add.png"></image>
        新增盘点单
      </div>
    </div>

    <div class="search-wrapper">
      <nut-searchbar
        v-model="formData.inventoryCheck"
        @search="search"
        @clear="search"
        placeholder="请输入盘点单据编号/名称"
        style="width: 85%"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="condition" @click="showCondition">筛选</div>
    </div>
    <nut-tabs v-model="tabactive" @change="tabChange">
      <nut-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :pane-key="index"
        :title="tab.title"
      >
        <InventoryList
          ref="mingxilistRef"
          :condition="formData"
          :status="tab.status"
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
          <div class="label">盘点单据编号/名称</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.inventoryCheck"
                type="text"
                placeholder="请输入盘点单据编号或者名称"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库名称/仓库编码</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.warehouse"
                type="text"
                placeholder="请输入仓库名称/仓库编码"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库主管名称</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.warehouseManageUser"
                type="text"
                placeholder="请输入仓库主管名称"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料分类</div>
          <div class="value">
            <picker
              mode="selector"
              :range="codesStore.itemTypeList"
              :range-key="'typeName'"
              @change="itemTypeChange"
            >
              <div>
                {{
                  showNameByValue(
                    formData.itemTypeid,
                    codesStore.itemTypeList,
                    "typeName",
                    "itemTypeId"
                  ) || "请选择"
                }}
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料编码</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.itemNo"
                type="text"
                placeholder="请输入物料编码"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">盘点类型</div>
          <div class="value">
            <picker
              mode="selector"
              :range="codesStore.inventoryCheckType"
              :range-key="'dictLabel'"
              @change="orderTypeChange"
            >
              <div>
                {{
                  showNameByValue(
                    formData.inventoryCheckType,
                    codesStore.inventoryCheckType
                  ) || "请选择"
                }}
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">盘点开始日期</div>
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
          <div class="label">盘点结束日期</div>
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
        <div class="query-form-row">
          <div class="label">盘点单据状态</div>
          <nut-checkbox
            v-model="selectAll"
            :indeterminate="indeterminate"
            @change="changeAll"
          >
            全选
          </nut-checkbox>
          <nut-checkbox-group
            v-model="formData.inventoryCheckStatus"
            ref="group"
          >
            <nut-checkbox
              :label="item.dictValue"
              v-for="item in codesStore.inventoeyCheckStatus"
              :key="item.dictValue"
            >
              {{ item.dictLabel }}
            </nut-checkbox>
          </nut-checkbox-group>
        </div>
      </div>
      <div class="footer">
        <div class="btn-group">
          <div @click="handleReset" class="plain">重置</div>
          <div @click="handelQuery" class="primary">查询</div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>
<style lang="scss">
@import "../../../assets/styles/common.scss";
page {
  background-color: #f3f5f7;
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
