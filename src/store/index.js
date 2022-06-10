import { createStore } from "vuex";

export const store = createStore({
    state(){
        return{
            todos:[
                {id:1,text:"Todo-1",done:true},
                {id:2,text:"Todo-2",done:false},
                {id:3,text:"Todo-3",done:false},
            ]
        }
    },
    getters:{},
    actions:{
        toggleTodoDone({commit},todo){
            commit("toggleTodoDone",{todo,done: !todo.done});
        },
        editTodo({commit},{todo,value}){
            commit("editTodo",{todo,text:value});
        },
    },
    mutations:{
        toggleTodoDone(state,{todo,done = todo.done}){
            const index = state.todos.indexOf(todo)
            state.todos.splice(index,1,{
                ...todo,
                done
            })
        },
        editTodo(state,{todo,text=todo.text}){
            const index = state.todos.indexOf(todo)
            state.todos.splice(index,1,{
                ...todo,
                text
            })
        }
    },
});