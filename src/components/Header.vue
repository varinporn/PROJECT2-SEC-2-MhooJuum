<script setup>
import { CookieUtil } from '@/libs/cookieUtil'
import { ref } from 'vue'
import LoginManager from './LoginManager.vue'
import { useRouter } from 'vue-router'

const statusLogin = ref(CookieUtil.get('juumId'))

const isLogin = ref(false)
const toggleLogin = (boolean) => {
  isLogin.value = boolean
  statusLogin.value = CookieUtil.get('juumId')
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
          <img src="/logo.png" alt="logo" class="h-6 md:h-8" />
        </router-link>
      </div>
      <div class="md:flex space-x-10 hidden">
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
      </div>
    </div>
    <div class="md:flex hidden">
      <router-link v-if="statusLogin" :to="{ name: 'UserManager' }">
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
    <div class="md:hidden self-center">
      <button @click="showMobileMenu = true">
        <img src="/icons/menu.png" alt="menu" class="w-6 h-6" />
      </button>
    </div>

    <!-- Overlay -->
    <div
      v-show="showMobileMenu"
      class="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ease-in-out"
      :class="{ 'opacity-60': showMobileMenu, 'opacity-0': !showMobileMenu }"
      @click="showMobileMenu = false"
    ></div>

    <!-- Drawer -->
    <div
      :class="[
        'fixed top-0 left-0 h-full w-3/4 bg-white z-50 shadow-md px-6 py-8 flex flex-col space-y-6 transform transition-transform duration-300 ease-in-out',
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
          v-if="!statusLogin"
        >
          SIGN UP / LOG IN
        </button>
        <div
          v-if="statusLogin"
          class="border border-[#03abef] rounded-lg px-6 py-2 text-[#03abef] font-semibold transition w-fit"
        >
          <p>username</p>
        </div>
      </div>

      <router-link
        class="text-black font-bold border-b border-black pb-2"
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
        <router-link
          class="text-black font-bold border-b border-black pb-2"
          :to="{ name: 'UserManager' }"
          @click="showMobileMenu = false"
        >
          HISTORY
        </router-link>
        <router-link
          class="text-black font-bold border-b border-black pb-2"
          :to="{ name: 'UserManager' }"
          @click="showMobileMenu = false"
        >
          FOLLOW
        </router-link>
      </div>

      <div class="flex justify-end mt-[14rem]" v-if="statusLogin">
        <img src="/icons/logout.png" alt="log-out" class="w-8 h-8">
      </div>

    </div>
  </div>

  <LoginManager
    @close="toggleLogin(false)"
    v-if="isLogin"
    @submit="toggleLogin(false)"
  />
</template>

<style scoped></style>
