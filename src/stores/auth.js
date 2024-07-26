import { defineStore } from 'pinia'
import axios from 'axios'

//환경 변수에서 API로 경로 가져오기
const baseUrl = `${import.meta.env.VITE_API_PATH}`
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false, //상태 변수 => 사용자가 로그인했는지 여부를 나타탬
    userIsActive: true //사용자 활동 상태를 추적하는 변수
  }),
  // getters는 계산된 상태를 반환하는 함수들의 집합
  //스토어 상태에 기반하여 동적으로 정보를 제공하며, Vue 컴포넌트 내에서 반응형 데이터처럼 사용
  getters: {
    //메인 페이지 경로를 반환하는 getter
    getUserMainPage(state) {
      //로그인 인증 => isAuthenticated => true 면 homeViesw
      //로그인 실패 => isAuthenticated => false 면 login
      return state.isAuthenticated ? '/home' : '/login'
    }

  },

  actions: {
    /**
    * 애플리케이션 초기화 시 호출되어 사용자의 인증 상태를 초기화
    * localStorage에서 토큰을 읽어와 상태를 설정
    */
    // initializeAuth() {
    //   const initialToken = localStorage.getItem('token')
    //   if (initialToken) {
    //     this.token = initialToken
    //     this.isAuthenticated = true
    //     //사용자에게 자동 로그인 되었음을 알림
    //     console.log('사용자가 자동으로 로그인 되었습니다.')
    //   }
    // },

    /**
     * 사용자 활동에 기반한 세션 타임아웃 로직
     */
    startSessionTimeout() {
      const timeout = 1800000; // 30분
      setTimeout(() => {
        if (!this.userIsActive) {
          this.logout()
          alert('세션 시간이 만료되었습니다. 다시 로그인 해주세요.')
        }
      }, timeout)
    },
    /**
     * 로그인 (token)
     * @param {String} username 사용자 아이디
     * @param {String} password 사용자 패스워드
     * @return {Promise<Object>} 로그인 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
     */

    //localhost:9010/api/auth/login
    async login(username, password) {
      console.log('로그인 시도: ', { username, password })

      try {
        const res = await axios.post(`${baseUrl}/auth/login`, {
          username,
          password
        })
        const { code, payload } = res.data

        console.log("응답확인")
        if (code === 'succeed' && payload) {
          //응답데이터 토큰값 jwt
          this.token = payload.jwt
          this.isAuthenticated = true
          localStorage.setItem('token', this.token)
          localStorage.setItem('username', username)
          console.log('로그인 성공, 토큰 저장:', this.token)
          return payload
        } else {
          // code가 'succeed'가 아니거나 payload가 없는 경우 실패로 간주합니다.
          throw new Error('로그인 실패');
        }
      } catch (error) {
        console.error('로그인 에러:', error);
        // 서버 응답의 에러 메시지를 확인하고 출력합니다.
        throw new Error(error.response?.data?.message || 'Network error');
      }
    },


    /**
     * 회원가입 (username,password)
     * @param {String} username 사용자 아이디
     * @param {String} password 사용자 패스워드
     * @return {Promise<Object>} 회원가입 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
     */
    async registerUser(username, password) {
      console.log('회원가입 요청 시작:', username)
      try {
        const res = await axios.post(`${baseUrl}/auth/signup`, {
          username,
          password
        });
        if (res.status === 200) {
          console.log('회원가입 성공:', res.data)
          alert('회원가입에 성공하였습니다.')
          return true;
        } else {
          console.log('회원가입 실패:', res.data.message)
          throw new Error(res.data.message || '회원가입에 실패했습니다.')
        }
      } catch (err) {
        console.error('회원가입 에러:', err.response.data)
        alert(err.response.data || "회원가입 중 문제가 발생했습니다.")
      }
    },

    /**
     * 로그아웃 
     * 사용자의 localStorage에서 토큰을 제거하고, 사용자 인증 상태 업데이트
     * 로그아웃이 성공하면, 사용자를 로그인 페이지로 리다이렉트
     */
    async logout(router) {
      const token = localStorage.getItem('token')
      console.log('토큰 확인:', token)

      if (token) {
        try {
          const response = await axios.post(`${baseUrl}/auth/logout`, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
          })

          if (response.status === 200) {
            console.log('로그아웃 성공')
          } else {
            console.error('로그아웃 실패:', response.data)
          }
        } catch (error) {
          console.error('로그아웃 요청 중 오류 발생:', error)
        }
      }

      // 로컬 스토리지에서 토큰 제거 및 인증 상태 업데이트
      localStorage.removeItem('token')
      this.isAuthenticated = false

      // 로그인 페이지로 리다이렉트
      router.push('/login')
    },
  }
})
