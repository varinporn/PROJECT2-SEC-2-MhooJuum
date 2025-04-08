<script setup>
    import PopupModel from "./PopupModel.vue"
    import { ref, defineEmits } from "vue"

    const emit = defineEmits(['closeLogin', 'login', 'addAccount', 'forgetPassword'])
    const props = defineProps({
        dataAccount: {
            type: Object
        }
    })
    const data = ref({ ...props.dataAccount })
    const usernameOrEmail = ref('')
    const showPassword = ref(false)
    
    // Switch Feature
    const showPageLogin = ref(true)
    const switchFeature = (request) => {
        showPageLogin.value = request
        data.value = { ...props.dataAccount }
        usernameOrEmail.value = ''
        alertTypeEmail.value = false
        alertTypePassword.value = false
        alertStatus.value = false
        showPassword.value = false
    }


    const alertTypeEmail = ref(false)
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/
        return emailRegex.test(email)
    }

    const alertTypePassword = ref(false)
    const isEasyPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        return passwordRegex.test(password)
    }

    const alertStatus = ref(false)
    const submit = () => {
        // trim data
        for (const key in data.value) {
            if (typeof data.value[key] === "string") {
                data.value[key] = data.value[key].trim();
            }
        }

        if (showPageLogin.value) {
            // login
            if (!usernameOrEmail.value.trim() || !data.value.password) {
                alertStatus.value = true
                return
            }

            // Check username or email
            if (!isValidEmail(usernameOrEmail.value.trim())) {
                data.value.username = usernameOrEmail.value.trim()
            } else {
                data.value.email = usernameOrEmail.value.trim()
            }

            emit('login', data.value)
            switchFeature(true)
        } else {
            //sign up
            if (!data.value.username || !data.value.email || !data.value.DOB || !data.value.password) {
                alertStatus.value = true
                return
            }
            
            if (!isValidEmail(data.value.email)) {
                alertTypeEmail.value = true
                return
            }   
            
            if (!isEasyPassword(data.value.password)) {
                alertTypePassword.value = true
                return
            }
           
            emit('addAccount', data.value)
            switchFeature(true)
        }
    }

</script>
 
