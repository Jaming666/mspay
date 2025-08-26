<script setup lang="ts">
import Taro from '@tarojs/taro'
import { ref, onBeforeMount } from 'vue'
import { getPurchaseList } from 'src/api/purchase'
import purchaseItem from './purchaseItem.vue'

export interface Props {
  /** 采购单状态 */
  status?: string
  condition: any
}

const props = withDefaults(defineProps<Props>(), {
  status: '',
  condition: () => ({}),
})
const page = ref(1)
/** 查询结果数据 */
const tableData = ref([])
/** 已经加载全部 */
const alreadyOver = ref(false)

const formatTime = (time) => {
  const str = time.replace(/T/g, ' ')
  const date = str.substring(0, str.indexOf('.'))
  return date
}

const handleQuery = async () => {
  const res = await getPurchaseList({
    ...props.condition,
    rukuStatus: props.status,
    currentPage: page.value,
  })
  if (res?.result) {
    if (page.value === res.pages) {
      alreadyOver.value = true
    }
    if (page.value === 1) {
      tableData.value = (res.result || []).map((item) => ({
        ...item,
        addTime: formatTime(item.addTime),
      }))
    } else {
      tableData.value = [
        ...tableData.value,
        ...(res.result || []).map((item) => ({
          ...item,
          addTime: formatTime(item.addTime),
        })),
      ]
    }
  }
}

const goDetail = (info) => {
  Taro.navigateTo({
    url: `/purchase/pages/details/index?info=${JSON.stringify(info)}`,
  })
}

onBeforeMount(() => {
  handleQuery()
})
const reachBottom = () => {
  page.value++
  handleQuery()
}
defineExpose({
  getList: () => {
    page.value = 1
    alreadyOver.value = false
    handleQuery()
  },
})
</script>
<template>
  <scroll-view
    @scrolltolower="reachBottom"
    :scroll-y="true"
    class="inDoclist"
    :enhanced="true"
    :show-scrollbar="false"
    :enable-back-to-top="true"
  >
    <purchaseItem
      :data="item"
      v-for="item in tableData"
      :key="item.orderId"
      @click="goDetail(item)"
    ></purchaseItem>
    <nut-empty description="暂无单据" v-if="tableData?.length === 0">
      <template #image>
        <image src="../../assets/images/empty.png" />
      </template>
    </nut-empty>
    <div v-if="tableData?.length > 0 && alreadyOver" class="alreadyover">
      没有更多数据了
    </div>
  </scroll-view>
</template>
<style lang="scss">
.inDoclist {
  height: 80vh;
  .alreadyover {
    color: #cbcbcb;
    font-size: 24px;
    text-align: center;
  }
}
</style>
