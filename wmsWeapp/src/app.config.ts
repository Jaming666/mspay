export default defineAppConfig({
  pages: [
    'pages/clockIn/clockIn',
    // 'pages/home/home',
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
  ],
  // tabBar: {
  //   custom: true,
  //   color: '#000000',
  //   selectedColor: '#0091FF',
  //   backgroundColor: '#ffffff',
  //   list: [
  //     {
  //       pagePath: 'pages/clockIn/clockIn',
  //       selectedIconPath: 'images/home.png',
  //       iconPath: 'images/home2.png',
  //       text: '打卡'
  //     },
  //     {
  //       pagePath: 'pages/home/home',
  //       selectedIconPath: 'images/home.png',
  //       iconPath: 'images/home2.png',
  //       text: '首页'
  //     },
  //     // {
  //     //   pagePath: 'pages/wuliao/index',
  //     //   selectedIconPath: 'images/wuliao.png',
  //     //   iconPath: 'images/wuliao2.png',
  //     //   text: '物料'
  //     // },
  //     // {
  //     //   pagePath: 'pages/scan/index',
  //     //   selectedIconPath: 'images/scan.png',
  //     //   iconPath: 'images/scan2.png',
  //     //   text: '扫一扫'
  //     // },
  //     // {
  //     //   pagePath: 'pages/my/index',
  //     //   selectedIconPath: 'images/my.png',
  //     //   iconPath: 'images/my2.png',
  //     //   text: '我的'
  //     // }
  //   ]
  // },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',

  },
  lazyCodeLoading: 'requiredComponents',
  '__usePrivacyCheck__': true
})
