<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardContent class="grid gap-4 pt-6">
            <!-- Category -->
            <div class="grid gap-2">
              <Label>Category</Label>
              <Select v-model="form.category">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in categoryStore.categories"
                      :key="category._id"
                      :value="category._id"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Name -->
            <div class="grid gap-2">
              <Label>Name</Label>
              <Input v-model="form.name" placeholder="Product name" />
            </div>

            <!-- Description -->
            <div class="grid gap-2">
              <Label>Description</Label>
              <Input v-model="form.description" placeholder="Product description" />
            </div>

            <!-- Price -->
            <div class="grid gap-2">
              <Label>Price</Label>
              <Input type="number" v-model.number="form.price" />
            </div>

            <!-- Stock -->
            <div class="grid gap-2">
              <Label>Stock</Label>
              <Input type="number" v-model.number="form.stock" />
            </div>

            <!-- Main Image -->
            <div class="grid gap-2">
              <Label>Main Image</Label>
              <div
                ref="mainDropZoneRef"
                @click="mainFileInput?.click()"
                :class="[
                  'relative flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 transition-colors cursor-pointer',
                  isOverMain ? 'border-primary bg-primary/10' : 'border-muted-foreground/20',
                ]"
              >
                <input
                  ref="mainFileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="onMainInputChange"
                />
                <img v-if="mainUrl" :src="mainUrl" class="w-full h-32 object-contain rounded" />
                <div v-else class="text-center">
                  <p class="text-sm text-muted-foreground">Click or drag main image</p>
                </div>
              </div>
            </div>

            <!-- Sub Images -->
            <div class="grid gap-2">
              <Label>Sub Images</Label>
              <div
                ref="subDropZoneRef"
                :class="[
                  'relative border-2 border-dashed rounded-md p-4 transition-colors min-h-30',
                  isOverSub ? 'border-primary bg-primary/10' : 'border-muted-foreground/20',
                ]"
              >
                <div @click="subFileInput?.click()" class="cursor-pointer mb-2 text-center">
                  <p class="text-xs text-muted-foreground">Click or drag sub images</p>
                </div>
                <input
                  ref="subFileInput"
                  type="file"
                  multiple
                  class="hidden"
                  accept="image/*"
                  @change="onSubInputChange"
                />
                <div v-if="form.subImages?.length" class="flex flex-wrap gap-2">
                  <div
                    v-for="(file, i) in form.subImages"
                    :key="i"
                    class="group relative w-16 h-16 border rounded bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <!-- Inline preview using useObjectUrl -->
                    <img :src="subImageUrls[i]" class="w-full h-full object-cover rounded" />
                    <button
                      @click.stop="removeSubImage(i)"
                      class="absolute top-0 right-0 bg-destructive text-white rounded-bl-md p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit">Add Product</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { useDropZone, useObjectUrl } from '@vueuse/core'
import type { ProductPayload } from '@/types/adminTypes'

import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Label from '@/components/ui/label/Label.vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'

import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const form = ref<ProductPayload>({
  name: '',
  category: '',
  description: '',
  price: '',
  stock: '',
  mainImage: null,
  subImages: [],
})

// --- Main Image ---
const mainDropZoneRef = ref<HTMLDivElement>()
const mainFileInput = ref<HTMLInputElement>()
const mainFile = shallowRef<File | null>(null)
const mainUrl = useObjectUrl(mainFile)

const { isOverDropZone: isOverMain } = useDropZone(mainDropZoneRef, {
  onDrop: (files) => {
    if (files?.length) {
      mainFile.value = files[0] as File
      form.value.mainImage = files[0] as File
    }
  },
  dataTypes: (types) => types.some((t) => t.startsWith('image/')),
  multiple: false,
})

const onMainInputChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files?.length) {
    mainFile.value = files[0] as File
    form.value.mainImage = files[0] as File
  }
}

// --- Sub Images ---
const subDropZoneRef = ref<HTMLDivElement>()
const subFileInput = ref<HTMLInputElement>()

// Create reactive URLs for each sub-image
const subImageUrls = ref<string[]>([])

watch(
  () => form.value.subImages,
  (files) => {
    subImageUrls.value = (files || []).map((file) => useObjectUrl(shallowRef(file)).value!)
  },
  { immediate: true },
)

const { isOverDropZone: isOverSub } = useDropZone(subDropZoneRef, {
  onDrop: (files) => {
    if (files) {
      form.value.subImages = [...(form.value.subImages || []), ...files]
    }
  },
  multiple: true,
})

const onSubInputChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    form.value.subImages = [...(form.value.subImages || []), ...Array.from(files)]
  }
}

// Remove sub image
const removeSubImage = (index: number) => {
  form.value.subImages?.splice(index, 1)
}

// --- Submit ---
const onSubmit = async () => {
  console.log(form.value)
  const product = await productStore.createProduct(form.value)
  if (product) {
    form.value = {
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      mainImage: null,
      subImages: [],
    }
    mainFile.value = null
    mainFileInput.value!.value = ''
    subFileInput.value!.value = ''
  }
}
</script>
