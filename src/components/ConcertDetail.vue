<script setup>
import { onMounted, ref, computed} from 'vue'
import { useRoute } from 'vue-router'
import { getItemById } from '../libs/fetchUtils'
import Header from './Header.vue'
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
        class="py-8 px-12 text-center"
      >
        <h3 v-if="selectConcert" class="font-bold text-2xl text-[#894f06] py-4">
          {{ selectConcert.name }}
        </h3>
        <p v-if="selectConcert" v-html="formattedDescription"></p>
      </div>
      <div v-if="selectConcert && selectedTab === 'howToBuy'" class="py-8 px-12">
        <p>select concert</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
