import type { Component } from 'vue'

export type TabKey = 'Category' | 'Product'

export interface Tab {
  key: TabKey
  label: string
  component: Component
}

export type CategoryPayload = {
  name: string
}

export type Category = {
  _id: string
  name: string
}

export type ProductRequestPayload = {
  name: string
  description: string
  price: string
  stock: string
  category: string
  mainImage: File | null
  subImages: File[] | null
}

export type Product = {
  _id: string
  name: string
  description: string
  price: string
  stock: string
  category: string
  mainImage: string
  subImages: string[]
  createdAt: string
  updatedAt: string
}
