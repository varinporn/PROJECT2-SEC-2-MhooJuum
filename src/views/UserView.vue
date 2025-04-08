<script setup>
import Footer from '@/components/Footer.vue';
import UserManager from '@/components/UserManager.vue';
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
<div>
    <UserManager @notification="callNotification"></UserManager>
    <Footer></Footer>
</div>
</template>
 
<style scoped>

</style>