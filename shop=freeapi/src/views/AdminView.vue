<template>
  <div>
    <nav>
      <ul class="flex gap-4 justify-center">
        <li v-for="tab in tabs" :key="tab.key">
          <TabButton @click="currentTab = tab.key" :current-tab="currentTab" :tab="tab"></TabButton>
        </li>
      </ul>
    </nav>

    <component :is="isActiveComponent"></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Tab, TabKey } from '@/types/adminTypes'
import TabButton from '@/components/TabButton.vue'
import CategoryComponent from '@/components/CategoryComponent.vue'
import ProductComponent from '@/components/ProductComponent.vue'

const currentTab = ref<TabKey>('Category')

const tabs: Tab[] = [
  {
    key: 'Category',
    label: 'Category',
    component: CategoryComponent,
  },
  {
    key: 'Product',
    label: 'Product',
    component: ProductComponent,
  },
]

const isActiveComponent = computed(() => {
  return tabs.find((t) => t.key === currentTab.value)?.component
})
</script>
