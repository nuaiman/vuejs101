import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useGlobalLoader } from 'vue-global-loader'
import { push } from 'notivue'
import axiosInstance from '@/plugin/axios/axios'
import type { LoginPayload, SignupPayload, User } from '@/types/authTypes'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)
  const accessToken = ref('')
  const refreshToken = ref('')

  const router = useRouter()
  const { displayLoader, destroyLoader } = useGlobalLoader()

  const saveToken = (accessToken: string, refreshToken: string) => {
    console.log(`accessToken: ${accessToken}`)
    console.log(`refreshToken: ${refreshToken}`)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const loadToken = () => {
    accessToken.value = localStorage.getItem('accessToken') || ''
    refreshToken.value = localStorage.getItem('refreshToken') || ''
  }

  const clearAuth = () => {
    user.value = null
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const signup = async (payload: SignupPayload): Promise<User | null> => {
    displayLoader()

    try {
      const { data } = await axiosInstance.post('/users/register', payload)
      if (data.success) {
        push.success(data.message)
        router.push('/login')
        return data.data.user
      } else {
        push.error('Signup failed')
        return null
      }
    } catch (error) {
      push.error(`Signup failed: ${error}`)
      return null
    } finally {
      destroyLoader()
    }
  }

  const login = async (payload: LoginPayload): Promise<User | null> => {
    displayLoader()

    try {
      const { data } = await axiosInstance.post('/users/login', payload)
      if (data.success) {
        push.success(data.message)
        router.push('/')
        user.value = data.data.user
        accessToken.value = data.data.accessToken
        refreshToken.value = data.data.refreshToken
        saveToken(accessToken.value, refreshToken.value)
        return user.value
      } else {
        push.error('Login Failed')
        return null
      }
    } catch (error) {
      push.error(`Login Failed: ${error}`)
      return null
    } finally {
      destroyLoader()
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/users/logout')
    } finally {
      push.info('Logged out')
      clearAuth()
      router.push('/')
    }
  }

  const refreshAuthToken = async (): Promise<boolean> => {
    try {
      loadToken()
      if (!refreshToken.value) return false

      const { data } = await axiosInstance.post('/users/refresh-token')
      saveToken(data.data.accessToken, data.data.refreshToken)
      return true
    } catch {
      clearAuth()
      return false
    }
  }

  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const { data } = await axiosInstance.get('/users/current-user')
      if (data.success) {
        user.value = data.data
        return user.value
      } else {
        return null
      }
    } catch {
      clearAuth()
      return null
    }
  }

  return {
    signup,
    login,
    logout,
    user,
    refreshToken,
    accessToken,
    refreshAuthToken,
    getCurrentUser,
  }
})
