<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { addItem, getItemById, patchItem } from '../libs/fetchUtils'
import EventPopup from '@/components/EventPopup.vue'
import NotificationModel from '@/components/NotificationModel.vue'
import { useAuth } from '@/store/auth';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['notification'])

const authStore = useAuth()

const { setStatusLogin } = authStore;
const {statusLogin} = storeToRefs(authStore)
const dataAccount = ref(null)


watch(statusLogin, async (newValue) => {
  if (!newValue) {
    dataAccount.value = null
    isFollowed.value = false
    return
  }

  try {
    const res = await getItemById(
      `${import.meta.env.VITE_APP_URL}/users`,
      newValue
    )
    dataAccount.value = res
    console.log(dataAccount.value)
    isFollowed.value = res.bookmarks.includes(concertId)
  } catch (err) {
    console.error(err)
  }
})

const { concertId } = useRoute().params

const selectConcert = ref(null)

onMounted(async () => {
  try {
    selectConcert.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/concerts`,
      concertId
    )
    
    dataAccount.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/users`,
      statusLogin.value
    )

    isFollowed.value = dataAccount.value.bookmarks.includes(concertId) 

  } catch (error) {
    console.log(error)
  }
})

const selectedTab = ref('details')

const formattedDescription = computed(() => {
  return selectConcert.value?.description.replace(/\n/g, '<br>') || ''
})

// show booking ticket
const showBookingTicket = computed(() => useRoute().hash === '#bookingTicket')

// quantity
const quantity = ref(1)
const increaseQuantity = () => {
  if (quantity.value < 4) quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

// booking
const ticket = ref({
  concertId,
  userId: statusLogin,
})
const modalMessage = {
  header: '',
  content: '',
  accept: '',
  deny: '',
}
const agree = ref(false)
const agreeText = ref(false)
const showModal = ref(false)
const showCancelConfirm = ref(false)
const showSuccess = ref(false)

const toggleBooking = () => {
  if (!agree.value) {
    agreeText.value = true
    return
  }
  showModal.value = !showModal.value
  showCancelConfirm.value = false
  modalMessage.header = 'Review Order Summary'
  modalMessage.content = ''
  modalMessage.deny = 'CANCEL'
  modalMessage.accept = 'CONFIRM'
}
const confirmCancel = () => {
  showCancelConfirm.value = true
  showModal.value = false
  modalMessage.header = 'Are you sure you want to cancel this order?'
  modalMessage.content = `Don't worry,you can always place a new order later!`
  modalMessage.deny = 'NO, KEEP ORDER'
  modalMessage.accept = 'YES, CANCEL ORDER'
}
const clearBooking = () => {
  showModal.value = false
  showCancelConfirm.value = false
  showSuccess.value = false
}

const concertBooking = async (ticket) => {
  try {
    const updatedTickets = [...dataAccount.value.tickets]
    const ticketIds = []
    
    for (let i = 0; i < quantity.value; i++) {
      const addedTicket = await addItem(
        `${import.meta.env.VITE_APP_URL}/tickets`,
        ticket
      )
      ticketIds.push(addedTicket.id)
    }
    updatedTickets.push(...ticketIds)
    await patchItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      statusLogin.value,
      { tickets: updatedTickets }
    )

    const newAvailable = selectConcert.value.available - quantity.value
    await patchItem(
      `${import.meta.env.VITE_APP_URL}/concerts`,
      selectConcert.value.id,
      { available: newAvailable }
    )
    selectConcert.value.available = newAvailable

    modalMessage.header = 'Booking Successful!'
    modalMessage.content =
      'Thank you for booking, your booking has been placed successfully.'
    modalMessage.accept = 'OK'
    showModal.value = false
    showSuccess.value = true
  } catch (error) {
    console.log(error)
  }
}

// follow
const isFollowed = ref(false)
const showUnfollowConfirm = ref(false)

const toggleFollow = async () => {
  try {
    checkLogin('Please log in to follow', 'You must log in to follow this concert')
    if (!isFollowed.value) {
      dataAccount.value.bookmarks.push(concertId)
    } else {
      showUnfollowConfirm.value = true
      confirmUnfollow()
      return
    }

    
    await patchItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      statusLogin.value,
      { bookmarks: dataAccount.value.bookmarks }
    )

    isFollowed.value = dataAccount.value.bookmarks.includes(concertId)
  } catch (error) {
    console.error(error)
  }
}

