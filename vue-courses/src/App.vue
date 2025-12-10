<template>
  <div class="p-4 space-y-8">
    <h1 class="text-4xl font-medium">Courses Hub</h1>

    <h2 class="text-2xl font-medium">All Courses</h2>
    <CourseSection></CourseSection>

    <h2 class="text-2xl font-medium">Your Courses</h2>
    <BookingSection></BookingSection>
  </div>
</template>

<script setup>
import CourseSection from '@/components/CourseSection.vue'
import BookingSection from '@/components/BookingSection.vue'
</script>
