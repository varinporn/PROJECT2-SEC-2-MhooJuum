<script setup>
import ListModel from './ListModel.vue'

defineProps({
  concerts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="px-18">
    <div class="text-3xl font-bold my-2">
      <slot name="header"></slot>
    </div>
    <ListModel :items="concerts">
      <template #yourItem="{ itemInList }">
        <router-link
          :to="{
            name: 'ConcertDetail',
            params: { concertId: itemInList.id },
          }"
        >
          <div>
            <img :src="`../../concert/${itemInList.genre}Poster.png`" />
            <p class="mt-2 font-semibold text-lg">
              {{ itemInList.name }}
            </p>
            <div class="flex space-x-2">
              <img src="../../icons/location.png" class="w-4 h-full" />
              <p class="text-gray-400 text-md">
                {{ itemInList.location }}
              </p>
            </div>
          </div>
        </router-link>
      </template>
    </ListModel>
  </div>
</template>

<style scoped></style>
