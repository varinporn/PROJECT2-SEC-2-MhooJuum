<script setup>
    import { ref } from "vue"
    const showPageSignUp = ref(true)
</script>
 
<template>
    <div class="flex items-center justify-center absolute h-screen w-screen">
        <div class="flex shadow-xl items-center rounded-lg h-[40rem] w-[50rem]">
            <!-- Login -->
            <div class="p-10 w-[25rem]">
                <p class="text-center font-bold text-3xl mb-6">Login</p>
                <form action="" class="flex flex-col space-y-7">
                    <div>
                        <label for="" class="font-bold text-gray-400">User name:</label>
                        <input type="text" id="" class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Password:</label>
                        <input type="password" id="" class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <p class="font-bold text-gray-400 text-xs ml-auto hover:">Forget Password?</p>
                    <input type="submit" value="Log in" 
                        class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 transition-colors duration-200 py-3 rounded-full font-bold cursor-pointer">
                </form>
            </div>
            <!-- Sign Up -->
            <div class="p-10 w-[25rem]">
                <p class="text-center font-bold text-3xl mb-6">Sign up</p>
                <form action="" class="flex flex-col space-y-7">

                    <div>
                        <label for="" class="font-bold text-gray-400">Email:</label>
                        <input type="email" id="" required class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Birth day:</label>
                        <input type="date" id="" required class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">User name:</label>
                        <input type="text" id="" required class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <div>
                        <label for="" class="font-bold text-gray-400">Password:</label>
                        <input type="password" id="" required class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 p-2">
                    </div>
                    <input type="submit" value="Sign up" 
                        class="w-3/5 mx-auto text-white bg-blue-900 hover:bg-blue-700 transition-colors duration-200 py-3 rounded-full font-bold cursor-pointer">
                </form>
            </div>
            <!-- Switch Feture -->
            <div class="bg-gray-500 rounded-lg absolute h-[40rem] w-[25rem] flex justify-center items-center transition-transform duration-500" :class="{'translate-x-[25rem]': showPageSignUp}">
                <div v-show="showPageSignUp" class="m-8">
                    <p class="text-4xl font-black text-white text-center mb-4">Welcome Back!</p>
                    <p class="text-xl font-normal text-white text-center mb-10">Enter your personal details to use all of site features</p>
                    <button @click="showPageSignUp = !showPageSignUp" class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500">
                        Sign up
                    </button>
                </div>
                <div v-show="!showPageSignUp" class="m-8">
                    <p class="text-4xl font-black text-white text-center mb-4">Hello, Friend!</p>
                    <p class="text-xl font-normal text-white text-center mb-10">Register with your personal details to use all of site features</p>
                    <button @click="showPageSignUp = !showPageSignUp" class="w-3/5 mx-auto block text-white border border-white duration-200 py-3 rounded-full font-bold cursor-pointer hover:bg-white hover:text-gray-500">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>