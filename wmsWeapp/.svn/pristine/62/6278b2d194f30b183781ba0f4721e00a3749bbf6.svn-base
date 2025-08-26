let baseUrl = ''

// h5模式不需要指定域名
if (process.env.TARO_ENV === 'h5') {
  baseUrl = ''
} else {
  // 其他平台
  if (process.env.API_ENV === 'test') {
    // baseUrl = 'https://saastest.msfpay.com'
    baseUrl = 'https://test.umbpay.com.cn'
  } else {
    baseUrl = 'https://www.umbpay.cn'
  }
}
export default baseUrl
