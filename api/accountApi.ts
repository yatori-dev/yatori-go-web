import apiClient from './base'
import type { Account } from '@/components/account-list'

// 定义请求和响应类型
export interface AddAccountParams {
  platform: string
  account: string
  password: string
  email?: string
}

export interface AddAccountResponse {
  success: boolean
  data?: Account
  message?: string
}

// 添加账号
export const addAccount = async (params: AddAccountParams): Promise<AddAccountResponse> => {
  try {
    const response = await apiClient.post<AddAccountResponse>('/accounts', params)
    return response
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || '添加账号失败'
    }
  }
}

// 这里还可以添加其他账号相关的API请求
// export const getAccounts = async (): Promise<...> => { ... }
// export const updateAccount = async (id: string, params: ...): Promise<...> => { ... }
// export const deleteAccount = async (id: string): Promise<...> => { ... }