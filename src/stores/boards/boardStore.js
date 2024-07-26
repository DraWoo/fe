import { defineStore } from 'pinia'
import axios from 'axios'

//환경 변수에서 API로 경로 가져오기
const baseUrl = `${import.meta.env.VITE_API_PATH}`
export const useBoardStore = defineStore('board', {
    //상태 정의
    state: () => ({
        posts: []
    }),
    // getters는 계산된 상태를 반환하는 함수들의 집합
    //스토어 상태에 기반하여 동적으로 정보를 제공하며, Vue 컴포넌트 내에서 반응형 데이터처럼 사용
    getters: {},

    actions: {

        /**
         * 게시글 작성 (postData)
         * @param {String} username 사용자 아이디
         * @param {String} password 사용자 패스워드
         * @return {Promise<Object>} 로그인 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
         */

        //localhost:9010/api/boards/posts
        async createPost(postData) {
            console.log("요청", postData)
            try {
                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.
                console.log("요청", token)
                if (!token) {
                    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
                }

                const res = await axios.post(`${baseUrl}/boards/posts`, postData, {
                    headers: {
                        'Authorization': `Bearer ${token}` // 인증 토큰을 헤더에 포함합니다.
                    }
                });

                const { code, payload } = res.data;

                if (code === 'succeed' && payload) {
                    console.log('게시글 작성 성공', payload);
                    this.posts.push(payload);
                } else {
                    throw new Error('게시글 작성에 실패했습니다.');
                }
            } catch (error) {
                console.error('게시글 작성 에러:', error);
                throw error;
            }
        },

    }

})
