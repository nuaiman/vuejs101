<template>
  <CardSections>
    <div class="flex justify-between items-center">
      <div class="flex gap-4">
        <div>{{ title }}</div>
        <div>
          <component :is="icon" :class="{ 'animate-spin': pending }"></component>
        </div>
      </div>
      <RoundedButton @click="$emit('report')" variant="danger">Report</RoundedButton>
    </div>
  </CardSections>
</template>

<script setup>
import { computed } from 'vue'

import CardSections from '@/components/CardSections.vue'
import RoundedButton from '@/components/RoundedButton.vue'

import { LoaderCircle, Check } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  status: String,
})

defineEmits(['report'])

const pending = computed(() => props.status === 'pending')
const icon = computed(() => (pending.value ? LoaderCircle : Check))
</script>
