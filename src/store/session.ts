import { defineStore } from 'pinia'

const STORAGE_KEY1 = 'Reeltalks_session_keyset1'
const STORAGE_KEY2 = 'Reeltalks_session_keyset2'

export const useSessionStore = defineStore('session', () => {
  const token = ref([''])
  const user_id = ref('')
  const user_name = ref('')
  const isLoggedIn = ref(false)

  const initToken = (originToken: string[]) => {
    localStorage.setItem(STORAGE_KEY1, originToken[0])
    localStorage.setItem(STORAGE_KEY2, originToken[1])
    token.value = originToken
  }
  const setToken = () => {
    const key1 = localStorage.getItem(STORAGE_KEY1)
    const key2 = localStorage.getItem(STORAGE_KEY2)
    if (key1 && key2)
      token.value = [key1, key2]
  }
  const getSession = async () => {
    try {
      const res = await fetch(`/api/session/${token.value[0]}/${token.value[1]}`, {
        method: 'POST',
      })
      const data = await res.json()
      user_id.value = data.user_id
      user_name.value = data.user_name
      isLoggedIn.value = true
    }
    catch {
      isLoggedIn.value = false
      throw new Error('Session expired or invalid')
    }
  }

  const checkAuth = async () => {
    const res = await fetch(`/api/session/auth/${token.value[0]}/${token.value[1]}`, {
      method: 'POST',
    })
    const data = await res.text()
    if (data === 'false')
      throw new Error('Session expired or invalid')
  }
  const checkLogin = async () => {
    if ((localStorage.getItem(STORAGE_KEY1) && localStorage.getItem(STORAGE_KEY2))
  && (user_id.value.length * user_name.value.length === 0)) {
      if (token.value.length === 0)
        setToken()
      try {
        getSession()
      }
      catch {
        localStorage.removeItem(STORAGE_KEY1)
        localStorage.removeItem(STORAGE_KEY2)
      }
    }
  }

  return { user_id, user_name, isLoggedIn, checkLogin, initToken, getSession, checkAuth }
})
