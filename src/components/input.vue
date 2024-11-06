<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-[3px] flex justify-center items-center p-4 z-50 font-inter" @click.self="closeModal">
        <div class="bg-[#EDF5FC] rounded-lg shadow-lg w-full max-w-md relative p-6">
            <h2 class="text-2xl font-semibold mb-4 text-center flex items-center justify-center">
                <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                New List
            </h2>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
                <input type="text" v-model="listName" placeholder="List name"
                    class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required />
                <button type="submit" class="bg-[#272D2D] hover:bg-[#23CE6B] hover:text-black duration-300 text-white font-bold w-full py-2 px-4 rounded-lg flex justify-center">
                    Create
                </button>
            </form>
            <button class="absolute top-2 right-4 text-gray-500 hover:bg-red-200 hover:text-red-500 duration-300 px-2 rounded-2xl text-2xl" @click="closeModal">
                &times;
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddListForm',
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            listName: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleSubmit() {
            if (this.listName.trim()) {
                this.$emit('create-list', this.listName.trim());
                this.resetForm();
                this.closeModal();
            }
        },
        resetForm() {
            this.listName = '';
        },
    },
};
</script>
