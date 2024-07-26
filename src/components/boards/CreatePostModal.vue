<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useBoardStore } from '@/stores/boards/index.js'
import { useUiStore } from '@/stores/index.js' // 상태를 관리하는 UI 스토어를 가져옵니다.

const props = defineProps({
  isVisible: Boolean,
  username: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['hide'])
const $boardStore = useBoardStore()
const $uiStore = useUiStore() // UI 스토어 인스턴스를 사용합니다.
const post = ref({ title: '', content: '', username: props.username })

let isButtonClickEnabled = true // 버튼 클릭 가능 상태 관리

const submitPost = async () => {
  if (!isButtonClickEnabled) return

  isButtonClickEnabled = false

  try {
    await $boardStore.createPost({ ...post.value, username: props.username })
    $uiStore.openAlert('등록되었습니다.', '등록완료') // 등록 완료 메시지 팝업
    emit('hide')
  } catch (error) {
    $uiStore.openAlert('등록에 실패했습니다.', '에러') // 등록 실패 메시지 팝업
    console.error('글 작성 실패:', error)
  } finally {
    setTimeout(() => {
      isButtonClickEnabled = true
    }, 1000) // 1초 후에 다시 클릭 가능하도록 설정
  }
}

const closeModal = () => {
  emit('hide')
}
</script>


<template>
   <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center">
    <div class="bg-gray-600 bg-opacity-50 absolute inset-0"></div> <!-- Modal backdrop -->
      <div class="container max-w-xl p-6 bg-white shadow-lg rounded-lg relative">
      <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 class="text-3xl font-bold text-center mb-6">글 작성</h1>
        <form @submit.prevent="submitPost">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
              제목:
            </label>
            <input
              type="text"
              id="title"
              v-model="post.title"
              placeholder="제목을 입력하세요"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>
          <div class="mb-6">
            <label for="content" class="block text-gray-700 text-sm font-bold mb-2">
              내용:
            </label>
            <textarea
              id="content"
              v-model="post.content"
              placeholder="내용을 입력하세요"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="flex items-center justify-end space-x-2">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              저장
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="closeModal">
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
