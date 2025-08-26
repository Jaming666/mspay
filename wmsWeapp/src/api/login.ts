import request from '../utils/request'

export function getOpenId(data) {
  return request({
    url: '/mp/getOpenid',
    methods: 'post',
    data
  })
}
// oz8gg46dEbfCwbl3HOXNrqwLQ8cU
export function checkLogin(data) {
  return request({
    url: '/user/checkLogin',
    methods: 'post',
    data
  })
}

/**
 * @description: 获取短信验证码
 * @param {string} phone
 * @return {*}
 */
export function getMsg(phone: string) {
  return request({
    url: '/wmsapi/login/sendLoginSms',
    methods: 'get',
    data: {
      phone
    }
  })
}

/**
 * @description: 登录
 * @param {object} data
 * @return {*}
 */
export function login(data: { phone: string; smscode: string; code: string }) {
  return request({
    url: '/wmsapi/login/phone',
    methods: 'post',
    data
  })
}
/**
 * @description: 自动登录
 * @param {object} data
 * @return {*}
 */
export function autologin(data: { ticket: string }) {
  return request({
    url: '/wmsapi/login/autologin',
    methods: 'post',
    data
  })
}

export function logOut(data) {
  return request({
    url: '/user/logout',
    methods: 'post',
    data
  })
}
