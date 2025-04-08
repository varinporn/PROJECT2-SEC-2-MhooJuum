<script setup>
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="my-16 flex-grow flex flex-col items-center justify-center text-center px-4">
      <h2 class="text-lg md:text-2xl lg:text-3xl font-semibold text-[#b3b3b3] mb-4">Page Not Found</h2>
      <p class="text-sm md:text-base lg:text-lg text-gray-400 mb-6">
        Sorry! This page doesn't exist on our system.
      </p>
      <router-link to="/" class="px-4 py-2 lg:px-6 lg:py-3 bg-[#03abef] hover:bg-[#5fd1ff] text-white rounded-xl transition-all text-sm md:text-base">
        Home page
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมได้ที่นี่ถ้าต้องการ */
</style>
