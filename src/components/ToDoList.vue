<template>
    <div>
        <div>
            <button class="btn btn-primary btn-lg" style="margin:6px;" data-toggle="modal" data-target="#todoModal">Add ToDo</button>
        </div>
        <AddToDoModal :editId="this.editId" :editTitle="this.editTitle" :editContent="this.editContent" :editTodoStatus="this.editTodoStatus" :editModalTitle="'Edit ToDo'"/>
        <div class="extra">
            <div>
                <button :class="{ 'active-filter': filter == 'all' }" @click="filter = 'all'">All</button>
                <button :class="{ 'active-filter': filter == 'active' }" @click="filter = 'active'">Active</button>
                <button :class="{ 'active-filter': filter == 'completed' }" @click="filter = 'completed'">Completed</button>
            </div>
            <div>{{ remaining }} ToDos left</div>
        </div>

        <div v-for="todo in todoFiltered" :key="todo.id">
            <div class="todo-item" :id="todo.id">
                <div v-if="!todo.completed" style="display:flex;">
                    <div v-if="!todo.completed" v-on:click="enableEdit(todo.id)" title="Edit Todo." style="cursor:pointer; margin-right:8px;">
                        &#9997;
                    </div>
                    <div :id="'todo-title'+todo.id">
                        {{todo.title}}
                    </div>
                </div>
                <div v-if="todo.completed" style="text-decoration:line-through; margin-left:30px;">
                    {{todo.title}}
                </div>
                <div style="display:flex;">
                    <div v-if="todo.completed" style="color:green;" class="todo-subitem" v-on:click="markAsComplete(todo.id)" title="Mark as completed.">
                        &#10004;
                    </div>
                    <div v-if="!todo.completed" class="todo-subitem" v-on:click="markAsComplete(todo.id)" title="Mark as completed.">
                        &check;
                    </div>
                    <div class="todo-subitem" v-on:click="deleteToDo(todo.id)" title="Delete">
                        &times;
                    </div>
                    <div class="todo-subitem" :id="'content'+todo.id" v-on:click="openText(todo.id)" title="Show content">
                        &plus;
                    </div>
                </div>
            </div>
            <div class="content">
                <p :id="'todo-content'+todo.id">{{todo.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import AddToDoModal from '../components/AddToDoModal'
import { getAllToDos } from '../api';
import { deleteToDo } from '../api';
import { markAsCompleted } from '../api';

export default {
    name: "ToDoList",
    components: {
        AddToDoModal
    },
    data : function() {
        return {
            editId: 0,
            editTitle: '',
            editContent: '',
            editTodoStatus: false,
            ToDo: "",
            filter: 'all',
            ToDoList: [

            ]
        }
    },

    computed: {
        remaining() {
            return this.ToDoList.filter(todo => !todo.completed).length;
        },

        todoFiltered() {
            if (this.filter == 'all') {
                return this.ToDoList
            } else if (this.filter == 'active') {
                return this.ToDoList.filter(todo => !todo.completed)
            } else if (this.filter == 'completed') {
                return this.ToDoList.filter(todo => todo.completed)
            }
            return this.ToDoList
        }
    },

    methods: {
        showAddToDoModal() {
            this.modal=true;
        },
        
        enableEdit(id) {
            console.log("here");
            this.editTodoStatus = true;
            this.editId = id;
            this.editTitle = document.getElementById("todo-title"+id).innerHTML;
            this.editContent = document.getElementById("todo-content"+id).innerHTML;
            $("#todoModal").modal('show'); 
        },

        openText(id) {
            var element = document.getElementById(id);
            element.classList.toggle("active");

            var content = element.nextElementSibling;
            if(content.style.display == 'block') {
                document.getElementById("content"+id).innerHTML = "&plus;"
                content.style.display = "none";
            } else {
                document.getElementById("content"+id).innerHTML = "&minus;"
                content.style.display = "block";
            }
        },

        async markAsComplete(id) {
            const res = await markAsCompleted(id);
            if(res.status == 200) {
                this.init();
            } else {
                console.log(res);
            }
        },

        async deleteToDo(id) {
            if (confirm("Do you really want to delete?")) {
                const res = await deleteToDo(id);
                if(res.status == 200) {
                    this.init();
                } else {
                    console.log(res);
                }
            }
        },

        async init() {
            const res = await getAllToDos();
            if(res.status == 200) {
                this.ToDoList = res.data.todos;
            } else {
                console.log(res);
            }
        },
    },

    mounted() {
        this.init()
    }
}
</script>

<style>
.todo-item {
    margin: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f1f1;
}

.active, .todo-item:hover {
    background-color: #dfdddd;
}

.todo-subitem {
    cursor: pointer;
    margin-left: 14px;
}

.content {
    text-align: initial;
    margin: 8px;
    padding: 5px;
    display: none;
    overflow: hidden;
    background-color: #f8f8f8;
    font-size: 20px;
}

.extra {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-bottom: 2px solid lightgray;
    padding-bottom: 14px;
    margin: 8px;
}

.active-filter {
    background-color: lightblue;
}
</style>


