<template>
  <div class="todo-container">
    <section>
      <div class="card border-0">
        <div class="card-title p-5 text-center">
          <h1>Todo App</h1>
        </div>
        <div class="card-body">
          <ToDoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import ToDoItem from "./components/ToDoItem.vue";
export default {
  name: "App",
  components: {
    ToDoItem,
  },
  setup(){
    const store = useStore();
    const todos = computed(()=>store.state.todos);
    return{
      todos,
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
.todo-container {
  width: 50vw;
  height: 100vh;
  margin: auto;
}
</style>
