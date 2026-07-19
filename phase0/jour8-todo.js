// ============================================================
//  PHASE 0 — JOUR 8 : todo-list (1/2) — structure + render + ajout
//  npm run dev  ->  http://localhost:5173/jour8-todo.html
//
//  LE PRINCIPE (à ne jamais lâcher) :
//    todos = seule source de vérité
//    render() redessine TOUTE la liste depuis todos
//    on modifie todos, PUIS on appelle render(). Jamais le DOM à la main.
// ============================================================

const champ  = document.querySelector("#champ");
const bouton = document.querySelector("#ajouter");
const liste  = document.querySelector("#liste");

let todos = [];


// render : efface #liste, puis la reconstruit entièrement à partir de `todos`.
function render() {
  // - vide d'abord le contenu de #liste
  liste.innerHTML = "";
  // - parcours todos ; pour chacun : un <li>, son texte dedans, append à #liste
  //   (mécanique déjà vue au Jour 4, ici juste rassemblée dans une fonction)
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.message;
    liste.append(li);
  })
}


// ajouter une tâche
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
      message: champ.value.trim()
    }

    todos.push(todo);

    // - remets le champ à vide
    champ.value = "";
    // - déclenche le re-render
    render();
  }
}


// bonus : permettre l'ajout avec la touche Entrée (événement "keydown", touche "Enter")


render();  // premier affichage (liste vide au départ)


// ============================================================
//  Validé quand : tu tapes, tu ajoutes, la tâche apparaît — et tout
//  passe par "je modifie todos -> j'appelle render()".
//  git commit -m "phase0 jour8 : todo-list, render + ajout"
// ============================================================
