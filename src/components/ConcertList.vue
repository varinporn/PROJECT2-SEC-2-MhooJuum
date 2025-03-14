<script setup>
import ListModel from './ListModel.vue'

defineProps({
  concerts: {
    type: Array,
    require: true,
  },

})
</script>

<template>
  <div class="px-8">
    <div class="text-3xl font-bold my-2">
        <slot name="header"></slot>
    </div>
    <ListModel :items="concerts">
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
