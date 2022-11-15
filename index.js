"use strict";

class TodoList {
  constructor(element) {
    // élément représente la list non ordonnée
    // 1- créez une propriété "listElement" et donnez lui la valeur de "element"
    this.listElement = element;
    // 2- créez une propriété "textList" qui sera un tableau vide
    this.textList = [];
  }
  static createListItem(text) {
    // text représente le texte à insérer dans un <li>
    // 1- créez un élément <li> (astuce: createElement() :)  )
    let li = document.createElement("li");
    //creer un button qui va permetre de supprimmer la tache
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "&cross;";
    deleteBtn.className = "deleteBtn";
    //créer un checkbox
    let checkbox = document.createElement("input");
    checkbox.type="checkbox";
    // 2- insérez à l'intérieur le text
    li.append(checkbox,text, deleteBtn);
    return li;
  }

  update() {
    // se charge de mettre à jour la list
    // Etapes:
    // 1 - Retirez tous les éléments <li> de la todo-list
    this.listElement.innerHTML = " ";
    // 2- Insérer les <li> que vous créé à l'aide la méthode static createListItem
    this.textList.forEach(text => {
      this.listElement.append(TodoList.createListItem(text));
    });
  }
  add(text) {
    // se charge d'ajouter le text au tableau "textList" créée dans le constructeur
    // 1- ajoutez le "text" à "textList"
    this.textList.push(text.trim());
    // 2- appelez la méthode update() de la classe pour mettre à jour la list
    this.update();
  }

  remove(index) {
    // se charge de retirer un élément de la liste
    // 1- retirez le text qui se trouve à l'index "index" dans le tableau "textList"
    this.textList.splice(index, 1);
    // 2- appelez la méthode update() de la classe pour mettre à jour la list
    this.update();
  }
}

// Une fois la classe créée, récupérez dans le JavaScript l'élément avec l'id "myList" créé dans le html.
document.addEventListener("DOMContentLoaded", event => {
  event.preventDefault();
  let myList = document.querySelector("#myList");

  // Instanciez ensuite un élément de la classe TodoList. (const todoApp = new TodoList(...))
  const todoApp = new TodoList(myList);

  //on configure l'ajout de tâche
  document.querySelector('#addBtn').addEventListener("click", (event) => {

    //on vérifie si la tâche entré est valide
    if (document.querySelector('#taskInput').value) {
      todoApp.add(document.querySelector('#taskInput').value)
      document.querySelector('#taskInput').value = ""
      //on vérifie si l'afficheur d'erreur est visible. si oui on le fait disparaitre. si non on le rend visible
      if (document.querySelector('#errorFlag').classList.contains('display-initial')) {
        document.querySelector('#errorFlag').classList.remove('display-initial')
      }
    } else {
      document.querySelector('#errorFlag').classList.add('display-initial')
    }

  });

  //on configure la suppression de tâches
  document.addEventListener('click', (e) => {
    if (e.target.className === "deleteBtn") {
      //on recupère la chaine de charactère qui correspond à la tâche
      let textFragment = e.target.parentNode.innerHTML.split('<')[1].split('>')[1].trim();
      console.log(textFragment);
      //on parcours la liste des taches et on vérifie s'il y a correspondance. si oui on supprime la tache
      todoApp.textList.forEach((el, i) => {
        if (el === textFragment) {
          todoApp.remove(i)
        }
      });
    }

  })
});