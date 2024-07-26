<script setup>
import { ref } from 'vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores/auth' // Pinia 스토어 경로 확인
import BtnPrimary from '@/components/buttons/BtnPrimary.vue'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import IconEyeOn from '@/components/icons/IconEyeOn.vue'
import { useRouter } from 'vue-router'

const router = useRouter() // `useRouter` 를 setup 함수 내에서 호출
const authStore = useAuthStore()
const showPassword = ref(false)

// useForm 훅을 사용하여 폼의 유효성 검사를 설정합니다.
const { handleSubmit, values, errors } = useForm({
  validationSchema: Yup.object({
    username: Yup.string().required('사용자 이름을 입력하세요.'),
    password: Yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
  }),
})

// Submit 이벤트 핸들러
const onSubmit = handleSubmit(async (formValues) => {
    console.log('Form submitted with:', formValues) // 폼 제출 로그
  try {
    // 사용자 등록 결과
    const success = await authStore.registerUser(formValues.username, formValues.password)
    if (success) {
        console.log('🚀 회원가입 성공! 로그인 페이지로 이동합니다.')
        router.push('/login') // 로그인 페이지로 이동
    }
  } catch (error) {
    console.error('Registration failed:', error)
  }
})
</script>

<template>
    <div class="flex items-center justify-center h-full w-full bg-[#F8F9FB] overflow-y-auto">
      <div>
        <!-- 회원가입 박스 -->
        <div class="w-[528px] bg-white p-[64px] border border-[#F1F2F6] rounded-[20px]">
          <h2 class="mb-[32px]">회원가입</h2>
  
          <!-- 회원가입 폼 -->
          <form @submit.prevent="onSubmit">
            <!-- 아이디 입력 필드 -->
            <label>
              <strong>아이디</strong>
              <Field 
                v-model="values.username"
                name="username"
                type="text"
                class="w-full mt-[5px]"
                placeholder="아이디를 입력하세요" 
                :class="{ 'is-invalid': errors.username }" 
              />
              <span class="block min-h-[22px]">
                <ErrorMessage name="username" class="error-message" />
              </span>
            </label>
  
            <!-- 비밀번호 입력 필드 -->
            <label class="block mt-[2px]">
              <strong>비밀번호</strong>
              <span class="relative block">
                <Field 
                  v-model="values.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full mt-[5px]"
                  placeholder="비밀번호를 입력하세요"
                />
                <span v-if="showPassword" class="absolute top-[11px] right-[11px] outline-0 cursor-pointer" @click="showPassword = false">
                  <IconEyeOn />
                </span>
                <span v-else class="absolute top-[11px] right-[11px] outline-0 cursor-pointer" @click="showPassword = true">
                  <IconEyeOff />
                </span>
              </span>
              <span class="block min-h-[22px]">
                <ErrorMessage name="password" class="error-message" />
              </span>
            </label>
  
            <!-- 회원가입 버튼 -->
            <div class="mt-[26px]">
              <btn-primary type="submit" class="btn-primary h-[44px] w-full text-[14px] rounded-[8px] font-bold disabled:bg-[lightgrey]">
                회원가입
              </btn-primary>
            </div>
          </form>
          <!-- 회원가입 폼 끝 -->
  
          <!-- 로그인 링크 -->
          <div class="mt-[44px] text-center text-[#7a7a7a]">
            이미 계정이 있으신가요? <router-link to="/login" class="font-bold text-[#3B9BFA] underline underline-offset-2">로그인</router-link>
          </div>
        </div>
        <!-- 로그인 박스 끝 -->
      </div>
    </div>
  </template>