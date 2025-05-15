<template>
    <div class="projectDiv" @click="displayTasks" >
        <div>
          <h3 class="delicious-font">Projet</h3>
        </div>
        <ProjectList v-if='projectList' :projectList='projectList' @deleteProject='handleDelete' @selectProject="onSelectProject"/>
        <FormProject v-if="displayFormProject" :projectList="projectList"
            @newProjectSubmitted="addNewProjet"
        />
        <div id="iconeAdd" @click="displayAddProject" >
            <div class="smallIcone"></div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue'
import FormProject from './FormProject.vue';
import ProjectList from './ProjectList.vue';

export default {
    name: "Sidebar",
    components: {
        FormProject, ProjectList
    },
    props : {
        projectList : Array
    },
    emits: [
        'newProjectSubmitted', 'deleteProject', 'selectProject'
    ],
    setup(props, { emit }) {
        const date = ref(0);
        const displayFormProject = ref(false);


        function displayAddProject() {
            displayFormProject.value = !displayFormProject.value;
        }

        function handleDelete(project) {
            emit('deleteProject', project)
        }
        function addNewProjet(newProject) {
            displayFormProject.value = false;
            emit('newProjectSubmitted', newProject)
        }

        function onSelectProject(project) {
            emit("selectProject", project);
        }

        return {
        date, displayAddProject, displayFormProject, handleDelete, addNewProjet, onSelectProject
        }
    },
}
</script>