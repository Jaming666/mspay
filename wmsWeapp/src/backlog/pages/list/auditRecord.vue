<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { formatTime } from "src/utils";

enum AuditRes {
  "N" = "拒绝",
  "Y" = "同意",
}
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
onBeforeMount(() => {});
export interface Props {
  approveDetailList?: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  approveDetailList: () => [],
});
</script>
<template>
  <div class="audit">
    <div
      class="audit-card"
      v-for="record in props.approveDetailList"
      :key="record.id"
    >
      <div class="head">
        <div class="audit-user">{{ record.createUserName }}</div>
        <div class="audit-date">{{ formatTime(record.addTime) }}</div>
      </div>
      <div class="audit-remark">
        {{ showAuditResult(record) }}
      </div>
    </div>
    <nut-empty
      description="暂无审核记录"
      v-if="props.approveDetailList?.length === 0"
    >
      <template #image>
        <image src="../../../assets/images/empty.png" />
      </template>
    </nut-empty>
  </div>
</template>
<style lang="scss">
.audit {
  padding: 20px;
  margin-bottom: 80px;
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
