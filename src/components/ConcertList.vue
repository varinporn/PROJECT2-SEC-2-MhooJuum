<script setup>
import ListModel from './ListModel.vue'
import concerts from '../../data/concerts.json'
</script>

<template>
  <div>
    <ListModel :items="concerts">
      <slot name="header">

      </slot>
      <template #yourItem="slotProps">
        <img src="../../concert/image.png" />
        <p class="font-semibold text-xl">
          {{ slotProps.itemInList.name }}
        </p>
        <p class="text-gray-400">{{ slotProps.itemInList.location }}</p>
      </template>
    </ListModel>
  </div>
</template>

<style scoped></style>
