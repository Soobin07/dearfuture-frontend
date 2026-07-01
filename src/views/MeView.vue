<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMe, type MeResponse } from '@/api/authApi'
import { getCapsules } from '@/api/capsuleApi'

const me = ref<MeResponse | null>(null)

const totalCapsules = ref(0)
const openedCapsules = ref(0)
const lockedCapsules = ref(0)

const fetchMe = async () => {
  me.value = await getMe()

  const total = await getCapsules(undefined, '', 'createdAt,desc', 0, 1)
  const opened = await getCapsules('OPENED', '', 'createdAt,desc', 0, 1)
  const locked = await getCapsules('LOCKED', '', 'createdAt,desc', 0, 1)

  totalCapsules.value = total.totalElements
  openedCapsules.value = opened.totalElements
  lockedCapsules.value = locked.totalElements
}

onMounted(fetchMe)
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">마이페이지</h1>

    <div v-if="me" class="bg-white rounded-2xl shadow p-6 space-y-4">
      <div>
        <p class="text-sm text-gray-500">닉네임</p>
        <p class="text-xl font-semibold">{{ me.nickname }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">이메일</p>
        <p class="text-xl font-semibold">{{ me.email }}</p>
      </div>

      <hr />

      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-2xl font-bold">{{ totalCapsules }}</p>
          <p class="text-sm text-gray-500">전체 캡슐</p>
        </div>

        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-2xl font-bold">{{ openedCapsules }}</p>
          <p class="text-sm text-gray-500">열린 캡슐</p>
        </div>

        <div class="bg-gray-100 rounded-xl p-4">
          <p class="text-2xl font-bold">{{ lockedCapsules }}</p>
          <p class="text-sm text-gray-500">잠긴 캡슐</p>
        </div>
      </div>
    </div>
  </div>
</template>