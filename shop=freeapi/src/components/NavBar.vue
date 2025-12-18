<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <!-- LEFT: Home -->
      <RouterLink to="/" class="text-sm font-medium transition-colors hover:text-primary">
        Home
      </RouterLink>

      <!-- RIGHT -->
      <div class="ml-auto flex items-center space-x-4">
        <!-- NOT LOGGED IN -->
        <template v-if="!currentUser">
          <RouterLink
            to="/login"
            class="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/signup"
            class="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Signup
          </RouterLink>
        </template>

        <!-- LOGGED IN -->
        <template v-else>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="default" class="relative h-8 w-8 rounded-full">
                <Avatar class="h-8 w-8 text-black">
                  <AvatarImage :src="currentUser.avatar?.url" :alt="currentUser.username" />
                  <AvatarFallback>
                    {{ currentUser.username.charAt(0).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-56">
              <DropdownMenuLabel>
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium">{{ currentUser.username }}</p>
                  <p class="text-xs text-muted-foreground">
                    {{ currentUser.email }}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem @click="router.push('/profile')"> Profile </DropdownMenuItem>

                <DropdownMenuItem @click="router.push('/settings')"> Settings </DropdownMenuItem>

                <!-- ADMIN ONLY -->
                <DropdownMenuItem v-if="isAdmin" @click="router.push('/admin')">
                  Admin
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem @click="logout"> Log out </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.user)
const isAdmin = computed(() => currentUser.value?.role === 'ADMIN')

const logout = async () => {
  await authStore.logout()
}
</script>
