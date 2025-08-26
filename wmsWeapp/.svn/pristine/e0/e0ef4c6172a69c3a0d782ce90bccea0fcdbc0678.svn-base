<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { computed, reactive, ref, onBeforeMount } from 'vue'
import {
  createOrderNo,
  getDatas,
  getSupplier,
  getDetId,
  getItemTypeList,
} from '../../../api/common'
import {
  getOrders,
  getInCount,
  getCangKuList,
  submitOrder,
  scanItemQrCode,
  getReceiptDetails,
} from '../../../api/in'
import { submitApply, del } from 'src/api/inventory'
import { useCodesStore } from '../../../stores/codes'
import { useOrderStore } from '../../../stores/order'
import { showNameByValue, increase } from '../../../utils/index'
import baseForm from './components/baseForm.vue'
import countBoard from './components/countBoard.vue'
import mingXi from './components/mingXi.vue'
import auditRecords from 'src/components/AuditRecord/index.vue'
import btnGroup from './components/btnGroup.vue'

const currentPage = getCurrentInstance().router?.params
// 23-作废
const disabled = computed(() => ['11', '22', '23'].includes(currentPage.status))
const baseDisabled = computed(() => ['13', '15'].includes(currentPage.status))
const menuItems = [
  {
    name: '删除',
    key: 'del',
  },
  {
    name: '修改',
    key: 'edit',
  },
]
const show = ref(false)
const orderStore = useOrderStore()
const codesStore = useCodesStore()
const formRef = ref(null)
const activeTab = ref(1)
const editDoodInfo = reactive({
  data: '',
  index: '',
})
const baseRef = ref(null)

const formData = ref({
  checkNo: '',
  /** 盘点名称 */
  checkName: '',
  checkType: '',
  remark: '',
  orderNo: '',
  warehouseId: '',
  areaId: '',
  itemTypeId: '',
  startTime: '',
  endTime: '',
})

const handleQueryCount = async () => {
  if (!formData.value.orderNo || !formData.value.receiptOrderType) return
  const res = await getInCount({
    orderNo: formData.value.orderNo,
    receiptOrderType: formData.value.receiptOrderType,
  })
  if (res) {
    countInfo.value = res
  }
}

const initView = async () => {
  if (currentPage.id) {
    Taro.setNavigationBarTitle({
      title: '盘点单据详情',
    })
  }
}

/**
 * @description: 订单号确认
 * @return {*}
 */
const confirmOrderNo = (data) => {
  const value = data.value
  formData.value.orderNo = value
}

const choose = (item) => {
  console.log(item)
  const choodedGoods = orderStore.choosedGoods
  if (item.key === 'del') {
    choodedGoods.splice(editDoodInfo.index, 1)
    orderStore.setChoosedGoods(choodedGoods)
  } else {
    orderStore.setCurrGoodsInfo(editDoodInfo.data)
    Taro.navigateTo({
      url: '/in/pages/calcPrice/index',
    })
  }
}

const save = async () => {
  if (!formData.value.warehouseId) {
    Taro.showToast({
      title: '请选择仓库',
      icon: 'none',
    })
    return
  }
  if (!formData.value.receiptOrderType) {
    Taro.showToast({
      title: '请选择入库类型',
      icon: 'none',
    })
    return
  }
  const params = {
    ...formData.value,
    details: [...orderStore.choosedGoods],
    associatedOrders: formData.value.associatedOrders ? '1' : '0',
    sumPrice: sumPrice.value,
    sumPriceTax: sumPriceTax.value,
  }
  console.log(params)
  const res = await submitOrder(params)
  if (res === 1) {
    Taro.showModal({
      content: '保存成功',
      showCancel: false,
      success(result) {
        if (result.confirm) {
          Taro.redirectTo({
            url: '/in/pages/list/index',
          })
        }
      },
    })
  }
}
const handleSubmit = async () => {
  const baseFormData = await baseRef.value.validate()
  const res = await submitApply(baseFormData)
  console.log(res)
  if (res === true) {
    Taro.showToast({
      title: '成功',
      icon: 'none',
      mask: true,
    })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1000)
  }
}

/**
 * @description: 作废单据
 * @return {*}
 */
const handelDel = async () => {
  Taro.showModal({
    content: `您将作废【${currentPage.orderNo}】单据，作废后将不能恢复，请确认！`,
    success: async (result) => {
      if (result.confirm) {
        const res = await del(currentPage.orderNo)
        if (res === true) {
          Taro.showToast({
            title: '已作废',
            icon: 'none',
            mask: true,
          })
          setTimeout(() => {
            Taro.navigateBack()
          }, 1000)
        }
      }
    },
  })
}

const panDian = () => {
  Taro.redirectTo({
    url: '/inventory/pages/panDian/index',
  })
}

useDidShow(() => {
  initView()
})
onBeforeMount(async () => {})
</script>
<template>
  <div class="in-baseinfo-wrapper">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="单据信息" pane-key="1">
        <baseForm :disabled="disabled || baseDisabled" ref="baseRef" />
        <btnGroup @submit="handleSubmit" @del="handelDel" @panDian="panDian" />
      </nut-tab-pane>
      <nut-tab-pane title="盘点明细" pane-key="2">
        <countBoard :disabled="disabled" />
        <mingXi :disabled="true" />
        <!-- <btnGroup @submit="handleSubmit" /> -->
      </nut-tab-pane>
      <nut-tab-pane title="操作记录" pane-key="3" v-if="currentPage.id">
        <auditRecords :disabled="disabled" />
        <!-- <btnGroup /> -->
      </nut-tab-pane>
    </nut-tabs>
    <nut-action-sheet
      v-model:visible="show"
      :menu-items="menuItems"
      @choose="choose"
    />
  </div>
</template>

<style lang="scss">
@import '../../../assets//styles/in.scss';
.btn-wrapper .btn-primary2 {
  margin-bottom: 20px;
}
</style>
