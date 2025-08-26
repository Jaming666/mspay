<script setup>
import Taro from '@tarojs/taro'
import { Checked, CheckNormal } from '@nutui/icons-vue-taro';

const nextStep = () => {
  Taro.navigateTo({
    url: '../cangKu/choose'
  })
}
</script>
<template>
  <div class="choose-wrapper">

    <div class="choose-row" @click="nextStep">
      <div class="name">
        类型
      </div>
      <div class="checkbox">
        <Checked></Checked>
      </div>
    </div>
    <div class="choose-row">
      <div class="name">
        类型2
      </div>
      <div class="checkbox">
        <CheckNormal></CheckNormal>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.choose-wrapper {
  padding: 0 20px;
  .choose-row {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #e7e7e7;
  }
}
</style>