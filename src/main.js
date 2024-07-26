import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router.js'
import axios from '@/helpers/axios.js'
import axiosInterceptor from '@/helpers/axiosInterceptor.js'
import { createPinia } from 'pinia'
// import { TippyPlugin } from 'tippy.vue'
import Vue3Toasity from 'vue3-toastify'

const app = createApp(App)
const store = createPinia()

app.use(store)


// Vue 애플리케이션에 라우터와 다른 플러그인들을 설치
app.use(router)

app.use(Vue3Toasity, {
  autoClose: 3000,
  theme: 'dark',
  hideProgressBar: true,
})

// Axios 인스턴스를 애플리케이션에 전역으로 제공
app.provide('$axios', axios)
// Axios 인터셉터를 설정
axiosInterceptor()
// Vue 애플리케이션을 마운트
app.mount('#app')
/**
 * mount 이해
 * Vue 애플리케이션을 생성할 때 createApp 함수를 사용합니다. 
 * 이 함수는 Vue 애플리케이션 인스턴스를 반환하며, 
 * 이 인스턴스에는 다양한 구성 옵션과 플러그인을 설정할 수 있는 메서드가 포함되어 있습니다. 
 * 애플리케이션 인스턴스가 생성되고 구성이 완료되면, mount 메서드를 호출하여 애플리케이션을 페이지에 연결
 */