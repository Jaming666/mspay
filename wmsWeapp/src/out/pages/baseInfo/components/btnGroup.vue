<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { computed } from 'vue'

const currentPage = getCurrentInstance().router?.params

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'del'): void
  (e: 'save'): void
  (e: 'edit'): void
}>()
const save = () => {
  emit('save')
}

const submit = () => {
  emit('submit')
}

const del = () => {
  Taro.showModal({
    content: `您将作废【${currentPage.orderNo}】单据，作废后将不能恢复，请确认！`,
    success(result) {
      if (result.confirm) {
        emit('del')
      }
    },
  })
}

const edit = () => {
  emit('edit')
}
</script>
<template>
  <div class="btn-wrapper">
    <template v-if="currentPage.status !== '2'">
      <!-- 不是 作废\已入库-->
      <div
        v-if="!['4', '3'].includes(currentPage.status)"
        class="btn-primary2-plain mb-20"
        @click="save"
      >
        暂存
      </div>
      <div
        v-if="['1'].includes(currentPage.status) || !currentPage.status"
        class="btn-primary2 mb-20"
        @click="submit"
      >
        提交
      </div>

      <!-- 5-驳回 -->
      <div
        v-if="['5'].includes(currentPage.status)"
        class="btn-primary2 mb-20"
        @click="submit"
      >
        重新申请
      </div>
      <div
        v-if="['1', '5'].includes(currentPage.status)"
        class="btn-danger"
        @click="del"
      >
        作废
      </div>
    </template>
  </div>
</template>
