<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-[#272D2D] p-4 rounded-lg w-full max-w-md">
            <h2 class="text-white font-bold text-lg font-inter mb-4">Add New Todo</h2>
            <form @submit.prevent="addTodo">
                <div class="mb-4">
                    <label class="block text-white font-inter font-medium mb-2" for="title">Title</label>
                    <input v-model="title" id="title" type="text"
                        class="w-full px-3 py-2 bg-[#333] rounded-lg outline-none text-white placeholder-gray-400"
                        placeholder="Enter todo title" required />
                </div>
                <div class="mb-4">
                    <label class="block text-white font-inter font-medium mb-2" for="description">Description</label>
                    <textarea v-model="description" id="description"
                        class="w-full px-3 py-2 bg-[#333] rounded-lg outline-none text-white placeholder-gray-400"
                        placeholder="Enter todo description"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-white font-inter font-medium mb-2" for="dueDate">Due Date</label>
                    <input v-model="dueDate" id="dueDate" type="date"
                        class="w-full px-3 py-2 bg-[#333] rounded-lg outline-none text-white placeholder-gray-400"
                        required />
                </div>
                <div class="flex justify-end space-x-2">
                    <button @click="closeModal" type="button"
                        class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-[#23CE6B] hover:bg-[#1ea653] text-white rounded-lg">
                        Add Todo
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoForm',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            title: '',
            description: '',
            dueDate: ''
        };
    },
    methods: {
        addTodo() {
            if (this.title.trim() && this.dueDate) {
                this.$emit('add-todo', {
                    header: this.title,
                    description: this.description,
                    due_date: this.dueDate
                });
                this.resetForm();
                this.closeModal();
            }
        },
        resetForm() {
            this.title = '';
            this.description = '';
            this.dueDate = '';
        },
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
