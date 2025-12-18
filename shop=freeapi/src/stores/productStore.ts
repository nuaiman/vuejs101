import axiosInstance from '@/plugin/axios/axios'
import { push } from 'notivue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGlobalLoader } from 'vue-global-loader'
import type { Product, ProductPayload } from '@/types/adminTypes'

export const useProductStore = defineStore('productStore', () => {
  const products = ref<Product[]>([])
  const { displayLoader, destroyLoader } = useGlobalLoader()

  const createProduct = async (payload: ProductPayload): Promise<Product | null> => {
    displayLoader()

    try {
      const formData = new FormData()

      formData.append('name', payload.name)
      formData.append('category', payload.category)
      formData.append('description', payload.description)
      formData.append('price', String(payload.price))
      formData.append('stock', String(payload.stock))

      if (payload.mainImage) {
        formData.append('mainImage', payload.mainImage)
      }

      if (payload.subImages) {
        payload.subImages.forEach((img) => {
          formData.append('subImages', img)
        })
      }

      const { data } = await axiosInstance.post('/ecommerce/products', formData)

      if (data.success) {
        push.success('Product Created')
        products.value.push(data.data)
        return data.data
      } else {
        push.error('Product Creation Failed')
        return null
      }
    } catch (error) {
      push.error(`Product Creation Failed: ${error}`)
      return null
    } finally {
      destroyLoader()
    }
  }

  return { createProduct, products }
})
