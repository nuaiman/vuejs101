<template>
  <div v-if="loading">
    <SkeletonBookingItem></SkeletonBookingItem>
  </div>
  <div v-else class="grid grid-cols-1 gap-4">
    <BookingItem
      v-for="booking in bookings"
      :key="booking.id"
      :title="booking.title"
      :status="booking.status"
      @report="reportCourse(booking.id)"
    ></BookingItem>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import BookingItem from '@/components/BookingItem.vue'
import SkeletonBookingItem from '@/components/SkeletonBookingItem.vue'

import useBookings from '@/composables/useBookings'
const { loading, bookings, fetchBookings, reportCourse } = useBookings()

onMounted(() => {
  fetchBookings()
})
</script>
