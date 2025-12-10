<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Enter username" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { makeLogin } from '@/router/index'

const router = useRouter()
const username = ref('')

function login() {
  if (username.value.toLowerCase() === 'admin') {
    makeLogin()
    router.push({ name: 'admin' })
  } else {
    alert('Access Denied!')
  }
}
</script>
