// src/router.js
//백엔드 =>AuthController Java 클래스에서 API 준해서 router.js 파일정의
//routes: 애플리케이션 내의 다양한 경로(URL)와 이들 각각에 대응하는 컴포넌트를 정의
//beforeEach: 라우트를 이동하기 전에 실행될 전역 가드입니다. 사용자 인증 여부를 체크하고, 필요하다면 로그인 페이지로 리다이렉션
//import.meta.env.BASE_URL: 프로젝트의 베이스 URL을 제공합니다. 이는 배포 환경에 따라 달라짐
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/index.js';


//동적 import를 사용하여 필요한 component를 불러옴
//각 라우트의 메타 데이터(meta)를 사용하여 페이지별로 인증 여부를 결정
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //router-link가 활성 상태면,해당 링크에는 active클래스가 자동으로 적용(활성링크를 시각적으로 구분)
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('@/views/LoginView.vue'),

    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/logout',
      component: () => import('@/views/LogoutView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/write',
      component: () => import('@/components/boards/CreatePostView.vue')
        .catch((error) => {
          console.error('Failed to load CreatePostView component', error)
        }),
      meta: { requiresAuth: true },
    },

  ]
})

// 라우터 가드를 설정하여 인증이 필요한 페이지에 접근하기 전에 인증 상태를 확인합니다.
//publicPage는 인증이 필요하지 않은 페이지
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  //인증이 필요하지 않은 페이지로의 접근 허용 => router 설정애서 meta requiresAuth: true,false로 설정
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  //인증이 필요한 페이지에 대해 사용자가 인증되지 않은 경우
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated) {
    //로그인 페이지로 리다이렉션
    next('/login')
  } else {
    // 인증 사용자게 접근허용
    next()
  }
})

