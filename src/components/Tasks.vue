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
export default {
  name: 'Tasks',
  props: ['tasksToDisplay', 'currentProject'],
  components: { FormTask, ModifyTaskForm},
  data() {
    return {
      addTaskForm : false,
      modifyTaskForm : false,
      taskToModify : null
    }
  },
  methods: {
    checkTheBox(task) {
      task.isCheck = !task.isCheck;
    },
    displayModifyForm(task){
      this.modifyTaskForm = !this.modifyTaskForm;
      this.taskToModify = task;

    },
    displayAddTaskForm() {
      this.addTaskForm = !this.addTaskForm;
    },
    addTask(newTask) {
      this.addTaskForm = false;
      this.$emit('newTaskSubmitted', newTask);
    },
    getClass(task) {
      const className = task.importance;
      return {
        'task': true,
        'checked': task.isCheck,
        [className]: true
      }
    },
    handleModified(updatedTask) {
      this.modifyTaskForm = false;
      this.$emit('updateTask', updatedTask, this.taskToModify);
      // console.log(this.taskToModify.title);
      // console.log(updatedTask)


    }
  }
}
</script>

<style scoped>
.taskDiv div {
  display: flex;
}
</style>