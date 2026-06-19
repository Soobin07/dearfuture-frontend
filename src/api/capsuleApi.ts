import { api } from './axios'

export type CapsuleStatus = 'OPENED' | 'LOCKED'

export interface CapsuleListItem {
  id: number
  title: string
  openAt: string
  createdAt: string
}

export const getCapsules = async (status?: CapsuleStatus) => {
  const response = await api.get<CapsuleListItem[]>('/api/capsules', {
    params: {
      status,
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