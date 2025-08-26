<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { Search } from '@nutui/icons-vue-taro'
import { computed, reactive, ref, onBeforeMount } from 'vue'
import {
  createOrderNo,
  getDatas,
  getSupplier,
  getDetId,
  getItemTypeList,
} from 'src/api/common'
import {
  getOrders,
  getInCount,
  submitOrder,
  scanItemQrCode,
  getAreaByWare,
} from 'src/api/in'
import { getInventoryDetails } from 'src/api/inventory'
import { showNameByValue, increase } from 'src/utils/index'
import { useCodesStore } from 'src/stores/codes'
import { useOrderStore } from 'src/stores/order'

interface Props {
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const selectStartDate = ref(new Date())
const selectEndDate = ref(new Date())
const showStartDateSelecter = ref(false)
const showEndDateSelecter = ref(false)
const currentPage = getCurrentInstance().router?.params
const orderStore = useOrderStore()
const codesStore = useCodesStore()
/** 库区 */
const areaList = ref([])
const formRef = ref(null)
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

const confirmStartDate = (e) => {
  const date = e.selectedValue.join('-')
  formData.value.startTime = date
  showStartDateSelecter.value = false
}

const confirmEndDate = (e) => {
  const date = e.selectedValue.join('-')
  formData.value.endTime = date
  showEndDateSelecter.value = false
}

// 失去焦点校验
const customBlurValidate = (prop) => {
  formRef.value?.validate(prop)
}
const orderTypeChange = async (e) => {
  const index = e.detail.value
  const info = codesStore.inventoryCheckType[index]
  const value = info.dictValue
  formData.value.checkType = value
  // 保存盘点类型后面关联订单要用
  orderStore.setOrderInfo(formData.value)
}

const itemTypeChange = (e) => {
  const index = e.detail.value
  const info = codesStore.itemTypeList[index]
  const value = info.itemTypeId
  formData.value.itemTypeId = value
  customBlurValidate('itemTypeId')
  orderStore.setOrderInfo(formData.value)
}

/**
 * @description: 盘点日期确认
 * @param {*} e
 * @return {*}
 */
const changeReceiptTime = (e) => {
  const date = e.detail.value
  formData.value.receiptTime = date
}

const warehouseChange = (e) => {
  const index = e.detail.value
  const info = orderStore.warehouse[index]
  // 仓库id
  const value = info.id
  formData.value.warehouseId = value
  // 保存仓库id,后面添加物料查询的时候要用
  orderStore.setOrderInfo(formData.value)
  handleArea(value)
  customBlurValidate('warehouseId')
}

const areaChange = (e) => {
  const index = e.detail.value
  const info = areaList.value[index]
  // 仓库id
  const value = info.id
  formData.value.areaId = value
}

const handleChangeTime = (e, key: string) => {
  const value = e.detail.value
  formData.value[key] = value
  customBlurValidate('startTime')
  customBlurValidate('endTime')
}

const goPage = (pageName: string) => {
  const url = {
    wuLiao: '/in/pages/wuLiaoList/list',
    linkedOrder: '/in/pages/linkedOrder/index',
  }
  orderStore.setOrderInfo(formData.value)

  Taro.navigateTo({
    url: url[pageName],
  })
}

/**
 * @description: 查库区
 * @param {*} warehouseId
 * @return {*}
 */
const handleArea = async (warehouseId) => {
  const areaRes = await getAreaByWare(warehouseId)
  if (areaRes) {
    areaList.value = areaRes.content
  }
}

const getDetails = async () => {
  const res = await getInventoryDetails(currentPage.orderNo)
  const check = res.check
  const data = {
    ...check,
    checkType: check.inventoryCheckType.toString(),
    checkName: check.inventoryCheckName,
    itemTypeId: check.primaryItemType,
    checkNo: check.inventoryCheckNo,
    startTime: check.startTime.substring(0, 10),
    endTime: check.endTime.substring(0, 10),
  }
  formData.value = data

  orderStore.setOrderInfo(data)

  handleArea(check.warehouseId)
}
const initView = async () => {
  await orderStore.getCangKu()
  codesStore.getGoodClass()

  if (currentPage.orderNo) {
    getDetails()
  } else {
    // 创建盘点单号
    const noRes = await createOrderNo('IV')
    if (noRes) {
      formData.value.checkNo = noRes.data
    }
  }
}

const timeValidator = () => {
  const { startTime, endTime } = formData.value
  const start = startTime.replace(/-/g, '')
  const end = endTime.replace(/-/g, '')
  if (startTime && endTime && Number(start) > Number(end)) {
    return false
  }
  return true
}

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(({ valid, errors }) => {
      if (valid) {
        resolve(formData.value)
      } else {
        console.warn('error:', errors)
        reject()
      }
    })
  })
}

