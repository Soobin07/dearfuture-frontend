<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCapsules, type CapsuleListItem, type CapsuleStatus } from '@/api/capsuleApi'

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
    <h1>내 캡슐 목록</h1>

    <button @click="changeStatus()">전체</button>
    <button @click="changeStatus('OPENED')">열린 캡슐</button>
    <button @click="changeStatus('LOCKED')">잠긴 캡슐</button>

    <ul>
      <li v-for="capsule in capsules" :key="capsule.id">
        {{ capsule.title }} / {{ capsule.openAt }}
      </li>
    </ul>
  </div>
</template>