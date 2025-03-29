<script setup>
import { getItems } from '@/libs/fetchUtils'
import { computed, onMounted, ref } from 'vue'
import ConcertList from './ConcertList.vue'

const concerts = ref([])
const kpopConcerts = computed(() =>
  concerts.value.filter((concert) => concert.genre === 'kpop')
)
const tpopConcerts = computed(() =>
  concerts.value.filter((concert) => concert.genre === 'tpop')
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
  <div class="pt-4">
    <template v-if="showAll">
      <ConcertList :concerts="concerts" :isWrap="isWrap">
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
