interface Todo {
  readonly id: number,
  text: string,
  fait: boolean
}

const sauvegarde = localStorage.getItem("mes-todos");

let todos: Todo[] = sauvegarde ? JSON.parse(sauvegarde) : []; // { id, texte, fait }

const filtres = ["toutes", "actives", "terminees"] as const; 
type filtresValides = typeof filtres[number];
let filtreActif: filtresValides = "toutes";

const inputTache = document.querySelector<HTMLInputElement>("#champ");
if (!inputTache) throw new Error("#champ introuvable");
const buttonAdd = document.querySelector<HTMLButtonElement>("#ajouter");
if (!buttonAdd)  throw new Error("#ajouter introuvable");
const allFiltres = document.querySelector<HTMLDivElement>("#filtres");
if (!allFiltres)  throw new Error("#filtres introuvable");
const compteur = document.querySelector<HTMLParagraphElement>("#compteur");
if (!compteur)  throw new Error("#compteur introuvable");
const listeTodo = document.querySelector<HTMLUListElement>("#liste");
if (!listeTodo)  throw new Error("#liste introuvable");



function render(): void {
  // 1) calcule la liste À AFFICHER à partir de todos + filtreActif
  //    -> un filter selon le cas ; todos n'est JAMAIS modifié ici
  let todosAffiches: Todo[];
  if(filtreActif == "actives"){
    todosAffiches = todos.filter((todo) => todo.fait == false)
  } else if(filtreActif == "terminees"){
    todosAffiches = todos.filter((todo) => todo.fait == true)
  } else {
    todosAffiches = todos;
  }


  // 2) vide #liste, puis pour chaque todo affiché, construis un <li> contenant :
  //      - une <input type="checkbox">, cochée si le todo est fait
  //      - un <span> avec le texte, et la classe "done" si le todo est fait
  //      - un <button> "×" pour supprimer
  //    et branche les 3 comportements ci-dessous au moment où tu les crées
  listeTodo!.innerHTML = "";

  todosAffiches.forEach((todo) => {    
    appendLi(todo);
  })
  
  // 3) mets à jour #compteur (ex : "2 tâche(s) restante(s)")
  //    -> compte les todos NON faits (sur todos complet, pas sur la liste filtrée)
  const todosRestant = todos.filter((todo) => todo.fait == false)
  compteur!.textContent = todosRestant.length + " todo(s) à finir !";

  // sauvegarder dans le localstorage
  sauvegarder();
}

function appendLi(todo: Todo){
  const li = document.createElement("li");

  const checkboxTodo = document.createElement("input");
  checkboxTodo.type = "checkbox";
  checkboxTodo.checked = todo.fait;

  const texteTodo = document.createElement("span");
  texteTodo.textContent = todo.text;
  texteTodo.classList.toggle("done", todo.fait);

  const deleteTodo = document.createElement("button");
  deleteTodo.textContent = "×";

  li.append(checkboxTodo, texteTodo, deleteTodo);
  listeTodo!.append(li);

  checkboxTodo.addEventListener("change", () => {
    todo.fait = !todo.fait;
    render();
  });

  deleteTodo.addEventListener("click", () => {
    todos = todos.filter((todo2) => todo2.id !== todo.id )
    render();
  });
}

// --- FILTRER ---
// Un seul listener sur #filtres (les boutons existent déjà dans le HTML) :
allFiltres.addEventListener("click", (e) => {
  // - récupère le filtre cliqué : e.target.dataset.filtre
  // - ignore le clic s'il n'est pas sur un bouton (dataset.filtre vide)
  // - mets à jour filtreActif, puis render()
  // - visuel : retire la classe "actif" de tous les boutons, remets-la sur le bon
  if (e.target instanceof HTMLElement) { 
    const cliquer = e.target.dataset.filtre;
    if (!cliquer) return;
  
    if(!isFiltreOk(cliquer)) return;

    // filtreActif = cliquer as filtres;
    filtreActif = cliquer;

    const btnFiltre = allFiltres.querySelectorAll("button");
    btnFiltre .forEach((filtre) => {
      filtre.classList.remove("actif");
    });
    e.target.classList.add("actif");
    render();

   }
});

function isFiltreOk(filtre: string): filtre is filtresValides {
  return filtres.includes(filtre as filtresValides);
}


// --- AJOUT (repris du Jour 8) ---
buttonAdd.addEventListener("click", () => addListe());
inputTache.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addListe();
  }
});

function addListe(){
  if(inputTache!.value.trim() !== ''){
    // - ajoute un nouvel objet todo dans le tableau  (un id unique : Date.now())
    const todo = {
      id: Date.now(),
      text: inputTache!.value.trim(),
      fait: false
    }

    todos.push(todo);

    // - remets le champ à vide
    inputTache!.value = "";
    // - déclenche le re-render
    render();
  }
}

function sauvegarder(){
  localStorage.setItem("mes-todos", JSON.stringify(todos));
}

render();