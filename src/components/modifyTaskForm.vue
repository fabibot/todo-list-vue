<template>
  <form class="w-100 d-flex flex-column" @submit.prevent="validForm">
        <label class="form-label">Title</label>
        <input class="form-control" v-model="title"  :placeholder="taskToModify ? taskToModify.title : ''"><br>
        <label class="form-label">Description</label>
        <input class="form-control" v-model="description"  :placeholder="taskToModify ? taskToModify.description : ''"><br>
        <label class="form-label" for="">Importance</label><br>
        <div>
            <label class="m-2" for="one">1</label>
            <input class="m-2" type="radio" id="one" value="notImportant" v-model="importance" />
            <label class="m-2" for="two">2</label>
            <input class="m-2" type="radio" id="two" value="quiteImportant" v-model="importance" />
            <label class="m-2" for="three">3</label>
            <input class="m-2" type="radio" id="three" value="veryImportant" v-model="importance" />
        </div>
        <br>
        <button class="btn background-second-blue">Valider</button>
    </form>
</template>

<script>
    export default {
        name: "ModifyTaskForm",
        props: ['taskToModify'],
        data() {
            return {
                title: '',
                description: '',
                importance: '', 
            }
        },
        methods: {
            validForm() {
                let modifiedTask = {
                    id : this.taskToModify.id,
                    title: this.title,
                    description: this.description,
                    isCheck: false,
                    importance: this.importance,
                };
                if(!modifiedTask.title){
                    modifiedTask.title = this.taskToModify.title;
                } 
                if(!modifiedTask.description){
                    modifiedTask.description = this.taskToModify.description;
                }
                this.$emit('taskModified', modifiedTask);
            }
        }
    }
</script>

<style scoped>
 
</style>