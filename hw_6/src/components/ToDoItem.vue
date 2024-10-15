<template>
    <li :class="{ completed: todo.completed }">
        <input type="checkbox" :checked="todo.completed" @click="toggle(todo.id)" class="checkbox" />
        <p class="taskText">{{ todo.text }}</p>
        <button @click="deleteToDo(todo.id)" class="deleteButton">Del</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    methods: {
        toggle(todoId) {
            this.$emit('toggle', todoId);
        },
        deleteToDo(todoId) {
            this.$emit('delete', todoId);
        },
    },
};
</script>