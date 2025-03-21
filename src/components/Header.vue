<script setup>
import { CookieUtil } from '@/libs/cookieUtil';
import { ref } from 'vue';
import LoginManager from './LoginManager.vue';

const statusLogin = ref(CookieUtil.get('juumId'))

const openLogin = ref(false)
</script>

<template>
  <div
    class="sticky top-0 w-full bg-[#ffffff] py-5 px-8 flex justify-between border-b-2 border-gray-200"
  >
    <div class="flex space-x-20">
      <div>
        <img src="/logo.png" alt="logo" class="h-8" />
      </div>
      <div class="flex space-x-10">
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
    <div>
      <img
        v-if="statusLogin"
        src="/icons/profile.png"
        alt="profile"
        class="w-8 h-8 rounded-full cursor-pointer"
      />
      <button
        v-else
        @click="openLogin=true"
        >
        Log In | Sign Up
      </button>
    </div>
  </div>
  <LoginManager v-if="openLogin"/>

</template>

<style scoped></style>
