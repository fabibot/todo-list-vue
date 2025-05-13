<template>
  <form class="task" @submit.prevent="validForm">
    <label>Title</label>
    <input v-model="title"  ><br>
    <label>Description</label>
    <input v-model="description"><br>
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
    name: "FormTask",
    props: ['tasksToDisplay', 'currentProject'],
    data() {
        return {
            title: '',
            description: '',
            importance: '', 
        }
    },
    methods: {
        validForm() {
            console.log("project submited");
            if(this.title){
                let newTask = {
                title: this.title,
                description: this.description,
                isCheck: false,
                importance: this.importance
                };
                this.$emit('newTaskSubmitted', newTask);
                }
        }
    }
}
</script>

<style>

</style>