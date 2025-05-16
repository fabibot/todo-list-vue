<template>
  <form class="task d-flex flex-column" @submit.prevent="validForm">
    <label class="form-label">Title</label>
    <input class="form-control" v-model="title"  ><br>
    <label class="form-label">Description</label>
    <input class="form-control" v-model="description"><br>
    <label for="">Importance</label><br>
    <div>
        <label class="m-2" for="one">1</label>
        <input class="m-2" type="radio" id="one" value="notImportant" v-model="importance" />
        <label class="m-2" for="two">2</label>
        <input class="m-2" type="radio" id="two" value="quiteImportant" v-model="importance" />
        <label class="m-2" for="three">3</label>
        <input class="m-2" type="radio" id="three" value="veryImportant" v-model="importance" />
    </div>
    <p v-if="alertMsg" class="text-danger" style="font-size: 1rem;"> Formulaire non valide</p>

    <br>

    <button class="btn background-second-blue justify-self-end">Valider</button>
</form>

</template>

<script>
import { generateRandomId } from '..';

export default {
    name: "FormTask",
    props: ['tasksToDisplay', 'currentProject'],
    data() {
        return {
            title: '',
            description: '',
            importance: '', 
            alertMsg : false
        }
    },
    methods: {
        validForm() {
            console.log("project submited");
            if(this.title){
                let newTask = {
                id: generateRandomId(),
                title: this.title,
                description: this.description,
                isCheck: false,
                importance: this.importance
                };
                this.$emit('newTaskSubmitted', newTask);
            } else {
                this.alertMsg = true;
            }
        }
    }
}
</script>

<style>

</style>