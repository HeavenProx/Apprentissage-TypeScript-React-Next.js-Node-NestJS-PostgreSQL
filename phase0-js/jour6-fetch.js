// ============================================================
//  PHASE 0 — JOUR 6 : fetch sur une vraie API
//  Session NAVIGATEUR :
//    npm run dev  ->  http://localhost:5173/jour6-fetch.html
//  On combine tout : fetch + async/await + map + DOM.
//  API d'entraînement (sans clé) :
//    https://jsonplaceholder.typicode.com/users  -> 10 utilisateurs
//
//  Principe du jour : on part d'une fonction charger() minimale
//  qui MARCHE, et on l'enrichit étape par étape (comme en vrai).
// ============================================================


const bouton = document.querySelector("#charger");
const statut = document.querySelector("#statut");
const liste  = document.querySelector("#liste");

// Attention : ne jamais nommer une variable `URL` — c'est un objet natif du navigateur.
const API_URL = "https://jsonplaceholder.typicode.com/users";


// ------------------------------------------------------------
// Étape 1 (fournie) : fetch + json + log
//   fetch(API_URL)        -> promesse -> await -> la réponse
//   reponse.json()    -> promesse -> await -> les données
// ------------------------------------------------------------
async function charger() {
  statut.textContent = "Chargement...";

  try{

    bouton.disabled = true;
    
    const reponse = await fetch(API_URL);
    if (!reponse.ok) throw new Error("HTTP " + reponse.status);

    const users = await reponse.json();
  
    
    // 1b
    const names = users.map((user) => user.name);
    console.log("users name →", names);        
    
    // 2b
    liste.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;
      liste.append(li);
    });
    statut.textContent = users.length + " utilisateurs";

  } catch(err) {
    liste.innerHTML = "";
    statut.textContent = "Erreur : " + err.message;
  } finally {
    bouton.disabled = false;
  }
}

bouton.addEventListener("click", charger);


// ------------------------------------------------------------
//  À TOI : enrichis la fonction charger() ci-dessus, dans l'ordre.
// ------------------------------------------------------------

// TODO 1b : après avoir récupéré `users`, affiche dans la console
//   UNIQUEMENT les noms.  Indice : users.map((u) => u.name)

// TODO 2b : LE cœur du jour — affiche les utilisateurs dans la page.
//   Toujours dans charger(), après avoir les `users` :
//     - vide la liste :            liste.innerHTML = "";
//     - pour chaque user :         crée un <li>, mets u.name dedans, append-le
//   (forEach, ou map puis boucle ; les deux marchent)

// TODO 3a : indique l'état du chargement à l'utilisateur.
//     - tout au début de charger() :   statut.textContent = "Chargement...";
//     - une fois la liste affichée :   statut.textContent = users.length + " utilisateurs";

// TODO 3b : gère les erreurs proprement. Enveloppe le corps de charger()
//   dans un try/catch :
//     - IMPORTANT : fetch ne plante PAS sur une erreur 404/500, il faut
//       vérifier toi-même :   if (!reponse.ok) throw new Error("HTTP " + reponse.status);
//     - dans le catch :       statut.textContent = "Erreur : " + err.message;
//   Puis teste en cassant l'URL exprès (ex: ".../userzzz") : le catch doit se déclencher.


// ============================================================
//  Validé quand : au clic, la liste des 10 noms s'affiche, le statut
//  indique le nombre, et une URL cassée affiche une erreur propre.
//  git add . && git commit -m "phase0 jour6 : fetch + affichage DOM"
// ============================================================
