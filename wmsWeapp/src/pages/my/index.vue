<script setup lang="ts">
import { ref } from 'vue'
import Taro, { useDidShow } from '@tarojs/taro'
import { ArrowRight } from '@nutui/icons-vue-taro'
import { getProfile } from '../../api/common'
import { formatPhoneNo } from 'src/utils/index'
import CusNav from '../../components/CusNav/index.vue'

const userInfo = ref({})
const goPage = (pageName: string) => {
  const url = {
    manage: '/my/pages/cangKu/manage',
    params: '/my/pages/params/index',
  }
  Taro.navigateTo({
    url: url[pageName],
  })
}

const logOut = () => {
  Taro.showModal({
    content: '是否确定退出登录?',
    success: function (res) {
      if (res.confirm) {
        Taro.clearStorage()
        Taro.reLaunch({
          url: '/login/pages/autoLogin/autoLogin',
        })
        // 退出时清空token
        Taro.setStorage({
	        key: 'Token',
	        data: '',
	        success: () => {},
	      })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
useDidShow(() => {
  getProfile().then((res) => {
    if (res?.data) {
      userInfo.value = res.data
    }
  })
})
</script>
<template>
  <div class="my-wrapper">
    <CusNav :title="'我的'" :className="'white'"></CusNav>
    <div class="head">
      <div class="user-pic">
        <image src="../../assets/images/my/user.png"></image>
      </div>
      <div>
        <div class="info">
          <div class="name">{{ userInfo.nickName }}</div>
          <div>{{ formatPhoneNo(userInfo.phonenumber) }}</div>
        </div>
        <!-- <div class="info">{{ userInfo.deptName }}</div> -->
      </div>
    </div>

    <div class="bottom">
      <div class="my-cell-group">
        <div class="my-cell" @click="goPage('manage')">
          <div class="icon-wrapper">
            <image
              class="cell-icon"
              src="../../assets/images/my/icon-ware.png"
            ></image>
          </div>
          <div class="my-cell-title">我的仓库</div>
          <ArrowRight />
        </div>
        <div class="my-cell" @click="goPage('params')">
          <div class="icon-wrapper">
            <image
              class="cell-icon"
              src="../../assets/images/my/icon-params.png"
            ></image>
          </div>
          <div class="my-cell-title">参数设置</div>
          <ArrowRight />
        </div>
      </div>
    </div>

    <div class="btn-primary" @click="logOut">退出登录</div>
  </div>
</template>

<style lang="scss">
@import '../../assets/styles/common.scss';
page {
  background-color: #f3f5f7;
}
.my-wrapper {
  background: url('../../assets//images/my/my-bg.png') no-repeat;
  background-size: 100% 436px;
  .head {
    display: flex;
    align-items: center;
    color: #fff;
    padding: 84px 40px 74px 40px;
    font-size: 28px;
    .user-pic image {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    .info {
      display: flex;
      align-items: center;
      line-height: 2;
      margin-bottom: 10px;
    }
    .name {
      font-size: 36px;
      margin-right: 32px;
    }
  }
  .bottom {
    margin-bottom: 100px;
  }
  .my-cell-group {
    background-color: #fff;
    padding: 0 44px;
    .cell-icon {
      width: 44px;
      height: 44px;
      margin-right: 20px;
    }
    .my-cell {
      display: flex;
      padding: 34px 0 34px 0;
      border-bottom: 1px solid #f4f4f4;
    }
    .my-cell-title {
      flex: 1;
    }
  }
}
</style>
