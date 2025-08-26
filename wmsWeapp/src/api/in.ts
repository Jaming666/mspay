import request from '../utils/request'


/**
 * @description: 入库单列表查询
 * @param {*} data
 * @return {*}
 */
export function getList(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/list',
    methods: 'post',
    data
  })
}


/**
 * @description: 查询仓库
 * @return {*}
 */
export function getCangKuList() {
  return request({
    url: '/wmsapi/wx/warehouse/listByManager?page=0&size=1000',
    methods: 'post',
  })
}
/**
 * @description: 查询仓库---跳转专用
 * @return {*}
 */
export function getCangKuListout(code) {
  return request({
    url: '/wmsapi/bpm/wx/warehouse/listByManager?usercode=' + code + '&page=0&size=1000',
    methods: 'post',
  })
}
/**
 * @description: 查询入库仓库
 * @return {*}
 */
export function getCangKuList1() {
  return request({
    url: '/wmsapi/wx/warehouse/listFiltrationByManager?page=0&size=1000',
    methods: 'post',
    data: { type: 'receipt_filtration' }
  })
}



/**
 * @description: 根据入库类型查询关联订单号
 * @param {*} receiptOrderType
 * @return {*}
 */
export function getOrders(receiptOrderType: String, warehouseId: String) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getOrderNos',
    methods: 'post',
    data: {
      receiptOrderType,
      warehouseId
    }
  })
}


/**
 * @description: 根据订单号查询已入库数量、未入库数量
 * @param {*} data
 * @return {*}
 */
export function getInCount(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getOrderDetailByOrderNoCount',
    methods: 'get',
    data
  })
}

/**
 * @description: 根据仓库查询库区
 * @return {*}
 */
export function getAreaByWare(warehouseId) {
  return request({
    url: '/wmsapi/wx/area/list?page=0&size=1000',
    methods: 'post',
    data: {
      warehouseId
    }
  })
}
/**
 * @description: 根据仓库查询库区---跳转专用
 * @return {*}
 */
export function getAreaByWareout(warehouseId) {
  return request({
    url: '/wmsapi/bpm/wx/area/list?page=0&size=1000',
    methods: 'post',
    data: {
      warehouseId
    }
  })
}
/**
 * @description: 会计科目列表
 * @return {*}
 */
export function getSubject(data) {
  return request({
    url: '/wmsapi/wms/itemType/list/publicNoChild',
    methods: 'post',
    data
  })
}
/**
 * @description: 会计科目列表---跳转专用
 * @return {*}
 */
export function getSubjectout(data) {
  return request({
    url: '/wmsapi/bpm/wms/itemType/list/publicNoChild',
    methods: 'post',
    data
  })
}
/**
 * @description: 记账说明列表
 * @return {*}
 */
export function getRemarkEntry() {
  return request({
    url: '/wmsapi/system/dict/data/type/wms_remark_entry_type',
    methods: 'get',
  })
}
/**
 * @description: 记账说明列表---跳转专用
 * @return {*}
 */
export function getRemarkEntryout() {
  return request({
    url: '/wmsapi/bpm/system/dict/data/type/wms_remark_entry_type',
    methods: 'get',
  })
}

/**
 * @description: 查询关联订单号
 * @param {*} data
 * @return {*}
 */
export function getLinkedOrders(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getOrderInfos',
    methods: 'post',
    data
  })
}

/**
 * @description: 扫描物料二维码信息
 * @param {*} data
 * @return {*}
 */
export function scanItemQrCode(data) {
  return request({
    url: '/wmsapi/wx/qrcode/scanItemQrCode',
    methods: 'get',
    data
  })
}
/**
 * @description: 扫描物料二维码信息---跳转专用
 * @param {*} data
 * @return {*}
 */
export function scanItemQrCodeout(data) {
  return request({
    url: '/wmsapi/bpm/wx/qrcode/scanItemQrCode',
    methods: 'get',
    data
  })
}

/**
 * @description: 暂存入库单
 * @param {*} data
 * @return {*}
 */
export function saveOrder(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/add-or-update',
    methods: 'post',
    data
  })
}

/**
 * @description: 提交入库单
 * @param {*} data
 * @return {*}
 */
export function submitOrder(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/receiptSubmit',
    methods: 'post',
    data
  })
}

/**
 * @description: 作废入库单
 * @param {*} data
 * @return {*}
 */
export function invalidOrder(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/dropReceiptOrder',
    methods: 'post',
    data
  })
}

/**
 * @description: 修正入库单
 * @param {*} data
 * @return {*}
 */
export function correctOrder(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/correctReceiptOrder',
    methods: 'post',
    data
  })
}

/**
 * @description: 查询入库单详情
 * @param {*} id
 * @return {*}
 */
export function getReceiptDetails(id) {
  return request({
    url: `/wmsapi/wx/receiptOrder/${id}`,
    methods: 'get'
  })
}

/**
 * @description: 查询货架详情
 * @param {*} data
 * @return {*}
 */
export function getStorageRacksList(data) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getStorageRacksList',
    methods: 'post',
    data: data
  })
}

