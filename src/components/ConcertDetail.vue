<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getItemById } from '../libs/fetchUtils'
import Header from './Header.vue'
const { concertId } = useRoute().params
console.log(concertId)
const selectConcert = ref(null)
async function getConcert() {
  try {
    const response = await getItemById(
      `${import.meta.env.VITE_APP_URL}/concerts`,
      concertId
    );
    selectConcert.value = response.length > 0 ? response[0] : null;
  } catch (error) {
    console.log(error)
  }
}

getConcert()
</script>

<template>
  <Header/>
  <div>
    <div v-if="selectConcert" class="bg-[#333333] text-white p-4">
      <div class="grid grid-cols-2 gap-4">
        <img src="../../concert/image.png" class="w-1/2 px-16" />
        <div class="p-4 flex flex-col justify-center">
          <h2 class="text-2xl font-bold border-b pb-2 text-center">
            {{ selectConcert.name }}
          </h2>
          <div class="mt-4 space-y-2">
            <div class="flex items-center space-x-2">
              <img
                src="../../icons/calendar.png"
                alt="Calendar Icon"
                class="w-5 h-5"
              />
              <span>{{ selectConcert.date }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <img
                src="../../icons/time.png"
                alt="Clock Icon"
                class="w-5 h-5"
              />
              <span>{{ selectConcert.time }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <img
                src="../../icons/map-pin.png"
                alt="Map Pin Icon"
                class="w-5 h-5"
              />
              <span>{{ selectConcert.location }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <img
                src="../../icons/coin.png"
                alt="Bitcoin Icon"
                class="w-5 h-5"
              />
              <span>{{ selectConcert.price }}</span>
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
      <button
        @click="$router.go(-1)"
        class="pt-5 underline text-purple-500 cursor-pointer"
      >
        Back
      </button>
    </div>
    <!-- <div v-else class="flex justify-center items-center h-40">
      <p class="text-white">Loading...</p>
    </div> -->
  </div>
</template>

<style scoped></style>
