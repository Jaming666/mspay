<script setup>
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { reactive, ref, onMounted } from 'vue'
import CusNav from '../../../components/CusNav/index.vue'
import { getMsg, autologin } from '../../../api/login'
import { useTabBarStore } from 'src/stores/tabbar'

const tabBar = useTabBarStore()
const formRef = ref(null)
const msg = ref('')
const formData = ref({
  phone: '',
  smscode: '',
})

onMounted(() => {
  const currentPage = getCurrentInstance().router.params
  if(typeof currentPage.ticket !== 'undefined' && currentPage.ticket != null) {
    // 请求后台获取token -> 查询用户 -> 自动登录
    submit(currentPage.ticket);
  }else {
    Taro.showToast({
      title: '访问失败'
    })
    return Promise.reject(new Error('Error'))
  }
})

const submit = (ticket) => {
  Taro.removeStorageSync('Token')
  localStorage.removeItem('Token');
  let t;
  if (ticket !== '') {
    t = ticket;
  }else {
    t = getCurrentInstance().router.params.ticket;
  }
	  // h5自动登录
	  autologin({
      ticket: t
	  }).then((res) => {
	    if (res.code === 200 && res.token) {
	      Taro.setStorage({
	        key: 'Token',
	        data: res.token,
	        success: () => {
	          Taro.switchTab({
	            url: '/pages/home/home',
	          })
	          // tabBar.setTabbarActive(0)
	        },
	      })
	    }else {
        msg.value = res.msg;
      }
	  })
}

const reset = () => {
  let host = window.location.hostname;
  if (process.env.API_ENV === 'prod') {
    host += ':8010'
  }
  let target = 'https://' + host + '/wmswap/oalogin'
  window.location.href = target;
}
</script>
<template>
  <div class="login">
    <CusNav></CusNav>

    <div class="pagetitle">
      <div v-if="msg" class="hello">{{msg}}</div>
      <div v-else class="hello">登录中...</div>
    </div>

    <div class="btn-primary" hover-class="btn-primary-hover" @click="reset()">
      重试
    </div>
  </div>
</template>
<style lang="scss">
@import '../../../assets/styles/common.scss';
.login {
  background: url('../../../assets//images/login/head-bg.png') no-repeat;
  background-size: 100% 492px;
  height: 100vh;
  .nut-cell-group__wrap {
    box-shadow: none;
  }
  .nut-form-item__label.required::before {
    content: none;
  }
  .nut-cell-group__wrap .nut-cell {
    border-bottom: 1px solid #e7e7e7;
  }
  .pagetitle {
    padding: 82px 56px;
    font-size: 32px;
    font-weight: 500;
    .hello {
      line-height: 2;
    }
    .hello-large {
      font-size: 40px;
    }
  }

  .form-card {
    padding: 6px 20px;
    border-radius: 36px 36px 0 0;
    background-color: #fff;
    margin-bottom: 64px;
    .label-wrapper {
      display: flex;
      margin-bottom: 32px;
      .icon {
        width: 36px;
        height: 36px;
        margin-right: 8px;
      }
      .label {
        color: #000;
        font-size: 32px;
        font-weight: 500;
      }
    }
    .text-wrapper {
      display: flex;
      .nut-input {
        width: 70%;
        border-right: 1px solid #e7e7e7;
      }
    }
    .send-btn {
      flex: 1;
      color: #248aff;
      padding-left: 20px;
    }
  }
}
</style>
