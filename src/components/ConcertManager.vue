<script setup>
import { getItems } from '../../libs/fetchUtils'
import { onMounted, ref } from 'vue'
import ConcertList from './ConcertList.vue'

const concerts = ref([])


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
    <ConcertList :concerts="concerts">
        <template #header>
            <h1>KPOP</h1>
        </template>
    </ConcertList>
    <ConcertList :concerts="concerts">
        <template #header>
            <h1>TPOP</h1>
        </template>
    </ConcertList>
  </div>
</template>

<style scoped></style>
