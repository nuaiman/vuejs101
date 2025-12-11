<template>
  <Teleport to="body">
    <ol class="notification-list">
      <li v-for="notification in notifications" :key="notification.id" class="notification-item">
        <div class="text-sm font-semibold">
          {{ notification.message }}
        </div>
        <button @click="removeToastNotification(notification.id)" class="notification-ack-button">
          OK
        </button>
      </li>
    </ol>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastNotifications } from '@/composables/useToastNotifications'
const { notifications, removeToastNotification } = useToastNotifications()
</script>
