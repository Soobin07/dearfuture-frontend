<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCapsules, type CapsuleListItem, type CapsuleStatus } from '@/api/capsuleApi'
import { RouterLink } from 'vue-router'
import { formatDateTime } from '@/utils/date'

const capsules = ref<CapsuleListItem[]>([])
const status = ref<CapsuleStatus | undefined>()

const fetchCapsules = async () => {
  capsules.value = await getCapsules(status.value)
}

const changeStatus = async (value?: CapsuleStatus) => {
  status.value = value
  await fetchCapsules()
}

onMounted(fetchCapsules)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">내 캡슐</h1>

      <RouterLink
        to="/capsules/create"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        새 캡슐 만들기
      </RouterLink>
    </div>

    <div class="flex gap-2 mb-6">
      <button
        class="px-4 py-2 bg-white border rounded-lg"
        @click="changeStatus()"
      >
        전체
      </button>

      <button
        class="px-4 py-2 bg-white border rounded-lg"
        @click="changeStatus('OPENED')"
      >
        열린 캡슐
      </button>

      <button
        class="px-4 py-2 bg-white border rounded-lg"
        @click="changeStatus('LOCKED')"
      >
        잠긴 캡슐
      </button>
    </div>

    <div
      v-if="capsules.length === 0"
      class="bg-white rounded-xl p-8 text-center text-gray-500"
    >
      캡슐이 없습니다.
    </div>

    <div
      v-else
      class="grid gap-4"
    >
      <RouterLink
        v-for="capsule in capsules"
        :key="capsule.id"
        :to="`/capsules/${capsule.id}`"
        class="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold mb-2">
          {{ capsule.title }}
        </h2>

        <div class="text-sm text-gray-500">
          공개일: {{ formatDateTime(capsule.openAt) }}
        </div>

        <div class="text-sm text-gray-400 mt-1">
          생성일: {{ formatDateTime(capsule.createdAt) }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>