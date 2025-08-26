export default defineAppConfig({
  pages: [
    'pages/home/home',
    'pages/wuliao/index',
    'pages/scan/index',
    'pages/my/index'
  ],
  subPackages: [
    {
      root: 'login',
      pages: [
        'pages/autoLogin/autoLogin',
        'pages/autoLogin/oacallback',
        'pages/login/login'
      ]
    },
    {
      root: 'in', // 入库
      pages: [
        'pages/list/index',
        'pages/cangKu/choose', // 仓库库位选择
        'pages/type/choose', // 入库类型选择
        'pages/baseInfo/index', // 入库单据
        'pages/wuLiaoList/list', // 添加物料
        'pages/calcPrice/index', // 添加物料-计算价格选择数量
        'pages/linkedOrder/index', // 关联订单
        'pages/scanRes/index', // 扫描结果
        'pages/scanRes/indexOut', // 扫描结果
      ]
    },
    {
      root: 'my',
      pages: [
        'pages/cangKu/manage', // 仓库管理
        'pages/cangKuDet/index', // 仓库详情
        'pages/params/index', // 参数管理
        'pages/paramsDetails/details', // 参数详情
      ]
    },
    {
      root: 'wuliao',
      pages: [
        'pages/details/index', // 物料详情
      ]
    },
    {
      root: 'navigateToout',
      pages: [
        'pages/query/index', // 出库查询
        'pages/query/index1', // 出库查询
        'pages/baseInfo/index', // 详情
        'pages/baseInfo/index1', // 详情
        'pages/wuLiaoList/list', // 添加物料
        'pages/outCount/index', // 确六出库-填写出库数量
      ]
    },
    {
      root: 'out',
      pages: [
        'pages/query/index', // 出库查询
        'pages/query/index1', // 出库查询
        'pages/baseInfo/index', // 详情
        'pages/baseInfo/index1', // 详情
        'pages/wuLiaoList/list', // 添加物料
        'pages/outCount/index', // 确六出库-填写出库数量
      ]
    },
    {
      root: 'purchase', // 采购订单
      pages: [
        'pages/query/index', // 查询
        'pages/details/index', // 详情
      ]
    },
    {
      root: 'inventory',
      pages: [
        'pages/query/index', // 盘点单查询
        'pages/baseInfo/index', // 盘点单详情
        'pages/baseInfo/create', // 新增盘点单
        'pages/panDian/index', // 物料盘点
        'pages/panDianEdit/index', // 物料盘点-物料信息填写
        'pages/addWuLiao/index', // 物料盘点-添加物料
        'pages/scanRes/index', // 物料盘点-扫码添加
      ]
    },
    {
      root: 'backlog',
      pages: [
        'pages/index/index', //库存待办
        'pages/list/index', // 待办列表
        'pages/list/detail', // 待办详情
      ]
    },
    {
      root: 'purchasebacklog',
      pages: [
        'pages/index/index', //采购待办
        'pages/list/index', // 待办列表
        'pages/list/detail', // 待办详情
      ]
    }
  ],
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#0091FF',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/home',
        selectedIconPath: 'images/home.png',
        iconPath: 'images/home2.png',
        text: '首页'
      },
      {
        pagePath: 'pages/wuliao/index',
        selectedIconPath: 'images/wuliao.png',
        iconPath: 'images/wuliao2.png',
        text: '物料'
      },
      {
        pagePath: 'pages/scan/index',
        selectedIconPath: 'images/scan.png',
        iconPath: 'images/scan2.png',
        text: '扫一扫'
      },
      {
        pagePath: 'pages/my/index',
        selectedIconPath: 'images/my.png',
        iconPath: 'images/my2.png',
        text: '我的'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',

  },
  lazyCodeLoading: 'requiredComponents',
  '__usePrivacyCheck__': true
})
