<script setup>
const emit = defineEmits(['close', 'submit'])
import { getItemByKey, editItem, addItem } from '@/libs/fetchUtils';
import { CookieUtil } from '@/libs/cookieUtil';
import { ref } from 'vue';
import EditProfile from './EditProfile.vue';
import Login from './Login.vue';
import { useUsers } from '@/store/users';


const statusLogin = ref(CookieUtil.get('juumId'));

const showEditProfile = ref(false)
const dataAccount = ref({
    username: "",
    email: "",
    DOB: "",
    password: "",
    tickets: [],
    bookmarks: [],
})

// Function sign up
const addAccount = async (data) => {
    try {
        // Check email already registered
        const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
        if (checkEmail.length !== 0) {
            alert(`This email \"${data.email}\" is already registered.`)
            return
        } 

        // Check username already registered
        const checkUsername = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)
        if (checkUsername.length !== 0) {
            alert(`This username \"${data.username}\" is already registered.`)
            return
        }

        const addAccount = await addItem(`${import.meta.env.VITE_APP_URL}/users`, data)
        login(addAccount)
    } catch (error) {
        console.log(error);r
    }
}

// Function Login
const login = async (data) => {
    try {
        if (data.email) {
            const dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
            if (dataSelect.length === 0) {
                alert("User not found.")
                return
            }
            if (!dataSelect[0].password === data.password) {
                alert("Incorrect password.")
                return
            }
            CookieUtil.set("juumId", dataSelect[0].id)
            statusLogin.value = CookieUtil.get('juumId')
            dataAccount.value = dataSelect[0]
        } else {
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
            dataAccount.value = matchedUser
        }
        emit('submit')
    } catch (error) {
        console.log(error)
    }
}

const savePassword = async (data) => {
    try {
        const checkEmail = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)

        // Check email is registered
        if (checkEmail.length !== 0) {
            checkEmail[0].password = data.password
            const saveAccount = await editItem(`${import.meta.env.VITE_APP_URL}/users`, checkEmail[0].id, checkEmail[0])
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
    <Login :dataAccount="dataAccount" @close-login="$emit('close')" @login="login"
        @forget-password="showEditProfile = true" @add-account="addAccount" />

    <EditProfile v-show="showEditProfile" :dataAccount="dataAccount" :statusLogin="false"
        @close-edit-profile="showEditProfile = false" @save-new-password="savePassword" />
</template>
<style scoped></style>