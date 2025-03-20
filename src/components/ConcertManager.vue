<script setup>
import { getItems } from "@/libs/fetchUtils"
import { computed, onMounted, ref } from 'vue'
import ConcertList from './ConcertList.vue'

const concerts = ref([])
const kpopConcerts = computed(() => concerts.value.filter(concert => concert.genre === 'kpop'))
const tpopConcerts = computed(() => concerts.value.filter(concert => concert.genre === 'tpop'))

onMounted(async () => {
  try {
    console.log(`${import.meta.env.VITE_APP_URL}/concerts`)
    concerts.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/concerts`
    )
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    <ConcertList :concerts="concerts">
        <template #header>
            <h1>All Concerts</h1>
        </template>
    </ConcertList>
    <ConcertList :concerts="kpopConcerts">
        <template #header>
            <h1>KPOP</h1>
        </template>
    </ConcertList>
    <ConcertList :concerts="tpopConcerts">
        <template #header>
            <h1>TPOP</h1>
        </template>
    </ConcertList>
  </div>
</template>

<style scoped></style>
