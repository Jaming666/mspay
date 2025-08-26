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
import { submitApply } from 'src/api/inventory'
import { useCodesStore } from '../../../stores/codes'
import { useOrderStore } from '../../../stores/order'
import { showNameByValue, increase } from '../../../utils/index'
import baseForm from './components/baseForm.vue'
import countBoard from './components/countBoard.vue'
import mingXi from './components/mingXi.vue'
import auditRecords from './components/auditRecords.vue'
import btnGroup from './components/btnGroup.vue'

const currentPage = getCurrentInstance().router?.params
const disabled = computed(() => ['11', '22'].includes(currentPage.status))
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

const initView = async () => {}

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
  <div class="in-baseinfo-wrapper pd-20">
    <baseForm :disabled="disabled" ref="baseRef" />
    <div class="tips">
      注：该盘点审批结束后将锁定仓库，锁库过程中拒绝任何出库及入库行为；该盘点单盘点完结后会自动解锁仓库。
    </div>
    <btnGroup @submit="handleSubmit" @panDian="panDian" />
  </div>
</template>

<style lang="scss">
@import '../../../assets//styles/in.scss';
.btn-wrapper .btn-primary2 {
  margin-bottom: 20px;
}
.tips {
  color: #323233;
  font-size: 24px;
  line-height: 34px;
  margin-bottom: 80px;
}
</style>
