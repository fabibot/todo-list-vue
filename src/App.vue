<template>
<div>
  <Header></Header>
  <div class="content">
    <Sidebar :projectList="projectList" :projectData="projectData" @selectProject="selectProject"
              @newProjectSubmitted="addProject" @deleteProject="deleteProject"
    ></Sidebar>
    <div>
      <Tasks :tasksToDisplay="tasksToDisplay" :currentProject='currentProject' @newTaskSubmitted="addTask" @updateTask="updateTask"/>
    </div>
  </div>
</div>
</template>

<script>
import Tasks  from './components/Tasks.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue'
import { Project } from '.'

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

    function addTask() {
      console.log("addtask");
    }

    function updateTask() {
      console.log("update taks");
    }

    function addProject(newProject) {
      let oldprojectData = JSON.parse(localStorage.getItem('projectData'));
      oldprojectData.push(newProject);
      localStorage.setItem("projectData", JSON.stringify(oldprojectData));
      projectList.value.push(newProject);
      currentProject.value = newProject;
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
      currentProject.value = projectList.value[0];

    }

    function selectProject(project) {
      currentProject.value = project;
    }

    return {
      projectList, tasksToDisplay, currentProject, addTask, updateTask, addProject, projectData, deleteProject, selectProject
    }
  }

  // mounted() {
  //   fetch('http://localhost:3000/projectList')
  //     .then(res => res.json())
  //     .then(data => this.projectList = data)
  //     .catch(err => err.message)
  // },
  // methods: {
    // displayTasks() {
    //   for(let element of this.projectList){
    //     if(element.isClicked){
    //       this.tasksToDisplay = element.tasks;
    //       this.currentProject = element;
    //     }
    //   }
    // },
    
    // }, 
    // addTask(newTask) {
    //   let idTask = this.currentProject.id + "." + this.currentProject.tasks.length;
    //   newTask.id = idTask;
    //   console.log(idTask)
    //   this.currentProject.tasks.push(newTask);                
    //   fetch(`http://localhost:3000/projectList/${this.currentProject.id}`, {
    //       method: 'PUT',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(this.currentProject),
    //       })
    //       .then(response => {
    //       if (!response.ok) {
    //           throw new Error('Erreur lors de la requête PUT');
    //       }
    //       return response.json(); 
    //       })
    //       .then(data => {
    //       console.log('Données mises à jour avec succès :', data);
    //       })
    //       .catch(error => {
    //       console.error('Erreur :', error);
    //       });
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
