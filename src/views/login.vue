<template>
    <div v-if="!isLoggedIn"
        class="flex flex-col md:flex-row justify-center items-center h-screen font-inter bg-[#B8C5D6]">
        <div
            class="bg-gray-50 p-6 rounded-b-lg md:rounded-e-none md:rounded-l-lg border shadow-xl justify-center flex flex-col w-96 h-80 order-2 md:order-1">
            <h1 class="text-2xl font-light font-inter text-left mb-4">Sign In</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="username" class="block text-gray-700 font-medium mb-2">Username</label>
                    <input type="text" id="username" v-model="username" placeholder="antaresrvish"
                        class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
                    <div class="relative">
                        <input type="password" id="password" v-model="password" placeholder="yil***56"
                            class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required />
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute top-1/2 right-2 transform -translate-y-1/2">
                            <svg v-if="showPassword"
                                class="h-5 w-5 text-colorAccent hover:text-gray-500 bg-transparent duration-300"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            <svg v-else class="h-5 w-5 text-gray-500 hover:text-red-500 duration-300"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div class="w-full text-right -mb-4">
                        <a href="/register" class="font-base text-xs text-gray-500 hover:text-gray-700 duration-300">
                            Dont have an account?
                        </a>
                    </div>
                </div>
                <button @click="login()"
                    class="bg-[#272D2D] hover:bg-[#23CE6B] duration-300 text-white font-bold w-full py-2 px-4 rounded-lg flex flex-row justify-center">
                    Login
                </button>
            </form>
        </div>
        <div id="test"
            class="bg-gradient-to-t from-[#23CE6B] to-[#A39BA8] shadow-xl w-96 h-80 rounded-t-lg md:rounded-s-none md:rounded-r-lg flex items-center justify-center flex-col order-1 md:order-2">
            <h1 class="text-gray-200 font-inter text-xl font-bold ">Welcome back to</h1>
            <h1 class="text-white text-4xl font-inter flex items-center my-2">
                <svg class="h-12 w-12 mr-1" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 7L8.83447 8.76158C8.52956 8.8487 8.37711 8.89226 8.25117 8.97414C8.13969 9.04662 8.04379 9.1406 7.96907 9.2506C7.88466 9.37485 7.83803 9.5264 7.74477 9.82948L4 22M4 22L16.1705 18.2552C16.4736 18.162 16.6251 18.1153 16.7494 18.0309C16.8594 17.9562 16.9534 17.8603 17.0259 17.7488C17.1077 17.6229 17.1513 17.4704 17.2384 17.1655L19 11M4 22L10.586 15.4139M5 8V2M2 5H8M21.8686 7.86863L18.1314 4.13137C17.7354 3.73535 17.5373 3.53735 17.309 3.46316C17.1082 3.3979 16.8918 3.3979 16.691 3.46316C16.4627 3.53735 16.2646 3.73535 15.8686 4.13137L15.1314 4.86863C14.7354 5.26465 14.5373 5.46265 14.4632 5.69098C14.3979 5.89183 14.3979 6.10817 14.4632 6.30902C14.5373 6.53735 14.7354 6.73535 15.1314 7.13137L18.8686 10.8686C19.2646 11.2646 19.4627 11.4627 19.691 11.5368C19.8918 11.6021 20.1082 11.6021 20.309 11.5368C20.5373 11.4627 20.7354 11.2646 21.1314 10.8686L21.8686 10.1314C22.2646 9.73535 22.4627 9.53735 22.5368 9.30902C22.6021 9.10817 22.6021 8.89183 22.5368 8.69098C22.4627 8.46265 22.2646 8.26465 21.8686 7.86863ZM12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12Z"
                        stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                ToDo
            </h1>
            <h1 class="text-gray-200 font-inter text-lg font-light ">Make your ToDo's easily</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import messages from '../../utils/messages';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:3000/users/login', {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                console.log(messages.SUCCESS_LOGIN, response.data);
                this.$router.push('/');
            } catch (error) {
                console.error(messages.ERROR_SERVER, error);
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            const passwordInput = document.getElementById('password');
            passwordInput.type = this.showPassword ? 'text' : 'password';
        },
    }
}
</script>