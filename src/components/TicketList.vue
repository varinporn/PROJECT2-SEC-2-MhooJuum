<script setup>
import ListModel from './ListModel.vue';
import TicketPopup from './TicketPopup.vue';
import { ref } from 'vue';
const props = defineProps({
    ticket:{
        type: Array,
        require: true
    }
})

const isPopupOpen = ref(false);
const selectedTicket = ref(null);

const openPopup = (ticket) => {
    selectedTicket.value = ticket;
    isPopupOpen.value = true;
};

const closePopup = () => {
    isPopupOpen.value = false;
};

</script>

<template>
  <ListModel :items="ticket" :itemWidth="400" class=" px-6 sm:px-6 md:px-8 lg:px-20 py-8" >
    <template #yourItem="listTicket">
        <button class=" group relative flex rounded-3xl bg-white hover:shadow-lg cursor-pointer" @click="openPopup(listTicket.itemInList)">
          <div class=" w-1/2" >
            <img src="/concert/kpopPoster.png" />
          </div>
          <div class=" w-1/2 px-3 py-5 space-y-2 text-start">
            <p class=" font-bold">#{{ listTicket.itemInList.id }}</p>
            <p class=" font-medium">{{ listTicket.itemInList.concert.name }}</p>
            <div class=" flex space-x-2">
              <img src="/icons/location.png" alt="" class=" w-4 h-4 mt-[2px]">
              <span class=" text-gray-400 text-sm">{{ listTicket.itemInList.concert.location }}</span>
            </div>
            <div class=" flex space-x-2">
              <img src="/icons/calendar-gray.png" alt="" class=" w-4 h-4 ">
              <span class=" text-gray-400 text-sm">{{ listTicket.itemInList.concert.date }}</span>
            </div>
            <div class="absolute bottom-0 right-0 bg-gray-500 text-white text-xs px-[4.18rem] py-2 rounded-br-lg 
              opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible 
              group-hover:translate-y-0 transition-all duration-500">
              View Ticket
            </div>
          </div>
        </button>
    </template>
  </ListModel>

  <TicketPopup v-if="isPopupOpen" @close="closePopup" :ticketPop="selectedTicket" >
  </TicketPopup>
</template>

<style scoped></style>
