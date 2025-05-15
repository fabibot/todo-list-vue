export class Project {
    constructor(title, id) {
        this.id = id,
        this.title = title,
        this.tasks = []
    }
    addTask() {
            console.log("tache :  ");
              //on itère dans la liste, et dès qu'on trouve le bon id, on ajoute a tasks[]
              // update bdd
            //   
            this.tasks.push("newproj");
    }
    
}