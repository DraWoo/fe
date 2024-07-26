<script setup>
defineProps({
  paddingClear: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :class="paddingClear ? 'py-0 px-0' : 'py-0 px-[12px]'"
    class="h-[28px] rounded-[6px] border border-[#E5E7EC] text-[#212121] text-[12px] disabled:text-[#ccc] disabled:border-[#ccc] disabled:bg-[#f9f9f9]"
  >
    <slot></slot>
  </button>
</template>
