<template>
  <div>
    <h2>Counter B</h2>
    <p>{{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counterStore'

const counter = useCounterStore()
</script>
