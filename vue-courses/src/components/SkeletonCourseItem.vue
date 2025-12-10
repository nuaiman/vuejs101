<template>
  <RoundedCard>
    <div class="flex flex-col justify-between border border-gray-200 animate-pulse">
      <div class="h-36 bg-gray-300"></div>
      <div class="p-4 flex items-center h-18 justify-between">
        <div class="bg-gray-300 rounded-full h-8 w-36"></div>
        <div class="bg-gray-300 rounded-full h-6 w-18"></div>
      </div>
    </div>
  </RoundedCard>
</template>

<script setup>
import RoundedCard from '@/components/RoundedCard.vue'
</script>
