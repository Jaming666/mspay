<script setup lang="ts">
import { getCurrentInstance } from "@tarojs/taro";
import { computed, ref, onBeforeMount } from "vue";
import { detailcount } from "src/api/out";
import { increase } from "src/utils/index";
import { useOrderStore } from "src/stores/order";

const currentPage = getCurrentInstance().router?.params;
const orderStore = useOrderStore();
const countInfo = ref({
  /** 数量 */
  count: 0,
  /** 种类 */
  typecount: 0,
  /** 钱 */
  pricecount: 0,
});
interface Props {
  outStatus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  outStatus: false,
});
const sumNum = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => increase(pre, Number(curr.chooseCount || 0)),
    0
  )
);
const sumNum1 = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => increase(pre, Number(curr.realOutQuantity || 0)),
    0
  )
);
const sumNum2 = computed(() =>
  orderStore.choosedGoods.reduce(
    (pre, curr) => pre + (Number(curr.realOutQuantity || 0) ? 1 : 0),
    0
  )
);

const sumType = computed(() =>
  orderStore.choosedGoods.reduce((pre, curr) => {
    if (!pre.includes(curr.itemTypeNameCascade)) {
      return [...pre, curr.itemTypeNameCascade];
    } else {
      return pre;
    }
  }, [])
);

onBeforeMount(() => {
  if (!currentPage.id) return;
  detailcount(currentPage.id).then((res) => {
    if (res?.typecount) {
      countInfo.value = res;
    }
  });
});
</script>
<template>
  <div class="pd-20">
    <div class="first-title mb-20">数据展示</div>
    <div class="white-card-row" v-if="!props.outStatus">
      <div class="item">
        <div>出库总数量</div>
        <div>{{ sumNum }}</div>
      </div>
      <div class="item">
        <div>出库种类</div>
        <div>{{ orderStore.choosedGoods.length }}</div>
      </div>
      <!-- <div class="item">
        <div>出库金额(价税)</div>
        <div>{{ countInfo.pricecount }}</div>
      </div> -->
    </div>
    <div class="" v-if="props.outStatus">
      <div class="white-card-row">
        <div class="item">
          <div>
            出库总数量
            <test style="font-size: 12px; margin-left: 5px">(应出)</test>
          </div>
          <div>{{ sumNum }}</div>
        </div>
        <div class="item">
          <div>
            出库种类
            <test style="font-size: 12px; margin-left: 5px">(应出)</test>
          </div>
          <div>{{ orderStore.choosedGoods.length }}</div>
        </div>
        <!-- <div class="item">
        <div>出库金额(价税)</div>
        <div>{{ countInfo.pricecount }}</div>
      </div> -->
      </div>
      <div class="white-card-row" style="margin-top: 10px">
        <div class="item">
          <div>
            出库总数量
            <test style="font-size: 12px; margin-left: 5px">(实出)</test>
          </div>
          <div>{{ sumNum1 }}</div>
        </div>
        <div class="item">
          <div>
            出库种类
            <test style="font-size: 12px; margin-left: 5px">(实出)</test>
          </div>
          <div>{{ sumNum2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
