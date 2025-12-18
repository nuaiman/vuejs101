<template>
  <header>
    <nav class="p-4 space-x-4">
      <NavBar></NavBar>
    </nav>
  </header>

  <!-- Notivue -->
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <!-- Global Loader -->
  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>

  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { Notivue, Notification } from 'notivue'
import GlobalLoader from 'vue-global-loader/GlobalLoader.vue'
import CircleSpinner from 'vue-global-loader/CircleSpinner.vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from './stores/authStore'
import { useCategoryStore } from '@/stores/categoryStore'

const authStore = useAuthStore()
const categoryStore = useCategoryStore()

onMounted(async () => {
  const refreshed = await authStore.refreshAuthToken()

  if (refreshed) {
    await authStore.getCurrentUser()
  }

  await categoryStore.fetchCategories()
})
</script>
