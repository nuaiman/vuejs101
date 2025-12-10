import { ref } from 'vue'

const loading = ref(false)
const bookings = ref([])

const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    bookings.value = await response.json()
  } finally {
    loading.value = false
  }
}

const registerCourse = async (course) => {
  if (bookings.value.some((b) => b.id === course.id)) {
    alert('Course already purchased!')
    return
  }

  const newCourse = {
    id: course.id,
    title: course.title,
    price: course.price,
    description: course.description,
    status: 'pending',
  }

  bookings.value.push(newCourse)

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newCourse,
        status: 'confirmed',
      }),
    })

    if (response.ok) {
      const index = bookings.value.findIndex((b) => b.id === newCourse.id)
      bookings.value[index] = await response.json()
    } else {
      bookings.value = bookings.value.filter((b) => b.id != newCourse.id)
      return
    }
  } catch (e) {
    console.error(e)
    bookings.value = bookings.value.filter((b) => b.id != newCourse.id)
  }
}

const reportCourse = async (courseId) => {
  const index = bookings.value.findIndex((b) => b.id === courseId)
  const toBeDeletedCourse = bookings.value[index]
  bookings.value.splice(index, 1)

  try {
    const resposne = await fetch(`http://localhost:3001/bookings/${courseId}`, {
      method: 'DELETE',
    })

    if (!resposne.ok) {
      throw Error('Couldnt delete')
    }
  } catch (error) {
    console.error(error)
    bookings.value.splice(index, 0, toBeDeletedCourse)
  }
}

export default function useBookings() {
  return { loading, bookings, fetchBookings, registerCourse, reportCourse }
}
