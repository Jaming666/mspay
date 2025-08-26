import request from '../utils/request'

/**
 * @description: 获取数据字典
 * @param {string} dataType
 * @return {*}
 */
export function getDatas(dataType: string) {
  return request({
    url: `/wmsapi/wx/receiptOrder/type/${dataType}`,
    methods: 'get'
  })
}
/**
 * @description: 获取数据字典---跳转专用
 * @param {string} dataType
 * @return {*}
 */
export function getDatasout(dataType: string) {
  return request({
    url: `/wmsapi/bpm/system/dict/data/type/${dataType}`,
    methods: 'get'
  })
}

/**
 * @description: 查询供应商
 * @param {*} data
 * @return {*}
 */
export function getSupplier(data) {
  return request({
    url: `/wmsapi/wms/supplier/list?page=0&size=1000`,
    methods: 'post'
  })
}

/**
 * @description: 查询用户信息
 * @return {*}
 */
export function getDetId() {
  return request({
    url: '/wmsapi/system/dept/getUserDeptList',
    methods: 'get'
  })
}
/**
 * @description: 查询用户信息
 * @return {*}
 */
export function getRole() {
  return request({
    url: '/wmsapi/wx/user/getRole',
    methods: 'get'
  })
}
export function getMenu() {
  return request({
    url: '/wmsapi/wx/user/getUserMenu',
    methods: 'get'
  })
}

/**
 * @description: 生成单号
 * @param {*} bizPrefix
 * @return {*}
 */
export function createOrderNo(bizPrefix) {
  return request({
    url: '/wmsapi/wms/common/genOrderNo?bizPrefix=' + bizPrefix,
    methods: 'post'
  })
}
/**
 * @description: 生成单号---跳转专用
 * @param {*} bizPrefix
 * @return {*}
 */
export function createOrderNoout(bizPrefix) {
  return request({
    url: '/wmsapi/bpm/wms/common/genOrderNo?bizPrefix=' + bizPrefix,
    methods: 'post'
  })
}

/**
 * @description: 根据部门id查询仓库列表
 * @param {*} data
 * @return {*}
 */
export function getCangkuByDepId(data) {
  return request({
    url: '/wmsapi/wx/warehouse/list?page=0&size=1000',
    methods: 'post',
    data
  })
}

/**
 * @description: 获取用户信息
 * @return {*}
 */
export function getProfile() {
  return request({
    url: '/wmsapi/system/user/profile',
    methods: 'get',
  })
}

/**
 * @description: 查询单据审核记录
 * @param {*} data
 * @param {*} showTips 是否需要错误提示
 * @return {*}
 */
export function getAuditRecords(data, showTips = true) {
  return request({
    url: '/wmsapi/wx/process/detail/taskDetail',
    methods: 'get',
    data: {
      ...data,
      showTips
    }
  })
}
/**
 * @description: 查询单据审核记录---跳转专用
 * @param {*} data
 * @param {*} showTips 是否需要错误提示
 * @return {*}
 */
export function getAuditRecordsout(data, showTips = true) {
  return request({
    url: '/wmsapi/bpm/wx/process/detail/taskDetail',
    methods: 'get',
    data: {
      ...data,
      showTips
    }
  })
}

/**
 * @description: 获取物料分类
 * @return {*}
 */
export function getItemTypeList(data) {
  return request({
    url: '/wmsapi/wx/itemType/list?page=0&size=1000',
    methods: 'post',
    data
  })
}
/**
 * @description: 获取物料分类 --- 跳转专用
 * @return {*}
 */
export function getItemTypeListout(data) {
  return request({
    url: '/wmsapi/bpm/wx/itemType/list?page=0&size=1000',
    methods: 'post',
    data
  })
}

/**
 * @description: 获取利润中心下拉列表数据
 * @return {*}
 */
export function getProfitCenter(data) {
  return request({
    url: '/wmsapi/wms/profitcenter/list',
    methods: 'post',
    data
  })
}
/**
 * @description: 获取利润中心下拉列表数据---跳转专用
 * @return {*}
 */
export function getProfitCenterout(data) {
  return request({
    url: '/wmsapi/bpm/wms/profitcenter/list',
    methods: 'post',
    data
  })
}
/**
 * @description: 获取部门编号下拉列表数据
 * @return {*}
 */
export function getdepartment(data) {
  return request({
    url: '/wmsapi/wms/departView/list',
    methods: 'post',
    data
  })
}
/**
 * @description: 获取部门编号下拉列表数据---跳转专用
 * @return {*}
 */
export function getdepartmentout(data) {
  return request({
    url: '/wmsapi/bpm/wms/departView/list',
    methods: 'post',
    data
  })
}
