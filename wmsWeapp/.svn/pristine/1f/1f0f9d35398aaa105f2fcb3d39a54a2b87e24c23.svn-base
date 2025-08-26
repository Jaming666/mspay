<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
interface MaterialInfo {}

export interface Props {
  evaluate?: MaterialInfo;
  detailType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  evaluate: () => {
    return {};
  },
  detailType: () => "",
});
</script>
<template>
  <div class="data-containe">
    <div class="data-section">
      <div class="data-item">
        <span class="data-label">评价类型</span>
        <span class="data-value">{{ props.evaluate.evaOrderType }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价开始时间</span>
        <span class="data-value">{{ props.evaluate.beginTime }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价结束时间</span>
        <span class="data-value">{{ props.evaluate.endTime }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价时间</span>
        <span class="data-value">{{ props.evaluate.addTime }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价操作员工号</span>
        <span class="data-value">{{ props.evaluate.userOperationNo }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价操作员名称</span>
        <span class="data-value">{{ props.evaluate.userOperationName }}</span>
      </div>
      <div class="data-item">
        <span class="data-label">评价说明</span>
        <span class="data-value">{{ props.evaluate.userOperationRemark }}</span>
      </div>
      <div
        class="data-item"
        v-for="(item, index) in props.evaluate.commentDetails"
        :key="index"
      >
        <span class="data-label"
          >{{ item.name }}{{ "( " + item.totalScore + " )" }}</span
        >

        <span class="data-value"
          >{{ item.score }} &nbsp;&nbsp; {{ item.content }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-containe {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin: 15px;
  margin-bottom: 90px;
  font-size: 32px;
  .data-section {
    margin-bottom: 20px;
    border-radius: 10px;
    background: #fff;
    .data-item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 20px;

      .data-label {
        color: #666;
        margin-right: 15px;
        display: block;
        min-width: 260px;
        max-width: 260px;
      }

      .data-value {
        color: #333;
        flex: 1;
        word-break: break-all;
      }

      .remark {
        color: #999;
      }
    }
  }

  .divider {
    height: 2px;
    background: #eee;
    margin: 20px 0;
  }

  .bottom-section {
    .data-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>