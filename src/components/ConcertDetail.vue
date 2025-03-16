<script setup></script>

<template>
  <div class="bg-[#333333] text-white p-4">
    <div class="grid grid-cols-2 gap-4">
      <img src="../../concert/image.png" class="w-1/2 px-16" />
      <div class="p-4 flex flex-col justify-center">
        <h2 class="text-2xl font-bold border-b pb-2 text-center">Concert</h2>
        <div class="mt-4 space-y-2">
          <div class="flex items-center space-x-2">
            <img
              src="../../icons/calendar.png"
              alt="Calendar Icon"
              class="w-5 h-5"
            />
            <span>Concerts</span>
          </div>
          <div class="flex items-center space-x-2">
            <img src="../../icons/time.png" alt="Clock Icon" class="w-5 h-5" />
            <span>Concerts</span>
          </div>
          <div class="flex items-center space-x-2">
            <img
              src="../../icons/map-pin.png"
              alt="Map Pin Icon"
              class="w-5 h-5"
            />
            <span>Concerts</span>
          </div>
          <div class="flex items-center space-x-2">
            <img
              src="../../icons/coin.png"
              alt="Bitcoin Icon"
              class="w-5 h-5"
            />
            <span>Concerts</span>
          </div>
        </div>
        <button
          class="mt-4 px-5 py-2 border border-white rounded-3xl flex items-center space-x-2 w-fit cursor-pointer active:bg-white/10"
        >
          <img src="../../icons/follow.png" alt="Bell Icon" class="w-5 h-5" />
          <span>Follow</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
