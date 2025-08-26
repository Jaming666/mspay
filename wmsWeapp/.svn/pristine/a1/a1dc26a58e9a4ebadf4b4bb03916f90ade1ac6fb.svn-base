import { checkLogin, getOpenId } from 'api/login'
import { getDetId } from '../api/common'
import Taro from '@tarojs/taro'


export function useCheckLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (resp) => {
        if (resp.code) {
          // 微信登录成功 已拿到code
          // 获取openId
          getOpenId({
            code: resp.code,
          }).then(async (response) => {
            if (response.respCode === 'C000000000') {
              // Taro.setStorageSync('openId', response.openId)
              Taro.setStorage({
                key: "openId",
                data: response.openId,
                success(res) {
                  checkLogin().then(response => {
                    if (response.data.openId) {
                      Taro.setStorageSync('user', JSON.stringify(response.data))
                      // 保存用户信息
                      orderStore.setUser(response.data)
                      resolve()
                    } else {
                      Taro.showToast({
                        title: 'openId获取失败',
                        icon: 'none',
                        duration: 2000
                      })
                      reject()
                    }
                  })
                },
              })
            } else {
              Taro.showToast({
                title: 'openId获取失败',
                icon: 'none',
                duration: 2000,
              })
            }
          })

        } else {
          console.log('登录失败！' + resp.errMsg)
          reject()
        }
      }
    })
  })
}

/**
 * @description: 设置请求用到的cookie
 * @return {*}
 */
export function useSetCookie() {
  const Token = Taro.getStorageSync('Token')
  return `Admin-Token=${Token}`
}
export function useSetCookieBearer() {
  const Token = Taro.getStorageSync('Token')
  return `Bearer ${Token}`
}

export function getUserInfo() {
  getDetId()
}
