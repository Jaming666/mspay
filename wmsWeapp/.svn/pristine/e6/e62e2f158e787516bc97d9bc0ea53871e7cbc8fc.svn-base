<script setup lang="ts">
import Taro, {
  useDidShow,
  getCurrentInstance,
  usePullDownRefresh,
  useReachBottom,
} from "@tarojs/taro";
import { Search2, TriangleDown } from "@nutui/icons-vue-taro";
import { ref, onBeforeMount, reactive, nextTick } from "vue";
import { useGoodsStore } from "src/stores/goods";
import { useOrderStore } from "src/stores/order";
import { useCodesStore } from "src/stores/codes";
import { getGoodList, getItemInfoCount } from "src/api/goods";
import { getAreaByWare } from "src/api/in";
import { getItems } from "src/api/out";
import { getItemTypeList } from "src/api/common";
import { showNameByValue, toThousandslsFilter } from "src/utils/index";
import WuLiao from "./wuLiaoItem.vue";

interface Props {
  btnType?: "det" | "panDian" | "in";
}

const props = withDefaults(defineProps<Props>(), {
  btnType: "det",
});

const currentPage = getCurrentInstance().router.params;
const goodStore = useGoodsStore();
const orderStore = useOrderStore();
const codeStore = useCodesStore();

// /** 分页信息 */
const page = ref(1);
const size = 10;
const tableData = ref([]);
/** 库区列表 */
const areaList = ref([]);
/** 物料分类 */
const goodClass = reactive({
  level1: [],
  level2: [],
  level3: [],
});
const refreshTriggerd = ref(true);
const alreadyOver = ref(false);
const countInfo = ref({
  /** 税价 */
  warecountprice: 0,
  /** 不含税价 */
  warecountpricetax: 0,
  /** 物料数量 */
  warecount: 0,
});
const formData = ref({
  /** 搜索内容 物料名称/规格型号/品牌名称 */
  search: "",
  /** 一级分类 */
  itemType1: "",
  /** 二级分类 */
  itemType2: "",
  /** 三级分类 */
  itemType3: "",
  /** 所属仓库 */
  warehouseId: "",
  /**所属库区 */
  areaId: "",
  /**默认：default 按名称：name 按编码：code  */
  order: "default",
  /** 有库存 不为空视为有 */
  hasStock: false,
});

const warehouseChange = (e) => {
  const index = e.detail.value;
  const info = orderStore.warehouse[index];
  // 仓库id
  const value = info.id;
  formData.value.warehouseId = value;

  getAreaList();
  search();
  // 清空库区
  areaList.value = [];
  formData.value.areaId = "";
};

const getAreaList = async () => {
  const res = await getAreaByWare(formData.value.warehouseId);
  if (res?.content) {
    areaList.value = res.content;
  }
};

const areaChange = (e) => {
  const index = e.detail.value;
  const info = areaList.value[index];
  const value = info.id;

  formData.value.areaId = value;
  search();
};

const search = () => {
  page.value = 1;
  alreadyOver.value = false;
  nextTick(() => {
    handleQuery();
    if (props.btnType === "det") {
      initCount();
    }
  });
};

/**
 * @description: 不区分库区的查询
 * @return {*}
 */
const query1 = async () => {
  if (alreadyOver.value) return;
  const res = await getGoodList({
    currentPage: page.value,
    size: size.value,
    ...formData.value,
    hasStock: formData.value.hasStock ? "1" : "",
    // warehouseId: formData.value.warehouseId
    //   ? formData.value.warehouseId
    //   : orderStore.orderInfo.warehouseId,
  });
  if (res?.result) {
    if (page.value === res.pages) {
      alreadyOver.value = true;
    }
    if (page.value === 1) {
      tableData.value = res.result;
    } else {
      tableData.value = [...tableData.value, ...res.result];
    }
  }
  refreshTriggerd.value = false;
};

/**
 * @description: 区分库区的查询 用于出库的物料管理
 * @return {*}
 */
