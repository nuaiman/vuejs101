<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">Category</Label>
              <Input id="username" type="text" placeholder="johndoe" v-model="form.name"></Input>
            </div>
          </CardContent>

          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Add</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Label from '@/components/ui/label/Label.vue'
import Input from '@/components/ui/input/Input.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Button from '@/components/ui/button/Button.vue'
import type { CategoryPayload } from '@/types/adminTypes'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

const form = ref<CategoryPayload>({
  name: '',
})

const onSubmit = async () => {
  const trimmed = form.value.name.trim()
  if (!trimmed) {
    return
  }

  const category = await categoryStore.createCategory(form.value)

  if (category) {
    form.value.name = ''
  }
}
</script>
