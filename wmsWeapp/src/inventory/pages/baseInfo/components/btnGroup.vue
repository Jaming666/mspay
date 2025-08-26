<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'del'): void
  (e: 'panDian'): void
}>()

const currentPage = getCurrentInstance().router?.params

const save = () => {}

const submit = () => {
  emit('submit')
}
const del = () => {
  emit('del')
}

const doPanDian = () => {
  emit('panDian')
}

const back = () => {
  Taro.navigateBack()
}
</script>
<template>
  <div class="btn-wrapper">
    <template v-if="currentPage.status !== '11'">
      <div
        v-if="['12', '15'].includes(currentPage.status)"
        @click="del"
        class="btn-danger"
      >
        作废
      </div>
      <div
        v-if="['13', '15'].includes(currentPage.status)"
        @click="doPanDian"
        class="btn-primary2-plain"
      >
        去盘点
      </div>
      <div
        @click="submit"
        v-if="currentPage.status === '12' || currentPage.isNew === '1'"
        class="btn-primary2"
      >
        提交
      </div>
    </template>
  </div>
</template>
