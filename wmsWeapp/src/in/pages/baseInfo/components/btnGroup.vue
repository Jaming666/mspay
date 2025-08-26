<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { useOrderStore } from 'src/stores/order'
import { computed } from 'vue'
import { ReceiptStatus } from 'src/assets/code/common'

export interface Props {
  showCorrect?: boolean
}
const currentPage = getCurrentInstance().router?.params

const orderStore = useOrderStore()

const props = withDefaults(defineProps<Props>(), {
  /** 是否展示修正 只有在物料明细页面展示修正 */
  showCorrect: false,
})

/** 以下情况不能编辑
 *  1、审批中 、 作废不能编辑
 *  2、已入库的单据 不是 采购入库的不能编辑(只有采购入库才能修正, 并且修正可能一次)
 */
const editDisabled = computed(
  () =>
    !(
      currentPage.status === ReceiptStatus.complete &&
      currentPage.type === 'PROCURE_WAREHOUSING' &&
      orderStore.orderInfo.correctTimes === 0 &&
      !orderStore.orderInfo.waveNo
    )
)

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'del'): void
  (e: 'save'): void
  (e: 'correct'): void
}>()
const save = () => {
  emit('save')
}

const submit = () => {
  emit('submit')
}

const del = () => {
  Taro.showModal({
    content: '确认作废单据吗？',
    success(result) {
      if (result.confirm) {
        emit('del')
      }
    },
  })
}

const correct = () => {
  emit('correct')
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

      <div
        v-if="showCorrect && !editDisabled"
        class="btn-primary2 mb-20"
        @click="correct"
      >
        修正提交
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
