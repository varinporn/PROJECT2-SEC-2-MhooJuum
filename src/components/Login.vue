<script setup>
    import { ref, defineEmits } from "vue"

    const emit = defineEmits(['closeLogin', 'login', 'addAccout'])
    const props = defineProps({
        dataAccout: {
            type: Object
        }
    })
    const data = ref(props.dataAccout)
    
    // Switch Feture
    const showPageSignUp = ref(true)
    const switchFeture = () => {
        data.value = { 
            username: "",
            email: "", 
            DOB: "",
            password: "",
            tickets: [],
            bookmarks: []
        }
        document.getElementById("DOB").value = ""
        showPageSignUp.value = !showPageSignUp.value
    }
</script>
 
<template>
    <div class="fixed inset-0 flex items-center justify-center z-1000">
        <div class="flex shadow-xl items-center rounded-lg h-[40rem] w-[50rem] bg-white">
            <!-- Login -->
            <div class="p-10 w-[25rem]">
                <button @click="$emit('closeLogin')" class=" relative bottom-[7rem] font-black cursor-pointer">X</button>
                <p class="text-center font-bold text-3xl mb-6">Login</p>
                <div action="" class="flex flex-col space-y-7">
                    <div>
                        <label for="" class="font-bold text-gray-400">User name:</label>
                        <input type="text" id="" v-model="data.username"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Password:</label>
                        <input type="password" id="" v-model="data.password"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                        <p class="font-bold text-gray-400 text-xs ml-auto hover:">Forget Password?</p>
                        <input type="submit" value="Log in" @click="$emit('login', data)"
                            class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
                </div>
            </div>
            <!-- Sign Up -->
            <div class="p-10 w-[25rem]">
                <button @click="() => { emit('closeLogin'); switchFeture(); }" class=" relative bottom-[3rem] font-black left-[19rem] cursor-pointer">X</button>
                <p class="text-center font-bold text-3xl mb-6">Sign up</p>
                <div action="" class="flex flex-col space-y-7">
                    <div>
                        <label for="" class="font-bold text-gray-400">Email:</label>
                        <input type="email" id="" required v-model="data.email"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Birth day:</label>
                        <input type="date" id="DOB" required v-model="data.DOB"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">User name:</label>
                        <input type="text" id="" required v-model="data.username"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Password:</label>
                        <input type="password" id="" required v-model="data.password"
                            class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <input type="submit" value="Sign up" @click="() => { emit('addAccout', data); switchFeture(); }"
                        class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 hover:scale-110 transition-transform duration-200 py-3 rounded-full font-bold cursor-pointer">
                </div>
            </div>
            <!-- Switch Feture -->
            <div class="bg-gray-500 rounded-lg absolute h-[40rem] w-[25rem] flex justify-center items-center transition-transform duration-500" :class="{'translate-x-[25rem]': showPageSignUp}">
                <div v-if="props.showPageSignUp" class="m-8">
                    <p class="text-4xl font-black text-white text-center mb-4">Welcome Back!</p>
                    <p class="text-xl font-normal text-white text-center mb-10">Enter your personal details to use all of site features</p>
                    <button @click="switchFeture" class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500 hover:scale-110 transition-transform">
                        Sign up
                    </button>
                </div>
                <div v-else class="m-8">
                    <p class="text-4xl font-black text-white text-center mb-4">Hello, Friend!</p>
                    <p class="text-xl font-normal text-white text-center mb-10">Register with your personal details to use all of site features</p>
                    <button @click="switchFeture" class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500 hover:scale-110 transition-transform">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>
