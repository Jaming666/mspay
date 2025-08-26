// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'
import { getDatas, getDatasout, getItemTypeList, getDetId, getProfitCenter, getProfitCenterout } from '../api/common'

export const useCodesStore = defineStore('codes', {
  state: () => {
    return {
      deptIdList: [],
      receiptOrderStatus: [],
      receiptOrderTypeData: [],
      invoiceType: [],
      /** 盘点单状态 */
      inventoryCheckType: [],
      /** 盘点单审核状态 */
      inventoeyCheckStatus: [],
      /** 物料分类 一级 */
      itemTypeList: [],
      /** 出库类型 */
      outOrderTypeList: [],
      /** 出库单状态 */
      outOrderStatusList: [],
      /** 利润中心下拉列表 */
      profitCenterList: [],
      /** 部门编号下拉列表 */
      departmentList: []
    }
  },
  getters: {
  },
  actions: {
    getDeptIdList() {
      getDetId().then(res => {
        if (res?.data) {
          const deptIdList = res.data.map(item => item.deptId)
          this.deptIdList = deptIdList
        }
      })
    },
    async getInDatas() {
      const res1 = await getDatas('wms_invoice_type')
      if (res1) {
        this.invoiceType = res1.data
      }
      const res2 = await getDatas('wms_receipt_type')
      if (res2) {
        this.receiptOrderTypeData = res2.data
      }
      const res3 = await getDatas('wms_receipt_status')
      if (res3) {
        this.receiptOrderStatus = res3.data
      }


    },
    async getInventoryDatas() {
      const res1 = await getDatas('wms_check_type')
      if (res1) {
        this.inventoryCheckType = res1.data
      }
      const res2 = await getDatas('wms_check_status')
      if (res2) {
        this.inventoeyCheckStatus = res2.data
      }
    },
    /**
     * @description: 获取一级物料分类
     * @return {*}
     */
    async getGoodClass() {
      const item = await getItemTypeList({
        level: 1
      })
      if (item) {
        this.itemTypeList = item.content
      }
    },
    /**
     * @description: 查询出库单页面码表
     * @return {*}
     */
    async getOutDatas() {
      const res1 = await getDatas('wms_shipment_type')
      if (res1) {
        this.outOrderTypeList = res1.data
      }
      const res2 = await getDatas('wms_shipment_status')
      if (res2) {
        this.outOrderStatusList = res2.data
      }
    },
    /**
     * @description: 查询出库单页面码表---跳转专用
     * @return {*}
     */
    async getOutDatasout() {
      const res1 = await getDatasout('wms_shipment_type')
      if (res1) {
        this.outOrderTypeList = res1.data
      }
      const res2 = await getDatasout('wms_shipment_status')
      if (res2) {
        this.outOrderStatusList = res2.data
      }
    },
    /**
    * @description: 根据仓库id查询利润中心
    * @return {*}
    */
    async getProfitCenter(data) {
      const profitCenterList = await getProfitCenter(data)
      if (profitCenterList) {
        this.profitCenterList = profitCenterList
      }
    },
    /**
    * @description: 根据仓库id查询利润中心---跳转专用
    * @return {*}
    */
    async getProfitCenterout(data) {
      const profitCenterList = await getProfitCenterout(data)
      if (profitCenterList) {
        this.profitCenterList = profitCenterList
      }
    },
    setProfitCenter(data) {
      this.profitCenterList = data
    },
    setRecStatus(data) {
      this.receiptOrderStatus = data
    },
    setRecType(data) {
      this.receiptOrderTypeData = data
    },
    setInvoiceType(data) {
      this.invoiceType = data
    },
    setDepartmentList(data) {
      this.departmentList = data
    },
  },
})
