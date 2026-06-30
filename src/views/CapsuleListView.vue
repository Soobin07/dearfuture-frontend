<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getCapsules,
  type CapsuleListItem,
  type CapsuleStatus,
  type PageResponse,
} from '@/api/capsuleApi'
import { RouterLink } from 'vue-router'
import { formatDateTime, getDDayText } from '@/utils/date'

const capsules = ref<CapsuleListItem[]>([])
const status = ref<CapsuleStatus | undefined>()
const keyword = ref('')
const sort = ref('createdAt,desc')

const page = ref(0)
const pageInfo = ref<PageResponse<CapsuleListItem> | null>(null)

const fetchCapsules = async () => {
  const result = await getCapsules(
    status.value,
    keyword.value,
    sort.value,
    page.value,
    10,
  )

  pageInfo.value = result
  capsules.value = result.content
}

const search = async () => {
  page.value = 0
  await fetchCapsules()
}

const changeStatus = async (value?: CapsuleStatus) => {
  status.value = value
  page.value = 0

  await fetchCapsules()
}

const prevPage = async () => {
  if (page.value > 0) {
    page.value--
    await fetchCapsules()
  }
}

const nextPage = async () => {
  if (
    pageInfo.value &&
    page.value < pageInfo.value.totalPages - 1
  ) {
    page.value++
    await fetchCapsules()
  }
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
      <input
        v-model="keyword"
        placeholder="제목 검색"
        class="flex-1 border rounded-lg px-4 py-2"
        @keyup.enter="search"
      />

      <button
        class="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        @click="search"
      >
        검색
      </button>
    </div>

    <div class="flex items-center gap-2 mb-6">
  <span>정렬</span>

  <select
      v-model="sort"
      class="border rounded-lg px-3 py-2"
      @change="fetchCapsules"
    >
      <option value="createdAt,desc">
        최신 생성순
      </option>

      <option value="createdAt,asc">
        오래된 생성순
      </option>

      <option value="openAt,asc">
        공개일 빠른순
      </option>

      <option value="openAt,desc">
        공개일 늦은순
      </option>
    </select>
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
        <div class="flex items-start justify-between gap-4">
          <h2 class="text-xl font-semibold mb-2">
            {{ capsule.title }}
          </h2>

          <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {{ getDDayText(capsule.openAt) }}
          </span>
        </div>

        <div class="text-sm text-gray-500">
          공개일: {{ formatDateTime(capsule.openAt) }}
        </div>

        <div class="text-sm text-gray-400 mt-1">
          생성일: {{ formatDateTime(capsule.createdAt) }}
        </div>
      </RouterLink>
    </div>
    <div
      v-if="pageInfo"
      class="flex items-center justify-center gap-4 mt-8"
    >
      <button
        class="px-4 py-2 border rounded-lg disabled:opacity-50"
        :disabled="pageInfo.first"
        @click="prevPage"
      >
        이전
      </button>

      <span>
        {{ pageInfo.page + 1 }} / {{ pageInfo.totalPages }}
      </span>

      <button
        class="px-4 py-2 border rounded-lg disabled:opacity-50"
        :disabled="pageInfo.last"
        @click="nextPage"
      >
        다음
      </button>
    </div>
  </div>
</template>