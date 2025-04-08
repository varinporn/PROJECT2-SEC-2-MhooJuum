<script setup>
import TicketList from './components/TicketList.vue'
import UserManager from './components/UserManager.vue'
import Header from './components/Header.vue'
import PopupModel from './components/PopupModel.vue'
import Login from './components/Login.vue'
import NotificationModel from './components/NotificationModel.vue'
import { ref } from 'vue'

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}

// Notification
const showNotification  = ref(false)
const notification = ref({
  notiType: "",
  textHeader: "",
  textContent: ""
})

const callNotification = (notiType, textHeader, textContent) => {
  notification.value.notiType = notiType
  notification.value.textHeader = textHeader
  notification.value.textContent = textContent
  
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    // clear notification
    notification.value = {
      nontiType: "",
      textHeader: "",
      textContent: ""
    }
  }, 8000)
}
</script>

<template>
  <div class="font-poppins">
    <div>
      <Header @forward-noti="callNotification" />
    </div>
    <div>
      <router-view />
    </div>

    <!-- Notification -->
    <NotificationModel v-if="showNotification" :noti-type="notification.notiType">
      <template #header>
        {{ notification.textHeader }}
      </template>
      <template #content>
        {{ notification.textContent }}
      </template>
    </NotificationModel>

    <!-- <button @click="toggleModal">hey</button>
    <PopupModel v-if="showModal" @close="toggleModal">
      <template #header> Your Ticket </template>
      <template #content> fdsfa </template>
    </PopupModel> -->
  </div>
</template>

<style scoped></style>
