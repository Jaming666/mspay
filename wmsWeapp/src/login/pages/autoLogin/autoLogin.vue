<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useTabBarStore } from 'src/stores/tabbar'
import baseUrl from '../../../utils/baseUrl'
import Taro from "@tarojs/taro";

onMounted(() => {
  // let url = 'https://106.120.11.231:7011';
  let url = 'https://moa.msre.com.cn:8010';
  if (process.env.API_ENV === 'prod') {
    url = 'https://moa.msre.com.cn:8010';
  }else {
    url = 'http://106.120.11.231:7011';
  }
  let path = '/sso/oauth2.0/authorize';
  let client_id = 'c99a045f-9336-40db-8155-f6af1c5aee27'
  let response_type = 'code'
  let host = window.location.hostname;
  if (process.env.API_ENV === 'prod') {
    host += ':8010'
  }
  let redirect_uri = 'http://' + host + '/wmswap/oacallback'
  if (process.env.API_ENV === 'prod') {
    redirect_uri = 'https://' + host + '/wmswap/oacallback'
  }else {
    redirect_uri = 'https://' + host + '/wmswap/oacallback'
  }
  let target = url + path + '?client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirect_uri;
  console.log(target)
  window.location.href = target;
})
</script>
