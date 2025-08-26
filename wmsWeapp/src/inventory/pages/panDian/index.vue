<script setup lang="ts">
import Taro, { useDidShow } from "@tarojs/taro";
import { computed, ref, onBeforeMount } from "vue";
import { getInventoryGood, saveSubmit } from "src/api/inventory";
import { useOrderStore } from "src/stores/order";
import InventoryItem2 from "src/components/InventoryList/item2.vue";
import { getInfoByQrcode } from "../../../api/goods";
require("../../../assets/js/jem.js");

/** 过滤提删除的物料 delFlag = 1 是删除了 */
const showChooseGoods = computed(() =>
  orderStore.choosedGoods.filter((val) => val.delFlag !== 1)
);
const menuItems = [
  {
    name: "删除",
    key: "del",
  },
  {
    name: "修改",
    key: "edit",
  },
];
const orderStore = useOrderStore();
// const choosedGoods = ref([])
const show = ref(false);
const currInfo = ref({});

const goPage = (pageName: string) => {
  const url = {
    addWuLiao: "/inventory/pages/addWuLiao/index",
    edit: "/inventory/pages/panDianEdit/index",
  };

  Taro.navigateTo({
    url: `${url[pageName]}?from=edit`,
  });
};

const handleClick = (info, index) => {
  show.value = true;

  currInfo.value = { ...info, index };
};

const choose = (item) => {
  if (item.key === "edit") {
    orderStore.setCurrGoodsInfo(currInfo.value);
    goPage("edit");
  } else {
    const arr = orderStore.choosedGoods;
    if (currInfo.value.addingType === 0) {
      Taro.showModal({
        content: "默认物料不能删除",
        showCancel: false,
      });
      return;
    }
    // const info = {
    //   ...currInfo.value,
    //   delFlag: 1,
    // }
    // orderStore.setChoosedGoodsByIndex(info, info.index)
    arr.splice(currInfo.value.index, 1);
    orderStore.setChoosedGoods(arr);
  }
};

/* const getDetails = async () => {
  const res = await getInventoryGood(orderStore.orderInfo.inventoryCheckNo)
  if (res) {
    choosedGoods.value = res
  }
} */

const handleParams = (submitFlag: boolean) => {
  const { orderInfo } = orderStore;
  const checkDetailForms = orderStore.choosedGoods.map((good) => ({
    realQuantity: good.checkQuantity && Number(good.checkQuantity),
    checkDetailId: good.id,
    itemId: good.itemId,
    areaId: good.areaId,
    // delFlag: good.delFlag || 0,
    // addingType: good.addingType || 1,
  }));
  const params = {
    checkNo: orderInfo.inventoryCheckNo,
    checkDetailForms,
    submit: submitFlag,
  };
  return params;
};

const validate = () => {
  return new Promise((resolve, reject) => {
    if (orderStore.choosedGoods.length === 0) {
      Taro.showToast({
        title: "请添加物料信息",
        icon: "error",
      });
      return reject(new Error());
    }
    const isHaveNull = orderStore.choosedGoods.find(
      (val) =>
        !val.checkQuantity &&
        val.checkQuantity !== 0 &&
        val.checkQuantity !== "0"
    );
    if (isHaveNull) {
      Taro.showModal({
        content: "存在未盘点完成的物料",
        showCancel: false,
      });
      return reject(new Error());
    }
    resolve();
  });
};
const queryItemInfo = (qrcode) => {
  getInfoByQrcode(qrcode, orderStore.orderInfo.warehouseId).then((res) => {
    if (res) {
      const itemno = res.itemNo;
      Taro.navigateTo({
        url: "/inventory/pages/scanRes/index?itemno=" + itemno,
      });
    } else {
      Taro.showToast({
        title: "请重新扫描或手动输入",
        icon: "none",
      });
    }
  });
};
const scanCode = (type: string) => {
  em.ready(function () {
    let isReady = em.checkJsApi("scanQRCode");
    if (isReady) {
      em.scanQRCode({
        scanType: ["qrCode", "barCode"],
        needResult: 1,
        success: function (res) {
          // alert(res.resultStr); //弹出扫码到的内容
          if (res.resultStr) {
            Taro.showToast({
              title: "扫描成功",
              icon: "none",
            });
            queryItemInfo(res.resultStr);
          }
        },
      });
    }
  });

  /*wx.scanCode({
    success(res) {
      console.log(res)
      if (res?.result) {
        Taro.showToast({
          title: '扫描成功',
          icon: 'none',
        })
        const result = res.result
        const firstIndex = result.indexOf('-')
        const lastIndex = result.lastIndexOf('-')

        const itemno = result.substring(firstIndex + 1, lastIndex)
        Taro.navigateTo({
          url: '/inventory/pages/scanRes/index?itemno=' + itemno,
        })
      } else {
        Taro.showToast({
          title: '请重新扫描或手动输入',
          icon: 'none',
        })
      }
    },
  })*/
};

