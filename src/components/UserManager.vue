<script setup>
import { onMounted , ref } from 'vue';
import TicketList from './TicketList.vue';
import { getItems } from '../../libs/fetchUtils';
const tickets = ref([])
onMounted(async () => {
  tickets.value = await getItems(`${import.meta.env.VITE_APP_URL}/tickets`)
})

</script>

<template>
  <TicketList :ticket="tickets"></TicketList>
</template>

<style scoped></style>
