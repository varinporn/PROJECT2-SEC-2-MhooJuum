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
        <p class="mt-2 font-semibold text-lg">
          {{ slotProps.itemInList.name }}
        </p>
        <div class="flex space-x-2">
          <img src="../../icons/location.png" class="w-4 h-full">
          <p class="text-gray-400 text-md"> 
            {{ slotProps.itemInList.location }}</p>
        </div>
      </template>
    </ListModel>
  </div>
</template>

<style scoped></style>
