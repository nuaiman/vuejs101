import axiosInstance from '@/plugin/axios/axios'
import { push } from 'notivue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'
import type { Category, CategoryPayload } from '@/types/adminTypes'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<Category[]>([])
  const { displayLoader, destroyLoader } = useGlobalLoader()

  const createCategory = async (payload: CategoryPayload): Promise<Category | null> => {
    displayLoader()

    try {
      const { data } = await axiosInstance.post('/ecommerce/categories', payload)
      if (data.success) {
        push.success('Cactegory created')
        categories.value.push(data.data)
        return data.data
      } else {
        push.error('Category creation failed')
        return null
      }
    } catch (error) {
      push.error(`Category creation failed: ${error}`)
      return null
    } finally {
      destroyLoader()
    }
  }

  const fetchCategories = async () => {
    displayLoader()
    try {
      const { data } = await axiosInstance.get('/ecommerce/categories')
      if (data.success) {
        categories.value = data.data.categories
        console.log(categories.value)
      }
    } catch (error) {
      push.error(`Error fetching categories: ${error}`)
    } finally {
      destroyLoader()
    }
  }

  return {
    categories,
    createCategory,
    fetchCategories,
  }
})
