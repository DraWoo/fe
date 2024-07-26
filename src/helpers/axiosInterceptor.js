import instance from './axios.js'
import { useAuthStore } from '@/stores'
// import { router } from '@/router.js'

/**
 *
 * axios 인터셉터는 모든 요청 혹은 응답을 가로채 거기에 추가적인 변환 또는 로직을 적용할 수 있게 해주는 기능
 * 인터셉터(request.use)에서는 요청을 보내기 전에 인증 토큰이 필요한 경우 헤더에 토큰을 추가
 * 응답 인터셉터(response.use)에서는 응답을 받고 난 후에 특정 작업을 수행하는데, 예를 들어 인증 토큰이 만료되었을 경우 유저를 로그아웃 시키는 작업을 수행
 */

const setup = () => {
  const authStore = useAuthStore()
  const initialToken = localStorage.getItem('token')

  if (initialToken) {
    authStore.token = initialToken
    authStore.isAuthenticated = true
  }

  //요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const token = authStore.token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      console.log(config.headers['Authorization'])
      return config
    },
    (error) => Promise.reject(error)
  )

  //응답 인터셉터
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const errorRes = error.response

      // 401 상태 코드는 일반적으로 인증 토큰이 만료되었거나 유효하지 않음을 나타냄
      if (errorRes?.status === 401) {
        console.error('Authentication error:', error)
        try {
          // authStore의 refreshToken 메소드를 호출하여 새로운 토큰을 요청합니다.
          const refreshedToken = await authStore.refreshToken()
          authStore.token = refreshedToken;
          localStorage.setItem('token', refreshedToken)

          // 새로운 토큰으로 현재 요청을 재시도합니다.
          console.log('새로운 토큰으로 요청을 재시도합니다.')
          return instance(error.config)
        } catch (refreshError) {
          // 토큰 갱신에 실패한 경우 사용자를 로그아웃 처리합니다.
          await authStore.logout()
          console.error('새로운 토큰 발급 실패:', refreshError)
          return Promise.reject(refreshError)
        }
      }

      if (errorRes?.status === 403) {
        // 403 상태 코드는 일반적으로 사용자 권한이 충분하지 않음을 나타냅니다.
        try {
          await authStore.logout()
          console.log('권한이 충분하지 않습니다. 로그아웃 처리되었습니다.')
        } catch (logoutError) {
          console.error('로그아웃 처리 중 에러 발생:', logoutError)
        }
        return Promise.reject(errorRes?.data?.payload?.message || error)
      }
      return Promise.reject(error.response?.data?.payload?.message || error)
    }
  )
}

export default setup