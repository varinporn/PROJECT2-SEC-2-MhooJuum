<script setup>
import TicketList from "./TicketList.vue";
import EditProfile from "./EditProfile.vue";
import ConcertList from "./ConcertList.vue";
import { onMounted, ref, computed} from "vue";
import { getItemById, getItemByKey, deleteItemById, editItem } from "@/libs/fetchUtils";
import { useRouter } from "vue-router";
import EventPopup from "./EventPopup.vue";
import { useAuth } from '@/store/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuth()

const { clearStatusLogin } = authStore;
const {statusLogin} = storeToRefs(authStore)

const emit = defineEmits(['notification'])
  

const router = useRouter() 
const showEditProfile = ref(false)

const tab = ref('upcoming')

const tickets = ref([])
const mergeData = ref([])
const bookmarkConcerts = ref([])

onMounted(async () => {
  try {
    dataAccount.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)

    tickets.value = await Promise.all(
      dataAccount.value.tickets.map(async (ticketId) => {
      return await getItemById(`${import.meta.env.VITE_APP_URL}/tickets`, ticketId);
    }));

    bookmarkConcerts.value = await Promise.all(
      dataAccount.value.bookmarks.map(async (bookId) => {
      return await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`, bookId);
    }));
    

    mergeData.value = await Promise.all(
      tickets.value.map(async (ticket) => {
        const concert = await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`, ticket.concertId);
        return { ...ticket, concert }
      })
    )
    
  } catch (error) {
    console.log(error)
  }

})

const today = new Date()

const upcomingTickets = computed(() => {
  return mergeData.value.filter(ticket => new Date(ticket.concert.date) >= today);
});

