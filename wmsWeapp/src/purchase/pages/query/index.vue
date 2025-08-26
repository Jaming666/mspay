<script setup lang="ts">
import Taro, { useDidShow } from '@tarojs/taro'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { Close, Search2 } from '@nutui/icons-vue-taro'
import PurchaseList from '../../../components/PurchaseList/index.vue'
import { getDatas } from '../../../api/common'
// import { getList } from '../../../api/in'
import { useCodesStore } from '../../../stores/codes'

const codesStore = useCodesStore()
const mingxilistRef = ref(null)
const mingxilistRef2 = ref(null)
const mingxilistRef3 = ref(null)
const mingxilistRef4 = ref(null)
const value = ref('1')
const searchvalue = ref()
const show = ref(false)
const state = reactive({
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
  title: '',
  bottom: '',
  center: true,
})
const formData = ref({
  /** 采购单号 精确匹配 */
  orderno: '',
  /** 物料编码/物流名称 */
  item: '',
  /** 下单时间开始 */
  starttime: '',
  /** 下单时间结束 */
  endtime: '',
  /** 采购总数最小值 */
  countmin: '',
  /** 采购总数最大值 */
  countmax: '',
  /** 采购金额最小值 */
  pricemin: '',
  /** 采购金额最大值 */
  pricemax: '',
  currentPage: 1,
})

const add = () => {
  Taro.navigateTo({
    url: '/in/pages/baseInfo/index',
  })
}
const handleChangeTime = (e, key: string) => {
  const value = e.detail.value
  formData.value[key] = value
}

const handleQuery = () => {
  const { starttime, endtime, countmin, countmax, pricemin, pricemax } =
    formData.value
  // 开始日期不能大于结束日期
  const startTime = starttime.replace(/-/g, '')
  const endTime = endtime.replace(/-/g, '')
  if (startTime && endTime && Number(startTime) > Number(endTime)) {
    openToast('fail', '【下单时间】不能早于结束日期')
    return
  }

  // 数量校验
  if (countmin && countmax && Number(countmin) > Number(countmax)) {
    openToast('fail', '【采购数量】最小值不能大于最大值')
    return
  }
  // 金额校验
  if (pricemin && pricemax && Number(pricemin) > Number(pricemax)) {
    openToast('fail', '【采购金额】最小值不能大于最大值')
    return
  }
  search()
}

const openToast = (type, msg, cover = false, title = '提示') => {
  state.show = true
  state.msg = msg
  state.type = type
  state.cover = cover
  state.title = title
}
const search = (text) => {
  show.value = false
  nextTick(() => {
    mingxilistRef.value.getList()
    mingxilistRef2.value.getList()
    mingxilistRef3.value.getList()
    mingxilistRef4.value.getList()
  })
}

const handleReset = () => {
  const keys = Object.keys(formData.value)
  keys.forEach((key) => {
    formData.value[key] = ''
  })
  // show.value = false
  // search()
}

const showCondition = () => {
  show.value = true
}
</script>
<template>
  <div class="list">
    <div class="search-wrapper">
      <nut-searchbar
        v-model="formData.item"
        @search="search"
        @clear="search"
        placeholder="请输入物料名称\物料编码"
        style="width: 85%"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="condition" @click="showCondition">筛选</div>
    </div>
    <nut-tabs v-model="value">
      <nut-tab-pane title="全部" pane-key="1">
        <PurchaseList ref="mingxilistRef" :condition="formData" />
      </nut-tab-pane>
      <nut-tab-pane title="已入库" pane-key="2">
        <PurchaseList
          ref="mingxilistRef2"
          :condition="formData"
          :status="'allin'"
        />
      </nut-tab-pane>
      <nut-tab-pane title="部分入库" pane-key="3">
        <PurchaseList
          ref="mingxilistRef3"
          :condition="formData"
          :status="'somein'"
        />
      </nut-tab-pane>
      <nut-tab-pane title="未入库" pane-key="4">
        <PurchaseList
          ref="mingxilistRef4"
          :condition="formData"
          :status="'unin'"
        />
      </nut-tab-pane>
    </nut-tabs>

    <nut-popup
      v-model:visible="show"
      position="bottom"
      :pop-class="'condition-form'"
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
          <div class="label">采购单号</div>
          <div class="value">
            <!-- <custom-wrapper> -->
            <input
              v-model="formData.orderno"
              type="text"
              placeholder="请输入"
            />
            <!-- </custom-wrapper> -->
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">物料编码/物料名称</div>
          <div class="value">
            <!-- <custom-wrapper> -->
            <input v-model="formData.item" type="text" placeholder="请输入" />
            <!-- </custom-wrapper> -->
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">下单时间</div>
          <div class="flex">
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'starttime')"
              >
                <div>{{ formData.starttime || '请选择' }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'endtime')"
              >
                <div>{{ formData.endtime || '请选择' }}</div>
              </picker>
            </div>
          </div>
        </div>

        <div class="query-form-row">
          <div class="label">采购数量</div>
          <div class="flex">
            <div class="value">
              <!-- <custom-wrapper> -->
              <input
                v-model="formData.countmin"
                type="number"
                placeholder="请输入"
              />
              <!-- </custom-wrapper> -->
            </div>
            <text class="gap">-</text>
            <div class="value">
              <!-- <custom-wrapper> -->
              <input
                v-model="formData.countmax"
                type="number"
                placeholder="请输入"
              />
              <!-- </custom-wrapper>、 -->
            </div>
          </div>
        </div>
        <div class="query-form-row">
          <div class="label">采购金额</div>
          <div class="flex">
            <div class="value">
              <!-- <custom-wrapper> -->
              <input
                v-model="formData.pricemin"
                type="digit"
                placeholder="请输入"
              />
              <!-- </custom-wrapper> -->
            </div>
            <text class="gap">-</text>
            <div class="value">
              <!-- <custom-wrapper> -->
              <input
                v-model="formData.pricemax"
                type="digit"
                placeholder="请输入"
              />
              <!-- </custom-wrapper> -->
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
