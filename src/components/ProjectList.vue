<template>
    <div class="projectList">
        <div v-for="project in projectList" :key="project.id" id="project.id" :class="{ 'project': true, 'borderBlack': project.isClicked }" @click="selectProject(project)">
            <h4>{{project.title}}</h4>
            <div class="deleteProjectIcone" @click="deleteProject(project)"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['projectList'],
    data(){
        return {
            
        }
    },
    methods: {
        changeBorder(project, projectList){
            for(let element of projectList){
                element.isClicked = false;
            }
            project.isClicked = true;
        },
        selectProject(project) {
            this.$emit('selectProject', project);
        },
        deleteProject(project) {
            this.$emit('deleteProject', project);  
          
        }
    }
}
</script>

<style>
.borderBlack {
    border: solid 3px black;
}
</style>