<script setup>
import { onMounted , ref } from 'vue';
import TicketList from './TicketList.vue';
import { getItemById, getItems } from '../../libs/fetchUtils';
const tickets = ref([])
const concerts = ref([])
const concert = ref({})
const all = ref([])
onMounted(async () => {
  tickets.value = await getItems(`${import.meta.env.VITE_APP_URL}/tickets`)
  tickets.value.forEach(async ticket => {
    concert.value = await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`,ticket.concertId)
    concerts.value.push(concert.value)
  })
})



</script>

<template>
  <div class=" bg-gray-200">
    <TicketList :ticket="concerts"></TicketList>
  </div>
</template>

<style scoped></style>
