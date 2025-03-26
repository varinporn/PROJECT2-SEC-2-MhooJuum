<script setup>
  import TicketList from "./TicketList.vue";
  import Login from "./Login.vue";
  import EditProfile from "./EditProfile.vue";
  import { CookieUtil } from "@/libs/cookieUtil";
  import { onMounted, ref, computed} from "vue";
  import { getItems, getItemById, getItemByKey, addItem, deleteItemById, editItem } from "@/libs/fetchUtils";
  import { useRouter } from "vue-router";
import EventPopup from "./EventPopup.vue";
import Header from "./Header.vue";
  

  const statusLogin = ref(CookieUtil.get('juumId'))
  const showLogin = ref(true)
  const router = useRouter() 
  const showEditProfile = ref(false)

const tab = ref('upcoming')

const tickets = ref([])
const mergeData = ref([])
const bookmarkTickets = ref([])
const mergeDataBookmark = ref([])

onMounted(async () => {
  try {
    dataAccount.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)


    tickets.value = await Promise.all(
      dataAccount.value.tickets.map(async (ticketId) => {
      return await getItemById(`${import.meta.env.VITE_APP_URL}/tickets`, ticketId);
    }));

    bookmarkTickets.value = await Promise.all(
      dataAccount.value.bookmarks.map(async (bookId) => {
      return await getItemById(`${import.meta.env.VITE_APP_URL}/tickets`, bookId);
    }));
    

    mergeData.value = await Promise.all(
      tickets.value.map(async (ticket) => {
        const concert = await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`, ticket.concertId);
        return { ...ticket, concert }
      })
    )

    mergeDataBookmark.value = await Promise.all(
      bookmarkTickets.value.map(async (ticketBook) => {
        const concert = await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`, ticketBook.concertId);
        return { ...ticketBook, concert }
      })
    )
    
  } catch (error) {
    clearDataAccount()
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
    showLogin.value = false
  }

  const accept = ref(false)
  const showModal = ref(false)
  const confirmAction = ref(null)
  const modalMessages = ({
    header: 'ldaksf',
    content: 'afs',
    accept: '',
    deny: '',
  })
  const toggleModal = (action = null) => {
    showModal.value = !showModal.value
    accept.value = false
    if (action === logout) {
      modalMessages.header = 'Are you sure you want to log out?'
      modalMessages.content = 'You will need to log in again to access your account.'
      modalMessages.accept = 'LOG OUT'
      modalMessages.deny = 'CANCEL'
    } else if (action === deleteAccount) {
      modalMessages.header = 'Are you sure you want to delete your accout?'
      modalMessages.content = 'This action is permanent and cannot be undone. You will lose all your data.'
      modalMessages.accept = 'DELETE ACCOUNT'
      modalMessages.deny = 'KEEP ACCOUNT'
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
    clearDataAccount()
    CookieUtil.unset('juumId')
    statusLogin.value = CookieUtil.get('juumId')
    router.push({name: 'Home'})
  }

  // Function delete account
  const deleteAccount = async () => {
    try {
      const statusCode = await deleteItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)
      if (statusCode === 200) {
        logout()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Function edit profile
  const saveProfile = async (data) => {
    try {
      const saveAccount = await editItem(`${import.meta.env.VITE_APP_URL}/users`, data.id, data)
      dataAccount.value = saveAccount
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
    <div class="flex justify-between items-end px-[7rem] my-[2rem]">
      <div class="flex items-center gap-[5rem]">
        <div>
          <img src="/icons/profile.png" alt="profile" class="w-[14rem] rounded-full">
        </div>
        <div>
          <p class="text-8xl font-bold mb-[1rem]">{{ dataAccount.username }}</p>
          <p class="text-4xl font-light">{{ dataAccount.email }}</p>
        </div>
      </div>
      <div class="flex gap-[2rem] mb-[2rem]">
        <button @click="showEditProfile = true"
          class="bg-purple-600 rounded-xl text-white text-x font-bold p-[1rem] w-[9rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-purple-400">Edit profile</button>

        <button @click="toggleModal(logout)"
          class="bg-yellow-400 rounded-xl text-white text-x font-bold p-[1rem] w-[9rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-yellow-300">Logout</button>

        <button @click="toggleModal(deleteAccount)"
          class="bg-red-600 rounded-xl text-white text-x font-bold p-[1rem] w-[9rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-red-400">Delete profile</button>
      </div>
    </div>

    <EventPopup v-if="showModal" @close="toggleModal" @accept="confirm" :message="modalMessages">
    </EventPopup>

    <EditProfile v-if="dataAccount.id" v-show="showEditProfile"
            :dataAccount="dataAccount" 
            :statusLogin="true"
            @close-edit-profile="showEditProfile = false"
            @save-profile="saveProfile" />


    <div class="flex ml-20 gap-20 mb-5 font-bold">
      <button :class="tab === 'upcoming' ? 'border-b-2 pb-2' : ''" @click="tab = 'upcoming'">Upcoming</button>
      <button :class="tab === 'history' ? 'border-b-2 pb-2' : ''" @click="tab = 'history'">History</button>
      <button :class="tab === 'follow' ? 'border-b-2 pb-2' : ''" @click="tab = 'follow'">follow</button>
    </div>
    <div class="bg-gray-200">
      <TicketList v-show="tab === 'upcoming'" :ticket="upcomingTickets"></TicketList>
      <TicketList v-show="tab === 'history'" :ticket="historyTickets"></TicketList>
      <TicketList v-show="tab === 'follow'" :ticket="mergeDataBookmark"></TicketList>
    </div>
  </div>
</template>

<style scoped></style>
