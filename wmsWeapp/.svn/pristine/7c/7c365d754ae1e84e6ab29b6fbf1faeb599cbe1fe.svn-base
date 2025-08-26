import request from '../utils/request'

/**
 * @description: 采购列表查询
 * @param {*} data
 * @return {*}
 */
export function getPurchaseList(data) {
  return request({
    url: '/wmsapi/wx/purchase/list',
    methods: 'post',
    data
  })
}

/**
 * @description: 查询采购明细
 * @param {*} id
 * @return {*}
 */
export function getDetails(id) {
  return request({
    url: '/wmsapi/wx/purchase/detail',
    methods: 'get',
    data: {
      id
    }
  })
}


/**
 * @description: 详情中的数据信息
 * @param {*} id
 * @return {*}
 */
export function getDetailCount(id) {
  return request({
    url: '/wmsapi/wx/purchase/detailcount',
    methods: 'get',
    data: {
      id
    }
  })
}

/**
 * @description: 新增入库单时根据关联单号获取统计信息
 * @param {*} orderNo
 * @return {*}
 */
export function getCountInfoByOrderNo(orderNo) {
  return request({
    url: '/wmsapi/wx/receiptOrder/getCountInfoByOrderNo',
    methods: 'get',
    data: {
      orderNo
    }
  })
}