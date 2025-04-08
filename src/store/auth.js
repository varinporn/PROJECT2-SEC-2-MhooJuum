// stores/useAuth.js
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import{ CookieUtil }from '@/libs/cookieUtil'

export const useAuth = defineStore('auth', () => {
  const statusLogin = ref(CookieUtil.get('juumId') || null)

  const setStatusLogin = (val) => {
    CookieUtil.set('juumId', val)
    statusLogin.value = val
  }

  const clearStatusLogin = () => {
    CookieUtil.unset('juumId')
    statusLogin.value = null
  }

  return {
    statusLogin,
    setStatusLogin,
    clearStatusLogin
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
