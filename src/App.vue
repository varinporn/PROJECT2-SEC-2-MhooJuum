<script setup>
import TicketList from './components/TicketList.vue'
import UserManager from './components/UserManager.vue'
import Header from './components/Header.vue'
import ConcertDetail from './components/ConcertDetail.vue'
import PopupModel from './components/PopupModel.vue'
import Login from './components/Login.vue'
import { ref } from 'vue'
import ConcertView from './views/ConcertView.vue'

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div>
    <div>
      <!-- <ConcertView /> -->
      <!-- <UserManager /> -->
    </div>
    <div>
      <router-view />
    </div>

    <!-- <button @click="toggleModal">hey</button>
    <PopupModel v-if="showModal" @close="toggleModal">
      <template #header> Your Ticket </template>
      <template #content> fdsfa </template>
    </PopupModel> -->
  </div>
</template>

<style scoped></style>
