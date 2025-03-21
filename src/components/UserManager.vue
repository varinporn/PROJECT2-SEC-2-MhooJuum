<script setup>
  import TicketList from "./TicketList.vue";
  import Login from "./Login.vue";
  import EditProfile from "./EditProfile.vue";
  import { CookieUtil } from "@/libs/cookieUtil";
  import { onMounted, ref, computed} from "vue";
  import { getItems, getItemById, getItemByKey, addItem, deleteItemById, editItem } from "@/libs/fetchUtils";
  import { useRouter } from "vue-router";
  

  const statusLogin = ref(CookieUtil.get('juumId'))
  const showLogin = ref(true)
  const router = useRouter() 
  const showEditProfile = ref(false)

const tab = ref('upcoming')

const tickets = ref([])
const mergeData = ref([])

onMounted(async () => {
  try {
    dataAccount.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)

    
    tickets.value = await getItems(`${import.meta.env.VITE_APP_URL}/tickets`)

    mergeData.value = await Promise.all(
      tickets.value.map(async (ticket) => {
        const concert = await getItemById(`${import.meta.env.VITE_APP_URL}/concerts`, ticket.concertId);
        return { ...ticket, concert }
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

  // // Function sign up
  // const addAccout = async (data) => {
  //   // Check null data
  //   if (!data.username || !data.email || !data.DOB || !data.password) {
  //     alert("Fill all information.")
  //     return
  //   }
  //   try {
  //     const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
      
  //     // Check email already registered
  //     if (checkEmail.length === 0) {
  //       const addAccout = await addItem(`${import.meta.env.VITE_APP_URL}/users`,data)
  //     } else {
  //       alert(`This email \"${data.email}\" is already registered.`)
  //       return
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Function Login
  // const login = async (data) => {
  //   // Check null data
  //   if (!data.username || !data.password) {
  //     alert("Fill all information.")
  //     return
  //   }
  //   try {
  //     // Check username real
  //     const dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)

  //     if (dataSelect.length === 0) {
  //       alert("User not found.")
  //       return
  //     }

  //     // Check password match
  //     const matchedUser = dataSelect.find(
  //       (user) => user.password === data.password
  //     )
  //     if (!matchedUser) {
  //       alert("Incorrect password.")
  //       return
  //     }

  //     CookieUtil.set("juumId", matchedUser.id)
  //     statusLogin.value = CookieUtil.get('juumId')

  //     dataAccout.value = matchedUser
  //     showLogin.value = false;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // Function logout
  const logout = () => {
    clearDataAccount()
    CookieUtil.unset('juumId')
    statusLogin.value = CookieUtil.get('juumId')
    router.push({name: 'Home'})
  }

  // Function delete accout
  const deleteAccout = async () => {
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
    // Check null data
    if (!data.username || !data.password) {
      alert("Fill all information.")
      return
    }
    try {
      const saveAccout = await editItem(`${import.meta.env.VITE_APP_URL}/users`, data.id, data)
      dataAccount.value = saveAccout
    } catch (error) {
      console.log(error);
    }
  }

  // Function reset password
  // const savePassword = async (data) => {
  //   console.log(data);
  //   // Check null data
  //   if (!data.email || !data.password) {
  //     alert("Fill all information.")
  //     return
  //   }
  //   try {
  //     const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
      
  //     // Check email is registered
  //     if (checkEmail.length !== 0) {
  //       const saveAccout = await editItem(`${import.meta.env.VITE_APP_URL}/users`, checkEmail[0].id, checkEmail[0])
  //     } else {
  //       alert(`This email \"${data.email}\" is not found.`)
  //       return
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
</script>

<template>
  <div v-if="statusLogin === null">
    <!-- Login -->
    <!-- <Login v-show="showLogin" 
      :dataAccout="dataAccout"
      @close-login="clearDataAccout" 
      @login="login"
      @forget-password="showEditProfile = true"
      @add-accout="addAccout" />

    <EditProfile v-show="showEditProfile"
      :dataAccout="dataAccout" 
      :statusLogin="false"
      @close-edit-profile="showEditProfile = false"
      @save-new-password="savePassword" /> -->
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

        <button @click="logout"
          class="bg-yellow-400 rounded-xl text-white text-x font-bold p-[1rem] w-[9rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-yellow-300">Logout</button>

        <button @click="deleteAccout"
          class="bg-red-600 rounded-xl text-white text-x font-bold p-[1rem] w-[9rem] cursor-pointer 
          duration-300 hover:scale-110 transition-transform hover:bg-red-400">Delete profile</button>
      </div>
    </div>

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
    </div>
  </div>
</template>

<style scoped></style>
