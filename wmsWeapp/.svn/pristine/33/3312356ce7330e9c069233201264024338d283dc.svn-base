<script setup lang="ts">
import { getCurrentInstance } from '@tarojs/taro'
import { useOrderStore } from 'src/stores/order'
import { useCodesStore } from 'src/stores/codes'
import { showNameByValue } from 'src/utils'
import processImg from 'src/assets/images/in/in-status-process.png'
import completeImg from 'src/assets/images/in/in-status-complete.png'
import errorImg from 'src/assets/images/in/in-status-error.png'
import authImg from 'src/assets/images/in/in-status-auth.png'

const page = getCurrentInstance().router?.params
const orderStore = useOrderStore()
const codesStore = useCodesStore()
const imgConfig = [processImg, processImg, authImg, completeImg, errorImg]
</script>
<template>
  <div :class="['det-head-wrapper', `status-${page.status}`]">
    <div class="status-wrapper">
      <image :src="imgConfig[page.status] || processImg" />
      <text>{{
        showNameByValue(page.status, codesStore.receiptOrderStatus)
      }}</text>
    </div>
    <div class="white-card det-card">
      <div class="head">
        {{ orderStore.orderInfo.receiptOrderNo }} |
        {{ orderStore.orderInfo.receiptOrderName }}
      </div>
      <div class="user-name">{{ decodeURIComponent(page.name) }}</div>
      <div class="date">{{ decodeURIComponent(page.time) }}</div>
    </div>
  </div>
</template>
<style lang="scss">
.det-head-wrapper {
  width: 100%;
  padding: 20px;
  // background-color: #379bff;
  background: url('../../../../assets/images/blue.png') no-repeat;
  background-size: 100% 50%;
  &.status-2 {
    background: url('../../../../assets/images/orange.png') no-repeat;
    background-size: 100% 50%;
  }
  &.status-3 {
    background: url('../../../../assets/images/green.png') no-repeat;
    background-size: 100% 50%;
  }
  &.status-5,
  &.status-4 {
    background: url('../../../../assets/images/red.png') no-repeat;
    background-size: 100% 50%;
  }
  .status-wrapper {
    display: flex;
    align-items: center;
    padding: 34px 0 30px 52px;
    image {
      width: 80px;
      height: 92px;
      margin-right: 20px;
    }
    text {
      color: #fff;
      font-size: 44px;
      line-height: 60px;
    }
  }
  .det-card {
    padding: 20px;
    .head {
      padding-bottom: 28px;
      border-bottom: 1px solid #e7e7e7;
    }
    .user-name {
      margin: 20px 0;
      font-size: 32px;
      font-weight: 500;
    }
    .date {
      font-size: 28px;
      color: #999990;
    }
  }
}
</style>
