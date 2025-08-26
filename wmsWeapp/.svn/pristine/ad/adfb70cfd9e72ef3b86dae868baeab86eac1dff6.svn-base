<script setup lang="ts">
import Taro, {
  useDidShow,
  getCurrentInstance,
  usePullDownRefresh,
} from '@tarojs/taro'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { Close, Search2 } from '@nutui/icons-vue-taro'
import InDocList from '../../../components/InDocList/index.vue'
import { getDatas } from '../../../api/common'
// import { getList } from '../../../api/in'
import { useOrderStore } from 'src/stores/order'
import { useCodesStore } from '../../../stores/codes'
import { showNameByValue } from 'src/utils/index'
import { getUnauditedReceiptOrderCount } from '../../../api/backlog';
const unauditedCount = ref(1);
const currentPage = getCurrentInstance().router?.params
const codesStore = useCodesStore()
const orderStore = useOrderStore()

const tabs = ref([
  {
    title: '全部',
    receiptOrderStatus: '',
  },
  {
    title: '待提交',
    receiptOrderStatus: '1',
  },
  {
    title: '已驳回',
    receiptOrderStatus: '5',
  },
  {
    title: '待审核',
    receiptOrderStatus: '2',
  },
  {
    title: '已入库',
    receiptOrderStatus: '3',
  },
])
const mingxilistRef = ref(null)
const value = ref(0)
const searchvalue = ref()
const show = ref(false)
const state = reactive({
  tableData: [],
  total: 0,
  receiptOrderStatus: [], // 入库状态码表
  receiptOrderTypeData: [], // 入库类型码表
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
  title: '',
  bottom: '',
  center: true,
})
const formData = ref({
  /** 入库单号 精确匹配 */
  receiptOrderNo: '',
  /** 仓库名称/仓库编码 */
  ware: '',
  /** 仓库主管名称 */
  wareManageName: '',
  /** 入库类型 */
  receiptOrderType: '',
  /** 入库日期开始 */
  rkBeginTime: '',
  /** 入库日期结束 */
  rkEndTime: '',
  /** 关联订单号 */
  orderNo: '',
  /** 入库总数最小值 */
  rkCountMin: '',
  /** 入库总数最大值 */
  rkCountMax: '',
  /** 入库总金额（价税）最小值 */
  rkAmtCountMin: '',
  /** 入库总金额（价税）最大值 */
  rkAmxCountMax: '',
  /** 创建日期开始 */
  createBeginTime: '',
  /** 创建日期结束 */
  createEndTime: '',
  /** 完成日期开始 */
  finishBeginTime: '',
  /** 完成日期结束 */
  finishEndTime: '',
  /** 物料名称、物料编码 */
  item: '',
})

const initView = async () => {
  codesStore.getInDatas()
}
useDidShow(() => {
  if (currentPage.itemNo) {
    formData.value.item = currentPage.itemNo
  }
  search()
  initView()
  buildTabTitle();
})
const buildTabTitle = async ()=>{
  const unResult =await getUnauditedReceiptOrderCount();
  unauditedCount.value = Number(unResult?.data) || 0;
  // 遍历上面的title属性赋值;
  tabs.value.map((tab)=>{
    if(tab.receiptOrderStatus == "2" && unauditedCount.value > 0){
      tab.title = `${tab.title}`;
      // DOM元素更新后
      nextTick(()=>{
        // 思路是获得对应的dom元素，然后拼接，但是并不建议这样操作!
        const titleItem = document.querySelectorAll(".nut-tabs__titles-item")[3];
        const element = titleItem?.querySelector(".nut-tabs__titles-item__text");
        // console.log(element);
        if (element && !document.querySelector(".red-count")) {
          const span = document.createElement("span");
          span.className = "red-count";
          span.style.color = "red";
          span.textContent = `(${unauditedCount.value})`;
          element.appendChild(span);
        }
      });
    }
  });
}
onMounted(() => {})

const add = () => {
  orderStore.$reset()
  Taro.navigateTo({
    url: '/in/pages/baseInfo/index',
  })
}

const search = (text) => {
  nextTick(() => {
    mingxilistRef.value[value.value].getList()
  })
}

const tabsChange = ({ paneKey }) => {
  mingxilistRef.value[paneKey].getList()
}

const showCondition = () => {
  show.value = true
}

const orderTypeChange = async (e) => {
  const index = e.detail.value
  const info = codesStore.receiptOrderTypeData[index]
  const value = info.dictValue
  formData.value.receiptOrderType = value
}

const handleChangeTime = (e, key: string) => {
  const value = e.detail.value
  formData.value[key] = value
}

