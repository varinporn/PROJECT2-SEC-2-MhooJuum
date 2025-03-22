<script setup>
import { CookieUtil } from '@/libs/cookieUtil';
import { computed, ref, watch } from 'vue';
import LoginManager from './LoginManager.vue';
import { useRouter } from 'vue-router';

const statusLogin = ref(CookieUtil.get('juumId'))

const isLogin = ref(false)
const toggleLogin = (boolean) => {
  isLogin.value = boolean
  statusLogin.value = CookieUtil.get('juumId')
}
</script>

<template>
  <div
    class="sticky top-0 w-full bg-[#ffffff] py-5 px-8 flex justify-between border-b-2 border-gray-200"
  >
    <div class="flex space-x-20">
      <div>
        <router-link :to="{ name: 'Home' }"
          ><img src="/logo.png" alt="logo" class="h-8"
        /></router-link>
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
      <router-link 
        v-if="statusLogin"
        :to="{ name: 'UserManager' }">
        <img
          src="/icons/profile.png"
          alt="profile"
          class="w-8 h-8 rounded-full cursor-pointer"
        />
      </router-link>
      <button
        v-else
        @click="toggleLogin(true)"
        >
        Log In | Sign Up
      </button>
    </div>
  </div>
  <LoginManager @close="toggleLogin(false)" v-if="isLogin" @submit="toggleLogin(false)"/>

</template>

<style scoped></style>