const handleSaveSubmit = async (submitFlag: boolean) => {
  if (submitFlag) {
    await validate();
  }
  const params = handleParams(submitFlag);
  console.log(params);

  const res = await saveSubmit(params);
  if (res === true) {
    Taro.showToast({
      title: "成功",
      icon: "none",
      mask: true,
    });
    setTimeout(() => {
      Taro.reLaunch({
        url: "/inventory/pages/query/index",
      });
    }, 1000);
  }
};

onBeforeMount(() => {
  // getDetails()
});

useDidShow(() => {
  /* if (orderStore.currGoodsInfo.itemId) {
    const target = choosedGoods.value.findIndex(
      (val) => val.itemId === orderStore.currGoodsInfo.itemId
    )
    if (target > -1) {
      choosedGoods.value[target] = orderStore.currGoodsInfo
    } else {
      choosedGoods.value.push(orderStore.currGoodsInfo)
    }
  } */
  // console.log(456, orderStore.tableItem)
});
</script>
<template>
  <div class="panDianIndex in-baseinfo-wrapper">
    <InventoryItem2 :data="orderStore.tableItem" />

    <div class="grid-20 mb-20">
      <div @click="goPage('addWuLiao')" class="pane-card">
        <image
          class="icon-32"
          src="../../../assets/images/in/s-add.png"
        ></image>
        <text class="link">添加物料</text>
      </div>
      <div @click="scanCode" class="pane-card">
        <image
          class="icon-32"
          src="../../../assets/images/in/s-scan.png"
        ></image>
        <text class="link">扫码添加</text>
      </div>
    </div>

    <div class="first-title mb-20">已盘点物料</div>
    <div
      class="wuliao mb-20"
      v-for="(data, index) in orderStore.choosedGoods"
      :key="data.goodsId"
    >
      <div class="white-card">
        <div class="wuliao-name">
          <div>{{ data.itemName }}</div>
          <div @click="handleClick(data, index)" class="edit-btn">编辑</div>
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
        <div class="wuliao-class">
          <div class="wuliao-title">单位:</div>
          <div class="wuliao-value">
            {{ data.unit }}
          </div>
        </div>
        <div class="wuliao-class">
          <div class="wuliao-title">库区:</div>
          <div class="wuliao-value">
            {{ data.areaName }}
          </div>
        </div>
        <div class="second-card">
          <div class="flex">
            <div class="wuliao-class">
              <div class="wuliao-title">库存数量</div>
              <div class="wuliao-value">
                {{ data.quantity || 0 }}
              </div>
            </div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">盘点数量：</div>
            <div class="wuliao-value">{{ data.checkQuantity }}</div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">盘盈数量：</div>
            <div class="wuliao-value">{{ data.checkInQuantity }}</div>
          </div>
          <div class="wuliao-class">
            <div class="wuliao-title">盘亏数量：</div>
            <div class="wuliao-value">{{ data.checkOutQuantity }}</div>
          </div>
        </div>
      </div>
    </div>
    <nut-empty
      description="暂无单据"
      v-if="orderStore.choosedGoods?.length === 0"
    >
      <template #image>
        <image src="../../../assets/images/empty.png" />
      </template>
    </nut-empty>
    <div class="btn-wrapper">
      <div @click="handleSaveSubmit(false)" class="btn-primary2-plain mb-20">
        暂存
      </div>
      <!--      <div @click="handleSaveSubmit(true)" class="btn-primary2">提交</div>-->
    </div>
    <nut-action-sheet
      v-model:visible="show"
      :menu-items="menuItems"
      @choose="choose"
    />
  </div>
</template>
<style lang="scss">
@import "../../../assets//styles/in.scss";
page {
  background-color: #f3f5f7;
}
.panDianIndex {
  padding: 28px 32px;
  overflow-y: auto;
  // .grid-20 {
  //   display: grid;
  //   grid-template-columns: repeat(2, 1fr);
  //   gap: 20px;
  // }
  // .pane-card {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   background-color: #fff;
  //   border-radius: 20px;
  //   padding: 20px;
  //   font-size: 28px;
  //   margin-top: 20px;
  //   .count-row {
  //     display: flex;
  //   }
  //   .icon-32 {
  //     width: 32px;
  //     height: 32px;
  //     margin-right: 20px;
  //   }
  //   .link {
  //     color: #0091ff;
  //   }
  //   .count-wrapper {
  //     display: flex;
  //     flex: 1;
  //     .icon image {
  //       width: 80px;
  //       height: 80px;
  //       margin-right: 36px;
  //     }
  //     .count {
  //       color: #0b77ff;
  //       font-size: 36px;
  //       margin-bottom: 8px;
  //     }
  //     .count-red {
  //       @extend .count;
  //       color: #f63c54;
  //     }
  //     .name {
  //       font-size: 28px;
  //     }
  //   }
  // }
}
</style>
