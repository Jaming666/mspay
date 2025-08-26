<script setup>
import Taro from '@tarojs/taro'
import { ref, onBeforeMount } from 'vue';
import { Checked, CheckNormal } from '@nutui/icons-vue-taro';
import { getCangKuList } from '../../../api/in'


const list = ref([])
const initView = async() => {
  const res = await getCangKuList()
  if (res) {
    list.value = res
  }
}

onBeforeMount(() => {
  initView()
})

const nextStep = () => {
  Taro.navigateTo({
    url: '../cangKu/choose'
  })
}
</script>
<template>
  <div class="choose-wrapper">

    <div class="choose-row" @click="nextStep" v-for="item in list" :key="item.id">
      <div class="name">
        {{ item.warehouseName }}
      </div>
      <div class="checkbox">
        <Checked></Checked>
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