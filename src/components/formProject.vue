<template>
  <form class="mt-5 d-flex flex-column " @submit.prevent="validForm">
    <input class="form-control" type="text" v-model="projectTitle">
    <button class="btn background-second-blue my-3">Valider</button>
    <p v-if="alertMsg" class="text-danger"> Formulaire non valide</p>
  </form>
</template>

<script>
import { generateRandomId } from '..';
import { ref } from 'vue';

export default {
    name: "FormProject",
    emits : [ "newProjectSubmitted" ],
    setup(props, { emit }){
        const projectTitle = ref("");
        const alertMsg = ref(false);
        function validForm() {
            if(projectTitle.value){
                let newProject = { title: this.projectTitle, id: generateRandomId(), isClicked:false, tasks: []};
                emit('newProjectSubmitted', newProject);
                projectTitle.value = "";
            }  else {
                alertMsg.value = true;
            }
        }
        return {
            projectTitle, validForm, alertMsg
        }
    },
}
</script>
