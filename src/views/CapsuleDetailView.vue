<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCapsule, type CapsuleDetail } from '@/api/capsuleApi'

const route = useRoute()
const router = useRouter()

const capsule = ref<CapsuleDetail | null>(null)
const errorMessage = ref('')

const fetchCapsule = async () => {
  try {
    const capsuleId = Number(route.params.capsuleId)
    capsule.value = await getCapsule(capsuleId)
  } catch (error: any) {
    console.error(error)
    errorMessage.value =
      error.response?.data?.message ?? '캡슐을 조회할 수 없습니다.'
  }
}

onMounted(fetchCapsule)
</script>

<template>
  <div>
    <button @click="router.push('/capsules')">목록으로</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div v-if="capsule">
      <h1>{{ capsule.title }}</h1>
      <p>{{ capsule.content }}</p>

      <hr />

      <p>공개일: {{ capsule.openAt }}</p>
      <p>생성일: {{ capsule.createdAt }}</p>
      <p v-if="capsule.updatedAt">수정일: {{ capsule.updatedAt }}</p>
    </div>
  </div>
</template>