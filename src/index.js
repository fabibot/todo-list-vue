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

export function generateRandomId(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}