// confirm unfollow popup
const confirmUnfollow = () => {
  modalMessage.header = 'Are you sure you want to unfollow this concert?'
  modalMessage.content =
    'You will not get any updates from this event if you tap "Unfollow".'
  modalMessage.deny = 'KEEP FOLLOWING'
  modalMessage.accept = 'UNFOLLOW'
}

// delete concert bookmark whern unfollow
const concertUnfollow = async () => {
  try {
    dataAccount.value.bookmarks = dataAccount.value.bookmarks.filter(
      (id) => id !== concertId
    )
    await patchItem(
      `${import.meta.env.VITE_APP_URL}/users`,
      statusLogin.value,
      {
        bookmarks: dataAccount.value.bookmarks,
      }
    )
    isFollowed.value = false
    showUnfollowConfirm.value = false
  } catch (error) {
    console.error(error)
  }
}

const checkLogin = (header, content) => {
  if (statusLogin.value === null) callNotification(false, header, content)
  else return
}

// Notification
const showNotification  = ref(false)
const notification = ref({
  notiType: "",
  textHeader: "",
  textContent: ""
})

const callNotification = (notiType, textHeader, textContent) => {
  notification.value.notiType = notiType
  notification.value.textHeader = textHeader
  notification.value.textContent = textContent
  
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    // clear notification
    notification.value = {
      nontiType: "",
      textHeader: "",
      textContent: ""
    }
  }, 5000)
}
</script>

