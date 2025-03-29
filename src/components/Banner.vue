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
  <div class="relative w-full h-[480px] overflow-hidden">
    <!-- Blurred Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <img :src="selectedBanner" class="w-full h-full object-cover filter blur-lg scale-110 opacity-80">
    </div>

    <!-- Foreground Image -->
    <div class="absolute inset-0 flex items-center justify-center">
      <img :src="selectedBanner" class="w-1/2">
    </div>

    <!-- Navigation Arrows -->
    <button class="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-10" @click="prevBanner">
      <img src="/icons/previous.png">
    </button>
    <button class="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-10" @click="nextBanner">
      <img src="/icons/next.png">
    </button>

    <!-- Line Indicators -->
    <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span
        v-for="(image, index) in bannerImage"
        :key="index"
        @click="setBanner(index)"
        class="h-1 cursor-pointer transition-all duration-300 rounded-full"
        :class="selectedIndex === index ? 'bg-white w-8' : 'bg-gray-500 w-5'"
      ></span>
    </div>
  </div>
</template>

<style scoped>
</style>