<template>
    <PopupModel @close="() => { switchFeature(true); $emit('closeLogin') }">
      
      <div class="md:flex shadow-xl items-center rounded-4xl md:h-[40rem] md:w-[40rem] lg:w-[50rem] bg-white relative">
        <div class="md:hidden flex flex-row-reverse">
          <button @click="() => {switchFeature(true); $emit('closeLogin') }"
            class="cursor-pointer p-5 "><img src="/icons/close.png" class="w-[20px]"></button>
        </div>
        <div class="md:hidden flex justify-center gap-10">
          <div class="flex w-[15rem] p-1 bg-gray-200 rounded-lg shadow-md text-sm">
            <!-- LOGIN -->
            <div class="flex-1 text-center cursor-pointer rounded-lg py-2" 
              :class="{'bg-white': showPageLogin}" @click="switchFeature(true)">
              LOGIN
            </div>

            <!-- SIGN UP -->
            <div class="flex-1 text-center cursor-pointer rounded-lg py-2" 
              :class="{'bg-white': !showPageLogin}" @click="switchFeature(false)">
              SIGN UP
            </div>
          </div>
        </div>

        <!-- Login -->
        <div class="px-10 py-7 md:p-10 w-[20rem] lg:w-[25rem] max-md:h-[35rem]" :class="{'max-md:block': showPageLogin, 'max-md:hidden': !showPageLogin}">
          <button @click="() => {switchFeature(true); $emit('closeLogin') }" 
            class="relative bottom-[0.5rem] cursor-pointer max-md:hidden"><img src="/icons/close.png" class="w-[20px]"></button>
          <p class="text-center font-bold text-2xl md:text-3xl mb-6">Login</p>
          <div class="flex flex-col space-y-5 md:space-y-7">
            <div>
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="alertStatus && !usernameOrEmail ? 'text-red-600' : 'text-gray-400'">Username or email:</span>
                    <span v-show="alertStatus && !usernameOrEmail" class="text-xs font-medium text-red-400">* Enter username or email</span>
                </p>
              <input type="text" v-model="usernameOrEmail"
                :class="alertStatus && !usernameOrEmail ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div class="relative">
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="alertStatus && !data.password ? 'text-red-600' : 'text-gray-400'">Password:</span>
                    <span v-show="alertStatus && !data.password" class="text-xs font-medium text-red-400">* Enter password</span>
                </p>
              <input :type="showPassword ? 'text' : 'password'" v-model="data.password"
                :class="alertStatus && !data.password ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
              
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
  
            <p @click="() => { emit('forgetPassword'); switchFeature(true); }" 
                class="font-bold text-gray-400 text-xs ml-auto cursor-pointer hover:text-[#03abef]">Forget Password?</p>
            <input type="submit" value="Log in" @click="submit"
              class="w-3/5 mx-auto text-white bg-[#03abef] hover:bg-[#5fd1ff] hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
          </div>
          <div class="w-[12rem] mt-[1rem] mx-auto pl-[1.5rem]">
            <img src="/icons/pig.png" alt="Pig">
          </div>
        </div>
  
        <!-- Sign Up -->
        <div class="px-10 py-7 md:p-10 w-[20rem] lg:w-[25rem] max-md:h-[35rem]" :class="{'max-md:hidden': showPageLogin, 'max-md:block': !showPageLogin}">
          <button @click="() => {switchFeature(true); $emit('closeLogin') }"
            class="relative bottom-[2rem] left-[14rem] lg:left-[19rem] cursor-pointer max-md:hidden"><img src="/icons/close.png" class="w-[20px]"></button>
          <p class="text-center font-bold text-2xl md:text-3xl mb-6">Sign up</p>
          <div class="flex flex-col space-y-5 md:space-y-7">
            <div>
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="(alertStatus && !data.email) || alertTypeEmail
                        ? 'text-red-600' : 'text-gray-400'">Email:</span>
                    <span v-show="(alertStatus && !data.email) || alertTypeEmail" 
                        class="text-xs font-medium text-red-400">* Enter email</span>
                </p>
              <input type="email" required v-model="data.email" 
                :class="(alertStatus && !data.email) || alertTypeEmail
                ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
                class="w-full border-b focus:outline-none p-2">
            </div>
  
            <div>
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="alertStatus && !data.DOB ? 'text-red-600' : 'text-gray-400'">Birth day:</span>
                    <span v-show="alertStatus && !data.DOB" class="text-xs font-medium text-red-400">* Enter birth day</span>
                </p>
              <input type="date" required v-model="data.DOB"
                :class="alertStatus && !data.DOB ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div>
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="alertStatus && !data.username ? 'text-red-600' : 'text-gray-400'">Username:</span>
                    <span v-show="alertStatus && !data.username" class="text-xs font-medium text-red-400">* Enter username</span>
                </p>
              <input type="text" required v-model="data.username"
                :class="alertStatus && !data.username ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
                class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
            </div>
  
            <div class="relative">
                <p class="flex justify-between items-center">
                    <span class="font-bold" :class="(alertStatus && !data.password) || alertTypePassword ? 'text-red-600' : 'text-gray-400'">Password:</span>
                    <span v-show="alertStatus && !data.password" class="text-xs font-medium text-red-400">* Enter password</span>  
                </p>
               
              <input :type="showPassword ? 'text' : 'password'" required v-model="data.password"
                :class="(alertStatus && !data.password) || alertTypePassword ? 'border-red-500 bg-red-100 rounded-t-xl' : 'border-gray-400 focus:border-blue-500'"
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
            <p v-show="alertTypePassword" class="text-xs font-medium text-red-400 -mt-[1rem]">
              Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
            <input type="submit" value="Sign up" @click="submit"
              class="w-3/5 mx-auto text-white bg-[#03abef] hover:bg-[#5fd1ff] hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
          </div>
        </div>
  
        <!-- Switch Feature -->
        <div class=" bg-cover rounded-3xl absolute h-[40rem] w-[20rem] lg:w-[25rem] justify-center items-center transition-transform duration-500 hidden md:flex bg-[url('/banner/bg-login.png')]"
          :class="{ 'translate-x-[20rem] lg:translate-x-[25rem]': showPageLogin }">
          <div v-if="showPageLogin" class="m-8">
            <p class="text-4xl font-black text-white text-center mb-4">Welcome Back!</p>
            <p class="text-xl font-normal text-white text-center mb-10">Enter your personal details to use all of site features</p>
            <button @click="switchFeature(false)"
              class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500 hover:scale-110 transition-transform">
              Sign up
            </button>
          </div>
          <div v-else class="m-8">
            <p class="text-4xl font-black text-white text-center mb-4">Hello, Friend!</p>
            <p class="text-xl font-normal text-white text-center mb-10">Register with your personal details to use all of site features</p>
            <button @click="switchFeature(true)"
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