<script setup lang="ts">
import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";
import { getCurrentInstance, useDidShow, useDidHide } from "@tarojs/taro";
import { useOrderStore } from "src/stores/order";
import { useGoodsStore } from "src/stores/goods";
import { scanItemQrCode } from "src/api/in";
import goodsItem from "src/components/WuLiaoManage/wuLiaoItem.vue";
import { getInfoByQrcode2, getRelaInfo } from "../../api/goods";
require("../../assets/js/jem.js");
const orderStore = useOrderStore();
const currentPage = getCurrentInstance().router.params;
const goodStore = useGoodsStore();
const isOk = ref(null);
useDidHide(() => {});
useDidShow(() => {
  scanCode();
  // queryItemInfo('C110302-HW2024082601-01');
});
/** 扫描出的物料信息 */
const wuLiaoInfo = ref([]);

const scanCode = async () => {
  em.ready(function () {
    let isReady = em.checkJsApi("scanQRCode");
    isOk.value = isReady;
    if (isReady) {
      em.scanQRCode({
        scanType: ["qrCode", "barCode"],
        needResult: 1,
        success: function (res) {
          // alert(res.resultStr); //弹出扫码到的内容
          if (res.resultStr) {
            queryItemInfo(res.resultStr);
          }
        },
      });
    }
  });
};

const queryItemInfo = (qrcode) => {
  getInfoByQrcode2(qrcode).then((res) => {
    if (res) {
      wuLiaoInfo.value = res;
    }
  });
};
</script>
<template>
  <div class="scanRes-wrapper">
    <div class="scanRes-title" v-if="wuLiaoInfo.length">找到以下物料信息</div>

    <div class="card">
      <div v-if="wuLiaoInfo.length">
        <goodsItem
          v-for="(data, index) in wuLiaoInfo"
          :data="data"
          :key="index"
        />
      </div>

      <nut-empty description="没有找到匹配的结果" v-else>
        <template #image>
          <image src="../../assets/images/empty.png" />
        </template>
      </nut-empty>
    </div>
  </div>
</template>
<style lang="scss">
page {
  background-color: #f3f5f7;
}
.scanRes-wrapper {
  padding: 18px 32px;
  .scanRes-title {
    font-size: 28px;
  }
  .card .grey-card {
    width: 100%;
  }
  .docitem {
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 20px 32px;
    color: #323233;
    .head,
    .doc-row {
      display: flex;
      justify-content: space-between;
      .label {
        width: 220px;
      }
      .value {
        flex: 1;
      }
    }
    .head {
      border-bottom: 2px solid #e7e7e7;
      padding-bottom: 20px;
      font-size: 28px;
      line-height: 44px;
      font-weight: bold;
    }
    .doc-body {
      padding-top: 28px;
      .doc-row {
        display: flex;
        margin-bottom: 20px;
        font-size: 24px;
        .label {
          color: rgba(0, 0, 0, 0.5);
        }
        .value {
          flex: 1;
          font-size: inherit;
        }
      }
      .doc-row-column {
        flex: 1;
        text-align: center;
        flex-direction: column;
      }
    }
    .blue-card {
      display: flex;
      padding: 14px 40px;
      background-color: #f4f9ff;
      margin-bottom: 20px;
      font-size: 24px;
      position: relative;
      .label {
        margin-bottom: 20px;
      }
      .value {
        font-size: inherit;
      }
      .doc-row-column:first-child {
        &::after {
          position: absolute;
          content: "";
          left: 50%;
          top: 40px;
          height: 40px;
          width: 2px;
          background-color: #dddddd;
        }
      }
    }

    .green-card {
      @extend .blue-card;
      background-color: #f7fcfd;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      color: #323233;
      font-size: 28px;
      line-height: 40px;
      padding: 20px 0 10px 0;
      .btn-blue {
        background-color: #0091ff;
        width: 100%;
        color: #fff;
        text-align: center;
        border-radius: 200px;
        padding: 22px;
      }
    }
  }
  .alreadyover {
    color: #cbcbcb;
    font-size: 24px;
    text-align: center;
  }
}
</style>
