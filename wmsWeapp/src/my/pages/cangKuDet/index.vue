<script setup>
import { ref, onBeforeMount } from 'vue'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getAreaByWare } from '../../../api/in'

const currentPage = getCurrentInstance().router.params
const details = ref({})
const areaInfo = ref({})

onBeforeMount(() => {
  details.value = JSON.parse(decodeURIComponent(currentPage.info))
  getAreaByWare(details.value.id).then((res) => {
    if (res?.content) {
      areaInfo.value = res.content
    }
  })
})
</script>
<template>
  <div class="cangkuDetails-wrapper">
    <div class="info-card">
      <div class="first-title">基础信息</div>

      <div class="card-body">
        <div class="info-row">
          <div class="label">仓库编号</div>
          <div class="value">{{ details.warehouseNo }}</div>
        </div>
        <div class="info-row">
          <div class="label">仓库名称</div>
          <div class="value">{{ details.warehouseName }}</div>
        </div>
        <div class="info-row">
          <div class="label">仓库主管</div>
          <div class="value">
            {{ details.managerName }}|{{ details.managerEmployeeNo }}
          </div>
        </div>

        <div class="info-row">
          <div class="label">库管联系电话</div>
          <div class="value">{{ details.managerPhonenumber }}</div>
        </div>
        <div class="info-row">
          <div class="label">仓库审批人</div>
          <div class="value">
            {{ details.auditorName }}|{{ details.auditorEmployeeNo }}
          </div>
        </div>
        <div class="info-row">
          <div class="label">审批人联系电话</div>
          <div class="value">{{ details.auditorPhonenumber }}</div>
        </div>
        <div class="info-row">
          <div class="label">仓库状态</div>
          <div class="value">{{ details.status }}</div>
        </div>
        <div class="info-row">
          <div class="label">备注</div>
          <div class="value">{{ details.remark }}</div>
        </div>
      </div>

      <div class="first-title">库位信息（{{ areaInfo.length }}）</div>

      <div class="card-body" v-for="item in areaInfo" :key="item.id">
        <div class="info-row">
          <div class="label">库位编号</div>
          <div class="value">{{ item.areaNo }}</div>
        </div>
        <div class="info-row">
          <div class="label">库位名称</div>
          <div class="value">{{ item.areaName }}</div>
        </div>
        <div class="info-row">
          <div class="label">库位备注</div>
          <div class="value">{{ item.remark }}</div>
        </div>
        <div class="info-row">
          <div class="label">库位状态</div>
          <div class="value">{{ details.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.cangkuDetails-wrapper {
  padding: 20px 32px;
  .info-card {
    .card-body {
      background-color: #fff;
      border-radius: 32px;
      padding: 4px 28px;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 20px 20px;

      font-size: 28px;
      &:not(:last-child) {
        border-bottom: 1px solid #e7e7e7;
      }
      .label {
        color: #8c8c8c;
      }
      .value {
        color: #1a1a1a;
      }
    }
  }
  .sup {
    font-size: 24px;
    vertical-align: text-top;
  }
  .first-title {
    font-size: 32px;
    color: #303030;
    font-weight: bold;
    margin-bottom: 24px;
  }
}
</style>
