// ============================================================
//  PHASE 0 — JOUR 4 : le DOM sans jQuery
//  Session NAVIGATEUR :
//    1) npm run dev
//    2) ouvre http://localhost:5173/jour4-dom.html
//    3) garde la console ouverte (F12 > Console)
// ============================================================


// --- on sélectionne nos éléments une fois pour toutes ---
const champ  = document.querySelector("#champ");
const bouton = document.querySelector("#ajouter");
const liste  = document.querySelector("#liste");


// ------------------------------------------------------------
// 1. Écouter un événement   (jQuery : $('#ajouter').on('click', ...))
// ------------------------------------------------------------
bouton.addEventListener("click", () => {
  console.log("clic détecté !");     // attendu : s'affiche dans la console à chaque clic
});
// NB : tu peux mettre PLUSIEURS addEventListener sur le même bouton,
//      ils s'exécuteront tous à chaque clic.

// TODO 1b : ajoute un addEventListener "click" sur le bouton qui affiche
//           dans la console la valeur tapée dans le champ (champ.value).
// bouton.addEventListener("click", () => { console.log(...); });
bouton.addEventListener("click", () => {
  console.log(champ.value)
})


// ------------------------------------------------------------
// 2. Créer et ajouter des éléments
//    createElement -> textContent -> append
// ------------------------------------------------------------
const exemple = document.createElement("li");
exemple.textContent = "(exemple créé en JS)";
liste.append(exemple);               // attendu : cette ligne apparaît dans la liste au chargement

// TODO 2b : LE cœur du jour. Au clic sur le bouton :
// TODO 2c : juste après avoir ajouté le <li>, vide le champ  ->  champ.value = "";
//   - crée un <li>
//   - mets-y le texte tapé dans le champ (champ.value)
//   - ajoute ce <li> à la liste (liste.append(...))
// bouton.addEventListener("click", () => { ... });
bouton.addEventListener("click", () => {
  if(champ.value.trim() !== ''){
    const monLi = document.createElement("li")
    monLi.append(champ.value);
    liste.append(monLi);
    champ.value = '';
    monLi.addEventListener("click", () => {
      monLi.classList.toggle("done");
    });
  }
})



// ------------------------------------------------------------
// 3. classList   (jQuery : .addClass / .toggleClass)
// ------------------------------------------------------------
// exemple.classList.add("done");    // décommente pour voir la ligne "exemple" se barrer

// TODO 3b (bonus) : rends chaque <li> cliquable pour le "barrer".
//   Dans ton handler du 2b, au moment où tu crées le <li>, ajoute-lui :
//     li.addEventListener("click", () => li.classList.toggle("done"));
//   (la classe .done est déjà stylée dans le HTML : texte barré + gris)

// ============================================================
//  Validé quand : tu tapes un texte, tu cliques "Ajouter",
//  la ligne apparaît, le champ se vide, et (bonus) cliquer une
//  ligne la barre / la débarre.
//  git add . && git commit -m "phase0 jour4 : DOM vanilla"
// ============================================================
