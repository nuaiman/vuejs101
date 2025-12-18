<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl"> Welcome back </CardTitle>
            <CardDescription>Enter your details to continue</CardDescription>
          </CardHeader>

          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                v-model="form.username"
              ></Input>
            </div>

            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                v-model="form.password"
              ></Input>
            </div>
          </CardContent>

          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Login</Button>

            <p>
              Don't have an account?
              <RouterLink class="border-b border-gray-500" to="/signup">Signup</RouterLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Label from '@/components/ui/label/Label.vue'
import Input from '@/components/ui/input/Input.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
import type { LoginPayload } from '@/types/authTypes'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const form = ref<LoginPayload>({
  username: '',
  password: '',
})

const onSubmit = async () => {
  const user = await authStore.login(form.value)
  if (!user) {
    return
  }
}
</script>
