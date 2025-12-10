<template>
  <div class="max-w-2xl mx-auto px-4">
    <nav class="font-medium text-center text-gray-500 border-b border-gray-200 mb-4">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="tab in tabs" :key="tab.key">
          <TabButton @click="currentTab = tab.key" :tab="tab" :current-tab="currentTab"></TabButton>
        </li>
      </ul>
    </nav>
    <FadeTransition>
      <KeepAlive>
        <component :is="currentActiveComponent"></component>
      </KeepAlive>
    </FadeTransition>

    <ToastNotifications></ToastNotifications>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Tab, TabKey } from './types'
import TabButton from './components/TabButton.vue'
import GeneralSettings from '@/components/GeneralSettings.vue'
import NotificationsSettings from '@/components/NotificationsSettings.vue'
import PrivacySettings from '@/components/PrivacySettings.vue'
import FadeTransition from '@/components/FadeTransition.vue'
import ToastNotifications from '@/components/ToastNotifications.vue'

const currentTab = ref<TabKey>('General')

const tabs: Tab[] = [
  {
    key: 'General',
    label: 'General',
    component: GeneralSettings,
  },
  {
    key: 'Notifications',
    label: 'Notifications',
    component: NotificationsSettings,
  },
  {
    key: 'Privacy',
    label: 'Privacy',
    component: PrivacySettings,
  },
]

const currentActiveComponent = computed(
  () => tabs.find((tab) => tab.key === currentTab.value)?.component,
)
</script>
