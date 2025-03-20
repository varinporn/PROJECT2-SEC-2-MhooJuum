<script setup>
    import PopupModel from "./PopupModel.vue"
    import { ref, defineEmits } from "vue"

    const emit = defineEmits(['closeLogin', 'login', 'addAccout', 'forgetPassword'])
    const props = defineProps({
        dataAccout: {
            type: Object
        }
    })
    const data = ref({ ...props.dataAccout })
    const showPassword = ref(false)
    
    // Switch Feture
    const showPageSignUp = ref(true)
    const switchFeture = (request) => {
        data.value = { 
            username: "",
            email: "", 
            DOB: "",
            password: "",
            tickets: [],
            bookmarks: []
        }
        showPageSignUp.value = request
        showPassword.value = false
    }

    const trimData = () => {
        for (const key in data.value) {
            if (typeof data.value[key] === "string") {
                data.value[key] = data.value[key].trim();
            }
        }
        return data.value
    }
</script>
 
<template>
    <PopupModel @click="() => { emit('closeLogin'); switchFeture(true); }">
      <div class="flex shadow-xl items-center rounded-lg h-[40rem] w-[50rem] bg-white relative">
        <!-- Login -->
        <div class="p-10 w-[25rem]">
          <button @click="() => { emit('closeLogin'); switchFeture(true); }" class="relative bottom-[7rem] font-black cursor-pointer">X</button>
          <p class="text-center font-bold text-3xl mb-6">Login</p>
          <div class="flex flex-col space-y-7">
            <div>
              <label class="font-bold text-gray-400">User name:</label>
              <input type="text" v-model="data.username"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div class="relative">
              <label class="font-bold text-gray-400">Password:</label>
              <input :type="showPassword ? 'text' : 'password'" v-model="data.password"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2 pr-10">
              
              <!-- Show password -->
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-2 mt-6 flex items-center text-gray-500 hover:text-gray-700">
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
  
            <p @click="() => { emit('closeLogin'); emit('forgetPassword'); switchFeture(true); }" 
                class="font-bold text-gray-400 text-xs ml-auto cursor-pointer hover:text-blue-600">Forget Password?</p>
            <input type="submit" value="Log in" @click="$emit('login', trimData())"
              class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
          </div>
        </div>
  
        <!-- Sign Up -->
        <div class="p-10 w-[25rem]">
          <button @click="() => { emit('closeLogin'); switchFeture(true); }"
            class="relative bottom-[3rem] font-black left-[19rem] cursor-pointer">X</button>
          <p class="text-center font-bold text-3xl mb-6">Sign up</p>
          <div class="flex flex-col space-y-7">
            <div>
              <label class="font-bold text-gray-400">Email:</label>
              <input type="email" required v-model="data.email"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div>
              <label class="font-bold text-gray-400">Birth day:</label>
              <input type="date" required v-model="data.DOB"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div>
              <label class="font-bold text-gray-400">User name:</label>
              <input type="text" required v-model="data.username"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div class="relative">
              <label class="font-bold text-gray-400">Password:</label>
              <input :type="showPassword ? 'text' : 'password'" required v-model="data.password"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2 pr-10">
              
              <!-- Show password -->
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 mt-6 right-2 flex items-center text-gray-500 hover:text-gray-700">
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
  
            <input type="submit" value="Sign up" @click="() => { emit('addAccout', trimData()); switchFeture(); }"
              class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
          </div>
        </div>
  
        <!-- Switch Feature -->
        <div class="bg-gray-500 rounded-lg absolute h-[40rem] w-[25rem] flex justify-center items-center transition-transform duration-500"
          :class="{ 'translate-x-[25rem]': showPageSignUp }">
          <div v-if="showPageSignUp" class="m-8">
            <p class="text-4xl font-black text-white text-center mb-4">Welcome Back!</p>
            <p class="text-xl font-normal text-white text-center mb-10">Enter your personal details to use all of site features</p>
            <button @click="switchFeture(false)"
              class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500 hover:scale-110 transition-transform">
              Sign up
            </button>
          </div>
          <div v-else class="m-8">
            <p class="text-4xl font-black text-white text-center mb-4">Hello, Friend!</p>
            <p class="text-xl font-normal text-white text-center mb-10">Register with your personal details to use all of site features</p>
            <button @click="switchFeture(true)"
              class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500 hover:scale-110 transition-transform">
              Login
            </button>
          </div>
        </div>
      </div>
    </PopupModel>
  </template>
 
<style scoped>

</style>