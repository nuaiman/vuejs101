<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Tab } from '@/types/adminTypes'

const props = defineProps<{
  currentTab: string
  tab: Tab
}>()

const isActive = computed(() => props.currentTab === props.tab.key)

defineEmits(['click'])
</script>
