<script setup></script>

<template>
  <div
    class="sticky top-0 w-full bg-[#ffffff] py-5 px-8 flex justify-between border-b-2 border-gray-200 z-50"
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
      <img
        src="/icons/profile.png"
        alt="profile"
        class="w-8 h-8 rounded-full cursor-pointer"
      />
    </div>
  </div>
</template>

<style scoped></style>
