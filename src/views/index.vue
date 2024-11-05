<script setup>
//https://coolors.co/272d2d-a39ba8-b8c5d6-edf5fc-23ce6b
import navbar from '../components/navbar.vue';
</script>

<template>
    <div class="flex flex-col h-dvh">
        <navbar />
        <div class="flex flex-col lg:flex-row h-full justify-center items-center m-3">
            <div class="bg-[#272D2D] w-2/4 m-3 rounded-lg p-2">
                <h1 class="font-inter text-white text-2xl font-bold text-left">TODAY</h1>
                <div
                    class="flex items-center border border-transparent rounded-lg p-2 shadow-sm bg-[#ffffff20] font-inter font-medium">
                    <input type="text" placeholder="Search"
                        class="flex-grow outline-none px-4 text-white text-center placeholder-gray-300 bg-transparent" />
                </div>
                <ul class="mt-2">
                    <li href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2">

                        Clean the house.
                        <div
                            class="bg-[#282c2c] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto">
                            22/01/2024
                        </div>
                        <div
                            class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto">
                            Personal
                        </div>
                    </li>
                    <li href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2">

                        Prepare the dinner.
                        <div
                            class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto">
                            Personal
                        </div>
                    </li>
                    <li href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2">

                        Finish paperworks.
                        <div
                            class="bg-[#ce2323] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto">
                            Work
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>
