<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { ref, onBeforeMount } from "vue";
import { getAuditRecordsout } from "src/api/common";
import { formatTime } from "src/utils";

enum AuditRes {
  "N" = "拒绝",
  "Y" = "同意",
}
const currentPage = getCurrentInstance().router?.params;
const auditRecords = ref([]);
interface Props {
  disabled?: boolean;
  outStatus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  outStatus: false,
});
const initView = async () => {
  const res = await getAuditRecordsout(
    {
      receiptOrderType: currentPage.type,
      receiptOrderNo: currentPage.orderNo,
    },
    false
  );
  if (Array.isArray(res)) {
    auditRecords.value = res;
  }
};
const showAuditResult = (data) => {
  const arr = [];
  if (data.auditResult) {
    arr.push(AuditRes[data.auditResult]);
  }
  if (data.auditRemark) {
    arr.push(data.auditRemark);
  }
  return arr.join(" | ");
};
onBeforeMount(() => {
  initView();
});
</script>
<template>
  <div class="audit">
    <div class="audit-card" v-for="record in auditRecords" :key="record.id">
      <div class="head">
        <div class="audit-user">{{ record.createUserName }}</div>
        <div class="audit-date">{{ formatTime(record.addTime) }}</div>
      </div>
      <div class="audit-remark">
        {{ showAuditResult(record) }}
      </div>
    </div>
    <nut-empty description="暂无审核记录" v-if="auditRecords?.length === 0">
      <template #image>
        <image src="../../assets/images/empty.png" />
      </template>
    </nut-empty>
  </div>
</template>
<style lang="scss">
.audit {
  padding: 20px;
  .audit-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 20px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .audit-date {
      font-size: 24px;
    }
    .audit-remark {
      color: #999999;
      font-size: 28px;
    }
  }
}
</style>
