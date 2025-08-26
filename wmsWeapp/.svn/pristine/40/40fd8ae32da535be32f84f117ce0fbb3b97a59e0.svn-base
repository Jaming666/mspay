<script setup lang="ts" name="InDocListItem">
import { useCodesStore } from "../../../stores/codes";
import { formatTime } from "src/utils";
const codesStore = useCodesStore();

interface Props {
  data: any;
  status?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});
</script>
<template>
  <div class="docitem">
    <div class="head">
      <div class="left">
        <div>{{ data.procName }}</div>
      </div>
    </div>

    <div class="doc-body">
      <div class="doc-row">
        <div class="label">流程编号</div>
        <div class="value">
          {{ data.procInstId }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">任务名称</div>
        <div class="value">
          {{ data.taskName }}
        </div>
      </div>
      <div class="doc-row">
        <div class="label">项目部名称</div>
        <div class="value">
          {{ data.projectName }}
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="label">
        {{ data.createUserName }}
      </div>
      <div class="label">
        {{ formatTime(data.addTime) }}
      </div>
      <div class="value" v-if="status == 'INIT'">
        <div>审批</div>
      </div>
      <div class="value" v-if="status == 'DONE'">
        <div>查看</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.docitem {
  position: relative;
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
      width: 160px;
    }
    .value {
      flex: 1;
    }
  }
  .head {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #e7e7e7;
    padding-bottom: 20px;
    font-size: 28px;
    line-height: 44px;
    font-weight: bold;
    .left {
      flex: 1;
      padding-right: 120px;
    }
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
  .footer {
    display: flex;
    justify-content: space-between;
    color: #323233;
    font-size: 28px;
    line-height: 40px;
    border-top: 1px solid #e7e7e7;
    padding: 20px 0 10px 0;
    .value {
      height: 52px;
      width: 92px;
      line-height: 52px;
      text-align: center;
      color: #fff;
      background: blue;
      border-radius: 10px;
    }
  }
  .status {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: normal;
    font-size: 28px;
    border-radius: 0 20px 0 20px;
    background-color: #3791ff;
    color: #fff;
    padding: 2px 20px;
  }
  .status-1 {
    @extend .status;
  }
  .status-2 {
    @extend .status;
    background-color: rgba(253, 115, 0, 1);
  }
  .status-3 {
    @extend .status;
    background-color: rgba(6, 164, 129, 1);
  }
  .status-4,
  .status-5 {
    @extend .status;
    background-color: rgba(215, 69, 109, 1);
  }
}
</style>
