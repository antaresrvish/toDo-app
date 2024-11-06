<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-[3px]">
        <div class="bg-white rounded-lg p-6 w-1/2">
            <h1 class="font-inter text-2xl font-bold mb-4">Content of '{{ todo.header }}'</h1>
            <div class="text-sm font-inter font-medium">
                <p>Due Date: {{ formatDate(todo.due_date) }}</p>
                <p>Description: {{ todo.description || 'No description available' }}</p>
            </div>
            <div class="flex mt-6">
                <button @click="$emit('finish', todo.id)"
                    class="bg-[#141616] hover:bg-[#1ea653] duration-300 font-inter rounded-lg py-1 px-4 mx-1 text-white w-full flex justify-center items-center">
                    Finish
                </button>
                <button @click="$emit('close')"
                    class="bg-gray-500 hover:bg-gray-700 duration-300 font-inter rounded-lg py-1 px-4 mx-1 text-white w-full flex justify-center items-center">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'TodoModal',
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        todo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatDate(date) {
            return dayjs(date).format('DD/MM/YYYY');
        },
    },
};
</script>