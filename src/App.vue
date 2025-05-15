<template>
<div>
  <Header></Header>
  <div class="content">
    <Sidebar :projectList="projectList" :projectData="projectData" @selectProject="selectProject"
              @newProjectSubmitted="createProject" @deleteProject="deleteProject">
    </Sidebar>
    <div>
      <Tasks :tasksToDisplay="tasksToDisplay" :currentProject="currentProject" @newTaskSubmitted="addTask" @updateTask="updateTask"/>
    </div>
  </div>
</div>
</template>

<script>
import Tasks  from './components/Tasks.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue'
import { Project, generateRandomId } from '.'

export default ({
  components: {
    Sidebar, Header, Tasks
  },
  setup() {
    const projetString = localStorage.getItem('projectData');
    let projectData = JSON.parse(projetString);

    if(!projectData) {
      projectData = [];
      localStorage.setItem("projectData", JSON.stringify(projectData));
    }

    const projectList = ref(projectData);
    const tasksToDisplay = ref(null); 
    const currentProject = ref(null);

    function addTask(data) {
      const project = projectList.value.find(p => p.id === currentProject.value.id);
      if (project) {
        project.tasks.push(data);
      }
      localStorage.setItem("projectData", JSON.stringify(projectList.value));
      tasksToDisplay.value = project.tasks;
    }

    function updateTask(data) {
      for(let i = 0; i < projectList.value.length; i++) {
        if(projectList.value[i].id == currentProject.value.id) {
          for(let j = 0; j < projectList.value[i].tasks.length; j++) {
            if(data.id == projectList.value[i].tasks[j].id) {
              projectList.value[i].tasks[j] = data;
            }
          }
        }
      }
        localStorage.setItem("projectData", JSON.stringify(projectList.value));
    }

    function createProject(newProject) {
      let projetCreated = new Project(newProject.title, newProject.id);
      let oldprojectData = JSON.parse(localStorage.getItem('projectData'));
      oldprojectData.push(projetCreated);
      localStorage.setItem("projectData", JSON.stringify(oldprojectData));
      projectList.value.push(projetCreated);
      currentProject.value = projetCreated;
    }

    function deleteProject(project) {
      let ProjectListUpdated = [];
      for(let element of projectList.value){
        if(element.id != project.id) {
          ProjectListUpdated.push(element)
        }
      }
      projectList.value = ProjectListUpdated;
      localStorage.setItem("projectData", JSON.stringify(projectList.value));
      currentProject.value = null;
      tasksToDisplay.value = null;
    }

    function selectProject(project) {
      currentProject.value = project;
      tasksToDisplay.value = project.tasks;
    }

    return {
      projectList, tasksToDisplay, currentProject, addTask, updateTask, createProject, projectData, deleteProject, selectProject
    }
  }

    
    // }, 
    // updateTask(updatedTask, oldTask) {
    //   console.log(oldTask.id);
    //   let updatedProject;
    //   for(let i = 0; i < this.projectList.length; i++) {
    //     if(this.projectList[i].id == this.currentProject.id) {
    //       for(let j = 0; j < this.projectList[i].tasks.length; j++) {
    //         if(oldTask.id == this.projectList[i].tasks[j].id) {
    //           updatedTask.id = oldTask.id;
    //           this.projectList[i].tasks[j] = updatedTask;
    //           updatedProject = this.projectList[i];
    //         }
    //       }
    //     }
    //   }
    //    fetch(`http://localhost:3000/projectList/${this.currentProject.id}`, {
    //             method: 'DELETE',
    //             })
    //             .then(res => res.json())
    //             .then(data => {
    //             console.log('Projet supprimé avec succès:', data);
    //             })
    //             .catch(err => console.error('Erreur lors de la suppression du projet:', err));
    //     fetch('http://localhost:3000/projectList', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(updatedProject),
    //                 })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                 console.log('Projet ajouté avec succès:', data);
    //                 })
    //                 .then(this.displayFormProject = false)
    //                 .catch(err => console.error('Erreur lors de l\'ajout du projet:', err));
    // },
    // 
  // }
})
</script>


<style src="./style.css"></style>
