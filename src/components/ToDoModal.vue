<script>
import { ref } from "@vue/reactivity";
import { useStore } from 'vuex';
export default {
  props: {
    show: Boolean,
  },
  setup(props, { emit }) {
    const itemValue = ref(null);
     const store = useStore();
    const saveToDo = (e) => {
      e.preventDefault();
      if(!itemValue.value){
          alert("Enter a name for todo")
          return
      }
      const newItem = {
        id: Math.floor(Math.random() * 100000),
        text: itemValue.value,
        done: false,
      };
      store.dispatch("addTodo",newItem);
      emit("close");
      itemValue.value = "";
    };
    return {
      itemValue,
      saveToDo,
    };
  },
};
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header">
              <slot name="header"></slot>
              <button class="btn btn-secondary btn-sm" @click="$emit('close')"><i class="fas fa-close"></i></button>
            </div>
            <form @submit="saveToDo">
            <div class="modal-body">
              <slot name="body">
                <div>
                  <label for="text" class="form-label">Name : </label>
                  <input
                    type="text"
                    v-model="itemValue"
                    name="text"
                    id="text"
                    class="form-control"
                  />
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  type="submit"
                  class="modal-default-button btn btn-success">
                  Kaydet
                </button>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: rgb(116, 113, 113);
}

.modal-body {
  margin: 20px 0;
}

input {
  border: 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

@media screen and (max-width: 600px) {
  .modal-container {
     width: 90%;
  }
}
@media screen and (min-width: 600px) {
  .modal-container {
     width: 90%;
  }
}
@media screen and (min-width: 768px) {
  .modal-container {
     width: 75%;
  }
}
@media only screen and (min-width: 992px) {
  .modal-container {
     width: 50%;
  }
}
@media only screen and (min-width: 1200px) {
  .modal-container {
    width: 30%;
  }
}
</style>
