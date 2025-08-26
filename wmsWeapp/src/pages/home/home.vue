<script setup lang="ts">
import Taro, { useDidShow } from "@tarojs/taro";
import { getMenu } from "../../api/common";
import {
  getBackLogCount,
  getUnauditedReceiptOrderCount,
  getApprovedShipmentOrderCount,
  getUnCheckCount,
  getFindProcessAuditCount,
} from "../../api/backlog";
import { useCodesStore } from "../../stores/codes";
import Bannde1 from "../../assets/images/banner1.png";
import Bannde2 from "../../assets/images/banner2.png";
import { ref } from "vue";
const list = ref([Bannde1, Bannde2]);
const backlogCount = ref(1);
const unAuditedOrderCount = ref(1);
const approvedOrderCount = ref(1);
const unCheckOrderCount = ref(1);
const FindProcessAuditCount = ref(1);
const codeStore = useCodesStore();
const showMenus = ref({
  showInMemu: false, // 入库菜单
  showPickingMenu: false, // 领料菜单
  showOutMenu: false, // 出库菜单
  showInventoryMenu: false, // 盘点菜单
  showPurchaseMenu: false, // 采购订单菜单
  showToDoMenu: false, // 待办菜单
  showPurchaseApproval: false, // 采购待办菜单
});
const goPage = (pageName: string) => {
  const url = {
    in: "/in/pages/list/index",
    out: "/out/pages/query/index?",
    out1: "/out/pages/query/index1",
    purchase: "/purchase/pages/query/index",
    inventory: "/inventory/pages/query/index",
    backlog: "/backlog/pages/index/index",
    purchasebacklog: "/purchasebacklog/pages/index/index",
  };
  Taro.navigateTo({
    url: url[pageName],
  });
};

const initView = async () => {
  codeStore.getDeptIdList();
  const menus = await getMenu();
  console.log("menus", menus);
  // 权限判断逻辑
  showMenus.value = menus;
  if (menus.showToDoMenu) {
    const backlog = await getBackLogCount();
    backlogCount.value = backlog.data > 99 ? "99+" : backlog.data;
  }
  // 模仿
  if (menus.showInMemu) {
    const unCount = await getUnauditedReceiptOrderCount();
    unAuditedOrderCount.value = unCount.data > 99 ? "99+" : unCount.data;
  }
  if (menus.showOutMenu) {
    const approvedCount = await getApprovedShipmentOrderCount();
    approvedOrderCount.value =
      approvedCount.data > 99 ? "99+" : approvedCount.data;
  }
  if (menus.showInventoryMenu) {
    const uncheckCount = await getUnCheckCount();
    unCheckOrderCount.value =
      uncheckCount.data > 99 ? "99+" : uncheckCount.data;
  }
  if (menus.showPurchaseApproval) {
    const uncheckCount = await getFindProcessAuditCount();
    FindProcessAuditCount.value =
      uncheckCount.data > 99 ? "99+" : uncheckCount.data;
  }
};

useDidShow(() => {
  initView();
});
</script>
<template>
  <div class="home">
    <nut-swiper
      :init-page="2"
      :auto-play="3000"
      pagination-visible
      pagination-color="#426543"
      pagination-unselected-color="#808080"
    >
      <nut-swiper-item
        v-for="(item, index) in list"
        :key="index"
        style="height: 160px"
      >
        <img
          :src="item"
          alt=""
          style="height: 100%; width: 100%"
          draggable="false"
        />
      </nut-swiper-item>
    </nut-swiper>

    <div class="card">
      <div class="card-title">出入库管理</div>
      <div class="card-body">
        <div
          class="card-menu"
          v-if="showMenus.showInMemu"
          @click="goPage('in')"
        >
          <image src="../../assets/images/home/icon-in.png"></image>
          <nut-badge
            v-if="unAuditedOrderCount > 0"
            class="badge"
            :value="unAuditedOrderCount"
            color="#ee0a24"
            :top="-45"
            :right="0"
          />
          <div class="menu-name">入库</div>
        </div>
        <div
          class="card-menu"
          v-if="showMenus.showPickingMenu"
          @click="goPage('out')"
        >
          <image src="../../assets/images/home/get.svg"></image>
          <div class="menu-name">领料</div>
        </div>
        <div
          class="card-menu"
          v-if="showMenus.showOutMenu"
          @click="goPage('out1')"
        >
          <image src="../../assets/images/home/icon-out.png"></image>
          <nut-badge
            v-if="approvedOrderCount > 0"
            class="badge"
            :value="approvedOrderCount"
            color="#ee0a24"
            :top="-45"
            :right="0"
          />
          <div class="menu-name">出库</div>
        </div>
        <div
          class="card-menu"
          v-if="showMenus.showInventoryMenu"
          @click="goPage('inventory')"
        >
          <image src="../../assets/images/home/icon-pandian.png"></image>
          <nut-badge
            v-if="unCheckOrderCount > 0"
            class="badge"
            :value="unCheckOrderCount"
            color="#ee0a24"
            :top="-45"
            :right="0"
          />
          <div class="menu-name">盘点</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">待办中心</div>
      <div class="card-body">
        <div
          class="card-menu"
          @click="goPage('backlog')"
          v-if="showMenus.showToDoMenu"
        >
          <image src="../../assets/images/home/icon-backlog.png"></image>
          <nut-badge
            v-if="backlogCount > 0"
            class="badge"
            :value="backlogCount"
            color="#ee0a24"
            :top="-45"
            :right="0"
          />
          <div class="menu-name">库存待办</div>
        </div>
        <div
          class="card-menu"
          @click="goPage('purchasebacklog')"
          v-if="showMenus.showPurchaseApproval"
        >
          <image src="../../assets/images/home/icon-purchase1.png"></image>
          <nut-badge
            v-if="FindProcessAuditCount > 0"
            class="badge"
            :value="FindProcessAuditCount"
            color="#ee0a24"
            :top="-45"
            :right="0"
          />
          <div class="menu-name">采购待办</div>
        </div>
      </div>
    </div>
    <div class="card" v-if="showMenus.showPurchaseMenu">
      <div class="card-title">订单查询</div>
      <div class="card-body">
        <div class="card-menu" @click="goPage('purchase')">
          <image src="../../assets/images/home/icon-purchase.png"></image>
          <div class="menu-name">采购订单</div>
        </div>
        <!-- <div class="card-menu">
          <image src="../../assets/images/home/icon-lingliao.png"></image>
          <div class="menu-name">领料订单</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.home {
  .card {
    padding: 10px 32px 0 32px;
    .card-title {
      color: #303030;
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .card-body {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 30px 20px;
      background-color: #fff;
      border-radius: 16px;
      .card-menu {
        text-align: center;
        font-size: 32px;
        image {
          width: 96px;
          height: 96px;
        }
      }
    }
  }
}
</style>
