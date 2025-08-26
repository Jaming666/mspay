import request from '../utils/request'

/**
 * @description: 查询盘点点列表
 * @param {*} data
 * @return {*}
 */
export function getList(data) {
  return request({
    url: '/wmsapi/wx/inventoryCheck/list',
    methods: 'post',
    data
  })
}

/**
 * @description: 查询盘点单详情
 * @param {*} id
 * @return {*}
 */
export function getInventoryDetails(checkNo) {
  return request({
    url: `/wmsapi/wx/inventoryCheck/query-check-info`,
    methods: 'get',
    data: {
      checkNo
    }
  })
}

/**
 * @description: 当前盘点物料
 * @param {*} checkNo
 * @return {*}
 */
export function getInventoryGood(checkNo) {
  return request({
    url: `/wmsapi/wx/inventoryCheck/detail`,
    methods: 'get',
    data: {
      checkNo
    }
  })
}

/**
 * @description: 盘点单详情统计信息
 * @param {*} checkNo
 * @return {*}
 */
export function detailcount(checkNo) {
  return request({
    url: `/wmsapi/wx/inventoryCheck/detailcount`,
    methods: 'get',
    data: {
      checkNo
    }
  })
}

/**
 * @description: 申请盘点单
 * @param {*} data
 * @return {*}
 */
export function submitApply(data) {
  return request({
    url: "/wmsapi/wx/inventoryCheck/apply",
    methods: "post",
    data
  });
}

/**
 * @description: 暂存/提交
 * @param {*} data
 * @return {*}
 */
export function saveSubmit(data) {
  return request({
    url: "/wmsapi/wx/inventoryCheck/update",
    methods: "post",
    data
  });
}

/**
 * @description: 作废
 * @param {*} checkNo
 * @return {*}
 */
export function del(checkNo) {
  return request({
    url: "/wmsapi/wx/inventoryCheck/cancel?checkNo=" + checkNo,
    methods: "post"
  });
}

/**
 * @description: 获取物料在库位下的数量
 * @param {*} data
 * @return {*}
 */
export function getInventorycount(data) {
  return request({
    url: `/wmsapi/wx/item/getInventorycount`,
    methods: 'get',
    data
  })
}