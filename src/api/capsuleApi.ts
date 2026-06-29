import { api } from './axios'

export type CapsuleStatus = 'OPENED' | 'LOCKED'

export interface CapsuleListItem {
  id: number
  title: string
  openAt: string
  createdAt: string
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export const getCapsules = async (
  status?: CapsuleStatus,
  keyword = '',
  sort = 'createdAt,desc',
  page = 0,
  size = 10,
) => {
  const response = await api.get<PageResponse<CapsuleListItem>>('/api/capsules', {
    params: {
      status,
      keyword,
      sort,
      page,
      size,
    },
  })

  return response.data
}

export interface CapsuleCreateRequest {
  title: string
  content: string
  openAt: string
}

export const createCapsule = async (request: CapsuleCreateRequest) => {
  const response = await api.post('/api/capsules', request)
  return response.data
}

export interface CapsuleDetail {
  id: number
  title: string
  content: string
  openAt: string
  createdAt: string
  updatedAt: string | null
}

export const getCapsule = async (capsuleId: number) => {
  const response = await api.get<CapsuleDetail>(`/api/capsules/${capsuleId}`)
  return response.data
}

export const deleteCapsule = async (capsuleId: number) => {
  await api.delete(`/api/capsules/${capsuleId}`)
}

export interface CapsuleUpdateRequest {
  title: string
  content: string
  openAt: string
}


export const updateCapsule = async (
  capsuleId: number,
  request: CapsuleUpdateRequest,
) => {
  const response = await api.put(`/api/capsules/${capsuleId}`, request)
  return response.data
}

