<script setup>
import Footer from '@/components/Footer.vue';
import UserManager from '@/components/UserManager.vue';
import Header from '@/components/Header.vue';
import NotificationModel from '@/components/NotificationModel.vue';
import { ref } from 'vue';

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
    <UserManager @notification="callNotification"></UserManager>
    <Footer></Footer>
    <!-- Notification -->
    <NotificationModel v-if="showNotification" :noti-type="notification.notiType">
      <template #header>
        {{ notification.textHeader }}
      </template>
      <template #content>
        {{ notification.textContent }}
      </template>
    </NotificationModel>
</template>
 
<style scoped>

</style>