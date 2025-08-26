<script setup lang="ts">
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { ref, onBeforeMount } from "vue";
import { getInventoryGood } from "src/api/inventory";
import { useOrderStore } from "src/stores/order";

interface Props {
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
const choosedGoods = ref([]);

const click = (data, index) => {
  editDoodInfo.data = data;
  editDoodInfo.index = index;
  show.value = true;
};
const goPage = (pageName: string) => {
  const url = {
    wuLiao: "/in/pages/wuLiaoList/list",
  };

  Taro.navigateTo({
    url: url[pageName],
  });
};

const getDetails = async () => {
  const res = await getInventoryGood(currentPage.orderNo);
  if (res) {
    orderStore.setChoosedGoods(res);
  }
};

const initView = () => {
  if (currentPage.orderNo) {
    getDetails();
  }
};

onBeforeMount(() => {
  initView();
});
</script>
<template>
  <div class="pd-20">
    <div class="first-title mtb-20">当前盘点物料</div>
    <div
      class="wuliao"
      v-for="(data, index) in orderStore.choosedGoods"
      :key="data.goodsId"
    >
      <div class="white-card">
        <div class="wuliao-name" @click="click(data, index)">
          <div>{{ data.itemName }}</div>
          <div v-if="!disabled" class="edit-btn">编辑</div>
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
      description="暂无数据"
      v-if="orderStore.choosedGoods?.length === 0"
    >
      <template #image>
        <image src="../../../../assets/images/empty.png" />
      </template>
    </nut-empty>
  </div>
</template>
<style lang="scss"></style>
