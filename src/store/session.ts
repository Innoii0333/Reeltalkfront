import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const token = ref('')

  const setToken = (originToken: string) => {
    token.value = originToken
  }

  return { token, setToken }
})
