// https://pinia.esm.dev/introduction.html
import { defineStore, acceptHMRUpdate } from 'pinia'
import Taro from '@tarojs/taro'
// import { getCangkuByDepId } from '../api/common'
import { getCangKuList, getCangKuList1, getCangKuListout } from '../api/in'
import { useCodesStore } from './codes'

const codeStore = useCodesStore()
/** 这是主要放了入库/出库/盘点相关的操作信息 */
export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      /** 旧单据数据 */
      originOrderInfo: {},
      /** 入库/出库/盘点单详情信息 */
      orderInfo: {},
      /** 当前正在操作的物料信息 */
      currGoodsInfo: {},
      /** 已选择的确定入库的物料信息 */
      choosedGoods: [],
      /** 出库\盘点时可用的仓库 */
      warehouse: [],
      /** 入库\盘点时可用的仓库 */
      warehouse1: [],
      /** 出库\入库\盘点时可用的单号 */
      orderNoLast: [],
      /** 盘点单列表接口返回的数据 */
      tableItem: {},
      /** 货架详情信息 */
      racksList: {}
    }
  },
  getters: {
  },
  actions: {
    /** 保存旧单据数据 */
    setOriginData(data) {
      this.originOrderInfo = data
    },
    /**
     * @description: 查询用户可用仓库
     * @return {*}
     */
    async getCangKu() {
      const warehouse = await getCangKuList()
      this.warehouse = warehouse.result
    },
    /**
     * @description: 查询用户可用仓库---跳转专用接口
     * @return {*}
     */
    async getCangKuOut(data) {
      const warehouse = await getCangKuListout(data)
      this.warehouse = warehouse.result
    },
    /**
     * @description: 查询用户入库可用仓库
     * @return {*}
     */
    async getCangKu1() {
      const warehouse = await getCangKuList1()
      this.warehouse1 = warehouse.result
    },
    /** 保存单据详情 */
    setOrderInfo(data) {
      this.orderInfo = data
    },
    /** 保存单据详情 */
    setOrderNoLast(data) {
      this.orderNoLast = data
    },
    /** 保存正在操作的物料信息 */
    setCurrGoodsInfo(data) {
      this.currGoodsInfo = data
    },
    /**
     * @description: 更新全部物料信息
     * @param {*} data
     * @return {*}
     */
    setChoosedGoods(data) {
      this.choosedGoods = data
    },
    /**
     * @description: 更新指定的物料信息
     * @param {*} data
     * @param {*} index
     * @return {*}
     */
    setChoosedGoodsByIndex(data, index) {
      this.choosedGoods[index] = data
    },
    setTableItemData(data) {
      this.tableItem = data
    }
  },
})
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(useOrderStore, import.meta.webpackHot))
}
