<script setup>
import Header from './components/Header.vue'
import NotificationModel from './components/NotificationModel.vue'
import Footer from './components/Footer.vue'
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
  }, 5000)
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
    <div>
      <Footer />
    </div>
  </div>
</template>

<style scoped></style>
