<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-[3px] flex justify-center items-center p-4 z-50 font-inter" @click.self="closeModal">
        <div class="bg-[#EDF5FC] rounded-lg shadow-lg w-full max-w-md relative p-6">
            <h2 class="text-xl font-bold text-black mb-4">Add New Todo</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label class="text-black font-medium">Header</label>
                <input type="text" v-model="header" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" required />
            </div>
            <div class="mb-4">
                <label class="text-black font-medium">Description</label>
                <textarea v-model="description" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" required
                    rows="3"></textarea>
            </div>
            <div class="mb-4">
                <label class="text-black font-medium">Due Date</label>
                <input type="date" v-model="dueDate" class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" required />
            </div>
            <button type="submit" class="bg-[#272D2D] hover:bg-[#23CE6B] duration-300 rounded-lg p-2 rounded- text-white w-full">Add
                Todo</button>
        </form>
            <button class="absolute top-2 right-2 text-gray-500 hover:bg-red-200 hover:text-red-500 duration-300 px-2 rounded-2xl text-2xl" @click="closeModal">
                &times;
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddTodoForm',
    props: {
        listId: {
            type: Number,
            required: true,
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            header: '',
            description: '',
            dueDate: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleSubmit() {
            this.$emit('add-todo', {
                header: this.header,
                description: this.description,
                dueDate: this.dueDate,
                listId: this.listId,
            });
            this.resetForm();
            this.closeModal();
        },
        resetForm() {
            this.header = '';
            this.description = '';
            this.dueDate = '';
        },
    },
};
</script>
