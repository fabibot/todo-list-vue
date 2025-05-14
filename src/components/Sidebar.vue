<template>
    <div class="projectDiv" @click="displayTasks" >
        <div>
          <h3>Projet</h3>
        </div>
        <ProjectList v-if='projectList' :projectList='projectList' @deleteProject='handleDelete'/>
        <FormProject v-if="displayFormProject" :projectList="projectList" @newProjectSubmitted="addProject"/>
          <div id="iconeAdd" @click="displayAddProject" >
            <div class="smallIcone"></div>
          </div>
    </div>
</template>


<script>
import { ref } from 'vue'

export default {
  setup() {
    const date = ref(0)

    return {
      date
    }
  },
}
</script>