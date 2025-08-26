<script setup>
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { ref, onBeforeMount } from 'vue'
import { useOrderStore } from '../../../stores/order'
import { getAreaByWare } from '../../../api/in'
import { getInventorycount } from 'src/api/inventory'
import { showNameByValue } from 'src/utils/index'

const currentPage = getCurrentInstance().router?.params
const formRef = ref(null)
const orderStore = useOrderStore()
const formData = ref({
  itemId: '',
  areaId: '',
  checkQuantity: '',
  checkDetailId: '',
})
const labelWidth = '140px'
const data = ref({})
// 库区列表
const areaList = ref([])
/** 是否可以修改库区 */
const areaDisabled = ref(false)

const getAreaList = async () => {
  const res = await getAreaByWare(orderStore.orderInfo.warehouseId)
  if (res?.content) {
    areaList.value = res.content || []
    if (res.content.length === 1) {
      // 默认值
      formData.value.areaId = res.content[0].id
    }
  }
}

const areaChange = (e) => {
  const index = e.detail.value
  const info = areaList.value[index]
  const value = info.id

  formData.value.areaId = value
  formData.value.areaName = info.areaName
  cusValite('areaId')
}

const cusValite = (prop) => {
  formRef.value?.validate(prop)
}

const handleAdd = () => {
  formRef.value?.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const goodData = {
        ...orderStore.currGoodsInfo,
        ...formData.value,
      }
      if (!goodData.itemId) {
        goodData.itemId = orderStore.currGoodsInfo.itemCode
      }

      const pages = Taro.getCurrentPages()
      const lastPage = pages[pages.length - 2].route

      // 物料已存在的盘点库区信息
      const relationWareVOS = orderStore.currGoodsInfo.relationWareVOS
      // 根据当前盘点单选择的库区去找出已存在的盘点信息
      const areaId = goodData.areaId

      if (relationWareVOS?.length > 0) {
        const existData = relationWareVOS.find(
          (val) => val.areaid === areaId.toString()
        )
        if (existData) {
          // 用这个库存数量去回显盘点明细中的数据
          const inventorycount = existData.inventorycount
          // 库存数量
          goodData.quantity = inventorycount
        } else {
          // 调接口去查询当前物料的库存数量
          const quaRes = await getInventorycount({
            warehouseId: goodData.warehouseId,
            areaId: goodData.areaId,
            itemno: goodData.itemCode,
          })
          if (quaRes) {
            goodData.quantity = quaRes
          }
        }
      } else {
        // 调接口去查询当前物料的库存数量
        const quaRes = await getInventorycount({
          warehouseId: goodData.warehouseId,
          areaId: goodData.areaId,
          itemno: goodData.itemCode,
        })
        if (quaRes) {
          goodData.quantity = quaRes
        }
      }

      /** 通过库区和物料编码去修改赋值 */
      const findeIndex = orderStore.choosedGoods.findIndex(
        (val) =>
          val.itemId === goodData.itemId && val.areaId === goodData.areaId
      )
      if (findeIndex > -1) {
        // 如果是从编辑物料进来的，不用提示
        /*if (currentPage.from !== 'edit') {
          Taro.showModal({
            content:
              '该物料已添加，请确认是否继续添加，继续添加将按照本次添加信息覆盖原信息！',
            confirmText: '继续添加',
            success(result) {
              if (result.confirm) {
                goodData.id = orderStore.choosedGoods[findeIndex].id

                orderStore.setChoosedGoodsByIndex(goodData, findeIndex)
                Taro.navigateBack({
                  delta: [
                    'inventory/pages/panDian/index',
                    'inventory/pages/baseInfo/index',
                  ].includes(lastPage)
                    ? 1
                    : 2,
                })
              }
            },
          })
          return
        }*/
        orderStore.setChoosedGoodsByIndex(goodData, findeIndex)
      } else {
        orderStore.setChoosedGoods([...orderStore.choosedGoods, goodData])
      }
      // orderStore.setCurrGoodsInfo(goodData)
      Taro.navigateBack({
        delta: [
          '/wmswap/inventory/pages/panDian/index',
          '/wmswap/inventory/pages/baseInfo/index',
        ].includes(lastPage)
          ? 1
          : 2,
      })
    } else {
      console.warn('error:', errors)
    }
  })
}

onBeforeMount(() => {
  getAreaList()
})
useDidShow(() => {
  data.value = orderStore.currGoodsInfo

  formData.value.areaId = data.value.areaId
  // 库区有值是不可以修改的
  if (data.value.areaId) {
    areaDisabled.value = true
  }

  formData.value.itemId = data.value.itemId
  formData.value.checkDetailId = data.value.id
})
</script>
<template>
  <div class="calc-wrapper">
    <div class="wuliao">
      <div class="white-card">
        <div class="wuliao-name">
          <div>{{ data.itemName }}</div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">物料编码：</div>
          <div class="wuliao-value">
            {{ data.itemCode }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">规格型号：</div>
          <div class="wuliao-value">
            {{ data.specification }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">品牌名称：</div>
          <div class="wuliao-value">
            {{ data.brand }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">物料分类：</div>
          <div class="wuliao-value">
            {{ data.itemTypeName }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">供应商:</div>
          <div class="wuliao-value">
            {{ data.supplierName }}
          </div>
        </div>
      </div>
    </div>
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item label="单位" :labelWidth="labelWidth">
        <nut-input :disabled="true" v-model="data.unit" />
      </nut-form-item>

      <nut-form-item
        label="盘点库位"
        prop="areaId"
        :labelWidth="labelWidth"
        :rules="[
          {
            required: true,
            message: '请填写盘点库位',
          },
        ]"
      >
        <picker
          mode="selector"
          :range="areaList"
          :range-key="'areaName'"
          :disabled="areaDisabled"
          @change="areaChange"
        >
          <div>
            {{
              showNameByValue(formData.areaId, areaList, 'areaName', 'id') ||
              '请选择'
            }}
          </div>
        </picker>
      </nut-form-item>
      <nut-form-item
        label="盘点数量"
        :labelWidth="labelWidth"
        prop="checkQuantity"
        :rules="[
          {
            required: true,
            message: '填写盘点数量',
          },
        ]"
      >
        <nut-input
          type="number"
          v-model="formData.checkQuantity"
          placeholder="请输入"
        />
      </nut-form-item>
    </nut-form>
    <div class="btn-primary" @click="handleAdd">添加</div>
  </div>
</template>
<style lang="scss">
@import '../../../assets/styles/in.scss';
.h5-input {
  color: #000;
}
</style>
