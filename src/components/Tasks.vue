<template>
<div>
  <div class="flex">
    <button class="smallIcone addTask" @click="displayAddTaskForm"></button>
    <div>
        <h4 v-if="currentProject">{{ currentProject.title }}</h4>
    </div>

  </div>
  <div class="tasksDiv"> 
    <div :class="getClass(task)" v-for="task in tasksToDisplay" :key="task.id">
      <div v-if="modifyTaskForm && taskToModify === task">
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
    <FormTask v-if="addTaskForm" @newTaskSubmitted="addTask" :tasksToDisplay="tasksToDisplay" :currentProject='currentProject'/>
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