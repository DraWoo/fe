import axios from 'axios'

const instance = axios.create({
  //백엔드 요청 api 설정
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 토큰이 있는 경우 Authorization 헤더에 추가
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  },
  timeout: 5000
})

export default instance