const historyTickets = computed(() => {
  return mergeData.value.filter(ticket => new Date(ticket.concert.date) < today);
});

  // Data user
  const dataAccount = ref({
    username: "",
    email: "",
    DOB: "",
    password: "",
    tickets: [],
    bookmarks: [],
  })
  const clearDataAccount = () => {
    dataAccount.value = {
      username: "",
      email: "",
      DOB: "",
      password: "",
      tickets: [],
      bookmarks: [],
    }
  }

  const accept = ref(false)
  const showModal = ref(false)
  const confirmAction = ref(null)
  const modalMessage = {
    header: '',
    content: '',
    accept: '',
    deny: '',
  }
  const toggleModal = (action = null) => {
    showModal.value = !showModal.value
    accept.value = false
    if (action === logout) {
      modalMessage.header = 'Are you sure you want to log out?'
      modalMessage.content = 'You will need to log in again to access your account.'
      modalMessage.accept = 'LOG OUT'
      modalMessage.deny = 'CANCEL'
    } else if (action === deleteAccount) {
      modalMessage.header = 'Are you sure you want to delete your account?'
      modalMessage.content = 'This action is permanent and cannot be undone. You will lose all your data.'
      modalMessage.accept = 'DELETE ACCOUNT'
      modalMessage.deny = 'KEEP ACCOUNT'
    }
    confirmAction.value = action
  }
  const confirm = () => {
    accept.value = true
    if (confirmAction.value) confirmAction.value()
    showModal.value = false
  } 
  // Function logout
  const logout = () => {
    if (!accept.value) return
    emit('notification', true, 'Logout successful', `Bye "${dataAccount.value.username}", See you next time`)
  
    clearDataAccount()
    clearStatusLogin()
    
    router.push({ name: 'Home' })
  }
  // Function delete account
  const deleteAccount = async () => {
    try {
      const statusCode = await deleteItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)
      if (statusCode === 200) {
        logout()
        emit('notification', true, 'Account deleted successfully.', `Bye \"${dataAccount.username}\", you can always come back anytime`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Function edit profile
  const saveProfile = async (data) => {
    try {
      // Check username already registered
      if (data.username !== dataAccount.value.username) {
        const checkUsername = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)
        if (checkUsername.length !== 0) {
          emit('notification', false, 'Unable to edit profile', `This username \"${data.username}\" is already registered.`)
          return
        }
      }
      

      const saveAccount = await editItem(`${import.meta.env.VITE_APP_URL}/users`, data.id, data) 
      
      let message = null
      if (dataAccount.value.username !== saveAccount.username && dataAccount.value.password !== saveAccount.password) {
        message = `Hey \"${saveAccount.username}\", that is a good name. Don\'t forget to remember your new password.`
      } else if (dataAccount.value.password !== saveAccount.password) {
        message = `Hey \"${saveAccount.username}\", don\'t forget to remember your new password.`
      } else {
        message = `Hey \"${saveAccount.username}\", that is a good name.`
      }

      dataAccount.value = saveAccount
      emit('notification', true, 'Profile updated successfully', message)
    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <div v-if="statusLogin === null">
  </div>
  <div v-else>
    <!-- Profile -->
    <div class="flex flex-col md:flex-row md:justify-between items-center md:items-end md:mx-[3rem] xl:mx-[7rem] my-[2rem]">
      <div class="flex items-center justify-center mb-4 md:mb-0 md:justify-normal flex-col md:flex-row gap-2 md:gap-4 lg:gap-8 xl:gap-[5rem]">
        <div class=" w-3/12">
          <img src="/icons/profile.png" alt="profile" class=" rounded-full">
        </div>
        <div>
          <p class="text-xl md:text-2xl text-center md:text-start lg:text-4xl font-bold md:mb-[5px]">{{ dataAccount.username }}</p>
          <p class="text-[16px] md:text-xl lg:text-xl font-light">{{ dataAccount.email }}</p>
        </div>
      </div>
      <div class="flex gap-4 md:gap-4 lg:gap-[2rem]">
        <button @click="showEditProfile = true"
          class="bg-purple-600 rounded-[8px] md:rounded-xl text-white font-bold p-[0.5rem] lg:p-[0.7rem] xl:p-[1rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-purple-400 text-nowrap text-[12px] lg:text-[14px] xl:text-[16px]">Edit profile</button>

        <button @click="toggleModal(logout)"
          class="bg-yellow-400 rounded-[8px] md:rounded-xl text-white font-bold p-[0.5rem] lg:p-[0.7rem] xl:p-[1rem]  cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-yellow-300 text-nowrap text-[12px] lg:text-[14px] xl:text-[16px]">Logout</button>

        <button @click="toggleModal(deleteAccount)"
          class="bg-red-600 rounded-[8px] md:rounded-xl text-white font-bold p-[0.5rem] lg:p-[0.7rem] xl:p-[1rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-red-400 text-nowrap text-[12px] lg:text-[14px] xl:text-[16px]">Delete profile</button>
      </div>
    </div>

    <EventPopup v-if="showModal" @close="toggleModal" @accept="confirm" :message="modalMessage">
    </EventPopup>

    <EditProfile v-if="dataAccount.id && showEditProfile" 
            :dataAccount="dataAccount" 
            :statusLogin="true"
            @close-edit-profile="showEditProfile = false"
            @save-profile="saveProfile" />


    <div class="flex max-md:justify-center md:ml-8 gap-15 lg:ml-20 lg:gap-20 mb-5 font-bold">
      <button class=" cursor-pointer" :class="tab === 'upcoming' ? 'border-b-1 md:border-b-3 pb-2 text-black transition-all duration-200' : 'text-gray-500'" @click="tab = 'upcoming'">Upcoming</button>
      <button class=" cursor-pointer" :class="tab === 'history' ? 'border-b-1 md:border-b-3 pb-2 text-black transition-all duration-200' : 'text-gray-500'" @click="tab = 'history'">History</button>
      <button class=" cursor-pointer" :class="tab === 'follow' ? 'border-b-1 md:border-b-3 pb-2 text-black transition-all duration-200' : 'text-gray-500'" @click="tab = 'follow'">Follow</button>
    </div>
    <div class="bg-gray-200 min-h-[400px] max-h-[500px] py-8">
      <TicketList v-if="tab === 'upcoming'" :ticket="upcomingTickets"></TicketList>
      <TicketList v-if="tab === 'history'" :ticket="historyTickets"></TicketList>
      <ConcertList v-if="tab === 'follow'" :concerts="bookmarkConcerts"></ConcertList>
    </div>
  </div>
</template>

<style scoped></style>