const handleReset = () => {
  const keys = Object.keys(formData.value)
  keys.forEach((key) => {
    formData.value[key] = ''
  })
}

const openToast = (type, msg, cover = false, title = '提示') => {
  state.show = true
  state.msg = msg
  state.type = type
  state.cover = cover
  state.title = title
}

const handleQuery = () => {
  const {
    createBeginTime,
    createEndTime,
    rkAmtCountMin,
    rkAmxCountMax,
    rkCountMin,
    rkCountMax,
  } = formData.value

  // 开始日期不能大于结束日期
  const startTime = createBeginTime.replace(/-/g, '')
  const endTime = createEndTime.replace(/-/g, '')
  if (startTime && endTime && Number(startTime) > Number(endTime)) {
    openToast('fail', '【入库开始日期】不能早于结束日期')
    return
  }

  // 金额校验
  if (
    rkAmtCountMin &&
    rkAmxCountMax &&
    Number(rkAmtCountMin) > Number(rkAmxCountMax)
  ) {
    openToast('fail', '【入库总金额】最小值不能大于最大值')
    return
  }

  // 入库总数校验
  if (rkCountMin && rkCountMax && Number(rkCountMin) > Number(rkCountMax)) {
    openToast('fail', '【入库总数】最小值不能大于最大值')
    return
  }
  show.value = false
  search()
}
</script>
<template>
  <div class="list">
    <!-- <div class="btn-primary" @click="add">新增</div> -->
    <div class="new-wrapper">
      <div class="add-btn" @click="add">
        <image class="add-img" src="../../../assets/images/in/add.png"></image>
        新增入库单据
      </div>
    </div>

    <div class="search-wrapper">
      <nut-searchbar
        v-model="formData.receiptOrderNo"
        @search="search"
        @clear="search"
        placeholder="请输入入库单编号"
        style="width: 85%"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="condition" @click="showCondition">筛选</div>
    </div>
    <nut-tabs v-model="value" @change="tabsChange">
      <nut-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :title="tab.title"
        :pane-key="index"
      >
        <in-doc-list
          ref="mingxilistRef"
          :condition="formData"
          :receiptOrderStatus="tab.receiptOrderStatus"
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
          <div class="label">入库单据编号/名称</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.receiptOrderNo"
                type="text"
                placeholder="请输入入库单据编号或者名称"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库名称/仓库编码</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.ware"
                type="text"
                placeholder="请输入仓库名称/仓库编码"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料名称/物料编码</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.item"
                type="text"
                placeholder="请输入物料名称/物料编码"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">仓库主管</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.wareManageName"
                type="text"
                placeholder="请输入仓库主管"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">入库类型</div>
          <div class="value">
            <picker
              mode="selector"
              :range="codesStore.receiptOrderTypeData"
              :range-key="'dictLabel'"
              @change="orderTypeChange"
            >
              <div>
                {{
                  showNameByValue(
                    formData.receiptOrderType,
                    codesStore.receiptOrderTypeData
                  ) || '请选择'
                }}
              </div>
            </picker>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">入库日期</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'rkBeginTime')"
              >
                <div>
                  {{ formData.rkBeginTime || '请选择' }}
                </div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'rkEndTime')"
              >
                <div>
                  {{ formData.rkEndTime || '请选择' }}
                </div>
              </picker>
            </div>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">关联订单号</div>
          <div class="value">
            <custom-wrapper>
              <input
                v-model="formData.orderNo"
                type="text"
                placeholder="请输入关联订单号"
              />
            </custom-wrapper>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">入库总数</div>
          <div class="flex">
            <div class="value">
              <custom-wrapper>
                <input
                  v-model="formData.rkCountMin"
                  type="number"
                  placeholder="请输入"
                />
              </custom-wrapper>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <custom-wrapper>
                <input
                  v-model="formData.rkCountMax"
                  type="number"
                  placeholder="请输入"
                />
              </custom-wrapper>
            </div>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">入库总金额（价税）</div>
          <div class="flex">
            <div class="value">
              <custom-wrapper>
                <input
                  v-model="formData.rkAmtCountMin"
                  type="digit"
                  placeholder="请输入"
                />
              </custom-wrapper>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <custom-wrapper>
                <input
                  v-model="formData.rkAmxCountMax"
                  type="digit"
                  placeholder="请输入"
                />
              </custom-wrapper>
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
@import '../../../assets/styles/common.scss';
page {
  background-color: #f3f5f7;
}
.red-count {
  color: red;
  margin-left: 4px;
}
.list {
  .nut-tab-pane {
    background-color: #f5f5f5;
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
