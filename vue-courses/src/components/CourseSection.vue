<template>
  <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <SkeletonCourseItem v-for="i in 2" :key="i"></SkeletonCourseItem>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <CourseItem
      v-for="course in courses"
      :key="course.id"
      :title="course.title"
      :price="course.price"
      :description="course.description"
      @click="registerCourse(course)"
    ></CourseItem>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import CourseItem from '@/components/CourseItem.vue'
import SkeletonCourseItem from '@/components/SkeletonCourseItem.vue'

import useBookings from '@/composables/useBookings'
const { registerCourse } = useBookings()

const courses = ref([])
const loading = ref(false)

const fetchCourses = async () => {
  loading.value = true

  try {
    const response = await fetch('http://localhost:3001/courses')
    courses.value = await response.json()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourses()
})
</script>
