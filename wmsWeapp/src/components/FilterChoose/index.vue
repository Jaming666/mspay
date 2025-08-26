<!--
 * @Author: liuxiaolin
 * @Date: 2023-03-02 10:31:36
 * @LastEditTime: 2024-10-28 11:12:20
 * @LastEditors: liuxiaolin
 * @Description: 支持过滤的选择组件
-->
<script setup lang="ts">
import { Close } from '@nutui/icons-vue-taro'
import { ref, reactive, onMounted, watch, toRefs } from 'vue'
import { debounce } from 'utils/index'
interface Props {
  /** 列表数据 */
  data: any[]
  /** 标签名 默认label*/
  labelKey?: string
  /** 标题名称 */
  title?: string
  /** 值key  默认 value*/
  valueKey?: string
}

const searchValue = ref<string>('')
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  labelKey: 'label',
  valueKey: 'value',
  title: '',
})

const state = reactive({
  count: [],
  visible: false,
  isSearch: false,
  ...toRefs(props),
})

const emit = defineEmits<{
  (e: 'update:visible', show: boolean): void
  (e: 'confirm', data: any): void
}>()
watch(
  () => props.data,
  () => {
    if (props.data.length > 100) {
      state.count = props.data.slice(0, 100)
    } else {
      state.count = props.data
    }
  }
)

const handleScroll = () => {
  const len = state.count.length
  if (state.isSearch) return
  if (len === props.data.length) return
  state.count = state.count.concat(props.data.slice(len, len + 100))
}
const filterBank = debounce(
  function () {
    console.log('开始过滤')

    if (!arguments[0]) {
      initData()
      return
    }
    const res = props.data.filter((item) =>
      item[props.labelKey].includes(arguments[0])
    )
    state.count = res
  },
  500,
  false
)

const handleChange = (val) => {
  filterBank(val.toString().trim())
}

const resetData = () => {
  state.isSearch = false
  state.count = props.data.slice(0, 100)
}
const close = () => {
  state.visible = false
  emit('update:visible', false)
}
const confirm = (item) => {
  state.visible = false
  emit('confirm', item)
  emit('update:visible', false)
}

const initData = () => {
  if (props.data.length > 100) {
    state.count = props.data.slice(0, 100)
  } else {
    state.count = props.data
  }
}
onMounted(() => {
  state.visible = props.show
  initData()
})
</script>
<template>
  <nut-popup :position="'bottom'" :pop-class="'filter-pop'">
    <view class="filter-title">
      <Close @click="close" />
      <view class="filter-title_container"> 请选择{{ props.title }} </view>
    </view>
    <custom-wrapper>
      <nut-searchbar
        v-model="searchValue"
        @change="handleChange"
        @focus="state.isSearch = true"
        @clear="resetData"
      ></nut-searchbar>
    </custom-wrapper>
    <nut-cell>
      <scroll-view
        @scrolltolower="handleScroll"
        :scroll-y="true"
        class="filter-scroll-conatoner"
        :enhanced="true"
        :show-scrollbar="false"
        :enable-back-to-top="true"
      >
        <div
          v-for="(item, index) in state.count"
          :key="index"
          class="filter-list-item"
          @click="confirm(item)"
        >
          {{ item[props.labelKey] }}
        </div>
      </scroll-view>
    </nut-cell>
  </nut-popup>
</template>
<style lang="scss">
.filter-pop {
  border-radius: 32px 32px 0 0;
}
.filter-scroll-conatoner {
  height: 50vh;
}
.filter-title {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 32px;
  .filter-title_container {
    flex: 1;
  }
}
.filter-list-item {
  // line-height: 80px;
  line-height: 2;
  padding: 10px 32px;
  border-bottom: 1px solid #fbfbfb;
  text-align: left;
}
</style>
