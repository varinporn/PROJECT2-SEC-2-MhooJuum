<script setup>
import { ref, computed } from 'vue'

const bannerImage = ref([
  '/banner/banner1.png',
  '/banner/banner2.png',
  '/banner/banner3.png',
  '/banner/banner4.png',
  '/banner/banner5.png',
  '/banner/banner6.png'
])

const selectedIndex = ref(0)

// Compute the current banner dynamically
const selectedBanner = computed(() => bannerImage.value[selectedIndex.value])

const nextBanner = () => {
  selectedIndex.value = (selectedIndex.value + 1) % bannerImage.value.length
}

const prevBanner = () => {
  selectedIndex.value = selectedIndex.value === 0 ? bannerImage.value.length - 1 : selectedIndex.value - 1
}

// Set banner by clicking a line indicator
const setBanner = (index) => {
  selectedIndex.value = index
}
</script>

<template>
  <div class="relative w-full h-[200px] md:h-[480px] overflow-hidden">
    <!-- Blurred Background Image -->
    <div class="absolute inset-0 w-full h-full hidden md:block">
      <img :src="selectedBanner" class="w-full h-full object-cover filter blur-lg scale-110 opacity-80">
    </div>

    <!-- Foreground Image -->
    <div class="absolute inset-0 md:flex md:items-center md:justify-center">
      <img :src="selectedBanner" class=" w-full md:w-1/2">
    </div>

    <!-- Navigation Arrows -->
    <button class="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 md:w-10 " @click="prevBanner">
      <img src="/icons/previous.png">
    </button>
    <button class="absolute right-3 md:right-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 md:w-10" @click="nextBanner">
      <img src="/icons/next.png">
    </button>

    <!-- Line Indicators -->
    <div class="absolute bottom-6 sm:bottom-2 md:bottom-4 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
      <span
        v-for="(image, index) in bannerImage"
        :key="index"
        @click="setBanner(index)"
        class="h-1 cursor-pointer transition-all duration-300 rounded-full"
        :class="selectedIndex === index ? 'bg-white w-5 md:w-8' : 'bg-gray-500 w-2 md:w-5'"
      ></span>
    </div>
  </div>
</template>

<style scoped>
</style>
