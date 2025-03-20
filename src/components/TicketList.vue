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
            <img src="../../concert/image.png" />
          </div>
          <div class="">
            <p>Id : {{ listTicket.itemInList.id }}</p>
            <p>concertName : {{ listTicket.itemInList.concert[0].name }}</p>
          </div>
        </div>
    </template>
  </ListModel>
</template>

<style scoped></style>
