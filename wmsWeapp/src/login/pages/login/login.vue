<script setup>
import Taro from '@tarojs/taro'
import { reactive, ref, onBeforeMount } from 'vue'
import CusNav from '../../../components/CusNav/index.vue'
import { getMsg, login } from '../../../api/login'
import { useTabBarStore } from 'src/stores/tabbar'

const tabBar = useTabBarStore()
const formRef = ref(null)
const formData = ref({
  phone: '',
  smscode: '',
  code: '',
})
const state = reactive({
  btnDisabled: false,
  second: 60,
  timer: null,
})

onBeforeMount(() => {
  Taro.clearStorage()
})

const setTimer = () => {
  if (!state.timer) {
    state.timer = setInterval(() => {
      if (state.second > 0) {
        state.second--
      } else {
        clearInterval(state.timer)
        state.second = 60
        state.btnDisabled = false
        state.timer = null
      }
    }, 1000)
  }
}

const sendText = async () => {
  if (!formData.value.phone) {
    Taro.showToast({
      title: '请输入手机号',
      icon: 'none',
    })
    return
  }
  const res = await getMsg(formData.value.phone)
  if (res) {
    state.btnDisabled = true
    setTimer()
  }
}
const submit = () => {
  formRef.value?.validate().then(({ valid, errors }) => {
    if (valid) {
      // 微信小程序登录
      /* Taro.login({
        success: (res) => {
          if (res.code) {
            login({
              ...formData.value,
              code: res.code,
            }).then((res) => {
              if (res.token) {
                Taro.setStorage({
                  key: 'Token',
                  data: res.token,
                  success: () => {
                    Taro.switchTab({
                      url: '/pages/home/home',
                    })
                    tabBar.setTabbarActive(0)
                    clearInterval(state.timer)
                  },
                })
              }
            })
          }
        },
      }) */
      // h5登录
      formData.value.code = formData.value.smscode
      login({
        ...formData.value,
      }).then((res) => {
        if (res.token) {
          Taro.setStorage({
            key: 'Token',
            data: res.token,
            success: () => {
              Taro.switchTab({
                url: '/pages/home/home',
              })
              tabBar.setTabbarActive(0)
              clearInterval(state.timer)
            },
          })
        }
      })
    } else {
      console.warn('error:', errors)
    }
  })
}
</script>
<template>
  <div class="login">
    <CusNav></CusNav>

    <div class="pagetitle">
      <div class="hello">您好, 欢迎使用</div>
      <div class="hello-large">民生置业库管系统</div>
    </div>

    <div class="form-card">
      <nut-form
        ref="formRef"
        label-position="top"
        :model-value="formData"
        :rules="{
          phone: [{ required: true, message: '请输入账号' }],
          smscode: [{ required: true, message: '请输入验证码' }],
        }"
      >
        <nut-form-item
          label=""
          :required="false"
          :show-error-line="false"
          prop="phone"
        >
          <template #label>
            <div class="label-wrapper">
              <image
                class="icon"
                src="../../../assets/images/login/mobile.png"
              />
              <div class="label">登录账号</div>
            </div>
          </template>
          <nut-input
            v-model="formData.phone"
            max-length="11"
            placeholder="请输入手机号"
            type="number"
          />
        </nut-form-item>
        <nut-form-item
          label=""
          :required="false"
          :show-error-line="false"
          prop="smscode"
        >
          <template #label>
            <div class="label-wrapper">
              <image class="icon" src="../../../assets/images/login/lock.png" />
              <div class="label">短信验证码</div>
            </div>
          </template>
          <div class="text-wrapper">
            <nut-input
              v-model="formData.smscode"
              :max-length="6"
              placeholder="请输入短信验证码"
              type="digit"
            />
            <div v-if="!state.btnDisabled" class="send-btn" @click="sendText">
              发送验证码
            </div>
            <div v-else>
              <text class="send-btn">
                {{ state.second }}
              </text>
              S后重发
            </div>
          </div>
        </nut-form-item>
      </nut-form>
    </div>

    <div class="btn-primary" hover-class="btn-primary-hover" @click="submit">
      登录
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
