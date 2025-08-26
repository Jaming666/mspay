<script setup lang="ts">
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { computed, reactive, ref, onBeforeMount } from "vue";
import basics from "./basics.vue";
import material from "./material.vue";
import auditRecords from "./auditRecord.vue";
import {
  getApprovers,
  submitApproval,
  getProcessTaskDetail,
  getInventoryDetail,
  getShipmentDetail,
  getReceiptDetail,
  getApproveHistoryDetail,
} from "../../../api/backlog";
const currentPage = getCurrentInstance().router?.params;

const formRef = ref(null);
const activeTab = ref(1);

const showDialog = ref(false);
const showDialog1 = ref(false);
const yourDataObject = ref({});
const detailInfo = ref({});
const details = ref([]);
const approveDetailList = ref([]);
const detailType = ref("inventory");
const formData = reactive({
  nextAuditUser: "",
  remark: "",
});
const approvers = ref([]);
const initView = () => {
  getApprover();
  getProcessTask();
};
// 获取审批人列表
const getApprover = async () => {
  const res = await getApprovers(currentPage.id);
  approvers.value = res.nextAuditors.map((item) => ({
    name: item.nickName,
    id: item.userId,
  }));
};
// 获取流程任务详情
const getProcessTask = async () => {
  const res = await getProcessTaskDetail(currentPage.id);
  yourDataObject.value = res;
  switch (res.procCode) {
    case "INVENTORY_CHECK_APPLY":
    case "INVENTORY_CHECK_SUBMIT":
      detailType.value = "inventory";
      await getNextAuditorDetail();
      break;
    case "INVENTORY_LOSS_OUTBOUND":
    case "USE_OUTBOUND":
    case "FRMLOSS_OUTBOUND":
    case "GIFT_OUTBOUND":
    case "LEND_OUTBOUND":
    case "OTHER_OUTBOUND":
    case "PICK_OUTBOUND":
      detailType.value = "shipment";
      await queryShipmentOrderDetail();
      break;
    case "PROCURE_WAREHOUSING":
    case "INVENTORY_WAREHOUSING":
    case "BORROW_WAREHOUSING":
    case "RETURN_WAREHOUSING":
    case "PRESENTED_WAREHOUSING":
    case "OPENING_WAREHOUSING":
    case "OTHER_WAREHOUSING":
      detailType.value = "receipt";
      await queryReceiptOrderDetail();
      break;
    case "WAREHOUSING_CHANGE":
      // 特殊处理逻辑
      break;
  }
  await getApproveHistory(res.procInstId, res.id);
};
// 获取审批历史详情记录
const getApproveHistory = async (procInstId, taskId) => {
  // 库存相关数据获取逻辑
  const res = await getApproveHistoryDetail(procInstId, taskId);
  approveDetailList.value = res;
};
const getNextAuditorDetail = async () => {
  //  盘点单详情获取
  const res = await getInventoryDetail(currentPage.id);
  detailInfo.value = res.check;
  detailInfo.value.inventoryCheckStatusName = res.inventoryCheckStatusName;
  detailInfo.value.inventoryCheckTypeName = res.inventoryCheckTypeName;
  details.value = res.checkDetails;
};

const queryShipmentOrderDetail = async () => {
  // 出库单详情获取
  const res = await getShipmentDetail(currentPage.id);
  detailInfo.value = res;
  details.value = res.details;
};

const queryReceiptOrderDetail = async () => {
  // 入库单详情获取
  const res = await getReceiptDetail(currentPage.id);
  detailInfo.value = res;
  details.value = res.details;
};
// 添加选择器事件处理
const handlePickerChange = (e) => {
  const index = e.detail.value;
  formData.nextAuditUser = approvers.value[index].id;
};
// 拒绝操作
const handleReject = async () => {
  if (!formData.remark) {
    Taro.showToast({ title: "请输入拒绝理由", icon: "error" });
    return;
  }
  try {
    await submitApproval({
      processTaskId: currentPage.id,
      remark: formData.remark || "",
      auditState: "N", // 拒绝状态
    }); // 调用拒绝接口
    Taro.showToast({ title: "操作成功" });
    goBack();
  } catch (error) {
    console.error("拒绝失败:", error);
  }
};

// 打开审批弹窗
const handleApprove = () => {
  showDialog.value = true;
};
// 打开拒绝弹窗
const handleApprove1 = () => {
  showDialog1.value = true;
};

// 确认审批
const handleConfirm = async () => {
  // if (!formData.nextAuditUser && approvers.value.length > 0) {
  //   Taro.showToast({ title: "请选择审批人", icon: "error" });
  //   return;
  // }
  try {
    await submitApproval({
      processTaskId: currentPage.id,
      nextAuditUser: formData.nextAuditUser || "",
      remark: formData.remark || "",
      auditState: "Y", // 同意状态
    });
    Taro.showToast({ title: "提交成功" });
    showDialog.value = false;
    goBack();
  } catch (error) {
    console.error("提交失败:", error);
  }
};

