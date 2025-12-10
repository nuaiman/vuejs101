<template>
  <div>
    <button
      @click="$emit('click')"
      :class="['rounded-full px-3 py-1', variants[variant] ?? variants.default]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const variants = {
  default: 'border border-gray-200 hover:bg-gray-100',
  danger: 'bg-red-200 text-red-900 :enabled:hover:bg-red-100',
}

defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})

defineEmits(['click'])
</script>
