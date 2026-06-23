<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

const hideHeader = computed(() => {
  return route.path === '/login' || route.path === '/signup'
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <AppHeader v-if="!hideHeader" />

    <main class="max-w-5xl mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>