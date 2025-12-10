import { ref } from 'vue'

interface ToastNotification {
  id: number
  message: string
}

const notifications = ref<ToastNotification[]>([])

const addToastNotifications = (message: string) => {
  const id = Date.now()

  notifications.value.push({
    id,
    message,
  })

  setTimeout(() => removeToastNotification(id), 5000)
}

const removeToastNotification = (id: number) => {
  notifications.value = notifications.value.filter((n) => n.id != id)
}

export function useToastNotifications() {
  return { notifications, addToastNotifications, removeToastNotification }
}
