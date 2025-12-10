<template>
  <div>
    <h1>Product Details Page</h1>
    <p>Product Id: {{ route.params.id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
