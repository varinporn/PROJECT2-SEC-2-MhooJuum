<script setup>
import { ref } from 'vue';
import EditProfile from './EditProfile.vue';
import Login from './Login.vue';

const showEditProfile = ref(false)

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
        const addAccout = await addItem(`${import.meta.env.VITE_APP_URL}/users`,data)
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
      const dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)

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

      CookieUtil.set("juumId", matchedUser.id)
      statusLogin.value = CookieUtil.get('juumId')

      dataAccout.value = matchedUser
      showLogin.value = false;
    } catch (error) {
      console.log(error)
    }
  }
</script>
<template>
    <!-- Login -->
    <Login v-show="showLogin" :dataAccout="dataAccout" @close-login="clearDataAccout" @login="login"
        @forget-password="showEditProfile = true" @add-accout="addAccout" />

    <EditProfile v-show="showEditProfile" :dataAccout="dataAccout" :statusLogin="false"
        @close-edit-profile="showEditProfile = false" @save-new-password="savePassword" />
</template>
<style scoped></style>