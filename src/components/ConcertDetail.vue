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

// follow
const isFollowed = ref(false)
const toggleFollow = () => {
  isFollowed.value = !isFollowed.value
}

// quantity
const quantity = ref(1)
const increaseQuantity = () => {
  if (quantity.value < 4) quantity.value++
}
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

// show booking ticket
const showBookingTicket = ref(false)
const toggleGetTicket = () => {
  showBookingTicket.value = true
}
</script>

<template>
  <Header />
  <div>
    <img
      src="../../icons/back.png"
      @click="$router.push('/')"
      class="cursor-pointer absolute w-10 mt-6 ml-8"
    />
    <div v-if="selectConcert" class="bg-[#333333] text-white px-20 py-10">
      <div class="flex flex-row items-start">
        <div class="basis-1/3 flex">
          <img
            :src="`../../concert/${selectConcert.genre}Poster.png`"
            class="w-full px-16"
          />
        </div>
        <div class="basis-2/3 p-4 flex flex-col justify-center">
          <h2 class="text-3xl font-bold border-b-2 pb-2 text-center">
            {{ selectConcert.name }}
          </h2>
          <div class="mt-8 space-y-4">
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

          <!-- follow button -->
          <button
            class="mt-10 px-5 py-2 border border-white rounded-3xl flex items-center space-x-2 w-fit cursor-pointer active:bg-white/10"
            @click="toggleFollow"
          >
            <img
              :src="
                isFollowed
                  ? '../../icons/following.png'
                  : '../../icons/follow.png'
              "
              alt="Bell Icon"
              class="w-5 h-5"
            />
            <span>{{ isFollowed ? 'Following' : 'Follow' }}</span>
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
          How to Buy Tickets
        </p>
      </div>
      <div class="space-x-8">
        <span v-if="selectConcert" class="text-lg font-bold">
          Price: {{ selectConcert.price }}
        </span>
        <a href="#bookingTicket">
          <button
            class="bg-[#03abef] text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#5fd1ff]"
            @click="toggleGetTicket"
          >
            GET TICKET
          </button>
        </a>
      </div>
    </div>

    <div>
      <!-- detail of concert -->
      <div v-if="selectConcert && selectedTab === 'details'" class="py-8 px-12">
        <div class="text-center flex flex-col">
          <h3 v-if="selectConcert" class="font-bold text-4xl py-6">
            {{ selectConcert.name }}
          </h3>
          <div>
            <img
              :src="`../../concert/${selectConcert.genre}Poster.png`"
              class="w-1/2 px-18 mx-auto"
            />
          </div>
          <p
            v-if="selectConcert"
            v-html="formattedDescription"
            class="pt-10"
          ></p>
        </div>

        <!-- booking ticket -->
        <div v-show="showBookingTicket" class="px-12 pb-10" id="bookingTicket">
          <p class="font-bold text-lg text-gray-800 pt-18">
            Ticket Information
          </p>
          <!-- ticket info -->
          <div
            class="bg-[#f4f6fa] px-10 pt-6 pb-8 space-y-4 rounded-xl mt-4 shadow-lg"
          >
            <p class="py-2 border-b-2 border-gray-200 text-gray-700">
              <span class="font-semibold">Name </span>{{ selectConcert.name }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700">
              <span class="font-semibold">Date </span>{{ selectConcert.date }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700">
              <span class="font-semibold">Time </span>{{ selectConcert.time }}
            </p>
            <div
              class="flex items-center py-2 border-b-2 border-gray-200 text-gray-700"
            >
              <span class="font-semibold mr-4">Quantity </span>
              <div class="space-x-4">
                <button
                  class="py-1 px-3 border-1 rounded-lg bg-[#e1e6f0] hover:bg-[#c4c9e6]"
                  @click="decreaseQuantity"
                >
                  -
                </button>
                <span class="text-lg">{{ quantity }}</span>
                <button
                  class="py-1 px-3 border-1 rounded-lg bg-[#e1e6f0] hover:bg-[#c4c9e6]"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
            </div>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700">
              <span class="font-semibold">Unit Price (Baht) </span
              >{{ selectConcert.price }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700">
              <span class="font-semibold">Total Price (Baht) </span
              >{{ selectConcert.price * quantity }}
            </p>
          </div>

          <!-- checkbox -->
          <div class="ml-4 mt-8 flex items-center space-x-4">
            <input
              type="checkbox"
              name=""
              id=""
              class="w-5 h-5 border-2 border-gray-300 rounded-md bg-gray-100 checked:bg-[#03abef]"
            />
            <span class="text-gray-700"
              >Please click to accept
              <span class="text-[#03abef] cursor-pointer"
                >“Terms and Conditions”</span
              ></span
            >
          </div>

          <!-- button -->
          <div class="flex flex-row justify-center space-x-6 mt-8">
            <button
              class="bg-[#909cb3] text-white font-semibold py-2 w-28 rounded-full cursor-pointer hover:bg-[#bbc3d4] transition ease-in-out duration-200"
              @click="$router.go(-1)"
            >
              BACK
            </button>
            <button
              class="bg-[#03abef] text-white font-semibold py-2 w-28 rounded-full cursor-pointer hover:bg-[#5fd1ff] transition ease-in-out duration-200"
            >
              BOOKING
            </button>
          </div>
        </div>
      </div>

      <!-- how to buy -->
      <div
        v-if="selectConcert && selectedTab === 'howToBuy'"
        class="py-8 px-12"
      >
        <h2 class="text-xl font-semibold mb-4">How to Buy Tickets</h2>

        <div class="space-y-6">
          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-lg">Step 1: Select the Concert</h3>
            <p>Choose the concert you would like to attend.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-lg">
              Step 2: Select the Number of Tickets
            </h3>
            <p>
              Choose the number of tickets you would like to purchase (max 4 per
              account).
            </p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-lg">Step 3: Accept the Terms</h3>
            <p>Read and agree to the Terms and Conditions before proceeding.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-lg">Step 4: Click "Booking"</h3>
            <p>Click the "Booking" button to proceed to payment.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="font-semibold text-lg">Step 5: Confirm Payment</h3>
            <p>
              Review your order and confirm payment to complete your purchase.
            </p>
          </div>
        </div>

        <p class="text-red-600 italic mt-6">
          * Please ensure all details are correct before confirming your
          payment!
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
