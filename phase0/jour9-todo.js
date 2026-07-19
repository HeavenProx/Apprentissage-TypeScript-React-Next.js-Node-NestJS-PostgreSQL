// ============================================================
//  PHASE 0 — JOUR 9 : todo-list (2/2) — supprimer, cocher, filtrer
//  npm run dev  ->  http://localhost:5173/jour9-todo.html
//
//  Reprends TON code du Jour 8 (état + render + ajout) et complète-le ici.
//  Le réflexe reste le même partout : on modifie l'état, puis render().
// ============================================================

const champ   = document.querySelector("#champ");
const bouton  = document.querySelector("#ajouter");
const liste   = document.querySelector("#liste");
const filtres = document.querySelector("#filtres");
const compteur = document.querySelector("#compteur");

const sauvegarde = localStorage.getItem("mes-todos");

let todos = sauvegarde ? JSON.parse(sauvegarde) : []; // { id, texte, fait }
let filtreActif = "toutes";   // "toutes" | "actives" | "terminees"


function render() {
  // 1) calcule la liste À AFFICHER à partir de todos + filtreActif
  //    -> un filter selon le cas ; todos n'est JAMAIS modifié ici
  let todosAffiches = [];
  if(filtreActif == "toutes"){
    todosAffiches = todos;
  } else if(filtreActif == "actives"){
    todosAffiches = todos.filter((todo) => todo.fait == false)
  } else if(filtreActif == "terminees"){
    todosAffiches = todos.filter((todo) => todo.fait == true)
  }


  // 2) vide #liste, puis pour chaque todo affiché, construis un <li> contenant :
  //      - une <input type="checkbox">, cochée si le todo est fait
  //      - un <span> avec le texte, et la classe "done" si le todo est fait
  //      - un <button> "×" pour supprimer
  //    et branche les 3 comportements ci-dessous au moment où tu les crées
  liste.innerHTML = "";

  todosAffiches.forEach((todo) => {
    const li = document.createElement("li");

    const checkboxTodo = document.createElement("input");
    checkboxTodo.type = "checkbox";
    checkboxTodo.checked = todo.fait;

    const texteTodo = document.createElement("span");
    texteTodo.textContent = todo.message;
    texteTodo.classList.toggle("done", todo.fait);

    const deleteTodo = document.createElement("button");
    deleteTodo.textContent = "×";

    li.append(checkboxTodo, texteTodo, deleteTodo);
    liste.append(li);


    checkboxTodo.addEventListener("change", () => {
      todo.fait = !todo.fait;
      render();
    });

    deleteTodo.addEventListener("click", () => {
      todos = todos.filter((todo2) => todo2.id !== todo.id )
      render();
    });

    // sauvegarder dans le localstorage
  })
  
  // 3) mets à jour #compteur (ex : "2 tâche(s) restante(s)")
  //    -> compte les todos NON faits (sur todos complet, pas sur la liste filtrée)
  const todosRestant = todos.filter((todo) => todo.fait == false)
  compteur.textContent = todosRestant.length + " todo(s) à finir !";

  sauvegarder();
}


// --- COCHER / DÉCOCHER ---
// Dans render(), sur la checkbox : à son "change", inverse le `fait` du todo


// --- SUPPRIMER ---
// Dans render(), sur le bouton "×" : au clic, reconstruis todos SANS ce todo
// (filter sur l'id), puis render().


// --- FILTRER ---
// Un seul listener sur #filtres (les boutons existent déjà dans le HTML) :
filtres.addEventListener("click", (e) => {
  // - récupère le filtre cliqué : e.target.dataset.filtre
  // - ignore le clic s'il n'est pas sur un bouton (dataset.filtre vide)
  // - mets à jour filtreActif, puis render()
  // - visuel : retire la classe "actif" de tous les boutons, remets-la sur le bon
  const cliquer = e.target.dataset.filtre;
  if (!cliquer) return;

  filtreActif = cliquer;
  const allFiltre = filtres.querySelectorAll("button");
  allFiltre.forEach((filtre) => {
    filtre.classList.remove("actif");
  });
  e.target.classList.add("actif");
  render();
});


// --- AJOUT (repris du Jour 8) ---
bouton.addEventListener("click", () => addListe());
champ.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addListe();
  }
});

function addListe(){
  if(champ.value.trim() !== ''){
    // - ajoute un nouvel objet todo dans le tableau  (un id unique : Date.now())
    const todo = {
      id: Date.now(),
      message: champ.value.trim(),
      fait: false
    }

    todos.push(todo);

    // - remets le champ à vide
    champ.value = "";
    // - déclenche le re-render
    render();
  }
}

// --- BONUS localStorage : que les tâches survivent au rechargement ---
// localStorage ne stocke que du TEXTE :
//   sauvegarder -> JSON.stringify(todos)   |   relire -> JSON.parse(...)
// - une petite fonction sauver() appelée à la fin de render()
// - au démarrage, tente de relire la clé ; si elle existe, remplis todos avec
function sauvegarder(){
  localStorage.setItem("mes-todos", JSON.stringify(todos));
}


render();


// ============================================================
//  Validé quand : ajouter / cocher / supprimer / filtrer marchent,
//  le compteur suit, et changer de filtre ne perd aucune tâche.
//  git commit -m "phase0 jour9 : todo-list complète"
// ============================================================