// 取消操作
const handleCancel = () => {
  showDialog.value = false;
  formData.nextAuditUser = "";
  formData.remark = "";
};
// 取消操作
const handleCancel1 = () => {
  showDialog1.value = false;
  formData.remark = "";
};
const goBack = () => {
  Taro.navigateBack();
};
useDidShow(() => {
  initView();
});
onBeforeMount(async () => {});
</script>
<template>
  <div class="in-baseinfo-wrapper">
    <nut-tabs v-model="activeTab">
      <nut-tab-pane title="基础信息" pane-key="1">
        <basics
          :basicData="yourDataObject"
          :orderData="detailInfo"
          :detailType="detailType"
        />
      </nut-tab-pane>
      <nut-tab-pane title="物料信息" pane-key="2">
        <material :basicData="details" :detailType="detailType" />
      </nut-tab-pane>
      <nut-tab-pane title="审核历史" pane-key="3">
        <auditRecords :approveDetailList="approveDetailList" />
      </nut-tab-pane>
    </nut-tabs>
    <div class="fixed-bottom" v-if="currentPage.type == 'INIT'">
      <nut-button class="action-btn" type="default" @click="handleApprove1"
        >拒绝</nut-button
      >
      <nut-button class="action-btn" type="primary" @click="handleApprove"
        >同意</nut-button
      >
    </div>
    <div class="fixed-bottom" v-if="currentPage.type == 'DONE'">
      <nut-button class="action-btn" type="default" @click="goBack"
        >返回</nut-button
      >
    </div>

    <!-- 审批弹窗 -->
    <nut-popup
      position="center"
      v-model:visible="showDialog"
      :style="{
        width: '90%',
        borderRadius: '12px',
        overflow: 'hidden',
      }"
    >
      <div class="approve-dialog">
        <div class="dialog-header">
          <div>审批确认</div>
        </div>
        <div class="dialog-content">
          <nut-form>
            <nut-form-item label="下一步审批人" v-if="approvers.length !== 0">
              <picker
                :value="formData.nextAuditUser"
                :range="approvers"
                range-key="name"
                @change="handlePickerChange"
              >
                <view class="picker">
                  {{
                    formData.nextAuditUser
                      ? approvers.find((a) => a.id === formData.nextAuditUser)
                          ?.name
                      : "请选择审批人"
                  }}
                </view>
              </picker>
            </nut-form-item>
            <nut-form-item label="备注">
              <nut-textarea
                v-model="formData.remark"
                placeholder="请输入备注"
                rows="3"
              />
            </nut-form-item>
          </nut-form>
        </div>
        <div class="dialog-footer">
          <nut-button shape="square" class="cancel-btn" @click="handleCancel"
            >取消</nut-button
          >
          <div class="divider"></div>
          <nut-button
            type="primary"
            shape="square"
            class="confirm-btn"
            @click="handleConfirm"
            >确认</nut-button
          >
        </div>
      </div>
    </nut-popup>
    <!-- 拒绝弹窗 -->
    <nut-popup
      position="center"
      v-model:visible="showDialog1"
      :style="{
        width: '90%',
        borderRadius: '12px',
        overflow: 'hidden',
      }"
    >
      <div class="approve-dialog">
        <div class="dialog-header">
          <div>审批拒绝</div>
        </div>
        <div class="dialog-content">
          <nut-form>
            <nut-form-item label="备注">
              <nut-textarea
                v-model="formData.remark"
                placeholder="请输入备注"
                rows="3"
              />
            </nut-form-item>
          </nut-form>
        </div>
        <div class="dialog-footer">
          <nut-button shape="square" class="cancel-btn" @click="handleCancel1"
            >取消</nut-button
          >
          <div class="divider"></div>
          <nut-button
            type="primary"
            shape="square"
            class="confirm-btn"
            @click="handleReject"
            >确认</nut-button
          >
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<style lang="scss">
@import "../../../assets//styles/in.scss";
.btn-wrapper .btn-primary2 {
  margin-bottom: 20px;
}
// 添加 picker 样式
.picker {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  color: #666;

  &::after {
    content: "▼";
    float: right;
    font-size: 12px;
    color: #999;
  }
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #fff;
  display: flex;
  gap: 20px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);

  .action-btn {
    flex: 1;
  }
}

.approve-dialog {
  display: flex;
  flex-direction: column;
  background: #fff;

  .dialog-header {
    text-align: center;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }

  .dialog-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .dialog-footer {
    display: flex;
    border-top: 1px solid #f0f0f0;

    .nut-button {
      flex: 1;
      border-radius: 0;
    }

    .divider {
      width: 1px;
      background: #f0f0f0;
    }

    .cancel-btn {
      background: #f8f8f8;
      color: #666;
    }

    .confirm-btn {
      background: linear-gradient(135deg, #1989fa, #076dd9);
    }
  }
}
</style>