<template>
  <div v-if="selectConcert">
    <img
      src="/icons/back.png"
      @click="$router.push('/')"
      class="cursor-pointer absolute w-8 lg:w-10 mt-6 ml-6 lg:ml-8"
    />
    <!-- Section Poster + Info -->
    <div class="bg-[#333333] text-white px-4 sm:px-8 md:px-12 lg:px-20 py-10">
      <div class="flex flex-col lg:flex-row items-start gap-8">
        <div class="w-full lg:w-1/3 flex justify-center">
          <img
            :src="`/concert/${selectConcert.genre}Poster.png`"
            class="w-full md:w-2/3 lg:w-full px-16"
          />
        </div>

        <div
          class="w-full lg:w-2/3 p-2 flex flex-col justify-center text-center lg:text-left"
        >
          <h2
            class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold border-b-2 pb-2 text-center"
          >
            {{ selectConcert.name }}
          </h2>

          <div class="mt-8 space-y-4 text-sm md:text-lg lg:text-base flex flex-row justify-center space-x-8 md:space-x-16 lg:flex-col">
            <div class="flex flex-col space-y-4">
              <div class="flex items-center space-x-2">
                <img
                  src="/icons/calendar.png"
                  alt="Calendar Icon"
                  class="w-5 h-5"
                />
                <span>{{ selectConcert.date }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <img src="/icons/time.png" alt="Clock Icon" class="w-5 h-5" />
                <span>{{ selectConcert.time }}</span>
              </div>
            </div>
            <div class="flex flex-col space-y-4">
              <div class="flex items-center space-x-2">
                <img
                  src="/icons/map-pin.png"
                  alt="Map Pin Icon"
                  class="w-5 h-5"
                />
                <span>{{ selectConcert.location }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <img src="/icons/coin.png" alt="Bitcoin Icon" class="w-5 h-5" />
                <span>{{ selectConcert.price }}</span>
              </div>
            </div>
          </div>

           <!-- Follow Button -->
      <button
        class="mt-6 lg:mt-10 px-5 py-2 border border-white rounded-3xl flex items-center space-x-2 w-fit mx-auto lg:mx-0"
        @click="toggleFollow"
      >
        <img
          :src="isFollowed ? '/icons/following.png' : '/icons/follow.png'"
          class="w-5 h-5"
        />
        <span>{{ isFollowed ? 'Following' : 'Follow' }}</span>
      </button>
        </div>
      </div>
    </div>

    <EventPopup
      v-if="showUnfollowConfirm"
      @accept="concertUnfollow"
      @close="showUnfollowConfirm = false"
      :message="modalMessage"
    />

    <!-- tab -->
    <div
      class="flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center py-4 px-12 border-gray-200 border-b-2 gap-4"
    >
      <div class="flex justify-center space-x-8 text-sm md:text-base">
        <p
          class="font-semibold cursor-pointer"
          :class="
            selectedTab === 'details'
              ? 'border-b-3 pb-2 text-black transition-all duration-200'
              : 'text-gray-500'
          "
          @click="selectedTab = 'details'"
        >
          Details
        </p>
        <p
          class="font-semibold cursor-pointer"
          :class="
            selectedTab === 'howToBuy'
              ? 'border-b-3 pb-2 text-black transition-all duration-200'
              : 'text-gray-500'
          "
          @click="selectedTab = 'howToBuy'"
        >
          How to Buy Tickets
        </p>
      </div>

      <!-- price & get ticket -->
      <div class="w-full md:w-fit flex justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
        <span class="text-base md:text-base lg:text-lg font-bold self-center">
          Available: {{ selectConcert.available }}
        </span>
        <span class="text-base lg:text-lg font-bold self-center">
          Price: {{ selectConcert.price }}
        </span>
        <a :href="statusLogin ? '#bookingTicket' : '#'">
          <button
            class="bg-[#03abef] text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#5fd1ff] text-sm md:text-base"
            @click="checkLogin('Please log in to book tickets', 'You must log in to book tickets')"
            v-if="selectConcert.available > 0"
          >
            GET TICKET
          </button>
          <button
            class="bg-gray-400 text-white font-semibold py-2 px-4 rounded-full cursor-not-allowed opacity-70"
            disabled
            v-else
          >
            SOLD OUT
          </button>
        </a>
      </div>
    </div>

    <div>
      <!-- detail of concert -->
      <div v-if="selectConcert && selectedTab === 'details'" class="py-8 px-12">
        <div class="text-center flex flex-col">
          <h3
            class="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl py-4"
          >
            {{ selectConcert.name }}
          </h3>
          <div>
            <img
              :src="`/concert/${selectConcert.genre}Poster.png`"
              class="hidden sm:hidden md:hidden lg:block lg:w-1/4 mx-auto"
            />
          </div>
          <p v-html="formattedDescription" class="text-sm md:text-base lg:text-base pt-2 px-8 lg:px-56 md:pt-8 lg:pt-10"></p>
        </div>

        <!-- booking ticket -->
        <div v-show="showBookingTicket" class="sm:px-12 pb-10" id="bookingTicket">
          <p class="font-bold text-lg text-gray-800 pt-18">
            Ticket Information
          </p>
          <!-- ticket info -->
          <div
            class="bg-[#f4f6fa] px-8 sm:px-10 pt-6 pb-8 space-y-4 rounded-xl mt-4 shadow-lg"
          >
            <p class="py-2 border-b-2 border-gray-200 text-gray-700 text-[14px] sm:text-[16px]">
              <span class="font-semibold">Name </span>{{ selectConcert.name }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700 text-[14px] sm:text-[16px]">
              <span class="font-semibold">Date </span>{{ selectConcert.date }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700 text-[14px] sm:text-[16px]">
              <span class="font-semibold">Time </span>{{ selectConcert.time }}
            </p>
            <div
              class="flex items-center py-2 border-b-2 border-gray-200 text-gray-700"
            >
              <span class="font-semibold mr-4 text-[14px] sm:text-[16px]">Quantity </span>
              <div class="space-x-4">
                <button
                  class=" py-[2px] sm:py-1 px-2 sm:px-3 border-1 rounded-lg bg-[#e1e6f0] hover:bg-[#c4c9e6]"
                  @click="decreaseQuantity"
                >
                  -
                </button>
                <span class="text-[14px] sm:text-[18px]">{{ quantity }}</span>
                <button
                  class="py-[2px] sm:py-1 px-2 sm:px-3 border-1 rounded-lg bg-[#e1e6f0] hover:bg-[#c4c9e6]"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
            </div>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700 text-[14px] sm:text-[16px]">
              <span class="font-semibold">Unit Price (Baht) </span
              >{{ selectConcert.price }}
            </p>
            <p class="py-2 border-b-2 border-gray-200 text-gray-700 text-[14px] sm:text-[16px]">
              <span class="font-semibold">Total Price (Baht) </span
              >{{ selectConcert.price * quantity }}
            </p>
          </div>

          <!-- checkbox -->
          <div class="ml-4 mt-8 flex items-start space-x-4">
            <input
              v-model="agree"
              type="checkbox"
              class="w-5 h-5 border-2 border-gray-300 rounded-md bg-gray-100 checked:bg-[#03abef]"
            />

            <div class="space-x-4 lg:flex">
              <p class="text-gray-700 text-sm md:text-base"
                >Please click to accept
                <span class="text-[#03abef] cursor-pointer"
                  >“Terms and Conditions”</span
                ></p
              ><p class="text-[#ff3131]" v-if="agreeText && !agree"
                >* You must accept the terms and conditions to continue</p
              >
            </div>
          </div>

          <!-- button -->
          <div class="flex flex-row justify-center space-x-6 mt-8 text-sm md:text-base">
            <button
              class="bg-[#909cb3] text-white font-semibold py-2 w-28 rounded-full cursor-pointer hover:bg-[#bbc3d4] transition ease-in-out duration-200"
              @click="$router.go(-1)"
            >
              BACK
            </button>
            <button
              @click="toggleBooking"
              class="bg-[#03abef] text-white font-semibold py-2 w-28 rounded-full cursor-pointer hover:bg-[#5fd1ff] transition ease-in-out duration-200"
            >
              BOOKING
            </button>
          </div>
        </div>
        <EventPopup
          v-if="showModal"
          @accept="concertBooking(ticket)"
          @close="confirmCancel"
          :message="modalMessage"
        >
          <template #content>
            <div class="grid grid-cols-2 gap-y-4">
              <div class="col-span-2">{{ selectConcert.name }}</div>

              <div class="text-start font-medium border-b border-gray-300">Price</div>
              <div class="text-end border-b border-gray-300">{{ selectConcert.price }}</div>

              <div class="text-start font-medium border-b border-gray-300">Quantity</div>
              <div class="text-end border-b border-gray-300">{{ quantity }}</div>

              <div class="text-start font-medium border-b border-gray-300">Total</div>
              <div class="text-end border-b border-gray-300">{{ quantity * selectConcert.price }}</div>
            </div>
          </template>
        </EventPopup>
        <EventPopup
          v-if="showCancelConfirm"
          @accept="clearBooking"
          @close="toggleBooking"
          :message="modalMessage"
        />
        <EventPopup
          v-if="showSuccess"
          :type="'success'"
          @accept="clearBooking"
          :message="modalMessage"
        >
          <template #icon>
            <img src="/icons/success.png" alt="" width="100">
          </template>
        </EventPopup>

        <NotificationModel v-if="showNotification" :noti-type="notification.notiType">
          <template #header>
            {{ notification.textHeader }}
          </template>
          <template #content>
            {{ notification.textContent }}
          </template>
        </NotificationModel>
      </div>

      <!-- how to buy -->
      <div
        v-if="selectConcert && selectedTab === 'howToBuy'"
        class="py-8 px-12"
      >
        <h2 class="text-base md:text-xl lg:text-xl font-semibold mb-6">How to Buy Tickets</h2>

        <div class="space-y-6">
          <div class="bg-gray-100 p-4 rounded-lg shadow text-sm lg:text-lg">
            <h3 class="font-semibold">
              Step 1: Select the Concert
            </h3>
            <p>Choose the concert you would like to attend.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow text-sm lg:text-lg">
            <h3 class="font-semibold">
              Step 2: Select the Number of Tickets
            </h3>
            <p>
              Choose the number of tickets you would like to purchase (max 4 per
              account).
            </p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow text-sm lg:text-lg">
            <h3 class="font-semibold">
              Step 3: Accept the Terms
            </h3>
            <p>Read and agree to the Terms and Conditions before proceeding.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow text-sm lg:text-lg">
            <h3 class="font-semibold">
              Step 4: Click "Booking"
            </h3>
            <p>Click the "Booking" button to proceed to payment.</p>
          </div>

          <div class="bg-gray-100 p-4 rounded-lg shadow text-sm lg:text-lg">
            <h3 class="font-semibold">
              Step 5: Confirm Payment
            </h3>
            <p>
              Review your order and confirm payment to complete your purchase.
            </p>
          </div>
        </div>

        <p class="text-red-600 italic mt-6 text-sm lg:text-base">
          * Please ensure all details are correct before confirming your
          payment!
        </p>
      </div>
    </div>
  </div>
  
</template>

<style scoped></style>