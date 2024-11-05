<template>
    <div class="flex flex-col h-dvh">
        <navbar />
        <div class="flex flex-col lg:flex-row h-full justify-center items-center m-3">
            <div class="bg-[#272D2D] w-2/4 m-3 rounded-lg p-2 max-h-[600px]">
                <h1 class="font-inter font-bold text-2xl text-left text-white p-1">TASKS</h1>
                <div>
                    <button @click="fetchUpcomingTodos"
                        class="text-white text-sm font-inter w-full font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg border-b border-[#3b4343] mb-2">
                        Upcoming
                        <div
                            class="bg-[#9a7aae] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto">
                            12
                        </div>
                    </button>
                    <button @click="fetchAllTodos"
                        class="text-white w-full text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg border-b border-[#3b4343] mb-2">
                        Today
                        <div
                            class="bg-[#23CE6B] text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center ml-auto">
                            {{ totalToday }}
                        </div>
                    </button>
                </div>
                <h1 class="font-inter font-bold text-2xl text-left text-white p-1">LISTS</h1>
                <div class="rounded-lg font-inter text-left max-h-[200px] overflow-y-auto">
                    <ul>
                        <li v-for="list in lists" :key="list.id" @click="toggleTodos(list)"
                            :class="['group text-white text-sm font-inter font-bold flex items-center duration-300 p-2 rounded-lg mb-2 cursor-pointer', selectedListName === list.name ? 'bg-gray-600' : 'hover:bg-gray-600']">
                            {{ list.name }}
                            <div class="ml-auto flex items-center space-x-2">
                                <div class="hidden group-hover:flex items-center space-x-2 ml-2">
                                    <button @click.stop="deleteList(list.id)"
                                        class="text-red-400 hover:text-red-600 duration-300">
                                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div :style="{ backgroundColor: getRandomColor() }"
                                    class="text-xs px-2 py-1 rounded-full w-6 h-6 flex items-center justify-center">
                                    {{ list.tasks.length }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-row pt-1">
                    <button @click="showModal = true"
                        class="bg-[#141616] hover:bg-[#23CE6B] duration-300 font-inter rounded-lg py-1 w-2/4 text-white flex items-center justify-center space-x-2">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 13V7M9 10H15M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span>Add new list</span>
                    </button>
                    <div class="bg-[#A39BA8] rounded-lg ml-2 flex flex-row justify-center items-center w-2/4">
                        Total {{ totalTasks }}
                    </div>
                </div>
            </div>
            <div class="bg-[#272D2D] w-2/4 m-3 rounded-lg p-2 max-h-[600px]">
                <h1 class="font-inter text-white text-2xl font-bold text-left">{{ selectedListName || 'Selected List' }}
                </h1>
                <div
                    class="flex items-center border border-transparent rounded-lg p-2 shadow-sm bg-[#ffffff20] font-inter font-medium">
                    <input type="text" placeholder="Search"
                        class="flex-grow outline-none px-4 text-white text-center placeholder-gray-300 bg-transparent"
                        v-model="searchQuery" />
                    <button @click="showTodoForm = true"
                        class="bg-[#23CE6B] rounded-lg hover:bg-[#B8C5D6] duration-300 p-1">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="mt-2 max-h-[350px] overflow-y-auto">
                    <ul>
                        <li v-for="todo in filteredTodos" :key="todo.id" @click="selectTodo(todo)"
                            :class="['text-white text-sm font-inter font-bold flex items-center hover:bg-gray-600 duration-300 p-2 rounded-lg mb-2 cursor-pointer', selectedTodo && selectedTodo.id === todo.id ? 'bg-gray-700' : '']">
                            {{ todo.header }}
                            <div class="ml-auto flex items-center space-x-2">
                                <div
                                    class="bg-[#ce23cb] text-xs px-2 py-1 rounded-full h-6 flex items-center justify-center">
                                    {{ formatCreatedAt(todo.due_date) || 'General' }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-[#272D2D] w-2/4 m-3 rounded-lg p-2" v-if="selectedTodo">
                <h1 class="font-inter text-white text-2xl font-bold text-left">CONTENT OF '{{ selectedTodo.header }}'
                </h1>
                <div class="text-white text-sm font-inter font-medium mt-4">
                    <p>Created At: {{ formatCreatedAt(selectedTodo.due_date) }}</p>
                    <p>Description: {{ selectedTodo.description || 'No description available' }}</p>
                </div>
                <div class="flex flex-row mt-4">
                    <button @click="deleteTodo(selectedTodo.id)"
                        class="bg-[#141616] hover:bg-[#1ea653] duration-300 font-inter rounded-lg py-1 px-4 mx-1 text-white w-full justify-center flex items-center">
                        Finish
                        <svg class="h-5 w-5 ml-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 13L16.7004 6.50182C16.6278 6.13883 16.5915 5.95733 16.5032 5.80953C16.4252 5.67886 16.3183 5.56773 16.1908 5.4846C16.0466 5.39057 15.8667 5.34714 15.5069 5.26028L2 2M2 2L5.26028 15.5069C5.34714 15.8667 5.39057 16.0466 5.4846 16.1908C5.56773 16.3183 5.67886 16.4252 5.80953 16.5032C5.95733 16.5915 6.13883 16.6278 6.50182 16.7004L13 18M2 2L9.586 9.586M16.1314 20.8686L20.8686 16.1314C21.2646 15.7354 21.4627 15.5373 21.5368 15.309C21.6021 15.1082 21.6021 14.8918 21.5368 14.691C21.4627 14.4627 21.2646 14.2646 20.8686 13.8686L20.1314 13.1314C19.7354 12.7354 19.5373 12.5373 19.309 12.4632C19.1082 12.3979 18.8918 12.3979 18.691 12.4632C18.4627 12.5373 18.2646 12.7354 17.8686 13.1314L13.1314 17.8686C12.7354 18.2646 12.5373 18.4627 12.4632 18.691C12.3979 18.8918 12.3979 19.1082 12.4632 19.309C12.5373 19.5373 12.7354 19.7354 13.1314 20.1314L13.8686 20.8686C14.2646 21.2646 14.4627 21.4627 14.691 21.5368C14.8918 21.6021 15.1082 21.6021 15.309 21.5368C15.5373 21.4627 15.7354 21.2646 16.1314 20.8686ZM13 11C13 12.1046 12.1046 13 11 13C9.89543 13 9 12.1046 9 11C9 9.89543 9.89543 9 11 9C12.1046 9 13 9.89543 13 11Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <inputModal :isVisible="showModal" @close="showModal = false" @create-list="handleCreateList" />
        <ConfirmationDialog :isVisible="showDeleteConfirmation" @confirm="confirmDeleteList"
            @cancel="cancelDeleteList" />
        <AddTodoForm :isVisible="showTodoForm" :listId="selectedListId" @add-todo="handleAddTodo"
            @close="showTodoForm = false" />
    </div>
</template>

<script>
import navbar from '../components/navbar.vue';
import inputModal from '../components/input.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import ConfirmationDialog from '../components/confDialog.vue';
import AddTodoForm from '../components/addToDo.vue';
import deleteTodo from '../components/deleteToDo.vue';

export default {
    name: 'Index',
    components: { navbar, inputModal, ConfirmationDialog, AddTodoForm, deleteTodo },
    data() {
        return {
            selectedListId: null,
            showModal: false,
            showTodoForm: false,
            showDeleteTodo: false,
            lists: [],
            selectedTodos: [],
            selectedListName: '',
            selectedTodo: null,
            totalTasks: 0,
            searchQuery: '',
            totalToday: 0,
            showDeleteConfirmation: false,
            listToDelete: null,
        };
    },
    created() {
        this.fetchLists();
        this.fetchAllTodos();
    },
    computed: {
        filteredTodos() {
            return this.selectedTodos.filter(todo =>
                todo.header.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchLists() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/lists/lists', { headers: { Authorization: `Bearer ${token}` } });
                this.lists = await Promise.all(response.data.lists.map(async (list) => ({
                    ...list,
                    tasks: await this.fetchTasksForList(list.id),
                })));
                this.totalTasks = this.lists.reduce((acc, list) => acc + list.tasks.length, 0);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        },
        async fetchTasksForList(listId) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:3000/todos/lists/${listId}/todos`, { headers: { Authorization: `Bearer ${token}` } });
                return response.data.todos || [];
            } catch (error) {
                console.error(`Error fetching tasks for list ${listId}:`, error);
                return [];
            }
        },
        async fetchAllTodos() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/todos/todos', { headers: { Authorization: `Bearer ${token}` } });
                const today = dayjs().startOf('day');
                const todaysTodos = response.data.todos.filter(todo => {
                    const dueDate = dayjs(todo.due_date).startOf('day');
                    return dueDate.isSame(today);
                });
                this.selectedListName = 'Today';
                this.selectedTodos = todaysTodos;
                this.selectedTodo = null;
                this.totalToday = todaysTodos.length;
            } catch (error) {
                console.error('Error fetching all todos:', error);
            }
        },
        async fetchUpcomingTodos() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:3000/todos/todos', { headers: { Authorization: `Bearer ${token}` } });
                const today = dayjs().startOf('day');
                this.selectedTodos = response.data.todos.filter(todo => {
                    const dueDate = dayjs(todo.due_date);
                    return dueDate.isSame(today) || dueDate.isAfter(today);
                });
                this.selectedListName = 'Upcoming';
                this.selectedTodo = null;
            } catch (error) {
                console.error('Error fetching upcoming todos:', error);
            }
        },
        async handleCreateList(listName) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://127.0.0.1:3000/lists/lists', { name: listName }, { headers: { Authorization: `Bearer ${token}` } });
                this.fetchLists();
            } catch (error) {
                console.error('Error creating list:', error);
            }
        },
        async handleAddTodo(newTodo) {
            try {
                if (!newTodo || !newTodo.header || !newTodo.listId) {
                    console.error('Error: The todo object is missing required properties.');
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.post('http://127.0.0.1:3000/todos/todos', newTodo, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                this.fetchAllTodos();
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        },

        async toggleTodos(list) {
            try {
                this.selectedListName = this.selectedListName === list.name ? '' : list.name;
                this.selectedListId = this.selectedListName ? list.id : null;
                console.log(this.selectedListName, this.selectedListId);
                this.selectedTodos = this.selectedListName ? await this.fetchTasksForList(list.id) : [];
                this.selectedTodo = null;
            } catch (error) {
                console.error(`Error toggling todos for list ${list.id}:`, error);
            }
        },
        selectTodo(todo) {
            this.selectedTodo = todo;
        },
        formatCreatedAt(time) {
            return dayjs(time).format('DD/MM/YYYY');
        },
        async deleteTodo(todoId) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:3000/todos/todos/${todoId}`, { headers: { Authorization: `Bearer ${token}` } });
                this.selectedTodos = this.selectedTodos.filter(todo => todo.id !== todoId);
                this.selectedTodo = null;
                this.totalTasks--;
            } catch (error) {
                console.error(`Error deleting todo ${todoId}:`, error);
            }
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
            } catch (error) {
                console.error(`Error deleting list ${listId}:`, error);
            }
            this.listToDelete = null;
        },
        cancelDeleteList() {
            this.showDeleteConfirmation = false;
            this.listToDelete = null;
        },
        getRandomColor() {
            const getChannelValue = () => Math.floor(Math.random() * 100 + 80); 
            const color = `rgb(${getChannelValue()}, ${getChannelValue()}, ${getChannelValue()})`;
            return color;
        }
    }
};
</script>
