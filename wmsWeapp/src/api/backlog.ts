import request from '../utils/request'
/**
 * @description: 查询待办任务列表
 * @param {*} data
 * @return {*}
 */
export function queryProcessTaskList(data, pageReq) {
  return request({
    url: '/wmsapi/wx/process/task/list?page=' + pageReq.page + "&size=" + pageReq.size,
    methods: 'post',
    data,
  })
}

/**
 * @description: 获取审批人列表
 * @param {*} data
 * @return {*}
 */
export function getApprovers(id) {
  return request({
    url: '/wmsapi/wx/process/task/nextAuditor/' + id,
    methods: 'get',
  })
}
/**
 * @description: 获取流程任务详情
 * @param {*} data
 * @return {*}
 */
export function getProcessTaskDetail(id) {
  return request({
    url: '/wmsapi/wx/process/task/' + id,
    methods: 'get',
  })
}
/**
 * @description: 查询流程名称列表
 * @param {*} data
 * @return {*}
 */
export function queryProcessDefineCodes(data) {
  return request({
    url: '/wmsapi/wx/process/define/codes',
    methods: 'post',
    data
  })
}
/**
 * @description: 查询客户项目部列表
 * @param {*} data
 * @return {*}
 */
export function getUserDeptList(data) {
  return request({
    url: '/wmsapi/system/dept/getUserDeptList',
    methods: 'get',
  })
}
/**
 * @description: 提交审批
 * @param {*} data
 * @return {*}
 */
export function submitApproval(data) {
  return request({
    url: '/wmsapi/wx/process/processTaskAudit',
    methods: 'post',
    data
  })
}
/**
 * @description: 获取审核任务详细信息
 * @param {*} id
 * @return {*}
 */
export function getInventoryDetail(id) {
  return request({
    url: '/wmsapi/wx/process/task/inventoryCheck/' + id,
    methods: 'get',
  })
}
/**
 * @description: 审核出库详情
 * @param {*} id
 * @return {*}
 */
export function getShipmentDetail(id) {
  return request({
    url: '/wmsapi/wx/process/task/shipmentOrder/' + id,
    methods: 'get',
  })
}
/**
 * @description: 审核入库详情
 * @param {*} id
 * @return {*}
 */
export function getReceiptDetail(id) {
  return request({
    url: '/wmsapi/wx/process/task/receiptOrder/' + id,
    methods: 'get',
  })
}
/**
 * @description: 获取审批历史详情

 * @param {*}
 * @return {*}
 */
export function getApproveHistoryDetail(procInstId, taskId) {

  return request({
    url: '/wmsapi/wx/process/detail?procInstId=' + procInstId + '&taskId=' + taskId,
    methods: 'get',
  })
}
/**
 * @description: 获取待办数量
 * @param {*}
 * @return {*}
 */
export function getBackLogCount() {
  return request({
    url: '/wmsapi/wx/process/getPendAuditTaskCount',
    methods: 'get',
  })
}

/**
 * 入库-待审核订单数量
 */
export function getUnauditedReceiptOrderCount() {
  return request({
    url: '/wmsapi/wx/receiptOrder/getUnauditedReceiptOrderCount',
    methods: 'get',
  })
}

/**
 * 出库-已审批数量
 *
 */
export function getApprovedShipmentOrderCount() {
  return request({
    url: '/wmsapi/wx/shipmentOrder/getApprovedShipmentOrderCount',
    methods: 'get',
  })
}

/**
 * 盘点-待盘点数量
 */
export function getUnCheckCount() {
  return request({
    url: '/wmsapi/wx/inventoryCheck/getUnCheckCount',
    methods: 'get',
  })
}
/**
 * 采购待办-待审批数量
 */
export function getFindProcessAuditCount() {
  return request({
    url: '/wmsapi/wx/purchase/process/findProcessAuditCount',
    methods: 'get',
  })
}
