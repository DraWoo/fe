<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import CreatePostModal from '@/components/boards/CreatePostModal.vue' // 자식 컴포넌트 import 경로 확인 필요

const $authStore = useAuthStore()
const router = useRouter()
const showModal = ref(false) // 모달 상태를 관리하는 반응형 참조

//사용자 이름을 가지고옴
const username = localStorage.username 
// 사용자 이름을 Pinia 스토어에서 가져옵니다.
// const username = $authStore.username

console.log("ddddddddddddddddddd",username)
// 가상의 게시글 데이터
const posts = ref([])

const handleLogout = async () => {
  await $authStore.logout(router)
}
// 글작성 모달을 표시하는 함수
const handleCreatePost = () => {
  showModal.value = true // 모달을 표시하도록 상태를 true로 설정
}
// 모달 상태 제어 함수
const toggleModal = () => {
  showModal.value = !showModal.value
}
// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  // TODO: 서버에서 게시글 데이터를 불러오는 로직 구현
  // 예시 데이터
  posts.value = [
    {
      id: 1,
      title: '게시글 제목 1',
      content: '게시글 내용 1',
      user: { id: 'user1', name: '작성자1' },
      createdAt: '2023-03-15T12:00:00',
      viewCount: 123
    },
    {
      id: 2,
      title: '게시글 제목 2',
      content: '게시글 내용 2',
      user: { id: 'user2', name: '작성자2' },
      createdAt: '2023-03-16T15:30:00',
      viewCount: 456
    }
    // 더 많은 게시글...
  ]
})

</script>
<template>
    <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 class="text-3xl font-bold text-center mb-6">YO BBS</h1>
      <div class="my-4 flex justify-between">
        <button class="py-2 px-4 bg-blue-500 text-white rounded" @click="handleCreatePost">
          작성
        </button>
        <CreatePostModal
          :is-visible="showModal"
          :username="username"
          @toggle="toggleModal"
        />
        <div>
          <input 
            type="text" 
            placeholder="검색어를 입력해주세요."
            class="border rounded py-2 px-4 mr-2"
          />
          <button class="py-2 px-4 bg-blue-500 text-white rounded">검색</button>
          <button class="logout-button" @click="handleLogout">로그아웃</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="border-b px-6 py-4 text-left">번호</th>
              <th class="border-b px-6 py-4 text-left">제목</th>
              <!-- <th class="border-b px-6 py-4 text-left">이름</th> -->
              <th class="border-b px-6 py-4 text-left">아이디</th>
              <th class="border-b px-6 py-4 text-left">작성일</th>
              <th class="border-b px-6 py-4 text-left">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="my-4">
              <td class="border-b px-6 py-6">{{ post.id }}</td>
              <td class="border-b px-6 py-6">{{ post.title }}</td>
              <td class="border-b px-6 py-6">{{ post.user.id }}</td>
              <td class="border-b px-6 py-6">{{ post.createdAt }}</td>
              <td class="border-b px-6 py-6">{{ post.viewCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <!-- 페이징 컴포넌트 위치 -->
      </div>
    </div>
  </template>
  
  