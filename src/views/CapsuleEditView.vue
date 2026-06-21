<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCapsule, updateCapsule } from '@/api/capsuleApi'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const openAt = ref('')

const fetchCapsule = async () => {
  const capsuleId = Number(route.params.capsuleId)
  const capsule = await getCapsule(capsuleId)

  title.value = capsule.title
  content.value = capsule.content
  openAt.value = capsule.openAt.slice(0, 16)
}

const handleUpdate = async () => {
  try {
    const capsuleId = Number(route.params.capsuleId)

    await updateCapsule(capsuleId, {
      title: title.value,
      content: content.value,
      openAt: openAt.value,
    })

    alert('수정했습니다.')
    router.push(`/capsules/${capsuleId}`)
  } catch (error) {
    console.error(error)
    alert('수정 실패')
  }
}

onMounted(fetchCapsule)
</script>

<template>
  <div>
    <h1>캡슐 수정</h1>

    <input v-model="title" placeholder="제목" />

    <textarea v-model="content" placeholder="내용"></textarea>

    <input v-model="openAt" type="datetime-local" />

    <button @click="handleUpdate">수정</button>
    <button @click="router.push('/capsules')">취소</button>
  </div>
</template>