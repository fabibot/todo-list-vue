<template>
    <div>
        <div v-for="project in projectList" class="d-flex justify-content-between border-top project" :key="project.id" id="project.id" :class="{'borderBlack': project.isClicked }">
            <div @click="selectProject(project)" class="flex-grow-1 m-3">
                <h4>{{project.title}}</h4>
            </div>
            <div class="deleteProjectIcone m-3" @click="deleteProject(project)"></div>
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