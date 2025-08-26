export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  // debugger
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 保留两位小数
export function paseMoney(num) {
  const digit = 2
  let nums = (num || 0).toString().split('.')
  return nums[0] + '.' + (nums[1] || '0').padEnd(digit, '0')
}

// 座机 粗校验：只允许输入数字加 ‘-’
export function validateTel(tel) {
  const reg = /^(?:(?:\d{3}-)?\d{4,11}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/
  return reg.test(tel)
}

// 校验手机号格式
export function validatePhone(phone) {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(phone)
}

// 手机号脱敏
export function formatPhoneNo(phone) {
  if (phone) {
    return phone.toString().replace(
      /(\d{3})\d{4}(\d{4})/,
      '$1****$2'
    )
  }
  return phone
}

// 银行卡号脱敏
export function formatBankCardNo(cardNo) {
  if (cardNo) {
    return cardNo.replace(
      /^(.{4})(?:\d+)(.{4})$/,
      '$1 **** **** $2'
    )
  }
  return cardNo
}


const isLeapYear = function (y: number): boolean {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
};
const getMonthDays = function (year: string, month: string): number {
  if (/^0/.test(month)) {
    month = month.split('')[1];
  }
  return ([
    0,
    31,
    isLeapYear(Number(year)) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ] as number[])[month as any];
};

// 获取当月起止时间
export function getCurrentMounthDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month + '';
  let yearMonth = `${year}-${month}`;
  let currMonthDays = getMonthDays(year + '', month + '');
  return [`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`];
}


/**
 * @description: 码表返显中文
 * @param {*} value
 * @param {*} options
 * @return {*}
 */
export function showNameByValue(value, options, labelKey = 'dictLabel', valueKey = 'dictValue') {
  const target = options.find(val => val[valueKey].toString() === (value || '').toString())

  if (target) {
    return target[labelKey]
  }
  return value
}

/** 防抖 */
export function debounce(func, wait, immediate) {
  var timeout, result
  var debounced = function () {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      const canNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (canNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

export function toPrecision(num, pre) {
  if (pre === void 0)
    pre = 2;
  return Number.parseFloat(`${Math.round(num * 10 ** pre) / 10 ** pre}`);
};

/**
 * @description: 相加
 * @param {*} val1
 * @param {*} val2
 * @return {*}
 */
export function increase(val1, val2) {
  if (Object.prototype.toString.call(val1) !== '[object Number]' || Object.prototype.toString.call(val2) !== '[object Number]') {
    return new Error('参数必需number')
  }

  const length1 = (val1.toString().split('.')[1] || '0').length
  const length2 = (val2.toString().split('.')[1] || '0').length

  let max = Math.max(length1, length2);
  const precisionFactor = 10 ** max;

  return toPrecision((precisionFactor * val1 + precisionFactor * val2) / precisionFactor, max);
}

export function minus(val1, val2) {
  if (Object.prototype.toString.call(val1) !== '[object Number]' || Object.prototype.toString.call(val2) !== '[object Number]') {
    return new Error('参数必需number')
  }

  const length1 = (val1.toString().split('.')[1] || '0').length
  const length2 = (val2.toString().split('.')[1] || '0').length

  let max = Math.max(length1, length2);
  const precisionFactor = 10 ** max;

  return toPrecision((precisionFactor * val1 - precisionFactor * val2) / precisionFactor, max);
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}


export function formatTime(time) {
  const str = time.replace(/T/g, ' ')
  const end = str.indexOf('.') > -1 ? str.indexOf('.') : str.length - 1
  const date = str.substring(0, end)
  return date
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
