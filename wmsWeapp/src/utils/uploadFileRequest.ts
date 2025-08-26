import Taro from '@tarojs/taro'
import baseUrl from './baseUrl'
import { useSetCookie, useSetCookieBearer } from './checkLogin'

export const beforeXhrUpload = (taroUploadFile: any, options: any) => {
  const openId = Taro.getStorageSync('openId')
  Taro.compressImage({
    src: options.taroFilePath, // 图片路径
    quality: 50, // 压缩质量
    success(SuccessCallbackResult) {
      // console.log(SuccessCallbackResult)
      const { tempFilePath } = SuccessCallbackResult
      // taroUploadFile  是 Taro.uploadFile ， 你也可以自定义设置其它函数
      const uploadTask = taroUploadFile({
        url: baseUrl + '/public/uploadImage.do',
        filePath: tempFilePath || options.taroFilePath,
        fileType: options.fileType,
        header: {
          'Content-Type': 'multipart/form-data',
          ...options.headers
        }, //
        data: {
          openId
        },
        formData: {
          ...options.formData,
          openId
        },
        name: options.name,
        success(response: { errMsg: any; statusCode: number; data: string }) {
          if (options.xhrState == response.statusCode) {
            options.onSuccess?.(response, options)
          } else {
            options.onFailure?.(response, options)
          }
        },
        fail(e: any) {
          options.onFailure?.(e, options)
        }
      })
      options.onStart?.(options)
      uploadTask.progress((res: { progress: any; totalBytesSent: any; totalBytesExpectedToSend: any }) => {
        options.onProgress?.(res, options)
        // console.log('上传进度', res.progress);
        // console.log('已经上传的数据长度', res.totalBytesSent);
        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      })
      // uploadTask.abort(); // 取消上传任务
    }
  })
}

/**
 * @description: 下载图片返回图片的临时地址
 * @param {string} itemid
 * @return {*}
 */
export function downloadFile(itemid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // const filePath = wx.env.USER_DATA_PATH + '/' + new Date().getTime().toString() + itemid
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    Taro.downloadFile({
      header: {
        'Cookie': useSetCookie(),
        'Authorization': useSetCookieBearer(),
        // 'content-type': 'multipart/form-data'
      },
      // filePath,
      url: baseUrl + '/wmsapi/wx/qrcode/loadItemQrCode?itemid=' + itemid,
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          Taro.hideLoading()
          resolve(res)
        } else {
          reject()
        }
      }
    })
  })
}

/**
 * @description: 在线预览文档
 * @param {string} fdfsId
 * @return {*}
 */
export function showDocument(fdfsId: string) {
  if (!fdfsId) {
    Taro.showToast({
      title: '文档地址不存在',
      icon: 'none'
    })
    return
  }
  const imgUrl = baseUrl + '/incoming/fastdfspublic/downFdfsById?fdfsId=' + fdfsId
  const url = wx.env.USER_DATA_PATH + '/' + new Date().getTime().toString() + imgUrl.slice(imgUrl.lastIndexOf('.'))
  wx.downloadFile({
    url: imgUrl,
    filePath: url,
    success: function (res) {
      const filePath = res.filePath
      wx.openDocument({
        filePath: filePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        },
        fail: function (msg) {
          console.log(msg)
        }
      })
    }
  })
}