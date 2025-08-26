<script setup>
import Taro from '@tarojs/taro'

const goDetails = () => {
  Taro.navigateTo({
    url: '/my/pages/paramsDetails/details',
  })
}
</script>
<template>
  <div class="params-manage">
    <div class="params-card">
      <div class="params-item" @click="goDetails">
        <div>
          <image src="../../../assets/images/my/params.png"></image>
        </div>
        <div class="params-name">出入库管理</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.params-manage {
  padding: 40px 32px;
  .params-card {
    display: flex;
    flex-basis: 30%;
    flex-shrink: 0;
    text-align: center;
    background-color: #fff;
    border-radius: 32px;
    padding: 32px;
    .params-item {
      flex-basis: 30%;
    }
    image {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
    .params-name {
      font-size: 32px;
    }
  }
}
</style>
