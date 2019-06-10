<template>
    <div id="todoModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 v-if="!editTodoStatus" class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                <h5 v-else class="modal-title" id="exampleModalLabel">{{editModalTitle}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <input v-if="editTodoStatus" type="hidden" id="todo-id" v-model="editId">
                <div class="form-group">
                    <input v-if="!editTodoStatus" type="text" class="form-control" id="message-title" v-model="title" placeholder="Title">
                    <input v-else type="text" class="form-control" id="message-title" :value="editTitle" placeholder="Title">
                    <span v-if="errTitle" class="text-danger text-center">Please enter something.</span>
                </div>
                <div class="form-group">
                    <textarea v-if="!editTodoStatus" class="form-control" id="message-text" rows="5" v-model="content" placeholder="Content"></textarea>
                    <textarea v-else class="form-control" id="message-text" rows="5" :value="editContent" placeholder="Content"></textarea>
                    <span v-if="errContent" class="text-danger text-center">Please enter something.</span>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="validateForm()">
                    Add <span class="ld ld-ring ld-spin"></span>
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { addToDo } from '../api';
import { editToDo } from '../api';

export default {
    name: "AddToDoModal",
    data: function() {
        return {
            modalTitle: "Add ToDo",
            id: '',
            title: '',
            content: '',
            errContent: false,
            errTitle: false,
        }
    },

    props: {
        editModalTitle: String,
        editId: Number,
        editTitle: String,
        editContent: String,
        editTodoStatus: Boolean
    },

    computed: {
    },

    methods: {
        validateForm() {
            if (this.editTodoStatus == true) {
                this.title = document.getElementById("message-title").value;
                this.content = document.getElementById("message-text").value;
            }
            console.log(this.content.trim().length, this.title.trim().length);
            if(this.content.trim().length == 0) {
                this.errContent = true;
            } else {
                this.errContent = false;
            }

            if (this.title.trim().length == 0) {
                this.errTitle = true;
            } else {
                this.errTitle = false;
            }
            if (this.errContent == false && this.errTitle == false) {
                if (this.editTodoStatus == true) {
                    this.editTodoMethod();
                } else {
                    this.addToDoMethod();
                }
            }
            return;
        },

        async editTodoMethod() {
            var id = document.getElementById("todo-id").value;

            const res = await editToDo(id, this.title, this.content);
            if (res.status == 200) {
                window.location.reload();
            } else {
                console.log(res);
            }
        },

        async addToDoMethod() {
            const res = await addToDo(this.title, this.content);
            if (res.status == 200) {
                window.location.reload();
            } else {
                console.log(res);
            }
        }
    },
}
</script>
