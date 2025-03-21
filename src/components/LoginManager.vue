<script setup>
const emit = defineEmits(['close', 'submit'])
import { getItemByKey, editItem, addItem } from '@/libs/fetchUtils';
import { CookieUtil } from '@/libs/cookieUtil';
import { ref } from 'vue';
import EditProfile from './EditProfile.vue';
import Login from './Login.vue';

const statusLogin = ref(CookieUtil.get('juumId'));

const showEditProfile = ref(false)
const dataAccout = ref({
    username: "",
    email: "",
    DOB: "",
    password: "",
    tickets: [],
    bookmarks: [],
})

// Function sign up
const addAccout = async (data) => {
    console.log('kuy')
    
    // Check null data
    if (!data.username || !data.email || !data.DOB || !data.password) {
        alert("Fill all information.")
        return
    }
    try {
        const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)

        // Check email already registered
        if (checkEmail.length === 0) {
            const addAccout = await addItem(`${import.meta.env.VITE_APP_URL}/users`, data)
            login(addAccout)
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
        emit('submit')
    } catch (error) {
        console.log(error)
    }
}

const savePassword = async (data) => {
    console.log(data);
    // Check null data
    if (!data.email || !data.password) {
        alert("Fill all information.")
        return
    }
    try {
        const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)

        // Check email is registered
        if (checkEmail.length !== 0) {
            const saveAccout = await editItem(`${import.meta.env.VITE_APP_URL}/users`, checkEmail[0].id, checkEmail[0])
        } else {
            alert(`This email \"${data.email}\" is not found.`)
            return
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <!-- Login -->
    <teleport to="body">
        <Login :dataAccout="dataAccout" @close-login="$emit('close')" @login="login"
            @forget-password="showEditProfile = true" @add-accout="addAccout" />
        <EditProfile v-show="showEditProfile" :dataAccout="dataAccout" :statusLogin="false"
            @close-edit-profile="showEditProfile = false" @save-new-password="savePassword" />
    </teleport>
</template>
<style scoped></style>