<script setup>
    import PopupModel from "./PopupModel.vue"
    import { ref, defineEmits } from "vue"

    const emit = defineEmits(['closeEditProfile', 'saveProfile', 'saveNewPassword'])
    const props = defineProps({
        dataAccout: {
            type: Object
        },
        statusLogin: {
            type: Boolean
        }
    })
    const data = ref({ ...props.dataAccout })
    const status = ref(props.statusLogin)

    const showPassword = ref(false)
    const closePopup = () => {
        data.value = { ...props.dataAccout }
        showPassword.value = false
        emit('closeEditProfile')
    }

    const trimData = () => {
        for (const key in data.value) {
            if (typeof data.value[key] === "string") {
                data.value[key] = data.value[key].trim();
            }
        }
        return data.value
    }

    const submit = () => {
        if (status.value) {
            emit('saveProfile', trimData())
            closePopup()
        } else {
            emit('saveNewPassword', trimData())
            closePopup()
        }
    }
</script>
 
<template>
    <PopupModel @close="closePopup">
        <div>
            <div class="flex flex-col items-center p-8 bg-white shadow-xl rounded-lg w-[25rem]">
                <button @click="closePopup" class="font-black cursor-pointer self-end">X</button>
                <h2 class="text-2xl font-bold mb-4">{{ status ? 'Edit Profile' : 'Reset Password' }}</h2>
                <p class="text-gray-500 mb-6">{{ status ? data.email : 'Enter the email associated with your account' }}</p>
                
                <div class="w-full">
                    <div class="mb-4" v-if="status">
                        <label class="block text-gray-700 font-semibold mb-2">User name:</label>
                        <input type="text" v-model="data.username" 
                            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-4" v-else>
                        <label class="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input type="text" v-model="data.email" 
                            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-6 relative">
                        <label class="block text-gray-700 font-semibold mb-2">{{ status ? 'Password:' : 'New password:' }}</label>
                        <input :type="showPassword ? 'text' : 'password'" v-model="data.password"
                            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        
                        <!-- Show password -->
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute inset-y-0 mt-8 right-3 flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                                v-if="showPassword"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.038 10.038 0 0112 19c-4.418 0-8.03-2.411-10-6 1.97-3.589 5.582-6 10-6a9.96 9.96 0 014.125.825m2.712 2.712A8.94 8.94 0 0120 12c-1.97 3.589-5.582 6-10 6-1.38 0-2.693-.249-3.887-.7m10.474-4.962A2.5 2.5 0 1115.5 9.5m0 0l.007-.007"
                                ></path>
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 3l18 18M10.477 10.477A3 3 0 1114.5 14.5m-4.023-4.023A9.96 9.96 0 014.125 6.825m2.712 2.712A8.94 8.94 0 004 12c1.97 3.589 5.582 6 10 6a9.96 9.96 0 004.125-.825M19.875 17.175A8.94 8.94 0 0020 12c-1.97-3.589-5.582-6-10-6-1.38 0-2.693.249-3.887.7"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <input type="submit" value="Save" 
                        @click="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-500 transition duration-300 cursor-pointer">
                </div>
            </div>
        </div>
    </PopupModel>
</template>
 
<style scoped>

</style>