<script setup>
const emit = defineEmits(['close', 'submit', 'notification'])
import { getItemByKey, editItem, addItem } from '@/libs/fetchUtils';
import { CookieUtil } from '@/libs/cookieUtil';
import { ref } from 'vue';
import EditProfile from './EditProfile.vue';
import Login from './Login.vue';
import { useAuth } from '@/store/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuth()

const { setStatusLogin } = authStore;
const {statusLogin} = storeToRefs(authStore)

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
            emit('notification', false, 'Can not sign up', `This email \"${data.email}\" is already registered.`)
            return
        } 

        // Check username already registered
        const checkUsername = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)
        if (checkUsername.length !== 0) {
            emit('notification', false, 'Can not sign up', `This username \"${data.username}\" is already registered.`)
            return
        }

        const addAccount = await addItem(`${import.meta.env.VITE_APP_URL}/users`, data)
        login(addAccount)
        emit('notification', true, 'Create accout and login success', `Hey \"${data.username}\", welcome to the mhoojuum.`)
    } catch (error) {
        console.log(error);
    }
}

// Function Login
const login = async (data) => {
    try {
        let dataSelect = null
        if (data.email) {
            dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "email", data.email)
        } else {
            dataSelect = await getItemByKey(`${import.meta.env.VITE_APP_URL}/users`, "username", data.username)
        }

        if (dataSelect.length === 0) {
            emit('notification', false, 'Can not login', `${data.email ? 'Email "' + data.email + '"' : 'Username "' + data.username + '"'} not found.`)
            return
        }
        
        if (dataSelect[0].password !== data.password) {
            emit('notification', false, 'Can not login', 'Incorrect password.')
            return
        }
        
        setStatusLogin(dataSelect[0].id)
            console.log(statusLogin.value);
        dataAccount.value = dataSelect[0]

        emit('submit')
        emit('notification', true, 'Login success', `Hey \"${dataSelect[0].username}\", welcome to the mhoojuum.`)
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
            emit('notification', true, 'Reset password success', `Hey, \"${saveAccount.username}\" don\'t forget to remember your new password.`)
        } else {
            emit('notification', false, 'Can not reset password', `This email \"${data.email}\" is not found.`)
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