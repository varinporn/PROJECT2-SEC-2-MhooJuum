<script setup>
import { getItems } from '@/libs/fetchUtils'
import { computed, onMounted, ref } from 'vue'
import ConcertList from './ConcertList.vue'

const concerts = ref([])
const today = new Date()

const allConcerts = computed(() => {
  return concerts.value.filter((concert) => new Date(concert.date) >= today)
})

const kpopConcerts = computed(() =>
  concerts.value.filter(
    (concert) => concert.genre === 'kpop' && new Date(concert.date) >= today
  )
)
const tpopConcerts = computed(() =>
  concerts.value.filter(
    (concert) => concert.genre === 'tpop' && new Date(concert.date) >= today
  )
)

onMounted(async () => {
  try {
    concerts.value = await getItems(`${import.meta.env.VITE_APP_URL}/concerts`)
  } catch (error) {
    console.error('Error fetching concerts:', error)
  }
})

defineProps({
  showAll: {
    type: Boolean,
    default: false,
  },
  isWrap: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="pt-2 pb-8">
    <template v-if="showAll">
      <ConcertList :concerts="allConcerts" :isWrap="isWrap">
        <template #header>
          <h1>All Concerts</h1>
        </template>
      </ConcertList>
    </template>

    <template v-else>
      <ConcertList :concerts="kpopConcerts" :isWrap="isWrap">
        <template #header>
          <h1>KPOP</h1>
        </template>
      </ConcertList>
      <ConcertList :concerts="tpopConcerts" :isWrap="isWrap">
        <template #header>
          <h1>TPOP</h1>
        </template>
      </ConcertList>
    </template>
  </div>
</template>

<style scoped></style>
