<script setup lang="ts">
import Taro, {
  useDidShow,
  getCurrentInstance,
  usePullDownRefresh,
} from "@tarojs/taro";
import { reactive, ref, onMounted, nextTick } from "vue";
import { Close, Search2 } from "@nutui/icons-vue-taro";
import outOrderList from "../list/index.vue";
import { queryProcessTaskList } from "../../../api/backlog";
import { useCodesStore } from "../../../stores/codes";
import { useOrderStore } from "src/stores/order";
import { showNameByValue } from "src/utils/index";
import { useGoodsStore } from "src/stores/goods";
import { queryProcessDefineCodes, getUserDeptList } from "src/api/backlog";
const tabs = [
  {
    title: "待审核",
    status: "INIT",
  },
  {
    title: "已审核",
    status: "DONE",
  },
];
const currentPage = getCurrentInstance().router?.params;
const codesStore = useCodesStore();
const orderStore = useOrderStore();
const goodsStore = useGoodsStore();
const mingxilistRef = ref(null);
const tabActive = ref(0);
const searchvalue = ref();
const show = ref(false);
const codeList = ref([]);
const deptList = ref([]);

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
  deptId: "",
  procInstId: "",
  procCode: "",
});

const initView = async () => {
  codesStore.getOutDatas();
  getCodeList();
  getProjectDept();
};

const search = () => {
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
  const info = deptList.value[index];
  const value = info.deptId;
  formData.value.deptId = value;
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
};
const classChange = (e) => {
  const index = e.detail.value;
  const selected = codeList.value[index];
  formData.value.procCode = selected?.procCode || "";
};
const openToast = (type, msg, cover = false, title = "提示") => {
  state.show = true;
  state.msg = msg;
  state.type = type;
  state.cover = cover;
  state.title = title;
};
const getCodeList = async () => {
  const res = await queryProcessDefineCodes({});
  codeList.value = res;
};
const getProjectDept = async () => {
  const res = await getUserDeptList({});
  deptList.value = res.data;
};

const handleQuery = () => {
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
});
onMounted(() => {});

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
        v-model="formData.procInstId"
        @search="search"
        @clear="search"
        placeholder="请输入流程编号进行查询"
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
      >
        <outOrderList
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
          <div class="label">流程编号</div>
          <div class="value">
            <input
              v-model="formData.procInstId"
              type="text"
              placeholder="请输入流程编号"
            />
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">流程名称</div>
          <div class="value">
            <picker
              mode="selector"
              :range="codeList"
              :range-key="'procName'"
              @change="classChange"
            >
              <div class="condition-item">
                <text>
                  {{
                    formData.procCode
                      ? showNameByValue(
                          formData.procCode,
                          codeList,
                          "procName",
                          "procCode"
                        )
                      : "请选择流程名称"
                  }}
                </text>
                <TriangleDown size="10px" />
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">项目部名称</div>
          <div class="value">
            <picker
              mode="selector"
              :range="deptList"
              :range-key="'deptName'"
              @change="orderTypeChange"
            >
              <div>
                {{
                  showNameByValue(
                    formData.deptId,
                    deptList,
                    "deptName",
                    "deptId"
                  ) || "请选择项目部名称"
                }}
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">申请时间</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'applyBeginTime')"
              >
                <div>{{ formData.applyBeginTime || "请选择" }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'applyEndTime')"
              >
                <div>{{ formData.applyEndTime || "请选择" }}</div>
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
.list {
  .nut-tab-pane {
    background-color: transparent;
    padding: 20px 32px;
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
