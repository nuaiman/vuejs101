<template>
  <h1>Welocome to our Shop app with vue-router</h1>
  <hr />
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.name }}
      <button @click="goToDetails(product.id)">Go to Details</button>
    </li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const products = [
  {
    id: 1,
    name: 'laptop',
  },
  {
    id: 2,
    name: 'mobile',
  },
]

function goToDetails(id) {
  router.push({ name: 'product', params: { id } })
}
</script>
