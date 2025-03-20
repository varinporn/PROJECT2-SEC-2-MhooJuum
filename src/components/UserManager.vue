<script setup>
import TicketList from "./TicketList.vue";
import Login from "./Login.vue";
import { CookieUtil } from "@/libs/cookieUtil";
import { onMounted, ref } from "vue";
import { getItems, getItemById, getItemByKey, addItem, deleteItemById } from "@/libs/fetchUtils";

const statusLogin = ref(CookieUtil.get('juumId'))
const showLogin = ref(false)

const tickets = ref([])
const concerts = ref([])
const concert = ref({})
const all = ref([])

onMounted(async () => {
  try {
    dataAccout.value = (await getItemById(`${import.meta.env.VITE_APP_URL}/users`, statusLogin.value))[0]
  } catch (error) {
    console.log(error);
  }



  tickets.value = await getItems(`${import.meta.env.VITE_APP_URL}/tickets`)
  tickets.value.forEach(async (ticket) => {
    concert.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/concerts`,
      ticket.concertId
    )
    concerts.value.push(concert.value)
  })
})

// Data user
const dataAccout = ref({
  username: "",
  email: "",
  DOB: "",
  password: "",
  tickets: [],
  bookmarks: [],
})
const clearDataAccout = () => {
  dataAccout.value = {
    username: "",
    email: "",
    DOB: "",
    password: "",
    tickets: [],
    bookmarks: [],
  }
  showLogin.value = false
}

// Function sign up
const addAccout = async (data) => {
  // Check null data
  if (!data.username || !data.email || !data.DOB || !data.password) {
    alert("Fill all information.")
    return
  }
  try {
    const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
    
    // Check email already registered
    if (checkEmail.length === 0) {
      const addedUser = await addItem(`${import.meta.env.VITE_APP_URL}/users`,data)
    } else {
      alert(`This email \"${data.email}\" is already registered.`)
      return
    }
  } catch (error) {
    console.log(error);
  }
}

// Function Login
const login = async (data) => {
  // Check null data
  if (!data.username || !data.password) {
    alert("Fill all information.")
    return
  }
  try {
    // Check username real
    const dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username);
    if (dataSelect.length === 0) {
      alert("User not found.")
      return
    }

    // Check password match
    const matchedUser = dataSelect.find(
      (user) => user.password === data.password
    )
    if (!matchedUser) {
      alert("Incorrect password.")
      return
    }

    CookieUtil.set("juumId", matchedUser.id);
    statusLogin.value = CookieUtil.get('juumId')

    dataAccout.value = matchedUser
    showLogin.value = false;
  } catch (error) {
    console.log(error)
  }
}

// Function logout
const logout = () => {
  clearDataAccout()
  CookieUtil.unset('juumId')
  statusLogin.value = CookieUtil.get('juumId')
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
const editProfile = async () => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div v-if="statusLogin === null">
    <!-- Login -->
    <div class="flex justify-center">
      <button @click="showLogin = true" 
        class="bg-green-600 rounded-xl text-white text-5xl p-[1rem] my-[1rem] cursor-pointer 
        duration-300 hover:scale-110 transition-transform hover:bg-green-400">Login</button>
    </div>
    <Login v-show="showLogin" 
      :dataAccout="dataAccout"
      :showPageSignUp="showPageSignUp"
      @close-login="clearDataAccout" 
      @login="login"
      @add-accout="addAccout" />
  </div>
  <div v-else>
    <!-- Profile -->
    <div class="flex justify-between items-end px-[7rem] my-[2rem]">
      <div class="flex items-center gap-[5rem]">
        <div>
          <img src="/icons/profile.png" alt="profile" class="w-[14rem] rounded-full">
        </div>
        <div>
          <p class="text-8xl font-bold mb-[1rem]">{{ dataAccout.username }}</p>
          <p class="text-4xl font-light">{{ dataAccout.email }}</p>
        </div>
      </div>
      <div class="flex gap-[2rem] mb-[2rem]">
        <button @click="editProfile"
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
