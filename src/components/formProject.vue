<template>
  <form class="project" @submit.prevent="validForm">
    <input type="text" v-model="projectTitle">
    <button >Valider</button>
  </form>
</template>

<script>
import ProjectList from './ProjectList.vue';
import { ref } from 'vue';

export default {
    name: "FormProject",
    props: { projectList : Array},
    emits : [ "newProjectSubmitted" ],
    setup(props, { emit }){
        console.log(ProjectList.value)
        const projectTitle = ref("");
        function validForm() {
            if(projectTitle.value){
                let newId;
                if(!props.projectList.length) {
                    newId = "p0"
                } else {
                    let lastId = props.projectList[props.projectList.length - 1].id;
                    let idCount = lastId[1];
                    idCount++;
                    newId = "p" + idCount;
                }
                let newProject = { title: this.projectTitle, id: newId, isClicked:false, tasks: []};
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
