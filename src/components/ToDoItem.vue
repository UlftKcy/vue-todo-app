<template>
  <div
    class="card mb-3"
    :class="[todo.done ? 'custom-bg-done' : 'custom-bg-not-done']"
  >
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>{{ todo.text }}</div>
      <div>
        <button
          class="btn me-2 pb-1"
          :class="[todo.done ? 'btn-success' : 'btn-secondary']"
          @click="toggleTodoDone(todo)"
        >
          <i class="fas fa-check"></i>
        </button>
        <button class="btn btn-warning me-2 pb-1" @click="show = !show">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger me-2 pb-1">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
  <transition name="nested" duration="200">
    <div class="card mb-3 bg-light bg-gradient" v-show="show">
      <div class="card-body d-flex justify-content-between">
        <input type="text" :value="todo.text" @change="updateTodo" ref="input" class="form-control border-0 me-2"/>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  name: "ToDoItem",
  props: ["todo"],
  setup(props) {
    const show = ref(false);
    const input = ref(null)
    const store = useStore();
    const toggleTodoDone = (todo) => store.dispatch("toggleTodoDone", todo);
    const editTodo = (todo,value) => store.dispatch("editTodo", {todo,value});
    function updateTodo(e){
        const value = e.target.value.trim();
        editTodo(props.todo,value)
    }
    return {
      toggleTodoDone,
      show,
      input,
      editTodo,
      updateTodo
    };
  },
};
</script>
<style scoped>
.custom-bg-done {
  background-color: rgb(215, 247, 219);
}
.custom-bg-not-done {
  background-color: rgb(250, 250, 212);
}
.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
