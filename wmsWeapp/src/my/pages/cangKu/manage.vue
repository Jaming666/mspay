<script setup lang="ts">
import { ref, onBeforeMount, nextTick } from 'vue'
import { getList } from '../../../api/cangkuManage'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Close, Search2 } from '@nutui/icons-vue-taro'

const CangKuStatus = ['正常', '锁定']

const alreadyOver = ref(false)
const page = ref(1)
const show = ref(false)
const tableData = ref([])
const details = ref({})
const formData = ref({
  /** 仓库编号/仓库名称 */
  warehouse: '',
  /** 仓库状态 全部:不用传 0:启用; 1:停用 */
  warestatus: '',
  /** 仓库主管 */
  waremanageuser: '',
  /** 创建日期开始 */
  createBeginTime: '',
  /** 创建日期结束 */
  createEndTime: '',
})

const handleReset = () => {
  const keys = Object.keys(formData.value)
  keys.forEach((key) => {
    formData.value[key] = ''
  })
  show.value = false
  handleQuery()
}
const handleQuery = async () => {
  if (alreadyOver.value) return
  show.value = false
  const res = await getList({
    ...formData.value,
    currentPage: page.value,
  })
  if (res?.result) {
    // tableData.value = res.result

    if (page.value === res.pages) {
      alreadyOver.value = true
    }

    if (page.value === 1) {
      tableData.value = res.result
    } else {
      tableData.value = [...tableData.value, ...res.result]
    }
  }
}

const reachBottom = () => {
  page.value++
  handleQuery()
}

const viewDetail = (item) => {
  const info = {
    ...item,
    status: CangKuStatus[item.status],
  }
  Taro.navigateTo({
    url: `/my/pages/cangKuDet/index?info=${encodeURIComponent(
      JSON.stringify(info)
    )}`,
  })
}

const showCondition = () => {
  show.value = true
}

const handleChangeTime = (e, key: string) => {
  const value = e.detail.value
  formData.value[key] = value
}

const search = () => {
  nextTick(() => {
    show.value = false
    alreadyOver.value = false
    page.value = 1
    handleQuery()
  })
}
const clickRadio = (value) => {
  formData.value.warestatus = value
}
onBeforeMount(() => {
  handleQuery()
})
</script>
<template>
  <div>
    <div class="search-wrapper">
      <nut-searchbar
        v-model="formData.warehouse"
        @search="search"
        @clear="search"
        placeholder="请输入仓库名称、仓库编码"
        style="width: 85%"
      >
        <template #leftin>
          <Search2 />
        </template>
      </nut-searchbar>
      <div class="condition" @click="showCondition">筛选</div>
    </div>
    <scroll-view
      :scroll-y="true"
      :enhanced="true"
      :show-scrollbar="false"
      @scrolltolower="reachBottom"
      style="height: 97vh"
      :enable-back-to-top="true"
    >
      <div class="cangku-manage">
        <div
          class="cangku-info"
          v-for="item in tableData"
          :key="item.id"
          @click="viewDetail(item)"
        >
          <div class="head">{{ item.warehouseName }}</div>

          <div class="body">
            <div class="row">
              <div class="row">
                <div class="label">仓库编号:</div>
                <div class="value">{{ item.warehouseNo }}</div>
              </div>

              <div class="row">
                <div class="label">仓库主管:</div>
                <div class="value">{{ item.managerName }}</div>
              </div>
            </div>

            <div class="row">
              <div class="row">
                <div class="label">库位数量:</div>
                <div class="value">{{ item.areacount }}</div>
              </div>
              <div class="row">
                <div class="label">仓库状态:</div>
                <div class="value">{{ CangKuStatus[item.status] }}</div>
              </div>
            </div>
          </div>

          <div class="creat-user">
            <div class="blue">
              {{ item.createByName }}
            </div>
            <div class="blue">
              {{ item.createTime }}
            </div>
          </div>
        </div>

        <nut-empty description="暂无数据" v-if="tableData?.length === 0">
          <template #image>
            <image src="../../../assets/images/empty.png" />
          </template>
        </nut-empty>
      </div>
    </scroll-view>
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
          <div class="label">仓库主管</div>
          <div class="value">
            <input
              v-model="formData.waremanageuser"
              type="text"
              placeholder="请输入仓库主管"
            />
          </div>
        </div>

        <div class="query-form-row">
          <div class="label">仓库状态</div>
          <div class="grid-3">
            <div
              class="radio"
              :class="{
                radioActive: formData.warestatus === '',
              }"
              @click="clickRadio('')"
            >
              全部
            </div>
            <div
              class="radio"
              :class="{
                radioActive: formData.warestatus === '0',
              }"
              @click="clickRadio('0')"
            >
              启用
            </div>
            <div
              class="radio"
              :class="{
                radioActive: formData.warestatus === '1',
              }"
              @click="clickRadio('1')"
            >
              停用
            </div>
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
                <div>{{ formData.createBeginTime || '请选择' }}</div>
              </picker>
            </div>
            <text class="gap">-</text>
            <div class="value">
              <picker
                mode="date"
                @change="(e) => handleChangeTime(e, 'createEndTime')"
              >
                <div>{{ formData.createEndTime || '请选择' }}</div>
              </picker>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="btn-group">
          <div @click="handleReset" class="plain">重置</div>
          <div @click="search" class="primary">查询</div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>
<style lang="scss">
@import '../../../assets/styles/common.scss';
page {
  background-color: #f3f5f7;
}
.cangku-manage {
  padding: 0 32px;
  .cangku-info {
    position: relative;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 0 24px;
    border-radius: 20px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 20px;
      width: 8px;
      height: 32px;
      background-color: #4582de;
    }
    .head {
      border-bottom: 1px solid #e7e7e7;
      padding: 20px 0;
    }
    .row {
      display: flex;
      flex: 1;
      font-size: 24px;
      .label,
      .value {
        padding: 34px 0 17px 0;
        flex: 1;
      }
    }
    .body {
      border-bottom: 1px solid #e7e7e7;
    }
    .creat-user {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      color: #0091ff;
      padding: 24px 0;
    }
  }
}
</style>
