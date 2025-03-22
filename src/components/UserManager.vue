<script setup>
  import TicketList from "./TicketList.vue";
  import Login from "./Login.vue";
  import EditProfile from "./EditProfile.vue";
  import { CookieUtil } from "@/libs/cookieUtil";
  import { onMounted, ref } from "vue";
  import { getItems, getItemById, getItemByKey, addItem, deleteItemById, editItem } from "@/libs/fetchUtils";
  import { useRouter } from "vue-router";

  const statusLogin = ref(CookieUtil.get('juumId'))
  const showLogin = ref(true)
  const router = useRouter() 
  const showEditProfile = ref(false)

  const tickets = ref([])
  const concerts = ref([])
  const concert = ref({})
  const all = ref([])

  
  onMounted(async () => {
    try {
      dataAccount.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value)
      tickets.value = await getItems(`${import.meta.env.VITE_APP_URL}/tickets`)
      tickets.value.forEach(async (ticket) => {
        concert.value = await getItemById(
          `${import.meta.env.VITE_APP_URL}/concerts`,
          ticket.concertId
        )
        concerts.value.push(concert.value)
      })
    } catch (error) {
      clearDataAccount()
      
      console.log(error);
    }
  })


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
  // const addAccount = async (data) => {
  //   // Check null data
  //   if (!data.username || !data.email || !data.DOB || !data.password) {
  //     alert("Fill all information.")
  //     return
  //   }
  //   try {
  //     const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
      
  //     // Check email already registered
  //     if (checkEmail.length === 0) {
  //       const addAccount = await addItem(`${import.meta.env.VITE_APP_URL}/users`,data)
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

  //     dataAccount.value = matchedUser
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
  //       const saveAccount = await editItem(`${import.meta.env.VITE_APP_URL}/users`, checkEmail[0].id, checkEmail[0])
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
      :dataAccount="dataAccount"
      @close-login="clearDataAccount" 
      @login="login"
      @forget-password="showEditProfile = true"
      @add-account="addAccount" />

    <EditProfile v-show="showEditProfile"
      :dataAccount="dataAccount" 
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

        <button @click="deleteAccount"
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
      <button class="border-b-2 pb-1">Upcoming</button>
      <button>History</button>
      <button>follow</button>
    </div>
    <div class="bg-gray-200">
      <TicketList :ticket="concerts"></TicketList>
    </div>
  </div>
</template>

<style scoped></style>
