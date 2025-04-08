<script setup>
import { CookieUtil } from '@/libs/cookieUtil'
import { ref, watch, onMounted } from 'vue'
import LoginManager from './LoginManager.vue'
import { storeToRefs } from 'pinia';
import { useAuth } from '@/store/auth';

onMounted(() => {
  console.log(statusLogin.value);
  
  if (statusLogin.value === null) {
    online.value = false 
  } else {
    online.value = true
  }
  console.log(online.value);
  
})

const emit = defineEmits(['forwardNoti'])
const forwardNoti = (notiType, textHeader, textContent) => {
  emit('forwardNoti', notiType, textHeader, textContent)
}

const online = ref(false)

const authStore = useAuth()
const {statusLogin} = storeToRefs(authStore)
watch(statusLogin, (value) => {
  if(value === null) {
    online.value = false
    emit('forwardNoti', true, 'Good luck!', '')
  } else {
    online.value = true
  }
})

const changeOnline = () => {
  toggleLogin(false)
  online.value = true
}

const isLogin = ref(false)
const toggleLogin = (boolean) => {
  isLogin.value = boolean
}

// Notification
const showNotification  = ref(false)
const notification = ref({
  notiType: "",
  textHeader: "",
  textContent: ""
})

const callNotification = (notiType, textHeader, textContent) => {
  notification.value.notiType = notiType
  notification.value.textHeader = textHeader
  notification.value.textContent = textContent
  
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    // clear notification
    notification.value = {
      nontiType: "",
      textHeader: "",
      textContent: ""
    }
  }, 8000)
}

const showMobileMenu = ref(false)
</script>

<template>
  <div
    class="sticky top-0 w-full bg-[#ffffff] py-5 px-6 md:px-8 flex justify-between border-b-2 border-gray-200 z-50"
  >
    <div class="flex space-x-20">
      <div>
        <router-link :to="{ name: 'Home' }">
          <img src="/logo.png" alt="logo" class="h-6 mt-1 md:mt-0 lg:mt-0 md:h-8 lg:h-8" />
        </router-link>
      </div>
      <div class="lg:flex items-center space-x-10 hidden">
        <router-link
          active-class="underline"
          class="font-semibold cursor-pointer"
          :to="{ name: 'Home' }"
          >HOME</router-link
        >
        <router-link
          active-class="underline"
          class="font-semibold cursor-pointer"
          :to="{ name: 'ConcertView' }"
          >CONCERTS</router-link
        >
        <div>
          {{ online }}
        </div>
      </div>
    </div>
    <div class="lg:flex hidden">
      <router-link v-if="online" :to="{ name: 'UserManager' }">
        <img
          src="/icons/profile.png"
          alt="profile"
          class="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm hover:border-gray-400 transition"
        />
      </router-link>
      <button v-else @click="toggleLogin(true)" class="cursor-pointer">
        Log In | Sign Up
      </button>
    </div>

    <!-- mobile -->
    <div class="lg:hidden self-center">
      <button @click="showMobileMenu = true">
        <img src="/icons/menu.png" alt="menu" class="w-6 h-6" />
      </button>
    </div>

    <!-- Overlay -->
    <div
      v-show="showMobileMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out lg:hidden"
      :class="{ 'opacity-60': showMobileMenu, 'opacity-0': !showMobileMenu }"
      @click="showMobileMenu = false"
    ></div>

    <!-- Drawer -->
<div
  :class="[
    'fixed top-0 left-0 h-full w-3/4 md:w-2/4 bg-white z-50 shadow-md px-6 py-8 flex flex-col space-y-6 transform transition-transform duration-300 ease-in-out lg:hidden',
    showMobileMenu ? 'translate-x-0' : '-translate-x-full',
  ]"
>
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold">MENU</h2>
    <button @click="showMobileMenu = false">
      <img src="/icons/close.png" alt="close" class="w-6 h-6" />
    </button>
  </div>

  <div>
    <button
      class="border border-[#03abef] rounded-full px-6 py-2 text-[#03abef] font-semibold transition w-fit"
      @click="toggleLogin(true), (showMobileMenu = false)"
      v-if="!online"
    >
      SIGN UP / LOG IN
    </button>
    <div
      v-else
      class="border border-[#03abef] rounded-lg px-6 py-2 text-[#03abef] font-semibold transition w-fit"
    >
      <p>username</p>
    </div>
  </div>

  <router-link
    class="text-black font-bold border-b border-black pb-2 "
    :to="{ name: 'Home' }"
    @click="showMobileMenu = false"
  >
    HOME
  </router-link>

  <router-link
    class="text-black font-bold border-b border-black pb-2"
    :to="{ name: 'ConcertView' }"
    @click="showMobileMenu = false"
  >
    CONCERTS
  </router-link>

  <!-- mobile menu log in -->
  <div v-show="statusLogin" class="flex flex-col space-y-6 ">
    <router-link
      class="text-black font-bold border-b border-black pb-2"
      :to="{ name: 'UserManager' }"
      @click="showMobileMenu = false"
    >
      PROFILE
    </router-link>
  </div>

  <!-- Logout icon positioned at the bottom -->
  <div class="flex justify-end mt-auto" v-if="statusLogin">
    <img src="/icons/logout.png" alt="log-out" class="w-8 h-8 cursor-pointer" />
  </div>
</div>

  </div>

  <LoginManager
    v-if="isLogin"
    @close="toggleLogin(false)"
    @submit="toggleLogin(false)"
    @notification="forwardNoti"
  />
  <!-- @notification="callNotification" -->
  <!-- Notification -->
  <!-- <NotificationModel v-if="showNotification" :noti-type="notification.notiType">
    <template #header>
      {{ notification.textHeader }}
    </template>
    <template #content>
      {{ notification.textContent }}
    </template>
  </NotificationModel> -->
</template>

<style scoped></style>
