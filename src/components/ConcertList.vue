<script setup>
import ListModel from './ListModel.vue'

defineProps({
  concerts: {
    type: Array,
    required: true,
  },
  isWrap: {
    type: Boolean,
    default: false,
  }})
</script>

<template>
  <div class="px-20 py-4">
    <div class="text-3xl font-bold my-2">
      <slot name="header"></slot>
    </div>
    <ListModel :items="concerts" :isWrap="isWrap" item-width="w-[170px]" >
      <template #yourItem="{ itemInList }">
        <router-link
          :to="{
            name: 'ConcertDetail',
            params: { concertId: itemInList.id },
          }"
        >
          <div>
            <img :src="`/concert/${itemInList.genre}Poster.png`" />
            <p class="mt-2 font-semibold text-lg text-gray-800 line-clamp-2">
              {{ itemInList.name }}
            </p>
            <div class="flex space-x-2">
              <img src="/icons/location.png" class="w-4 h-full" />
              <p class="text-gray-500 text-md">
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
