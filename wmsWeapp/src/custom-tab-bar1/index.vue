<script setup>
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { ref } from 'vue'
import { useTabBarStore } from '../stores/tabbar'
import { useOrderStore } from 'src/stores/order'

const orderStore = useOrderStore()
const tabBarStore = useTabBarStore()
const color = '#000000'
const selectedColor = '#0091FF'
const list = [
  {
    pagePath: '/pages/home/home',
    selectedIconPath: require('../images/home.png'),
    iconPath: require('../images/home2.png'),
    text: '首页',
  },
  {
    pagePath: '/pages/wuliao/index',
    selectedIconPath: require('../images/wuliao.png'),
    iconPath: require('../images/wuliao2.png'),
    text: '物料',
  },
  {
    pagePath: '/pages/scan/index',
    selectedIconPath: require('../images/scan.png'),
    iconPath: require('../images/scan2.png'),
    text: '扫一扫',
  },
  {
    pagePath: '/pages/my/index',
    selectedIconPath: require('../images/my.png'),
    iconPath: require('../images/my2.png'),
    text: '我的',
  },
]

const selected = ref(0)

function switchTab(index, url) {
  tabBarStore.setTabbarActive(index)
  Taro.removeStorageSync('itemno')
  // orderStore.$reset()
  if (index === 2) {
    Taro.scanCode({
      complete(res) {
        console.log(res)
        if (res.errMsg === 'scanCode:ok') {
          Taro.showToast({
            title: '扫描成功',
            icon: 'none',
          })
          // 扫描结果
          const result = res.result
          const firstIndex = result.indexOf('-')
          const lastIndex = result.lastIndexOf('-')

          const itemno = result.substring(firstIndex + 1, lastIndex)
          Taro.setStorage({
            key: 'itemno',
            data: itemno,
            complete: () => {
              Taro.switchTab({
                url: list[2].pagePath,
              })
            },
          })
        } else {
          // Taro.switchTab({
          //   url: list[2].pagePath,
          // })
        }
      },
    })
    return
  }
  Taro.switchTab({ url })
}
</script>
<template>
  <view class="tab-bar">
    <view class="tab-bar-border"></view>
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @tap="switchTab(index, item.pagePath)"
    >
      <image
        class="cover-image"
        :src="
          tabBarStore.tabbarActive === index
            ? item.selectedIconPath
            : item.iconPath
        "
      />
      <view
        class="cover-view"
        :style="{
          color: tabBarStore.tabbarActive === index ? selectedColor : color,
        }"
        >{{ item.text }}
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item .cover-image {
  width: 38px;
  height: 38px;
  margin-bottom: 6px;
  margin-top: 10px;
}

.tab-bar-item .cover-view {
  font-size: 20px;
}
</style>