const query2 = async () => {
  if (alreadyOver.value) return;

  const { itemType3, itemType2, itemType1 } = formData.value;

  const res = await getItems({
    currentPage: page.value - 1,
    ...formData.value,
    itemType: itemType3 || itemType2 || itemType1,
    itemNo: currentPage?.itemNo || "",
  });
  if (res?.content) {
    if (res.last) {
      alreadyOver.value = true;
    }

    if (res.first) {
      tableData.value = res.content;
    } else {
      tableData.value = [...tableData.value, ...res.content];
    }
  }
  refreshTriggerd.value = false;
};
const handleQuery = async () => {
  if (props.btnType === "out") {
    query2();
  } else {
    query1();
  }
};
const reachBottom = () => {
  page.value++;
  handleQuery();
};

const handleReset = () => {
  console.log(1);

  refreshTriggerd.value = true;
  const keys = Object.keys(formData.value);
  keys.forEach((key) => {
    formData.value[key] = "";
  });
  formData.value.hasStock = false;
  initData();
  search();
};

const checkboxChange = () => {
  alreadyOver.value = false;
  page.value = 1;
  handleQuery();
  initCount();
};

const handleOrderBy = (order) => {
  formData.value.order = order;
  search();
};

/**
 * @description: 查询物料分类码表
 * @param {*} level 分类级别
 * @param {*} parentId 父目录id
 * @return {*}
 */
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

const classChange = (e, level: number) => {
  const index = e.detail.value;
  const value = goodClass[`level${level}`][index].itemTypeId;
  formData.value[`itemType${level}`] = value;

  if (level !== 3) {
    getGoodClass(level + 1, value);
  }
  if (level === 1) {
    // 清空二级、三级分类
    formData.value.itemType2 = "";
    formData.value.itemType3 = "";

    goodClass.level2 = [];
    goodClass.level3 = [];
  }
  if (level === 2) {
    formData.value.itemType3 = "";
    goodClass.level3 = [];
  }
  search();
};

const initCount = async () => {
  const res = await getItemInfoCount({
    currentPage: page.value,
    size: size.value,
    ...formData.value,
    hasStock: formData.value.hasStock ? "1" : "",
  });
  if (res) {
    countInfo.value = res;
  }
};

/**
 * @description: 页面需要的码表信息
 * @return {*}
 */
const initVew = async () => {
  await orderStore.getCangKu();
  getGoodClass(1);
  search();
};

const initData = () => {
  if (props.btnType === "out") {
    formData.value.warehouseId = orderStore.orderInfo.warehouseId;
    getAreaList();
  }
  if (props.btnType === "panDian") {
    formData.value.itemType1 = orderStore.orderInfo.itemTypeId;
    getGoodClass(2, formData.value.itemType1);
  }
};

onBeforeMount(() => {
  initData();
  initVew();
});

usePullDownRefresh(() => {
  handleReset();
  nextTick(() => {
    Taro.stopPullDownRefresh();
  });
});

