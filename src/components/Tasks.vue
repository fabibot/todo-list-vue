<template>
<div>
  <div class="d-flex">
    <div v-if="currentProject" class="d-flex align-items-center w-100">
        <div class="m-5">
          <h2>{{ currentProject.title }}</h2>
      </div>
      <button class="smallIcone addTask" @click="displayAddTaskForm"></button>
    </div>
    <div v-else>
      <p class="m-5 text-secondary">Créez ou sélectionnez un projet pour ajouter des taches</p>
    </div>

  </div>
  <div class="d-flex flex-wrap px-5"> 
    <div class="m-3" :class="getClass(task) " v-for="task in tasksToDisplay" :key="task.id">
      <div v-if="modifyTaskForm && taskToModify === task" class="background-white" style="height:100%">
          <ModifyTaskForm v-if="modifyTaskForm" :currentProject='currentProject' :taskToModify="taskToModify" @taskModified="handleModified"/>
      </div>
      <div v-else style="display: flex; flex-direction : column">
        <div style="display: flex; margin-bottom : 10px">
          <div class="checkbox" @click="checkTheBox(task)"></div>
          <h4>{{task.title}}</h4>
        </div>
      <div>
        <div class="descTask">
          <p>{{task.description}}</p>
          <div class="modifyTask" @click="displayModifyForm(task)"></div>
        </div>
      </div>
      </div>
    </div>
    <FormTask class="background-white m-3" v-if="addTaskForm" @newTaskSubmitted="addTask" :tasksToDisplay="tasksToDisplay" :currentProject='currentProject'/>
  </div>
</div>
</template>

<script>
import FormTask from "./FormTask.vue"
import ModifyTaskForm from "./ModifyTaskForm.vue"
import { ref } from "vue";

export default {
  name: 'Tasks',
  props: ['tasksToDisplay', 'currentProject'],
  components: { FormTask, ModifyTaskForm},
  emits : [ 'newTaskSubmitted', 'updateTask' ],
  setup(props, {emit}) {
    const addTaskForm = ref(false);
    const modifyTaskForm = ref(false);
    const taskToModify = ref(null);

    function checkTheBox(task) {
      task.isCheck = !task.isCheck;
    }
    function displayModifyForm(task){
      modifyTaskForm.value = !modifyTaskForm.value;
      taskToModify.value = task;

    }
    function displayAddTaskForm() {
      addTaskForm.value = !addTaskForm.value;
    }
    function addTask(newTask) {
      addTaskForm.value = false;
      emit('newTaskSubmitted', newTask);
    }
    function getClass(task) {
      const className = task.importance;
      return {
        'task': true,
        'background-white' : true,
        'checked': task.isCheck,
        [className]: true
      }
    }
    function handleModified(updatedTask) {
      modifyTaskForm.value = false;
      emit('updateTask', updatedTask, taskToModify.value);
      // console.log(this.taskToModify.title);
      // console.log(updatedTask)
    }

    return {
      addTaskForm, modifyTaskForm, taskToModify,
      handleModified, getClass, addTask, displayAddTaskForm, displayModifyForm, getClass, addTask, displayAddTaskForm, checkTheBox
    }
  }
}
</script>

<style scoped>
.taskDiv div {
  display: flex;
}
</style>