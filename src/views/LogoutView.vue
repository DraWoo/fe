<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore' // 올바른 경로로 수정해주세요

const authStore = useAuthStore()

onMounted(() => {
  authStore.logout()
})
</script>

<template>
  <div>로그아웃 처리 중...</div>
</template>