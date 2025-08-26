import request from '../utils/request'

/**
 * @description: 汇总信息
 * @param {string} userId 用户id
 * @param {string} warehouseId 仓库id
 * @return {*}
 */
export function getTotalCount(userId: string, warehouseId: string) {
  return request({
    url: '/goods/getTotalInfo',
    methods: 'post',
    data: {
      userId,
      warehouseId
    }
  })
}

/**
 * @description: 查询仓库信息
 * @param {*} data
 * @return {*}
 */
export function getWarehouses(userId: string) {
  return request({
    url: '/goods/getWarehouses',
    methods: 'post',
    data: {
      userId
    }
  })
}

