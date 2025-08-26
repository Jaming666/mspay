<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Taro from '@tarojs/taro'
import { Right } from '@nutui/icons-vue-taro'
import { getRelaInfo } from 'src/api/goods'
import baseUrl from '../../../utils/baseUrl'
import { useGoodsStore } from '../../../stores/goods'
import { downloadFile } from '../../../utils/uploadFileRequest'

const goodStore = useGoodsStore()
const relationWareVOS = ref([])

const viewPic = async () => {
  const res = await downloadFile(goodStore.good.id)
  console.log(res)
  Taro.previewImage({
    urls: [res.tempFilePath],
  })
  /* const res = await downloadFile(goodStore.good.id)
  console.log(res)
  Taro.previewMedia({
    sources: [
      {
        url: goodStore.good.id,
        type: 'image',
      },
    ],
  }) */
}

const goRecord = (type: string) => {
  const url = {
    in: '/in/pages/list/index',
    out: '/out/pages/query/index',
    inventory: '/inventory/pages/query/index',
  }
  Taro.navigateTo({
    url: `${url[type]}?itemNo=${goodStore.good.itemNo}`,
  })
}

const initView = async () => {
  const res = await getRelaInfo(goodStore.good.itemNo)
  if (res) {
    relationWareVOS.value = res
  }
}

onBeforeMount(() => {
  initView()
})
</script>
<template>
  <div class="wuliao-details">
    <div class="head">{{ goodStore.good.itemName }}</div>

    <div class="card">
      <div class="row">
        <div class="label">物料编码</div>
        <div class="value">{{ goodStore.good.itemNo }}</div>
      </div>
      <div class="row">
        <div class="label">规格型号</div>
        <div class="value">
          {{ goodStore.good?.specification }}
        </div>
      </div>
      <div class="row">
        <div class="label">品牌</div>
        <div class="value">{{ goodStore.good?.brand }}</div>
      </div>
      <div class="row">
        <div class="label">物料分类</div>
        <div class="value">
          {{ goodStore.good?.itemTypeName }}
        </div>
      </div>
    </div>

    <div class="card flex-gap">
      <div class="num">
        <div class="title">库存总数</div>
        <div class="count">
          {{ goodStore.good?.warecount || 0 }}
        </div>
      </div>
      <div class="num">
        <div class="title">可用数量</div>
        <div class="count">
          {{ goodStore.good?.warecanusecount || 0 }}
        </div>
      </div>
    </div>
    <div class="card flex-gap">
      <div class="num">
        <div class="title">库存总价值（价税）</div>
        <div class="count">
          {{ goodStore.good?.warecountprice || 0 }}
        </div>
      </div>
      <div class="num">
        <div class="title">库存总价值（不含税）</div>
        <div class="count">
          {{ goodStore.good?.warecountpricetax || 0 }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">商品单位及二维码/条形码</div>
      <div class="table-row">
        <div class="th">主单位</div>
        <div class="td">
          {{ goodStore.good?.unit }}
        </div>
      </div>
      <div class="table-row">
        <div class="th">查看二维码</div>
        <div class="td">
          <div class="link" @click="viewPic">点击查看</div>
        </div>
      </div>
      <div class="table-row">
        <div class="th">条形码</div>
        <div class="td">
          {{ goodStore.good?.barCode }}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">库位信息</div>
      <div>
        <div class="table-row">
          <div class="th">仓库名称</div>
          <div class="th">仓库库位</div>
          <div class="th">总数量/可用数量</div>
          <div class="th">含税/不含税价值</div>
        </div>
        <div class="table-row" v-for="item in relationWareVOS">
          <div class="td td-25">
            {{ item.warehousename }}
          </div>
          <div class="td td-25">{{ item.areaname }}</div>
          <div class="td td-25">
            {{ item.warecount }}/{{ item.warecanusecount }}
          </div>
          <div class="td td-25">
            <div>￥{{ item.warecountprice }} /</div>
            <div>￥{{ item.warecountpricetax }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card ft-28" @click="goRecord('in')">
      <div>入库记录</div>
      <Right size="14px" />
    </div>
    <div class="card ft-28" @click="goRecord('out')">
      <div>出库记录</div>
      <Right size="14px" />
    </div>
    <div class="card ft-28" @click="goRecord('inventory')">
      <div>盘点记录</div>
      <Right size="14px" />
    </div>
  </div>
</template>

<style lang="scss">
.wuliao-details {
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 20px 24px;
  .head {
    font-size: 40px;
    font-weight: 500;
    line-height: 56px;
    margin-bottom: 24px;
  }
  .card {
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    .card-title {
      font-size: 28px;
      color: #111111;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .table-row {
      display: flex;
      font-size: 24px;
      border-top: 1px solid #e7e7e7;
      border-right: 1px solid #e7e7e7;
      .th {
        display: flex;
        align-items: center;
        background-color: #f2f8fe;
        color: #38415d;
        padding: 18px 26px;
        width: 266px;
        border-bottom: 2px solid #e7e7e7;
        border-left: 2px solid #e7e7e7;
      }
      .link {
        color: #0091ff;
      }
      .td {
        padding: 18px 26px;
        color: #1d2129;
        border-bottom: 2px solid #e7e7e7;
        border-left: 2px solid #e7e7e7;
      }
      .td-25 {
        flex-basis: 25%;
        flex-shrink: 0;
        word-break: break-all;
      }
    }

    .row {
      display: flex;
      font-size: 24px;
      line-height: 34px;
      margin-bottom: 20px;
      .label {
        color: rgba(0, 0, 0, 0.5);
        width: 120px;
      }
      .value {
        flex: 1;
        color: #323233;
      }
    }
  }
  .ft-28 {
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-gap {
    position: relative;
    display: flex;
    text-align: center;
    color: #3b3b3c;
    &::after {
      position: absolute;
      content: '';
      left: 50%;
      top: 40px;
      height: 40px;
      width: 2px;
      background-color: #dddddd;
    }
    .num {
      flex: 1;
      font-size: 24px;
      font-weight: 500;
    }
    .title {
      margin-bottom: 20px;
    }
  }
}
</style>
