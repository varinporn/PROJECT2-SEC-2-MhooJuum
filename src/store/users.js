import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUsers = defineStore('user', () => {
    //state
    const users = ref([])

    //getter
    const getUsers = () => {
        return users.value
    }
    return {}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}
