<script setup>
import ListModel from './ListModel.vue';
import Login from './Login.vue';
const props = defineProps({
    ticket:{
        type: Array,
        require: true
    }
})
console.log(props.ticket);

</script>

<template>
  <ListModel :items="ticket" :itemWidth="400" class="mx-20 py-13" >
    <template #yourItem="listTicket">
        <div class=" group relative flex rounded-3xl bg-white hover:shadow-lg">
          <div class=" w-1/2" >
            <img src="/concert/kpopPoster.png" />
          </div>
          <div class=" w-1/2 p-3 space-y-2">
            <p class=" font-black">#{{ listTicket.itemInList.id }}</p>
            <p class=" font-medium">{{ listTicket.itemInList.concert.name }}</p>
            <div class=" flex space-x-1">
              <img src="/icons/location.png" alt="" class=" w-4 h-4 mt-[2px]">
              <span class=" text-gray-400 text-sm">{{ listTicket.itemInList.concert.location }}</span>
            </div>
            <div class=" flex space-x-1">
              <img src="/icons/calendar-gray.png" alt="" class=" w-4 h-4 mt-[2px]">
              <span class=" text-gray-400 text-sm">{{ listTicket.itemInList.concert.date }}</span>
            </div>
            <div class="absolute bottom-0 right-0 bg-gray-500 text-white text-xs px-[4.4rem] py-2 rounded-br-lg 
              opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible 
              group-hover:translate-y-0 transition-all duration-500">
              View Ticket
            </div>
          </div>
          
        </div>
    </template>
  </ListModel>
</template>

<style scoped></style>
