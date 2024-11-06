<template>
    <div class="flex flex-col h-dvh bg-[#B8C5D6]">
        <navbar />
        <div class="flex items-center bg-gray-50 p-3">
            <div class="flex flex-row items-center space-x-4">
                <h1 class="font-inter font-bold text-xl text-black">TASKS</h1>
                <button @click="fetchUpcomingTodos"
                    :class="['text-sm font-inter font-medium flex items-center duration-300 p-2 rounded-lg cursor-pointer', selectedListName === 'Upcoming' ? 'bg-[#c7daea]' : 'hover:bg-[#c7daea]']">
                    Upcoming
                    <div
                        class="bg-gradient-to-t from-[#23CE6B] to-[#A39BA8] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-2">
                        {{ totalUpcoming }}
                    </div>
                </button>
                <button @click="fetchAllTodos"
                    :class="['text-sm font-inter font-medium flex items-center duration-300 p-2 rounded-lg cursor-pointer', selectedListName === 'Today' ? 'bg-[#c7daea]' : 'hover:bg-[#c7daea]']">
                    Today
                    <div
                        class="bg-gradient-to-t from-[#23CE6B] to-[#A39BA8] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-2">
                        {{ totalToday }}
                    </div>
                </button>
            </div>
            <div class="flex flex-1 justify-center">
                <div class="flex flex-row items-center space-x-4">
                    <h1 class="font-inter font-bold text-xl text-black">LISTS</h1>
                    <div class="flex flex-row items-center space-x-2 overflow-x-auto">
                        <ul class="flex flex-row space-x-2">
                            <li v-for="list in lists" :key="list.id" @click="toggleTodos(list)" :class="[
                                'group text-sm font-inter font-medium flex items-center duration-300 p-2 rounded-lg cursor-pointer',
                                selectedListName === list.name ? 'bg-[#c7daea]' : 'hover:bg-[#c7daea]',
                            ]">
                                {{ list.name }}
                                <div
                                    class="bg-gradient-to-t from-[#23CE6B] to-[#A39BA8] text-black text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-2">
                                    {{ list.tasks.length }}
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button v-if="selectedListId && selectedListName !== 'Today' && selectedListName !== 'Upcoming'"
                    @click="deleteList(selectedListId)"
                    class=" hover:text-red-700 duration-300 font-inter rounded-lg py-1 px-1 text-gray-900 flex items-center">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button @click="showModal = true"
                    class="bg-[#141616] hover:bg-[#23CE6B] duration-300 font-inter rounded-lg py-1 px-4 text-white flex items-center">
                    <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Add New List
                </button>
            </div>
        </div>
        <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
                <p class="text-xl font-bold text-white">Loading...</p>
            </div>
        </div>
        <div class="flex flex-col lg:flex-row h-full justify-center items-center m-3">
            <div class="bg-gray-50 w-2/4 m-3 rounded-lg p-2 max-h-[600px] shadow-lg">
                <div class="flex flex-row justify-between">
                    <h1 class="font-inter text-2xl font-bold text-left mb-1 ml-1">{{ selectedListName || 'SelectedList'
                        }}
                    </h1>
                    <button v-if="selectedListName !== 'Today' && selectedListName !== 'Upcoming'"
                        @click="showTodoForm = true"
                        class="bg-[#23CE6B] rounded-lg hover:bg-[#B8C5D6] w-1/12 my-1 duration-300 p-1 flex flex-row justify-center items-center">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div
                    class="flex items-center border-transparent rounded-lg p-2 shadow-sm bg-gradient-to-r from-[#23CE6B] to-[#A39BA8] font-inter font-medium">
                    <input type="text" placeholder="Search"
                        class="flex-grow outline-none px-4  text-center placeholder-gray-800 bg-transparent"
                        v-model="searchQuery" />
                </div>
                <div class="mt-2 max-h-[350px] overflow-y-auto">
                    <ul>
                        <li v-for="todo in filteredTodos" :key="todo.id" @click="selectTodo(todo)"
                            :class="['text-sm font-inter font-bold flex items-center hover:bg-[#B8C5D6] duration-300 p-2 rounded-lg mb-2 cursor-pointer', selectedTodo && selectedTodo.id === todo.id ? '' : '']">
                            {{ todo.header }}
                            <div class="ml-auto flex items-center space-x-2">
                                <div
                                    class="bg-gradient-to-l from-[#23CE6B] to-[#A39BA8] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center">
                                    {{ formatCreatedAt(todo.due_date) || 'General' }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <inputModal :isVisible="showModal" @close="showModal = false" @create-list="handleCreateList" />
        <ConfirmationDialog :isVisible="showDeleteConfirmation" @confirm="confirmDeleteList"
            @cancel="cancelDeleteList" />
        <AddTodoForm :isVisible="showTodoForm" :listId="selectedListId" @add-todo="handleAddTodo"
            @close="showTodoForm = false" />
        <TodoModal :isVisible="showTodoModal" :todo="selectedTodo" @close="showTodoModal = false"
            @finish="deleteTodo" />
    </div>
</template>
<script>
import navbar from '../components/navbar.vue';
import inputModal from '../components/input.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import ConfirmationDialog from '../components/confDialog.vue';
import AddTodoForm from '../components/addToDo.vue';
import TodoModal from '../components/todoModal.vue';
import { useToast } from 'vue-toastification';


export default {
    name: 'Index',
    setup() {
        const toast = useToast();
        return { toast };
    },
    components: { navbar, inputModal, ConfirmationDialog, AddTodoForm, TodoModal },
    data() {
        return {
            showTodoModal: false,
            selectedListId: null,
            showModal: false,
            showTodoForm: false,
            lists: [],
            selectedTodos: [],
            selectedListName: '',
            selectedTodo: null,
            totalTasks: 0,
            searchQuery: '',
            totalToday: 0,
            showDeleteConfirmation: false,
            listToDelete: null,
            loading: true,
            totalUpcoming: 0,
        };
    },
    created() {
        this.fetchLists();
        this.fetchAllTodos();
        this.fetchUpcomingTodos();
    },
    computed: {
        filteredTodos() {
            return this.selectedTodos
                .slice()
                .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
                .filter(todo =>
                    todo.header.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
        }
    },
    methods: {
        toast: useToast(),
        async fetchLists() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/lists/lists', { headers: { Authorization: `Bearer ${token}` } });
                this.lists = await Promise.all(response.data.lists.map(async (list) => ({
                    ...list,
                    tasks: await this.fetchTasksForList(list.id),
                })));
                this.totalTasks = this.lists.reduce((acc, list) => acc + list.tasks.length, 0);
                this.calculateTodayAndUpcomingTotals();
            } catch (error) {
                console.error('Error fetching lists:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchAllTodos() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/todos/todos', { headers: { Authorization: `Bearer ${token}` } });
                const today = dayjs().startOf('day');
                const todaysTodos = response.data.todos.filter(todo => {
                    const dueDate = dayjs(todo.due_date).startOf('day');
                    return dueDate.isSame(today);
                });
                this.selectedListName = 'Today';
                this.selectedListId = null;
                this.selectedTodos = todaysTodos;
                this.totalToday = todaysTodos.length;
                this.selectedTodo = null;
            } catch (error) {
                console.error('Error fetching all todos:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchUpcomingTodos() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/todos/todos', { headers: { Authorization: `Bearer ${token}` } });
                const today = dayjs().startOf('day');
                const upcomingTodos = response.data.todos.filter(todo => {
                    const dueDate = dayjs(todo.due_date);
                    return dueDate.isSame(today) || dueDate.isAfter(today);
                });
                this.selectedListName = 'Upcoming';
                this.selectedListId = null;
                this.selectedTodos = upcomingTodos;
                this.totalUpcoming = upcomingTodos.length;
                this.selectedTodo = null;
            } catch (error) {
                console.error('Error fetching upcoming todos:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchTasksForList(listId) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://127.0.0.1:3000/todos/lists/${listId}/todos`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                return response.data.todos;
            } catch (error) {
                console.error(`Error fetching tasks for list ${listId}:`, error);
                return [];
            }
        },
        async handleCreateList(listName) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://127.0.0.1:3000/lists/lists', { name: listName }, { headers: { Authorization: `Bearer ${token}` } });
                this.fetchLists();
                this.toast.success('List added successfully!');
            } catch (error) {
                this.toast.error('Failed to add list.');
                console.error('Error creating list:', error);
            }
        },
        async handleAddTodo(newTodo) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://127.0.0.1:3000/todos/todos', newTodo, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const addedTodo = response.data.todo;
                if (this.selectedListId === newTodo.listId) {
                    this.selectedTodos = await this.fetchTasksForList(this.selectedListId);
                } else if (this.selectedListName === 'Today' && dayjs(addedTodo.due_date).isSame(dayjs(), 'day')) {
                    await this.fetchAllTodos();
                } else if (this.selectedListName === 'Upcoming' && dayjs(addedTodo.due_date).isAfter(dayjs(), 'day')) {
                    await this.fetchUpcomingTodos();
                }
                await this.fetchLists();
                this.calculateTodayAndUpcomingTotals();
                this.toast.success('Todo başarıyla eklendi!');
            } catch (error) {
                this.toast.error('Todo eklenemedi.');
                console.error('Todo eklerken hata oluştu:', error);
            }
        },
        async toggleTodos(list) {
            this.loading = true;
            try {
                if (this.selectedListName === list.name) {
                    this.selectedListName = '';
                    this.selectedListId = null;
                    this.selectedTodos = [];
                } else {
                    this.selectedListName = list.name;
                    this.selectedListId = list.id;
                    this.selectedTodos = await this.fetchTasksForList(list.id);
                }
                this.selectedTodo = null;
            } catch (error) {
                console.error(`Error toggling todos for list ${list.id}:`, error);
            } finally {
                this.loading = false;
            }
        },
        selectTodo(todo) {
            this.selectedTodo = todo;
            this.showTodoModal = true;
        },
        formatCreatedAt(time) {
            return dayjs(time).format('DD/MM/YYYY');
        },
        async deleteTodo(todoId) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:3000/todos/todos/${todoId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.selectedTodos = this.selectedTodos.filter((todo) => todo.id !== todoId);
                this.selectedTodo = null;
                this.showTodoModal = false;
                this.fetchLists();
                this.calculateTodayAndUpcomingTotals();
                this.toast.success('Todo finished successfully!');
            } catch (error) {
                this.toast.error('Failed to finish todo.');
                console.error(`Error deleting todo ${todoId}:`, error);
            }
        },
        calculateTodayAndUpcomingTotals() {
            const today = dayjs().startOf('day');
            this.totalToday = this.lists.reduce((total, list) => {
                return total + list.tasks.filter(task => dayjs(task.due_date).startOf('day').isSame(today)).length;
            }, 0);
            this.totalUpcoming = this.lists.reduce((total, list) => {
                return total + list.tasks.filter(task => dayjs(task.due_date).isSame(today) || dayjs(task.due_date).isAfter(today)).length;
            }, 0);
        },

        async deleteList(listId) {
            this.listToDelete = listId;
            this.showDeleteConfirmation = true;
        },
        async confirmDeleteList() {
            if (!this.listToDelete) return;
            const listId = this.listToDelete;
            this.showDeleteConfirmation = false;
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:3000/lists/lists/${listId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.lists = this.lists.filter(list => list.id !== listId);
                this.totalTasks = this.lists.reduce((acc, list) => acc + list.tasks.length, 0);
                this.selectedListName = '';
                this.selectedTodos = [];
                this.selectedTodo = null;
                this.fetchLists();
                this.toast.success('List deleted successfully!');
            } catch (error) {
                this.toast.error('Failed to delete list.');
                console.error(`Error deleting list ${listId}:`, error);
            }
            this.listToDelete = null;
        },
        cancelDeleteList() {
            this.showDeleteConfirmation = false;
            this.listToDelete = null;
        },
    }
};
</script>
