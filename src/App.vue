<template>
<div>
  <header>
        <div class="mainIcone"></div>
        <h1>TodoTodo</h1>
        <h3 id="date"> {{ date }}</h3>
  </header>
  <div class="content">
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
    <div>
      
      <Tasks :tasksToDisplay="tasksToDisplay" :currentProject='currentProject' @newTaskSubmitted="addTask" @updateTask="updateTask"/>
    </div>
  </div>
</div>
</template>

<script>
import Tasks  from '../src/components/Tasks.vue'
import ProjectList  from '../src/components/ProjectList.vue'
import FormProject from '../src/components/formProject.vue'
export default ({
  props: [],
  components:
    { Tasks, ProjectList, FormProject }
  ,
  data(){
    return {
      date : "Vendredi 12 février",
      projectList : [],
      tasksToDisplay : null, 
      currentProject : null,
      displayFormProject : false,
    }
  },
  mounted() {
    fetch('http://localhost:3000/projectList')
      .then(res => res.json())
      .then(data => this.projectList = data)
      .catch(err => err.message)

  },
  methods: {
    displayTasks() {
      for(let element of this.projectList){
        if(element.isClicked){
          this.tasksToDisplay = element.tasks;
          this.currentProject = element;
        }
      }
    },
    displayAddProject() {
      this.displayFormProject = !this.displayFormProject;

    },
    addProject(newProject) {
      this.projectList.push(newProject);
      fetch('http://localhost:3000/projectList', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
          })
          .then(res => res.json())
          .then(data => {
          console.log('Projet ajouté avec succès:', data);
          })
          .then(this.displayFormProject = false)
          .catch(err => console.error('Erreur lors de l\'ajout du projet:', err));

    }, 
    addTask(newTask) {
      let idTask = this.currentProject.id + "." + this.currentProject.tasks.length;
      newTask.id = idTask;
      console.log(idTask)
      this.currentProject.tasks.push(newTask);                
      fetch(`http://localhost:3000/projectList/${this.currentProject.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.currentProject),
          })
          .then(response => {
          if (!response.ok) {
              throw new Error('Erreur lors de la requête PUT');
          }
          return response.json(); 
          })
          .then(data => {
          console.log('Données mises à jour avec succès :', data);
          })
          .catch(error => {
          console.error('Erreur :', error);
          });
    },
    updateTask(updatedTask, oldTask) {
      console.log(oldTask.id);
      let updatedProject;
      for(let i = 0; i < this.projectList.length; i++) {
        if(this.projectList[i].id == this.currentProject.id) {
          for(let j = 0; j < this.projectList[i].tasks.length; j++) {
            if(oldTask.id == this.projectList[i].tasks[j].id) {
              updatedTask.id = oldTask.id;
              this.projectList[i].tasks[j] = updatedTask;
              updatedProject = this.projectList[i];
            }
          }
        }
      }
       fetch(`http://localhost:3000/projectList/${this.currentProject.id}`, {
                method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                console.log('Projet supprimé avec succès:', data);
                })
                .catch(err => console.error('Erreur lors de la suppression du projet:', err));
        fetch('http://localhost:3000/projectList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProject),
                    })
                    .then(res => res.json())
                    .then(data => {
                    console.log('Projet ajouté avec succès:', data);
                    })
                    .then(this.displayFormProject = false)
                    .catch(err => console.error('Erreur lors de l\'ajout du projet:', err));
    },
    handleDelete(project) {
       fetch(`http://localhost:3000/projectList/${project.id}`, {
                method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                console.log('Projet supprimé avec succès:', data);
                })
                .catch(err => console.error('Erreur lors de la suppression du projet:', err));
      let ProjectListUpdated = [];
      for(let element of this.projectList){
        if(element.id != project.id) {
          ProjectListUpdated.push(element)
        }
      }
      this.projectList = ProjectListUpdated;
    } 
  }
})
</script>


<style src="./style.css"></style>
