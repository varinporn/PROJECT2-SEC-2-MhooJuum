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
  <ListModel :items="ticket" class="mx-20 py-5">
    <template #yourItem="listTicket">
        <div class="">
          <div>
            <img src="../../concert/kpopPoster.png" />
          </div>
          <div class="">
            <p>Id : {{ listTicket.itemInList.id }}</p>
            <p>Name : {{ listTicket.itemInList.concert.name }}</p>
          </div>
        </div>
    </template>
  </ListModel>
</template>

<style scoped></style>
