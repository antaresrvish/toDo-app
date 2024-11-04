<script setup>
//https://coolors.co/272d2d-a39ba8-b8c5d6-edf5fc-23ce6b
import navbar from '../components/navbar.vue';
</script>

<template>
    <div class="flex flex-col h-dvh">
        <navbar/>
        <div class="flex flex-col lg:flex-row h-full justify-center items-center m-3">
            <div class="bg-[#272D2D] w-full m-3 rounded-lg p-2">
                    <h1 class="font-inter font-bold text-2xl text-left text-white p-1">TASKS</h1>
                    <div>
                        <a
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg border-b border-[#3b4343] mb-2"
                        >
                            Upcoming
                            <div
                                class="bg-[#9a7aae] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                12
                            </div>
                        </a>
                        <a
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg border-b border-[#3b4343] hover:border-none mb-2"
                        >
                            Today
                            <div
                                class="bg-[#23CE6B] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                9
                            </div>
                        </a>
                    </div>
                    <h1 class="font-inter font-bold text-2xl text-left text-white p-1">LISTS</h1>
                    <ul class="rounded-lg font-inter text-left">
                        <li
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                        >
                            
                        Work
                            <div
                                class="bg-[#ce2323] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                3
                            </div>
                        </li>
                        <li
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                        >
                            
                        Personal
                            <div
                                class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                12
                            </div>
                        </li>
                        <li
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                        >
                            
                        Custom list 1
                            <div
                                class="bg-[#cec323] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                23
                            </div>
                        </li>
                        <li
                            href="/"
                            class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                        >
                            
                        Custom list 2
                            <div
                                class="bg-[#23cea3] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                            >
                                7
                            </div>
                        </li>
                    </ul>
                    <div class="flex flex-row">
                        <button class="bg-[#141616] hover:bg-[#23CE6B] duration-300 font-inter rounded-lg py-1 w-2/4 text-white flex items-center justify-center space-x-2">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Add new list</span>
                        </button>   
                        <div class="bg-[#A39BA8] rounded-lg ml-2 flex flex-row justify-center items-center w-2/4">
                            Total 23
                        </div>
                    </div>
                    
            </div>
            <div class="bg-[#272D2D] w-full m-3 rounded-lg p-2">
                <h1 class="font-inter text-white text-2xl font-bold text-left">TODAY</h1>
                <div class="flex items-center border border-transparent rounded-lg p-2 shadow-sm bg-[#ffffff20] font-inter font-medium">
                    <input type="text" placeholder="Search" class="flex-grow outline-none px-4 text-white text-center placeholder-gray-300 bg-transparent" />
                </div>
                <ul class="mt-2">
                    <li
                        href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                    >
                        
                    Clean the house.
                        <div
                            class="bg-[#282c2c] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto"
                        >
                            22/01/2024
                        </div>
                        <div
                            class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto"
                        >
                            Personal
                        </div>
                    </li>
                    <li
                        href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                    >
                        
                    Prepare the dinner.
                        <div
                            class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto"
                        >
                            Personal
                        </div>
                    </li>
                    <li
                        href="/"
                        class="text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2"
                    >
                        
                    Finish paperworks.
                        <div
                            class="bg-[#ce2323] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center ml-auto"
                        >
                            Work
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bg-[#272D2D] w-full m-3 rounded-lg p-2">
                <h1 class="font-inter text-white text-2xl font-bold text-left">CONTENT OF 'change dirs'</h1>
            </div>
        </div>
    </div>
    
</template>

