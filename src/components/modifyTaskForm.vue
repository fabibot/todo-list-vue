<template>
  <form @submit.prevent="validForm">
        <label>Title</label>
        <input v-model="title"  :placeholder="taskToModify.title"><br>
        <label>Description</label>
        <input v-model="description"  :placeholder="taskToModify.description"><br>
        <label for="">Importance</label><br>
        <input type="radio" id="one" value="notImportant" v-model="importance" />
        <label for="one">1</label>
        <input type="radio" id="two" value="quiteImportant" v-model="importance" />
        <label for="two">2</label>
        <input type="radio" id="three" value="veryImportant" v-model="importance" />
        <label for="three">3</label><br>
        <button>Valider</button>
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
                    title: this.title,
                    description: this.description,
                    isCheck: false,
                    importance: this.importance
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