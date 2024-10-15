<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <div class="todo-container">
        <form @submit.prevent="addToDo" class="todo-input">
            <input type="text" v-model="newToDoText" placeholder="Add a new task..." class="todo-input-field" />
            <button type="submit" class="add-button"><FontAwesomeIcon :icon="faPlusCircle" class="add-icon"/></button>
        </form>
        <ul class="task-list">
            <ToDoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggleToDo" @delete="deleteToDo" />
        </ul>
    </div>
</template>

<script>
import ToDoItem from './ToDoItem.vue';

export default {
    components: {
        ToDoItem,
    },
    data() {
        return {
            todos: [], 
            newToDoText: '',
        };
    },
    mounted() {
        const storedToDos = localStorage.getItem('todos');
        if (storedToDos) {
            this.todos = JSON.parse(storedToDos);
        }
    },
    methods: {
        addToDo() {
            if (this.newToDoText.trim() !== '') {
                const newToDo = {
                    id: Date.now(),
                    text: this.newToDoText,
                    completed: false,
                };
                this.todos.push(newToDo);
                this.newToDoText = '';
                this.saveToDos(); 
            }
        },
        toggleToDo(todoId) {
            const todo = this.todos.find(todo => todo.id === todoId);
            if (todo) {
                todo.completed = !todo.completed;
                this.saveToDos(); 
            }
        },
        deleteToDo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId);
            this.saveToDos(); 
        },
        saveToDos() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
    },
};
</script>