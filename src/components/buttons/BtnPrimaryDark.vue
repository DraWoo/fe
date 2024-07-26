<script setup>
defineProps({
  paddingClear: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :class="paddingClear ? 'py-0 px-0' : 'py-0 px-[12px]'" class="h-[28px] rounded-[6px] bg-[#212121] text-[#fff] text-[12px]">
    <slot></slot>
  </button>
</template>
