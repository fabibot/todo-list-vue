<template>
  <form class="project" @submit.prevent="validForm">
    <input type="text" v-model="projectTitle">
    <button >Valider</button>
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
        function validForm() {
            if(projectTitle.value){
                let newProject = { title: this.projectTitle, id: generateRandomId(), isClicked:false, tasks: []};
                emit('newProjectSubmitted', newProject);
                projectTitle.value = "";
            }  
        }
        return {
            projectTitle, validForm
        }
    },
}
</script>
