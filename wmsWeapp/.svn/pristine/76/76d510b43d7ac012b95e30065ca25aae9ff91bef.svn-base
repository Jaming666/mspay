<script setup>
import { reactive, ref, onBeforeMount } from 'vue'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getDetails } from 'src/api/purchase'
import { toThousandslsFilter } from 'src/utils'

const currentPage = getCurrentInstance().router.params
const details = ref({})
const areaInfo = ref({})

const initView = () => {
  details.value = JSON.parse(decodeURIComponent(currentPage.info))
  // getDetails(details.value.id)
}

onBeforeMount(() => {
  initView()
})
</script>
<template>
  <div class="info-card">
    <div class="first-title">基础信息</div>

    <div class="card-body">
      <div class="info-row">
        <div class="label">采购订单号</div>
        <div class="value">{{ details.orderId }}</div>
      </div>
      <div class="info-row">
        <div class="label">物料分类</div>
        <div class="value">{{ details.classid }}</div>
      </div>
      <div class="info-row">
        <div class="label">供应商名称</div>
        <div class="value">{{ details.storeName }}</div>
      </div>

      <div class="info-row">
        <div class="label">下单时间</div>
        <div class="value">{{ details.addTime }}</div>
      </div>
      <div class="info-row">
        <div class="label">项目部名称</div>
        <div class="value">{{ details.projectName }}</div>
      </div>
      <div class="info-row">
        <div class="label">采购员名称</div>
        <div class="value">{{ details.trueName }}</div>
      </div>
      <div class="info-row">
        <div class="label">订单备注</div>
        <div class="value">{{ details.remark }}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="info-row">
        <div class="label">采购物料数量</div>
        <div class="value">{{ details.gccount }}</div>
      </div>
      <div class="info-row">
        <div class="label">采购物料金额（价税）</div>
        <div class="value">
          ￥{{ toThousandslsFilter(details.gcpricecount) }}
        </div>
      </div>
      <div class="info-row">
        <div class="label">已退货数量</div>
        <div class="value">{{ details.refundcount }}</div>
      </div>
      <div class="info-row">
        <div class="label">已退货金额（价税）</div>
        <div class="value">
          ￥{{ toThousandslsFilter(details.refundpricecount) }}
        </div>
      </div>
      <div class="info-row">
        <div class="label">已入库数量</div>
        <div class="value">{{ details.rkcount }}</div>
      </div>
      <div class="info-row">
        <div class="label">已入库金额（价税）</div>
        <div class="value">
          ￥{{ toThousandslsFilter(details.rkpricecount) }}
        </div>
      </div>
    </div>
  </div>
</template>
