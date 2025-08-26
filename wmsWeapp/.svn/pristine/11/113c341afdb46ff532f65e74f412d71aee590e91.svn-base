import request from '../utils/request'

/**
 * @description: 出库单列表查询
 * @param {*} data
 * @return {*}
 */
export function getList(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/list',
    methods: 'post',
    data
  })
}

/**
 * @description: 暂存出库单
 * @param {*} data
 * @return {*}
 */
export function saveCreate(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/add-or-update',
    methods: 'post',
    data
  })
}
/**
 * @description: 查询出库单详情
 * @param {*} id
 * @return {*}
 */
export function getOrderDetails(id) {
  return request({
    url: `/wmsapi/wx/shipmentOrder/${id}`,
    methods: 'get'
  })
}

/**
 * @description: 出库-查询关联订单号
 * @param {*} data
 * @return {*}
 */
export function getLinkedOrders(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/getOrderNos',
    methods: 'post',
    data
  })
}

/**
 * @description: 根据关联单号查物料
 * @param {*} data
 * @param {*} pageReq
 * @return {*}
 */
export function getDetailsByOrder(data, pageReq) {
  return request({
    url: `/wmsapi/wx/shipmentOrder/getOrderDetailByOrderNo?page=${pageReq.page}&size=${pageReq.size}`,
    methods: 'post',
    data
  })
}

/**
 * @description: 详情统计信息
 * @param {string} shipmentOrderId
 * @return {*}
 */
export function detailcount(shipmentOrderId: string) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/detailcount',
    methods: 'get',
    data: {
      shipmentOrderId
    }
  })
}

/**
 * @description: 暂存出库单
 * @param {*} data
 * @return {*}
 */
export function saveOrder(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/add-or-update',
    methods: 'post',
    data
  })
}

/**
 * @description: 查询仓库下的物料信息，区分库区
 * @param {*} data
 * @return {*}
 */
export function getItems(data) {
  return request({
    url: `/wmsapi/wx/inventory/getInventoryListByWarahouse?page=${data.currentPage}`,
    methods: 'post',
    data
  })
}

/**
 * @description: 提交出库
 * @param {*} data
 * @return {*}
 */
export function submitOrder(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/shipmentSubmit',
    methods: 'post',
    data
  })
}

/**
 * @description: 作废出库单
 * @param {*} id
 * @return {*}
 */
export function invalidOutOrder(id) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/dropShipmentOrder',
    methods: 'post',
    data: {
      id
    }
  })
}

/**
 * @description: 扫描物料二维码信息
 * @param {*} data
 * @return {*}
 */
export function scanItemQrCodeOut(data) {
  return request({
    url: '/wmsapi/wx/qrcode/scanItemQrCodeRtn',
    methods: 'get',
    data
  })
}
/**
 * @description: 扫描物料二维码信息-为了实时获取应出实出数据
 * @param {*} data
 * @return {*}
 */
export function scanItemQrCodeOutNew(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/shipmentItemDetail',
    methods: 'get',
    data
  })
}
/**
 * @description: 库管员出库
 * @param {*} data
 * @return {*}
 */
export function applyShipment(data) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/applyShipment',
    methods: 'post',
    data: data
  })
}
/**
 * @description: 获取供应商列表
 * @return {*}
 */
export function getSupplier() {
  return request({
    url: '/wmsapi/wx/supplier/listAll',
    methods: 'post',
  })
}
