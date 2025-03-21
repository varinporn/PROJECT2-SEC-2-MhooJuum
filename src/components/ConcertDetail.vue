<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getItemById } from '../libs/fetchUtils'
import Header from './Header.vue'
import Footer from './Footer.vue'
const { concertId } = useRoute().params
console.log(concertId)
const selectConcert = ref(null)

onMounted(async () => {
  try {
    selectConcert.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/concerts`,
      concertId
    )
  } catch (error) {
    console.log(error)
  }
})

const selectedTab = ref('details')
const formattedDescription = computed(() => {
  return selectConcert.value?.description.replace(/\n/g, '<br>') || ''
})
</script>

<template>
  <Header />
  <div>
    <img
            src="../../icons/arrow.png"
            @click="$router.go(-1)"
            class="cursor-pointer absolute w-15 mt-6 ml-8"
          />
    <div v-if="selectConcert" class="bg-[#333333] text-white px-20 py-10">
      <div class="flex flex-row">
        <div class="basis-1/3 flex">
          <img
            :src="`../../concert/${selectConcert.genre}Poster.png`"
            class="w-full px-16"
          />
        </div>
        <div class="basis-2/3 p-4 flex flex-col justify-center">
          <h2 class="text-3xl font-bold border-b pb-2 text-center">
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
    </div>
    <div
      class="flex justify-between items-center py-4 px-12 border-gray-200 border-b-2"
    >
      <div class="flex space-x-8">
        <p
          class="font-semibold cursor-pointer"
          :class="{ underline: selectedTab === 'details' }"
          @click="selectedTab = 'details'"
        >
          Details
        </p>
        <p
          class="font-semibold cursor-pointer"
          :class="{ underline: selectedTab === 'howToBuy' }"
          @click="selectedTab = 'howToBuy'"
        >
          How to buy tickets
        </p>
      </div>
      <div class="space-x-8">
        <span v-if="selectConcert" class="text-lg font-bold"
          >Price: {{ selectConcert.price }}
        </span>
        <button
          class="bg-[#03abef] text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#5fd1ff]"
        >
          GET TICKET
        </button>
      </div>
    </div>
    <div>
      <div
        v-if="selectConcert && selectedTab === 'details'"
        class="py-8 px-12 text-center flex flex-col"
      >
        <h3 v-if="selectConcert" class="font-bold text-3xl py-6">
          {{ selectConcert.name }}
        </h3>
        <div>
          <img
            :src="`../../concert/${selectConcert.genre}Poster.png`"
            class="w-1/2 px-16 mx-auto"
          />
        </div>
        <p v-if="selectConcert" v-html="formattedDescription" class="py-8"></p>
      </div>
      <div
        v-if="selectConcert && selectedTab === 'howToBuy'"
        class="py-8 px-12"
      >
        <p>select concert</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
