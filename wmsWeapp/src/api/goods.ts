import request from '../utils/request'

/**
 * @description: 查询物料信息
 * @param {*} data
 * @return {*}
 */
export function getGoodList(data) {
  return request({
    url: '/wmsapi/wx/item/list',
    methods: 'post',
    data
  })
}

/**
 * @description: 根据单号和入库类型查物料
 * @param {*} orderNo
 * @param {*} receiptOrderType
 * @return {*}
 */
export function getItemByOrderNo(orderNo, receiptOrderType, showTips = true) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getOrderDetailByOrderNo',
    methods: 'get',
    data: {
      orderNo,
      receiptOrderType,
      showTips
    }
  })
}

/**
 * @description: 物料页面上方统计信息
 * @return {*}
 */
export function getItemInfoCount(data) {
  return request({
    url: '/wmsapi/wx/item/getItemInfoCount',
    methods: 'post',
    data
  })
}

/**
 * @description: 获取物料的库位信息
 * @param {*} itemNo 物料编码
 * @return {*}
 */
export function getRelaInfo(itemNo) {
  return request({
    url: '/wmsapi/wx/item/listatom',
    methods: 'get',
    data: {
      itemNo
    }
  })
}

/**
 * @description: 通过二维码获取物料信息
 * @param {*} qrcode 二维码
 * @param warehouseId
 * @return {*}
 */
export function getInfoByQrcode(qrcode: string, warehouseId: string) {
  return request({
    url: '/wmsapi/wx/item/getInfoByQrcode',
    methods: 'get',
    data: {
      qrcode, warehouseId
    }
  })
}
/**
 * @description: 通过二维码获取物料信息---跳转专业
 * @param {*} qrcode 二维码
 * @param warehouseId
 * @return {*}
 */
export function getInfoByQrcodeout(qrcode: string, warehouseId: string) {
  return request({
    url: '/wmsapi/bpm/wx/item/getInfoByQrcode',
    methods: 'get',
    data: {
      qrcode, warehouseId
    }
  })
}
/**
 * @description: 通过二维码获取物料信息----首页的扫一扫
 * @param {*} qrcode 二维码
 * @param warehouseId
 * @return {*}
 */
export function getInfoByQrcode2(qrcode: string, warehouseId: string) {
  return request({
    url: '/wmsapi/wx/item/getInfoByHomeQrcode',
    methods: 'get',
    data: {
      qrcode, warehouseId
    }
  })
}
/**
 * @description: 通过二维码获取物料信息----根据出库单获取信息

 * @param {*} qrcode 二维码
 * @param {*} shipmentOrderId 出库单id
 * @return {*}
 */
export function getInfoByQrcode1(qrcode: string, warehouseId: string, shipmentOrderId: string) {
  return request({
    url: '/wmsapi/wx/shipmentOrder/getInfoByQrcode',
    methods: 'get',
    data: {
      qrcode, warehouseId, shipmentOrderId
    }
  })
}
