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
  <ListModel :items="ticket">
    <template #yourItem="listTicket">
        <p>ID : {{ listTicket.itemInList.id }}</p>
        <p>Name : {{ listTicket.itemInList }}</p>
    </template>
  </ListModel>
</template>

<style scoped></style>
