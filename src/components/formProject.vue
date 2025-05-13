<template>
  <form class="project" @submit.prevent="validForm">
    <input type="text" v-model="projectTitle">
    <button >Valider</button>
  </form>
</template>

<script>
export default {
    name: "FormProject",
    props: ['projectList'],
    data(){
        return {
            projectTitle : null,
            idCount : null,
        }
    },
    methods: {
        validForm() {
            if(this.projectTitle){
                let newId;
                if(!this.projectList.length) {
                    newId = "p0"
                } else {
                    let lastId = this.projectList[this.projectList.length - 1].id;
                    this.idCount = lastId[1];
                    this.idCount++;
                    newId = "p" + this.idCount;
                }
                
                let newProject = { title: this.projectTitle, id: newId, isClicked:false, tasks: []};
                this.$emit('newProjectSubmitted', newProject)
            }
            
        }
    }
}
</script>