onBeforeMount(() => {
  initView()
})

defineExpose({
  validate,
})
</script>
<template>
  <div class="pd-20">
    <div class="first-title">基础信息</div>
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item
        label="盘点类型"
        prop="checkType"
        :rules="[
          {
            required: true,
            message: '请选择盘点类型',
          },
        ]"
        label-width="120px"
      >
        <picker
          mode="selector"
          :disabled="disabled"
          :range="codesStore.inventoryCheckType"
          :range-key="'dictLabel'"
          @change="orderTypeChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.checkType,
                codesStore.inventoryCheckType
              ) || '请选择'
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item label="盘点单据编号" required label-width="120px">
        <nut-input
          :disabled="true"
          v-model="formData.checkNo"
          type="text"
          placeholder="请输入"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="盘点单据名称" prop="checkName" label-width="120px">
        <nut-input
          v-model="formData.checkName"
          type="text"
          placeholder="请输入"
          :disabled="disabled"
          @blur="customBlurValidate('checkName')"
        ></nut-input>
      </nut-form-item>

      <nut-form-item
        label="物料分类"
        prop="itemTypeId"
        :rules="[
          {
            required: true,
            message: '请选择物料分类',
          },
        ]"
        label-width="120px"
      >
        <picker
          mode="selector"
          :range="codesStore.itemTypeList"
          :range-key="'typeName'"
          :disabled="disabled"
          @change="itemTypeChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.itemTypeId,
                codesStore.itemTypeList,
                'typeName',
                'itemTypeId'
              ) || '请选择'
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="盘点开始日期"
        prop="startTime"
        :rules="[
          {
            required: true,
            message: '请选择盘点开始日期',
          },
        ]"
        label-width="120px"
      >
        <picker
          mode="date"
          @change="(e) => handleChangeTime(e, 'startTime')"
          :disabled="disabled"
        >
          <div>{{ formData.startTime || '请选择' }}</div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="盘点结束日期"
        prop="endTime"
        :rules="[
          {
            required: true,
            message: '请选择盘点日期',
          },
          {
            message: '结束日期不能早于开始日期',
            validator: timeValidator,
          },
        ]"
        label-width="120px"
      >
        <picker
          mode="date"
          @change="(e) => handleChangeTime(e, 'endTime')"
          :disabled="disabled"
        >
          <div>{{ formData.endTime || '请选择' }}</div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="仓库名称"
        prop="warehouseId"
        :rules="[
          {
            required: true,
            message: '请选择仓库名称',
          },
        ]"
        label-width="120px"
      >
        <picker
          mode="selector"
          :range="orderStore.warehouse"
          :range-key="'warehouseName'"
          :disabled="disabled"
          @change="warehouseChange"
        >
          <div style="color: #000">
            {{
              showNameByValue(
                formData.warehouseId,
                orderStore.warehouse,
                'warehouseName',
                'id'
              ) || '请选择'
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item label="备注" label-width="120px" label-position="top">
        <nut-textarea
          v-model="formData.remark"
          type="text"
          placeholder="请输入"
          :disabled="disabled"
          :max-length="45"
          :limit-show="true"
        ></nut-textarea>
      </nut-form-item>
    </nut-form>
  </div>
</template>
<style lang="scss">
.nut-textarea {
  border: 1px solid #e5e5e5;
}
</style>
