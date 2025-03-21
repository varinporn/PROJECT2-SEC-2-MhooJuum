<script setup></script>

<template>
 <div class="relative w-full h-[600px] overflow-hidden">
    <!-- Blurred Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <img src="../../banner/banner1.png" alt="" class="w-full h-full object-cover filter blur-lg scale-110">
    </div>

    <!-- Foreground Image -->
    <div class="absolute inset-0 flex items-center justify-center">
      <img src="../../banner/banner1.png" alt="" class="w-2/3">
    </div>

    <!-- Navigation Arrows -->
    <button class="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-10">
      <img src="../../icons/previous.png">
    </button>
    <button class="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer w-10">
        <img src="../../icons/next.png">
    </button>
  </div>
</template>

<style scoped></style>