useReachBottom(() => {
  reachBottom();
});
</script>
<template>
  <div class="wuliao-manage">
    <!-- <scroll-view style="height: 89vh"
      :scroll-y="true"
      :enhanced="true"
      :show-scrollbar="false"
      :bounces="false"
      :enable-back-to-top="true"
      :refresher-enabled="true"
      :refresher-triggered="refreshTriggerd"
      @scrolltolower="reachBottom"
      @refresherrefresh="handleReset"></scroll-view> -->
    <div style="height: 89vh">
      <div class="search-wrapper" v-if="!currentPage?.itemNo">
        <nut-searchbar
          v-model="formData.search"
          @search="search"
          @clear="search"
          placeholder="物料名称/规格型号/品牌名称"
        >
          <template #leftin>
            <Search2 />
          </template>
          <template #rightout>
            <text @tap="search"> 搜索</text>
          </template>
        </nut-searchbar>
      </div>

      <div class="condition-wrapper" v-if="!currentPage?.itemNo">
        <div class="condition-row">
          <picker
            mode="selector"
            :range="goodClass.level1"
            :range-key="'typeName'"
            :disabled="btnType === 'panDian'"
            @change="(e) => classChange(e, 1)"
          >
            <div class="condition-item">
              <text>
                {{
                  formData.itemType1
                    ? showNameByValue(
                        formData.itemType1,
                        goodClass.level1,
                        "typeName",
                        "itemTypeId"
                      )
                    : "一级分类"
                }}
              </text>
              <TriangleDown size="10px" />
            </div>
          </picker>
          <picker
            mode="selector"
            :range="goodClass.level2"
            :range-key="'typeName'"
            @change="(e) => classChange(e, 2)"
          >
            <div class="condition-item">
              <text>
                {{
                  formData.itemType2
                    ? showNameByValue(
                        formData.itemType2,
                        goodClass.level2,
                        "typeName",
                        "itemTypeId"
                      )
                    : "二级分类"
                }}
              </text>
              <TriangleDown size="10px" />
            </div>
          </picker>
          <picker
            mode="selector"
            :range="goodClass.level3"
            :range-key="'typeName'"
            @change="(e) => classChange(e, 3)"
          >
            <div class="condition-item">
              <text>
                {{
                  formData.itemType3
                    ? showNameByValue(
                        formData.itemType3,
                        goodClass.level3,
                        "typeName",
                        "itemTypeId"
                      )
                    : "三级分类"
                }}
              </text>
              <TriangleDown size="10px" />
            </div>
          </picker>
        </div>

        <template v-if="!['in', 'out', 'panDian'].includes(btnType)">
          <div class="condition-row grid-2">
            <picker
              mode="selector"
              :range="orderStore.warehouse"
              :range-key="'warehouseName'"
              @change="warehouseChange"
            >
              <div class="condition-item">
                <text>
                  {{
                    showNameByValue(
                      formData.warehouseId,
                      orderStore.warehouse,
                      "warehouseName",
                      "id"
                    ) || "仓库"
                  }}
                </text>
                <TriangleDown size="10px" />
              </div>
            </picker>

            <picker
              mode="selector"
              :range="areaList"
              :range-key="'areaName'"
              @change="areaChange"
            >
              <div class="condition-item">
                <text>
                  {{
                    showNameByValue(
                      formData.areaId,
                      areaList,
                      "areaName",
                      "id"
                    ) || "库区"
                  }}
                </text>
                <TriangleDown size="10px" />
              </div>
            </picker>
          </div>
        </template>
      </div>
      <div
        v-if="!['in', 'out', 'panDian'].includes(btnType)"
        class="other-condition"
      >
        <div
          class="con-btn"
          :class="{
            active: formData.order === 'default',
          }"
          @click="handleOrderBy('default')"
        >
          默认
        </div>
        <div
          class="con-btn"
          :class="{
            active: formData.order === 'name',
          }"
          @click="handleOrderBy('name')"
        >
          按名称
        </div>
        <div
          class="con-btn"
          :class="{
            active: formData.order === 'code',
          }"
          @click="handleOrderBy('code')"
        >
          按编码
        </div>
        <div class="con-btn-checkbox">
          <nut-checkbox
            @change="checkboxChange"
            v-model="formData.hasStock"
            :icon-size="'12'"
          >
            有库存
          </nut-checkbox>
        </div>
      </div>

      <div
        v-if="!['in', 'out', 'panDian'].includes(btnType)"
        class="count-info"
      >
        <div class="num">
          <div class="title">库存物料总数</div>
          <div class="count">
            {{ countInfo.warecount }}
          </div>
        </div>
        <div class="num">
          <div class="title">库存物料总价值（价税）</div>
          <div class="count">
            ￥{{ toThousandslsFilter(countInfo.warecountprice || 0) }}
          </div>
        </div>
        <div class="num">
          <div class="title">库存物料总价值（不含税）</div>
          <div class="count">
            ￥{{ toThousandslsFilter(countInfo.warecountpricetax || 0) }}
          </div>
        </div>
      </div>
      <WuLiao
        class="docitem"
        v-for="data in tableData"
        :key="data.id"
        :data="data"
        :btnType="btnType"
      ></WuLiao>
      <div v-if="alreadyOver" class="alreadyover">没有更多数据了</div>
      <div class="gap-10"></div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./styles.scss";
.count-info {
  background-color: #fff;
  font-size: 24px;
  padding: 0 20px 20px 32px;
  border-radius: 0 0 20px 20px;
  margin-bottom: 20px;
  .num {
    display: flex;
    .title {
      width: 50%;
    }
  }
}
.gap-10 {
  height: 14vh;
}
</style>
