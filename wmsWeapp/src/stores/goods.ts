// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'

export const useGoodsStore = defineStore('goods', {
  state: () => {
    return { 
      good: {},
      /** 盘点时选择的标准采集物料 */
      standGood: {},
      /** 暂存 */
      tempStanGood: {},
      /** 未搜索到标准无聊 */
      notFind: false,
      refreshFlag: false
    }
  },
  getters: {
  },
  actions: {    
    setGood(data) {
      return new Promise((resolve) => {
        this.good = data
        resolve()
      })
    },
    setStandGood(data) {
      this.standGood = data
    },
    setTempStandGood(data) {
      this.tempStanGood = data
    },
    setNotFind(data) {
      this.notFind = data
    },
    setRefreshFlag(flag) {
      this.refreshFlag = flag
    }
  },
})
