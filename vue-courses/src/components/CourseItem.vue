<template>
  <CardSections>
    <template #header>{{ title }}</template>

    {{ price }}

    <template #footer>
      <p>{{ description }}</p>
      <div class="flex justify-end">
        <RoundedButton @click="$emit('click')">Purchase</RoundedButton>
      </div>
    </template>
  </CardSections>
</template>

<script setup>
import CardSections from '@/components/CardSections.vue'
import RoundedButton from '@/components/RoundedButton.vue'

defineProps({
  title: String,
  price: Number,
  description: String,
})

defineEmits(['click'])
</script>
