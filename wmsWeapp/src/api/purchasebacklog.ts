import request from '../utils/request'
/**
 * @description: 查询待办任务列表
 * @param {*} data
 * @return {*}
 */
export function queryProcessTaskList(data, pageReq) {
  return request({
    url: '/wmsapi/wx/purchase/process/list?page=' + pageReq.page + "&size=" + pageReq.size,
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
    url: '/wmsapi/wx/purchase/process/getNextReviewer/' + id,
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
    url: '/wmsapi/wx/purchase/process/detail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 查询流程名称列表
 * @param {*} 
 * @return {*}
 */
export function queryProcessDefineCodes() {
  return request({
    url: '/wmsapi/wx/purchase/process/codes',
    methods: 'get',
  })
}
/**
 * @description: 查询客户项目部列表
 * @param {*} data
 * @return {*}
 */
export function getUserDeptList(data) {
  return request({
    url: '/wmsapi/wx/purchase/process/project/codes',
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
    url: '/wmsapi/wx/purchase/process/processAuditSave',
    methods: 'post',
    data
  })
}
/**
 * @description: 普通审批流程订单详情获取
 * @param {*} id
 * @return {*}
 */
export function getPurchaseProcessDetail(id) {
  return request({
    url: '/wmsapi/wx/purchase/process/getPurchaseProcessDetail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 开票审批流程订单详情获取
 * @param {*} id
 * @return {*}
 */
export function getReceiptProcessDetail(id) {
  return request({
    url: '/wmsapi/wx/purchase/process/getReceiptProcessDetail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 付款审批流程订单详情获取
 * @param {*} id
 * @return {*}
 */
export function getPaymentProcessDetail(id) {
  return request({
    url: '/wmsapi/wx/purchase/process/getPaymentProcessDetail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 评论审批流程订单详情获取
 * @param {*} id
 * @return {*}
 */
export function getEvaluateProcessDetail(id) {
  return request({
    url: '/wmsapi/wx/purchase/process/getEvaluateProcessDetail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 退款审批流程订单详情获取
 * @param {*} id
 * @return {*}
 */
export function getRefundProcessDetail(id) {
  return request({
    url: '/wmsapi/wx/purchase/process/getRefundProcessDetail/' + id,
    methods: 'get',
  })
}
/**
 * @description: 获取审批历史详情

 * @param {*}
 * @return {*}
 */
export function getApproveHistoryDetail(procInstId) {
  return request({
    url: '/wmsapi/wx/purchase/process/getProcessHistory/' + procInstId,
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
