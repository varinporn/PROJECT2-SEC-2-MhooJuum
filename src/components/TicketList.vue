<script setup>
import ListModel from './ListModel.vue';
defineProps({
    ticket:{
        type: Array,
        require: true
    }
})
</script>

<template>
  <ListModel :items="ticket" class="mx-20 py-5">
    <template #yourItem="listTicket">
        <div class="">
          <div class=" bg-red-500 w-full h-[250px] rounded-2xl">
          </div>
          <div class=" text-center">
            <p>Id : {{ listTicket.itemInList.id }}</p>
            <p>concertName : {{ listTicket.itemInList.concertName }}</p>
          </div>
        </div>
    </template>
  </ListModel>
</template>

<style scoped></style>
