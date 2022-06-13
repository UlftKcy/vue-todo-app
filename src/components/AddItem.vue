<template>
    <div class="d-flex justify-content-end align-items-center mb-3">
        <button id="show-modal" class="btn btn-outline-success fw-bold" @click="showModal=true"><i class="fas fa-add fa-sm me-2"></i>Add</button>
    </div>
    <teleport to='body'>
       <ToDoModal :show="showModal" @close="showModal=false">
        <template #header>
            <h3>Add New Todo</h3>
        </template>
    </ToDoModal>
    </teleport>
</template>
<script>
import { ref } from '@vue/reactivity';
import ToDoModal from "./ToDoModal.vue";

export default {
    name:"AddItem",
    components:{
        ToDoModal,
    },
    setup(){  
        const showModal  = ref(false);
        return{
            showModal
        }
    }
}
</script>