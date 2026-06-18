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