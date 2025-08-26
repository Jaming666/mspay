import Taro from '@tarojs/taro'
import { logError } from './error'
import { HttpStatus, TranMessage } from './status'
import baseUrl from './baseUrl'
import { logOut } from '../api/login'
import { useSetCookie, useSetCookieBearer } from './checkLogin'

// 生产
// const baseUrl =

export type Response = {
  respCode: string
  respData: any
  respMsg: string
  openId?: string
}

const service: (params: any) => Promise<Response> = (params) => {

  return new Promise((resolve, reject) => {
    const { url, data = {}, methods, boundary } = params
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    const path = Taro.getCurrentInstance().router.path
    // let _baseUrl = baseUrl
    let _baseUrl = ''

    const reqData = {
      ...data,
    }

    Taro.request({
      url: _baseUrl + url,
      data: reqData,
      header: {
        'Cookie': useSetCookie(),
        'Authorization': useSetCookieBearer(),
        'content-type': 'application/json;charset=utf-8'
      },
      method: methods,
      complete() {

      },
      success(res) {
        Taro.hideLoading()
        const { data } = res

        if (res.statusCode === 200) {
          // 判断成功状态
          if (data.code === 200 || 'C000000000' === res.data.respCode) {
            return resolve(data)
          } else {
            if (data.code) {
              if (401 === data.code) {
                Taro.clearStorage()

                // 本地启动的时候用login地址打包上线的时候切换回autoLogin的地址
                let url = '/login/pages/autoLogin/autoLogin'
                if (process.env.NODE_ENV === 'development') {
                  url = '/login/pages/login/login'
                }
                Taro.redirectTo({ url })
                return
              } else {
                if (reqData.showTips !== false) {
                  Taro.showModal({
                    content: data.msg,
                    showCancel: false
                  })
                }
                return resolve(data)
              }
            } else {
              return resolve(data)
            }
          }
        }
        if (res.statusCode === HttpStatus.NOT_FOUND) {
          Taro.showToast({
            title: '请求资源不存在'
          })
          return Promise.reject(new Error('Error'))
        }
        if (res.statusCode === HttpStatus.BAD_GATEWAY || res.statusCode === HttpStatus.SERVER_ERROR) {
          Taro.showToast({
            title: '服务端出现问题',
            icon: 'error'
          })
          return Promise.reject(new Error('Error'))
        }
        if (res.statusCode === HttpStatus.FORBIDDEN) {
          Taro.showToast({
            title: '没有权限访问'
          })
          return Promise.reject(new Error('Error'))
        }
      },
      error(e) {
        logError('http', '请求后台异常', e)
        Taro.hideLoading()
      }
    })
  })
}

export default service
