<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createCapsule } from '@/api/capsuleApi'

const router = useRouter()

const title = ref('')
const content = ref('')
const openAt = ref('')

const handleCreate = async () => {
  try {
    await createCapsule({
      title: title.value,
      content: content.value,
      openAt: openAt.value,
    })

    alert('캡슐을 생성했습니다.')
    router.push('/capsules')
  } catch (error) {
    console.error(error)
    alert('캡슐 생성 실패')
  }
}
</script>

<template>
  <div>
    <h1>캡슐 만들기</h1>

    <input v-model="title" placeholder="제목" />

    <textarea v-model="content" placeholder="내용"></textarea>

    <input v-model="openAt" type="datetime-local" />

    <button @click="handleCreate">생성</button>
  </div>
</template>