<template>
  <button
    @click="$emit('click')"
    :class="{
      'p-4 border-b-2': true,
      'border-transparent': !isActive,
      'border-b-blue-500 text-blue-500': isActive,
    }"
  >
    {{ tab.label }}
  </button>
</template>

<script setup lang="ts">
import type { Tab } from '@/types'
import { computed } from 'vue'

const isActive = computed(() => prop.currentTab === prop.tab.key)

const prop = defineProps<{
  currentTab: string
  tab: Tab
}>()

defineEmits<{
  click: []
}>()
</script>
