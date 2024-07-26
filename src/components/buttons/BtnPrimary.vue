<script setup>
defineProps({
  paddingClear: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :class="paddingClear ? 'py-0 px-0' : 'py-0 px-[12px]'" class="h-[28px] rounded-[2em] bg-[#FEEC00] text-[#212121] text-[12px]">
    <slot></slot>
  </button>
</template>
